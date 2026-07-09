const SIGNALS = [
  "Montreal // Vancouver",
  "24-hour response",
  "No lock-in contracts",
  "SEO + engineering under one roof",
  "AI-search ready",
];

/**
 * A thin strip of genuine credibility signals. These are factual positioning
 * statements about how the agency operates — not fabricated metrics or reviews.
 */
export default function TrustBar() {
  return (
    <section
      aria-label="Why work with us"
      className="border-y border-white/5 bg-[#080808] py-5 px-6 md:px-12 overflow-hidden"
    >
      <ul className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
        {SIGNALS.map((signal) => (
          <li
            key={signal}
            className="flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-400"
          >
            <span className="w-1.5 h-1.5 bg-[#F95D0A] rounded-full shrink-0" />
            {signal}
          </li>
        ))}
      </ul>
    </section>
  );
}
