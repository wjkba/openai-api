"use client";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import Message from "./Message";
import LoadingDot from "./LoadingDot";

export default function Chat() {
  const [messages, setMessages] = useState<
    Array<{ content: string; role: "user" | "assistant" }>
  >([
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
      const response = await axios.post("/api/chat", {
        message: messageText,
        previousResponseId,
      });

      console.log(response.data);

      setMessages((prev) => [
        ...prev,
        { content: response.data.output_text, role: "assistant" },
      ]);
      setPreviousResponseId(response.data.id);
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
