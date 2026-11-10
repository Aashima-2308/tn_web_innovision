"use client";

import React, { useState, useRef } from "react";

const cohortsList = [
  {
    title: "Cloud & Distributed Systems",
    desc: "Construct high-throughput network engines, multi-node consensus algorithms, and fault-tolerant storage engines.",
    duration: "12 WEEKS",
    stack: "Go, Docker, Kubernetes",
    track: "TRACK // SYS",
    initials: "TS",
    badgeBg: "bg-primary-container text-on-primary",
    mentor: "Tanvi Sharma",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbbKuBhDk1vTp6Py0IaL0qsG-avxv7GuU6Xy2x3uwcyjyDFlnMKq7_8t-J00T3ViyxRmaoMB-e3RF-yUeFYWJKLT1jI3x7BDB8YxU-wRi-Opv23MQ6SH6i_zko-VWi24WL_U_qKqHc_UTSpQLMj9sLoR3QCeTYxBnT-EWcVQsIws84oZ2O22-cQ_PAnvSJLbY6oqJU7xPG1JOzJhWmR3pXe6pLsQjxEp918Fb4bk0",
  },
  {
    title: "AI/ML & Neural Systems",
    desc: "Fine-tune foundational LLMs, craft custom attention layers, and accelerate CUDA compute.",
    duration: "12 WEEKS",
    stack: "PyTorch, Transformers, CUDA",
    track: "TRACK // AI",
    initials: "AV",
    badgeBg: "bg-secondary-container text-on-primary",
    mentor: "Ayesha Verma",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6w57EuWwnnRLyyVX6yqlB8WQJjiqZ_O0klwBqjlIuHOXxk0bHVy1VCXOYSBjC7rFiEjjBTfl8T3eejPx7JAVminHq6vAy4LnzEQy3Nu9XazAtHZPQ6Cy5ad3uEbdy4N3_1L_BW5RYF0NLQhecdgC7ho-E3ciTZNL3hGq_1kRIkxAU_3n4s_Fc1U1E3t6OS7RZsZWNGxeyvUiunGNhkYB_c02OoG0KNgnw2-vulGQ",
  },
  {
    title: "Algorithmic Engineering",
    desc: "Master competitive programming dynamics, segment trees, and dynamic programming.",
    duration: "10 WEEKS",
    stack: "C++20, Graphs, DP",
    track: "TRACK // ALGO",
    initials: "NK",
    badgeBg: "bg-primary text-on-primary",
    mentor: "Dr. Niharika Kapoor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2uMC6W9fjcL3t7-aMguwsx_GbKzD09-1JNAYNcJj82Vb9yE56xlqQQMPvzErp_J2E492Zok1ko2OJ0-95ttNcyiJRWGYV8Q8UJlOnWidPh0lCg93IOwum6hQvw3Sb9qYd7uF814CCS6MkAoqcpG_J9TKXQBuVBfOGFkW8FxXOv0dzu_--mhdE7jZAxLJPWOV2M43G5UbJ0bxcv4_HK8hdKr9ld-9Vhi3wjEZZw1A",
  },
  {
    title: "Mobile Core & Architecture",
    desc: "Architect reactive mobile client platforms and zero-latency UI pipelines.",
    duration: "10 WEEKS",
    stack: "Flutter, Dart, Swift",
    track: "TRACK // MOBILE",
    initials: "RS",
    badgeBg: "bg-secondary text-on-secondary",
    mentor: "Radhika Sen",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg4wjiRIhw7MvN3LTfs5rKOX4svm1RFr50gSEhHiaPkNbvUnHLPsSQOKQveKjfSmxlR4uCI76559RPDJRWDwLIx5je6TbZK5WCDOC6z4LSltJ1O7JiJ-71HCf9mec3QIqMhT9YxrJLCt_ZrMMyJV-baFCcbr8vSKrDJfS1lumq90LjvI7_yOzJrMy1V5kk3RB-0ODyiRslYBc5Z2-dOFNY6x86g2KVdcihorfZ-Xs",
  },
];

export default function Mentorship({ onShowToast }) {
  const [selectedCohort, setSelectedCohort] = useState(null);
  const trackRef = useRef(null);

  const showToast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  const scrollTrack = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="w-full px-margin py-space-xl bg-surface relative" id="cohorts">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-xl reveal-init reveal-active">
            <div>
              <span className="font-code-tech text-code-tech text-primary font-bold uppercase tracking-wider block mb-space-xs">
                02 // ACTIVE PROGRAMS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Mentorship Cohorts
              </h2>
            </div>
            <div className="flex items-center gap-space-sm mt-space-md sm:mt-0">
              <button
                aria-label="Previous Cohort"
                onClick={() => scrollTrack(-1)}
                className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container hover:text-primary active:scale-95 transition-all border border-outline-variant/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                aria-label="Next Cohort"
                onClick={() => scrollTrack(1)}
                className="w-10 h-10 rounded-full bg-primary text-on-primary shadow-sm flex items-center justify-center hover:bg-secondary active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter overflow-x-auto pb-space-sm scroll-smooth"
          >
            {cohortsList.map((cohort, index) => (
              <div
                key={index}
                onClick={() => setSelectedCohort(cohort)}
                className="flex flex-col rounded-xl bg-surface-container-lowest shadow-sm interactive-card border border-outline-variant/30 overflow-hidden cursor-pointer group cohort-card"
              >
                <div className="relative w-full h-48 overflow-hidden bg-surface-container">
                  <img
                    src={cohort.img}
                    alt={cohort.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-space-md flex flex-col gap-2">
                  <h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">
                    {cohort.title}
                  </h3>
                  <div className="flex items-center gap-2 pt-1 border-t border-surface-container">
                    <div
                      className={`w-7 h-7 rounded-full ${cohort.badgeBg} flex items-center justify-center text-xs font-semibold`}
                    >
                      {cohort.initials}
                    </div>
                    <div className="text-body-md text-on-surface-variant">
                      <span className="font-medium text-on-surface">Mentor:</span> {cohort.mentor}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Cohort Detailed Modal */}
      <div
        onClick={(e) => e.target === e.currentTarget && setSelectedCohort(null)}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm transition-all duration-300 ${
          selectedCohort ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-lg mx-4 bg-surface-container-lowest rounded-2xl shadow-2xl p-space-lg border border-outline-variant/40 transform transition-transform duration-300 ${
            selectedCohort ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30 mb-space-md">
            <div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-code-tech text-code-tech">
                {selectedCohort?.track}
              </span>
              <span className="font-label-md text-label-md text-tertiary-container font-semibold ml-2">
                {selectedCohort?.duration}
              </span>
            </div>
            <button
              onClick={() => setSelectedCohort(null)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
            {selectedCohort?.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
            {selectedCohort?.desc}
          </p>
          <div className="p-space-sm bg-surface-container rounded-lg mb-space-md">
            <span className="font-label-md text-label-md text-outline block mb-1 uppercase font-semibold">
              Verified Tech Stack
            </span>
            <div className="font-code-tech text-code-tech text-primary font-semibold">
              {selectedCohort?.stack}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="btn-interactive flex-1 py-2.5 bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => {
                showToast("Application drafted! Cohort slot reserved.");
                setSelectedCohort(null);
              }}
            >
              <span>Apply for Cohort</span>
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </button>
            <button
              className="btn-interactive px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-lg transition-all flex items-center justify-center cursor-pointer"
              onClick={() => showToast("Syllabus PDF dispatched to downloads.")}
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}