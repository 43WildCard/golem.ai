import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import golemLogo from "@/assets/golem-logo.png";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  imageUrl?: string;
}

export const ChatMessage = ({ role, content, isStreaming, imageUrl }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-primary"
            : "bg-secondary border border-border overflow-hidden"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <img src={golemLogo} alt="Golem AI" className="w-full h-full object-cover" />
        )}
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={`max-w-[80%] ${
          isUser ? "chat-bubble-user px-4 py-3" : "chat-bubble-ai px-4 py-3"
        }`}
      >
        {imageUrl && (
          <div className="mb-3">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full h-auto rounded-lg max-h-64 object-contain"
            />
          </div>
        )}
        
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        ) : (
          <div className="min-w-0">
            <MarkdownRenderer content={content} />
            {isStreaming && (
              <span className="typing-cursor inline-block w-2 h-5 bg-primary ml-1 align-middle" />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
