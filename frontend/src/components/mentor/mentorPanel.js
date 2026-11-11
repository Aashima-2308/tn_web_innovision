"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  addMentee,
  addResource,
  getAllPrograms,
  getProgramMentees,
  getProgramResources,
} from "../../lib/api";

const initialMenteesList = [
  {
    name: "Ananya Verma",
    email: "ananya.v@igdtuw.ac.in",
    enrollId: "IGDTUW/2024/CS012",
    modules: "12 / 12",
    projectStatus: "PR #4 Submitted (Raft)",
    isError: false,
    quizScore: "48.5 / 50",
    lastActive: "12 mins ago",
    progress: "98%",
    notes: "Ready for Sprint Defense",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTFbWvVPyNHnfxjsxJ1I6ZI83bwePlJjx19bCNngfyif7QC70eBIr9NXtaz6yyrAnXXUnU91xmm7Y7VEoamay6d4wHbWGcbMwK-PuxnIAjw0ZZIkidnetLV4yG0XFp9e3u2k5HpFw6KtOVJMV9-qSwFHcMw9NvAQoUw55bJp795PtL-yoS8E22El9cMxinLkR6P7uEXZbIKWb1wjpuHTKNlfHrqX3e8hDNRpX4h9w",
  },
  {
    name: "Priyanshi Singhal",
    email: "priyanshi.s@igdtuw.ac.in",
    enrollId: "IGDTUW/2024/CS034",
    modules: "11 / 12",
    projectStatus: "Under Code Review",
    isError: false,
    quizScore: "46.0 / 50",
    lastActive: "1 hour ago",
    progress: "91%",
    notes: "Pending Consensus Benchmark verification",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvRwUAzNpoZHIgcfK7KFHCKaHQZ-ES05j51gm1g_Yk6xC9aD7N28dhTR2Ea-jul1fePbZRs8B-E_nr-nl5VudJ-R-jtBEFjVMTzEN3UogmGNoZTNqG7JzthmapEpYOXYgEywa_1AlS6dOPUR9yPqEuGIIJDQ_Ct2ze7HArTt8MhYQdLfo9ZjX5ljhxfv4Xl5XkpBEQ4ZuDgRIVYVFKV2MmO44b_6HHyL2pJnPIuUI",
  },
  {
    name: "Sneha Kapoor",
    email: "sneha.k@igdtuw.ac.in",
    enrollId: "IGDTUW/2024/CS041",
    modules: "10 / 12",
    projectStatus: "Needs Debugging Assistance",
    isError: true,
    quizScore: "42.5 / 50",
    lastActive: "3 hours ago",
    progress: "83%",
    notes: "Stuck on Goroutine Deadlock condition in replication engine",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWQbOaIOL7HjpdbSfAFzZWGNJjpTuHZ1zweNcDmAB5L3S6rCF4jSKygTCJDRYFsDT4kJunnXonH-yOb2hLjxeHmws2ym_mGOHwxaF8KT1tBr2IUkP2WMWRYiYkliXCohK-cwbX9l_3q8cApSP4MQfGpO1K38b7zfUXsKD0I6ig8-B-_JYFo4epIBPN0WexUeGJLBxkTtv_N8fiKh_CHuzw8ttbUGZlXl0uq9rPuQ",
  },
  {
    name: "Riya Rawat",
    email: "riya.r@igdtuw.ac.in",
    enrollId: "IGDTUW/2024/CS059",
    modules: "12 / 12",
    projectStatus: "PR #4 Passed CI/CD",
    isError: false,
    quizScore: "49.0 / 50",
    lastActive: "Yesterday",
    progress: "100%",
    notes: "Benchmark speed tests running successfully",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAXhamA3-ADF75LvM1d16fBNZFsAgdCWKTsmJXgRFDiuOVG3mk95-lpx1iYh4rfpwtsmQKp6BzJS3jKO77jjAWbmKeAFJUVRWYVuN8C16NHgHD43kSTWGVSDWmQ76sclmlf4zDpKIMQam6Gsa6uET_EouWBm2jHi7hJVpP2D026lMmWvaeCxM8m-q0lPeTNCs4pQ1bT8He4VYTME1ZUTr75x89zaSAd0lZq9iK2DE",
  },
  {
    name: "Divya Nambiar",
    email: "divya.n@igdtuw.ac.in",
    enrollId: "IGDTUW/2024/CS073",
    modules: "11 / 12",
    projectStatus: "Drafting Final Report",
    isError: false,
    quizScore: "45.5 / 50",
    lastActive: "2 days ago",
    progress: "93%",
    notes: "Report formatting and peer review check in progress",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ1wvZrwuXtr_d1Ws18wmyNrdWlna3es4hGMDTOfPo-sk1BYiCsrxMheE9tBLB3o8VqhPTuimkrY0GggkRBM8mOndydUmUr-NGzRZe2s5sIDIyv_XO3Se3BvxX3lw9-zSf_kuMZUY1243nUIPzm1T9hXpAPUg9eZC47_pYkTLIU6MaP228wbFBz8HxLrNcNuz4X52BAd027Ya971OIKE-xkw5ECQ3mkejQ0DxBdGs",
  },
];

