"use client";

import React, { useState, useEffect, useRef } from "react";
import About from "./about";
import Mentorship from "./mentorship";
import Glimpse from "./glimpse";
import Testimonials from "./testimonials";

export default function Homepage() {
  const [latency, setLatency] = useState("12.2ms");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const timerRef = useRef(null);

  const showToast = (message) => {
    setToast({ visible: true, message });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (11.8 + Math.random() * 1.8).toFixed(1);
      setLatency(`${variation}ms`);
    }, 2400);

    const handleToastEvent = (e) => showToast(e.detail);
    window.addEventListener("show-toast", handleToastEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener("show-toast", handleToastEvent);
    };
  }, []);

  const openAuthModal = () => {
    window.dispatchEvent(new Event("open-auth-modal"));
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO / CTA */}
      <section className="relative w-full px-margin py-space-xl overflow-hidden bg-surface">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div
          className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
          style={{ animationDelay: "-3s" }}
        ></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 flex flex-col items-start reveal-init reveal-active">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/60 border border-primary/20 text-primary font-code-tech text-code-tech mb-space-sm shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-primary -ml-4"></span>
                <span>COHORT 2025 SPRINT ACTIVE</span>
                <span className="text-outline-variant">|</span>
                <span className="font-bold text-tertiary-container">IGDTUW LABS</span>
              </div>
              <h1 className="font-display-hero text-display-hero text-on-surface mb-space-md tracking-tight">
                <span className="text-primary underline decoration-primary-fixed decoration-4 underline-offset-8">
                  <span style={{ color: "#111a36" }}>Upgrade&nbsp;</span>Yourself
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-space-lg">
                <span
                  style={{
                    color: "rgb(55, 71, 79)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "19.2px",
                  }}
                >
                  At TechNeeds, we’re passionate about technology and committed to empowering
                  individuals with knowledge. Our community serves as a vibrant hub for tech
                  enthusiasts, from beginners to experts, offering a comprehensive destination for
                  all things tech.
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                <button
                  onClick={openAuthModal}
                  className="btn-interactive px-space-lg py-space-sm bg-secondary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-primary transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Register Now</span>
                  <span className="material-symbols-outlined text-[18px] hover-nudge">
                    how_to_reg
                  </span>
                </button>
                <a
                  className="btn-interactive px-space-lg py-space-sm bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-secondary transition-all flex items-center gap-2 group cursor-pointer"
                  href="#about"
                >
                  <span>Know more</span>
                  <span className="material-symbols-outlined text-[18px] hover-nudge">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="btn-interactive px-space-lg py-space-sm bg-surface-container-lowest text-on-surface font-label-lg text-label-lg rounded-lg shadow-sm border border-outline-variant/40 hover:bg-surface-container transition-all flex items-center gap-2 group cursor-pointer"
                  href="#cohorts"
                >
                  <span>Explore Cohorts</span>
                  <span className="material-symbols-outlined text-[18px] text-primary group-hover:translate-x-1 transition-transform">
                    login
                  </span>
                </a>
              </div>
            </div>

            {/* Hero Technical Composition / Code & Visual Blueprint */}
            <div className="lg:col-span-5 relative mt-space-lg lg:mt-0 reveal-init reveal-active">
              <div className="relative w-full rounded-xl bg-surface-container-lowest shadow-xl p-space-lg overflow-hidden border border-outline-variant/40 interactive-card">
                <div className="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container-low -mx-space-lg -mt-space-lg px-space-md py-space-sm border-b border-outline-variant/30">
                  <div className="flex items-center gap-1.5">
                    <button
                      className="w-3 h-3 rounded-full bg-error cursor-pointer hover:opacity-80 transition-opacity"
                      title="Close Shell"
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full bg-outline-variant cursor-pointer hover:opacity-80 transition-opacity"
                      title="Minimize"
                    ></button>
                    <button
                      className="w-3 h-3 rounded-full bg-secondary-container cursor-pointer hover:opacity-80 transition-opacity"
                      title="Expand"
                    ></button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-code-tech text-code-tech text-outline">
                      consensus_dispatch.go
                    </span>
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1"
                      title="Real-time Stream"
                    ></span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[16px]">
                    terminal
                  </span>
                </div>

                <div className="font-code-tech text-code-tech text-on-surface-variant leading-relaxed">
                  <p className="text-tertiary font-bold">// IGDTUW Core Peer Kernel</p>
                  <p>
                    <span className="text-primary font-bold">package</span> main
                  </p>
                  <p className="mt-1">
                    <span className="text-primary font-bold">type</span> MentorshipSession{" "}
                    <span className="text-primary font-bold">struct</span> &#123;
                  </p>
                  <p className="pl-4">
                    Cohort:{" "}
                    <span className="text-secondary-container font-semibold">
                      &quot;Distributed Systems&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    P99Latency:{" "}
                    <span className="text-tertiary-container font-semibold font-mono">
                      {latency}
                    </span>
                    ,
                  </p>
                  <p className="pl-4">
                    RigorousCodeReview: <span className="text-primary font-semibold">true</span>,
                  </p>
                  <p>&#125;</p>
                  <p className="mt-2 text-outline-variant flex items-center">
                    // Verifying concurrent primitives<span className="animate-pulse">...</span>
                  </p>
                  <p className="text-secondary font-semibold mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">
                      check_circle
                    </span>
                    <span>&gt; STATUS: CONVERGENCE ACHIEVED [OK]</span>
                    <span className="inline-block w-2 h-4 bg-primary animate-blink ml-1"></span>
                  </p>
                </div>

                <div
                  className="mt-space-md p-space-md bg-surface-container rounded-lg shadow-sm flex items-center justify-between border border-outline-variant/30 hover:bg-surface-container-high transition-colors cursor-pointer group"
                  onClick={() =>
                    showToast(
                      "Active Sprint Cohort: Distributed Consensus on Raft is currently at Stage 3 of 4."
                    )
                  }
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">hub</span>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">
                        Active Sprint Cohort
                      </div>
                      <div className="font-label-md text-label-md text-on-surface-variant">
                        Raft Cluster &amp; Memory Alignment
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-space-sm py-space-xs rounded-full bg-surface-container-highest text-primary font-code-tech text-code-tech group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      Wk 07/12
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stacked Sub-Components */}
      <About onShowToast={showToast} />
      <Mentorship onShowToast={showToast} />
      <Glimpse />
      <Testimonials onShowToast={showToast} />

      {/* Global Floating Toast Banner */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-space-sm px-space-md py-space-sm bg-inverse-surface text-inverse-on-surface rounded-xl shadow-2xl border border-outline/30 transform transition-all duration-300 ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[18px]">info</span>
        </div>
        <span className="font-body-md text-body-md font-medium">{toast.message}</span>
      </div>
    </div>
  );
}