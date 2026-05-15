import { index, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from './index.drizzle';

export const resetPasswordTokensTable = pgTable('reset_password_tokens', {
  id: integer('id')
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  token: varchar('token', {
    length: 255,
  })
    .notNull()
    .unique(),
  expiresAt: timestamp('expires_at')
    .notNull(),
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
}, (table) => ({
  userIdIdx: index('reset_password_tokens_user_id_idx')
    .on(table.userId),
}));
