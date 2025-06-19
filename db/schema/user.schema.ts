import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  // clerk id
  user_id: text("user_id").primaryKey(),

  // stripe_customer_id: text("stripe_customer_id"),

  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
