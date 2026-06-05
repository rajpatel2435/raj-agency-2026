// app/trading-dashboard/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/app/utils/supabase/client';

export default function SecureTradingDesk() {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Check initial authorization state from secure storage cookies
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, [supabase]);

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(`Login failed: ${error.message}`);
    else setUser(data.user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLogs([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-emerald-400">🛡️ Supabase Account Guard</h2>
          <input
            type="email"
            placeholder="Admin Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-2.5 mb-3 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Security Access Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-2.5 mb-4 focus:outline-none"
          />
          <button onClick={handleSignIn} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors">
            Authorize Desktop Environment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto border border-[#1f1f1f] bg-[#111111] rounded-xl p-6 relative">
        <button onClick={handleSignOut} className="absolute top-6 right-6 px-3 py-1 bg-red-950 text-red-400 hover:bg-red-900 border border-red-900/40 rounded-md text-xs transition-colors">
          Log Out ({user.email})
        </button>
        
        <h2 className="text-xl font-bold text-emerald-400 mb-6">🇮🇳 Live Terminal (Isolated User Session)</h2>
        
        <button onClick={async () => {
          const res = await fetch('/api/trading/india-execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker: 'RELIANCE', budgetINR: 1000 })
          });
          const data = await res.json();
          setLogs(prev => [...prev, res.ok ? `[SUCCESS] Placed order ID: ${data.orderId} costing ₹${data.actualCostINR}` : `[ERROR] ${data.error}`]);
        }} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold shadow-lg mb-4">
          Execute Protected ₹1,000 Strategy Check
        </button>

        <div className="bg-[#070707] border border-[#1f1f1f] rounded-lg p-4 font-mono text-xs max-h-40 overflow-y-auto space-y-1">
          {logs.map((log, idx) => <div key={idx}>{log}</div>)}
        </div>
      </div>
    </div>
  );
}