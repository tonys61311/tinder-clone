export interface Message {
  text: string;
  isSelf: boolean;
}

export interface User {
  id: string;
  photos: string[];
  avatar: string;
  name: string;
  age: number;
  messages: Message[];
  timestamp?: number;
  hasNewMessage?: boolean;
  isVerified?: boolean;
}