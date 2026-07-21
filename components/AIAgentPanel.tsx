"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Msg = { role: "user" | "assistant"; content: string };

// Minimal typings for the Web Speech API (not in the standard TS DOM lib).
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey — I'm Dawn, Launch at Dawn's AI growth agent. Drop your website URL and I'll run a quick live audit, or tell me what you're trying to grow. 👋",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Audit = any;

export default function AIAgentPanel({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<Audit | null>(null);
  const [leadSaved, setLeadSaved] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Set up speech recognition once (browser-native, no dependencies).
  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setVoiceSupported(true);
    const rec: SpeechRecognitionLike = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch {
        /* no-op */
      }
    };
  }, []);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        setInput("");
        rec.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    }
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, audit, leadSaved }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
      if (data.audit) setAudit(data.audit);
      if (data.leadSaved) setLeadSaved(true);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Sorry — I hit a snag on my end. Please try again, or book a free call and a human will jump in: /contact/hello",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080808]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {audit?.url && (
          <div className="mx-auto w-fit text-[10px] font-mono uppercase tracking-widest text-[#F95D0A] border border-[#F95D0A]/30 rounded-full px-3 py-1">
            ● Live audit: {String(audit.url).replace(/^https?:\/\//, "").slice(0, 40)}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[#F95D0A] text-black font-medium rounded-br-sm"
                  : "bg-white/5 text-zinc-200 border border-white/10 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#F95D0A] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-[#F95D0A] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-[#F95D0A] rounded-full animate-bounce" />
            </div>
          </div>
        )}
        {leadSaved && (
          <div className="mx-auto w-fit text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1">
            ✓ Sent to our team
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 focus-within:border-[#F95D0A] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={compact ? 1 : 2}
            placeholder={listening ? "Listening… speak now" : "Type your website or a question…"}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-zinc-600 max-h-32 py-1"
          />
          {voiceSupported && (
            <button
              onClick={toggleListening}
              disabled={loading}
              aria-label={listening ? "Stop recording" : "Speak your message"}
              title={listening ? "Stop recording" : "Speak your message"}
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                listening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>
          )}
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="shrink-0 w-9 h-9 rounded-full bg-[#F95D0A] text-black flex items-center justify-center hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-zinc-600 mt-2">
          Prefer a human?{" "}
          <Link href="/contact/hello" className="text-[#F95D0A] hover:underline">
            Book a free growth call →
          </Link>
        </p>
      </div>
    </div>
  );
}
