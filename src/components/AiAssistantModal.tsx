import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  Terminal,
  Copy,
  Check,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  source?: string;
  latencyMs?: number;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Greetings. I am the Maha Growth Strategic Assistant. How can I help you explore our business growth platform, automated workflows, intelligent agents, or full-stack technology architecture?",
      source: "maha-knowledge-core",
      timestamp: "Now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const samplePrompts = [
    "Explain Maha Growth unified platform vs separate agencies",
    "Show me how automated customer agents capture revenue 24/7",
    "What are the data privacy and code ownership guarantees?",
    "How does the Growth Diagnostic Blueprint calculate ROI?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "Request completed via Maha Growth platform nodes.",
        source: data.source || "gemini-3.8-flash",
        latencyMs: data.latencyMs || 120,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: "Maha Growth cluster node dispatched offline fallback: Maha Growth provides unified API gateways, automated workflows, custom AI agents, and real-time revenue telemetry for modern businesses.",
        source: "local-knowledge-mesh",
        latencyMs: 35,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900 dark:bg-white backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full max-w-2xl h-[650px] max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 /50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900">
              <Sparkles className="w-4 h-4 text-white dark:text-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-wide">
                  Maha Growth Strategic Assistant
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse mr-1" />
                  Online
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                Model: gemini-3.8-flash | Sub-150ms latency
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-neutral-900">
          {messages.map((msg) => {
            const isBot = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "items-start" : "items-end justify-end"}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                    isBot
                      ? "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white dark:text-neutral-900 "
                      : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed font-sans">
                    {msg.text}
                  </div>

                  {isBot && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      <span>
                        {msg.source}{" "}
                        {msg.latencyMs ? `• ${msg.latencyMs}ms` : ""}
                      </span>
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-neutral-900 dark:text-white font-bold" />
                            <span className="text-neutral-900 dark:text-white font-bold">
                              Copied
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-neutral-500 dark:text-neutral-400 text-xs font-mono">
              <div className="w-7 h-7 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span className="text-neutral-900 dark:text-white animate-pulse font-medium">
                Evaluating strategic recommendations across Maha Growth nodes...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 /50 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-1.5 font-medium flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-neutral-900 dark:text-white" />
            Suggested Architecture Inquiries:
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] shrink-0 px-2.5 py-1 rounded-md bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all text-left flex items-center gap-1 cursor-pointer"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Maha Growth platform, workflows, AI agents, or architecture..."
              className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors font-mono"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 rounded-xl font-medium text-sm flex items-center gap-1.5 disabled:opacity-40 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
