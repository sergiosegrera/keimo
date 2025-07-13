import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema/user.schema";
import db from "./client";

const getUsers = async () => {
  const users = await db.select().from(userTable);

  return users;
};

const getUser = async (args: { user_id: string }) => {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.user_id, args.user_id));

  return user;
};

const createUser = async (args: { user_id: string }) => {
  const user = await db.insert(userTable).values(args).returning();

  return user;
};

const user = {
  getUsers,
  getUser,
  createUser,
};

export default user;
