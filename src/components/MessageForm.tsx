"use client";

import { useState } from "react";

export default function MessageForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {};

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
        className="bg-gray-800 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