const initialVideosList = [
  {
    module: "MODULE 04",
    duration: "62 mins",
    title: "Mastering Goroutines & Channel Deadlines",
    desc: "Deep dive into Go concurrency primitives, scheduling semantics, context propagation patterns, and backpressure buffer management.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzUPfyVvquinAh5dG6cB1caOnfj2HWmBB_O_lBp7aSpomF8XP4dHuFuSrscRORFUpzDyYqRRCST6KhSWcty6pueaK0GMarr4sm_URdsevGOfwmgwz7lYkB2wyEwlodqC_l3Mil_9OGQXFJEryb_mychTcSkwkDLSoeLJNBPXoog1brQ51gc2zpbwl56_rpuuyqny1d8r0LjZAF43yhuVm6mUaq2SDpqnOjOBq0Rz0",
  },
  {
    module: "MODULE 05",
    duration: "78 mins",
    title: "RPC Frameworks & Protocol Buffers",
    desc: "Constructing low-latency binary protocols over gRPC. Implementing wire-efficient serialization and bi-directional stream framing.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5EeaxfymqxmT0KwfQt0MF8k9JNGCahfGPXW-Xgg6ZRHOdmrQxlGp0FmWoILuWkZPCZFi4r4-v8644yy6mt-VG9rhTqz7Utjx9XC_-UTUTl_BygaJ6hikCCLr1n4JFxk_IS7P_bkQXnf5Xq_-U_IbFvJtzAPqpMGfJhuzy6N9NQQKhsnt005uo_HidRR095I877FF1tYlpH65qWNeD7dJr97GTqyewlNZjc8BBFy4",
  },
  {
    module: "MODULE 06",
    duration: "94 mins",
    title: "Linearizable Consistency Models",
    desc: "Formal verification of read-after-write guarantees. Dissecting CAP theorem trade-offs and Jepsen test suite orchestration.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCty1il6Sj2uyfZ8OPEPRMoVIgBV3WdxuCrY4NIT1I4f7bXOOXQc3R-MDSis1no2f6t-WvoXlARtsxgfQyVwXpiiOBsmcWm7sgPTfJ-056vx-_vrc8xZgGxRrAictNRvyyF7035EQ9Jse-nkrQluIwUCsOP7qJvuWCpPNBX-1J4hvNu5-1mxdZKcMwRvvRVbBw3HfrodstsCujxUghzpVjc_KDA18iqcoNzcDZR8",
  },
];

