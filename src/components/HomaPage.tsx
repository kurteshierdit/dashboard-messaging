"use client";

import { useEffect, useState } from "react";
import DataMetrics from "@/components/DataMetrics";
import MessageForm from "@/components/MessageForm";
import MessageHistory from "@/components/MessageHistory";
import { Message } from "@/lib/messageStore";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import ToggleButton from "./ToggleButton";
import { ThemeProvider } from "@/context/ThemeContext";

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

      toast.success("Message sent!");
    } catch (err) {
      console.error("Failed to submit message:", err);
      toast.error("Message failed to send");
    }
  };

  return (
    <>
      <ThemeProvider>
        <main className="min-h-screen bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Messaging Dashboard
              </h1>
              <ToggleButton />
            </div>

            <MessageForm onSubmit={handleAddMessage} />
            <MessageHistory messages={messages} loading={loading} />
            <DataMetrics refreshData={statsRefresh} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
