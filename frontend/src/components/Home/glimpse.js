"use client";

import React, { useState } from "react";

const glimpseItems = [
  {
    colSpan: "md:col-span-8",
    height: "h-80 sm:h-96",
    tag: "Lab 04 // Systems Sprint",
    title: "Collaborative Whiteboarding & Concurrent Architecture Debates",
    caption: "Collaborative Whiteboarding & Concurrent Architecture Debates - Lab 04 Systems Sprint",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbbKuBhDk1vTp6Py0IaL0qsG-avxv7GuU6Xy2x3uwcyjyDFlnMKq7_8t-J00T3ViyxRmaoMB-e3RF-yUeFYWJKLT1jI3x7BDB8YxU-wRi-Opv23MQ6SH6i_zko-VWi24WL_U_qKqHc_UTSpQLMj9sLoR3QCeTYxBnT-EWcVQsIws84oZ2O22-cQ_PAnvSJLbY6oqJU7xPG1JOzJhWmR3pXe6pLsQjxEp918Fb4bk0",
  },
  {
    colSpan: "md:col-span-4",
    height: "h-80 sm:h-96",
    tag: "1-on-1 Audits",
    title: "Direct Pull-Request Feedback",
    caption: "Direct Pull-Request Feedback - 1-on-1 Audits with Senior Engineering Mentors",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2uMC6W9fjcL3t7-aMguwsx_GbKzD09-1JNAYNcJj82Vb9yE56xlqQQMPvzErp_J2E492Zok1ko2OJ0-95ttNcyiJRWGYV8Q8UJlOnWidPh0lCg93IOwum6hQvw3Sb9qYd7uF814CCS6MkAoqcpG_J9TKXQBuVBfOGFkW8FxXOv0dzu_--mhdE7jZAxLJPWOV2M43G5UbJ0bxcv4_HK8hdKr9ld-9Vhi3wjEZZw1A",
  },
  {
    colSpan: "md:col-span-4",
    height: "h-72",
    tag: "Hackathon Assembly",
    title: "24-Hour Prototype Showcases",
    caption: "24-Hour Prototype Showcases - Hackathon Assembly Hall",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLTkxLUgwIwO9FxZEt15gww7PV6Hmup3oZll31WZz_pEeHm2c1K4VoGxiYzzxvpOGc_rQcX71Woth9KJ39Mz28iHVFzDQJVwaWUY9u1FxhX8ZJRJJ08enH-V7ayvA_WXBQLMDuXGtu3eZGSNS45UJ_VP88KQfapjEarWzwM2IWxisrysh136iYN9MYJlIX0S-mg9PEsY7e67Z5FlbQezb_S32g2mXL2oH_ac8lxlw",
  },
  {
    colSpan: "md:col-span-4",
    height: "h-72",
    tag: "Campus Sync",
    title: "Informal Senior AMAs & Firesides",
    caption: "Informal Senior AMAs & Firesides - Campus Lawn Sync Sessions",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg4wjiRIhw7MvN3LTfs5rKOX4svm1RFr50gSEhHiaPkNbvUnHLPsSQOKQveKjfSmxlR4uCI76559RPDJRWDwLIx5je6TbZK5WCDOC6z4LSltJ1O7JiJ-71HCf9mec3QIqMhT9YxrJLCt_ZrMMyJV-baFCcbr8vSKrDJfS1lumq90LjvI7_yOzJrMy1V5kk3RB-0ODyiRslYBc5Z2-dOFNY6x86g2KVdcihorfZ-Xs",
  },
  {
    colSpan: "md:col-span-4",
    height: "h-72",
    tag: "Lecture Series",
    title: "Deep Technical Workshops",
    caption: "Deep Technical Workshops - Lecture Series with Live Kernel & AI Demos",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6w57EuWwnnRLyyVX6yqlB8WQJjiqZ_O0klwBqjlIuHOXxk0bHVy1VCXOYSBjC7rFiEjjBTfl8T3eejPx7JAVminHq6vAy4LnzEQy3Nu9XazAtHZPQ6Cy5ad3uEbdy4N3_1L_BW5RYF0NLQhecdgC7ho-E3ciTZNL3hGq_1kRIkxAU_3n4s_Fc1U1E3t6OS7RZsZWNGxeyvUiunGNhkYB_c02OoG0KNgnw2-vulGQ",
  },
];

export default function Glimpse() {
  const [lightboxItem, setLightboxItem] = useState(null);

  return (
    <>
      <section className="w-full px-margin py-space-xl bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-space-xl reveal-init reveal-active">
            <span className="font-code-tech text-code-tech text-primary font-bold uppercase tracking-wider block mb-space-xs">
              03 // CAMPUS FOOTPRINT
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Glimpse of TechNeeds
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
              Real workshops, hackathons, lab mentorship sessions, and student activities across
              campus. Click any photo to preview in high resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {glimpseItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxItem(item)}
                className={`${item.colSpan} relative group overflow-hidden rounded-xl bg-surface-container ${item.height} shadow-sm cursor-pointer reveal-init glimpse-item reveal-active`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.img}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/20 to-transparent flex flex-col justify-end p-space-lg text-on-primary transition-opacity group-hover:from-on-background/95">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-code-tech text-code-tech text-primary-fixed mb-1 uppercase tracking-wide inline-block">
                        {item.tag}
                      </span>
                      <h4 className="font-title-md text-title-md">{item.title}</h4>
                    </div>
                    <span className="material-symbols-outlined text-[24px] text-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                      zoom_in
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Glimpse Lightbox Gallery Modal */}
      <div
        onClick={(e) => e.target === e.currentTarget && setLightboxItem(null)}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/90 backdrop-blur-md transition-all duration-300 ${
          lightboxItem ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full max-w-4xl mx-4 flex flex-col items-center">
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-surface-container-lowest/20 hover:bg-surface-container-lowest/40 text-on-primary flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <div className="w-full max-h-[80vh] overflow-hidden rounded-xl shadow-2xl bg-on-background/50 border border-outline/30 flex items-center justify-center">
            {lightboxItem && (
              <img
                alt="Expanded campus preview"
                className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-300"
                src={lightboxItem.img}
              />
            )}
          </div>
          <div className="mt-space-sm text-center">
            <span className="font-code-tech text-code-tech text-primary-fixed uppercase tracking-wider block mb-1">
              {lightboxItem?.tag}
            </span>
            <h3 className="font-title-md text-title-md text-on-primary">
              {lightboxItem?.caption}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}