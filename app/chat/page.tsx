import type { Metadata } from "next";
import { ChatWorkspace } from "./chat-workspace";

export const metadata: Metadata = {
  title: "New chat · Graftwork app",
};

/** The chat workspace designed in Figma for M8. */
export default function ChatPage() {
  return <ChatWorkspace />;
}
