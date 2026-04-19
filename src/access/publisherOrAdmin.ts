import type { Access } from 'payload'

import { canPublish } from '@/lib/roles'

export const publisherOrAdmin: Access = ({ req: { user } }) => canPublish(user as never)
