export const normalizePath = (value: string): string => {
  const trimmed = value.trim()

  if (!trimmed) {
    return '/'
  }

  if (trimmed === '/') {
    return '/'
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeadingSlash.replace(/\/+$/, '')
}

export const isInternalPath = (value: string): boolean => {
  if (!value.startsWith('/')) {
    return false
  }

  if (value.startsWith('//')) {
    return false
  }

  return !/\s/.test(value)
}

export const isAbsoluteURL = (value: string): boolean => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
