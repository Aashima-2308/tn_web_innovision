"use client";

import React from "react";
import { useRouter } from "next/navigation";

const roleCards = [
  {
    role: "Mentee Portal",
    badge: "SCHOLAR TRACK",
    title: "Mentee Learning Hub",
    desc: "Access your assigned video masterclasses, attempt timed quizzes, submit GitHub PR deliverables, and climb the campus leaderboard.",
    icon: "school",
    path: "/dashboard",
    accent: "bg-primary text-on-primary",
    btnText: "Launch Mentee Dashboard",
  },
  {
    role: "Mentor Console",
    badge: "FACULTY & SENIORS",
    title: "Mentor Studio & Grader",
    desc: "Provision mentees with auto-generated enrollment IDs, publish video/quiz/project modules, and review student pull requests.",
    icon: "cast_for_education",
    path: "/mentor",
    accent: "bg-secondary-container text-on-primary",
    btnText: "Launch Mentor Console",
  },
  {
    role: "Admin Command",
    badge: "CORE GOVERNANCE",
    title: "Admin Cohort Console",
    desc: "Create new mentorship cohorts, onboard industry & faculty mentors, and oversee 1:4 student-to-mentor ratio telemetry.",
    icon: "admin_panel_settings",
    path: "/admin",
    accent: "bg-tertiary-container text-on-primary",
    btnText: "Launch Admin Panel",
  },
];

export default function Tech() {
  const router = useRouter();

  return (
    <section className="min-h-[85vh] w-full px-margin py-space-xl bg-surface flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center mb-space-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/60 border border-primary/20 text-primary font-code-tech text-code-tech mb-space-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span>UNIFIED ROLE GATEWAY // IGDTUW</span>
        </div>
        <h1 className="font-display-hero-mobile md:text-display-hero text-on-surface font-extrabold tracking-tight mb-space-sm">
          Welcome to <span className="text-primary">TechBoard</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Select your role below to jump directly into your dedicated workspace.
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-gutter relative z-10">
        {roleCards.map((card, i) => (
          <div
            key={i}
            onClick={() => router.push(card.path)}
            className="interactive-card cursor-pointer rounded-2xl bg-surface-container-lowest p-space-xl shadow-md border border-outline-variant/40 flex flex-col justify-between text-left group"
          >
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.accent} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-tech text-[11px] font-bold">
                  {card.badge}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                {card.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg">
                {card.desc}
              </p>
            </div>

            <button className="btn-interactive w-full py-3 rounded-xl bg-surface-container group-hover:bg-primary group-hover:text-on-primary text-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer">
              <span>{card.btnText}</span>
              <span className="material-symbols-outlined text-[18px] hover-nudge">
                arrow_forward
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}