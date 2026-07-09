"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Routes where we never show conversion prompts (user is already converting,
// in a tool flow, or in the CMS/dashboards).
const HIDDEN_PREFIXES = [
  "/studio",
  "/contact",
  "/trading-dashboard",
  "/review-dashboard",
  "/services/review-dashboard",
  "/services/review-trading",
];

const BAR_DISMISS_KEY = "lad_cta_bar_dismissed";
const EXIT_SHOWN_KEY = "lad_exit_shown";

export default function ConversionCTA() {
  const pathname = usePathname();
  const [showBar, setShowBar] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [mounted, setMounted] = useState(false);

  const hidden = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sticky bar: reveal after the visitor scrolls past the hero.
  useEffect(() => {
    if (hidden) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(BAR_DISMISS_KEY) === "1") return;

    const onScroll = () => {
      if (window.scrollY > 700) {
        setShowBar(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  // Exit-intent: trigger once per session when the cursor leaves the top edge.
  useEffect(() => {
    if (hidden) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(EXIT_SHOWN_KEY) === "1") return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) {
        setShowExit(true);
        sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
        window.removeEventListener("mouseout", onMouseOut);
      }
    };
    // Small delay so it never fires on immediate load.
    const t = window.setTimeout(() => {
      window.addEventListener("mouseout", onMouseOut);
    }, 4000);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [hidden]);

  const dismissBar = () => {
    setShowBar(false);
    if (typeof window !== "undefined") sessionStorage.setItem(BAR_DISMISS_KEY, "1");
  };

  const closeExit = () => setShowExit(false);

  if (!mounted || hidden) return null;

  return (
    <>
      {/* --- STICKY CTA BAR --- */}
      {showBar && !showExit && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] px-3 pb-3 md:px-6 md:pb-6 pointer-events-none">
          <div className="pointer-events-auto max-w-[1400px] mx-auto bg-[#F95D0A] text-black rounded-2xl shadow-[0_10px_40px_rgba(249,93,10,0.35)] flex flex-col sm:flex-row items-center gap-4 px-5 py-4 md:px-8 md:py-5">
            <div className="flex-1 text-center sm:text-left">
              <p className="font-black uppercase tracking-tight text-lg md:text-xl leading-tight">
                Ready to turn traffic into booked clients?
              </p>
              <p className="text-black/70 text-sm font-medium">
                Free 20-min growth call. No pitch, just a clear next step.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/tools/seo-checker"
                className="hidden md:inline-block text-[11px] font-black uppercase tracking-widest border-b-2 border-black/40 pb-1 hover:border-black transition-colors"
              >
                Free SEO Audit
              </Link>
              <Link
                href="/contact/hello"
                onClick={dismissBar}
                className="bg-black text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors whitespace-nowrap"
              >
                Book a Growth Call
              </Link>
              <button
                onClick={dismissBar}
                aria-label="Dismiss"
                className="text-black/50 hover:text-black text-2xl leading-none px-1"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EXIT-INTENT MODAL --- */}
      {showExit && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeExit}
          role="dialog"
          aria-modal="true"
          aria-label="Before you go"
        >
          <div
            className="relative max-w-lg w-full bg-[#080808] border border-[#F95D0A]/40 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(249,93,10,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeExit}
              aria-label="Close"
              className="absolute top-4 right-5 text-zinc-500 hover:text-white text-3xl leading-none"
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
                Before you go
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-5">
              See exactly why <span className="text-[#F95D0A]">you&apos;re not ranking</span>.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Run our free instant audit and get a prioritized list of what&apos;s
              costing you leads — or book a 20-minute call and we&apos;ll walk you
              through it live.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/seo-checker"
                onClick={closeExit}
                className="flex-1 text-center bg-[#F95D0A] text-black px-6 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Run Free Audit
              </Link>
              <Link
                href="/contact/hello"
                onClick={closeExit}
                className="flex-1 text-center border border-white/20 text-white px-6 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:border-[#F95D0A] hover:text-[#F95D0A] transition-colors"
              >
                Book a Growth Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
