import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Bot, ArrowRight, LayoutGrid, FileText, Mail, Briefcase, Terminal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { api, ChatMessage } from "@/lib/api";

interface NoMiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (section: string) => void;
}

// Typewriter effect component for smooth text reveal
const TypewriterText = ({ content }: { content: string }) => {
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const speed = 10; // ms per char - fast but perceptible

    const interval = setInterval(() => {
      if (currentIndex <= content.length) {
        setDisplayedContent(content.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content]);

  return <ReactMarkdown>{displayedContent}</ReactMarkdown>;
};

export default function NoMiOverlay({ isOpen, onClose, onNavigate }: NoMiOverlayProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi, I'm glad you want to know about Khalid. Tell me where to start." }
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
      const response = await api.chat(userMsg.content, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ **Connection Failure**. Neural link unstable. check backend systems." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string, label: string) => {
    // Navigate immediately - Instant Feedback
    onNavigate?.(action);

    // Add artificial interaction sequence
    const userMsg: ChatMessage = { role: "user", content: `Load ${label} module.` };
    setMessages(prev => [...prev, userMsg]);

    setIsLoading(true);
    // Simulate "processing" briefly then confirm
    setTimeout(() => {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `**${label}** sequence initiated. \n\nNeed specific details on this topic?`
      }]);
    }, 800);
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
            className="fixed inset-4 md:inset-12 lg:inset-20 z-[150] overflow-hidden flex flex-col md:flex-row border border-white/10 bg-[#050505] rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Side Panel (Desktop) */}
            <div className="hidden md:flex flex-col w-72 border-r border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="font-mono font-bold text-white tracking-widest block text-lg">NO-MI</span>
                  <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase opacity-80">v3.0 // Online</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 pl-1">Target Systems</p>
                <button onClick={() => handleQuickAction('experience', 'Experience')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-sm font-medium group border border-transparent hover:border-white/5">
                  <Briefcase className="w-4 h-4 text-indigo-500/70 group-hover:text-indigo-400 transition-colors" />
                  <span className="tracking-wide">Experience</span>
                </button>
                <button onClick={() => handleQuickAction('writing', 'Writing')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-sm font-medium group border border-transparent hover:border-white/5">
                  <FileText className="w-4 h-4 text-indigo-500/70 group-hover:text-indigo-400 transition-colors" />
                  <span className="tracking-wide">Writing</span>
                </button>
                <button onClick={() => handleQuickAction('highlights', 'Highlights')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-sm font-medium group border border-transparent hover:border-white/5">
                  <LayoutGrid className="w-4 h-4 text-indigo-500/70 group-hover:text-indigo-400 transition-colors" />
                  <span className="tracking-wide">Highlights</span>
                </button>
                <button onClick={() => handleQuickAction('contact', 'Contact')} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-sm font-medium group border border-transparent hover:border-white/5">
                  <Mail className="w-4 h-4 text-indigo-500/70 group-hover:text-indigo-400 transition-colors" />
                  <span className="tracking-wide">Contact</span>
                </button>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-3 h-3 text-indigo-500" />
                  <span className="text-[10px] text-indigo-500 font-mono">System Status: Stable</span>
                </div>
                <p className="text-[10px] text-white/30 leading-relaxed font-light">
                  Powered by Gemini Flash. <br />
                  Neural Latency: 45ms.
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-[#090909]">
              {/* Header (Mobile only has Close) */}
              <div className="absolute top-0 right-0 p-6 z-20">
                <button
                  onClick={onClose}
                  className="group p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* Spacer for header */}
                <div className="h-6 md:h-2" />

                {messages.map((msg, i) => {
                  const isBot = msg.role === "assistant";
                  const isLastBotMessage = isBot && i === messages.length - 1 && !isLoading;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex w-full ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`flex gap-5 max-w-[90%] md:max-w-[80%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                        {isBot && (
                          <div className="flex-shrink-0 mt-1 hidden md:flex flex-col items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div className="w-px h-full bg-indigo-500/10" />
                          </div>
                        )}

                        <div className={`
                                        group relative text-sm md:text-[15px] leading-relaxed
                                        ${isBot
                            ? "text-slate-300"
                            : "bg-[#151515] border border-white/10 text-white p-4 rounded-2xl rounded-tr-sm shadow-xl"
                          }
                                    `}>
                          {/* Bot messages are clean text without bubbles for a modern "terminal" feel, User gets bubbles */}
                          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-indigo-400 prose-code:text-amber-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-ul:list-disc prose-li:my-1">
                            {isBot ? (
                              /* Only typewrite the LAST bot message for effect */
                              isLastBotMessage ? <TypewriterText content={msg.content} /> : <ReactMarkdown>{msg.content}</ReactMarkdown>
                            ) : (
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            )}
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
                    className="flex justify-start w-full pl-[52px]" // Align with bot messages
                  >
                    <div className="flex items-center gap-1.5 h-8">
                      <span className="text-xs font-mono text-indigo-500/50 animate-pulse">thinking</span>
                      <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-1 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-8 bg-[#090909] border-t border-white/5">
                <form onSubmit={(e) => handleSendMessage(e)} className="relative flex gap-4 max-w-4xl">
                  <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask No-Mi about Khalid's work..."
                      className="relative w-full px-5 py-4 bg-[#111] border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:bg-[#151515] transition-all font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="relative px-5 rounded-xl bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                  >
                    <ArrowRight className="w-5 h-5 relative z-10" />
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
