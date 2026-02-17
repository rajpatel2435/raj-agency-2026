import Link from "next/link";

export default function ContactPage() {
  return (
    // Reverted the background to our signature pitch-black
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-4 md:px-8 w-full">
      
      {/* Container for the massive cards */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT CARD: Sales / General Enquiries (Charcoal) */}
        <Link 
          href="/contact/hello" 
          // Uses a slightly lighter #111111 background to lift it off the #050505 page
          className="bg-[#111111] border border-gray-800 text-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col justify-between min-h-[50vh] md:min-h-[75vh] group transition-all duration-500 hover:scale-[1.01] hover:border-[#A855F7] cursor-none relative overflow-hidden"
        >
          {/* Top Text */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
              General enquiries
            </h2>
            <p className="text-2xl md:text-4xl font-light text-gray-400 tracking-tight">
              Fancy a chat? Grab a coffee? Pint?
            </p>
          </div>

          {/* Bottom Massive Text */}
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-medium tracking-tighter leading-none mt-24 relative z-10 group-hover:text-[#A855F7] transition-colors duration-500">
            Say Hello
          </h1>

          {/* Subtle Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Link>

        {/* RIGHT CARD: Careers / Recruitment (Ghost Card) */}
        <Link 
          href="/careers" 
          // Uses a transparent black background so it blends slightly more into the page than the left card
          className="bg-[#050505] border border-gray-800 text-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col justify-between min-h-[50vh] md:min-h-[75vh] group transition-all duration-500 hover:scale-[1.01] hover:border-gray-500 cursor-none shadow-sm"
        >
          {/* Top Text */}
          <div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
              Want to join the team?
            </h2>
            <p className="text-2xl md:text-4xl font-light text-gray-600 tracking-tight group-hover:text-gray-400 transition-colors">
              Find your dream job
            </p>
          </div>

          {/* Bottom Massive Text */}
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-medium tracking-tighter leading-none mt-24 text-gray-500 group-hover:text-white transition-colors duration-500">
            Work for us
          </h1>
        </Link>

      </div>

    </main>
  );
}