import { db } from "@/server/db";
import { UserSchema, accounts, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { UserId } from "@/server/use-cases/types";
import { getAccountByUserId } from "@/server/data-access/accounts";

const ITERATIONS = 10000;
const MAGIC_LINK_TOKEN_TTL = 1000 * 60 * 5; // 5 min

export async function deleteUser(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUser(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

export async function createUser(email: string) {
  const inserted = await db.insert(users).values({ email }).$returningId();
  return await db.query.users.findFirst({
    where: eq(users.id, inserted[0].id),
  });
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password == hash;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function getMagicUserAccountByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function setEmailVerified(userId: UserId) {
  await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUser(
  userId: UserId,
  updatedUser: Partial<UserSchema>
) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}
