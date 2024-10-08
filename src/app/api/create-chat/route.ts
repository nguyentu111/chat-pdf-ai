import { db } from "@/server/db";
import { chats } from "@/server/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const { user } = await auth();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const existingChats = await db.query.chats.findMany({
      where: eq(chats.userId, user.id),
    });
    if (existingChats.length >= 10)
      return NextResponse.json(
        { error: "Sorry, we currently suport 10 pdfs per user" },
        { status: 400 }
      );
    const body = await req.json();
    const { file_key, file_name } = body;
    await loadS3IntoPinecone(file_key);

    const [chat_id] = await db.insert(chats).values({
      fileKey: file_key,
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      userId: user.id,
    });

    chat_id.insertId;
    return NextResponse.json(
      {
        chat_id: chat_id.insertId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
