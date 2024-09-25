"use client";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import { PDF } from "@/components/pdf";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DrizzleChat } from "@/server/db/schema";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const ResizePanels = ({
  chats,
  children,
}: {
  children: React.ReactNode;
  chats: DrizzleChat[];
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const regex = /\/chat\/(\d+)/;
  const match = pathname.match(regex);
  let currentChat: DrizzleChat | undefined;
  if (match) {
    const number = parseInt(match[1]);
    currentChat = chats.find((c) => c.id === number);
    if (!currentChat) router.push("/");
  }

  const [tab1DFS, setTab1DFS] = useState(
    parseInt(localStorage.getItem("tab1DFS") ?? "20")
  );
  const [tab2DFS, setTab2DFS] = useState(
    parseInt(localStorage.getItem("tab2DFS") ?? "30")
  );
  const handleResize = (tab: 1 | 2, size: number) => {
    if (tab === 1) {
      setTab1DFS(size);
    } else {
      setTab2DFS(size);
    }
  };
  useEffect(() => {
    localStorage.setItem("tab1DFS", tab1DFS.toString());
  }, [tab1DFS]);
  useEffect(() => {
    localStorage.setItem("tab2DFS", tab2DFS.toString());
  }, [tab2DFS]);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={tab1DFS}
        onResize={(size) => handleResize(1, size)}
      >
        {currentChat && <ChatSideBar chats={chats} chatId={currentChat.id} />}
      </ResizablePanel>
      <ResizableHandle withHandle className="" />
      <ResizablePanel defaultSize={50} className=" relative oveflow-scroll ">
        <div className="z-20 w-full h-full absolute">
          <PDF url={currentChat?.pdfUrl ?? ""} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={tab2DFS}
        className="flex-[3] border-l-4 border-l-slate-200"
        onResize={(size) => handleResize(2, size)}
      >
        {currentChat && <ChatComponent chatId={currentChat.id} />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
