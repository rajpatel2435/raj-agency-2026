"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FaqItem = { question: string; answer: string };

export default function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  eyebrow,
}: {
  faqs: FaqItem[];
  heading?: string;
  eyebrow?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          {eyebrow && (
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#F95D0A]">
              {eyebrow}
            </span>
          )}
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight mt-4 md:sticky md:top-40">
            {heading}
          </h2>
        </div>

        <div className="w-full md:w-2/3 flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-white/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center gap-6 py-8 text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl md:text-2xl font-light tracking-tight text-white group-hover:text-[#F95D0A] transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`text-3xl font-light shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-45 text-[#F95D0A]" : "text-white/40 group-hover:text-[#F95D0A]"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
