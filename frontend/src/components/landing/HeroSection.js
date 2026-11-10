"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── animated counter ── */
function AnimatedStat({ value, label, suffix = "+" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20, duration: 2 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  if (isInView) motionVal.set(value);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span className="text-3xl sm:text-4xl font-bold gradient-text">
        {display}
      </motion.span>
      <span className="text-sm text-[hsl(var(--muted-foreground))]">{label}</span>
    </div>
  );
}

/* ── floating orbs ── */
const orbs = [
  { size: 320, x: "10%", y: "15%", delay: 0, color: "hsl(var(--gradient-start) / 0.15)" },
  { size: 260, x: "75%", y: "10%", delay: 1.5, color: "hsl(var(--gradient-end) / 0.12)" },
  { size: 200, x: "60%", y: "65%", delay: 0.8, color: "hsl(var(--gradient-start) / 0.10)" },
  { size: 180, x: "20%", y: "70%", delay: 2, color: "hsl(var(--gradient-end) / 0.08)" },
  { size: 140, x: "85%", y: "50%", delay: 1, color: "hsl(var(--primary) / 0.10)" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── animated gradient background ── */}
      <div className="absolute inset-0 -z-20 bg-[hsl(var(--background))]" />
      <div
        className="absolute inset-0 -z-10 opacity-30 animate-gradient"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--gradient-start) / 0.35), transparent)," +
            "radial-gradient(ellipse 60% 50% at 80% 50%, hsl(var(--gradient-end) / 0.25), transparent)," +
            "radial-gradient(ellipse 50% 40% at 20% 80%, hsl(var(--gradient-start) / 0.20), transparent)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* ── mesh grid subtle overlay ── */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px)," +
            "linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── floating orbs ── */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full -z-10 blur-3xl pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.08, 0.95, 1.03, 1],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* ── content ── */}
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))]">
            🚀 IGDTUW&apos;s Premier Mentorship Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] mb-6"
        >
          <span className="gradient-text">Upgrade</span>{" "}
          <span className="text-[hsl(var(--foreground))]">Yourself</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-[hsl(var(--muted-foreground))] leading-relaxed mb-10"
        >
          Empowering the next generation of tech leaders through peer-to-peer
          mentorship at IGDTUW
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="xl" className="group">
            <Link href="/techboard">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <a href="#programs">Explore Programs</a>
          </Button>
        </motion.div>
      </div>

      {/* ── stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
        className="mt-auto w-full"
      >
        <div className="container mx-auto px-4 sm:px-6 pb-10">
          <div className="glass rounded-2xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedStat value={1200} label="Mentees" />
            <AnimatedStat value={50} label="Mentors" />
            <AnimatedStat value={10} label="Cohorts" />
            <AnimatedStat value={100} label="Events" />
          </div>
        </div>
      </motion.div>

      {/* ── scroll hint ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-[hsl(var(--muted-foreground)/0.5)]" />
      </motion.div>
    </section>
  );
}
