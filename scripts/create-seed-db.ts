import 'dotenv/config'

import { Client } from 'pg'

const DEFAULT_SEED_DB_NAME = 'koya_payload_seed'

const isSafeIdentifier = (value: string): boolean => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)

const quoteIdentifier = (value: string): string => `"${value.replace(/"/g, '""')}"`

const withDatabaseName = (connectionString: string, databaseName: string): string => {
  const parsed = new URL(connectionString)
  parsed.pathname = `/${databaseName}`
  return parsed.toString()
}

async function run() {
  const adminConnectionRaw = process.env.DATABASE_ADMIN_URL || process.env.DATABASE_URL
  const seedDatabaseName = (process.env.SEED_DATABASE_NAME || DEFAULT_SEED_DB_NAME).trim()
  const seedDatabaseOwner = process.env.SEED_DATABASE_OWNER?.trim()

  if (!adminConnectionRaw) {
    throw new Error('Missing DATABASE_ADMIN_URL (or DATABASE_URL). Cannot create seed database.')
  }

  if (!isSafeIdentifier(seedDatabaseName)) {
    throw new Error(
      `Invalid SEED_DATABASE_NAME "${seedDatabaseName}". Use letters, numbers, and underscores only.`,
    )
  }

  if (seedDatabaseOwner && !isSafeIdentifier(seedDatabaseOwner)) {
    throw new Error(
      `Invalid SEED_DATABASE_OWNER "${seedDatabaseOwner}". Use letters, numbers, and underscores only.`,
    )
  }

  const adminConnectionString = withDatabaseName(adminConnectionRaw, 'postgres')
  const client = new Client({
    connectionString: adminConnectionString,
  })

  await client.connect()

  try {
    const existing = await client.query<{ datname: string }>(
      'SELECT datname FROM pg_database WHERE datname = $1',
      [seedDatabaseName],
    )

    if (existing.rowCount && existing.rowCount > 0) {
      console.log(`Seed database already exists: ${seedDatabaseName}`)
      return
    }

    const ownerSQL = seedDatabaseOwner ? ` OWNER ${quoteIdentifier(seedDatabaseOwner)}` : ''
    await client.query(`CREATE DATABASE ${quoteIdentifier(seedDatabaseName)}${ownerSQL}`)

    console.log(`Created seed database: ${seedDatabaseName}`)

    const derivedSeedURL = withDatabaseName(adminConnectionRaw, seedDatabaseName)
    console.log(`Set SEED_DATABASE_URL to: ${derivedSeedURL}`)
  } finally {
    await client.end()
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
