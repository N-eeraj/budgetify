import { integer, pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const categoryScopeEnum = pgEnum('category_scope', [
  'income',
  'expense',
  'transfer',
]);

export const categoriesTable = pgTable('categories', {
  id: integer('id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: varchar('name', {
    length: 255,
  })
    .notNull(),
  color: varchar('color', {
    length: 255,
  })
    .notNull(),
  icon: varchar('icon', {
    length: 255,
  })
    .notNull(),
  scope: categoryScopeEnum('scope')
    .notNull(),
  description: varchar('description', {
    length: 255,
  })
    .notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
