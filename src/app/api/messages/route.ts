import { NextResponse } from "next/server";
import { messages, Message } from "@/lib/messageStore";
import { v4 as uuid } from "uuid";

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { recipient, message } = await request.json();

  const newMessage: Message = {
    id: uuid(),
    recipient,
    message,
    status: "Sent",
  };

  messages.push(newMessage);

  return NextResponse.json(newMessage, { status: 201 });
}
