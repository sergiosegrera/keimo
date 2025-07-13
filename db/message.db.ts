import { desc, eq } from "drizzle-orm";
import db from "@/db/client";
import { messageTable } from "./schema/message.schema";

const DEFAULT_LIMIT = 10;
// 30 Minutes
const MESSAGE_TTL = 30 * 60 * 1000;

const getPrevious = async (args: { user_id: string }) => {
  const { user_id } = args;

  const messages = await db
    .select({
      message_id: messageTable.message_id,
      message: messageTable.message,
      created_at: messageTable.created_at,
      role: messageTable.role,
    })
    .from(messageTable)
    .where(eq(messageTable.user_id, user_id))
    .orderBy(desc(messageTable.created_at))
    .limit(DEFAULT_LIMIT);

  return messages;
};

const create = async (args: {
  user_id: string;
  message: string;
  role: string;
  created_at: Date;
}) => {
  const { user_id, message, role, created_at } = args;

  await db.insert(messageTable).values({
    user_id,
    message,
    role,
    expires_at: new Date(created_at.getTime() + MESSAGE_TTL),
    created_at,
  });
};

const message = {
  getPrevious,
  create,
};

export default message;
