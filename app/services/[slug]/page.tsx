import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/app/seo";
import FaqSection from "@/components/FaqSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedServices from "@/components/RelatedServices";

// --- FULL DEPTH CONTENT DATA ---
const serviceData = {
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
  // Add design and engineering here following the same pattern...
};

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
    description: service.heroDesc,
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
      telephone: "+1-514-699-2435",
    },
    areaServed: [
      { "@type": "City", name: "Montreal" },
      { "@type": "City", name: "Vancouver" },
      { "@type": "Country", name: "Canada" },
    ],
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

      <RelatedServices currentSlug={slug} />

      <FaqSection faqs={service.faqs} eyebrow={`${service.title} FAQ`} />

    </main>
  );
}