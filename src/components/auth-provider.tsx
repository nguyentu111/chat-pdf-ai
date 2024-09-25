"use client";
import { auth } from "@/lib/auth";
import { User } from "lucia";
import { Session } from "lucia";

import { createContext, useContext } from "react";

const authContext = createContext<{
  user: User | null;
  session: Session | null;
}>({
  user: null,
  session: null,
});

export const AuthProvider = ({
  children,
  user,
  session,
}: {
  children: React.ReactNode;
  user: User | null;
  session: Session | null;
}) => {
  return (
    <authContext.Provider value={{ user, session }}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
