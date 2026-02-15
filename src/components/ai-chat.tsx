"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    // Add user message
    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Read the stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        // Append streamed text to the last (assistant) message
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + text,
          };
          return updated;
        });
      }
    } catch {
      // Replace empty assistant message with error
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't connect right now. Please try again or use the contact form.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  const suggestedQuestions = [
    "What technologies do you work with?",
    "Tell me about your experience",
    "What kind of projects have you built?",
  ];

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle AI chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-4 left-4 z-50 flex h-[70vh] max-h-[500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl sm:left-auto sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-muted">Ask me anything about this portfolio</p>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <Bot className="h-10 w-10 text-white/10" />
                  <div>
                    <p className="text-sm text-muted">Hi! Ask me anything about</p>
                    <p className="text-sm text-muted">this developer&apos;s work.</p>
                  </div>
                  {/* Suggested questions */}
                  <div className="flex flex-col gap-2 w-full mt-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          inputRef.current?.focus();
                        }}
                        className="rounded-lg border border-white/5 px-3 py-2 text-left text-xs text-muted transition-colors hover:border-accent/30 hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Bot className="h-3.5 w-3.5 text-accent" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-md"
                        : "bg-white/5 text-white/90 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                    {msg.role === "assistant" && msg.content === "" && isStreaming && (
                      <motion.span
                        className="inline-flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </motion.span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="border-t border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isStreaming}
                  className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-accent disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent/80 disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
