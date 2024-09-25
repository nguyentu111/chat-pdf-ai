import {
  createUser,
  deleteUser,
  getUserByEmail,
  verifyPassword,
} from "@/server/data-access/users";
import { UserId, UserSession } from "@/server/use-cases/types";
import {
  createAccountViaGithub,
  createAccountViaGoogle,
} from "@/server/data-access/accounts";
import { createProfile, getProfile } from "@/server/data-access/profiles";
import { GitHubUser } from "@/app/api/login/github/callback/route";

import { AuthenticationError, LoginError, NotFoundError } from "./errors";
import { GoogleUser } from "@/app/api/login/google/callback/route";

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new AuthenticationError();
  }

  await deleteUser(userToDeleteId);
}

export async function getUserProfileUseCase(userId: UserId) {
  const profile = await getProfile(userId);

  if (!profile) {
    throw new NotFoundError();
  }

  return profile;
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }

  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmail(githubUser.email);

  await createAccountViaGithub(existingUser!.id, githubUser.id);

  await createProfile(
    existingUser!.id,
    githubUser.login,
    githubUser.avatar_url
  );

  return existingUser!.id;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
    console.log({ existingUser });
  }

  await createAccountViaGoogle(existingUser!.id, googleUser.sub);

  await createProfile(existingUser!.id, googleUser.name, googleUser.picture);

  return existingUser!.id;
}
