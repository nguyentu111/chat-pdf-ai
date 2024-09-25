"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";

type Props = {
  imgUrl: string;
  name: string;
};

export const UserButton = ({ imgUrl, name }: Props) => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/api/sign-out");
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={imgUrl} alt="@shadcn" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit py-2">
        <button onClick={handleLogout}>Đăng xuất</button>
      </PopoverContent>
    </Popover>
  );
};
