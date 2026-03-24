"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import { clsx } from "clsx";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dawnLetters = ["d", "a", "w", "n"];

const letterVariants = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: { type: "spring" as const, stiffness: 420, damping: 20 },
  },
};

const staggerVariants = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.045, delayChildren: 0 },
  },
};

type Variant = "nav" | "footer" | "mobile";

const variantClass: Record<Variant, string> = {
  nav: "text-[1.35rem] sm:text-2xl",
  mobile: "text-2xl",
  footer:
    "text-[min(13vw,9rem)] sm:text-[min(11vw,10rem)] md:text-[min(10vw,11rem)] leading-[0.95]",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  /** Slow gradient drift on “dawn” (default on footer). */
  ambientMotion?: boolean;
};

type BrandWordmarkProps = BaseProps &
  (
    | {
        as?: "link";
        href?: string;
        onNavigate?: () => void;
      }
    | { as: "span" }
  );

export default function BrandWordmark(props: BrandWordmarkProps) {
  const {
    variant = "nav",
    className,
    ambientMotion = variant === "footer",
  } = props;

  const asSpan = props.as === "span";
  const href = !asSpan ? (props.href ?? "/") : undefined;
  const onNavigate = !asSpan ? props.onNavigate : undefined;

  const core = (
    <motion.span
      className={clsx(
        syne.className,
        "inline-flex select-none items-baseline",
        variantClass[variant]
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={staggerVariants}
    >
      <motion.span
        className={clsx(
          "font-extrabold tracking-[-0.04em] text-white",
          variant === "footer" && "tracking-[-0.05em]"
        )}
        variants={{ rest: {}, hover: {} }}
      >
        launchat
      </motion.span>
      <span
        className={clsx(
          "ml-[0.02em] inline-flex font-extrabold tracking-[-0.02em]",
          variant === "footer" && "ml-[0.03em]"
        )}
      >
        {dawnLetters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className={clsx(
              "inline-block bg-gradient-to-br from-[#FF3300] via-[#ff6b35] to-[#ffb347] bg-clip-text text-transparent",
              ambientMotion && "brand-wordmark-dawn--ambient"
            )}
            variants={letterVariants}
            style={{
              textShadow:
                variant === "footer"
                  ? "0 0 42px rgba(255, 51, 0, 0.22)"
                  : undefined,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );

  const inner = (
    <span className="relative inline-flex items-baseline">
      {!asSpan && (
        <span
          className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#FF3300] to-[#ffb347] transition-transform duration-300 ease-out group-hover/brand:scale-x-100"
          aria-hidden
        />
      )}
      {core}
    </span>
  );

  if (!asSpan && href !== undefined) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={clsx(
          "group/brand inline-flex rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF3300]/50",
          className
        )}
        aria-label="launchatdawn — home"
      >
        {inner}
      </Link>
    );
  }

  return (
    <span className={clsx("inline-flex", className)}>{inner}</span>
  );
}
