import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatSession } from "@/lib/chatStorage";
import golemLogo from "@/assets/golem-logo.png";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatSession[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onClearAllHistory: () => void;
}

export const ChatSidebar = ({
  isOpen,
  onClose,
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onClearAllHistory,
}: ChatSidebarProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hari ini";
    if (days === 1) return "Kemarin";
    if (days < 7) return `${days} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50 flex flex-col ${
          isOpen ? "pointer-events-auto" : "pointer-events-none lg:pointer-events-auto"
        } lg:translate-x-0 lg:opacity-100 lg:relative lg:z-auto`}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={golemLogo} alt="Golem AI" className="w-8 h-8 rounded-lg" />
              <span className="font-semibold text-foreground">Golem AI</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Button
            onClick={onNewChat}
            className="w-full gap-2 justify-start"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            Chat Baru
          </Button>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {chats.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Belum ada riwayat chat
              </div>
            ) : (
              chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all ${
                    currentChatId === chat.id
                      ? "bg-sidebar-accent"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-sidebar-foreground">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(chat.updatedAt)}
                      </p>
                    </div>
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {chats.length > 0 && (
            <Button
              onClick={onClearAllHistory}
              variant="destructive"
              size="sm"
              className="w-full gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua Riwayat
            </Button>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Dibuat oleh <span className="text-primary font-medium">Stoky</span>
          </p>
        </div>
      </motion.aside>
    </>
  );
};
