import { UserSchema } from "@/server/db/schema";

export type UserId = UserSchema["id"];
export type UserProfile = {
  id: UserId;
  name: string | null;
  image: string | null;
};

export type UserSession = {
  id: UserId;
};
