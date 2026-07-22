type PortableSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet";
  level?: number;
  markDefs: never[];
  children: PortableSpan[];
};

export type LocalBlogPost = {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  readTime: string;
  seoKeywords: string[];
  body: PortableBlock[];
  faqs: BlogFaq[];
};

export type BlogFaq = { question: string; answer: string };

// Generates 4 topic-relevant FAQs for a blog post so every article ships
// with FAQPage structured data and long-tail question coverage.
export function buildBlogFaqs(title: string, keyword: string, secondaryKeywords: string[] = []): BlogFaq[] {
  const related = secondaryKeywords.slice(0, 2).join(" and ") || keyword;
  return [
    {
      question: `What is ${keyword}?`,
      answer: `${keyword} is the practice covered in "${title}". It focuses on improving crawlability, relevance, and conversion so the right pages rank for the right intent and turn traffic into qualified leads.`,
    },
    {
      question: `How long does ${keyword} take to show results?`,
      answer: `Most sites see early directional gains within 2 to 6 weeks and stronger compound gains over 8 to 16 weeks, depending on domain authority, competition, and how consistently the changes are implemented.`,
    },
    {
      question: `What are common mistakes with ${keyword}?`,
      answer: `The biggest mistakes are publishing thin or duplicated pages, ignoring search intent, and separating SEO from conversion. Focus on ${related} and make sure every change improves both discoverability and the offer's clarity.`,
    },
    {
      question: `Can Launch at Dawn help with ${keyword}?`,
      answer: `Yes. Launch at Dawn is a technical SEO and web development agency in Montreal and Vancouver. We implement ${keyword} end to end — audits, architecture, on-page execution, and measurement tied to revenue. Book a free website teardown to get started.`,
    },
  ];
}

const AUTHOR = "Launch at Dawn Editorial";
const AUTHOR_IMAGE = "https://api.dicebear.com/7.x/avataaars/png?seed=launchatdawn-editorial";

// --- Portable Text block builders (unique keys via counter) ---
let __k = 0;
const nextKey = (p: string) => `${p}-${(__k += 1)}`;

function blockOf(text: string, style: PortableBlock["style"], listItem?: "bullet"): PortableBlock {
  const base: PortableBlock = {
    _type: "block",
    _key: nextKey("b"),
    style: listItem ? "normal" : style,
    markDefs: [],
    children: [{ _type: "span", _key: nextKey("s"), text, marks: [] }],
  };
  if (listItem) {
    base.listItem = "bullet";
    base.level = 1;
  }
  return base;
}

const h2 = (t: string) => blockOf(t, "h2");
const h3 = (t: string) => blockOf(t, "h3");
const p = (t: string) => blockOf(t, "normal");
const quote = (t: string) => blockOf(t, "blockquote");
const li = (t: string) => blockOf(t, "normal", "bullet");

type Article = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  readTime: string;
  image: string;
  publishedAt: string;
  seoKeywords: string[];
  body: PortableBlock[];
  faqs: BlogFaq[];
};

