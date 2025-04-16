"use client";

import { useEffect, useState } from "react";
import DataMetrics from "@/components/DataMetrics";
import MessageForm from "@/components/MessageForm";
import MessageHistory from "@/components/MessageHistory";
import { Message } from "@/lib/messageStore";
import { v4 as uuid } from "uuid";

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsRefresh, setStatsRefresh] = useState(0);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    }

    fetchMessages();
  }, []);

  const handleAddMessage = async (recipient: string, content: string) => {
    const temporaryId = uuid();

    const optimisticMessage: Message = {
      id: temporaryId,
      recipient,
      message: content,
      status: "Sent",
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, message: content }),
      });

      const saved = await res.json();

      setMessages((prev) =>
        prev.map((message) =>
          message.id === optimisticMessage.id ? saved : message
        )
      );

      setStatsRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to submit message:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Messaging Dashboard
        </h1>

        <MessageForm onSubmit={handleAddMessage} />
        {loading ? (
          <p className="text-gray-500 text-sm">Loading messages...</p>
        ) : (
          <MessageHistory messages={messages} />
        )}
        <DataMetrics refreshData={statsRefresh} />
      </div>
    </main>
  );
}
