"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function money(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(
    isFinite(n) ? n : 0
  );
}

function num(v: string) {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function field(label: string, value: string, setter: (v: string) => void, prefix?: string) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">{label}</span>
      <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-xl px-4 focus-within:border-[#F95D0A] transition-colors">
        {prefix && <span className="text-white/30 mr-1">{prefix}</span>}
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="bg-transparent py-3 outline-none w-full placeholder:text-white/25"
          placeholder="0"
        />
      </div>
    </label>
  );
}

function stat(label: string, value: string, highlight = false) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-center">
      <div className={`text-3xl md:text-4xl font-black tracking-tighter ${highlight ? "text-[#F95D0A]" : "text-white"}`}>
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mt-2">{label}</div>
    </div>
  );
}

export default function RoiCalculatorPage() {
  const [spend, setSpend] = useState("");
  const [leads, setLeads] = useState("");
  const [closeRate, setCloseRate] = useState("");
  const [dealValue, setDealValue] = useState("");

  const r = useMemo(() => {
    const s = num(spend);
    const l = num(leads);
    const cr = num(closeRate) / 100;
    const dv = num(dealValue);
    const customers = l * cr;
    const revenue = customers * dv;
    const profit = revenue - s;
    const roi = s > 0 ? (profit / s) * 100 : 0;
    const roas = s > 0 ? revenue / s : 0;
    const cpl = l > 0 ? s / l : 0;
    const cac = customers > 0 ? s / customers : 0;
    return { customers, revenue, profit, roi, roas, cpl, cac };
  }, [spend, leads, closeRate, dealValue]);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">Free Tool</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">Marketing ROI Calculator</h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            See the real return on your marketing spend — ROI, ROAS, cost per lead and profit, instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 h-fit">
            {field("Monthly Marketing Spend", spend, setSpend, "$")}
            {field("Leads Generated", leads, setLeads)}
            {field("Close Rate (%)", closeRate, setCloseRate)}
            {field("Avg. Deal Value", dealValue, setDealValue, "$")}
          </div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {stat("ROI", `${Math.round(r.roi)}%`, true)}
            {stat("Return on Ad Spend", `${r.roas.toFixed(1)}x`, true)}
            {stat("New Customers", Math.round(r.customers).toString())}
            {stat("Revenue", money(r.revenue))}
            {stat("Net Profit", money(r.profit))}
            {stat("Cost / Lead", money(r.cpl))}
            <div className="col-span-2">{stat("Customer Acquisition Cost", money(r.cac))}</div>
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-br from-[#F95D0A] to-[#c74100] text-black rounded-[2rem] p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">Want to improve these numbers?</h2>
          <p className="text-black/70 font-medium max-w-xl mx-auto mb-6">
            We help businesses lower their cost per lead and multiply ROI with technical SEO and conversion engineering.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#050505] transition-colors"
          >
            Talk to Us
          </Link>
        </div>

        <p className="text-center mt-10">
          <Link href="/tools" className="text-white/40 hover:text-[#F95D0A] transition-colors text-sm font-mono">
            ← All free tools
          </Link>
        </p>
      </div>
    </main>
  );
}
