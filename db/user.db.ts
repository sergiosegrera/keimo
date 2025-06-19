import { userTable } from "@/db/schema/user.schema";
import db from "./client";

const getUsers = async () => {
  const users = await db.select().from(userTable);

  return users;
};

const user = {
  getUsers,
};

export default user;
