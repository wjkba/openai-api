"use client";
import React from "react";
import { HiMenu } from "react-icons/hi";

interface ChatSidebarProps {
  isSidebarShown: boolean;
  onToggle: () => void;
}

function ChatSidebar({ isSidebarShown, onToggle }: ChatSidebarProps) {
  if (!isSidebarShown) {
    return null;
  }

  return (
    <div className="h-full bg-white p-4 rounded-md ">
      <div className="mb-4">
        <button onClick={onToggle} className="p-2 cursor-pointer">
          <HiMenu size={24} />
        </button>
      </div>
      <ol className="flex flex-col gap-2">
        <li className="p-2 bg-neutral-200 rounded-md">Chat #1</li>
        <li className="p-2 rounded-md">Chat #1</li>
      </ol>
    </div>
  );
}

export default ChatSidebar;
