"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Signal = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

type Result = {
  url: string;
  score: number;
  band: string;
  signals: Signal[];
  summary: { pass: number; warn: number; fail: number };
};

const STATUS_STYLES: Record<Signal["status"], { dot: string; icon: string }> = {
  pass: { dot: "bg-emerald-400", icon: "✓" },
  warn: { dot: "bg-amber-400", icon: "!" },
  fail: { dot: "bg-red-500", icon: "✕" },
};

function scoreColor(score: number) {
  if (score >= 60) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-500";
}

export default function AuthorityCheckerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setEmailSent(false);
    setEmailError(null);
    try {
      const res = await fetch("/api/authority-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data as Result);
    } catch {
      setError("Could not reach the checker. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function emailReport(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !result) return;
    setEmailLoading(true);
    setEmailError(null);
    try {
      const res = await fetch("/api/email-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          url: result.url,
          score: result.score,
          checks: result.signals,
          source: "Authority Checker",
        }),
      });
      const data = await res.json();
      if (data.error) setEmailError(data.error);
      else setEmailSent(true);
    } catch {
      setEmailError("Could not send the report. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            Free Tool
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">
            Website Authority Checker
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Get an instant authority score built from real trust signals — domain age,
            security, indexability, structured data, content depth, and more.
          </p>
        </div>

        {/* Input */}
        <form onSubmit={runCheck} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-full px-7 py-5 text-lg outline-none focus:border-[#F95D0A] transition-colors placeholder:text-white/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F95D0A] text-black px-9 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 shrink-0"
          >
            {loading ? "Scoring…" : "Check Authority"}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs font-mono mb-10 max-w-2xl mx-auto">
          An honest, transparent estimate from signals we can measure on your live site — not a
          resold Moz/Ahrefs number. For a full backlink-based authority audit, book a teardown.
        </p>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-red-500/30 bg-red-500/5 text-red-400 rounded-2xl px-6 py-4 mb-10 text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Score card */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="text-center shrink-0">
                  <div className={`text-7xl md:text-8xl font-black tracking-tighter ${scoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">
                    Authority Score / 100
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="inline-block bg-[#F95D0A]/10 border border-[#F95D0A]/30 text-[#F95D0A] font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                    {result.band}
                  </div>
                  <p className="text-sm text-white/40 font-mono mb-4 break-all">{result.url}</p>
                  <div className="flex gap-6 text-sm">
                    <span className="text-emerald-400 font-bold">{result.summary.pass} strong</span>
                    <span className="text-amber-400 font-bold">{result.summary.warn} okay</span>
                    <span className="text-red-500 font-bold">{result.summary.fail} weak</span>
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] divide-y divide-white/5 overflow-hidden">
                {result.signals.map((c) => {
                  const s = STATUS_STYLES[c.status];
                  return (
                    <div key={c.id} className="flex items-start gap-4 p-6">
                      <span
                        className={`mt-1 w-6 h-6 rounded-full ${s.dot} text-black text-xs font-black flex items-center justify-center shrink-0`}
                      >
                        {s.icon}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg">{c.label}</h3>
                        <p className="text-white/50 text-sm mt-1">{c.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Email report capture */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-10">
                {emailSent ? (
                  <div className="text-center">
                    <p className="text-2xl font-black tracking-tight mb-2 text-emerald-400">Report on its way ✓</p>
                    <p className="text-white/50 text-sm">Check your inbox for the full breakdown.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black tracking-tight mb-2">Email me this report</h3>
                    <p className="text-white/50 text-sm mb-6">
                      Get your authority breakdown in your inbox — plus the fastest ways to raise it.
                    </p>
                    <form onSubmit={emailReport} className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="flex-1 bg-[#050505] border border-white/10 rounded-full px-7 py-4 outline-none focus:border-[#F95D0A] transition-colors placeholder:text-white/30"
                      />
                      <button
                        type="submit"
                        disabled={emailLoading}
                        className="bg-white text-black px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#F95D0A] transition-colors disabled:opacity-50 shrink-0"
                      >
                        {emailLoading ? "Sending…" : "Send Report"}
                      </button>
                    </form>
                    {emailError && <p className="text-red-400 text-sm mt-4">{emailError}</p>}
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#F95D0A] to-[#c74100] text-black rounded-[2rem] p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-3">
                  Want to actually raise your authority?
                </h2>
                <p className="text-black/70 font-medium max-w-xl mx-auto mb-8">
                  We build the backlinks, content, and technical foundation that move this
                  score — and your rankings — for real.
                </p>
                <Link
                  href="/start"
                  className="inline-block bg-black text-white px-9 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#050505] transition-colors"
                >
                  Get My Growth Plan
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && (
          <p className="text-center text-white/30 text-sm font-mono">
            We only read your public page markup and registry data. Nothing is stored.
          </p>
        )}
      </div>
    </main>
  );
}
