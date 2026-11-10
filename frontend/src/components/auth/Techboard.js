"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Shield, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const roles = [
  {
    id: "mentee",
    label: "I'm a Mentee",
    description: "Access your learning dashboard, complete resources, and track your progress.",
    icon: GraduationCap,
    href: "/login?role=mentee",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.3)",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    id: "mentor",
    label: "I'm a Mentor",
    description: "Manage your programs, add resources, and guide your mentees to success.",
    icon: BookOpen,
    href: "/login?role=mentor",
    gradient: "from-purple-500 to-fuchsia-600",
    glowColor: "rgba(168, 85, 247, 0.3)",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: "admin",
    label: "Admin Access",
    description: "Manage platform configuration, create programs, and onboard mentors.",
    icon: Shield,
    href: "/login?role=admin",
    gradient: "from-fuchsia-500 to-pink-600",
    glowColor: "rgba(217, 70, 239, 0.3)",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Techboard() {
  const { isAuthenticated, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (role === "mentee") {
        router.push("/dashboard/mentee");
      } else if (role === "mentor") {
        router.push("/dashboard/mentor");
      }
    }
  }, [isAuthenticated, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))] mx-auto mb-4" />
          <p className="text-[hsl(var(--muted-foreground))]">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[hsl(var(--background))]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[hsl(var(--primary))]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--primary))]/3 blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 text-sm text-[hsl(var(--primary))] font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            TechNeeds IGDTUW
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="gradient-text">TechBoard</span>
          </h1>
          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            Select your role to continue to the mentorship platform
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <motion.div key={role.id} variants={cardVariants}>
                <motion.button
                  onClick={() => router.push(role.href)}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: `0 20px 60px ${role.glowColor}`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-left transition-all duration-300 hover:border-[hsl(var(--primary))]/40 cursor-pointer"
                >
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent pointer-events-none" />

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${role.iconBg} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-7 h-7 ${role.iconColor}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                    {role.label}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                    {role.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))]">
                    Continue
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-sm text-[hsl(var(--muted-foreground))]/60"
        >
          Indira Gandhi Delhi Technical University for Women
        </motion.p>
      </div>
    </div>
  );
}
