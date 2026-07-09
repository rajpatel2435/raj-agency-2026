"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  key: "need" | "business" | "budget" | "timeline";
  label: string;
  question: string;
  options: string[];
};

const STEPS: Step[] = [
  {
    key: "need",
    label: "01 // Goal",
    question: "What do you need help with?",
    options: ["Rank higher on Google (SEO)", "A faster, better website", "Both SEO + website", "Not sure yet"],
  },
  {
    key: "business",
    label: "02 // Business",
    question: "What kind of business are you?",
    options: ["Restaurant / hospitality", "Local service business", "E-commerce / retail", "SaaS / tech", "Something else"],
  },
  {
    key: "budget",
    label: "03 // Budget",
    question: "Rough monthly budget for growth?",
    options: ["Under $2k", "$2k – $5k", "$5k+", "Not sure yet"],
  },
  {
    key: "timeline",
    label: "04 // Timeline",
    question: "How soon do you want to start?",
    options: ["ASAP", "In 1–3 months", "Just exploring"],
  },
];

type Answers = Record<Step["key"], string> & {
  url: string;
  name: string;
  email: string;
};

export default function GrowthQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const totalSteps = STEPS.length + 1; // + contact step
  const progress = Math.round(((step) / totalSteps) * 100);

  const pick = (key: Step["key"], value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = new FormData(e.currentTarget);
    const payload = {
      ...answers,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      url: String(form.get("url") || ""),
    };
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const isContactStep = step === STEPS.length;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black font-sans pt-32 md:pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
              Growth Fit // {Math.min(step + 1, totalSteps)} of {totalSteps}
            </span>
            <Link href="/" className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
              Exit
            </Link>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#F95D0A]"
              animate={{ width: `${status === "success" ? 100 : progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-[#F95D0A] bg-[#080808] p-10 md:p-14"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#F95D0A] italic mb-5">
                You&apos;re in.
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                We&apos;ve got your details and a strategist will reply within 24 hours with a clear next step. Want to skip the wait?
              </p>
              <Link
                href="/contact/hello"
                className="inline-block bg-[#F95D0A] text-black px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Book a Growth Call Now
              </Link>
            </motion.div>
          ) : isContactStep ? (
            <motion.form
              key="contact"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              onSubmit={submit}
              className="flex flex-col gap-8"
            >
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A] mb-3">
                  05 // Almost done
                </p>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95]">
                  Where should we send your plan?
                </h1>
              </div>

              <div className="flex flex-col gap-6 text-lg">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                    Your name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="bg-transparent border-b border-zinc-800 pb-3 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-700 text-white"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="bg-transparent border-b border-zinc-800 pb-3 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-700 text-white"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="url" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                    Website (optional)
                  </label>
                  <input
                    id="url"
                    name="url"
                    placeholder="yourbusiness.com"
                    className="bg-transparent border-b border-zinc-800 pb-3 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-700 text-white"
                  />
                </div>
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 bg-[#F95D0A] text-black px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending…" : "Get My Growth Plan"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key={STEPS[step].key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A] mb-3">
                {STEPS[step].label}
              </p>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-10">
                {STEPS[step].question}
              </h1>
              <div className="flex flex-col gap-3">
                {STEPS[step].options.map((option) => {
                  const selected = answers[STEPS[step].key] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => pick(STEPS[step].key, option)}
                      className={`group text-left px-6 py-5 border transition-all flex items-center justify-between ${
                        selected
                          ? "border-[#F95D0A] bg-[#F95D0A]/10"
                          : "border-white/10 hover:border-[#F95D0A] hover:bg-white/5"
                      }`}
                    >
                      <span className="font-bold uppercase tracking-tight">{option}</span>
                      <span className="text-zinc-600 group-hover:text-[#F95D0A] transition-colors">→</span>
                    </button>
                  );
                })}
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-8 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  ← Back
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
