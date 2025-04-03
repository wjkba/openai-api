"use client";
import { useState } from "react";
import ChatInput from "./ChatInput";

type MessageProps = {
  content: string;
  isUser?: boolean;
};

function Message({ content, isUser = false }: MessageProps) {
  return (
    <div
      className={`
        max-w-[80%] p-3 rounded-lg  text-black
        ${isUser ? "bg-blue-300 ml-auto " : "bg-neutral-300"}
      `}
    >
      {content}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<
    Array<{ content: string; isUser: boolean }>
  >([{ content: "Hello! How can I help you today?", isUser: false }]);

  const handleSendMessage = (messageText: string) => {
    setMessages((prev) => [...prev, { content: messageText, isUser: true }]);

    // demo reponse
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: `You said: "${messageText}". This is a demo response.`,
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="border rounded-xl p-4 bg-[#121212] h-[90dvh] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} isUser={msg.isUser} />
        ))}
      </div>
      <div className="mt-2">
        <ChatInput />
        {/* <ChatInput onSendMessage={handleSendMessage} /> */}
      </div>
    </div>
  );
}
