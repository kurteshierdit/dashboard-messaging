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
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          New Message
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-white">
          Recipient
        </label>
        <input
          type="text"
          placeholder="Enter recipient name"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-white">
          Message
        </label>
        <textarea
          placeholder="Enter your message here..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded placeholder-gray-600 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isFormInvalid}
        className="w-full px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
