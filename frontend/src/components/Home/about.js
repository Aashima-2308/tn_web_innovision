"use client";

import React from "react";

export default function About({ onShowToast }) {
  const showToast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  return (
    <section
      className="w-full px-margin py-space-xl bg-surface-container-low relative overflow-hidden"
      id="about"
    >
      <div className="absolute -top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 1. MAIN ABOUT US COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-space-xl">
          {/* LEFT COLUMN: Featured Illustration & Orbit System */}
          <div className="lg:col-span-5 relative flex items-center justify-center reveal-init reveal-active">
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
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg border-2 border-surface-container-lowest z-20">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
              </div>
              <div className="absolute top-16 -right-2 w-7 h-7 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md border-2 border-surface-container-lowest z-20">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
              </div>

              <div className="relative z-10 w-[84%] aspect-square rounded-3xl p-3 bg-gradient-to-b from-surface-container-lowest to-surface-container-low shadow-xl border border-outline-variant/40 flex items-center justify-center overflow-hidden animate-float">
                <img
                  alt="TechNeeds student coding with headphones surrounded by orbital cosmic planetary tech rings"
                  className="w-full h-full object-contain drop-shadow-sm select-none"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida/ALJJyrDwAzOr7-7LdcvQgLHkb5ImJBBAdqg14pGWGOjUMKxe6BOsZ_C9RxkFGINPDQltFMMm-fHRcHdGCLqpKL4Au6dJo0bzfrQRksZD2DQaVRX09zmJS1zOqD5FHIKuvlsv2X2q7qbl_gqx09jcj-gHLvZsKtNTrLEvFhl5mnjt8zr67dYKwvZNqbZeBCSNzJb2hmozpp2KqUmrmQXUvsowdRZbNUCOIbOThi0z9TACzN3k"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Headings & 4 Statistics Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center reveal-init reveal-active">
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
              <div className="p-space-md sm:p-space-lg rounded-xl bg-blue-50/50 hover:bg-surface-container-lowest border border-blue-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group cursor-default">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">school</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-0.5 flex items-baseline">
                    <span>1200+</span>
                  </div>
                  <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Trained Mentees
                  </div>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Empowered with industry-grade software skills
                  </p>
                </div>
              </div>

              <div className="p-space-md sm:p-space-lg rounded-xl bg-blue-50/50 hover:bg-surface-container-lowest border border-blue-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group cursor-default">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">
                      supervisor_account
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-0.5 flex items-baseline">
                    <span>50+</span>
                  </div>
                  <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Professional Mentors
                  </div>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Alumnae &amp; senior software engineers
                  </p>
                </div>
              </div>

              <div className="p-space-md sm:p-space-lg rounded-xl bg-blue-50/50 hover:bg-surface-container-lowest border border-blue-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group cursor-default">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">hub</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-0.5 flex items-baseline">
                    <span>10+</span>
                  </div>
                  <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Mentorship Cohorts
                  </div>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Hands-on, multi-week specialized tracks
                  </p>
                </div>
              </div>

              <div className="p-space-md sm:p-space-lg rounded-xl bg-blue-50/50 hover:bg-surface-container-lowest border border-blue-100 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group cursor-default">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mb-0.5 flex items-baseline">
                    <span>100+</span>
                  </div>
                  <div className="font-label-lg text-label-lg font-semibold text-on-surface">
                    Amazing Events
                  </div>
                  <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                    Hackathons, speaker syncs &amp; lab audits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MISSION & WHAT WE OFFER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-xl">
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between interactive-card border border-outline-variant/30 reveal-init reveal-active">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[26px]">flag</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary-fixed/80 text-primary font-code-tech text-[11px] font-semibold uppercase tracking-wider">
                  CORE MANDATE
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
                Our Mission
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                To be the go-to resource for anyone seeking to understand, explore, and stay updated
                on the ever-evolving world of technology.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between interactive-card border border-outline-variant/30 reveal-init reveal-active">
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">verified</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      What We Offer
                    </h3>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Core learning pillars designed for university engineers
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-sm pt-space-xs">
                <div
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-blue-50/80 border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 group cursor-pointer flex items-center gap-space-sm"
                  onClick={() =>
                    showToast("In-Depth Insights: Architectural deep dives & production breakdowns.")
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[19px]">insights</span>
                  </div>
                  <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                    In-Depth Insights
                  </div>
                </div>

                <div
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-blue-50/80 border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 group cursor-pointer flex items-center gap-space-sm"
                  onClick={() =>
                    showToast("Educational Content: Curated roadmaps, code repos, and system guides.")
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[19px]">menu_book</span>
                  </div>
                  <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Educational Content
                  </div>
                </div>

                <div
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-blue-50/80 border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 group cursor-pointer flex items-center gap-space-sm"
                  onClick={() =>
                    showToast(
                      "Community Engagement: Active peer pods, live AMA threads, and code reviews."
                    )
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[19px]">groups</span>
                  </div>
                  <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Community Engagement
                  </div>
                </div>

                <div
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-blue-50/80 border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 group cursor-pointer flex items-center gap-space-sm"
                  onClick={() =>
                    showToast("Hackathons: 24h college build sprints with sponsor challenges.")
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[19px]">emoji_events</span>
                  </div>
                  <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Hackathons
                  </div>
                </div>

                <div
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-blue-50/80 border border-outline-variant/30 hover:border-primary/40 transition-all duration-200 group cursor-pointer flex items-center gap-space-sm sm:col-span-2 md:col-span-2"
                  onClick={() =>
                    showToast(
                      "Speaker Sessions: Fireside discussions with top tech leaders and researchers."
                    )
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined text-[19px]">podcasts</span>
                  </div>
                  <div className="font-title-md text-[14px] leading-tight text-on-surface font-semibold group-hover:text-primary transition-colors">
                    Speaker Sessions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}