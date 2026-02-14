"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 text-white backdrop-blur-md bg-black/20"
    >
      {/* Agency Logo */}
      <Link href="/" className="text-2xl font-black tracking-tighter uppercase z-50">
        Agency.
      </Link>

      {/* Desktop Links */}
      <nav className="hidden md:flex gap-8 font-medium text-sm tracking-widest uppercase">
        <Link href="#work" className="hover:text-cyan-400 transition-colors">Work</Link>
        <Link href="#services" className="hover:text-cyan-400 transition-colors">Services</Link>
        <Link href="#about" className="hover:text-cyan-400 transition-colors">About</Link>
        <Link href="#contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
      </nav>

      {/* Mobile Menu Button (Visual Only for Now) */}
      <button className="md:hidden text-sm font-bold uppercase tracking-widest z-50">
        Menu
      </button>
    </motion.header>
  );
}