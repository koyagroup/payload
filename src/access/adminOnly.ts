import type { Access } from 'payload'

import { isAdmin } from '@/lib/roles'

export const adminOnly: Access = ({ req: { user } }) => isAdmin(user as never)
