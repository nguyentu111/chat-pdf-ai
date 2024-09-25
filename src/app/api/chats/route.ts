import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { chats } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { user } = await auth();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const userChats = await db.query.chats.findMany({
    where: eq(chats.userId, user.id),
  });
  return NextResponse.json(userChats, { status: 200 });
}
