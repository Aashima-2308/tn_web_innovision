"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const allInterestTags = [
  { id: "distributed", label: "Distributed Systems", score: 96 },
  { id: "go", label: "Go Concurrency", score: 94 },
  { id: "cloud", label: "Cloud & Kubernetes", score: 89 },
  { id: "ai", label: "Applied AI & LLMs", score: 85 },
  { id: "cpp", label: "C++20 Algorithms", score: 92 },
  { id: "web", label: "Full-Stack Next.js", score: 88 },
];

const aiPersonas = [
  {
    archetype: "Distributed Systems Architect",
    badge: "SYSTEMS TIER // S-RANK",
    summary:
      "Based on your 96.5% quiz accuracy in Raft Consensus and 14-day consistency streak, our AI engine classifies your learning velocity in the Top 4% of IGDTUW Cohort #04. You excel at concurrent state machines and zero-allocation gRPC pipelines.",
    avatarSeed: "RheaSystems",
    accent: "from-primary via-primary-container to-secondary-container",
  },
  {
    archetype: "Neural & Cloud Infrastructure Lead",
    badge: "AI-SYSTEMS // A+ RANK",
    summary:
      "Cross-analyzing your completed video masterclasses and multi-stage Docker PRs shows high proficiency in scalable ML inference and containerized microservices. Recommended focus: Byzantine fault tolerance and CUDA kernel scheduling.",
    avatarSeed: "RheaCloudAI",
    accent: "from-secondary via-primary to-tertiary-container",
  },
  {
    archetype: "High-Frequency Algorithmic Engineer",
    badge: "ALGO KERNEL // S-RANK",
    summary:
      "Your rapid completion of lock-free data structure modules and 48.5/50 quiz average indicates strong algorithmic rigor. You consistently submit pull requests 36 hours ahead of cohort deadlines with zero race-condition flags.",
    avatarSeed: "RheaAlgo",
    accent: "from-tertiary-container via-primary to-secondary",
  },
];

const skillBadges = [
  {
    icon: "Memory",
    title: "Raft Consensus Master",
    tier: "Gold Tier • Top 2%",
    desc: "Passed 100 iterations of go test -race with zero goroutine leaks.",
    color: "bg-primary-fixed text-primary",
  },
  {
    icon: "local_fire_department",
    title: "14-Day Streak Sniper",
    tier: "Consistency Award",
    desc: "Maintained unbroken daily module engagement across 2 sprint weeks.",
    color: "bg-error-container text-error",
  },
  {
    icon: "military_tech",
    title: "Quiz Precision 97%",
    tier: "Academic Excellence",
    desc: "Scored 48.5/50 average across Distributed & Concurrency evaluations.",
    color: "bg-secondary-fixed text-secondary",
  },
  {
    icon: "terminal",
    title: "Clean PR Architect",
    tier: "Mentor Verified",
    desc: "Docker multi-stage binary optimization commended by Dr. Radhika Sen.",
    color: "bg-tertiary-fixed text-tertiary",
  },
];

const recommendationsByTag = {
  distributed: {
    type: "CAPSTONE LAB",
    title: "ShardKV: Multi-Raft Group Dynamic Rebalancing",
    reason: "Matches your 95/100 score in Module 04 (Goroutines) & Rank #4 standing",
    xp: "+150 XP",
    link: "/dashboard",
  },
  go: {
    type: "VIDEO MASTERCLASS",
    title: "Zero-Copy Protobuf Marshaling & gRPC Streams",
    reason: "Recommended next step after completing Go Concurrency Patterns Quiz",
    xp: "+80 XP",
    link: "/dashboard",
  },
  cloud: {
    type: "ASSESSMENT QUIZ",
    title: "Kubernetes CNI & eBPF Service Mesh Internals",
    reason: "Builds on your 98/100 Docker Microservices project verification",
    xp: "+50 XP",
    link: "/dashboard",
  },
  ai: {
    type: "HANDS-ON PROJECT",
    title: "Distributed Tensor Parallelism & vLLM Inference Node",
    reason: "Bridges your Distributed Systems track with Applied AI interest tag",
    xp: "+120 XP",
    link: "/dashboard",
  },
  cpp: {
    type: "ALGO CHALLENGE",
    title: "Lock-Free Ring Buffers & SIMD Graph Traversal in C++20",
    reason: "High-impact competitive systems challenge to push you to Rank #1",
    xp: "+100 XP",
    link: "/dashboard",
  },
  web: {
    type: "SYSTEM DESIGN",
    title: "Edge-Cached Next.js 15 & WebSocket Telemetry Pipelines",
    reason: "Full-stack observability module tailored to your UI/UX velocity",
    xp: "+90 XP",
    link: "/dashboard",
  },
};

