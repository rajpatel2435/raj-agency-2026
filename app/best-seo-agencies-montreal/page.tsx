import BuyersGuide, { type GuideConfig } from "@/components/BuyersGuide";

const CONFIG: GuideConfig = {
  city: "Montreal",
  region: "QC",
  slug: "best-seo-agencies-montreal",
  serviceLabel: "SEO Agencies",
  intro:
    "Choosing an SEO agency in Montreal is a big decision — the wrong pick wastes months and budget. This honest guide walks you through exactly what separates a great agency from an average one, the questions to ask, and how to make sure you actually rank.",
  faqs: [
    {
      question: "How do I choose the best SEO agency in Montreal?",
      answer:
        "Look for proven local results, a team that handles both technical SEO and website performance, transparent live reporting, no long lock-in contracts, and modern AI-search optimization. Ask for real Montreal case studies before signing.",
    },
    {
      question: "How much should SEO cost in Montreal?",
      answer:
        "Most local Montreal businesses invest in a focused monthly program. Pricing depends on your competition and goals — a good agency will give you a clear, no-obligation quote based on your market.",
    },
    {
      question: "How long does SEO take to work in Montreal?",
      answer:
        "Local SEO and Google Business Profile work often show movement within a few weeks, while competitive organic keywords typically take 3 to 6 months to rank strongly.",
    },
    {
      question: "Why choose Launch at Dawn?",
      answer:
        "We combine engineering and marketing in one team — fast custom Next.js sites plus technical, local, and AI-era SEO — with transparent reporting and no lock-in traps. Based in Montreal and Vancouver.",
    },
  ],
};

export default function BestSeoAgenciesMontrealPage() {
  return <BuyersGuide config={CONFIG} />;
}
