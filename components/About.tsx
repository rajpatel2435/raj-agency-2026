"use client";

import Image from "next/image";

export default function About() {
  // Here is our "Deck of Cards" data with the new 3D icons!
  const cards = [
    {
      id: 1,
      title: "The Anti-Agency",
      description: "We don't do fluff. We don't do vanity metrics. We build aggressive, disruptive digital campaigns designed to break your competitors and scale your revenue.",
      bgColor: "bg-white",
      textColor: "text-black",
      rotate: "-rotate-2",
      // Add the path to your saved image in the public folder
      iconUrl: "/icon-crown.png" 
    },
    {
      id: 2,
      title: "Data Obsessed",
      description: "Every decision we make is backed by hardcore data. We track everything, test constantly, and pivot faster than anyone else in the industry.",
      bgColor: "bg-[#A855F7]", // Our custom acid green!
      textColor: "text-black",
      rotate: "rotate-1",
      // Add the path to your saved image in the public folder
      iconUrl: "/icon-chip.png"
    },
    {
      id: 3,
      title: "Pioneers",
      description: "We pave the path for creative SEO, digital PR, and social search. We don't follow trends 3 years from now; we create the industry narrative today.",
      bgColor: "bg-[#050505]",
      textColor: "text-white",
      rotate: "-rotate-1",
      border: "border border-gray-800",
      // Add the path to your saved image in the public folder
      iconUrl: "/icon-compass.png"
    }
  ];

  return (
    <section id="about" className="relative w-full bg-[#050505] py-24 md:py-48 px-6 md:px-12 z-20">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center mb-24 md:mb-32">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
          Who We Are
        </h2>
        <h3 className="text-5xl md:text-7xl font-medium tracking-tighter text-white">
          We don't follow the rules. <br className="hidden md:block" />
          <span className="text-gray-600">We rewrite them.</span>
        </h3>
      </div>

      {/* The Sticky Stacking Container */}
      <div className="relative max-w-3xl mx-auto pb-[20vh]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`sticky flex flex-col justify-center p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl ${card.bgColor} ${card.textColor} ${card.rotate} ${card.border || ''} transition-transform duration-500`}
            style={{ 
              top: `calc(15vh + ${index * 30}px)`,
              marginBottom: "100px"
            }}
          >
            {/* 3D Icon Container */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
              <Image 
                src={card.iconUrl} 
                alt={card.title} 
                fill 
                className="object-contain" 
              />
            </div>

            <h4 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {card.title}
            </h4>
            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
              {card.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}