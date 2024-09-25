import { db } from "@/server/db";
import { ProfileSchema, profiles } from "@/server/db/schema";
import { UserId } from "@/server/use-cases/types";
import { eq } from "drizzle-orm";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string
) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      image,
      displayName,
    })
    .onDuplicateKeyUpdate({ set: { displayName, image } });
  return await db.query.profiles.findFirst({
    where: eq(profiles.id, profile.insertId),
  });
}

export async function updateProfile(
  userId: UserId,
  updateProfile: Partial<ProfileSchema>
) {
  await db
    .update(profiles)
    .set(updateProfile)
    .where(eq(profiles.userId, userId));
}

export async function getProfile(userId: UserId) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}
