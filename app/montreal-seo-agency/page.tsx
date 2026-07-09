import LocationLanding, { type LocationConfig } from "@/components/LocationLanding";

const MONTREAL: LocationConfig = {
  city: "Montreal",
  region: "QC",
  regionFull: "Quebec",
  slug: "montreal-seo-agency",
  eyebrow: "SEO & Web Agency · Montreal, QC",
  headlineTop: "MONTREAL BUSINESSES",
  headlineAccent: "RANK HIGHER.",
  intro:
    "Launch at Dawn is a Montreal SEO and web development agency. We get local businesses to the top of Google, optimize your Google Business Profile, and build fast websites that turn searches into customers.",
  geo: { lat: 45.5019, lng: -73.5674 },
  neighborhoods: [
    "Downtown",
    "Plateau Mont-Royal",
    "Old Montreal",
    "Griffintown",
    "Mile End",
    "Rosemont",
    "Verdun",
    "Laval",
    "West Island",
    "South Shore",
  ],
  stats: [
    { value: "Top 3", label: "Map pack goal" },
    { value: "24/7", label: "Always indexing" },
  ],
  services: [
    {
      title: "Local SEO",
      desc: "Google Business Profile optimization and local citations so you show up in the Montreal map pack for 'near me' searches.",
      href: "/services/seo",
    },
    {
      title: "Web Development",
      desc: "Fast, modern Next.js websites that load instantly, rank well, and convert visitors into booked clients.",
      href: "/services/engineering",
    },
    {
      title: "Growth Strategy",
      desc: "Content, campaigns, and conversion optimization tailored to the Montreal market and your revenue goals.",
      href: "/services/strategy",
    },
  ],
  faqs: [
    {
      question: "Do you work with small businesses in Montreal?",
      answer:
        "Yes. We work with local Montreal businesses — restaurants, clinics, trades, retail, and professional services — as well as mid-market and enterprise clients. We tailor the strategy and budget to your size.",
    },
    {
      question: "How much does SEO cost in Montreal?",
      answer:
        "It depends on your goals and competition, but most local businesses start with a focused monthly program. Book a free call and we'll give you a clear, no-obligation quote based on your market.",
    },
    {
      question: "How long until I rank on Google?",
      answer:
        "Google Business Profile and local SEO often show movement within a few weeks. Competitive organic keywords typically take 3 to 6 months to build strong, lasting rankings.",
    },
    {
      question: "Do you offer service in French and English?",
      answer:
        "Yes. We build and optimize sites for Montreal's bilingual market so you reach both French and English-speaking customers.",
    },
    {
      question: "Where is Launch at Dawn located?",
      answer:
        "We're based in Montreal, QC and also serve Vancouver, BC and clients across Canada and the USA.",
    },
  ],
};

export default function MontrealSeoAgencyPage() {
  return <LocationLanding config={MONTREAL} />;
}
