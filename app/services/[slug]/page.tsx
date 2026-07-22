import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/app/seo";
import FaqSection from "@/components/FaqSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedServices from "@/components/RelatedServices";
import Testimonials from "@/components/Testimonials";

// --- FULL DEPTH CONTENT DATA ---
interface ServiceStep { label: string; desc: string }
interface ServiceStat { val: string; label: string }
interface ServiceFaq { question: string; answer: string }
interface ServicePackage { name: string; price: string; desc: string; bullets: string[]; featured?: boolean }
interface ServiceEntry {
  title: string;
  tagline: string;
  heroDesc: string;
  auditTitle: string;
  auditDesc: string;
  steps: ServiceStep[];
  sectors: string[];
  stats: ServiceStat[];
  faqs: ServiceFaq[];
  // --- Productized fields (optional; render only when present) ---
  overview?: string;
  deliverables?: string[];
  idealFor?: string[];
  timeline?: string;
  outcome?: string;
  pricingNote?: string;
  packages?: ServicePackage[];
}

const serviceData: Record<string, ServiceEntry> = {
  strategy: {
    title: "Growth Strategy",
    tagline: "Be the Category Leader, Not the Follower.",
    heroDesc: "We don't just 'consult.' We architect revenue systems. We identify your competitor's technical weaknesses and exploit them to win your market share.",
    auditTitle: "The Intelligence Audit",
    auditDesc: "We analyze over 50+ data points across the Montreal and Vancouver dining landscapes to see exactly where your revenue is leaking.",
    steps: [
      { label: "Cultural Signal Analysis", desc: "We track what local diners are actually talking about on TikTok and Reddit before it hits Google." },
      { label: "Revenue Gap Mapping", desc: "If you have 20 empty tables on a Tuesday, our strategy is built to fill those specific slots." },
      { label: "Competitive Displacement", desc: "We find out why people are choosing the restaurant down the street and technically rewire their journey to you." }
    ],
    sectors: ["Fine Dining", "Fast-Casual Chains", "Luxury Dental Clinics", "Boutique Hospitality"],
    stats: [{ val: "12X", label: "Avg. ROAS" }, { val: "24/7", label: "Market Pulse" }],
    faqs: [
      { question: "What does a growth strategy engagement include?", answer: "A full audit of your market and competitors, a revenue-gap map, and a prioritized roadmap of the campaigns, content, and technical fixes that will move your numbers fastest." },
      { question: "How is this different from a normal marketing consultant?", answer: "We don't stop at slides. We architect and execute the revenue systems — SEO, web, content, and analytics — so the strategy actually ships and produces results." },
      { question: "How soon will I see results?", answer: "Quick wins often appear within the first few weeks, with compounding growth over 3 to 6 months as the strategy matures." },
      { question: "Do you work with businesses outside Montreal and Vancouver?", answer: "Yes. We're based in Montreal and Vancouver and work with clients across Canada and the USA." }
    ],
    overview: "Growth Strategy is our done-with-you revenue architecture engagement. We audit your market, map where revenue is leaking, and hand you a prioritized roadmap of the exact campaigns, content, and technical fixes that will move your numbers — then help you ship them.",
    deliverables: [
      "Full market and competitor intelligence audit (50+ data points)",
      "Revenue-gap map showing where you're losing bookings and sales",
      "Prioritized 90-day growth roadmap with clear owners and milestones",
      "Channel plan across SEO, content, social, and paid",
      "Positioning and messaging framework to separate you from competitors",
      "Quarterly strategy reviews to keep the plan on track",
    ],
    idealFor: [
      "Founders who feel busy but stuck at a revenue ceiling",
      "Businesses losing share to a specific competitor",
      "Brands with budget but no clear plan to deploy it",
      "Teams that need a roadmap before they hire or spend more",
    ],
    timeline: "Audit and roadmap in 2–3 weeks · execution begins immediately after",
    outcome: "A clear, prioritized plan your team can act on — and a defensible position in your market instead of guesswork.",
    pricingNote: "Starting prices — final scope is set after a short discovery call.",
    packages: [
      {
        name: "Clarity Sprint",
        price: "$1,500",
        desc: "A focused audit and roadmap for a business that needs direction fast.",
        bullets: ["Market + competitor audit", "Revenue-gap map", "90-day priority roadmap", "1 strategy call"],
      },
      {
        name: "Growth Blueprint",
        price: "$3,500",
        desc: "A complete strategy plus the execution plan to make it real.",
        bullets: ["Everything in Clarity Sprint", "Full channel + content plan", "Positioning & messaging framework", "Quarterly reviews"],
        featured: true,
      },
      {
        name: "Fractional Growth Partner",
        price: "$4,500",
        desc: "An embedded strategist steering growth month over month.",
        bullets: ["Everything in Growth Blueprint", "Monthly strategy leadership", "Team + vendor coordination", "Ongoing performance oversight"],
      },
    ],
  },
  seo: {
    title: "Local Visibility",
    tagline: "Search is Social. Social is Revenue.",
    heroDesc: "Being on Page 1 is the baseline. Owning the intent behind the search is the victory. We bridge the gap between discovery and a booked reservation.",
    auditTitle: "Technical Dominance",
    auditDesc: "Most 'SEO experts' focus on keywords. We focus on Search Intent—capturing customers at the exact moment they are hungry.",
    steps: [
      { label: "Intent Engineering", desc: "Optimizing for 'Best steakhouse near me' is basic. We optimize for 'Best date night spots open now'." },
      { label: "The Map Pack Takeover", desc: "We force your business into the top 3 Google Map spots where 80% of all local bookings happen." },
      { label: "Velocity Optimization", desc: "Using Next.js 15 to ensure your site loads in under 400ms—Google's favorite ranking signal." }
    ],
    sectors: ["Local Restaurants", "Medical Practices", "Real Estate Groups", "Service Franchises"],
    stats: [{ val: "400%", label: "Organic Growth" }, { val: "Top 3", label: "Avg. Ranking" }],
    faqs: [
      { question: "How much does SEO cost?", answer: "It depends on your competition and goals, but most local businesses start with a focused monthly program. Book a free call for a clear, no-obligation quote." },
      { question: "How long until I rank on Google?", answer: "Local SEO and Google Business Profile work often show movement within a few weeks. Competitive keywords typically take 3 to 6 months to rank strongly." },
      { question: "Can you get me into the Google map pack?", answer: "That's our core focus. We optimize your Google Business Profile, citations, and local signals to push you into the top 3 map results where most local bookings happen." },
      { question: "Do you handle technical SEO too?", answer: "Yes. We fix Core Web Vitals, site speed, crawlability, and schema on top of content and local SEO — all under one roof." }
    ],
    overview: "Our SEO service is a done-for-you search visibility engine. We combine technical SEO, local optimization, and genuinely useful content so your business ranks for the searches that bring paying customers — and keeps ranking long after the work is done. Unlike ads, the rankings you build become an asset you own.",
    deliverables: [
      "Full technical SEO audit and fixes — crawlability, site speed, Core Web Vitals, and schema",
      "Keyword and search-intent map tailored to your market",
      "On-page optimization of your core pages: titles, structure, and content depth",
      "Google Business Profile optimization and local citation cleanup",
      "Monthly content briefs and publishing support",
      "Backlink and authority building from reputable sources",
      "Live ranking + lead dashboard with clear monthly reporting",
    ],
    idealFor: [
      "Local businesses fighting for the Google map pack",
      "Clinics, restaurants, and service brands with high-intent customers",
      "New websites that aren't ranking yet",
      "Companies whose competitors consistently outrank them",
    ],
    timeline: "Setup in week 1 · early movement in 4–8 weeks · compounding gains from month 3+",
    outcome: "Higher rankings for high-intent keywords, a steady flow of qualified organic leads, and a durable search asset you own.",
    pricingNote: "Starting prices — final scope is tailored to your market and competition after a free audit.",
    packages: [
      {
        name: "Local Launch",
        price: "$900",
        desc: "For a single-location business that needs to start showing up locally.",
        bullets: ["Technical + on-page audit", "Google Business Profile optimization", "5 priority pages optimized", "Monthly ranking report"],
      },
      {
        name: "Growth SEO",
        price: "$1,900",
        desc: "For businesses ready to compound rankings and leads month over month.",
        bullets: ["Everything in Local Launch", "Full keyword + intent map", "2 content pieces / month", "Backlink building", "Lead attribution dashboard"],
        featured: true,
      },
      {
        name: "Market Domination",
        price: "$3,500",
        desc: "For competitive markets that demand aggressive, sustained growth.",
        bullets: ["Everything in Growth SEO", "Bilingual (EN/FR) optimization", "4 content pieces / month", "Digital PR + authority links", "Weekly strategy sync"],
      },
    ],
  },
  pr: {
    title: "Digital PR & Social",
    tagline: "Move the Culture, Control the Revenue.",
    heroDesc: "Standard social media is noise. We solve digital invisibility by engineering content that forces conversation and earns high-authority mentions from the city's top tastemakers.",
    auditTitle: "The Authority Engine",
    auditDesc: "We don't post for likes; we post for authority. We bridge the gap between a viral moment and a long-term ranking boost.",
    steps: [
      { label: "Viral Mystery Hooks", desc: "We create 'The Hunt'—content that triggers the Instagram algorithm and puts you on the Montreal bucket list." },
      { label: "High-Tier Backlinking", desc: "Earning mentions from major local and national publications to skyrocket your domain's trust score." },
      { label: "Bilingual Social SEO", desc: "Optimizing your social presence in both French and English to dominate localized search intent." }
    ],
    sectors: ["Fine Dining", "Nightlife & Bars", "Boutique Retail", "Lifestyle Brands"],
    stats: [{ val: "4.8M", label: "Monthly Reach" }, { val: "70+", label: "Avg. Domain Authority" }],
    faqs: [
      { question: "What does digital PR actually do for my rankings?", answer: "High-authority mentions and backlinks from trusted publications raise your domain trust, which directly improves how well your whole site ranks on Google." },
      { question: "Do you manage our social media too?", answer: "Yes. We create content designed to trigger the algorithm and earn attention, then convert that reach into search visibility and bookings." },
      { question: "Do you work in both French and English?", answer: "Yes. We optimize social and PR in both languages to dominate localized search intent, especially in the Montreal market." },
      { question: "How do you measure PR results?", answer: "We track reach, earned mentions, referral traffic, and the domain authority lift — tied back to real business outcomes, not vanity likes." }
    ],
    overview: "Digital PR & Social is our authority-building engine. We create content designed to earn attention and high-trust mentions, then convert that reach into domain authority, search rankings, and real bookings — in both French and English.",
    deliverables: [
      "Content strategy built around hooks that trigger the algorithm",
      "Monthly social content production and publishing",
      "Digital PR outreach to earn mentions and backlinks from trusted publications",
      "Bilingual (EN/FR) social and search optimization",
      "Community and comment engagement to build momentum",
      "Reach, referral traffic, and domain-authority reporting",
    ],
    idealFor: [
      "Restaurants, bars, and lifestyle brands that live on attention",
      "Businesses that are invisible on social despite great offerings",
      "Brands wanting national press and authority links",
      "Montreal businesses needing true bilingual reach",
    ],
    timeline: "Ramp-up in weeks 1–2 · earned mentions and momentum building from month 2+",
    outcome: "A recognizable brand presence, high-authority backlinks that lift your whole site, and social reach that turns into bookings.",
    pricingNote: "Starting prices — final scope depends on content volume and PR targets.",
    packages: [
      {
        name: "Social Starter",
        price: "$1,200",
        desc: "Consistent, on-brand social presence for a growing business.",
        bullets: ["Content strategy", "8 posts / month", "Bilingual captions", "Monthly reach report"],
      },
      {
        name: "Authority Engine",
        price: "$2,800",
        desc: "Social plus digital PR to build reach and domain authority.",
        bullets: ["Everything in Social Starter", "Digital PR outreach", "2 earned-placement targets / month", "Backlink acquisition", "Community engagement"],
        featured: true,
      },
      {
        name: "Culture Maker",
        price: "$5,000",
        desc: "Full-scale brand momentum for markets you want to own.",
        bullets: ["Everything in Authority Engine", "16+ posts / month", "National PR campaigns", "Influencer partnerships", "Weekly reporting"],
      },
    ],
  },

  data: {
    title: "Data & Insights",
    tagline: "Zero Speculation. Total Attribution.",
    heroDesc: "Most agencies guess. We bridge the data gap by connecting your website's technical logs directly to your real-world revenue. If a pixel doesn't perform, it's removed.",
    auditTitle: "Revenue Intelligence",
    auditDesc: "Our reporting doesn't show 'clicks.' It shows customers. We track the entire journey from the first impression to the final transaction.",
    steps: [
      { label: "Custom ROI Dashboards", desc: "Live, 24/7 access to your revenue metrics. No more waiting for end-of-month PDF reports." },
      { label: "Predictive Modeling", desc: "Using historical data to forecast your busiest nights and optimizing your ad spend to fill the quiet ones." },
      { label: "Multi-Channel Attribution", desc: "Knowing exactly which TikTok, Search, or PR mention resulted in that $400 table booking." }
    ],
    sectors: ["SaaS Founders", "Multi-Unit Restaurants", "Medical Networks", "E-commerce Giants"],
    stats: [{ val: "100%", label: "Exact Attribution" }, { val: "-40%", label: "Wasted Ad Spend" }],
    faqs: [
      { question: "What kind of reporting do I get?", answer: "Live, 24/7 ROI dashboards that show real revenue and customer journeys — not just clicks or end-of-month PDFs." },
      { question: "Can you connect marketing spend to actual revenue?", answer: "Yes. We set up multi-channel attribution so you know exactly which search, social, or PR touchpoint drove each booking or sale." },
      { question: "Do I need to switch tools or platforms?", answer: "Usually not. We work with your existing stack and add the tracking and dashboards on top of it." },
      { question: "How does this reduce ad spend?", answer: "By identifying which channels and campaigns actually convert, we cut the budget going to underperforming pixels and reinvest it where it works." }
    ],
    overview: "Data & Insights connects your marketing directly to real revenue. We set up clean tracking, multi-channel attribution, and live dashboards so you know exactly which channels produce customers — and stop paying for the ones that don't.",
    deliverables: [
      "Analytics and conversion tracking audit and setup",
      "Multi-channel attribution across search, social, PR, and paid",
      "Custom live ROI dashboard tailored to your KPIs",
      "Event and goal tracking tied to real business outcomes",
      "Ad-spend efficiency analysis and reallocation plan",
      "Monthly insight reviews with clear recommendations",
    ],
    idealFor: [
      "Businesses spending on ads without clear ROI",
      "Multi-location brands needing unified reporting",
      "Founders tired of vanity metrics and PDF reports",
      "Teams making decisions on guesswork instead of data",
    ],
    timeline: "Tracking and dashboards live in 1–2 weeks · attribution insights from week 3+",
    outcome: "Total clarity on what drives revenue, less wasted ad spend, and confident, data-backed decisions.",
    pricingNote: "Starting prices — final scope depends on your stack and channel count.",
    packages: [
      {
        name: "Tracking Foundation",
        price: "$1,200",
        desc: "Clean, trustworthy tracking for a business flying blind.",
        bullets: ["Analytics + conversion audit", "Event & goal setup", "Single-source dashboard", "Setup documentation"],
      },
      {
        name: "Attribution Engine",
        price: "$2,400",
        desc: "Know exactly which channel earns every customer.",
        bullets: ["Everything in Tracking Foundation", "Multi-channel attribution", "Custom ROI dashboard", "Monthly insight review"],
        featured: true,
      },
      {
        name: "Revenue Intelligence",
        price: "$4,000",
        desc: "Full revenue visibility and forecasting for scaling brands.",
        bullets: ["Everything in Attribution Engine", "Predictive modeling", "Ad-spend reallocation plan", "Bi-weekly strategy syncs"],
      },
    ],
  },
  design: {
    title: "Premium Experience",
    tagline: "Design That Converts, Not Just Decorates.",
    heroDesc: "Your brand should feel premium before a customer reads a single word. We design high-trust experiences that reduce friction, improve clarity, and increase bookings.",
    auditTitle: "Conversion Experience Audit",
    auditDesc: "We evaluate your full customer journey from first click to final action, then redesign weak moments that cause drop-offs and low intent conversions.",
    steps: [
      { label: "Journey Mapping", desc: "We map every click path and identify where users hesitate, abandon, or lose trust." },
      { label: "Trust-Layer Design", desc: "We implement visual hierarchy, social proof, and UX patterns that increase confidence instantly." },
      { label: "Mobile Conversion UX", desc: "We optimize for thumb-first interactions so key actions stay effortless on mobile devices." }
    ],
    sectors: ["Luxury Hospitality", "Healthcare Clinics", "Local Services", "High-Ticket Brands"],
    stats: [{ val: "+38%", label: "Avg. CVR Lift" }, { val: "<2s", label: "UX Response Time" }],
    faqs: [
      { question: "Will a redesign hurt my current rankings?", answer: "No — we redesign with SEO in mind, preserving your URLs, content, and technical signals so rankings stay safe and often improve." },
      { question: "How do you know the new design will convert better?", answer: "We map your customer journey, find where users hesitate or drop off, and redesign those specific moments with proven trust and UX patterns." },
      { question: "Do you design for mobile first?", answer: "Yes. We optimize for thumb-first mobile interactions since that's where most local customers browse and book." },
      { question: "How long does a redesign take?", answer: "It varies by scope, but most focused conversion redesigns ship in a few weeks. We'll give you a clear timeline after a quick audit." }
    ],
    overview: "Premium Experience is our conversion-focused design service. We redesign the moments in your customer journey where people hesitate or drop off — turning a good-looking site into one that builds trust instantly and books more customers, without risking your rankings.",
    deliverables: [
      "Full conversion experience audit of your customer journey",
      "Journey mapping to pinpoint hesitation and drop-off points",
      "High-trust visual design with clear hierarchy and social proof",
      "Mobile-first, thumb-friendly conversion UX",
      "SEO-safe implementation that preserves URLs and rankings",
      "A/B test recommendations for ongoing lift",
    ],
    idealFor: [
      "Brands whose site looks fine but doesn't convert",
      "High-ticket and luxury businesses that must feel premium",
      "Clinics and services losing bookings to friction",
      "Companies planning a redesign without losing SEO",
    ],
    timeline: "Audit in week 1 · focused redesigns ship in a few weeks",
    outcome: "A premium, high-trust experience that reduces friction and lifts conversion — measured, not guessed.",
    pricingNote: "Starting prices — final scope depends on page count and complexity.",
    packages: [
      {
        name: "Landing Page",
        price: "$1,500",
        desc: "One high-converting page engineered to turn visitors into leads.",
        bullets: ["Conversion-focused design", "Mobile-first UX", "Copy guidance", "SEO-safe build"],
      },
      {
        name: "Conversion Redesign",
        price: "$4,500",
        desc: "A full redesign of your key journey to lift bookings and sales.",
        bullets: ["Everything in Landing Page", "Journey mapping audit", "Up to 8 core pages", "Trust-layer design system", "A/B test plan"],
        featured: true,
      },
      {
        name: "Full Brand Experience",
        price: "$9,000",
        desc: "End-to-end brand and site experience for high-ticket brands.",
        bullets: ["Everything in Conversion Redesign", "Full brand & visual identity", "Complete site design", "Motion & interaction design", "Ongoing optimization"],
      },
    ],
  },
  engineering: {
    title: "Reliable Systems",
    tagline: "Build Once. Scale Forever.",
    heroDesc: "Performance and reliability are ranking factors and revenue drivers. We engineer resilient systems that load fast, stay stable, and support long-term growth.",
    auditTitle: "Technical Architecture Review",
    auditDesc: "From rendering strategy to infrastructure bottlenecks, we harden your stack for speed, uptime, and predictable scale.",
    steps: [
      { label: "Core Web Vitals Hardening", desc: "We reduce LCP, INP, and CLS regressions with a code-level performance plan." },
      { label: "Rendering Strategy", desc: "We choose and tune SSR, SSG, ISR, and caching to match your business and content velocity." },
      { label: "Reliability Guardrails", desc: "We add monitoring, fail-safes, and release controls to prevent costly outages and SEO drops." }
    ],
    sectors: ["SaaS", "eCommerce", "Publishing", "Enterprise Web Apps"],
    stats: [{ val: "99.9%", label: "Uptime Target" }, { val: "-55%", label: "Perf Bottlenecks" }],
    faqs: [
      { question: "What technology do you build with?", answer: "We specialize in modern Next.js and React with clean, fast, SEO-friendly architecture, plus API integrations tailored to your business." },
      { question: "Why does site speed matter for SEO?", answer: "Core Web Vitals like LCP and INP are Google ranking signals. A fast, stable site ranks better and converts more visitors into customers." },
      { question: "Can you fix an existing site instead of rebuilding?", answer: "Often yes. We start with a technical audit and recommend either targeted hardening or a rebuild, based on what delivers the best ROI." },
      { question: "Do you handle hosting and reliability?", answer: "Yes. We add monitoring, fail-safes, and release controls so your site stays fast, online, and protected from costly SEO-damaging outages." }
    ],
    overview: "Reliable Systems is our engineering service for sites that must be fast, stable, and built to scale. We harden performance, choose the right rendering strategy, and add reliability guardrails so your site loads quickly, stays online, and protects your rankings and revenue.",
    deliverables: [
      "Technical architecture and performance audit",
      "Core Web Vitals hardening (LCP, INP, CLS) with a code-level plan",
      "Rendering strategy tuning — SSR, SSG, ISR, and caching",
      "Modern Next.js / React build or rebuild as needed",
      "API and third-party integrations",
      "Monitoring, fail-safes, and release controls for uptime",
    ],
    idealFor: [
      "Sites slowed down by poor Core Web Vitals",
      "Businesses that lost rankings after a slow or unstable build",
      "SaaS and eCommerce teams needing to scale reliably",
      "Brands on outdated stacks holding back growth",
    ],
    timeline: "Audit in week 1 · tune-ups in a couple of weeks · custom builds scoped after review",
    outcome: "A fast, resilient site that ranks better, converts more, and won't buckle as you grow.",
    pricingNote: "Starting prices — final scope depends on your stack and goals.",
    packages: [
      {
        name: "Performance Tune-Up",
        price: "$1,800",
        desc: "Fix speed and Core Web Vitals on your existing site.",
        bullets: ["Performance audit", "Core Web Vitals fixes", "Caching & image optimization", "Before/after report"],
      },
      {
        name: "Custom Build",
        price: "$6,000",
        desc: "A fast, SEO-ready site engineered on a modern stack.",
        bullets: ["Everything in Performance Tune-Up", "Modern Next.js / React build", "Rendering strategy tuning", "API integrations", "Monitoring & guardrails"],
        featured: true,
      },
      {
        name: "Enterprise Platform",
        price: "$12,000",
        desc: "Resilient, scalable architecture for high-traffic businesses.",
        bullets: ["Everything in Custom Build", "Scalable infrastructure design", "Advanced reliability guardrails", "Load & stress testing", "Ongoing SLA support"],
      },
    ],
  }
};

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug as keyof typeof serviceData];

  if (!service) {
    return buildPageMetadata({
      title: "Service Not Found",
      description: "The requested service page was not found.",
      pathname: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${service.title} Services`,
    description: service.overview ?? service.heroDesc,
    pathname: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug as keyof typeof serviceData];

  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${slug}/#service`,
    name: `${service.title} — Launch at Dawn`,
    serviceType: service.title,
    description: service.heroDesc,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Launch at Dawn",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "City", name: "Montreal" },
      { "@type": "City", name: "Vancouver" },
      { "@type": "Country", name: "Canada" },
    ],
    ...(service.packages
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} Packages`,
            itemListElement: service.packages.map((pkg) => ({
              "@type": "Offer",
              name: pkg.name,
              price: pkg.price.replace(/[^0-9.]/g, ""),
              priceCurrency: "CAD",
              description: pkg.desc,
            })),
          },
        }
      : {}),
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${slug}` },
        ]}
      />
      
      {/* 1. HERO SECTION (BIG HOOK) */}
      <section className="pt-16 md:pt-20 pb-32 px-6 md:px-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F95D0A]/5 blur-[120px] -z-10" />
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">Division // {service.title}</span>
          </div>
          <h1 className="text-[10vw] lg:text-[8.5vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 italic">
            {service.tagline}
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-400 max-w-4xl leading-tight font-medium mb-16">
            {service.heroDesc}
          </p>
          <div className="flex gap-12 border-t border-white/10 pt-12">
            {service.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-6xl font-black text-[#F95D0A] leading-none mb-2">{stat.val}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE "WHY IT MATTERS" (EDUCATION BLOCK) */}
      <section className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">{service.auditTitle}</h2>
            <p className="text-zinc-400 text-xl leading-relaxed mb-10">{service.auditDesc}</p>
            <Link href="/restaurant-growth#get-started" className="inline-block border-b-2 border-[#F95D0A] pb-2 font-black uppercase tracking-widest hover:text-[#F95D0A] transition-colors">
              Request a Sector Audit
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {service.steps.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-[#F95D0A] transition-all group">
                <span className="text-[#F95D0A] font-mono text-xs block mb-4 italic">PHASE_0{i+1}</span>
                <h4 className="text-xl font-bold uppercase mb-2">{step.label}</h4>
                <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT: WHAT'S INCLUDED + WHO IT'S FOR */}
      {service.deliverables ? (
        <section className="py-32 px-6 md:px-12 border-b border-white/5">
          <div className="max-w-[1400px] mx-auto">
            {service.overview ? (
              <div className="max-w-3xl mb-20">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A] block mb-6">The Offer</span>
                <p className="text-2xl md:text-3xl text-zinc-300 leading-snug font-medium">{service.overview}</p>
              </div>
            ) : null}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-10 leading-tight">What&apos;s included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <svg className="w-6 h-6 text-[#F95D0A] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="text-zinc-300 text-lg leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-8">
                {service.idealFor ? (
                  <>
                    <h3 className="text-xl font-black uppercase mb-6">Who it&apos;s for</h3>
                    <ul className="space-y-4 mb-8">
                      {service.idealFor.map((f, i) => (
                        <li key={i} className="text-zinc-400 border-l-2 border-[#F95D0A]/50 pl-4 leading-snug">{f}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {service.timeline ? (
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">Timeline</p>
                    <p className="text-zinc-300 text-sm leading-snug">{service.timeline}</p>
                  </div>
                ) : null}
                {service.outcome ? (
                  <div className="border-t border-white/10 pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">The Outcome</p>
                    <p className="text-zinc-300 text-sm leading-snug">{service.outcome}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* PRODUCT: PACKAGES / PRICING */}
      {service.packages ? (
        <section className="py-32 px-6 md:px-12 bg-[#070707] border-b border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#F95D0A]">{service.title} Packages</p>
                <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tighter">Pick your starting point</h2>
              </div>
              {service.pricingNote ? <p className="max-w-md text-sm md:text-base text-zinc-400">{service.pricingNote}</p> : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((plan) => (
                <div key={plan.name} className={`rounded-3xl border p-8 md:p-10 flex flex-col ${plan.featured ? "border-[#F95D0A] bg-[#120d0a]" : "border-white/10 bg-black/50"}`}>
                  {plan.featured ? <span className="self-start mb-4 rounded-full bg-[#F95D0A] px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-black">Most Popular</span> : null}
                  <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-zinc-400">{plan.name}</p>
                  <p className="mt-4 text-5xl font-black tracking-tighter text-[#F95D0A]">{plan.price}<span className="ml-1 text-sm text-zinc-400">/ start</span></p>
                  <p className="mt-4 text-zinc-400 text-sm leading-relaxed">{plan.desc}</p>
                  <ul className="mt-6 space-y-3 flex-grow">
                    {plan.bullets.map((item) => (
                      <li key={item} className="text-sm text-white/90 border-l border-[#F95D0A]/50 pl-3">{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact/hello" className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${plan.featured ? "bg-[#F95D0A] text-black hover:bg-white" : "border border-white/20 text-white hover:border-white"}`}>
                    Book a Call
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. SECTOR SPECIALISMS (PROVING RELEVANCE) */}
      <section className="py-32 px-6 md:px-12 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <h3 className="text-2xl font-black uppercase text-[#F95D0A] mb-4 italic">Sector Focus</h3>
            <p className="text-zinc-500 font-medium">We only work with brands where we can guarantee category dominance. Our expertise is focused on high-transaction local markets.</p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end max-w-2xl">
            {service.sectors.map((sector, i) => (
              <span key={i} className="px-8 py-4 border border-white/10 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all cursor-default">
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE ULTIMATE CTA */}
      <section className="py-40 px-6 bg-[#F95D0A] text-black text-center relative overflow-hidden">
  {/* Background Layer */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
    <p className="text-[20vw] font-black uppercase leading-none whitespace-nowrap">
      GROWTH GROWTH GROWTH GROWTH
    </p>
  </div>

  {/* Content Layer */}
  <div className="relative z-10 max-w-4xl mx-auto">
    <h2 className="text-6xl md:text-[10vw] font-black uppercase leading-[0.8] mb-12 italic">
      STOP GUESSING. <br /> START WINNING.
    </h2>
    
    <Link 
      href="/contact/hello" 
      className="relative z-20 inline-block bg-black text-white px-16 py-8 font-black uppercase tracking-widest text-xl hover:scale-105 transition-transform shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
    >
      Analyze My Revenue Now
    </Link>
  </div>
</section>

      <Testimonials heading="Proof from our clients" />

      <RelatedServices currentSlug={slug} />

      <FaqSection faqs={service.faqs} eyebrow={`${service.title} FAQ`} />

    </main>
  );
}