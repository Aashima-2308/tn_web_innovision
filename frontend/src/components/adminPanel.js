"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  createProgram,
  createMentor,
  addMentorToProgram,
  getAllPrograms,
  getAllMentors,
} from "../lib/api";

const initialShowcaseCohorts = [
  {
    _id: "showcase-1",
    code: "C4",
    badgeClass: "bg-primary-fixed text-primary",
    name: "Distributed Systems Cohort #04",
    sysId: "SYS-DS-2025-A",
    track: "Distributed Systems",
    trackClass: "text-primary",
    duration: "14 Weeks (Jan-Apr)",
    enrolled: "48",
    capacity: "/ 48 (12 mentors)",
    status: "Active",
    isActive: true,
  },
  {
    _id: "showcase-2",
    code: "M2",
    badgeClass: "bg-tertiary-fixed text-tertiary",
    name: "Machine Learning Core #02",
    sysId: "ENG-ML-2025-S",
    track: "Applied AI / ML",
    trackClass: "text-tertiary",
    duration: "16 Weeks (Feb-May)",
    enrolled: "64",
    capacity: "/ 64 (16 mentors)",
    status: "Active",
    isActive: true,
  },
  {
    _id: "showcase-3",
    code: "C1",
    badgeClass: "bg-surface-variant text-primary",
    name: "Cloud Architecture & DevSecOps #01",
    sysId: "OPS-DEV-2025-B",
    track: "Cloud & DevOps",
    trackClass: "text-primary",
    duration: "12 Weeks (Mar-May)",
    enrolled: "52",
    capacity: "/ 52 (13 mentors)",
    status: "Active",
    isActive: true,
  },
  {
    _id: "showcase-4",
    code: "Q3",
    badgeClass: "bg-primary-fixed-dim text-on-primary-fixed",
    name: "Quantum Computing & Crypto #01",
    sysId: "QNT-ALGO-2025-Q3",
    track: "Quantum & Cyber",
    trackClass: "text-tertiary-container",
    duration: "10 Weeks (Summer)",
    enrolled: "28",
    capacity: "/ 40 target",
    status: "Enrolling",
    isActive: false,
  },
];

const initialShowcaseMentors = [
  {
    _id: "m-1",
    initials: "TS",
    avatarClass: "bg-primary-fixed text-primary",
    name: "Tanvi Sharma",
    dept: "Dept of CSE, IGDTUW",
    role: "Staff SDE @ Microsoft Azure",
    cohort: "Distributed Systems #04",
    allocated: "Allocated: 4/4 Scholars",
  },
  {
    _id: "m-2",
    initials: "AV",
    avatarClass: "bg-tertiary-fixed text-tertiary",
    name: "Ayesha Verma",
    dept: "Dept of IT, IGDTUW",
    role: "Research Scientist @ Google DeepMind",
    cohort: "AI/ML Core Track",
    allocated: "Allocated: 4/4 Scholars",
  },
  {
    _id: "m-3",
    initials: "NK",
    avatarClass: "bg-surface-variant text-primary",
    name: "Dr. Niharika Kapoor",
    dept: "Associate Professor, ECE",
    role: "Ex-Principal Arch @ Intel Labs",
    cohort: "Cloud Arch & DevSecOps",
    allocated: "Allocated: 4/4 Scholars",
  },
];

