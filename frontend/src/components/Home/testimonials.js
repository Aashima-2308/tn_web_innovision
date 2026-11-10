"use client";

import React, { useState } from "react";

const reviewsList = [
  {
    name: "Rhea Mehra",
    cohort: "Distributed Systems '25",
    quote:
      '"The 1:4 mentor-to-mentee ratio changed how I write concurrency primitives. Gained real systems engineering confidence."',
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuNvv-b9OwQ3rFunX7xrLu5hjAw7pVVjk1qZNPgpcTrMq8E3KNeTCviKliwZgP2x8TBL03QiUkn9_elhSBJig-McpGgKHuICnsYmzZUDH9pktidaSSw9l_Ax2RQRJHB-71u5B1cGeY9o4EONQhw6O3LTMTcHrG5ANUJ-0yKkkiYQWyxNwtiTWIcFRWwhVzoCtkdZu1jPQ4OvEfpBDz-0r33st-p7HPlZJrdJujWeU",
  },
  {
    name: "Ananya Verma",
    cohort: "AI/ML Cohort '26",
    quote:
      '"TechNeeds bridges theoretical university coursework with production-level repository standards."',
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8qu0TjftNcBMJBXFXGWd48ikz4gy4vLI260m9xCK6B1gZW4Z7kzXiHBhiJHMNQOO-HPTExbtGNVwKj81Uva_IE73V0mr_cUrfHBxqyfN8sQwSpLmWzdHb0OlG3DVBNwgP86l45o9S0VpUNhYn9azyj4q3pB-Z7rhsNlScouwwF9DyfkVSU8YFTqtEb2NVWcLLU0ccLx48JzTxwgOOy2tLgAtckrC81JGsdbCLXo",
  },
  {
    name: "Tanvi Khurana",
    cohort: "Systems Track '25",
    quote:
      '"From debugging goroutines to passing code audits, my mentor guided me through every pull request."',
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8lcQVV0bJMRtICx_BGhSl_ynZJ-1SoXzfQo60dpNTeHmArrWCAX-Z9IVzzNRJwiAq3x36mTT2x3KN2esawBVtvf0fG3xCus__t57apL_k9Vz0znHAr_PI8N45AS_N8CBlDCA14Q3YbJ7AvojNPaecj6cbinujXdeZNT5kAvvrH-G7jQPDHq-zx9tCVt9LcEmuuDx1nQVrpfET8Gbf1bIt_v9HfgBt6VU0Dm-4Z34",
  },
];

export default function Testimonials({ onShowToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cycleReviews = (dir) => {
    const next = (currentIndex + dir + 3) % 3;
    setCurrentIndex(next);
    if (onShowToast) {
      onShowToast(`Showing student review set ${next + 1} of 3`);
    }
  };

  return (
    <section className="w-full px-margin py-space-xl bg-surface relative" id="reviews">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-md reveal-init reveal-active">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Student Reviews</h2>
          </div>
          <div className="flex items-center gap-space-sm mt-space-md sm:mt-0">
            <button
              aria-label="Previous Review"
              onClick={() => cycleReviews(-1)}
              className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container hover:text-primary active:scale-95 transition-all border border-outline-variant/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              aria-label="Next Review"
              onClick={() => cycleReviews(1)}
              className="w-10 h-10 rounded-full bg-primary text-on-primary shadow-sm flex items-center justify-center hover:bg-secondary active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter transition-all duration-500">
          {reviewsList.map((rev, idx) => (
            <div
              key={idx}
              className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between interactive-card border border-outline-variant/30 reveal-init review-card reveal-active"
            >
              <div>
                <div className="flex items-center gap-1 text-primary mb-space-md">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-body-lg text-on-surface mb-space-lg italic">
                  {rev.quote}
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex-shrink-0 ring-2 ring-primary/20">
                  <img className="w-full h-full object-cover" src={rev.img} alt={rev.name} />
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">{rev.name}</h4>
                  <span className="font-label-md text-label-md text-primary font-code-tech block">
                    {rev.cohort}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-space-lg">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-4 h-3 bg-primary"
                  : "w-2 h-2 bg-outline-variant/60 hover:bg-outline"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}