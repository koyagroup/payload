export const ROLES = ['admin', 'editor', 'publisher'] as const

export type UserRole = (typeof ROLES)[number]

export type CmsUser = {
  id: string
  role?: UserRole | null
}

export const isAdmin = (user: CmsUser | null | undefined): boolean => user?.role === 'admin'

export const isPublisher = (user: CmsUser | null | undefined): boolean => user?.role === 'publisher'

export const canPublish = (user: CmsUser | null | undefined): boolean =>
  isAdmin(user) || isPublisher(user)

export const canEditContent = (user: CmsUser | null | undefined): boolean =>
  isAdmin(user) || isPublisher(user) || user?.role === 'editor'
