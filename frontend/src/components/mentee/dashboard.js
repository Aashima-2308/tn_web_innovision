"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function MenteeDashboard() {
  const [mentee, setMentee] = useState(null);
  const [activeNav, setActiveNav] = useState("my-videos");

  // Project Submission Modal State
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [project1Submitted, setProject1Submitted] = useState(false);

  // Video 2 status toggle
  const [video2Done, setVideo2Done] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("menteeToken");
    if (token) {
      axios
        .get("https://tn-backend-1.onrender.com/api/m/dashboard", {
          headers: { "x-auth-token": token },
        })
        .then((res) => setMentee(res.data))
        .catch(() => {});
    }
  }, []);

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!deliverableUrl.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setProject1Submitted(true);
      setSubmitModalOpen(false);
      setDeliverableUrl("");
      setSubmissionNotes("");
    }, 700);
  };

  const displayName = mentee?.name || "Rhea";
  const displayXP = mentee?.totalScore !== undefined ? `${mentee.totalScore}` : "2,840";
  const displayStreak = mentee?.streak !== undefined ? `${mentee.streak} Days` : "14 Days";
  const displayRank = mentee?.rank !== undefined ? `#${mentee.rank}` : "#4";

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      {/* LEFT SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col pt-space-lg pb-space-lg">
        <div className="px-space-lg mb-space-lg">
          <Link className="flex items-center gap-space-sm group" href="/">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[20px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-none">
                TechNeeds
              </span>
              <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-widest mt-0.5">
                IGDTUW Hub
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-space-md">
          <div>
            <span className="px-space-md text-[11px] font-bold uppercase tracking-wider text-outline block mb-space-xs font-label-md">
              Mentee Track
            </span>
            <nav className="flex flex-col gap-1">
              {[
                { id: "my-videos", label: "My Videos", icon: "smart_display", href: "#my-videos" },
                { id: "my-quizzes", label: "My Quizzes", icon: "fact_check", href: "#my-quizzes" },
                { id: "my-projects", label: "My Projects", icon: "terminal", href: "#my-projects" },
                {
                  id: "leaderboard",
                  label: "Leaderboard",
                  icon: "leaderboard",
                  href: "#leaderboard",
                },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-all ${
                    activeNav === item.id
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="pl-72">
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span className="font-code-tech text-code-tech text-primary font-semibold">
              SCHOLAR PORTAL
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px] p-2 hover:bg-surface-container rounded-full cursor-pointer transition-colors">
                search
              </span>
              <span className="material-symbols-outlined text-[20px] p-2 hover:bg-surface-container rounded-full cursor-pointer transition-colors">
                notifications
              </span>
            </div>
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              title="Open AI Profile"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </header>

        <main className="w-full pt-20 bg-surface px-space-lg py-space-lg">
          <div className="flex flex-col w-full">
            {/* Top Utility Context Bar */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high text-primary font-code-tech text-code-tech font-bold uppercase tracking-wider">
                  ID: IGDTUW-CS-23-104
                </span>
                <span className="inline-flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                  Sprint 04 • Week 2 Active
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <div className="h-4 w-px bg-surface-container-highest"></div>
                <span className="font-label-md text-label-md font-semibold text-tertiary">
                  Mentor: Dr. Radhika Sen (Distributed Labs)
                </span>
              </div>
            </div>

            {/* SECTION 1: OVERVIEW & PERSONALIZED WELCOME HERO */}
            <section className="mb-space-xl relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
                <div className="lg:col-span-8 flex flex-col justify-center min-w-0">
                  <h1 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight mb-space-xs">
                    Welcome back, {displayName}!
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-medium mb-space-md">
                    IGDTUW/2023/CS104 — Cohort #04 Cloud &amp; Distributed Systems
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-xs">
                    <div className="rounded-lg bg-surface-container-low p-space-sm">
                      <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">
                        Total Experience
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary font-code-tech">
                          {displayXP}
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                          XP
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-surface-container-low p-space-sm">
                      <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">
                        Milestones Completed
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface font-code-tech">
                          {video2Done ? 18 : 17}
                        </span>
                        <span className="font-label-md text-label-md font-semibold text-outline">
                          / 25
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-surface-container-low p-space-sm col-span-2 sm:col-span-1">
                      <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">
                        Consistency Streak
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="material-symbols-outlined text-[20px] text-error">
                          local_fire_department
                        </span>
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface font-code-tech">
                          {displayStreak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick AI Profile Access Card */}
                <div className="lg:col-span-4 flex flex-col justify-between p-space-md rounded-xl bg-gradient-to-br from-primary to-secondary text-on-primary shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-code-tech text-[11px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      AI Telemetry Synced
                    </span>
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold">
                    AI Developer Passport
                  </h3>
                  <p className="text-xs text-on-primary/80 mt-1 mb-3">
                    View your skill radar, dynamic badges &amp; personalized recommendations.
                  </p>
                  <Link
                    href="/profile"
                    className="w-full py-2 rounded-lg bg-white text-primary font-label-md text-label-md font-bold text-center hover:bg-primary-fixed transition-colors"
                  >
                    Open AI Profile →
                  </Link>
                </div>
              </div>
            </section>

            {/* TWO COLUMN ARCHITECTURE: ASSIGNED TRACKS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
              {/* LEFT: VIDEOS & QUIZZES (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-xl">
                {/* SECTION 2: MY VIDEOS */}
                <section
                  id="my-videos"
                  className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm scroll-mt-20"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">smart_display</span>
                      </div>
                      <div>
                        <h2 className="font-title-md text-title-md text-on-surface font-bold">
                          My Videos
                        </h2>
                      </div>
                    </div>
                    <span className="font-code-tech text-code-tech text-outline">2 Enrolled</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* Video 1 */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all flex flex-col justify-between interactive-card">
                      <div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0d2354] mb-3 group cursor-pointer shadow-sm bg-gradient-to-tr from-[#0a1936] via-[#102a5c] to-[#1e458a]">
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-mono font-bold text-white tracking-wider border border-white/10">
                            MODULE 04
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                              <span className="material-symbols-outlined text-white text-[24px] ml-0.5">
                                play_arrow
                              </span>
                            </div>
                          </div>
                          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-md text-[11px] font-mono text-white/90 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">schedule</span>{" "}
                            48 mins
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-[15px] font-bold text-on-surface mb-2 line-clamp-1">
                          Mastering Goroutines &amp; Channel Deadlines
                        </h4>
                      </div>
                      <div className="flex items-center justify-between gap-2 flex-wrap pt-1 mt-auto border-t border-surface-container/60">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Completed
                          </span>
                          <span className="text-on-surface-variant font-code-tech text-[11px]">
                            Score: <strong className="text-primary">95/100</strong>
                          </span>
                        </div>
                        <button className="px-3 py-1 rounded-lg border border-outline/30 hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors cursor-pointer">
                          Rewatch
                        </button>
                      </div>
                    </div>

                    {/* Video 2 */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all flex flex-col justify-between interactive-card">
                      <div>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0d2354] mb-3 group cursor-pointer shadow-sm bg-gradient-to-tr from-[#0a1936] via-[#16366f] to-[#1c54b2]">
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-mono font-bold text-white tracking-wider border border-white/10">
                            MODULE 05
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                              <span className="material-symbols-outlined text-white text-[24px] ml-0.5">
                                play_arrow
                              </span>
                            </div>
                          </div>
                          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-md text-[11px] font-mono text-white/90 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">schedule</span>{" "}
                            34 mins
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-[15px] font-bold text-on-surface mb-2 line-clamp-1">
                          gRPC Protocols &amp; RESTful APIs at Scale
                        </h4>
                      </div>
                      <div className="flex items-center justify-between gap-2 flex-wrap pt-1 mt-auto border-t border-surface-container/60">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            {video2Done ? "Completed" : "In Progress"}
                          </span>
                          <span className="text-on-surface-variant font-code-tech text-[11px]">
                            {video2Done ? "Score: 100/100" : "Assigned by Mentor"}
                          </span>
                        </div>
                        <button
                          onClick={() => setVideo2Done(true)}
                          className="px-3.5 py-1 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                        >
                          {video2Done ? "Completed ✓" : "Continue"}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 3: MY QUIZZES */}
                <section
                  id="my-quizzes"
                  className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm scroll-mt-20"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">fact_check</span>
                      </div>
                      <div>
                        <h2 className="font-title-md text-title-md text-on-surface font-bold">
                          My Quizzes
                        </h2>
                        <span className="font-label-md text-label-md text-outline">
                          Assigned Theoretical &amp; Algorithmic Assessments
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-md">
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5 text-primary">
                          <span className="material-symbols-outlined text-[22px]">quiz</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-label-md text-label-md font-bold text-on-surface">
                              CAP Theorem &amp; Distributed Consensus Quiz
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-code-tech text-[11px] font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                              In Progress
                            </span>
                          </div>
                          <div className="flex items-center gap-space-sm mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="flex items-center gap-1 text-error font-semibold">
                              <span className="material-symbols-outlined text-[16px]">alarm</span>
                              Deadline: Dec 20
                            </span>
                            <span>•</span>
                            <span className="font-code-tech text-on-surface font-semibold">
                              Max Score: 50 pts
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-secondary-container transition-all self-end sm:self-center shrink-0 cursor-pointer">
                        Resume Quiz
                      </button>
                    </div>

                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                          <span className="material-symbols-outlined text-[22px]">verified</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-label-md text-label-md font-bold text-on-surface">
                              Go Concurrency Patterns Quiz
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-code-tech text-[11px] font-bold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Completed
                            </span>
                          </div>
                          <div className="flex items-center gap-space-sm mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="font-code-tech text-secondary font-bold">
                              Earned Score: 48/50
                            </span>
                            <span>•</span>
                            <span className="text-outline">Submitted Dec 08</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-all self-end sm:self-center shrink-0 cursor-pointer">
                        Review Breakdown
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT: MY PROJECTS & LEADERBOARD (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-xl">
                {/* SECTION 4: MY PROJECTS */}
                <section
                  id="my-projects"
                  className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm scroll-mt-20"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                      </div>
                      <div>
                        <h2 className="font-title-md text-title-md text-on-surface font-bold">
                          My Projects
                        </h2>
                        <span className="font-label-md text-label-md text-outline">
                          Hands-on Engineering Deliverables
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="gap-space-md flex flex-col">
                    {/* Project 1 */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between border-l-2 border-primary">
                      <div>
                        <h4 className="font-headline-sm text-[15px] font-bold text-on-surface mb-1.5 line-clamp-1">
                          Distributed Key–Value Store with Raft Consensus
                        </h4>
                        <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 mb-3">
                          Implement leader election, log replication, and heartbeat protocol in Go.
                          Passed 18/20 unit tests.
                        </p>
                        <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-surface-container-lowest text-xs font-code-tech mb-3">
                          <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                            <span className="flex items-center gap-1 text-error font-medium">
                              <span className="material-symbols-outlined text-[13px]">alarm</span>
                              Due Dec 18
                            </span>
                            <span>Max: 100 pts</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-surface-container/60 mt-auto">
                        <span className="text-xs font-code-tech text-primary font-semibold">
                          {project1Submitted ? "✅ PR Submitted for Review" : "Awaiting Deliverable"}
                        </span>
                        <button
                          onClick={() => setSubmitModalOpen(true)}
                          className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">terminal</span>
                          {project1Submitted ? "Update PR" : "Submit"}
                        </button>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between">
                      <div>
                        <h4 className="font-headline-sm text-[15px] font-bold text-on-surface mb-1.5 line-clamp-1">
                          Containerizing Microservices with Docker &amp; Compose
                        </h4>
                        <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-2 mb-3">
                          Multi-stage Docker build optimizations, binary size reduction to 14MB.
                          Passed CI/CD security scanning.
                        </p>
                        <div className="flex flex-col gap-1.5 p-2 rounded-lg bg-surface-container-lowest text-xs font-code-tech mb-3">
                          <div className="flex items-center justify-between text-on-surface-variant">
                            <span className="flex items-center gap-1 text-[11px] text-secondary font-bold">
                              <span className="material-symbols-outlined text-[14px]">
                                check_circle
                              </span>
                              Score: 98/100
                            </span>
                          </div>
                          <div className="text-[11px] text-on-surface-variant italic truncate pt-1 border-t border-surface-container">
                            &quot;Exemplary Dockerfile multi-stage optimization!&quot;
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container/60 mt-auto">
                        <button className="px-3 py-1 rounded-lg border border-outline/30 hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors flex items-center gap-1 cursor-pointer">
                          <span className="material-symbols-outlined text-[14px]">code</span>Review
                          Code
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 7: LEADERBOARD PREVIEW */}
                <section
                  id="leaderboard"
                  className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm scroll-mt-20"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">leaderboard</span>
                      </div>
                      <div>
                        <h2 className="font-title-md text-title-md text-on-surface font-bold">
                          Leaderboard Standing
                        </h2>
                        <span className="font-label-md text-label-md text-outline">
                          IGDTUW Distributed Cohort 2024
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-code-tech text-[12px] font-bold">
                      Rank {displayRank} Campus-Wide
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    {[
                      {
                        rank: "#1",
                        initials: "AK",
                        name: "Ananya Kapoor",
                        sub: "Distributed Store",
                        xp: "3,120 XP",
                      },
                      {
                        rank: "#2",
                        initials: "TM",
                        name: "Tanvi Mishra",
                        sub: "Raft Consensus",
                        xp: "2,995 XP",
                      },
                      {
                        rank: "#3",
                        initials: "PG",
                        name: "Pooja Gupta",
                        sub: "gRPC Microservices",
                        xp: "2,890 XP",
                      },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low"
                      >
                        <div className="flex items-center gap-space-sm min-w-0">
                          <span className="w-6 font-code-tech font-bold text-outline text-center">
                            {row.rank}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-[12px] text-primary shrink-0">
                            {row.initials}
                          </div>
                          <div className="truncate">
                            <span className="font-label-md text-label-md font-bold text-on-surface block truncate">
                              {row.name}
                            </span>
                            <span className="font-code-tech text-[11px] text-outline">
                              {row.sub}
                            </span>
                          </div>
                        </div>
                        <span className="font-code-tech text-code-tech font-bold text-on-surface shrink-0">
                          {row.xp}
                        </span>
                      </div>
                    ))}

                    {/* Highlighted User Row */}
                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-primary-fixed/40 border-l-4 border-primary">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span className="w-6 font-code-tech font-bold text-primary text-center">
                          {displayRank}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[12px] shrink-0">
                          {displayName[0]}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-label-md font-bold text-primary truncate">
                              {displayName} (You)
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          </div>
                          <span className="font-code-tech text-[11px] text-on-primary-fixed-variant">
                            {displayStreak} Streak
                          </span>
                        </div>
                      </div>
                      <span className="font-code-tech text-code-tech font-bold text-primary shrink-0">
                        {displayXP} XP
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* PROJECT SUBMIT MODAL */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl bg-surface-container-lowest p-space-lg shadow-xl border border-outline-variant/30 text-on-surface">
            <div className="flex items-start justify-between pb-3 border-b border-surface-container">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Submit Project Deliverable
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="flex flex-col gap-space-md pt-space-md">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Deliverable Link (GitHub PR, Repository, or Deployed Demo){" "}
                  <span className="text-error">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  placeholder="https://github.com/igdtuw-mentee/raft-kv-store/pull/1"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-on-surface transition-all"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Notes for Mentor Dr. Radhika Sen
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Summarize test results, benchmarking throughput, or specific edge-cases tested (e.g. network partition recovery)."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-outline-variant/60 bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all resize-none"
                ></textarea>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-outline/30 hover:bg-surface-container font-label-md text-label-md font-semibold text-on-surface transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  {submitting ? "Submitted!" : "Confirm Submission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}