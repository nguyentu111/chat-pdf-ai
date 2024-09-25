"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

import ClientOnly from "@/components/ClientOnly";

import { UserButton } from "@/components/user-button";
import { useAuth } from "@/components/auth-provider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DrizzleChat, ProfileSchema } from "@/server/db/schema";
export default function Home() {
  const { user, session } = useAuth();
  const { data: profile } = useQuery<ProfileSchema>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axios.get("/api/profile");
      console.log("profile data", data);
      return data;
    },
  });
  const { data: chats } = useQuery<DrizzleChat[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      console.log("calling chats");
      const { data } = await axios.get("/api/chats");
      return data;
    },
  });
  const firstChat = chats?.[0];
  console.log({ user, session, chats, profile });
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            {user && (
              <UserButton
                imgUrl={profile?.image!}
                name={profile?.displayName!}
              />
            )}
          </div>

          <div className="flex mt-2">
            {user && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {user ? (
              <ClientOnly>
                <FileUpload />
              </ClientOnly>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
