import { v4 as uuidv4 } from "uuid";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  imageUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "golem_ai_chats";

export function getAllChats(): ChatSession[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getChat(id: string): ChatSession | null {
  const chats = getAllChats();
  return chats.find((chat) => chat.id === id) || null;
}

export function createNewChat(): ChatSession {
  const newChat: ChatSession = {
    id: uuidv4(),
    title: "Chat Baru",
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  const chats = getAllChats();
  chats.unshift(newChat);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  
  return newChat;
}

export function updateChat(id: string, updates: Partial<ChatSession>): ChatSession | null {
  const chats = getAllChats();
  const index = chats.findIndex((chat) => chat.id === id);
  
  if (index === -1) return null;
  
  chats[index] = {
    ...chats[index],
    ...updates,
    updatedAt: Date.now(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  return chats[index];
}

export function addMessageToChat(
  chatId: string,
  message: Omit<Message, "id" | "timestamp">
): Message {
  const chats = getAllChats();
  const index = chats.findIndex((chat) => chat.id === chatId);
  
  if (index === -1) {
    throw new Error("Chat not found");
  }
  
  const newMessage: Message = {
    ...message,
    id: uuidv4(),
    timestamp: Date.now(),
  };
  
  chats[index].messages.push(newMessage);
  chats[index].updatedAt = Date.now();
  
  // Update title based on first user message
  if (chats[index].messages.filter(m => m.role === "user").length === 1 && message.role === "user") {
    chats[index].title = message.content.slice(0, 50) + (message.content.length > 50 ? "..." : "");
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  return newMessage;
}

export function deleteChat(id: string): boolean {
  const chats = getAllChats();
  const filtered = chats.filter((chat) => chat.id !== id);
  
  if (filtered.length === chats.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function clearAllChats(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
