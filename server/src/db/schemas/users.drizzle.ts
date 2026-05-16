import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer('id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: varchar('name', {
    length: 255,
  })
    .notNull(),
  email: varchar('email', {
    length: 255,
  })
    .notNull()
    .unique(),
  password: varchar('password', {
    length: 255,
  })
    .notNull(),
  avatarUrl: varchar('avatar_url', {
    length: 255,
  }),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
