"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqAccordion() {
  // 1. The strategic questions you want to rank for
  const faqs = [
    {
      question: "What does the agency actually do?",
      answer: "We engineer digital footprints designed to steal market share. We don't just chase vanity metrics; we build highly technical, scalable search architectures paired with aggressive Digital PR to drive serious organic revenue."
    },
    {
      question: "Who are your typical clients?",
      answer: "We partner with disruptors, category leaders, and ambitious brands. If you are looking for a safe, traditional, slow-moving marketing package, we are not the right fit."
    },
    {
      question: "What is the minimum fee to work with you?",
      answer: "We build custom roadmaps based on how aggressively you want to grow. Typical engagements start at a level that ensures we have the firepower to completely dominate your specific market."
    },
    {
      question: "Do you offer international SEO services?",
      answer: "Yes. We scale brands globally by optimizing for specific regional algorithms, cultural search behaviors, and localized digital PR campaigns."
    }
  ];

  // Tracks which accordion is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 border-t border-gray-800">
      
      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left Side: Massive Heading */}
        <div className="w-full md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight sticky top-40">
            Frequently <br className="hidden md:block"/> Asked <br className="hidden md:block"/> Questions.
          </h2>
        </div>

        {/* Right Side: The Interactive Accordion */}
        <div className="w-full md:w-2/3 flex flex-col">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              
              {/* The Clickable Question Row */}
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-8 text-left hover:text-[#A855F7] transition-colors focus:outline-none group"
              >
                <span className="text-xl md:text-3xl font-light tracking-tight">{faq.question}</span>
                <span className={`text-3xl font-light transition-transform duration-500 ${openIndex === index ? "rotate-45 text-[#A855F7]" : "group-hover:text-[#A855F7]"}`}>
                  +
                </span>
              </button>

              {/* The Animated Answer Reveal */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} // Buttery smooth agency easing
                    className="overflow-hidden"
                  >
                    <p className="text-lg md:text-xl font-light text-gray-400 pb-8 pr-12 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}