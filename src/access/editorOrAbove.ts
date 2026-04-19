import type { Access } from 'payload'

import { canEditContent } from '@/lib/roles'

export const editorOrAbove: Access = ({ req: { user } }) => canEditContent(user as never)
