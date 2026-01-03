import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Bot, ArrowRight, LayoutGrid, FileText, Mail, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { api, ChatMessage } from "@/lib/api";

interface NoMiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (section: string) => void;
}

export default function NoMiOverlay({ isOpen, onClose, onNavigate }: NoMiOverlayProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Systems online. **No-Mi.ai** ready. Explore the portfolio via the panel or ask me anything." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const text = overrideText || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Mock checking for navigation intent in a real agent, here we assume direct interaction via buttons or simple chat
      // For now, standard chat. If we had a real classifier, we'd use it here.
      const response = await api.chat(userMsg.content, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ **Connection Failure**. Neural link unstable. check backend systems." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string, label: string) => {
    // Navigate immediately
    onNavigate?.(action);

    // Add system message indicating action
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `Navigating to **${label}**...`
    }]);
  };

  // Variants for animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: "spring", damping: 25, stiffness: 300 } as any
    },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Main Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-12 lg:inset-20 z-[150] overflow-hidden flex flex-col md:flex-row border border-white/10 bg-[#0A0A0A] rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Side Panel (Desktop) */}
            <div className="hidden md:flex flex-col w-64 border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-mono font-bold text-white tracking-widest">NO-MI</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Quick Navigation</p>
                <button onClick={() => handleQuickAction('experience', 'Experience')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-medium group">
                  <Briefcase className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  Experience
                </button>
                <button onClick={() => handleQuickAction('writing', 'Writing')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-medium group">
                  <FileText className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  Writing
                </button>
                <button onClick={() => handleQuickAction('highlights', 'Highlights')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-medium group">
                  <LayoutGrid className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  Highlights
                </button>
                <button onClick={() => handleQuickAction('contact', 'Contact')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-medium group">
                  <Mail className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  Contact
                </button>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-[10px] text-white/30 leading-relaxed">
                  No-Mi v2.4<br />
                  Neural Interface Active
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-black/50">
              {/* Header (Mobile only has Close) */}
              <div className="absolute top-0 right-0 p-4 z-20">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Spacer for header */}
                <div className="h-4 md:h-0" />

                {messages.map((msg, i) => {
                  const isBot = msg.role === "assistant";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex w-full ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`flex gap-4 max-w-[90%] md:max-w-[75%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                        {isBot && (
                          <div className="flex-shrink-0 mt-1 hidden md:flex">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                            </div>
                          </div>
                        )}

                        <div className={`
                                        p-4 md:p-5 rounded-2xl relative text-sm md:text-base
                                        ${isBot
                            ? "bg-[#1A1A1A] border border-white/5 text-slate-200"
                            : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                          }
                                    `}>
                          <div className="prose prose-invert prose-sm max-w-none leading-relaxed">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start w-full"
                  >
                    <div className="flex gap-4 max-w-[85%]">
                      <div className="hidden md:flex w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 items-center justify-center">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex items-center gap-1 h-10 px-4 rounded-2xl bg-[#1A1A1A] border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 bg-[#0A0A0A] border-t border-white/10">
                <form onSubmit={(e) => handleSendMessage(e)} className="relative flex gap-4 max-w-5xl mx-auto">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Message No-Mi..."
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-5 rounded-xl bg-white text-black font-bold hover:bg-indigo-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5" />
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
