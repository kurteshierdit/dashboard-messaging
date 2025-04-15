import MessageForm from "@/components/MessageForm";
import MessageHistory from "@/components/MessageHistory";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Messaging Dashboard
        </h1>

        <MessageForm />
        <MessageHistory />
      </div>
    </main>
  );
}
