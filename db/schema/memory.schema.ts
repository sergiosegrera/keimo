import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, vector } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const memoryTable = pgTable(
  "memory",
  {
    memory_id: text("memory_id").primaryKey().default(sql`gen_random_uuid()`),

    user_id: text("user_id")
      .references(() => userTable.user_id, {
        onDelete: "cascade",
      })
      .notNull(),

    content: text("content").notNull(),

    embedding: vector("embedding", {
      dimensions: 768,
    }).notNull(),

    created_at: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    index("memory_embedding_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);
