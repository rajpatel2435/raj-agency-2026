import LocationLanding, { type LocationConfig } from "@/components/LocationLanding";

const VANCOUVER: LocationConfig = {
  city: "Vancouver",
  region: "BC",
  regionFull: "British Columbia",
  slug: "vancouver-digital-agency",
  eyebrow: "SEO & Web Agency · Vancouver, BC",
  headlineTop: "VANCOUVER BUSINESSES",
  headlineAccent: "GET FOUND FIRST.",
  intro:
    "Launch at Dawn is a Vancouver digital agency built for growth. We rank local businesses at the top of Google, optimize your Google Business Profile, and build fast websites that turn searches into customers.",
  geo: { lat: 49.2827, lng: -123.1207 },
  neighborhoods: [
    "Downtown",
    "Yaletown",
    "Gastown",
    "Kitsilano",
    "Mount Pleasant",
    "West End",
    "Burnaby",
    "Richmond",
    "North Vancouver",
    "Surrey",
  ],
  stats: [
    { value: "Top 3", label: "Map pack goal" },
    { value: "24/7", label: "Always indexing" },
  ],
  services: [
    {
      title: "Local SEO",
      desc: "Google Business Profile optimization and local citations so you show up in the Vancouver map pack for 'near me' searches.",
      href: "/services/seo",
    },
    {
      title: "Web Development",
      desc: "Fast, modern Next.js websites that load instantly, rank well, and convert visitors into booked clients.",
      href: "/services/engineering",
    },
    {
      title: "Growth Strategy",
      desc: "Content, campaigns, and conversion optimization tailored to the Vancouver market and your revenue goals.",
      href: "/services/strategy",
    },
  ],
  faqs: [
    {
      question: "Do you work with small businesses in Vancouver?",
      answer:
        "Yes. We work with local Vancouver businesses — restaurants, clinics, trades, retail, and professional services — as well as mid-market and enterprise clients. We tailor the strategy and budget to your size.",
    },
    {
      question: "How much does SEO cost in Vancouver?",
      answer:
        "It depends on your goals and competition, but most local businesses start with a focused monthly program. Book a free call and we'll give you a clear, no-obligation quote based on your market.",
    },
    {
      question: "How long until I rank on Google?",
      answer:
        "Google Business Profile and local SEO often show movement within a few weeks. Competitive organic keywords typically take 3 to 6 months to build strong, lasting rankings.",
    },
    {
      question: "Do you build the website and handle SEO together?",
      answer:
        "Yes. We're an engineering and marketing team in one — we build fast Next.js sites and run the SEO on top, so everything works together from day one.",
    },
    {
      question: "Where is Launch at Dawn located?",
      answer:
        "We serve Vancouver, BC and are also based in Montreal, QC, working with clients across Canada and the USA. Call us at (514) 699-2435.",
    },
  ],
};

export default function VancouverDigitalAgencyPage() {
  return <LocationLanding config={VANCOUVER} />;
}
