import { createHmac } from 'crypto'

import type { Payload } from 'payload'

export type RevalidationEventType =
  | 'published'
  | 'updated_published'
  | 'unpublished'
  | 'deleted_published'
  | 'updated'
  | 'deleted'

export type RevalidationResource = {
  id?: string | number
  path?: string | null
  slug: string
  status?: string | null
  type: 'collection' | 'global'
}

type RevalidationPayload = {
  actor?: {
    id?: string | number
    role?: string
  }
  eventType: RevalidationEventType
  occurredAt: string
  paths: string[]
  resource: RevalidationResource
  tags: string[]
}

type DispatchArgs = {
  actor?: {
    id?: string | number
    role?: string
  }
  eventType: RevalidationEventType
  paths?: string[]
  payload: Payload
  resource: RevalidationResource
  tags?: string[]
}

const withTimeoutSignal = (timeoutMs: number): AbortSignal => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeoutMs)
  return controller.signal
}

const signPayload = ({ body, secret, timestamp }: { body: string; secret: string; timestamp: string }) => {
  return createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')
}

export const dispatchRevalidationWebhook = async ({
  actor,
  eventType,
  payload,
  paths = [],
  resource,
  tags = [],
}: DispatchArgs): Promise<void> => {
  const webhookURL = process.env.KOYA_REVALIDATE_WEBHOOK_URL
  const webhookSecret = process.env.KOYA_REVALIDATE_WEBHOOK_SECRET

  if (!webhookURL || !webhookSecret) {
    payload.logger.info('Revalidation webhook skipped: KOYA_REVALIDATE_WEBHOOK_URL/SECRET not configured.')
    return
  }

  const occurredAt = new Date().toISOString()
  const bodyData: RevalidationPayload = {
    eventType,
    occurredAt,
    resource,
    paths: [...new Set(paths.filter(Boolean))],
    tags: [...new Set(tags.filter(Boolean))],
    actor,
  }

  const body = JSON.stringify(bodyData)
  const timestamp = String(Date.now())
  const signature = signPayload({ body, secret: webhookSecret, timestamp })
  const timeoutMs = Number(process.env.KOYA_REVALIDATE_TIMEOUT_MS || 5000)

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-koya-event': eventType,
        'x-koya-signature': signature,
        'x-koya-timestamp': timestamp,
      },
      body,
      signal: withTimeoutSignal(timeoutMs),
    })

    if (!response.ok) {
      payload.logger.error({
        msg: 'Koya revalidation webhook failed',
        eventType,
        resource,
        status: response.status,
      })
    }
  } catch (err) {
    payload.logger.error({
      err,
      msg: 'Koya revalidation webhook request threw',
      eventType,
      resource,
    })
  }
}
