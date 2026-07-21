"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AIAgentPanel from "./AIAgentPanel";

// Hide inside the CMS, dashboards, and the dedicated agent page.
const HIDDEN_PREFIXES = [
  "/studio",
  "/trading-dashboard",
  "/review-dashboard",
  "/services/review-dashboard",
  "/services/review-trading",
  "/tools/ai-agent",
];

export default function AIAgent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[76] w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-8rem))] rounded-3xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_20px_70px_rgba(0,0,0,0.7)] flex flex-col animate-[fadeInUp_0.25s_ease]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F95D0A] to-[#ff7a33] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </span>
              <div>
                <p className="text-black font-black text-sm leading-tight">Dawn · AI Growth Agent</p>
                <p className="text-black/70 text-[11px] leading-tight">Live audits · instant answers</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-black/60 hover:text-black text-2xl leading-none px-1"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <AIAgentPanel compact />
          </div>
        </div>
      )}

      {/* Launcher button (sits above the WhatsApp button) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with our AI agent"
          className="fixed bottom-24 right-6 z-[76] w-14 h-14 rounded-full bg-[#F95D0A] shadow-[0_8px_30px_rgba(249,93,10,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          {/* Spark / AI glyph */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.9 4.8L19 9.7l-4.8 1.9L12 16l-1.9-4.4L5 9.7l5.1-1.9z" />
            <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#F95D0A] rounded-full animate-pulse" />
          </span>
        </button>
      )}
    </>
  );
}
