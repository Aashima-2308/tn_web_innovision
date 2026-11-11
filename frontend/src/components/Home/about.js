"use client";

import React, { useState, useEffect, useRef } from "react";

function AnimatedCounter({ target, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const steps = 40;
          const stepTime = duration / steps;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

const offeringsData = [
  {
    icon: "insights",
    title: "In-Depth Insights",
    tag: "SYSTEMS ARCHITECTURE",
    detail: "Architectural deep dives, distributed systems case studies & production code breakdowns.",
    span: "",
  },
  {
    icon: "menu_book",
    title: "Educational Content",
    tag: "CURATED ROADMAPS",
    detail: "Structured multi-week cohorts, interactive quizzes, and peer-reviewed GitHub repositories.",
    span: "",
  },
  {
    icon: "groups",
    title: "Community Engagement",
    tag: "1:4 PEER PODS",
    detail: "Active peer mentorship pods, live senior AMA threads, and collaborative debugging labs.",
    span: "",
  },
  {
    icon: "emoji_events",
    title: "Hackathons",
    tag: "24H BUILD SPRINTS",
    detail: "High-intensity college build sprints, Reimagathons, and industry-sponsored problem statements.",
    span: "",
  },
  {
    icon: "podcasts",
    title: "Speaker Sessions",
    tag: "INDUSTRY FIRESIDES",
    detail: "Fireside discussions and live kernel demos with IGDTUW alumnae at Google, Microsoft & Uber.",
    span: "sm:col-span-2 md:col-span-2",
  },
];

export default function About({ onShowToast }) {
  const [activeOffering, setActiveOffering] = useState(offeringsData[0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll(".reveal-init");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, []);

  const handleSelectOffering = (item) => {
    setActiveOffering(item);
    if (onShowToast) {
      onShowToast(`${item.title}: ${item.detail}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-margin py-space-xl bg-surface-container-low relative overflow-hidden"
      id="about"
    >
      <div className="absolute -top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 1. MAIN ABOUT US COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-space-xl">
          {/* LEFT COLUMN: Featured Illustration & Orbit System */}
          <div className="lg:col-span-5 relative flex items-center justify-center reveal-init">
            <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border border-primary/15 animate-spin-slow pointer-events-none"
                style={{ borderDasharray: "8 6" }}
              ></div>
              <div className="absolute inset-6 rounded-full border border-dashed border-secondary-container/25 animate-spin-reverse pointer-events-none"></div>
              <div className="absolute inset-14 rounded-full border border-primary-fixed-dim/40 pointer-events-none"></div>
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-primary-fixed/40 via-secondary-fixed/30 to-tertiary-fixed/30 blur-2xl animate-pulse-glow pointer-events-none"></div>

              <div
                className="absolute top-4 right-10 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-md border border-primary/20 flex items-center gap-1.5 z-20 animate-float"
                style={{ animationDuration: "5s" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-code-tech text-[11px] text-primary font-semibold">
                  &lt;/peer_code&gt;
                </span>
              </div>
              <div
                className="absolute bottom-6 left-6 px-2.5 py-1 rounded-full bg-surface-container-lowest shadow-md border border-secondary-container/20 flex items-center gap-1.5 z-20 animate-float"
                style={{ animationDuration: "7s", animationDelay: "-2s" }}
              >
                <span className="material-symbols-outlined text-secondary text-[14px]">
                  psychology
                </span>
                <span className="font-label-md text-[11px] text-on-surface font-semibold">
                  1:4 Cohort Rigor
                </span>
              </div>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg border-2 border-surface-container-lowest z-20 animate-float">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
              </div>
              <div
                className="absolute top-16 -right-2 w-7 h-7 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md border-2 border-surface-container-lowest z-20 animate-float"
                style={{ animationDelay: "-1.5s" }}
              >
                <span className="material-symbols-outlined text-[14px]">bolt</span>
              </div>

              <div className="relative z-10 w-[84%] aspect-square rounded-3xl p-3 bg-gradient-to-b from-surface-container-lowest to-surface-container-low shadow-xl border border-outline-variant/40 flex items-center justify-center overflow-hidden animate-float group">
                <img
                  alt="TechNeeds student coding with headphones"
                  className="w-full h-full object-contain drop-shadow-sm select-none transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida/ALJJyrDwAzOr7-7LdcvQgLHkb5ImJBBAdqg14pGWGOjUMKxe6BOsZ_C9RxkFGINPDQltFMMm-fHRcHdGCLqpKL4Au6dJo0bzfrQRksZD2DQaVRX09zmJS1zOqD5FHIKuvlsv2X2q7qbl_gqx09jcj-gHLvZsKtNTrLEvFhl5mnjt8zr67dYKwvZNqbZeBCSNzJb2hmozpp2KqUmrmQXUvsowdRZbNUCOIbOThi0z9TACzN3k"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Headings & 4 Animated Statistics Grid */}
          <div
            className="lg:col-span-7 flex flex-col justify-center reveal-init"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                About Us
              </h2>
              <div className="h-1 w-12 bg-primary rounded-full"></div>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold mb-space-sm tracking-tight">
              IGDTUW Students&apos; First Choice
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-space-lg">
              TechNeeds is the student-led engineering powerhouse at Indira Gandhi Delhi Technical
              University for Women. We nurture premier software artisans through intensive
              peer-to-peer code reviews, algorithmic depth, and production systems thinking.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-space-md">
              {[
                {
                  icon: "school",
                  target: 1200,
                  label: "Trained Mentees",
                  sub: "Empowered with industry-grade software skills",
                },
                {
                  icon: "supervisor_account",
                  target: 50,
                  label: "Professional Mentors",
                  sub: "Alumnae & senior software engineers",
                },
                {
                  icon: "hub",
                  target: 10,
                  label: "Mentorship Cohorts",
                  sub: "Hands-on, multi-week specialized tracks",
                },
                {
                  icon: "auto_awesome",
                  target: 100,
                  label: "Amazing Events",
                  sub: "Hackathons, speaker syncs & lab audits",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="interactive-card p-space-md sm:p-space-lg rounded-xl bg-blue-50/50 hover:bg-surface-container-lowest border border-blue-100 flex flex-col justify-between group cursor-default relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-[22px]">{stat.icon}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all"></span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-0.5 flex items-baseline">
                      <AnimatedCounter target={stat.target} />
                      <span>+</span>
                    </div>
                    <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                      {stat.label}
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                      {stat.sub}
                    </p>
                  </div>
                  {/* Animated bottom accent bar on hover */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary-container group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. OUR MISSION & WHAT WE OFFER (Animated Interactive Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-xl">
          {/* CARD 1: Our Mission (with animated orbital background & interactive badge) */}
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between interactive-card border border-outline-variant/30 reveal-init relative overflow-hidden group">
            {/* Subtle rotating ambient ring inside Our Mission */}
            <div
              className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full border border-dashed border-primary/15 animate-spin-slow pointer-events-none group-hover:border-primary/30 transition-colors"
            ></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 animate-border-pulse">
                  <span className="material-symbols-outlined text-[26px]">flag</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary-fixed/80 text-primary font-code-tech text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  CORE MANDATE
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm group-hover:text-primary transition-colors">
                Our Mission
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                To be the go-to resource for anyone seeking to understand, explore, and stay updated
                on the ever-evolving world of technology.
              </p>
            </div>

            {/* Interactive Bottom Telemetry Strip inside Our Mission */}
            <div className="relative z-10 mt-space-lg pt-space-sm border-t border-outline-variant/25 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  verified_user
                </span>
                <span className="font-code-tech text-xs text-on-surface-variant">
                  Peer-Led Open Knowledge Graph
                </span>
              </div>
              <span className="font-code-tech text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                100% Free →
              </span>
            </div>
          </div>

          {/* CARD 2: What We Offer (with Bouncy Shimmer Sub-Components & Live Interactive Preview) */}
          <div
            className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between interactive-card border border-outline-variant/30 reveal-init relative overflow-hidden"
            style={{ transitionDelay: "150ms" }}
          >
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center animate-float">
                    <span className="material-symbols-outlined text-[26px]">verified</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      What We Offer
                    </h3>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Click or hover any pillar below to inspect our engineering ecosystem
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Animated Offerings Chip / Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm pt-space-xs">
                {offeringsData.map((item, idx) => {
                  const isSelected = activeOffering.title === item.title;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveOffering(item)}
                      onClick={() => handleSelectOffering(item)}
                      className={`offer-pill-anim p-space-sm rounded-xl border cursor-pointer flex items-center gap-space-sm ${
                        item.span
                      } ${
                        isSelected
                          ? "bg-primary-fixed/50 border-primary shadow-sm"
                          : "bg-surface-container-low hover:bg-blue-50/80 border-outline-variant/30"
                      }`}
                    >
                      <div
                        className={`offer-pill-icon w-9 h-9 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${
                          isSelected
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-lowest text-primary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold truncate">
                          {item.title}
                        </div>
                        <span className="font-code-tech text-[10px] text-primary/80 font-semibold">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Interactive Spotlight Drawer for the Selected Offering */}
              <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low border border-primary/20 flex items-center justify-between gap-3 transition-all duration-300">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                    {activeOffering.icon}
                  </span>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant truncate">
                    <strong className="text-primary">{activeOffering.title}:</strong>{" "}
                    {activeOffering.detail}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-code-tech text-[10px] font-bold shrink-0">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}