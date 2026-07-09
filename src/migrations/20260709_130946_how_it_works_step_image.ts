import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_how_it_works_steps" ADD COLUMN "image" varchar;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD COLUMN "image" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_how_it_works_steps" DROP COLUMN "image";
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" DROP COLUMN "image";`)
}
