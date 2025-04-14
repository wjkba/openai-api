"use client";
import Chat from "@/components/Chat";
import ChatSidebar from "@/components/ChatSidebar";
import { useState } from "react";

export default function ChatPage() {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  const showSidebar = () => {
    setIsSidebarShown(true);
  };

  const hideSidebar = () => {
    setIsSidebarShown(false);
  };

  return (
    <div className="flex gap-6 h-[90vh] p-4">
      {isSidebarShown && (
        <div className="w-1/5">
          <ChatSidebar isSidebarShown={isSidebarShown} onToggle={hideSidebar} />
        </div>
      )}
      <div className="flex-1 bg-white rounded-md">
        <Chat onShowSidebar={!isSidebarShown ? showSidebar : undefined} />
      </div>
    </div>
  );
}
