import React from "react";
import { render, screen } from "@testing-library/react";
import MessageHistory from "@/components/MessageHistory";
import type { Message } from "@/lib/messageStore";
import { describe, it, expect } from "vitest";

const mockMessages: Message[] = [
  {
    id: "1",
    recipient: "Alice",
    message: "Hello!",
    status: "Sent",
  },
  {
    id: "2",
    recipient: "Bob",
    message: "How are you?",
    status: "Delivered",
  },
];

describe("MessageHistory", () => {
  it("renders loading message when loading is true", () => {
    render(<MessageHistory messages={[]} loading={true} />);
    expect(screen.getByText(/loading messages/i)).toBeInTheDocument();
  });

  it("renders empty state when no messages", () => {
    render(<MessageHistory messages={[]} loading={false} />);
    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
  });

  it("renders a list of messages when provided", () => {
    render(<MessageHistory messages={mockMessages} loading={false} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });
});
