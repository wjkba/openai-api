import Chat from "@/components/Chat";
import ChatSidebar from "@/components/ChatSidebar";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chat");

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