const defaultAnalytics = [
  { week: "Wk 01", score: 68, avg: 60 },
  { week: "Wk 02", score: 75, avg: 64 },
  { week: "Wk 03", score: 84, avg: 68 },
  { week: "Wk 04", score: 89, avg: 71 },
  { week: "Wk 05", score: 94, avg: 74 },
  { week: "Wk 06", score: 98, avg: 78 },
];

export default function UserProfile() {
  const [mentee, setMentee] = useState(null);
  const [personaIdx, setPersonaIdx] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedTags, setSelectedTags] = useState(["distributed", "go", "cloud", "cpp"]);
  const [copiedShare, setCopiedShare] = useState(false);

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

  const triggerAISynthesis = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setPersonaIdx((prev) => (prev + 1) % aiPersonas.length);
      setIsSynthesizing(false);
    }, 650);
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.length > 1 ? prev.filter((t) => t !== tagId) : prev;
      }
      return [...prev, tagId];
    });
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const currentPersona = aiPersonas[personaIdx];
  const displayName = mentee?.name || "Rhea Mehra";
  const displayEmail = mentee?.email || "rhea.mehra@igdtuw.ac.in";
  const displayRank = mentee?.rank !== undefined ? `#${mentee.rank}` : "#4";
  const displayScore = mentee?.totalScore !== undefined ? `${mentee.totalScore}` : "2,840";
  const displayStreak = mentee?.streak !== undefined ? `${mentee.streak} Days` : "14 Days";
  const displayCompleted =
    mentee?.completedResources?.length !== undefined
      ? `${mentee.completedResources.length}`
      : "17 / 25";

  const activeRecommendations = selectedTags
    .map((id) => recommendationsByTag[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="min-h-screen w-full px-margin py-space-xl bg-surface relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-space-xl">
        {/* TOP BAR: Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary-fixed/70 border border-primary/20 text-primary font-code-tech text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              AI-GENERATED DEVELOPER PASSPORT // IGDTUW
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <Link
              href="/dashboard"
              className="btn-interactive px-space-md py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-label-md text-xs font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">space_dashboard</span>
              <span>Mentee Dashboard</span>
            </Link>
            <button
              onClick={handleShareProfile}
              className="btn-interactive px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedShare ? "check" : "share"}
              </span>
              <span>{copiedShare ? "Profile Link Copied!" : "Share AI Passport"}</span>
            </button>
          </div>
        </div>

        {/* 1. HERO AI PERSONA & DYNAMIC AVATAR CARD */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${currentPersona.accent} p-space-xl text-on-primary shadow-xl transition-all duration-500`}
        >
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center relative z-10">
            {/* Dynamic AI Avatar with Orbital Ring */}
            <div className="lg:col-span-3 flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 animate-spin-slow"
                ></div>
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-surface-container-lowest p-1 shadow-2xl animate-float">
                  <img
                    src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${currentPersona.avatarSeed}`}
                    alt="Dynamic AI Avatar"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-primary font-code-tech text-[10px] font-bold shadow-md">
                  AI AVATAR v4.2
                </span>
              </div>
            </div>

            {/* AI Persona Synthesis & Archetype */}
            <div className="lg:col-span-9 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md font-code-tech text-xs font-bold tracking-wider uppercase">
                  {currentPersona.badge}
                </span>
                <button
                  onClick={triggerAISynthesis}
                  disabled={isSynthesizing}
                  className="btn-interactive px-3.5 py-1.5 rounded-lg bg-white text-primary font-label-md text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isSynthesizing ? "animate-spin" : ""
                    }`}
                  >
                    auto_awesome
                  </span>
                  <span>
                    {isSynthesizing ? "Synthesizing Telemetry..." : "Regenerate AI Insights"}
                  </span>
                </button>
              </div>

              <h1 className="font-headline-lg text-headline-lg font-extrabold tracking-tight">
                {displayName}
              </h1>
              <p className="font-title-md text-title-md text-primary-fixed font-semibold mt-0.5 mb-space-md">
                AI Archetype: {currentPersona.archetype} • {displayEmail}
              </p>

              {/* AI-Generated Performance Summary Box */}
              <div className="p-space-md rounded-xl bg-black/20 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-1.5 text-xs font-code-tech text-primary-fixed uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-[15px]">psychology</span>
                  <span>AI Executive Performance Summary</span>
                </div>
                <p className="font-body-md text-sm text-white/95 leading-relaxed">
                  {currentPersona.summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TELEMETRY KPI STRIP (Rank, Total Score, Streak, Completed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {[
            {
              label: "Campus Leaderboard",
              value: displayRank,
              sub: "Top 4% in Cohort #04",
              icon: "leaderboard",
            },
            {
              label: "Total Earned Score",
              value: `${displayScore} XP`,
              sub: "+340 XP this sprint",
              icon: "emoji_events",
            },
            {
              label: "Consistency Streak",
              value: displayStreak,
              sub: "Unbroken daily commits",
              icon: "local_fire_department",
            },
            {
              label: "Modules Completed",
              value: displayCompleted,
              sub: "96.5% Avg Quiz Accuracy",
              icon: "task_alt",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="interactive-card bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                  {stat.label}
                </span>
                <div className="w-9 h-9 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                </div>
              </div>
              <div className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                {stat.value}
              </div>
              <span className="font-code-tech text-xs text-primary font-semibold mt-1">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* 3. INTERACTIVE INTEREST TAGS & SKILL PROFICIENCY MATRIX + ANALYTICS CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left 5 Cols: Interactive Interest Tags & Skill Bars */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface">
                    Interest Tags &amp; Skill Telemetry
                  </h2>
                </div>
                <span className="font-code-tech text-[11px] text-primary bg-primary-fixed px-2 py-0.5 rounded-full font-bold">
                   Interactive
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-space-md">
                Toggle your technical interest tags below to dynamically recalibrate your AI
                learning recommendations:
              </p>

              {/* Interactive Interest Tag Pills */}
              <div className="flex flex-wrap gap-2 mb-space-lg">
                {allInterestTags.map((tag) => {
                  const active = selectedTags.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      type="button"
                      className={`btn-interactive px-3 py-1.5 rounded-full font-label-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {active ? "check_circle" : "add"}
                      </span>
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Skill Proficiency Bars for Active Tags */}
              <div className="space-y-3">
                {allInterestTags
                  .filter((t) => selectedTags.includes(t.id))
                  .map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-on-surface">{skill.label}</span>
                        <span className="font-code-tech text-primary">{skill.score}% Mastery</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary-container transition-all duration-500"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Recharts Score & Velocity Trajectory */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  monitoring
                </span>
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface">
                    Cohort Learning Velocity vs. Campus Average
                  </h2>
                  <span className="font-label-md text-xs text-outline">
                    Real-time score progression across completed Videos, Quizzes &amp; PRs
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-secondary font-code-tech text-xs font-bold">
                +20% Above Avg
              </span>
            </div>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={defaultAnalytics}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003fb1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#003fb1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e3e7ff" />
                  <XAxis dataKey="week" stroke="#737686" fontSize={12} />
                  <YAxis stroke="#737686" fontSize={12} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    name="Your Score"
                    stroke="#003fb1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#scoreGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="avg"
                    name="Cohort Avg"
                    stroke="#737686"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4. PERSONALIZED SKILL BADGES */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                workspace_premium
              </span>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">
                AI-Verified Skill Badges &amp; Achievements
              </h2>
            </div>
            <span className="font-code-tech text-xs text-outline">4 / 4 Unlocked</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {skillBadges.map((b, i) => (
              <div
                key={i}
                className="offer-pill-anim p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`offer-pill-icon w-11 h-11 rounded-xl ${b.color} flex items-center justify-center shadow-sm`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{b.icon}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest font-code-tech text-[10px] text-primary font-bold">
                      {b.tier}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] font-bold text-on-surface mb-1">
                    {b.title}
                  </h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. AI-PERSONALIZED LEARNING RECOMMENDATIONS */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                lightbulb
              </span>
              <div>
                <h2 className="font-title-md text-title-md font-bold text-on-surface">
                  AI-Personalized Next Learning Recommendations
                </h2>
                <span className="font-label-md text-xs text-outline">
                  Dynamically tailored from your active interest tags, leaderboard rank &amp; quiz
                  telemetry
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {activeRecommendations.map((rec, idx) => (
              <div
                key={idx}
                className="interactive-card p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-code-tech text-[10px] font-bold">
                      {rec.type}
                    </span>
                    <span className="font-code-tech text-xs font-bold text-secondary">
                      {rec.xp}
                    </span>
                  </div>
                  <h4 className="font-title-md text-[15px] font-bold text-on-surface mb-1.5">
                    {rec.title}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant mb-4">
                    <strong>Why AI picked this:</strong> {rec.reason}
                  </p>
                </div>
                <Link
                  href={rec.link}
                  className="btn-interactive w-full py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs font-bold text-center flex items-center justify-center gap-1"
                >
                  <span>Start Recommended Module</span>
                  <span className="material-symbols-outlined text-[15px] hover-nudge">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}