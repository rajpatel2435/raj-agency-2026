// app/services/review-dashboard/page.tsx
'use client';

import { useState } from 'react';

// Hardcoded clients config to bypass DB setup for immediate deployment
const CLIENT_PROFILES = [
  {
    id: "client-1",
    businessName: "Gourmet Bistro",
    branchName: "Downtown",
    city: "Vancouver",
    neighborhood: "Gastown",
    tone: "enthusiastic, culinary-focused, friendly",
    keywords: ["best fine dining Gastown", "romantic dinner Vancouver", "authentic Italian pasta"],
    extraContext: "We offer an open kitchen view. Head chef is Marco. Happy hour is from 4 PM to 6 PM daily."
  },
  {
    id: "client-2",
    businessName: "Elite Chiropractic",
    branchName: "Kitsilano",
    city: "Vancouver",
    neighborhood: "Kitsilano",
    tone: "clinical, reassuring, deeply professional",
    keywords: ["back pain relief Kitsilano", "best chiropractor Vancouver", "sports injury therapy"],
    extraContext: "Direct billing to insurance available. Dr. Alan Reed has 15 years experience. Open Saturdays."
  }
];

export default function ReviewDashboard() {
  const [selectedClientId, setSelectedClientId] = useState(CLIENT_PROFILES[0].id);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedReply('');
    const targetClient = CLIENT_PROFILES.find(c => c.id === selectedClientId);

    try {
      const res = await fetch('/api/reviews/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewerName,
          rating,
          reviewText,
          locationData: targetClient
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedReply(data.replyDraft);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to contact AI engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">LAUNCH AT DAWN</h1>
          <p className="text-sm text-neutral-400">Proprietary Review Optimization Engine</p>
        </header>

        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-6 space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Select Target Client Profile</label>
            <select 
              value={selectedClientId} 
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            >
              {CLIENT_PROFILES.map(client => (
                <option key={client.id} value={client.id}>{client.businessName} — {client.branchName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Reviewer Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Rating</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none"
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
          </div>

          {/* Review Input */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Raw Customer Review</label>
            <textarea 
              rows={4}
              placeholder="Paste the Google or Yelp review content directly here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 text-white focus:outline-none resize-none focus:border-neutral-600"
            />
          </div>

          {/* Trigger Button */}
          <button 
            onClick={handleGenerate}
            disabled={loading || !reviewText}
            className="w-full bg-white text-black hover:bg-neutral-200 font-medium py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing Context & Optimizing Response..." : "Generate Local SEO Response"}
          </button>

          {/* AI Output Result Section */}
          {generatedReply && (
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Optimized Output (Copy/Paste to Live Profile)</label>
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 text-neutral-200 text-sm leading-relaxed whitespace-pre-line relative">
                {generatedReply}
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                  className="absolute bottom-3 right-3 bg-neutral-800 hover:bg-neutral-700 text-xs px-2.5 py-1.5 rounded text-neutral-300"
                >
                  Copy Text
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}