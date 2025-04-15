"use client";

const mockDataMessages = [
  { id: 1, recipient: "Alice", message: "Hello there!", status: "Sent" },
  { id: 2, recipient: "Bob", message: "How are you?", status: "Delivered" },
  { id: 3, recipient: "Eve", message: "Test message", status: "Failed" },
];

export default function MessageHistory() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-black">Message History</h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse cursor-pointer">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Recipient</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockDataMessages.map(({ id, recipient, message, status }) => (
              <tr key={id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-black">{recipient}</td>
                <td className="px-4 py-2 text-black">{message}</td>
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
    </div>
  );
}
