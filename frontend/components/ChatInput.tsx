"use client";
export default function ChatInput() {
  return (
    <div className="bg-neutral-600 w-full flex justify-between">
      <input type="text" className="flex-1" />
      <button className="bg-blue-500 px-8 rounded-lg py-2 m-2">Send</button>
    </div>
  );
}
