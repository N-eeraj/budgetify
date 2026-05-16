import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const verificationEmailsTable = pgTable('verification_emails', {
  id: integer('id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  email: varchar('email', {
    length: 255,
  })
    .notNull()
    .unique(),
  otp: varchar('otp', {
    length: 255,
  })
    .notNull()
    .unique(),
  expiresAt: timestamp('expires_at')
    .notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
