import { notFound } from "next/navigation";
import Link from "next/link";

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
    stats: [{ val: "12X", label: "Avg. ROAS" }, { val: "24/7", label: "Market Pulse" }]
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
    stats: [{ val: "400%", label: "Organic Growth" }, { val: "Top 3", label: "Avg. Ranking" }]
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
    stats: [{ val: "4.8M", label: "Monthly Reach" }, { val: "70+", label: "Avg. Domain Authority" }]
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
    stats: [{ val: "100%", label: "Exact Attribution" }, { val: "-40%", label: "Wasted Ad Spend" }]
  }
  // Add design and engineering here following the same pattern...
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug as keyof typeof serviceData];

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black">
      
      {/* 1. HERO SECTION (BIG HOOK) */}
      <section className="pt-48 pb-32 px-6 md:px-12 border-b border-white/5 relative overflow-hidden">
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
            <Link href="/restaurant-engine#get-started" className="inline-block border-b-2 border-[#F95D0A] pb-2 font-black uppercase tracking-widest hover:text-[#F95D0A] transition-colors">
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

    </main>
  );
}