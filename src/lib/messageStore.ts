export type Message = {
  id: string;
  recipient: string;
  message: string;
  status: "Sent" | "Delivered" | "Failed";
};

export const messages: Message[] = [
  {
    id: "1",
    recipient: "Alice",
    message: "Hey, this is a message from Alice",
    status: "Sent",
  },
  {
    id: "2",
    recipient: "Bob",
    message: "Bob message",
    status: "Delivered",
  },
  {
    id: "3",
    recipient: "Charlie",
    message: "This is my only message",
    status: "Failed",
  },
];
