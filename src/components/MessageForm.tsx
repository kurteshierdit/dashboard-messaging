"use client";

import { useState } from "react";

type Props = {
  onSubmit: (recipient: string, message: string) => void;
};

export default function MessageForm({ onSubmit }: Props) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient || !message) return;

    setIsSubmitting(true);
    try {
      await onSubmit(recipient, message);
      setRecipient("");
      setMessage("");
    } catch (error) {
      console.error("Message submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid = !recipient.trim() || !message.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4"
    >
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full md:w-1/4 border border-gray-300 rounded px-4 py-2 placeholder-gray-600 text-black"
      />

      <input
        type="text"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full md:flex-1 border border-gray-300 rounded px-4 py-2 placeholder-gray-600 text-black"
      />

      <button
        type="submit"
        disabled={isSubmitting || isFormInvalid}
        className="bg-gray-800 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
