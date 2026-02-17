import Link from "next/link";

export default function Footer() {
  return (
    // The footer sits on a pitch-black background with a subtle top border
    <footer className="bg-[#050505] text-white pt-24 pb-8 px-6 md:px-12 border-t border-gray-800 overflow-hidden">
      
      {/* Top Half: Newsletter & Navigation Links */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-16 mb-24">
        
        {/* Left Side: Newsletter Signup */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-2xl font-medium tracking-tight mb-6">
            Stay updated with AGENCY. news
          </h3>
          
          <form className="flex items-center bg-[#111] rounded-full p-1 border border-gray-800 focus-within:border-[#A855F7] transition-colors mb-8">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="bg-transparent w-full px-6 py-3 outline-none text-sm font-light text-white placeholder:text-gray-500"
            />
            <button 
              type="button" 
              className="bg-[#A855F7] text-black w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:bg-white transition-colors"
            >
              ↗
            </button>
          </form>
          
          {/* Social Media Pill Links */}
          <div className="flex flex-wrap gap-3">
            {['Twitter / X', 'LinkedIn', 'Instagram', 'TikTok'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="border border-gray-800 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#A855F7] hover:text-black hover:border-[#A855F7] transition-all"
              >
                {social} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Multi-Column Navigation */}
        <div className="w-full lg:w-2/3 flex flex-wrap justify-between lg:justify-end lg:gap-32 gap-12">
          
          {/* Column 1: Main Pages */}
          <div className="flex flex-col gap-4">
            <Link href="/services" className="hover:text-[#A855F7] transition-colors font-light">Services</Link>
            <Link href="/work" className="hover:text-[#A855F7] transition-colors font-light">Work</Link>
            <Link href="/about" className="hover:text-[#A855F7] transition-colors font-light">About</Link>
            <Link href="/contact" className="hover:text-[#A855F7] transition-colors font-light">Contact</Link>
          </div>
          
          {/* Column 2: Resources */}
          <div className="flex flex-col gap-4">
            <Link href="/blog" className="hover:text-[#A855F7] transition-colors font-light">Blog / Insights</Link>
            <Link href="/careers" className="hover:text-[#A855F7] transition-colors font-light">Careers</Link>
            <Link href="#" className="hover:text-[#A855F7] transition-colors font-light">Testimonials</Link>
            <Link href="#" className="hover:text-[#A855F7] transition-colors font-light">Webinars</Link>
          </div>
          
          {/* Column 3: Locations */}
          <div className="flex flex-col gap-4 text-gray-500">
            <span className="font-light text-white">Montreal</span>
            <span className="font-light hover:text-white transition-colors cursor-pointer">New York</span>
            <span className="font-light hover:text-white transition-colors cursor-pointer">London</span>
            <span className="font-light hover:text-white transition-colors cursor-pointer">Toronto</span>
          </div>
          
        </div>
      </div>

      {/* Middle: MASSIVE Agency Typography */}
      {/* We use 'text-[15vw]' so the text scales perfectly with the width of the browser */}
      <div className="w-full flex justify-center items-center mb-8 border-b border-gray-900 pb-8">
        <h1 className="text-[18vw] leading-none font-medium tracking-tighter text-white whitespace-nowrap select-none">
          AGENCY.
        </h1>
      </div>

      {/* Bottom: Legal & Copyright */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-bold tracking-widest uppercase gap-4">
        <p>© {new Date().getFullYear()} AGENCY LTD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
      
    </footer>
  );
}