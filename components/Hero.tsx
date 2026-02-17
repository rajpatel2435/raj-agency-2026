"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-6 w-full max-w-5xl mx-auto text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]"
      >
        WE IGNITE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          DIGITAL BRANDS.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
      >
        Disruptive marketing, bold design, and high-performance development for brands that refuse to be ignored.
      </motion.p>
    </div>
  );
}