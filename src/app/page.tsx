"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReviewsSection from "./components/reviewsSection";
import { IoCallOutline, IoCloseOutline } from "react-icons/io5";

export default function Home() {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({ phone: "", description: "" });
  const [formStatus, setFormStatus] = useState<"IDLE" | "LOADING" | "SUCCESS" | "ERROR">("IDLE");

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("LOADING");

    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed");

      setFormStatus("SUCCESS");
      // Optional: Clear form
      setFormData({ phone: "", description: "" });
      
      // Optional: Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus("IDLE");
      }, 3000);

    } catch (error) {
      console.error(error);
      setFormStatus("ERROR");
    }
  };

  // Expanded list of services categorized for the grid
  const serviceModules = [
    // ... (Keep your serviceModules array exactly the same as before) ...
    {
      category: "COMMERCE_OPS",
      code: "[COM-01]",
      title: "E-commerce Automations",
      description: "Order routing, fulfillment tracking, and multi-platform inventory sync logic.",
      iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      category: "COMMERCE_OPS",
      code: "[COM-02]",
      title: "Inventory Management",
      description: "Real-time stock alert triggers, auto-reordering thresholds, and supplier API connections.",
      iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      category: "COMMERCE_OPS",
      code: "[COM-AI]",
      title: "E-commerce Chatbots",
      description: "Bots with read-access to your catalog to handle 'Where is my order?'' and product queries 24/7.",
      iconPath: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
      category: "INTERNAL_SYS",
      code: "[HR-FLOW]",
      title: "Employee Onboarding",
      description: "Automated contract generation, workspace provisioning (Slack/Email), and training sequences.",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      category: "INTERNAL_SYS",
      code: "[FIN-SYNC]",
      title: "Automated Invoicing",
      description: "Trigger invoice creation in Xero/Quickbooks based on CRM status changes or completed projects.",
      iconPath: "M9 14l6-6m-5.5.5H21m-5.5 5H21m-6 6v-5.586c0-.891.354-1.746.985-2.378l.03-.03a3.375 3.375 0 014.77 4.77a3.375 3.375 0 01-2.378.985H15.5zM3 21h6a2 2 0 002-2v-4a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2zM3 11h6a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2z",
    },
    {
      category: "CRM_DATA",
      code: "[CRM-BOT]",
      title: "Lead Qualification Chatbots",
      description: "Website bots that ask qualifying questions and pipe high-value leads directly into your CRM pipeline.",
      iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      category: "CRM_DATA",
      code: "[DATA-PIPE]",
      title: "Reporting Dashboards",
      description: "Consolidating data from multiple sources (Ads, Sales, Support) into a single automated Google Sheets/Looker report.",
      iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      category: "CRM_DATA",
      code: "[SUP-TIX]",
      title: "Support Ticket Routing",
      description: "Using AI to analyze incoming support emails/chats and automatically assigning them to the correct department.",
      iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ];

  return (
    <div className="min-h-screen bg-[#6E65C7] text-white font-sans selection:bg-black selection:text-[#6E65C7] overflow-x-hidden">
      {/* CSS for Custom Animations */}
      <style jsx global>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .grid-borders > div { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2); }
        .grid-borders:hover > div:not(:hover) { opacity: 0.5; filter: grayscale(50%); }
      `}</style>

      {/* Grid Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 w-full border-b border-white/20 px-6 py-6 flex justify-between items-center bg-[#6E65C7]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white animate-pulse" />
          <span className="font-lobster text-xl tracking-widest uppercase font-bold">
            WeBuild.lk
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:block font-mono text-sm hover:bg-white hover:text-[#6E65C7] px-4 py-2 transition-colors uppercase"
        >
          [BOOK_A_CALL]
        </button>
      </nav>

      {/* MAIN CONTENT REMOVED FOR BREVITY - (Keep your original Hero, Modules, and Reviews code here) */}
      <main className="relative z-10">
        <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-[11vw] leading-[0.85] font-bold tracking-tighter">AUTOMATION</h1>
            <h1 className="text-[11vw] leading-[0.85] font-bold tracking-tighter text-transparent stroke-white" style={{ WebkitTextStroke: "2px white" }}>EXPERTS</h1>
            <div className="max-w-lg mt-8">
              <p className="font-mono text-base leading-relaxed opacity-90 border-l-4 border-white pl-6 py-2">
                We are an automation agency. We connect your disparate business apps into a single, breathing ecosystem.
              </p>
            </div>
          </div>
        </section>

         {/* Infinite Marquee Strip */}
         <div className="w-full border-y border-white/20 bg-black/10 backdrop-blur-sm overflow-hidden py-3 font-mono text-sm uppercase tracking-widest">
          <div className="flex whitespace-nowrap animate-scroll w-max gap-25">
            {["aws", "zapier", "make", "n8n", "python", "monday", "aws", "zapier", "make", "n8n", "python", "monday", "aws", "zapier", "make", "n8n", "python", "monday"].map((tech, i) => (
              <Image key={i} src={`/assets/images/${tech}.svg`} alt={tech} width={100} height={40} className="mx-6 opacity-80 h-[2rem] w-auto" />
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          {/* ... Your Grid Header ... */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 bg-white/20 gap-px border border-white/20 grid-borders transition-all duration-300">
            {serviceModules.map((mod, index) => (
              <div
                key={mod.code}
                onMouseEnter={() => setHoveredModule(index)}
                onMouseLeave={() => setHoveredModule(null)}
                className="group relative bg-[#6E65C7] p-6 h-64 flex flex-col justify-between transition-all duration-200 hover:bg-white hover:text-[#6E65C7] overflow-hidden cursor-crosshair"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs opacity-60 group-hover:opacity-100 transition-opacity">{mod.code}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      <path strokeLinecap="round" strokeLinejoin="round" d={mod.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight w-full">{mod.title}</h3>
                </div>
                <div className="relative h-full">
                  <p className="absolute bottom-0 left-0 font-mono text-sm leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">{mod.description}</p>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white opacity-0 group-hover:opacity-100 group-hover:border-[#6E65C7] transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Clients and Reviews */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
             <div className="w-full flex justify-center mt-6">
                <Image className="w-full" src="/assets/images/test-2.svg" alt="Clients Logos" width={600} height={100} />
            </div>
        </section>
        <ReviewsSection />

        {/* Footer */}
        <footer className="border-t border-white/20 bg-black/10">
          <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">AUTOMATE OR <br /> STAGNATE.</h2>
              <p className="font-mono text-sm opacity-80 max-w-md">Manual processes are costing you growth. Let's architect your efficiency engine.</p>
            </div>
            <div className="flex flex-col items-start gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden bg-white text-[#6E65C7] px-12 py-8 text-xl font-bold tracking-tight transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 group-hover:hidden">CONTACT US</span>
                <span className="hidden group-hover:flex items-center gap-2 z-10">BOOK CALL <IoCallOutline /></span>
              </button>
              <a href="tel:+94728103079" className="flex items-center gap-4 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                <IoCallOutline className="text-2xl"/>
                <span className="font-mono text-2xl font-bold">0728103079</span>
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* --- CONNECTED MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#6E65C7] border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] p-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8 border-b border-white/20 pb-4">
                <div>
                    <span className="font-mono text-xs border border-white px-2 py-1 bg-[#6E65C7] text-white">
                        {formStatus === 'IDLE' ? 'INITIATE.SEQ' : formStatus === 'LOADING' ? 'CONNECTING...' : 'STATUS.REPORT'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mt-4">Book a Call</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform p-1 hover:bg-white hover:text-[#6E65C7]">
                    <IoCloseOutline className="text-3xl" />
                </button>
            </div>

            {/* Success State */}
            {formStatus === 'SUCCESS' ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold uppercase">Request Queued</h3>
                    <p className="font-mono text-sm opacity-80 mt-2">Our team has received your signal. We will deploy a response shortly.</p>
                </div>
            ) : (
                /* Form State */
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs uppercase opacity-80 tracking-widest">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-transparent border border-white/40 p-4 font-mono focus:outline-none focus:border-white focus:bg-white/5 transition-colors placeholder:text-white/30"
                            placeholder="+94 7X XXX XXXX"
                            required
                            disabled={formStatus === 'LOADING'}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs uppercase opacity-80 tracking-widest">Description</label>
                        <textarea
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="bg-transparent border border-white/40 p-4 font-mono focus:outline-none focus:border-white focus:bg-white/5 transition-colors placeholder:text-white/30 resize-none"
                            placeholder="Tell us about the process you want to automate..."
                            required
                            disabled={formStatus === 'LOADING'}
                        />
                    </div>
                    
                    {formStatus === 'ERROR' && (
                        <p className="text-red-300 font-mono text-xs">Error: Connection failed. Please try again or call us directly.</p>
                    )}

                    <button 
                        type="submit"
                        disabled={formStatus === 'LOADING'}
                        className="group relative overflow-hidden bg-white text-[#6E65C7] py-4 px-6 font-bold tracking-tight mt-2 transition-transform hover:scale-[1.01] active:scale-[0.99] w-full disabled:opacity-70 disabled:cursor-wait"
                    >
                        <span className="relative z-10 flex justify-between items-center uppercase">
                            {formStatus === 'LOADING' ? 'TRANSMITTING...' : 'Confirm Request'}
                            <span className="font-mono text-xs opacity-50 hidden sm:inline-block">/ ENTER ↵</span>
                        </span>
                    </button>
                </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}