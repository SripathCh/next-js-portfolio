"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Simulate submission — replace with your actual API call or email service
    // Options: Resend, SendGrid, Formspree, or a Next.js API route
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-xl border bg-transparent px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20";

  function borderColor(field: string) {
    if (focused === field) return "border-accent shadow-[0_0_0_1px_var(--accent)]";
    return "border-white/10 hover:border-white/20";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-muted">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          className={`${inputClasses} ${borderColor("name")}`}
        />
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          className={`${inputClasses} ${borderColor("email")}`}
        />
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-muted">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          className={`${inputClasses} resize-none ${borderColor("message")}`}
        />
      </motion.div>

      {/* Submit button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-accent bg-accent/10 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span
                key="idle"
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Send Message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.span>
            )}
            {status === "sending" && (
              <motion.span
                key="sending"
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </motion.span>
            )}
            {status === "success" && (
              <motion.span
                key="success"
                className="flex items-center gap-3 text-green-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="h-4 w-4" />
                Message Sent!
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="error"
                className="flex items-center gap-3 text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="h-4 w-4" />
                Something went wrong. Try again.
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Reset after error */}
      {status === "error" && (
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs text-muted underline hover:text-white"
        >
          Try again
        </button>
      )}
    </form>
  );
}
