// app/trading-dashboard/page.tsx
'use client';

import { useState } from 'react';

export default function TradingDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [ticker, setTicker] = useState('RELIANCE');
  const [amount, setAmount] = useState('1000');
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setLogs([`[SYSTEM] Session authorized securely at ${new Date().toLocaleTimeString()}`]);
    } else {
      alert('Invalid admin passphrase credentials.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
    setLogs([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-neutral-200 mb-4">🔐 Encrypted Algo System Access</h2>
          <input
            type="password"
            placeholder="Enter Server JWT Passphrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg px-4 py-2 mb-4 text-center text-white focus:border-emerald-500 focus:outline-none"
          />
          <button onClick={handleLogin} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors">
            Authorize Gateway Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto border border-[#1f1f1f] bg-[#111111] rounded-xl p-6 shadow-2xl relative">
        <button onClick={handleLogout} className="absolute top-6 right-6 px-3 py-1 bg-red-950 text-red-400 hover:bg-red-900 border border-red-900/40 rounded-md text-xs transition-colors">
          Revoke Session (Log Out)
        </button>
        
        <h2 className="text-xl font-bold tracking-tight mb-6 text-emerald-400">🇮🇳 Live Trading Desk (₹1,000 Sandbox)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-3 font-mono text-center" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-3 font-mono text-center" />
        </div>

        <button onClick={async () => {
          setLoading(true);
          const res = await fetch('/api/trading/india-execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticker, budgetINR: parseFloat(amount) })
          });
          const data = await res.json();
          setLogs(prev => [...prev, res.ok ? `[SUCCESS] Order tracking ID: ${data.orderId}` : `[ERROR] ${data.error}`]);
          setLoading(false);
        }} disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold tracking-wide shadow-lg mb-4">
          {loading ? 'Executing Target Order Logic...' : 'Deploy ₹1000 Live Allocation Loop'}
        </button>

        <div className="bg-[#070707] border border-[#1f1f1f] rounded-lg p-4 font-mono text-xs max-h-40 overflow-y-auto space-y-1">
          {logs.map((log, idx) => <div key={idx}>{log}</div>)}
        </div>
      </div>
    </div>
  );
}