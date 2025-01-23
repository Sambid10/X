import { User, Coversation, UserCoversation, Message } from "@prisma/client";

export type FullMessage = Message & {
  sender: User;
  seen: User[];
};

export type FullConversation = {
  user: User; // User participating in the conversation
  conversation: Coversation & {
    messages: FullMessage[];
    participants: UserCoversation[];
  };
};

export type Conversations = FullConversation[];
