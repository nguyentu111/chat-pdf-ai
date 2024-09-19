import ClientOnly from "@/components/ClientOnly";
import { ResizePanels } from "@/components/resize-panels";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const _chats = await db.query.chats.findMany({
    where: eq(chats.userId, userId!),
  });
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex w-full  ">
        <ClientOnly>
          <ResizePanels chats={_chats}>{children}</ResizePanels>
        </ClientOnly>
      </div>
    </div>
  );
}
