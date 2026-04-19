import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { dispatchRevalidationWebhook, type RevalidationEventType } from './dispatch'

type CollectionHookOptions = {
  draftsEnabled?: boolean
  getPaths?: (doc: Record<string, unknown>) => string[]
  getTags?: (doc: Record<string, unknown>) => string[]
  slug: string
}

type GlobalHookOptions = {
  draftsEnabled?: boolean
  getPaths?: (doc: Record<string, unknown>) => string[]
  getTags?: (doc: Record<string, unknown>) => string[]
  slug: string
}

const resolveChangeEvent = ({
  currentStatus,
  draftsEnabled,
  previousStatus,
}: {
  currentStatus?: string | null
  draftsEnabled: boolean
  previousStatus?: string | null
}): RevalidationEventType | null => {
  if (!draftsEnabled) {
    return 'updated'
  }

  if (currentStatus === 'published' && previousStatus !== 'published') {
    return 'published'
  }

  if (currentStatus === 'published' && previousStatus === 'published') {
    return 'updated_published'
  }

  if (currentStatus !== 'published' && previousStatus === 'published') {
    return 'unpublished'
  }

  return null
}

export const createCollectionRevalidationHooks = ({
  draftsEnabled = false,
  getPaths,
  getTags,
  slug,
}: CollectionHookOptions): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} => {
  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
    const currentStatus = typeof doc?._status === 'string' ? doc._status : null
    const previousStatus = typeof previousDoc?._status === 'string' ? previousDoc._status : null

    const eventType = resolveChangeEvent({
      currentStatus,
      draftsEnabled,
      previousStatus,
    })

    if (!eventType) {
      return doc
    }

    await dispatchRevalidationWebhook({
      payload: req.payload,
      eventType,
      resource: {
        id: doc?.id as string | number | undefined,
        path: (doc?.path as string | undefined) || null,
        slug,
        status: currentStatus,
        type: 'collection',
      },
      paths: getPaths?.(doc as Record<string, unknown>) || [],
      tags: getTags?.(doc as Record<string, unknown>) || [slug],
      actor: {
        id: req.user?.id,
        role: req.user?.role,
      },
    })

    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
    const currentStatus = typeof doc?._status === 'string' ? doc._status : null

    if (draftsEnabled && currentStatus !== 'published') {
      return doc
    }

    await dispatchRevalidationWebhook({
      payload: req.payload,
      eventType: draftsEnabled ? 'deleted_published' : 'deleted',
      resource: {
        id: doc?.id as string | number | undefined,
        path: (doc?.path as string | undefined) || null,
        slug,
        status: currentStatus,
        type: 'collection',
      },
      paths: getPaths?.(doc as Record<string, unknown>) || [],
      tags: getTags?.(doc as Record<string, unknown>) || [slug],
      actor: {
        id: req.user?.id,
        role: req.user?.role,
      },
    })

    return doc
  }

  return {
    afterChange,
    afterDelete,
  }
}

export const createGlobalRevalidationHook = ({
  draftsEnabled = false,
  getPaths,
  getTags,
  slug,
}: GlobalHookOptions): GlobalAfterChangeHook => {
  const afterChange: GlobalAfterChangeHook = async ({ doc, previousDoc, req }) => {
    const currentStatus = typeof doc?._status === 'string' ? doc._status : null
    const previousStatus = typeof previousDoc?._status === 'string' ? previousDoc._status : null

    const eventType = resolveChangeEvent({
      currentStatus,
      draftsEnabled,
      previousStatus,
    })

    if (!eventType) {
      return doc
    }

    await dispatchRevalidationWebhook({
      payload: req.payload,
      eventType,
      resource: {
        slug,
        status: currentStatus,
        type: 'global',
      },
      paths: getPaths?.(doc as Record<string, unknown>) || ['/'],
      tags: getTags?.(doc as Record<string, unknown>) || [slug],
      actor: {
        id: req.user?.id,
        role: req.user?.role,
      },
    })

    return doc
  }

  return afterChange
}
