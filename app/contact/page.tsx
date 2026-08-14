'use client';

import { useState } from 'react';
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Contact & Feedback
        </h1>

        <div className="bg-[#ffdad6]/60 border border-[#ffdad6] p-3.5 rounded-xl text-xs text-[#93000a] font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype draft — review with a qualified lawyer before public launch.</span>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-6 text-xs md:text-sm text-[#191c1b]">
          <p className="text-[#56615c] leading-relaxed">
            We welcome feedback from civic technologists, municipal stakeholders, and Pakistani citizens testing the SheharSuno prototype.
          </p>

          <div className="bg-[#f9faf7] p-4 rounded-xl border border-[#e2e3e0] flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#00513a] shrink-0" />
            <div>
              <p className="font-bold text-xs text-[#00513a]">Direct Email:</p>
              <p className="font-mono text-xs text-[#191c1b]">contact@sheharsuno.demo</p>
              <p className="text-[10px] text-[#56615c]/80 italic mt-0.5">Replace this demo contact address before public launch.</p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-[#e8f5e9] border border-[#c8e6c9] p-5 rounded-xl text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-[#00513a]" />
              <h3 className="font-bold text-sm text-[#00513a]">Thank You for Your Feedback!</h3>
              <p className="text-xs text-[#56615c]">Your message has been received by the SheharSuno prototype development team.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-xs text-[#00513a]">Your Name (Optional)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ali Ahmed"
                  className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-xs text-[#00513a]">Your Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ali@example.com"
                  className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-xs text-[#00513a]">Feedback or Questions *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we improve SheharSuno for your city or district?"
                  className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#00513a] hover:bg-[#0d6b4f] text-white font-bold text-xs md:text-sm py-3 px-6 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <AppFooter />
      <BottomNavigation activePage="report" />
    </>
  );
}
