"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Shield,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Code2,
  Zap,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { menteeLogin, mentorLogin } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

// ───── Decorative left panel ─────
function DecorativePanel() {
  return (
    <div className="hidden lg:flex relative w-1/2 overflow-hidden gradient-bg">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/10 blur-xl"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-white/10 blur-xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/5 blur-lg"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm text-white font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            TechNeeds IGDTUW
          </div>

          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
            Your Journey to
            <br />
            Tech Excellence
            <br />
            Starts Here
          </h2>

          <p className="text-white/70 text-lg mb-10 max-w-sm leading-relaxed">
            Join a community of learners and mentors building the future of technology together.
          </p>

          {/* Feature cards */}
          <div className="space-y-4">
            {[
              {
                icon: Code2,
                title: "Structured Learning",
                desc: "Follow curated learning paths",
              },
              {
                icon: Users,
                title: "Expert Mentors",
                desc: "Learn from industry professionals",
              },
              {
                icon: Zap,
                title: "Track Progress",
                desc: "Gamified quizzes and projects",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{feature.title}</p>
                  <p className="text-white/60 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ───── Error Alert ─────
function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
    >
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
}

// ───── Password Input ─────
function PasswordInput({ value, onChange, placeholder = "Enter your password", ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors cursor-pointer"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ───── Mentee Login Form ─────
function MenteeForm() {
  const { loginMentee } = useAuth();
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!enrollmentNumber.trim() || !password.trim()) {
        setError("Please fill in all fields");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const res = await menteeLogin(enrollmentNumber.trim(), password);
        loginMentee(res.data.token);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Invalid credentials. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [enrollmentNumber, password, loginMentee]
  );

  return (
    <motion.form
      key="mentee-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Enrollment Number
        </label>
        <Input
          type="text"
          placeholder="e.g. 12345678"
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          disabled={loading}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Password
        </label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <AnimatePresence>
        <ErrorAlert message={error} />
      </AnimatePresence>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in as Mentee"
        )}
      </Button>
    </motion.form>
  );
}

// ───── Mentor Login Form ─────
function MentorForm() {
  const { loginMentor: authLoginMentor } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all fields");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const res = await mentorLogin(email.trim(), password);
        const { token, mentor } = res.data;
        authLoginMentor(token, mentor);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Invalid credentials. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [email, password, authLoginMentor]
  );

  return (
    <motion.form
      key="mentor-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="mentor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Password
        </label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      <AnimatePresence>
        <ErrorAlert message={error} />
      </AnimatePresence>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in as Mentor"
        )}
      </Button>
    </motion.form>
  );
}

// ───── Admin Login Form ─────
function AdminForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!password.trim()) {
        setError("Please enter the admin password");
        return;
      }
      setError("");
      setLoading(true);

      // Simulate a brief delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (password === "admin123") {
        localStorage.setItem("adminAuth", "true");
        router.push("/dashboard/admin");
      } else {
        setError("Invalid admin password");
        setLoading(false);
      }
    },
    [password, router]
  );

  return (
    <motion.form
      key="admin-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-[hsl(var(--foreground))]">
          Admin Password
        </label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          disabled={loading}
          autoFocus
        />
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Contact the platform administrator for access credentials.
        </p>
      </div>

      <AnimatePresence>
        <ErrorAlert message={error} />
      </AnimatePresence>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          "Access Admin Panel"
        )}
      </Button>
    </motion.form>
  );
}

// ───── Main Login Page ─────
export default function LoginPage() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") || "mentee";

  const defaultTab =
    roleParam === "mentor" ? "mentor" : roleParam === "admin" ? "admin" : "mentee";

  const tabConfig = [
    { value: "mentee", label: "Mentee", icon: GraduationCap },
    { value: "mentor", label: "Mentor", icon: BookOpen },
    { value: "admin", label: "Admin", icon: Shield },
  ];

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      {/* Left decorative panel — desktop only */}
      <DecorativePanel />

      {/* Right login panel */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 sm:p-10">
        {/* Subtle background effects for mobile */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[hsl(var(--primary))]/8 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Back button */}
          <Link
            href="/techboard"
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to role selection
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
              Welcome back
            </h1>
            <p className="text-[hsl(var(--muted-foreground))]">
              Sign in to your account to continue
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="mentee">
                <MenteeForm />
              </TabsContent>

              <TabsContent value="mentor">
                <MentorForm />
              </TabsContent>

              <TabsContent value="admin">
                <AdminForm />
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs text-[hsl(var(--muted-foreground))]/60 mt-10"
          >
            TechNeeds IGDTUW &middot; Indira Gandhi Delhi Technical University for Women
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
