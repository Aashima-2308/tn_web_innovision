"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { mentorLogin } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("mentee");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for custom event so Hero or Footer buttons can also open this modal
  useEffect(() => {
    const handleOpenAuth = () => setAuthModalOpen(true);
    window.addEventListener("open-auth-modal", handleOpenAuth);
    const handleEsc = (e) => {
      if (e.key === "Escape") setAuthModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("open-auth-modal", handleOpenAuth);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const triggerToast = (msg) => {
    window.dispatchEvent(new CustomEvent("show-toast", { detail: msg }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeRole === "mentee") {
        const res = await axios.post("https://tn-backend-1.onrender.com/api/m/login", {
          enrollmentNumber: identifier.trim(),
          password,
        });
        localStorage.setItem("menteeToken", res.data.token);
        triggerToast("Mentee login successful!");
        setAuthModalOpen(false);
        router.push("/dashboard");
      } else if (activeRole === "mentor") {
        const { token, mentor } = await mentorLogin(identifier.trim(), password);
        localStorage.setItem("token", token);
        localStorage.setItem("mentor", JSON.stringify(mentor));
        triggerToast("Mentor login successful!");
        setAuthModalOpen(false);
        router.push("/mentor");
      } else if (activeRole === "admin") {
        setAuthModalOpen(false);
        router.push("/admin");
      }
    } catch (err) {
      triggerToast(err.response?.data?.error || err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30 transition-all duration-300"
        id="main-nav-header"
      >
        <div className="h-20 w-full px-margin flex items-center justify-between">
          <Link className="flex items-center gap-space-sm group" href="/">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 group-hover:bg-primary transition-all duration-300">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight group-hover:text-secondary transition-colors">
                TechNeeds
              </span>
              <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-widest font-semibold">
                IGDTUW
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-space-lg">
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/#about"
            >
              About Us
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/#cohorts"
            >
              Mentorship Cohorts
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/#reviews"
            >
              Reviews
            </a>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/leaderboard"
            >
              Leaderboard
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/team"
            >
              Team
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
              href="/faq"
            >
              FAQs
            </Link>
          </nav>

          <div className="flex items-center gap-space-md">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <span>Register</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
            <button
              id="auth-modal-btn"
              onClick={() => setAuthModalOpen(true)}
              className="btn-interactive px-space-md py-space-sm bg-primary text-on-primary rounded-lg font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-[0_4px_6px_-1px_rgba(11,19,43,0.04)] active:scale-95 cursor-pointer border"
            >
              Login / Get Started
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
              id="profile-btn"
              title="View Profile Options"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Authentication / Get Started Modal */}
      <div
        onClick={(e) => e.target === e.currentTarget && setAuthModalOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm transition-all duration-300 ${
          authModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="auth-modal"
      >
        <div
          className={`w-full max-w-md mx-4 bg-surface-container-lowest rounded-2xl shadow-2xl p-space-lg border border-outline-variant/40 transform transition-transform duration-300 ${
            authModalOpen ? "scale-100" : "scale-95"
          }`}
          id="auth-modal-content"
        >
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30 mb-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">school</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary">Get Started</span>
            </div>
            <button
              onClick={() => setAuthModalOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-1 rounded-xl bg-surface-container flex items-center mb-space-md">
            {["mentee", "mentor", "admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRole(r)}
                className={`role-tab flex-1 py-1.5 rounded-lg text-label-md font-label-md font-semibold capitalize text-center transition-all cursor-pointer ${
                  activeRole === r
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "hover:text-on-surface text-on-surface-variant"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form className="space-y-space-sm" onSubmit={handleAuthSubmit}>
            {activeRole !== "admin" && (
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                  {activeRole === "mentee"
                    ? "IGDTUW Enrollment Number"
                    : "IGDTUW Mentor Email"}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                    alternate_email
                  </span>
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary text-body-md outline-none"
                    placeholder={
                      activeRole === "mentee" ? "Enter Enrollment No." : "mentor@igdtuw.ac.in"
                    }
                    required
                    type={activeRole === "mentee" ? "text" : "email"}
                  />
                </div>
              </div>
            )}

            {activeRole !== "admin" ? (
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                  Security Key / Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                    lock
                  </span>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary text-body-md outline-none"
                    placeholder="••••••••••••"
                    required
                    type="password"
                  />
                </div>
              </div>
            ) : (
              <p className="text-body-md text-on-surface-variant py-2">
                Proceed directly to the Admin Cohort &amp; Mentor Management Panel.
              </p>
            )}

            <button
              disabled={loading}
              className="btn-interactive w-full py-2.5 bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              type="submit"
            >
              <span>
                {loading
                  ? "Verifying..."
                  : activeRole === "mentee"
                  ? "Enter Mentee Hub"
                  : activeRole === "mentor"
                  ? "Verify Mentor Portal"
                  : "Faculty SSO Connect"}
              </span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}