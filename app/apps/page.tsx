export default function AppsHub() {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-20 md:px-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Launch at Dawn <span className="text-orange-500">Tools</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            High-performance analytics and automation engines built for the modern market.
          </p>
        </div>
  
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Crypto Pulse", desc: "Live market analytics and monitoring.", link: "/apps/crypto-pulse" },
            { title: "Trading Engine", desc: "Algorithmic execution environment.", link: "/apps/trading" }
          ].map((app) => (
            <a 
              key={app.title}
              href={app.link}
              className="group block p-8 border border-gray-800 bg-gray-950/50 hover:border-orange-500/50 transition-all duration-300 rounded-xl"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                {app.title} →
              </h2>
              <p className="text-gray-400">{app.desc}</p>
            </a>
          ))}
        </div>
      </div>
    );
  }