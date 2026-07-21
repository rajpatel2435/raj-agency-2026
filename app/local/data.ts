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
  {
    slug: "software-development",
    name: "Software Development",
    short: "Software Dev",
    intro: (city) =>
      `Launch at Dawn builds custom software for ${city} companies — web apps, internal tools, dashboards, and API integrations engineered to run fast and scale cleanly.`,
    why: (city) =>
      `Spreadsheets and off-the-shelf tools break down as ${city} businesses grow. We build custom software around your exact workflow so your team moves faster and your data finally works for you.`,
    steps: [
      { label: "Discovery & Spec", desc: "We map your workflows and turn them into a clear technical spec with real milestones." },
      { label: "Engineering", desc: "Type-safe, well-tested code built on modern stacks like Next.js, Node, and Postgres." },
      { label: "Scale & Support", desc: "Monitoring, CI/CD, and documentation so the system stays reliable as you grow." },
    ],
    relatedHref: "/services/engineering",
  },
  {
    slug: "app-development",
    name: "App Development",
    short: "App Dev",
    intro: (city) =>
      `We design and build mobile and web apps for ${city} businesses — fast, intuitive products your customers actually want to open.`,
    why: (city) =>
      `A clunky app costs ${city} businesses users on the first screen. We ship polished, performant apps with clean UX and a backend built to handle real growth.`,
    steps: [
      { label: "Product Design", desc: "We prototype the flows and interface before writing code, so we build the right thing once." },
      { label: "Cross-Platform Build", desc: "One efficient codebase that runs smoothly across web, iOS, and Android." },
      { label: "Launch & Iterate", desc: "We ship, measure real usage, and refine the app based on how customers actually behave." },
    ],
    relatedHref: "/services/engineering",
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    short: "E-commerce",
    intro: (city) =>
      `We build high-converting online stores for ${city} brands — fast, secure e-commerce that turns browsers into buyers and scales with your catalog.`,
    why: (city) =>
      `Every slow page and clunky checkout quietly drains sales for ${city} stores. We engineer fast, frictionless storefronts with checkout flows optimized to lift average order value and conversion.`,
    steps: [
      { label: "Store Architecture", desc: "We set up the right platform, catalog structure, and payments for how you actually sell." },
      { label: "Conversion Build", desc: "Fast product pages and a streamlined checkout designed to reduce cart abandonment." },
      { label: "Growth Systems", desc: "Analytics, email flows, and SEO baked in so the store keeps compounding sales." },
    ],
    relatedHref: "/services/design",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    short: "AI Automation",
    intro: (city) =>
      `We help ${city} businesses put AI to work — chatbots, content systems, and automations that cut manual work and speed up how you serve customers.`,
    why: (city) =>
      `Most ${city} teams lose hours a week to repetitive tasks. We identify the workflows worth automating and build practical AI systems that save time without breaking what already works.`,
    steps: [
      { label: "Opportunity Audit", desc: "We find the highest-ROI tasks to automate and the ones that should stay human." },
      { label: "Build & Integrate", desc: "Custom AI workflows wired into your existing tools, data, and support channels." },
      { label: "Guardrails & Tuning", desc: "We add oversight, testing, and refinement so the automation stays accurate and safe." },
    ],
    relatedHref: "/services/data",
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    short: "AI Agents",
    intro: (city) =>
      `We design and build custom AI agents for ${city} businesses — assistants that audit, answer, qualify leads, and take action on your website 24/7.`,
    why: (city) =>
      `Your ${city} customers expect instant answers at 2am. We build AI agents trained on your business that handle questions, capture leads, and route hot prospects to your team — without adding headcount.`,
    steps: [
      { label: "Scope & Training Data", desc: "We define what the agent should do and ground it in your real content, offers, and FAQs." },
      { label: "Build & Integrate", desc: "We wire the agent into your site, CRM, and tools with safe, tested actions." },
      { label: "Monitor & Improve", desc: "We track conversations, tune responses, and expand what the agent can handle over time." },
    ],
    relatedHref: "/tools/ai-agent",
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    short: "AI Chatbots",
    intro: (city) =>
      `We build smart AI chatbots for ${city} businesses that answer customer questions instantly, book appointments, and turn website visitors into leads.`,
    why: (city) =>
      `A slow reply loses the sale. We give ${city} businesses an always-on AI chatbot that responds in seconds, qualifies interest, and hands warm leads to your team while you sleep.`,
    steps: [
      { label: "Conversation Design", desc: "We map the questions your customers actually ask and the outcomes you want from each chat." },
      { label: "Trained & Branded", desc: "The chatbot speaks in your brand voice and is grounded in your real products and policies." },
      { label: "Lead Handoff", desc: "Hot conversations are captured and routed to your inbox or CRM instantly, with full context." },
    ],
    relatedHref: "/tools/ai-agent",
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
  {
    slug: "toronto",
    name: "Toronto",
    region: "ON",
    regionFull: "Ontario",
    geo: { lat: 43.6532, lng: -79.3832 },
    neighborhoods: ["Downtown", "King West", "Yorkville", "Liberty Village", "The Beaches", "North York"],
    blurb: "Canada's largest and most competitive market, where technical SEO and authority win.",
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    region: "ON",
    regionFull: "Ontario",
    geo: { lat: 45.4215, lng: -75.6972 },
    neighborhoods: ["ByWard Market", "Centretown", "Kanata", "Westboro", "Barrhaven"],
    blurb: "The capital's steady, high-trust market with strong local search demand.",
  },
  {
    slug: "calgary",
    name: "Calgary",
    region: "AB",
    regionFull: "Alberta",
    geo: { lat: 51.0447, lng: -114.0719 },
    neighborhoods: ["Downtown", "Beltline", "Kensington", "Inglewood", "Mission"],
    blurb: "A fast-moving Prairie market where digital-first businesses are pulling ahead.",
  },
  {
    slug: "quebec-city",
    name: "Quebec City",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 46.8139, lng: -71.2080 },
    neighborhoods: ["Vieux-Québec", "Saint-Roch", "Sainte-Foy", "Limoilou", "Montcalm"],
    blurb: "A bilingual heritage market with loyal local demand and beatable competition.",
  },
  {
    slug: "victoria",
    name: "Victoria",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 48.4284, lng: -123.3656 },
    neighborhoods: ["Downtown", "Oak Bay", "Fernwood", "James Bay", "Fairfield"],
    blurb: "A refined Island market where quality brands stand out fast.",
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