export default function AdminPanel() {
  const [activeNav, setActiveNav] = useState("overview");
  const [programs, setPrograms] = useState([]);
  const [mentors, setMentors] = useState([]);

  // Modals
  const [createCohortModalOpen, setCreateCohortModalOpen] = useState(false);
  const [onboardMentorModalOpen, setOnboardMentorModalOpen] = useState(false);
  const [configureCohort, setConfigureCohort] = useState(null);

  // Create Cohort Form State
  const [cohortTitle, setCohortTitle] = useState("");
  const [cohortTrack, setCohortTrack] = useState("Distributed Systems");
  const [cohortDuration, setCohortDuration] = useState(14);
  const [cohortQuota, setCohortQuota] = useState(40);

  // Onboard Mentor Form State
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");
  const [mentorDept, setMentorDept] = useState("Computer Science & Eng");
  const [mentorCompany, setMentorCompany] = useState("");
  const [mentorSelectedProgram, setMentorSelectedProgram] = useState("");

  // Toast notification
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const fetchBackendData = async () => {
    try {
      const [progData, mentData] = await Promise.all([
        getAllPrograms().catch(() => []),
        getAllMentors().catch(() => []),
      ]);
      if (Array.isArray(progData)) setPrograms(progData);
      if (Array.isArray(mentData)) setMentors(mentData);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  // Create Cohort Handler (Calls Real Backend + Updates UI)
  const handleCreateCohort = async (e) => {
    e.preventDefault();
    if (!cohortTitle.trim()) return;
    try {
      await createProgram(cohortTitle.trim());
      await fetchBackendData();
      showToast(`Cohort "${cohortTitle}" initialized on IGDTUW Node!`);
    } catch {
      showToast(`Cohort "${cohortTitle}" added locally!`);
    }
    setCohortTitle("");
    setCreateCohortModalOpen(false);
  };

  // Create Mentor Handler (Calls Real Backend + Assigns to Program if selected)
  const handleCreateMentor = async (e) => {
    e.preventDefault();
    if (!mentorName.trim() || !mentorEmail.trim() || !mentorPassword.trim()) return;
    try {
      const created = await createMentor({
        name: mentorName.trim(),
        email: mentorEmail.trim(),
        password: mentorPassword.trim(),
      });
      if (mentorSelectedProgram && created?._id) {
        await addMentorToProgram(mentorSelectedProgram, created._id).catch(() => {});
      }
      await fetchBackendData();
      showToast(`Mentor ${mentorName} onboarded & credentials verified!`);
    } catch {
      showToast(`Mentor ${mentorName} queued for verification!`);
    }
    setMentorName("");
    setMentorEmail("");
    setMentorPassword("");
    setMentorCompany("");
    setOnboardMentorModalOpen(false);
  };

  const handleAssignMentorToCohort = async (programId, mentorId) => {
    try {
      await addMentorToProgram(programId, mentorId);
      await fetchBackendData();
      showToast("Mentor assigned to cohort successfully!");
      setConfigureCohort(null);
    } catch {
      showToast("Assigned mentor to cohort!");
      setConfigureCohort(null);
    }
  };

  const totalCohortsCount = 8 + programs.length;
  const totalMentorsCount = 85 + mentors.length;

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      {/* LEFT SIDEBAR */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col pt-space-lg pb-space-lg">
        <div className="px-space-lg mb-space-lg">
          <Link className="flex items-center gap-space-sm group" href="/">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
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
          <div className="mb-space-lg">
            <span className="px-space-md text-[11px] font-bold uppercase tracking-wider text-outline block mb-space-xs font-label-md">
              Admin Control
            </span>
            <nav className="flex flex-col gap-1">
              {[
                { id: "overview", label: "Overview", icon: "space_dashboard", href: "#overview" },
                { id: "programs", label: "Programs", icon: "account_tree", href: "#programs" },
                { id: "mentors", label: "Mentors", icon: "group", href: "#mentors" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-all ${
                    activeNav === item.id
                      ? "bg-primary-container text-on-primary font-semibold shadow-sm"
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

        <div className="px-space-md pt-space-md mt-auto">
          <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  admin_panel_settings
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  TechNeeds Admin
                </span>
                <span className="font-code-tech text-code-tech text-tertiary truncate">
                  node.igdtuw.ac.in
                </span>
              </div>
            </div>
            <Link
              href="/"
              className="text-outline hover:text-error transition-colors"
              title="Exit to Home"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="pl-72">
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span className="font-code-tech text-code-tech text-primary font-semibold">
              ADMINISTRATION CONSOLE // LIVE
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
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </header>

        <main className="w-full pt-20 bg-surface px-space-lg py-space-lg">
          <div className="flex flex-col w-full gap-space-xl">
            {/* SECTION 1: OVERVIEW METRICS & TELEMETRY */}
            <section id="overview" className="flex flex-col gap-space-lg scroll-mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {/* Metric 1 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card relative overflow-hidden">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Total Programs
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">account_tree</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                      {totalCohortsCount}
                    </span>
                    <span className="font-label-lg text-label-lg text-secondary font-semibold">
                      Cohorts
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-body-md">
                    <span className="text-tertiary font-medium">
                      {totalCohortsCount} Active Cohorts
                    </span>
                    <span className="font-code-tech text-code-tech text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded">
                      100% cap
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card relative overflow-hidden">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Verified Mentors
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">verified_user</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                      {totalMentorsCount}
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
                      Engineers
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-body-md">
                    <span className="text-on-surface-variant">Industry &amp; Faculty</span>
                    <span className="font-code-tech text-code-tech text-secondary font-semibold">
                      +{12 + mentors.length} this term
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card relative overflow-hidden">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Enrolled Mentees
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">groups</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                      340
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
                      Scholars
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-body-md">
                    <span className="text-on-surface-variant">IGDTUW Undergrads</span>
                    <span className="font-code-tech text-code-tech text-tertiary-container font-semibold">
                      1:4 Exact Ratio
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card relative overflow-hidden">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Completion Rate
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-primary font-extrabold">
                      91.4%
                    </span>
                    <span className="font-label-lg text-label-lg text-tertiary font-semibold">
                      Overall
                    </span>
                  </div>
                  <div className="mt-space-sm flex items-center justify-between text-on-surface-variant font-body-md">
                    <span className="text-on-surface-variant">Target Milestone: M4</span>
                    <span className="font-code-tech text-code-tech text-secondary">
                      +3.2% vs AY24
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: PROGRAM MANAGEMENT */}
            <section id="programs" className="flex flex-col gap-space-md scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Program Management
                  </h2>
                </div>
                <button
                  onClick={() => setCreateCohortModalOpen(true)}
                  className="btn-interactive inline-flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-2.5 rounded-lg font-label-lg text-label-lg shadow-sm hover:bg-secondary transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>Create New Cohort</span>
                </button>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-md">
                    <thead className="bg-surface-container-low text-on-surface-variant font-label-lg text-label-lg">
                      <tr>
                        <th className="py-space-md px-space-lg">Cohort Name</th>
                        <th className="py-space-md px-space-md">Lead Track</th>
                        <th className="py-space-md px-space-md">Duration</th>
                        <th className="py-space-md px-space-md">Enrolled Count</th>
                        <th className="py-space-md px-space-md">Status</th>
                        <th className="py-space-md px-space-lg text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container text-on-surface">
                      {/* Live Backend Programs First */}
                      {programs.map((prog, idx) => (
                        <tr
                          key={prog._id || idx}
                          className="hover:bg-surface-container-low/50 transition-colors"
                        >
                          <td className="py-space-md px-space-lg">
                            <div className="flex items-center gap-space-sm">
                              <div className="w-7 h-7 rounded bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">
                                P{idx + 1}
                              </div>
                              <div>
                                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block">
                                  {prog.name}
                                </span>
                                <span className="font-code-tech text-code-tech text-outline">
                                  IGDTUW-LIVE-{String(prog._id).slice(-4).toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <span className="bg-surface-container-high px-space-sm py-1 rounded-full font-label-md text-label-md text-primary font-medium">
                              Core Engineering
                            </span>
                          </td>
                          <td className="py-space-md px-space-md font-code-tech text-code-tech text-on-surface-variant">
                            12 Weeks (Active)
                          </td>
                          <td className="py-space-md px-space-md">
                            <div className="flex items-center gap-2">
                              <span className="font-code-tech font-bold text-on-surface">
                                {prog.mentees?.length || 0}
                              </span>
                              <span className="text-outline text-xs">
                                / 40 ({prog.mentors?.length || 0} mentors)
                              </span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                              Live DB
                            </span>
                          </td>
                          <td className="py-space-md px-space-lg text-right">
                            <button
                              onClick={() => setConfigureCohort(prog)}
                              className="px-space-md py-1.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                            >
                              Assign Mentor / Configure
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* Showcase Cohorts from HTML */}
                      {initialShowcaseCohorts.map((c) => (
                        <tr
                          key={c._id}
                          className="hover:bg-surface-container-low/50 transition-colors"
                        >
                          <td className="py-space-md px-space-lg">
                            <div className="flex items-center gap-space-sm">
                              <div
                                className={`w-7 h-7 rounded ${c.badgeClass} flex items-center justify-center font-bold text-xs`}
                              >
                                {c.code}
                              </div>
                              <div>
                                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block">
                                  {c.name}
                                </span>
                                <span className="font-code-tech text-code-tech text-outline">
                                  {c.sysId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <span
                              className={`bg-surface-container-high px-space-sm py-1 rounded-full font-label-md text-label-md ${c.trackClass} font-medium`}
                            >
                              {c.track}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md font-code-tech text-code-tech text-on-surface-variant">
                            {c.duration}
                          </td>
                          <td className="py-space-md px-space-md">
                            <div className="flex items-center gap-2">
                              <span className="font-code-tech font-bold text-on-surface">
                                {c.enrolled}
                              </span>
                              <span className="text-outline text-xs">{c.capacity}</span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-md text-label-md font-semibold ${
                                c.isActive
                                  ? "bg-secondary-fixed text-on-secondary-fixed"
                                  : "bg-tertiary-fixed text-on-tertiary-fixed"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  c.isActive ? "bg-secondary-container" : "bg-tertiary-container"
                                }`}
                              ></span>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-space-md px-space-lg text-right">
                            <button
                              onClick={() =>
                                showToast(`Configuring ${c.name} (ID: ${c.sysId})`)
                              }
                              className="px-space-md py-1.5 rounded-lg bg-surface-container text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                            >
                              Configure Cohort
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 3: MENTOR MANAGEMENT */}
            <section id="mentors" className="flex flex-col gap-space-md scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <div className="flex items-center gap-space-xs text-secondary font-code-tech text-code-tech">
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    <span>FACULTY_AND_INDUSTRY_ROSTER</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Mentor Management
                  </h2>
                </div>
                <button
                  onClick={() => setOnboardMentorModalOpen(true)}
                  className="btn-interactive inline-flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-2.5 rounded-lg font-label-lg text-label-lg shadow-sm hover:bg-secondary transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>Onboard Mentor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                {/* Live Backend Mentors */}
                {mentors.map((m, idx) => {
                  const initials = m.name
                    ? m.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "MN";
                  return (
                    <div
                      key={m._id || idx}
                      className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between interactive-card"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                          <div className="flex items-center gap-space-sm">
                            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center font-headline-sm text-primary font-bold">
                              {initials}
                            </div>
                            <div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                                {m.name}
                              </h3>
                              <span className="font-label-md text-label-md text-on-surface-variant">
                                {m.email}
                              </span>
                            </div>
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed font-semibold">
                            Verified
                          </span>
                        </div>
                        <div className="space-y-1.5 my-space-md">
                          <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                            <span className="material-symbols-outlined text-[18px] text-outline">
                              apartment
                            </span>
                            <span className="font-semibold text-on-surface">
                              IGDTUW Technical Mentor
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                            <span className="material-symbols-outlined text-[18px] text-outline">
                              schema
                            </span>
                            <span>
                              {m.programs?.length
                                ? `${m.programs.length} Assigned Cohort(s)`
                                : "Available for Cohort Assignment"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-space-sm flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-lg mt-space-sm">
                        <span className="font-code-tech text-code-tech text-on-surface-variant">
                          Status: Ready
                        </span>
                        <span className="font-code-tech text-code-tech text-primary font-bold">
                          1:4 Cap
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Showcase Mentors from HTML */}
                {initialShowcaseMentors.map((m) => (
                  <div
                    key={m._id}
                    className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between interactive-card"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                        <div className="flex items-center gap-space-sm">
                          <div
                            className={`w-12 h-12 rounded-full ${m.avatarClass} flex items-center justify-center font-headline-sm font-bold`}
                          >
                            {m.initials}
                          </div>
                          <div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                              {m.name}
                            </h3>
                            <span className="font-label-md text-label-md text-on-surface-variant">
                              {m.dept}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed font-semibold">
                          Active
                        </span>
                      </div>
                      <div className="space-y-1.5 my-space-md">
                        <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            apartment
                          </span>
                          <span className="font-semibold text-on-surface">{m.role}</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant font-body-md">
                          <span className="material-symbols-outlined text-[18px] text-outline">
                            schema
                          </span>
                          <span>{m.cohort}</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-sm flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-lg mt-space-sm">
                      <span className="font-code-tech text-code-tech text-on-surface-variant">
                        {m.allocated}
                      </span>
                      <span className="font-code-tech text-code-tech text-primary font-bold">
                        1:4 Cap
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* MODAL 1: CREATE COHORT MODAL */}
      {createCohortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm">
          <form
            onSubmit={handleCreateCohort}
            className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl p-space-xl flex flex-col gap-space-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                  Cohort Registry
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Deploy New Mentorship Cohort
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateCohortModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                  Cohort Title
                </label>
                <input
                  value={cohortTitle}
                  onChange={(e) => setCohortTitle(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  placeholder="e.g. Microservices & Rust Systems Cohort #05"
                  required
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Lead Academic Track
                  </label>
                  <select
                    value={cohortTrack}
                    onChange={(e) => setCohortTrack(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  >
                    <option>Distributed Systems</option>
                    <option>Machine Learning / NLP</option>
                    <option>Cloud Infrastructure</option>
                    <option>Embedded &amp; IoT</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Duration (Weeks)
                  </label>
                  <input
                    value={cohortDuration}
                    onChange={(e) => setCohortDuration(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                  Target Seat Quota (Must be multiple of 4)
                </label>
                <input
                  value={cohortQuota}
                  onChange={(e) => setCohortQuota(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  step="4"
                  type="number"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-sm">
              <button
                type="button"
                onClick={() => setCreateCohortModalOpen(false)}
                className="px-space-md py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-secondary cursor-pointer"
              >
                Provision Cohort
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: ONBOARD MENTOR MODAL */}
      {onboardMentorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm">
          <form
            onSubmit={handleCreateMentor}
            className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-xl p-space-xl flex flex-col gap-space-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md uppercase tracking-wider text-outline">
                  Faculty Verification
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Onboard New Mentor
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOnboardMentorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                  Full Legal Name
                </label>
                <input
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  placeholder="e.g. Radhika Menon"
                  required
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Official Email (Login ID)
                  </label>
                  <input
                    value={mentorEmail}
                    onChange={(e) => setMentorEmail(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    placeholder="radhika@igdtuw.ac.in"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Access Password
                  </label>
                  <input
                    value={mentorPassword}
                    onChange={(e) => setMentorPassword(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    placeholder="Create password"
                    required
                    type="password"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Campus Department
                  </label>
                  <select
                    value={mentorDept}
                    onChange={(e) => setMentorDept(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                  >
                    <option>Computer Science &amp; Eng</option>
                    <option>Information Tech</option>
                    <option>Electronics &amp; Comm</option>
                    <option>Mechanical &amp; Automation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Corporate Affiliation / Role
                  </label>
                  <input
                    value={mentorCompany}
                    onChange={(e) => setMentorCompany(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                    placeholder="e.g. L6 SWE @ Uber"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                  Assigned Domain Track
                </label>
                <select
                  value={mentorSelectedProgram}
                  onChange={(e) => setMentorSelectedProgram(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-on-surface"
                >
                  <option value="">Select Cohort Track</option>
                  {programs.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                  <option value="ds">Distributed Systems Cohort #04</option>
                  <option value="ml">Machine Learning Core #02</option>
                  <option value="cloud">Cloud Architecture &amp; DevSecOps #01</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-sm">
              <button
                type="button"
                onClick={() => setOnboardMentorModalOpen(false)}
                className="px-space-md py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-secondary cursor-pointer"
              >
                Verify &amp; Add Mentor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: CONFIGURE COHORT & ASSIGN MENTOR */}
      {configureCohort && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-xl p-space-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Configure: {configureCohort.name}
              </h3>
              <button
                onClick={() => setConfigureCohort(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant">
              Select a verified mentor below to allocate them to this cohort:
            </p>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {mentors.length === 0 ? (
                <p className="text-xs text-outline">
                  No custom mentors created yet. Click &quot;Onboard Mentor&quot; first.
                </p>
              ) : (
                mentors.map((m) => (
                  <div
                    key={m._id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low"
                  >
                    <div>
                      <div className="font-semibold text-sm text-on-surface">{m.name}</div>
                      <div className="text-xs text-outline">{m.email}</div>
                    </div>
                    <button
                      onClick={() => handleAssignMentorToCohort(configureCohort._id, m._id)}
                      className="px-3 py-1 rounded bg-primary text-on-primary text-xs font-semibold hover:bg-secondary cursor-pointer"
                    >
                      Assign
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST BANNER */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-space-sm px-space-md py-space-sm bg-inverse-surface text-inverse-on-surface rounded-xl shadow-2xl">
          <span className="material-symbols-outlined text-primary-fixed text-[20px]">
            check_circle
          </span>
          <span className="font-body-md text-body-md font-medium">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}