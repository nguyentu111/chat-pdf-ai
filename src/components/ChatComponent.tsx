"use client";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { cn } from "@/lib/utils";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const [, setIsLoadingChat] = useState(false); // Track loading state

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading: isLoadingChat,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],

    async experimental_onFunctionCall(chatMessages, functionCall) {
      setIsLoadingChat(true);
    },
  });
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="flex flex-col h-screen ">
      {/* header */}
      <div className=" p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      <div className="flex-1 overflow-auto" ref={containerRef}>
        <div className="flex flex-col gap-2 px-4 py-4 relative">
          <MessageList messages={messages} isLoading={isLoading} />
          {isLoadingChat && ( // Show loading only when waiting for response
            <div className={cn("flex justify-start pr-10")}>
              <div
                className={cn(
                  "rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10 flex justify-center items-center space-x-2"
                )}
              >
                <div className="w-2.5 h-2.5 bg-black rounded-full animate-dot-pulse"></div>
                <div className="w-2.5 h-2.5 bg-black rounded-full animate-dot-pulse delay-150"></div>
                <div className="w-2.5 h-2.5 bg-black rounded-full animate-dot-pulse delay-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-auto px-2 py-4 bg-white">
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
