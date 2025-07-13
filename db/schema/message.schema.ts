import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const messageTable = pgTable("message", {
  message_id: text("message_id").primaryKey().default(sql`gen_random_uuid()`),

  user_id: text("user_id").references(() => userTable.user_id, {
    onDelete: "cascade",
  }),

  role: text("role").notNull(),

  message: text("message").notNull(),

  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),

  created_at: timestamp("created_at", { withTimezone: true }).notNull(),
});
