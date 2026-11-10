"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const openAuthModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-auth-modal"));
  };

  return (
    <footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg">
      <div className="w-full px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-xl">
          <div>
            <div className="flex items-center gap-space-sm mb-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[20px]">
                  school
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary">TechNeeds</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              IGDTUW premier mentorship and technical acceleration initiative empowering women
              technologists in engineering rigor.
            </p>
          </div>

          <div>
            <span className="font-label-lg text-label-lg text-on-surface block mb-space-md">
              Platform
            </span>
            <div className="flex flex-col gap-space-sm">
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="/#about"
              >
                About Us
              </a>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="/#cohorts"
              >
                Mentorship Cohorts
              </a>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                href="/#reviews"
              >
                Reviews
              </a>
            </div>
          </div>

          <div>
            <span className="font-label-lg text-label-lg text-on-surface block mb-space-md">
              Access
            </span>
            <div className="flex flex-col gap-space-sm">
              <a
                onClick={openAuthModal}
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                href="#login"
              >
                Login
              </a>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                href="/profile"
              >
                AI Profile Portal
              </Link>
            </div>
          </div>

          <div>
            <span className="font-label-lg text-label-lg text-on-surface block mb-space-md">
              Connect
            </span>
            <div className="flex items-center gap-space-sm">
              <a
                className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                href="https://discord.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
              </a>
              <a
                className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary transition-all active:scale-95"
                href="https://igdtuw.ac.in"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">language</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant">
          <span className="font-label-md text-label-md">
            © 2025 TechNeeds IGDTUW. All technical rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}