import ClientOnly from "@/components/ClientOnly";
import { ResizePanels } from "@/components/resize-panels";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { chats } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await auth();
  if (!user) redirect("/sign-in");
  const _chats = await db.query.chats.findMany({
    where: eq(chats.userId, user.id),
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
