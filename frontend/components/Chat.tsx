"use client";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import Message from "./Message";
import LoadingDot from "./LoadingDot";

type Message = {
  content: string;
  role: "user" | "assistant";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Greetings, human. 🤖🔧 How may I assist you today?",
      role: "assistant",
    },
  ]);
  const [previousResponseId, setPreviousResponseId] = useState<null | string>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    setMessages((prev) => [...prev, { content: messageText, role: "user" }]);
    setIsLoading(true);

    try {
      setMessages((prev) => [...prev, { content: "", role: "assistant" }]);

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          previousResponseId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response body is null");

      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        console.log(chunk);

        const lines = chunk.split(`\n`);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6);

            if (data === "[DONE]") continue;

            fullResponse += data;

            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                content: fullResponse,
                role: "assistant",
              };
              return newMessages;
            });
          }
        }
      }

      //TODO: fix response id
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: "Sorry, something went wrong. Please try again.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl p-4 h-[95dvh] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} content={msg.content} role={msg.role} />
        ))}
        {isLoading && <LoadingDot />}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-2">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
