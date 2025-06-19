"use server";

import db from "@/db";
// import { currentUser } from "@clerk/nextjs/server";

const getUsers = async () => {
  //   const user = await currentUser();

  const users = await db.user.getUsers();

  return users;
};

export { getUsers };
