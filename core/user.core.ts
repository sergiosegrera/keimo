"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/db";

// import { currentUser } from "@clerk/nextjs/server";

const getUsers = async () => {
  //   const user = await currentUser();

  const users = await db.user.getUsers();

  return users;
};

const getUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const [user] = await db.user.getUser({ user_id: clerkUser.id });

  if (!user) {
    const [newUser] = await db.user.createUser({
      user_id: clerkUser.id,
    });

    return newUser;
  }

  return user;
};

export { getUsers, getUser };
