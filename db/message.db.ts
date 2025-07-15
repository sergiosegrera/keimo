import { and, desc, eq, gt, lt } from "drizzle-orm";
import db from "@/db/client";
import { messageTable } from "./schema/message.schema";

const DEFAULT_LIMIT = 10;
// 1 Hour
const MESSAGE_TTL = 60 * 60 * 1000;

const getPrevious = async (args: { user_id: string; date: Date }) => {
  const { user_id, date } = args;

  const messages = await db
    .select({
      message_id: messageTable.message_id,
      message: messageTable.message,
      created_at: messageTable.created_at,
      role: messageTable.role,
    })
    .from(messageTable)
    .where(
      and(eq(messageTable.user_id, user_id), gt(messageTable.expires_at, date)),
    )
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

const deleteExpired = async (args: { user_id: string; date: Date }) => {
  const { user_id, date } = args;

  await db
    .delete(messageTable)
    .where(
      and(eq(messageTable.user_id, user_id), lt(messageTable.expires_at, date)),
    );
};

const message = {
  getPrevious,
  create,
  deleteExpired,
};

export default message;
