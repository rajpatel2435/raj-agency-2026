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
  // --- Rich local-market intelligence (powers genuinely unique pages) ---
  population?: string;
  keyIndustries?: string[];
  competitionLevel?: "High" | "Moderate" | "Emerging";
  marketOverview?: string; // unique paragraph about the local market
  localInsight?: string; // unique paragraph on the local opportunity / how we win
  stat?: { value: string; label: string };
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
    population: "1.76M city · 4.3M metro",
    keyIndustries: ["AI & Tech", "Video Games", "Aerospace", "Restaurants & Hospitality", "Fashion & Retail", "Professional Services"],
    competitionLevel: "High",
    marketOverview:
      "Montreal is the second-largest city in Canada and the largest majority French-speaking city in the Americas. That makes it one of the only markets in North America where ranking well means ranking in two languages at once — a French-first search landscape shaped by Quebec's language laws, layered over a large English-speaking audience downtown and across the West Island.",
    localInsight:
      "Most agencies treat Montreal like any other city and publish English-only pages — which is exactly why so many first-page opportunities sit unclaimed in French. We build bilingual search architecture so you capture both 'référencement' and 'SEO' intent, the seasonal spikes around Old Montreal and the summer festival circuit, and the year-round local demand across the Plateau, Griffintown, Mile End, and downtown.",
    stat: { value: "4.3M", label: "people in the Greater Montreal search market" },
  },
  {
    slug: "laval",
    name: "Laval",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.6066, lng: -73.7124 },
    neighborhoods: ["Chomedey", "Sainte-Rose", "Vimont", "Duvernay", "Fabreville"],
    blurb: "A fast-growing suburb where local search intent is high and competition is beatable.",
    population: "~440K residents",
    keyIndustries: ["Retail & Shopping", "Healthcare", "Construction", "Home Services", "Restaurants", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "Laval is Quebec's third-largest city, spread across Île Jésus just north of Montreal. It's a family-driven suburban market where 'near me' searches convert quickly — customers want a trusted local provider rather than the cheapest national chain, and they overwhelmingly search in French first.",
    localInsight:
      "Because Laval sits in Montreal's shadow, many businesses chase Montreal keywords and ignore the high-intent Laval searches happening right in their own service area. We claim the Chomedey, Sainte-Rose, and Vimont local demand that bigger agencies overlook.",
    stat: { value: "3rd", label: "largest city in Quebec by population" },
  },
  {
    slug: "longueuil",
    name: "Longueuil",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.5312, lng: -73.5185 },
    neighborhoods: ["Vieux-Longueuil", "Saint-Hubert", "Greenfield Park", "Boucherville"],
    blurb: "A key South Shore market with strong local demand.",
    population: "~254K residents",
    keyIndustries: ["Aerospace", "Healthcare", "Retail", "Home Services", "Restaurants", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "Longueuil anchors Montreal's South Shore and is home to major aerospace employers and the Canadian Space Agency in Saint-Hubert. It's a stable, French-first market where an established local reputation matters more than flashy advertising.",
    localInsight:
      "South Shore customers search across Vieux-Longueuil, Saint-Hubert, and Boucherville with strong local intent. We build the geographic and neighborhood signals that tell Google you serve the South Shore specifically — not just 'Greater Montreal.'",
    stat: { value: "5th", label: "largest city in Quebec" },
  },
  {
    slug: "brossard",
    name: "Brossard",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 45.4585, lng: -73.4659 },
    neighborhoods: ["DIX30", "Quartier", "Secteur B", "Secteur C"],
    blurb: "An affluent South Shore hub with high-value local customers.",
    population: "~91K residents",
    keyIndustries: ["Retail & Lifestyle", "Restaurants & Hospitality", "Real Estate", "Finance", "Health & Wellness", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "Brossard is one of the most diverse and affluent cities on Montreal's South Shore, anchored by the Quartier DIX30 lifestyle hub and now connected to downtown by the REM light-rail line. Its multicultural population means search happens in French, English, and beyond.",
    localInsight:
      "Brossard's high household income and DIX30 foot traffic make it a premium local market. We help brands capture the affluent, multilingual customers around DIX30 and the growing REM corridor before the competition catches up.",
    stat: { value: "REM", label: "new light-rail line driving fresh local demand" },
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.2827, lng: -123.1207 },
    neighborhoods: ["Downtown", "Yaletown", "Gastown", "Kitsilano", "Mount Pleasant"],
    blurb: "A competitive West Coast market with high digital sophistication.",
    population: "662K city · 2.6M metro",
    keyIndustries: ["Tech & Startups", "Film & VFX", "Real Estate", "Tourism & Hospitality", "Restaurants", "Health & Wellness"],
    competitionLevel: "High",
    marketOverview:
      "Vancouver is Canada's West Coast tech and lifestyle capital — home to a booming startup scene, a world-class film and VFX industry ('Hollywood North'), and one of North America's most expensive, competitive real-estate markets. Its customers are digitally sophisticated and expect fast, polished experiences.",
    localInsight:
      "In a market this digitally mature, a slow or generic site gets ignored. We win Vancouver search by pairing genuinely fast engineering with content that targets the specific Yaletown, Kitsilano, Gastown, and Mount Pleasant demand — plus the large multilingual audience most agencies ignore.",
    stat: { value: "2.6M", label: "people in Metro Vancouver's search market" },
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.2488, lng: -122.9805 },
    neighborhoods: ["Metrotown", "Brentwood", "Lougheed", "Edmonds"],
    blurb: "A major Metro Vancouver center with dense local search demand.",
    population: "~250K residents",
    keyIndustries: ["Tech & Gaming", "Retail", "Film & Studios", "Education", "Health & Wellness", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "Burnaby sits at the geographic centre of Metro Vancouver and carries serious economic weight — Metrotown (one of BC's largest malls), major film studios, SFU, and tech employers like EA. It's a dense, diverse market with constant local search demand.",
    localInsight:
      "Burnaby businesses often get buried under 'Vancouver' results even though local customers are searching Metrotown, Brentwood, and Lougheed specifically. We build the local signals that put you in the map pack for the Burnaby searches that actually convert.",
    stat: { value: "3rd", label: "largest city in British Columbia" },
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.1666, lng: -123.1336 },
    neighborhoods: ["Steveston", "City Centre", "Brighouse", "Hamilton"],
    blurb: "A diverse, business-dense market with strong local intent.",
    population: "~210K residents",
    keyIndustries: ["Retail & E-commerce", "Restaurants & Hospitality", "Real Estate", "Logistics & Aviation", "Health & Wellness", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "Richmond is one of the most culturally distinct markets in Canada, with a majority-Asian population and a business landscape shaped by its proximity to Vancouver International Airport and the historic Steveston waterfront. A large share of local search happens in Chinese as well as English.",
    localInsight:
      "Most agencies build English-only pages and miss half of Richmond's market. We help brands rank across City Centre, Brighouse, and Steveston while capturing the bilingual English-and-Chinese search demand that defines this city.",
    stat: { value: "YVR", label: "airport anchoring a logistics-heavy local economy" },
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.1913, lng: -122.849 },
    neighborhoods: ["Guildford", "Newton", "Fleetwood", "Cloverdale", "South Surrey"],
    blurb: "One of BC's fastest-growing cities with rising local competition.",
    population: "~570K residents",
    keyIndustries: ["Construction & Trades", "Healthcare", "Retail", "Home Services", "Logistics", "Professional Services"],
    competitionLevel: "Emerging",
    marketOverview:
      "Surrey is the fastest-growing city in British Columbia and is on track to become the province's largest. It's young, diverse — with one of Canada's largest South Asian communities — and expanding so quickly that local search demand is outpacing the number of businesses competing for it.",
    localInsight:
      "Surrey is a rare market where you can still rank fast because competition hasn't caught up to the growth. We help businesses claim the Guildford, Newton, Fleetwood, and Cloverdale demand early — and capture the multilingual search that reflects the city's diversity.",
    stat: { value: "#1", label: "fastest-growing major city in BC" },
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 49.3163, lng: -123.0693 },
    neighborhoods: ["Lonsdale", "Lynn Valley", "Deep Cove", "Edgemont"],
    blurb: "An affluent North Shore market with high-value local customers.",
    population: "~155K (City + District)",
    keyIndustries: ["Tourism & Recreation", "Real Estate", "Restaurants", "Health & Wellness", "Home Services", "Professional Services"],
    competitionLevel: "Moderate",
    marketOverview:
      "North Vancouver is the affluent gateway to the North Shore mountains, blending a high-income residential base with a strong tourism and outdoor-recreation economy anchored by Grouse Mountain and the Capilano Suspension Bridge. Customers here value quality and are willing to pay for it.",
    localInsight:
      "North Shore customers search with high intent and healthy budgets across Lonsdale, Lynn Valley, and Edgemont. We help premium local brands stand out in a market where reputation and polish convert far better than discount messaging.",
    stat: { value: "North Shore", label: "affluent, high-intent local market" },
  },
  {
    slug: "toronto",
    name: "Toronto",
    region: "ON",
    regionFull: "Ontario",
    geo: { lat: 43.6532, lng: -79.3832 },
    neighborhoods: ["Downtown", "King West", "Yorkville", "Liberty Village", "The Beaches", "North York"],
    blurb: "Canada's largest and most competitive market, where technical SEO and authority win.",
    population: "2.9M city · 6.4M GTA",
    keyIndustries: ["Finance & Banking", "Tech & Startups", "Real Estate", "Professional Services", "Restaurants & Hospitality", "Retail"],
    competitionLevel: "High",
    marketOverview:
      "Toronto is Canada's largest city and financial capital — the most competitive digital market in the country, spanning the 6.4-million-person GTA. Ranking here means going up against national brands with serious budgets, so technical excellence and genuine authority are non-negotiable.",
    localInsight:
      "You don't win Toronto with a generic site. We compete by out-engineering the market on speed and structure, then targeting the specific King West, Yorkville, Liberty Village, and North York demand instead of fighting head-on for impossibly broad city-wide terms.",
    stat: { value: "6.4M", label: "people in the Greater Toronto Area" },
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    region: "ON",
    regionFull: "Ontario",
    geo: { lat: 45.4215, lng: -75.6972 },
    neighborhoods: ["ByWard Market", "Centretown", "Kanata", "Westboro", "Barrhaven"],
    blurb: "The capital's steady, high-trust market with strong local search demand.",
    population: "1.0M city · 1.4M metro",
    keyIndustries: ["Government & Public Sector", "Tech & Software", "Healthcare", "Professional Services", "Restaurants", "Tourism"],
    competitionLevel: "Moderate",
    marketOverview:
      "Ottawa is Canada's capital and a genuinely bilingual market where public-sector stability meets a fast-growing tech scene — the 'Silicon Valley North' that produced Shopify and the Kanata tech corridor. Customers expect professionalism and trust signals over hype.",
    localInsight:
      "Ottawa rewards businesses that serve both official languages and signal credibility. We build bilingual, trust-forward pages that rank across Centretown, Kanata, Westboro, and Barrhaven — capturing demand most single-language competitors leave on the table.",
    stat: { value: "Bilingual", label: "EN/FR capital market with strong local trust" },
  },
  {
    slug: "calgary",
    name: "Calgary",
    region: "AB",
    regionFull: "Alberta",
    geo: { lat: 51.0447, lng: -114.0719 },
    neighborhoods: ["Downtown", "Beltline", "Kensington", "Inglewood", "Mission"],
    blurb: "A fast-moving Prairie market where digital-first businesses are pulling ahead.",
    population: "~1.3M residents",
    keyIndustries: ["Energy & Oil/Gas", "Tech & Startups", "Finance", "Construction", "Professional Services", "Restaurants"],
    competitionLevel: "Moderate",
    marketOverview:
      "Calgary is the economic engine of the Prairies — long defined by energy and now aggressively diversifying into tech, finance, and logistics. It's an entrepreneurial, business-friendly market where fast-moving companies are pulling ahead of slower incumbents online.",
    localInsight:
      "Calgary's business owners are decisive and ROI-focused, which rewards a clear, conversion-first approach. We help brands capture the Beltline, Kensington, and downtown demand while the market's digital competition is still catching up to its growth.",
    stat: { value: "~1.3M", label: "residents in a fast-diversifying economy" },
  },
  {
    slug: "quebec-city",
    name: "Quebec City",
    region: "QC",
    regionFull: "Quebec",
    geo: { lat: 46.8139, lng: -71.2080 },
    neighborhoods: ["Vieux-Québec", "Saint-Roch", "Sainte-Foy", "Limoilou", "Montcalm"],
    blurb: "A bilingual heritage market with loyal local demand and beatable competition.",
    population: "~550K residents",
    keyIndustries: ["Tourism & Heritage", "Government", "Insurance & Finance", "Restaurants & Hospitality", "Retail", "Health & Wellness"],
    competitionLevel: "Moderate",
    marketOverview:
      "Quebec City is the province's French-speaking capital and one of North America's most historic destinations, with UNESCO-listed Old Quebec drawing millions of tourists a year. It's an overwhelmingly French market with a loyal local customer base and less digital competition than Montreal.",
    localInsight:
      "Ranking in Quebec City means committing to genuine French-first content — not a translated afterthought. We help brands own both the year-round local demand across Saint-Roch and Sainte-Foy and the seasonal tourist search around Vieux-Québec.",
    stat: { value: "UNESCO", label: "heritage tourism driving seasonal search" },
  },
  {
    slug: "victoria",
    name: "Victoria",
    region: "BC",
    regionFull: "British Columbia",
    geo: { lat: 48.4284, lng: -123.3656 },
    neighborhoods: ["Downtown", "Oak Bay", "Fernwood", "James Bay", "Fairfield"],
    blurb: "A refined Island market where quality brands stand out fast.",
    population: "~92K city · 400K metro",
    keyIndustries: ["Tourism & Hospitality", "Government", "Tech", "Health & Wellness", "Real Estate", "Restaurants"],
    competitionLevel: "Moderate",
    marketOverview:
      "Victoria is British Columbia's capital and the refined heart of Vancouver Island — a market shaped by tourism, government, a quietly growing tech sector, and an affluent, quality-conscious population. First impressions and polish carry unusual weight here.",
    localInsight:
      "Island customers reward brands that look and load like a premium experience. We help Victoria businesses stand out fast across Downtown, Oak Bay, and Fairfield, and capture the tourism search that surges through the spring and summer season.",
    stat: { value: "400K", label: "people in the Greater Victoria market" },
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
