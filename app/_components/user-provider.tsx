"use client";

import { createContext, useContext } from "react";
import type { User } from "@/types/user.type";

const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return <UserContext value={user}>{children}</UserContext>;
}
