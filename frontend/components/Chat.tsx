"use client";
import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import LoadingDot from "./LoadingDot";
import { HiMenu } from "react-icons/hi";
import { useChat } from "@/hooks/useChat";

interface ChatProps {
  onShowSidebar?: () => void;
}

export default function Chat({ onShowSidebar }: ChatProps) {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="rounded-xl p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {onShowSidebar && (
          <button onClick={onShowSidebar} className="p-2 cursor-pointer">
            <HiMenu size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} role={msg.role} />
        ))}
        {isLoading && <LoadingDot />}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-2">
        <ChatInput isLoading={isLoading} onSendMessage={sendMessage} />
      </div>
    </div>
  );
}
