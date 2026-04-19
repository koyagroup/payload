import type { Access } from 'payload'

export const authenticatedOrPublishedGlobal: Access = ({ req }) => {
  const user = req.user

  if (user) {
    return true
  }

  const draftQueryValue = reqQueryDraftValue(req.query?.draft)
  return !draftQueryValue
}

const reqQueryDraftValue = (value: unknown): boolean => value === true || value === 'true'
