import { sql } from "drizzle-orm";
import {
  check,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const coreMemoryTable = pgTable(
  "core_memory",
  {
    core_memory_id: text("core_memory_id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    user_id: text("user_id")
      .references(() => userTable.user_id, {
        onDelete: "cascade",
      })
      .notNull(),

    content: text("content").notNull(),

    core_memory_slot: integer("core_memory_slot").notNull(),

    created_at: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    unique("core_memory_slot_unique").on(table.user_id, table.core_memory_slot),
    check(
      "core_memory_slot_range",
      sql`${table.core_memory_slot} >= 1 AND ${table.core_memory_slot} <= 10`,
    ),
  ],
);
