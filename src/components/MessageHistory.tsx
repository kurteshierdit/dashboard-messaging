"use client";

import { Message } from "@/lib/messageStore";
import React from "react";

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function MessageHistory({ messages, loading }: Props) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Message History
      </h2>

      {loading ? (
        <p className="text-gray-400 dark:text-gray-500 italic">
          Loading messages...
        </p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 italic">
          No messages yet.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg border-gray-200 dark:border-gray-600">
          <table className="w-full text-sm text-left border-collapse cursor-pointer">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Recipient</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(({ id, recipient, message, status }) => (
                <tr
                  key={id}
                  className="border-t border-gray-200 dark:border-gray-600"
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {recipient}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {message}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
