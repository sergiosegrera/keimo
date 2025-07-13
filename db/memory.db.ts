import { and, asc, cosineDistance, desc, eq, sql } from "drizzle-orm";
import db from "@/db/client";
import { coreMemoryTable } from "./schema/core-memory.schema";
import { memoryTable } from "./schema/memory.schema";

const MAX_CORE_MEMORIES = 10;
const MAX_MEMORIES = 20;

const create = async (args: {
  user_id: string;
  content: string;
  embedding: number[];
  created_at: Date;
}) => {
  const { user_id, content, embedding, created_at } = args;

  await db.insert(memoryTable).values({
    user_id,
    content,
    embedding,
    created_at,
  });
};

const createCoreMemory = async (args: {
  user_id: string;
  content: string;
  core_memory_slot: number;
  created_at: Date;
}) => {
  const { user_id, content, core_memory_slot, created_at } = args;

  await db
    .insert(coreMemoryTable)
    .values({
      user_id,
      content,
      core_memory_slot,
      created_at,
    })
    .onConflictDoUpdate({
      target: [coreMemoryTable.user_id, coreMemoryTable.core_memory_slot],
      set: {
        content,
        created_at,
      },
    });
};
const getByEmbedding = async (args: {
  user_id: string;
  embedding: number[];
}) => {
  const { user_id, embedding } = args;

  const similarity = sql<number>`1 - (${cosineDistance(memoryTable.embedding, embedding)})`;

  const memories = await db
    .select()
    .from(memoryTable)
    .where(and(eq(memoryTable.user_id, user_id), sql`${similarity} > 0.4`))
    // Order by similarity
    .orderBy(desc(similarity))
    .limit(MAX_MEMORIES);

  return memories;
};

const getCoreMemories = async (args: { user_id: string }) => {
  const { user_id } = args;

  const memories = await db
    .select()
    .from(coreMemoryTable)
    .where(and(eq(coreMemoryTable.user_id, user_id)))
    .orderBy(asc(coreMemoryTable.core_memory_slot))
    .limit(MAX_CORE_MEMORIES);

  console.log("Core Memories", memories);

  return memories;
};

const memory = {
  create,
  getByEmbedding,
  getCoreMemories,
  createCoreMemory,
};

export default memory;
