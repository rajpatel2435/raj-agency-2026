// Data + content engine for programmatic local landing pages (/local/[slug]).
// Combines SERVICES x CITIES into unique, indexable pages.

export type LocalService = {
  slug: string;
  name: string;
  short: string; // used in headlines
  intro: (city: string) => string;
  why: (city: string) => string;
  steps: { label: string; desc: string }[];
  relatedHref: string;
};

export type LocalCity = {
  slug: string;
  name: string;
  region: string; // QC / BC
  regionFull: string;
  geo: { lat: number; lng: number };
  neighborhoods: string[];
  blurb: string;
};

export const SERVICES: LocalService[] = [
  {
    slug: "seo",
    name: "SEO",
    short: "SEO",
    intro: (city) =>
      `Launch at Dawn helps ${city} businesses climb to the top of Google. We combine technical SEO, local optimization, and content that ranks so the right customers find you first.`,
    why: (city) =>
      `Most of your future customers in ${city} start on Google. If you're not in the top results, they're calling a competitor instead. We fix the technical issues holding you back and build the authority that keeps you ranked.`,
    steps: [
      { label: "Technical Audit", desc: "We fix crawl errors, site speed, and schema so Google can index and trust your site." },
      { label: "Local & On-Page SEO", desc: "We optimize your pages and Google Business Profile for the exact searches your customers use." },
      { label: "Authority Building", desc: "We earn quality backlinks and publish content that keeps you ranking long-term." },
    ],
    relatedHref: "/services/seo",
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    short: "Local SEO",
    intro: (city) =>
      `We get ${city} businesses into the Google Map Pack — the top 3 map results where most local calls, visits, and bookings happen.`,
    why: (city) =>
      `When someone in ${city} searches "near me", Google shows a map with 3 businesses. Those 3 get the vast majority of the clicks. We optimize your Google Business Profile, citations, and reviews to put you there.`,
    steps: [
      { label: "Google Business Profile", desc: "We fully optimize your profile with the right categories, photos, posts, and service areas." },
      { label: "Citations & NAP", desc: "We build consistent listings across the directories Google checks for trust." },
      { label: "Review Engine", desc: "We set up a system that ethically generates a steady stream of 5-star reviews." },
    ],
    relatedHref: "/services/seo",
  },
  {
    slug: "web-design",
    name: "Web Design",
    short: "Web Design",
    intro: (city) =>
      `We design fast, modern websites for ${city} businesses — sites that load instantly, look premium, and turn visitors into paying customers.`,
    why: (city) =>
      `A slow, dated website quietly costs ${city} businesses customers every day. We build fast Next.js sites with clear calls-to-action and conversion-focused design that make people take action.`,
    steps: [
      { label: "Conversion UX", desc: "We map your customer journey and design every step to reduce friction and build trust." },
      { label: "Fast Build", desc: "Modern Next.js engineering means sub-second loads that Google and users both reward." },
      { label: "SEO-Ready", desc: "Every site ships with clean structure, schema, and metadata baked in from day one." },
    ],
    relatedHref: "/services/design",
  },
  {
    slug: "web-development",
    name: "Web Development",
    short: "Web Development",
    intro: (city) =>
      `We build reliable, high-performance web applications for ${city} companies — from marketing sites to custom platforms and integrations.`,
    why: (city) =>
      `Off-the-shelf builders hit a ceiling fast. When ${city} businesses need speed, custom features, or scale, we engineer resilient Next.js systems that stay fast and stable as you grow.`,
    steps: [
      { label: "Architecture", desc: "We choose the right rendering and infrastructure strategy for your business and content." },
      { label: "Custom Build", desc: "Bespoke features, API integrations, and CMS setups tailored to how you actually work." },
      { label: "Reliability", desc: "Monitoring, fail-safes, and performance hardening so your site never lets customers down." },
    ],
    relatedHref: "/services/engineering",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Digital Marketing",
    intro: (city) =>
      `We run full-funnel digital marketing for ${city} businesses — SEO, content, social, and paid campaigns that work together to drive real revenue.`,
    why: (city) =>
      `Scattered marketing wastes budget. We build one connected growth system for your ${city} business so every channel reinforces the others and every dollar is tracked back to revenue.`,
    steps: [
      { label: "Strategy", desc: "We map your market, competitors, and revenue gaps into a clear, prioritized plan." },
      { label: "Execution", desc: "SEO, content, social, and paid — built and run as one coordinated engine." },
      { label: "Attribution", desc: "Live dashboards show exactly which channel drove each lead and sale." },
    ],
    relatedHref: "/services/strategy",
  },
];

export const CITIES: LocalCity[] = [
  {
    slug: "montreal",
    name: "Montreal",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.5019, lng: -73.5674 },
    neighborhoods: ["Downtown", "Plateau", "Old Montreal", "Griffintown", "Mile End", "Rosemont"],
    blurb: "Quebec's largest market and a competitive, bilingual search landscape.",
  },
  {
    slug: "laval",
    name: "Laval",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.6066, lng: -73.7124 },
    neighborhoods: ["Chomedey", "Sainte-Rose", "Vimont", "Duvernay", "Fabreville"],
    blurb: "A fast-growing suburb where local search intent is high and competition is beatable.",
  },
  {
    slug: "longueuil",
    name: "Longueuil",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.5312, lng: -73.5185 },
    neighborhoods: ["Vieux-Longueuil", "Saint-Hubert", "Greenfield Park", "Boucherville"],
    blurb: "A key South Shore market with strong local demand.",
  },
  {
    slug: "brossard",
    name: "Brossard",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.4585, lng: -73.4659 },
    neighborhoods: ["DIX30", "Quartier", "Secteur B", "Secteur C"],
    blurb: "An affluent South Shore hub with high-value local customers.",
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.2827, lng: -123.1207 },
    neighborhoods: ["Downtown", "Yaletown", "Gastown", "Kitsilano", "Mount Pleasant"],
    blurb: "A competitive West Coast market with high digital sophistication.",
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.2488, lng: -122.9805 },
    neighborhoods: ["Metrotown", "Brentwood", "Lougheed", "Edmonds"],
    blurb: "A major Metro Vancouver center with dense local search demand.",
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.1666, lng: -123.1336 },
    neighborhoods: ["Steveston", "City Centre", "Brighouse", "Hamilton"],
    blurb: "A diverse, business-dense market with strong local intent.",
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.1913, lng: -122.849 },
    neighborhoods: ["Guildford", "Newton", "Fleetwood", "Cloverdale", "South Surrey"],
    blurb: "One of BC's fastest-growing cities with rising local competition.",
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.3163, lng: -123.0693 },
    neighborhoods: ["Lonsdale", "Lynn Valley", "Deep Cove", "Edgemont"],
    blurb: "An affluent North Shore market with high-value local customers.",
  },
];

export type LocalCombo = { slug: string; service: LocalService; city: LocalCity };

export function getAllCombos(): LocalCombo[] {
  const combos: LocalCombo[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      combos.push({ slug: `${service.slug}-${city.slug}`, service, city });
    }
  }
  return combos;
}

export function getComboBySlug(slug: string): LocalCombo | undefined {
  return getAllCombos().find((c) => c.slug === slug);
}

export const LOCAL_SLUGS = getAllCombos().map((c) => c.slug);
