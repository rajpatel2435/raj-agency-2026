import BuyersGuide, { type GuideConfig } from "@/components/BuyersGuide";

const CONFIG: GuideConfig = {
  city: "Vancouver",
  region: "BC",
  slug: "best-digital-agencies-vancouver",
  serviceLabel: "Digital Agencies",
  intro:
    "Picking a digital agency in Vancouver shapes your growth for years. This honest 2026 guide breaks down exactly what separates a great agency from an average one, the questions to ask, and how to make sure your investment actually drives customers.",
  faqs: [
    {
      question: "How do I choose the best digital agency in Vancouver?",
      answer:
        "Look for proven local results, a team that handles both website engineering and SEO, transparent live reporting, no long lock-in contracts, and modern AI-search optimization. Ask for real Vancouver case studies before signing.",
    },
    {
      question: "How much do digital agencies charge in Vancouver?",
      answer:
        "It varies by scope and competition. Most Vancouver businesses start with a focused monthly program — a good agency will give you a clear, no-obligation quote for your goals.",
    },
    {
      question: "How long until I see results in Vancouver?",
      answer:
        "Local SEO and Google Business Profile work often show movement within a few weeks, while competitive keywords typically take 3 to 6 months to rank strongly.",
    },
    {
      question: "Why choose Launch at Dawn?",
      answer:
        "We combine engineering and marketing in one team — fast custom Next.js sites plus technical, local, and AI-era SEO — with transparent reporting and no lock-in traps. We serve Vancouver and Montreal.",
    },
  ],
};

export default function BestDigitalAgenciesVancouverPage() {
  return <BuyersGuide config={CONFIG} />;
}
