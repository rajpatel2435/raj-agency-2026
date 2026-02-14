"use client";

import { motion } from "framer-motion";

// Our placeholder data
const servicesData = [
  { id: 1, title: "Search & SEO", description: "Dominating the algorithms to put your brand at the top." },
  { id: 2, title: "Creative Campaigns", description: "Bold, disruptive ideas that break the internet." },
  { id: 3, title: "Web Development", description: "Lightning-fast, high-performance digital experiences." },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-32 px-6 md:px-12 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16"
        >
          What We Do.
        </motion.h2>

        {/* The Services Loop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 border border-gray-800 hover:border-cyan-400 transition-colors group cursor-none"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}