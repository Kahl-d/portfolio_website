import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { api, ChatMessage } from "@/lib/api";

interface NoMiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoMiOverlay({ isOpen, onClose }: NoMiOverlayProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I am No-Mi.ai. I am powered by a Python backend. How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await api.chat(userMsg.content, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error connecting to server. Please check if the backend is running." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-[160] flex flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.95)] shadow-2xl backdrop-blur-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.5)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif tracking-tight text-[hsl(var(--foreground))]">no-mi.ai</h2>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">INTELLIGENT ASSISTANT V1.0</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[hsl(var(--muted))] transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-[hsl(var(--foreground))]" />
              </button>
            </div>

            {/* Content Area - Chat Interface */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${msg.role === "assistant"
                        ? "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]"
                        : "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                        }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[hsl(var(--muted))] p-4 rounded-2xl flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[hsl(var(--muted-foreground))]" />
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--background)/0.5)]">
                <form onSubmit={handleSendMessage} className="flex gap-4 max-w-4xl mx-auto">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all placeholder:text-[hsl(var(--muted-foreground))]"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Send</span>
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
