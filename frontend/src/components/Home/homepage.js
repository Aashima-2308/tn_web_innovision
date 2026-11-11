"use client";

import React, { useState, useEffect, useRef } from "react";
import About from "./about";
import Mentorship from "./mentorship";
import Glimpse from "./glimpse";
import Testimonials from "./testimonials";
import CrazyCubes from "../animation/CrazyCubes";

export default function Homepage() {
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
    const handleToastEvent = (e) => showToast(e.detail);
    window.addEventListener("show-toast", handleToastEvent);
    return () => window.removeEventListener("show-toast", handleToastEvent);
  }, []);

  const openAuthModal = () => {
    window.dispatchEvent(new Event("open-auth-modal"));
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO / CTA WITH ORIGINAL 3D CRAZY CUBES ANIMATION */}
      <section className="relative w-full px-margin py-space-xl overflow-hidden bg-surface">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div
          className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
          style={{ animationDelay: "-3s" }}
        ></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left Column: Headline & CTAs */}
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
                At TechNeeds, we’re passionate about technology and committed to empowering
                individuals with knowledge. Our community serves as a vibrant hub for tech
                enthusiasts, from beginners to experts, offering a comprehensive destination for
                all things tech.
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

            {/* Right Column: Original 3D CrazyCubes Animation */}
            <div className="lg:col-span-5 relative mt-space-lg lg:mt-0 flex flex-col items-center justify-center min-h-[380px]">
              {/* Subtle Interactive Orbital Rings behind the 3D Cube */}
              <div
                className="absolute w-80 h-80 rounded-full border border-primary/15 animate-spin-slow pointer-events-none"
                style={{ borderDasharray: "10 8" }}
              ></div>
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-secondary-container/25 animate-spin-reverse pointer-events-none"></div>
              <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-primary-fixed/50 via-secondary-fixed/30 to-tertiary-fixed/40 blur-2xl animate-pulse-glow pointer-events-none"></div>

              {/* The Original 3D Cube Component */}
              <div
                className="relative z-10 flex items-center justify-center py-8 cursor-pointer"
                onClick={() => showToast("3D Cube rotation axis toggled!")}
                title="Click cube to reverse 3D rotation!"
              >
                <CrazyCubes />
              </div>

              {/* Interactive Hint Pill */}
              <div className="relative z-20 mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 shadow-sm border border-outline-variant/40 text-xs font-code-tech text-primary animate-float">
                <span className="material-symbols-outlined text-[15px]">3d_rotation</span>
                <span>Click 3D Cube to Toggle Axis Spin</span>
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