export default function MentorPanel() {
  const [activeNav, setActiveNav] = useState("mentees");
  const [mentorInfo, setMentorInfo] = useState({ name: "Tanvi Sharma" });
  const [token, setToken] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  // Mentees & Inspection Drawer State
  const [menteesList, setMenteesList] = useState(initialMenteesList);
  const [inspectedMentee, setInspectedMentee] = useState({
    name: "Sneha Kapoor",
    enrollId: "IGDTUW/2024/CS041",
    progress: "83%",
    notes: "Stuck on Goroutine Deadlock condition in replication engine",
  });

  // Add Mentee Form State
  const [menteeFullName, setMenteeFullName] = useState("");
  const [menteeEmail, setMenteeEmail] = useState("");
  const [enrollmentNum, setEnrollmentNum] = useState("IGDTUW/2024/CS088");
  const [tempPassword, setTempPassword] = useState("#Raft-928@K4!");
  const [copied, setCopied] = useState(false);

  // Videos State
  const [videosList, setVideosList] = useState(initialVideosList);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedMentor = localStorage.getItem("mentor");
    if (savedToken) setToken(savedToken);
    if (savedMentor) {
      try {
        const parsed = JSON.parse(savedMentor);
        if (parsed?.name) setMentorInfo(parsed);
        if (parsed?.programs?.[0]) {
          const progId = parsed.programs[0]._id || parsed.programs[0];
          setSelectedProgram(progId);
        }
      } catch {}
    }
  }, []);

  const regenerateEnrollmentId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setEnrollmentNum(`IGDTUW/2024/CS${randomNum}`);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleAddMenteeSubmit = async (e) => {
    e.preventDefault();
    if (!menteeFullName.trim()) return;

    // Try real backend if mentor token exists
    if (token && selectedProgram) {
      try {
        const res = await addMentee(token, {
          email: menteeEmail,
          name: menteeFullName,
          enrollmentNumber: enrollmentNum,
          programId: selectedProgram,
        });
        if (res?.tempPassword) setTempPassword(res.tempPassword);
      } catch {}
    }

    // Add to UI table immediately
    const newMenteeObj = {
      name: menteeFullName,
      email: menteeEmail || "student@igdtuw.ac.in",
      enrollId: enrollmentNum,
      modules: "0 / 12",
      projectStatus: "Onboarded • Awaiting PR #1",
      isError: false,
      quizScore: "— / 50",
      lastActive: "Just now",
      progress: "10%",
      notes: "Newly provisioned scholar in cohort.",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        menteeFullName
      )}&background=003fb1&color=fff`,
    };
    setMenteesList((prev) => [newMenteeObj, ...prev]);
    setMenteeFullName("");
    setMenteeEmail("");
    regenerateEnrollmentId();
  };

  const handleAddVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    if (token && selectedProgram) {
      try {
        await addResource(token, {
          title: videoTitle,
          type: "video",
          url: "https://youtube.com",
          program: selectedProgram,
        });
      } catch {}
    }

    setVideosList((prev) => [
      ...prev,
      {
        module: `MODULE 0${prev.length + 4}`,
        duration: videoDuration || "45 mins",
        title: videoTitle,
        desc: videoDesc || "Custom mentor masterclass uploaded to IGDTUW Hub.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzUPfyVvquinAh5dG6cB1caOnfj2HWmBB_O_lBp7aSpomF8XP4dHuFuSrscRORFUpzDyYqRRCST6KhSWcty6pueaK0GMarr4sm_URdsevGOfwmgwz7lYkB2wyEwlodqC_l3Mil_9OGQXFJEryb_mychTcSkwkDLSoeLJNBPXoog1brQ51gc2zpbwl56_rpuuyqny1d8r0LjZAF43yhuVm6mUaq2SDpqnOjOBq0Rz0",
      },
    ]);
    setVideoTitle("");
    setVideoDuration("");
    setVideoDesc("");
    setSelectedFileName("");
    setShowAddVideoModal(false);
  };

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
          <div className="mb-space-lg">
            <span className="px-space-md text-[11px] font-bold uppercase tracking-wider text-outline block mb-space-xs font-label-md">
              Mentor Track
            </span>
            <nav className="flex flex-col gap-1">
              {[
                { id: "mentees", label: "My Mentees", icon: "diversity_3" },
                { id: "add-mentee", label: "Add Mentee", icon: "person_add" },
                { id: "videos", label: "Videos", icon: "play_circle" },
                { id: "quizzes", label: "Quizzes", icon: "quiz" },
                { id: "projects", label: "Projects", icon: "code" },
                { id: "deadlines", label: "Deadlines & Scores", icon: "event_note" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
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
              MENTOR WORKSPACE
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
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </Link>
          </div>
        </header>

        <main className="w-full pt-20 bg-surface px-space-lg py-space-lg">
          <div className="flex flex-col w-full gap-space-xl pb-16">
            {/* 1. OVERVIEW SECTION */}
            <section className="flex flex-col gap-space-lg scroll-mt-20" id="overview">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary p-space-xl text-on-primary shadow-md">
                <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
                <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-tertiary-container/20 blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="relative shrink-0">
                      <img
                        className="w-20 h-20 rounded-xl object-cover shadow-sm bg-surface-container"
                        alt={mentorInfo.name}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYMswYQqihmuqxbJ_kKcYaiX-fTDadwdJSkbpppq3LAZ4YFEvWGzu72d5nxrhEABXpkVPa9k_CqZLS1u8Ey8qbVXMbxf2eW1e490XxM_0MbtUU2s8d8ND_OqEF_NDu7mVN3I07Kd3ORLZgO1OROiJhXLBkUGa1lUmyNHM6uOQb7MvHZFoIbnFA9YOUuSFKND6UZ50LI6dSC-uO-u15iwlWVlJWfLkwCQBge04wGTc"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-surface-container-lowest px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                        <span className="font-code-tech text-[10px] text-primary font-bold">
                          ONLINE
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-headline-lg text-headline-lg font-bold text-on-primary leading-tight">
                        {mentorInfo.name}
                      </h1>
                      <p className="font-title-md text-title-md text-on-primary-container/90 mt-0.5">
                        Cloud &amp; Distributed Systems Cohort #04
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry Metric Quad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                      Assigned Mentees
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">groups</span>
                    </div>
                  </div>
                  <div className="mt-space-md">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        {19 + menteesList.length}
                      </span>
                      <span className="font-code-tech text-code-tech text-primary font-semibold">
                        / 24 Max Capacity
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-outline font-label-md text-label-md">
                      <span className="material-symbols-outlined text-[14px] text-secondary">
                        check_circle
                      </span>
                      <span>100% Onboarding verified</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                      Cohort Progress
                    </span>
                    <div className="mt-space-xs">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        92%
                      </span>
                      <p className="font-label-md text-label-md text-outline mt-1">
                        Average Module Completion
                      </p>
                    </div>
                  </div>
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      ></path>
                      <path
                        className="text-secondary-container"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="92, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-code-tech text-label-md font-bold text-primary">
                      +4%
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm interactive-card flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                      Pending Reviews
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-[20px]">assignment_late</span>
                    </div>
                  </div>
                  <div className="mt-space-md">
                    <div className="flex items-baseline gap-space-xs">
                      <span className="font-headline-lg text-headline-lg font-bold text-error">
                        14
                      </span>
                      <span className="font-label-md text-label-md text-outline">
                        Submissions await grading
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-outline font-label-md text-label-md">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      <span>8 Raft PRs • 6 Quiz overrides</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. MY MENTEES SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="mentees">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Enrolled Mentees Directory
                  </h2>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-code-tech text-code-tech px-3 py-1.5 rounded-lg bg-surface-container-high text-primary font-semibold">
                    Showing {menteesList.length} of 24 Active Students
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
                        <th className="py-space-md px-space-lg">Mentee Name</th>
                        <th className="py-space-md px-space-md">Enrollment No.</th>
                        <th className="py-space-md px-space-md text-center">Modules Done</th>
                        <th className="py-space-md px-space-md">Project Status</th>
                        <th className="py-space-md px-space-md text-center">Avg Quiz Score</th>
                        <th className="py-space-md px-space-md">Last Active</th>
                        <th className="py-space-md px-space-lg text-right">Quick Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-0 text-body-md font-body-md text-on-surface">
                      {menteesList.map((m, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-surface-container-low/60 transition-colors"
                        >
                          <td className="py-space-md px-space-lg">
                            <div className="flex items-center gap-space-sm">
                              <img
                                className="w-9 h-9 rounded-full object-cover bg-surface-container"
                                alt={m.name}
                                src={m.avatar}
                              />
                              <div className="flex flex-col">
                                <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                                  {m.name}
                                </span>
                                <span className="font-code-tech text-[11px] text-outline">
                                  {m.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md font-code-tech text-code-tech text-primary font-semibold">
                            {m.enrollId}
                          </td>
                          <td className="py-space-md px-space-md text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-code-tech text-label-md font-bold">
                              {m.modules}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  m.isError ? "bg-error" : "bg-secondary-container"
                                }`}
                              ></span>
                              <span
                                className={`font-label-md text-label-md font-medium ${
                                  m.isError ? "text-error" : "text-on-surface"
                                }`}
                              >
                                {m.projectStatus}
                              </span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md text-center">
                            <span className="font-code-tech text-code-tech font-bold text-on-surface">
                              {m.quizScore}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md font-label-md text-label-md text-outline">
                            {m.lastActive}
                          </td>
                          <td className="py-space-md px-space-lg text-right">
                            <button
                              onClick={() => setInspectedMentee(m)}
                              className="px-3 py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md text-primary font-semibold inline-flex items-center gap-1 cursor-pointer"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                visibility
                              </span>
                              <span>Review</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Inline Quick Inspection Drawer Preview */}
                {inspectedMentee && (
                  <div className="bg-surface-container-low p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div>
                        <span className="font-label-md text-label-md text-outline uppercase">
                          Active Inspection Dossier
                        </span>
                        <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          {inspectedMentee.name} ({inspectedMentee.enrollId})
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {inspectedMentee.notes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <span className="font-code-tech text-code-tech px-3 py-1.5 rounded bg-primary text-on-primary font-bold">
                        Progress: {inspectedMentee.progress}
                      </span>
                      <button
                        onClick={() => setInspectedMentee(null)}
                        className="px-3 py-1.5 rounded bg-surface-container-highest hover:bg-surface-container text-on-surface font-label-md text-label-md cursor-pointer"
                        type="button"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 3. ADD MENTEE FORM SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="add-mentee">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Add Mentee
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
                <form
                  className="lg:col-span-8 flex flex-col gap-space-md"
                  onSubmit={handleAddMenteeSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Mentee Full Name
                      </label>
                      <input
                        value={menteeFullName}
                        onChange={(e) => setMenteeFullName(e.target.value)}
                        className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all outline-none"
                        placeholder="e.g. Ishita Bansal"
                        required
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Institutional Email
                      </label>
                      <input
                        value={menteeEmail}
                        onChange={(e) => setMenteeEmail(e.target.value)}
                        className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all outline-none"
                        placeholder="ishita.b@igdtuw.ac.in"
                        required
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Specialization Track
                      </label>
                      <select className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all outline-none">
                        <option value="cloud">Cloud &amp; Distributed Systems</option>
                        <option value="systems">High-Performance Computing</option>
                        <option value="ai">AI / LLM Infrastructure</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                          Enrollment Number
                        </label>
                        <button
                          onClick={regenerateEnrollmentId}
                          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">refresh</span>{" "}
                          Auto-Generate
                        </button>
                      </div>
                      <input
                        value={enrollmentNum}
                        onChange={(e) => setEnrollmentNum(e.target.value)}
                        className="w-full h-11 px-space-md rounded-lg bg-surface-container-high font-code-tech text-code-tech text-primary font-bold tracking-wider outline-none"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="pt-space-xs flex items-center justify-between">
                    <button
                      className="btn-interactive px-space-lg py-2.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg font-semibold transition-all shadow-sm flex items-center gap-space-xs cursor-pointer"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      <span>Register</span>
                    </button>
                  </div>
                </form>

                {/* Dynamic Credential Generator Box */}
                <div className="lg:col-span-4 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="font-label-md text-label-md text-outline uppercase font-semibold">
                        Provisional Auth Key
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest font-code-tech text-[10px] text-tertiary font-bold">
                        SHA-256
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                      Secure initial password generated for first sign-in:
                    </p>
                    <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-inner flex items-center justify-between gap-space-sm">
                      <span className="font-code-tech text-code-tech font-bold text-on-surface tracking-widest">
                        {tempPassword}
                      </span>
                      <button
                        onClick={copyPasswordToClipboard}
                        className="p-2 rounded hover:bg-surface-container text-primary transition-colors cursor-pointer"
                        title="Copy initial password"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {copied ? "done" : "content_copy"}
                        </span>
                      </button>
                    </div>
                    <div
                      className={`${
                        copied ? "opacity-100" : "opacity-0"
                      } transition-opacity mt-2 font-label-md text-label-md text-secondary font-semibold flex items-center gap-1`}
                    >
                      <span className="material-symbols-outlined text-[14px]">check</span> Password
                      copied to clipboard!
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. VIDEOS RESOURCE MANAGEMENT SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="videos">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Video Masterclasses Management
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddVideoModal(!showAddVideoModal)}
                  className="btn-interactive px-space-md py-2 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg font-semibold transition-all shadow-sm flex items-center gap-space-xs self-start sm:self-auto cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">video_call</span>
                  <span>Add Video Resource</span>
                </button>
              </div>

              {showAddVideoModal && (
                <div className="bg-surface-container-high p-space-lg rounded-xl flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Publish New Video Masterclass
                      </span>
                    </div>
                    <button
                      onClick={() => setShowAddVideoModal(false)}
                      className="text-outline hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  <form className="flex flex-col gap-space-md" onSubmit={handleAddVideoSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                          Masterclass Title
                        </label>
                        <input
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="w-full h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md outline-none focus:ring-2 focus:ring-secondary transition-all"
                          placeholder="e.g. Zero-Allocation Serializers"
                          required
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                          Duration
                        </label>
                        <input
                          value={videoDuration}
                          onChange={(e) => setVideoDuration(e.target.value)}
                          className="w-full h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md outline-none focus:ring-2 focus:ring-secondary transition-all"
                          placeholder="e.g. 54 mins"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Description
                      </label>
                      <textarea
                        value={videoDesc}
                        onChange={(e) => setVideoDesc(e.target.value)}
                        className="w-full p-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md outline-none focus:ring-2 focus:ring-secondary transition-all"
                        placeholder="Provide an overview of the masterclass, topics covered, and prerequisites..."
                        required
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Upload Video File Directly
                      </label>
                      <label className="relative flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors group cursor-pointer text-center">
                        <input
                          accept="video/mp4,video/webm,video/quicktime"
                          className="hidden"
                          type="file"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              setSelectedFileName(
                                `${f.name} (${(f.size / (1024 * 1024)).toFixed(1)} MB)`
                              );
                            }
                          }}
                        />
                        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform mb-2">
                          <span className="material-symbols-outlined text-[24px]">
                            cloud_upload
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                            <span className="text-primary hover:underline">Click to browse</span> or
                            drag and drop video file
                          </span>
                          <span className="font-label-md text-label-md text-outline">
                            Direct video upload: MP4, WebM, or MOV up to 2GB (1080p / 4K
                            recommended)
                          </span>
                        </div>
                        {selectedFileName && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-code-tech text-[11px] font-bold shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">
                              video_file
                            </span>
                            <span>{selectedFileName}</span>
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                      <button
                        onClick={() => setShowAddVideoModal(false)}
                        className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg font-semibold transition-all shadow-sm flex items-center gap-space-xs cursor-pointer"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[18px]">publish</span>
                        <span>Upload &amp; Publish Masterclass</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
                {videosList.map((vid, idx) => (
                  <div
                    key={idx}
                    className="group bg-surface-container-lowest rounded-xl shadow-sm interactive-card overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-video bg-surface-container-highest overflow-hidden cursor-pointer">
                        <img
                          alt={vid.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          src={vid.img}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-xl text-primary font-code-tech text-[11px] font-bold shadow-sm">
                          {vid.module}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl text-primary flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                            <span className="material-symbols-outlined text-[24px]">
                              play_arrow
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-on-background/80 backdrop-blur-xl text-on-primary font-code-tech text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>{" "}
                          {vid.duration}
                        </div>
                      </div>
                      <div className="p-space-lg flex flex-col gap-space-sm">
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                          {vid.title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                          {vid.desc}
                        </p>
                      </div>
                    </div>
                    <div className="px-space-lg pb-space-lg pt-0 flex items-center justify-between mt-auto">
                      <button
                        className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all flex items-center gap-1 cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_circle</span>
                        <span>Watch Preview</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. QUIZZES RESOURCE MANAGEMENT SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="quizzes">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Quizzes &amp; Assessments
                </h2>
              </div>
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
                        <th className="py-space-md px-space-lg">Quiz Title</th>
                        <th className="py-space-md px-space-md">Assessment Topics</th>
                        <th className="py-space-md px-space-md">Submission Deadline</th>
                        <th className="py-space-md px-space-md text-center">Max Score</th>
                        <th className="py-space-md px-space-md text-center">Student Completion</th>
                        <th className="py-space-md px-space-lg text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-body-md font-body-md text-on-surface divide-y-0">
                      <tr className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="py-space-md px-space-lg font-label-lg font-bold">
                          Go Runtime &amp; Scheduler Internals
                        </td>
                        <td className="py-space-md px-space-md">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              GMP Model
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Stack Growth
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Work Stealing
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md font-code-tech text-code-tech text-outline">
                          Oct 28, 2024 • 23:59 IST
                        </td>
                        <td className="py-space-md px-space-md text-center font-code-tech font-bold text-primary">
                          50 pts
                        </td>
                        <td className="py-space-md px-space-md text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-label-lg font-bold">24 / 24</span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                              100%
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-lg text-right">
                          <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-primary font-semibold cursor-pointer">
                            Review Stats
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="py-space-md px-space-lg font-label-lg font-bold">
                          Distributed Consensus &amp; Raft Invariants
                        </td>
                        <td className="py-space-md px-space-md">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Leader Election
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Log Matching
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              State Safety
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md font-code-tech text-code-tech text-secondary font-semibold">
                          Nov 06, 2024 • 23:59 IST
                        </td>
                        <td className="py-space-md px-space-md text-center font-code-tech font-bold text-primary">
                          50 pts
                        </td>
                        <td className="py-space-md px-space-md text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-label-lg font-bold">19 / 24</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold">
                              79%
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-lg text-right">
                          <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-primary font-semibold cursor-pointer">
                            Grade Pending
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="py-space-md px-space-lg font-label-lg font-bold">
                          gRPC Performance Tuning &amp; Marshaling
                        </td>
                        <td className="py-space-md px-space-md">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Protobuf wire
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              Zero-copy buffers
                            </span>
                            <span className="px-2 py-0.5 rounded bg-surface-container font-label-md text-[11px]">
                              TLS overhead
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-md font-code-tech text-code-tech text-outline">
                          Nov 14, 2024 • 23:59 IST
                        </td>
                        <td className="py-space-md px-space-md text-center font-code-tech font-bold text-primary">
                          50 pts
                        </td>
                        <td className="py-space-md px-space-md text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-label-lg font-bold">0 / 24</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-outline text-[10px] font-bold">
                              Upcoming
                            </span>
                          </div>
                        </td>
                        <td className="py-space-md px-space-lg text-right">
                          <button className="px-3 py-1 rounded bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-primary font-semibold cursor-pointer">
                            Configure
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 6. PROJECTS RESOURCE MANAGEMENT SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="projects">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Hands-on Projects Management
                </h2>
              </div>
              <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pb-space-md bg-surface-container-low/50 p-space-md rounded-xl">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">terminal</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-code-tech text-[10px] font-bold uppercase tracking-wider">
                          Flagship Capstone
                        </span>
                        <span className="font-code-tech text-code-tech text-outline">
                          • Max Score: 100 pts
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
                        Distributed Key-Value Store with Raft Consensus
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-md">
                    <div className="flex flex-col text-right">
                      <span className="font-label-md text-label-md text-outline uppercase">
                        Submission Deadline
                      </span>
                      <span className="font-code-tech text-code-tech font-bold text-error">
                        Nov 18, 2024 • 18:00 IST
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                  <div className="lg:col-span-7 flex flex-col gap-space-md">
                    <div>
                      <h4 className="font-title-md text-title-md font-bold text-on-surface mb-1">
                        Architecture Description
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Students must construct a fault-tolerant, replicated state machine
                        implementing the complete Raft consensus protocol. The system must
                        successfully elect leaders during arbitrary network partitions, handle log
                        replication across 5 distinct nodes, persist logs to write-ahead disk
                        journals, and fulfill strict linearizable read/write semantics without
                        split-brain anomalies.
                      </p>
                    </div>
                    <div className="bg-surface-container-low p-space-md rounded-xl">
                      <h5 className="font-label-lg text-label-lg font-bold text-on-surface mb-2">
                        Automated Test Matrix Requirements
                      </h5>
                      <div className="grid grid-cols-2 gap-space-xs font-code-tech text-[12px] text-on-surface-variant">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2A:
                          Leader Election (0.5s timeout)
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2B:
                          AppendEntries Quorum replication
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2C:
                          Snapshotting &amp; Log Compaction
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 2D:
                          Client Request Redirection
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-space-sm uppercase tracking-wide">
                        Rigorous Submission Criteria
                      </h4>
                      <ul className="flex flex-col gap-space-xs font-body-md text-body-md text-on-surface-variant">
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>
                            Clean Git commit graph pushed to university Gitlab with signed tags.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>
                            100 iterations of{" "}
                            <code className="font-code-tech text-[12px] bg-white px-1 rounded">
                              go test -race
                            </code>{" "}
                            without a single goroutine leak or data race flag.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>
                            Comprehensive benchmark graphs demonstrating throughput under
                            partitioned conditions.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-space-md flex items-center justify-between mt-space-md">
                      <span className="font-label-md text-label-md text-outline">
                        Lead Grading Rubric v2.1
                      </span>
                      <button
                        className="px-space-md py-2 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary font-label-md text-label-md text-on-surface font-semibold transition-colors cursor-pointer"
                        type="button"
                      >
                        Inspect Benchmark Harness
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. DEADLINES & SCORES SECTION */}
            <section className="flex flex-col gap-space-md scroll-mt-20" id="deadlines">
              <div>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Centralized Schedule &amp; Quick Grading
                </h2>
              </div>
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-container">
                  <div className="bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-code-tech text-[11px] font-bold text-secondary uppercase">
                          Milestone 01
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-code-tech text-code-tech text-primary font-bold">
                          50 PTS
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md font-bold text-on-surface mb-1">
                        Quiz 2: Raft Invariants
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        State machine safety &amp; term synchronization quiz evaluation.
                      </p>
                      <div className="flex flex-col gap-1 text-label-md font-label-md text-outline mb-space-md">
                        <span className="flex items-center gap-1 font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-error">
                            event
                          </span>{" "}
                          Due: Nov 06, 2024 • 23:59 IST
                        </span>
                        <span>Grading Status: 5 Ungraded Submissions</span>
                      </div>
                    </div>
                    <div className="pt-space-sm">
                      <button className="w-full py-2 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold transition-all cursor-pointer">
                        Launch Batch Grader (5 Left)
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-code-tech text-[11px] font-bold text-secondary uppercase">
                          Milestone 02
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-code-tech text-code-tech text-primary font-bold">
                          50 PTS
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md font-bold text-on-surface mb-1">
                        Quiz 3: gRPC Tuning
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        Protobuf wire encoding and stream multiplexing verification.
                      </p>
                      <div className="flex flex-col gap-1 text-label-md font-label-md text-outline mb-space-md">
                        <span className="flex items-center gap-1 font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            event
                          </span>{" "}
                          Due: Nov 14, 2024 • 23:59 IST
                        </span>
                        <span>Grading Status: Automated Harness Armed</span>
                      </div>
                    </div>
                    <div className="pt-space-sm">
                      <button className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer">
                        Modify Answer Keys
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-space-lg flex flex-col justify-between hover:bg-surface-container-low/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-code-tech text-[11px] font-bold text-error uppercase">
                          Final Capstone
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-code-tech text-code-tech text-primary font-bold">
                          100 PTS
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md font-bold text-on-surface mb-1">
                        Raft KV Store Defense
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                        Live oral examination and partition fault injection lab review.
                      </p>
                      <div className="flex flex-col gap-1 text-label-md font-label-md text-outline mb-space-md">
                        <span className="flex items-center gap-1 font-semibold text-error">
                          <span className="material-symbols-outlined text-[16px]">
                            priority_high
                          </span>{" "}
                          Due: Nov 18, 2024 • 18:00 IST
                        </span>
                        <span>Grading Status: 0 / 24 Reviewed (Awaiting Cutoff)</span>
                      </div>
                    </div>
                    <div className="pt-space-sm">
                      <button className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer">
                        Download CI Matrix Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}