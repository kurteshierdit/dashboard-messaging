import { NextResponse } from "next/server";
import { messages } from "@/lib/messageStore";

export async function GET() {
  const stats = {
    Total: messages.length,
    Sent: messages.filter((message) => message.status === "Sent").length,
    Delivered: messages.filter((message) => message.status === "Delivered")
      .length,
    Failed: messages.filter((message) => message.status === "Failed").length,
  };

  return NextResponse.json(stats);
}
