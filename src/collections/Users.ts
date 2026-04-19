import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { firstUserOrAdmin } from '@/access/firstUserOrAdmin'
import { ROLES } from '@/lib/roles'
import { ensureFirstUserIsAdmin } from '@/hooks/ensureFirstUserIsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['email', 'role', 'updatedAt'],
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: firstUserOrAdmin,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: ROLES.map((role) => ({
        label: role,
        value: role,
      })),
      required: true,
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
  hooks: {
    beforeChange: [ensureFirstUserIsAdmin],
  },
}
