import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { profiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { user, session } = await auth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });
  return NextResponse.json(profile, { status: 200 });
}