const ARTICLES: Article[] = [
  {
    slug: "how-much-does-seo-cost-in-canada",
    title: "How Much Does SEO Cost in Canada in 2026?",
    tag: "Pricing",
    excerpt:
      "A transparent breakdown of real SEO pricing in Canada — monthly retainers, project fees, and hourly rates — plus how to tell a bargain from a money pit.",
    readTime: "9 MIN",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 20)).toISOString(),
    seoKeywords: [
      "how much does seo cost in canada",
      "seo cost canada",
      "seo pricing canada",
      "seo agency cost",
      "monthly seo retainer price",
      "seo services montreal cost",
      "seo pricing vancouver",
      "is seo worth it",
      "Launch at Dawn",
    ],
    body: [
      p("The honest answer is: it depends — but not in the evasive way most agencies mean it. SEO pricing in Canada follows a few clear patterns, and once you understand them you can quickly tell whether a quote is fair, inflated, or too cheap to actually work."),
      p("Below are the real 2026 ranges we see across the Canadian market, from independent freelancers in smaller cities to full-service agencies in Toronto, Montreal, and Vancouver."),
      h2("The three ways SEO is priced"),
      h3("1. Monthly retainer (most common)"),
      p("The majority of ongoing SEO work is billed as a monthly retainer. This covers continuous technical fixes, content, link building, and reporting. In Canada, typical ranges look like this:"),
      li("Freelancers / small local shops: $750 – $2,000 / month"),
      li("Established boutique agencies: $2,000 – $5,000 / month"),
      li("Full-service or competitive-niche agencies: $5,000 – $12,000+ / month"),
      p("For most small and mid-sized Canadian businesses, meaningful, sustained SEO lands in the $1,500 – $4,000 / month range. Below roughly $1,000 / month, there usually isn't enough time in the budget to move a competitive market."),
      h3("2. One-time project fees"),
      p("Some work is naturally project-based: a technical SEO audit, a site migration, or a one-off content build. Expect $1,500 – $5,000 for a serious audit with an implementation plan, and $3,000 – $15,000+ for a full technical overhaul or migration depending on site size."),
      h3("3. Hourly consulting"),
      p("Strategy calls, training, and advisory work are often billed hourly. Canadian SEO consultants typically charge $100 – $250 / hour, with senior specialists at the top of that band."),
      h2("What actually drives the price up or down"),
      li("Competition: ranking a dentist in a small town is far cheaper than ranking a law firm in downtown Toronto."),
      li("Starting point: a fast, clean site needs less remedial work than a slow, broken one."),
      li("Content volume: more pages and more languages (English + French in Quebec) means more work."),
      li("Link building: earning quality backlinks is the most labour-intensive — and most underpriced — part of SEO."),
      quote("If someone offers to rank you nationally for $299/month with 'guaranteed #1 rankings,' that is the single clearest red flag in the entire industry."),
      h2("Why cheap SEO usually costs more"),
      p("The most expensive SEO is the kind you have to redo. Bargain providers often mass-produce thin pages and spammy links that can actively suppress a domain under Google's Helpful Content and link-spam systems. We regularly meet businesses whose first real expense is undoing damage from a previous cheap vendor."),
      h2("What good ROI looks like"),
      p("Think of SEO as buying an asset, not renting attention. Unlike ads, the rankings you build keep working after you stop paying. A reasonable expectation: early directional movement in 2–3 months, and compounding, revenue-relevant gains from month 6 onward. If a provider can't tie their work to leads and revenue, the price is irrelevant."),
      p("At Launch at Dawn, we price transparently around your market and goals, and every engagement is tied to measurable outcomes — not vanity keyword counts. Book a free website teardown and we'll give you a clear, no-obligation number for your specific situation."),
    ],
    faqs: [
      { question: "How much does SEO cost per month in Canada?", answer: "Most Canadian small and mid-sized businesses invest $1,500–$4,000 per month for meaningful, sustained SEO. Freelancers can start lower ($750–$2,000), while competitive niches and full-service agencies run $5,000–$12,000+ per month." },
      { question: "Is cheap SEO worth it?", answer: "Rarely. Very cheap SEO ($99–$500/month with 'guaranteed rankings') usually relies on thin content and spammy links that can trigger Google penalties. Fixing that damage often costs more than doing it properly the first time." },
      { question: "How long before SEO pays for itself?", answer: "Expect early movement in 2–3 months and compounding, revenue-relevant results from around month 6. Because rankings persist after you stop paying, SEO behaves like an appreciating asset rather than rented attention." },
      { question: "Do you offer SEO in both English and French?", answer: "Yes. We build bilingual SEO for the Quebec market so you rank for both English and French search intent — something most single-language agencies leave uncaptured." },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-canada",
    title: "How Much Does a Website Cost in Canada in 2026?",
    tag: "Pricing",
    excerpt:
      "Template site or custom build? Here are the real 2026 price ranges for websites in Canada — and exactly what drives the cost up or down.",
    readTime: "8 MIN",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 17)).toISOString(),
    seoKeywords: [
      "how much does a website cost in canada",
      "website cost canada",
      "web design pricing",
      "cost to build a website",
      "small business website cost",
      "custom website price",
      "web design montreal cost",
      "web development vancouver pricing",
      "Launch at Dawn",
    ],
    body: [
      p("A website can cost $500 or $50,000 — and both can be the 'right' price depending on what the site has to do. The gap comes down to one question: is this a brochure, or a revenue engine?"),
      h2("The real 2026 price ranges in Canada"),
      li("DIY builders (Wix, Squarespace): $0 – $500 setup + ~$25–$50/month. Fine for a simple presence, limited for growth."),
      li("Freelancer template site: $1,000 – $5,000. A customized template, decent for early-stage small businesses."),
      li("Agency small-business site: $5,000 – $15,000. Custom design, proper SEO foundation, conversion-focused."),
      li("Custom-built (Next.js / headless): $15,000 – $50,000+. Fast, scalable, bespoke — for businesses where the site drives real revenue."),
      h2("What actually drives the cost"),
      li("Custom design vs. template: original UX/UI is the single biggest line item."),
      li("Number of pages and content: 5 pages vs. 50 pages is a very different scope."),
      li("Functionality: booking, payments, logins, dashboards, and integrations all add engineering time."),
      li("Copywriting and photography: great content isn't free, and it's often what converts."),
      li("SEO foundation: proper structure, schema, and speed baked in from day one."),
      quote("The cheapest website is rarely the least expensive. A slow, generic site that converts poorly quietly costs you customers every single day it's live."),
      h2("Don't forget the ongoing costs"),
      p("A website is not a one-time purchase. Budget for hosting ($0–$50/month for most modern sites), a domain (~$20/year), maintenance and updates, and — if you want it to grow — ongoing SEO and content."),
      h2("Template vs. custom: how to choose"),
      p("If you need a simple, credible presence and budget is tight, a good template site is a smart start. If your website is where customers research, compare, and buy — where a one-second speed improvement or a cleaner funnel translates directly into revenue — a custom build pays for itself. We engineer sites in Next.js that load in under a second and are built to rank and convert from launch."),
      p("Want a real number for your project? Book a free consultation and we'll scope it transparently — no inflated 'enterprise' padding."),
    ],
    faqs: [
      { question: "How much does a small business website cost in Canada?", answer: "Most Canadian small businesses spend $5,000–$15,000 for a professional agency-built site with custom design and a proper SEO foundation. Template-based freelancer sites run $1,000–$5,000, and DIY builders can start near $0." },
      { question: "Why are custom websites more expensive?", answer: "Custom sites involve original design, bespoke functionality, and performance engineering rather than a pre-made template. For businesses where the website drives revenue, that speed and conversion advantage typically pays for itself." },
      { question: "What are the ongoing costs of a website?", answer: "Plan for hosting ($0–$50/month for modern sites), a domain (~$20/year), maintenance, and optional ongoing SEO/content. A website is a living asset, not a one-time purchase." },
      { question: "Is a template or custom site better for SEO?", answer: "Both can rank, but custom builds give you full control over speed, structure, and schema — the technical factors that matter most on competitive terms. Templates are fine for simpler, lower-competition markets." },
    ],
  },
  {
    slug: "how-to-rank-in-google-ai-overviews",
    title: "Do AI Overviews Kill SEO? How to Rank in Google's AI Search in 2026",
    tag: "AI Search",
    excerpt:
      "Google's AI Overviews are reshaping search results. Here's what actually changed, why clicks are shifting, and how to become a cited source instead of a casualty.",
    readTime: "10 MIN",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 14)).toISOString(),
    seoKeywords: [
      "how to rank in google ai overviews",
      "google ai overviews seo",
      "ai overviews",
      "generative engine optimization",
      "GEO seo",
      "ai search optimization",
      "seo 2026 trends",
      "google sge ranking",
      "Launch at Dawn",
    ],
    body: [
      p("Google's AI Overviews — the AI-generated answer box that now sits above traditional results for many queries — is the biggest shift to the search results page in a decade. The panic headline is 'SEO is dead.' The reality is more useful: SEO is changing shape, and the sites that adapt are getting cited to millions of users for free."),
      h2("What actually changed"),
      p("For informational queries, Google increasingly synthesizes an answer at the top of the page and cites a handful of sources. This creates 'zero-click' results where the user gets their answer without visiting a site — but it also creates a new, high-visibility position: being one of the cited sources."),
      h2("Who AI Overviews hurt — and who they help"),
      li("Hurt: thin, purely informational pages whose only value was a quick fact the AI can now summarize."),
      li("Helped: pages with genuine depth, unique data, and clear expertise that the AI needs to cite for credibility."),
      li("Largely unaffected: transactional and local intent ('buy', 'near me', 'book') where users still click through to act."),
      quote("The goal is no longer only to rank #1. It's to be the source the AI trusts enough to name — and the brand a buyer clicks when they're ready to act."),
      h2("Generative Engine Optimization (GEO): the new layer"),
      p("GEO is optimizing to be selected and cited by AI systems. It doesn't replace SEO — it sits on top of it. The strong SEO fundamentals still apply; GEO adds a focus on how machines extract and trust your content."),
      h3("What actually helps you get cited"),
      li("Answer the question directly and early — lead with a clear, extractable answer, then expand."),
      li("Publish unique information: original data, real examples, first-hand expertise the AI can't get elsewhere."),
      li("Use clean structure — descriptive headings, short paragraphs, and lists the model can parse."),
      li("Add structured data (schema) so machines understand entities, authorship, and context."),
      li("Build genuine authority: AI systems lean on sources that already have trust signals and citations."),
      h2("The transactional safety net"),
      p("Because AI Overviews mostly affect informational queries, the strategic move is to strengthen your commercial and local pages — the ones tied to booking, buying, and 'near me' intent — while making your informational content citation-worthy. That way you win visibility in the AI answer and capture the click when there's money on the line."),
      p("We build content architectures designed for both traditional rankings and AI citation. If you want to future-proof your visibility, start with a free teardown of your current site."),
    ],
    faqs: [
      { question: "Do Google AI Overviews mean SEO is dead?", answer: "No. AI Overviews change SEO rather than end it. Thin informational pages lose clicks, but transactional/local pages are largely unaffected, and being cited in the AI answer is a valuable new visibility position." },
      { question: "What is Generative Engine Optimization (GEO)?", answer: "GEO is optimizing your content to be selected and cited by AI systems like Google's AI Overviews. It builds on traditional SEO by focusing on clear answers, unique data, structured data, and authority the AI can trust." },
      { question: "How do I get my site cited in AI Overviews?", answer: "Lead with a direct, extractable answer, publish genuinely unique information, use clean headings and lists, add schema markup, and build real authority. AI systems cite sources they can parse and trust." },
      { question: "Which pages are safest from AI Overviews?", answer: "Transactional and local-intent pages ('buy', 'book', 'near me') are least affected, because users still click through to take action. Strengthening these protects revenue while you make informational content citation-worthy." },
    ],
  },
  {
    slug: "how-to-get-cited-by-chatgpt-and-perplexity",
    title: "How to Get Your Business Cited by ChatGPT and Perplexity (AEO Guide)",
    tag: "AI Search",
    excerpt:
      "Millions of buyers now ask ChatGPT and Perplexity for recommendations. Here's how Answer Engine Optimization gets your brand named in those answers.",
    readTime: "9 MIN",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 11)).toISOString(),
    seoKeywords: [
      "how to get cited by chatgpt",
      "answer engine optimization",
      "AEO",
      "rank in chatgpt",
      "perplexity seo",
      "llm seo",
      "ai brand mentions",
      "get recommended by ai",
      "Launch at Dawn",
    ],
    body: [
      p("When a customer asks ChatGPT 'who's the best SEO agency in Montreal?' or asks Perplexity to compare web developers, the businesses that get named win a recommendation no ad can buy. Answer Engine Optimization (AEO) is the practice of making sure that name is yours."),
      h2("How language models decide who to mention"),
      p("Chat assistants don't pull from a live ranking the way Google does. They draw on their training data and, increasingly, on real-time web retrieval. Both routes reward the same thing: being frequently and consistently described, in trustworthy places, as a leader in your category."),
      h2("The AEO playbook"),
      h3("1. Get mentioned on sources AI trusts"),
      li("Earn coverage and listings on reputable third-party sites, directories, and 'best of' roundups."),
      li("Encourage genuine reviews on Google, Clutch, and industry platforms — AI reads reputation signals."),
      li("Pursue digital PR: being quoted or featured builds the associations models learn from."),
      h3("2. Make your own content machine-readable"),
      li("Answer real questions directly and completely, in plain language."),
      li("Use clear entities: your business name, location, and services stated explicitly and consistently."),
      li("Add Organization, LocalBusiness, and FAQ schema so machines can extract the facts cleanly."),
      li("Publish an llms.txt and keep your site fast and crawlable for AI retrieval bots."),
      h3("3. Be consistent everywhere"),
      p("Models reward consistency. Your name, category, location, and value proposition should read the same across your site, your profiles, and third-party mentions. Contradictory information dilutes the association."),
      quote("Traditional SEO gets you the click. AEO gets you the recommendation — and a recommendation from a trusted AI is the closest thing to a referral at scale."),
      h2("How to measure it"),
      p("Track it directly: periodically ask ChatGPT, Gemini, and Perplexity the questions your buyers would ask, and note whether you're mentioned and how you're described. Watch for referral traffic from AI platforms in your analytics, which is now a measurable and growing channel."),
      p("We build AEO into every engagement — from schema and entity consistency to the digital PR that earns trusted mentions. Curious whether AI already knows your brand? We'll check as part of a free teardown."),
    ],
    faqs: [
      { question: "What is Answer Engine Optimization (AEO)?", answer: "AEO is optimizing your brand and content so AI assistants like ChatGPT, Gemini, and Perplexity mention and recommend you in their answers. It combines trusted third-party mentions, machine-readable content, and consistent entity information." },
      { question: "How do I get my business mentioned by ChatGPT?", answer: "Earn mentions on reputable third-party sites and directories, collect genuine reviews, add clear schema and entity data to your site, and keep your name, location, and services consistent everywhere. Models reward trusted, consistent sources." },
      { question: "Is AEO different from SEO?", answer: "They overlap but differ in goal. SEO earns the click from search engines; AEO earns the recommendation from AI answer engines. Strong SEO fundamentals help AEO, but AEO adds a focus on reputation signals and machine readability." },
      { question: "Can I measure AI citations?", answer: "Yes. Ask the assistants the questions your buyers would ask and record whether you're mentioned, and track referral traffic from AI platforms in your analytics — an increasingly significant channel." },
    ],
  },
  {
    slug: "local-seo-for-restaurants-2026",
    title: "Local SEO for Restaurants: The 2026 Playbook to Fill Tables",
    tag: "Local SEO",
    excerpt:
      "Hungry customers search, then walk in within the hour. Here's the exact local SEO playbook that puts your restaurant in the map pack and fills seats.",
    readTime: "8 MIN",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 8)).toISOString(),
    seoKeywords: [
      "local seo for restaurants",
      "restaurant seo",
      "how to get restaurant on google maps",
      "restaurant google business profile",
      "restaurant marketing 2026",
      "near me restaurant seo",
      "restaurant map pack ranking",
      "Launch at Dawn",
    ],
    body: [
      p("Restaurant search is uniquely powerful: a person searching 'brunch near me' or 'best ramen downtown' is often deciding where to eat in the next hour. Win that moment and you fill a table today. Here's how local SEO does exactly that in 2026."),
      h2("Your Google Business Profile is the new homepage"),
      p("For restaurants, most discovery happens in the Google map pack — the top three map results — not on your website. Your Google Business Profile is where the decision is made, so it deserves obsessive attention."),
      li("Choose the most specific primary category (e.g., 'Ramen restaurant', not just 'Restaurant')."),
      li("Keep hours, holiday hours, and phone number flawlessly accurate — errors kill trust and walk-ins."),
      li("Add your menu, and mark up attributes: dine-in, takeout, delivery, reservations, patio, vegan options."),
      h2("Photos and reviews are your conversion engine"),
      li("Upload high-quality photos regularly — of food, the room, and the exterior so people recognize you."),
      li("Aim for a steady flow of recent reviews; recency and volume both influence ranking and clicks."),
      li("Reply to every review, positive or negative. It signals an active, cared-for business."),
      quote("Two restaurants can rank side by side, but the one with fresher photos and a 4.7 with 400 reviews wins the click almost every time."),
      h2("Menu SEO: the pages most restaurants skip"),
      p("Put your menu on your website as real, indexable text — not a PDF or an image. Each signature dish is a search term ('birria tacos', 'gluten-free pizza'). Text menus let you rank for those cravings and feed accurate data to Google and AI assistants."),
      h2("Short-form video is now local SEO"),
      p("Discovery increasingly happens on TikTok, Instagram, and Google's own results, which surface video. A steady stream of short, appetizing clips builds the social proof and searches that translate into foot traffic — especially with younger diners."),
      h2("Technical basics that still matter"),
      li("Add Restaurant and Menu schema so search engines understand your cuisine, price range, and hours."),
      li("Make sure your site loads fast on mobile — most restaurant searches happen on a phone, often on the move."),
      li("Embed reservations or online ordering prominently so the click converts instantly."),
      p("We help restaurants turn 'near me' searches into a full dining room — from profile optimization to review systems and menu SEO. Book a free teardown and we'll show you where your seats are leaking."),
    ],
    faqs: [
      { question: "How do restaurants rank higher on Google Maps?", answer: "Optimize your Google Business Profile with a specific category, accurate hours, menu, and attributes; post fresh photos regularly; earn a steady stream of recent reviews and reply to them; and keep your website fast with menu text and schema." },
      { question: "Should my restaurant menu be a PDF?", answer: "No. Publish your menu as real, indexable text on your website. Dish names are search terms, and text menus let you rank for cravings and feed accurate data to Google and AI assistants — PDFs and images can't do that well." },
      { question: "Does TikTok help restaurant SEO?", answer: "Yes. Short-form video on TikTok and Instagram drives discovery and social proof that translate into foot traffic, and video increasingly appears directly in search results — especially for younger diners." },
      { question: "How important are reviews for restaurants?", answer: "Critical. Review volume, rating, and recency all influence both map-pack ranking and whether a searcher clicks you over a competitor. Aim for a consistent flow of recent reviews and reply to every one." },
    ],
  },
  {
    slug: "google-business-profile-optimization-checklist",
    title: "Google Business Profile Optimization: The 2026 Checklist",
    tag: "Local SEO",
    excerpt:
      "Your Google Business Profile is the highest-ROI local SEO asset you own. Here's the complete 2026 checklist to dominate the map pack.",
    readTime: "8 MIN",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 5)).toISOString(),
    seoKeywords: [
      "google business profile optimization",
      "google business profile checklist",
      "gbp ranking factors",
      "google maps seo",
      "local seo checklist 2026",
      "rank in map pack",
      "google my business tips",
      "Launch at Dawn",
    ],
    body: [
      p("For any business with a physical location or service area, the Google Business Profile (GBP) is the single highest-ROI asset in local SEO. It's free, it powers the map pack, and most competitors optimize it lazily — which is your opening. Here's the full 2026 checklist."),
      h2("Foundation: get the basics perfect"),
      li("Verify your profile and complete every field — a fully completed profile ranks and converts better."),
      li("Pick the most specific primary category, then add relevant secondary categories."),
      li("Keep NAP (name, address, phone) identical to your website and every other listing online."),
      li("Set accurate regular and holiday hours; wrong hours are one of the fastest ways to lose trust."),
      h2("Content: feed the profile constantly"),
      li("Add high-quality photos regularly — businesses with fresh photos see more calls and direction requests."),
      li("Use Google Posts weekly to share offers, events, and updates; it signals an active business."),
      li("Fill out Products and Services with descriptions and prices where relevant."),
      li("Seed and answer the Q&A section with the real questions customers ask."),
      h2("Reputation: the ranking multiplier"),
      quote("Reviews are the closest thing local SEO has to a cheat code — volume, rating, recency, and your replies all move the needle at once."),
      li("Build a simple system to request reviews from happy customers consistently."),
      li("Reply to every review — thoughtful responses to negative ones often impress future customers most."),
      li("Encourage reviewers to mention specific services and neighborhoods; that language helps relevance."),
      h2("Attributes and features"),
      li("Set every relevant attribute: accessibility, payment options, 'women-owned', outdoor seating, and more."),
      li("Enable messaging, booking, or ordering if you can respond quickly — these drive direct conversions."),
      h2("Measure what matters"),
      p("Use the profile's performance insights to track calls, direction requests, website clicks, and the searches that surface you. These are real business actions, not vanity metrics — and they tell you exactly what to double down on."),
      p("Optimizing a GBP well is ongoing work, not a one-time setup. We run review engines and profile optimization that keep local businesses in the map pack. Want a free audit of your current profile? Just ask."),
    ],
    faqs: [
      { question: "What is the most important Google Business Profile ranking factor?", answer: "Relevance, distance, and prominence work together, but in practice the biggest levers you control are your primary category, review signals (volume, rating, recency), and NAP consistency across the web." },
      { question: "How often should I post on Google Business Profile?", answer: "Aim for at least weekly. Regular Google Posts, fresh photos, and updated information signal an active, trustworthy business, which supports both ranking and conversions." },
      { question: "Do reviews really affect Google Maps ranking?", answer: "Yes. Review volume, average rating, recency, and your responses all influence map-pack ranking and click-through. A consistent review-generation system is one of the highest-ROI local SEO activities." },
      { question: "Should NAP be identical everywhere?", answer: "Absolutely. Your business name, address, and phone number should match exactly across your website, Google Business Profile, and all directories. Inconsistencies confuse search engines and erode trust." },
    ],
  },
  {
    slug: "core-web-vitals-2026-inp-guide",
    title: "Core Web Vitals in 2026: How INP and Site Speed Affect Your Rankings",
    tag: "Engineering",
    excerpt:
      "INP replaced FID, and site speed still quietly decides who ranks and who converts. Here's what the 2026 Core Web Vitals thresholds are and how to hit them.",
    readTime: "9 MIN",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 6, 2)).toISOString(),
    seoKeywords: [
      "core web vitals 2026",
      "interaction to next paint",
      "INP optimization",
      "improve lcp",
      "reduce cls",
      "site speed seo",
      "page experience ranking",
      "website performance optimization",
      "Launch at Dawn",
    ],
    body: [
      p("Core Web Vitals are Google's attempt to measure how a page actually feels to a real user — how fast it loads, how quickly it responds, and how stable it is while loading. They're a genuine ranking signal, and just as importantly, they directly affect conversions."),
      h2("The three metrics that matter"),
      h3("LCP — Largest Contentful Paint (loading)"),
      p("LCP measures how long until the main content is visible. Aim for under 2.5 seconds. It's usually dominated by your largest image or hero, slow server response, or render-blocking resources."),
      h3("INP — Interaction to Next Paint (responsiveness)"),
      p("INP replaced First Input Delay (FID) as a Core Web Vital in March 2024. It measures how quickly the page responds to user interactions — taps, clicks, key presses — across the whole visit. Aim for under 200 milliseconds. Heavy JavaScript is the usual culprit."),
      h3("CLS — Cumulative Layout Shift (stability)"),
      p("CLS measures unexpected movement as the page loads — the frustrating jump when a button shifts just as you tap it. Aim for under 0.1. Reserve space for images and ads, and avoid injecting content above existing content."),
      quote("Passing Core Web Vitals rarely rockets you to #1 on its own — but failing them is a tax on every other ranking and conversion effort you make."),
      h2("How to actually improve them"),
      li("Optimize images: modern formats (WebP/AVIF), correct sizing, and lazy-loading below the fold."),
      li("Cut and defer JavaScript: ship less to the browser, and split code so pages stay interactive — the biggest INP win."),
      li("Use a fast host and a CDN so content is served quickly and close to the user."),
      li("Reserve dimensions for images, embeds, and dynamic content to eliminate layout shift."),
      li("Prioritize the hero: preload the LCP image and avoid render-blocking fonts and scripts."),
      h2("Why this is also a conversion story"),
      p("Speed isn't only about Google. Study after study shows that every additional second of load time reduces conversions, and slower sites see higher bounce rates. Improving Core Web Vitals often lifts revenue before it ever moves a ranking."),
      h2("Measure with real-user data"),
      p("Lab tools like Lighthouse are useful for debugging, but Google ranks on field data from real users (the Chrome UX Report). Check Search Console's Core Web Vitals report to see how actual visitors experience your site, then fix the templates that fail."),
      p("We build in Next.js specifically to win here — sub-second loads and lean JavaScript by default. If your site feels slow, a free teardown will show you exactly which metric is costing you traffic and sales."),
    ],
    faqs: [
      { question: "What are the Core Web Vitals thresholds in 2026?", answer: "Aim for LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1, measured on real-user field data. INP replaced First Input Delay as a Core Web Vital in March 2024." },
      { question: "What is INP in SEO?", answer: "Interaction to Next Paint (INP) measures how quickly a page responds to user interactions across the whole visit. It replaced FID in 2024. Heavy JavaScript is the most common cause of poor INP; aim for under 200ms." },
      { question: "Do Core Web Vitals actually affect rankings?", answer: "Yes, they're a genuine ranking signal, though not the strongest one. Passing them won't guarantee #1, but failing them handicaps all your other SEO efforts — and hurts conversions directly." },
      { question: "How do I measure Core Web Vitals correctly?", answer: "Use Google Search Console's Core Web Vitals report and the Chrome UX Report for real-user field data, which is what Google ranks on. Lighthouse is useful for lab debugging but doesn't reflect actual visitor experience." },
    ],
  },
  {
    slug: "why-your-new-website-isnt-ranking",
    title: "Why Your New Website Isn't Ranking (And the 90-Day Fix)",
    tag: "Strategy",
    excerpt:
      "Launched a beautiful new site and heard crickets? That's normal — and fixable. Here's why new sites don't rank and the exact 90-day plan to change it.",
    readTime: "9 MIN",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    publishedAt: new Date(Date.UTC(2026, 5, 29)).toISOString(),
    seoKeywords: [
      "why is my new website not ranking",
      "new website not ranking on google",
      "how long for new site to rank",
      "google sandbox",
      "new website seo",
      "first 90 days seo",
      "seo for new business",
      "website not showing on google",
      "Launch at Dawn",
    ],
    body: [
      p("You invested in a great-looking website, launched it, and… nothing. No traffic, no calls, and you can't even find yourself on Google unless you search your exact business name. This is one of the most common and demoralizing experiences for a new business — and the good news is it's completely normal and fixable."),
      h2("Why new websites don't rank at first"),
      h3("1. Google doesn't trust you yet"),
      p("New domains start with essentially zero authority. Google has learned to be cautious with brand-new sites (often called the 'sandbox' effect), so it takes time and evidence before it will rank you for anything competitive. Ranking for your own brand name — and little else — is the classic early-stage signature."),
      h3("2. There's nothing to rank for"),
      p("If your site is five pages of general copy, Google has almost no specific queries to match you to. No content targeting real searches means no rankings, no matter how polished the design."),
      h3("3. Thin or templated content"),
      li("Pages that are near-duplicates of each other (only a city or keyword swapped) can be flagged as thin."),
      li("Generic AI copy with no unique insight gives Google no reason to prefer you."),
      li("Doorway-style pages built purely for search can suppress the whole domain's trust."),
      h3("4. No backlinks"),
      p("Backlinks are still one of the strongest trust signals. A brand-new site with zero referring domains has nothing telling Google that anyone vouches for it."),
      quote("A new site not ranking isn't a bug — it's the default. Ranking is something you earn over the first 90 days, not something a launch grants you."),
      h2("The 90-day fix"),
      h3("Days 1–30: Foundation"),
      li("Verify Google Search Console and Bing Webmaster Tools; submit your sitemap."),
      li("Confirm every important page is indexable (no accidental noindex, clean robots.txt)."),
      li("Fix technical basics: speed, mobile, schema, and a logical internal-linking structure."),
      li("Set up your Google Business Profile if you serve a local market."),
      h3("Days 31–60: Content that targets real searches"),
      li("Research the actual, winnable keywords your customers use — long-tail and buyer-intent first."),
      li("Publish genuinely unique, in-depth pages for those terms — not thin templated variations."),
      li("Build topic clusters and link them together so authority flows to your money pages."),
      h3("Days 61–90: Authority and momentum"),
      li("Earn your first quality backlinks: directories, partners, local press, and genuine outreach."),
      li("Collect reviews and mentions that build reputation and trust signals."),
      li("Track rankings by intent cluster and double down on what's moving."),
      h2("Set the right expectations"),
      p("For a new site, expect early movement on long-tail terms within 6–12 weeks, with competitive rankings building from month 4 onward. It compounds: the authority you earn now makes every future page rank faster. The businesses that win are simply the ones that start the clock and stay consistent."),
      p("This is exactly the work we do for new and growing brands — foundation, unique content, and authority, tied to leads. Book a free website teardown and we'll map your specific 90-day plan."),
    ],
    faqs: [
      { question: "How long does it take for a new website to rank on Google?", answer: "Expect early movement on long-tail keywords within 6–12 weeks, with more competitive rankings building from around month 4. New domains start with little trust, so ranking is earned over the first 90 days and beyond." },
      { question: "What is the Google sandbox?", answer: "It's the widely observed effect where brand-new domains struggle to rank for competitive terms for a period after launch, while Google gathers trust signals. Ranking only for your own brand name early on is the classic sign." },
      { question: "Why does my site only rank for my business name?", answer: "Because your brand name has no competition, but you likely have little content targeting other real searches and little authority yet. The fix is unique, intent-targeted content plus backlinks and consistent optimization." },
      { question: "Can I speed up ranking for a new site?", answer: "You can't skip the trust-building, but you accelerate it: fix technical foundations, publish genuinely unique content targeting winnable keywords, build quality backlinks, and earn reviews. Consistency over the first 90 days is what compounds." },
    ],
  },
];

export const LOCAL_BLOG_POSTS: LocalBlogPost[] = ARTICLES.map((a) => ({
  _id: a.slug,
  title: a.title,
  slug: a.slug,
  tag: a.tag,
  publishedAt: a.publishedAt,
  excerpt: a.excerpt,
  image: a.image,
  author: AUTHOR,
  authorImage: AUTHOR_IMAGE,
  readTime: a.readTime,
  seoKeywords: [...a.seoKeywords, "SEO agency Montreal", "SEO agency Vancouver"],
  body: a.body,
  faqs: a.faqs,
}));

export const LOCAL_BLOG_SLUGS = LOCAL_BLOG_POSTS.map((post) => post.slug);

export function getLocalBlogPostBySlug(slug: string): LocalBlogPost | undefined {
  return LOCAL_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getLocalRelatedPosts(slug: string, count = 3): LocalBlogPost[] {
  return LOCAL_BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, count);
}
