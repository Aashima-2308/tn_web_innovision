"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Users,
  FolderOpen,
  UserPlus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Shield,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  createProgram,
  createMentor,
  addMentorToProgram,
  getAllPrograms,
  getAllMentors,
} from "@/lib/api";
import { getInitials } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl border backdrop-blur-md ${
        type === "success"
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
          : "bg-red-500/15 border-red-500/30 text-red-400"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [programs, setPrograms] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Create Program form
  const [programName, setProgramName] = useState("");
  const [creatingProgram, setCreatingProgram] = useState(false);

  // Create Mentor form
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [mentorPassword, setMentorPassword] = useState("");
  const [creatingMentor, setCreatingMentor] = useState(false);

  // Assign mentor dropdown state
  const [openDropdown, setOpenDropdown] = useState(null);
  const [assigning, setAssigning] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchData = useCallback(async () => {
    try {
      const [programsRes, mentorsRes] = await Promise.all([
        getAllPrograms(),
        getAllMentors(),
      ]);
      setPrograms(programsRes.data || []);
      setMentors(mentorsRes.data || []);
    } catch (err) {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    if (!programName.trim()) return;
    setCreatingProgram(true);
    try {
      await createProgram(programName.trim());
      showToast(`Program "${programName}" created!`);
      setProgramName("");
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create program", "error");
    } finally {
      setCreatingProgram(false);
    }
  };

  const handleCreateMentor = async (e) => {
    e.preventDefault();
    if (!mentorName.trim() || !mentorEmail.trim() || !mentorPassword.trim()) return;
    setCreatingMentor(true);
    try {
      await createMentor({
        name: mentorName.trim(),
        email: mentorEmail.trim(),
        password: mentorPassword.trim(),
      });
      showToast(`Mentor "${mentorName}" created!`);
      setMentorName("");
      setMentorEmail("");
      setMentorPassword("");
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create mentor", "error");
    } finally {
      setCreatingMentor(false);
    }
  };

  const handleAssignMentor = async (programId, mentorId) => {
    setAssigning(`${programId}-${mentorId}`);
    try {
      await addMentorToProgram(programId, mentorId);
      showToast("Mentor assigned successfully!");
      setOpenDropdown(null);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to assign mentor", "error");
    } finally {
      setAssigning(null);
    }
  };

  const getAssignedMentorIds = () => {
    const ids = new Set();
    programs.forEach((p) => {
      (p.mentors || []).forEach((m) => {
        ids.add(typeof m === "string" ? m : m._id);
      });
    });
    return ids;
  };

  const getUnassignedMentors = () => {
    const assigned = getAssignedMentorIds();
    return mentors.filter((m) => !assigned.has(m._id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 rounded-lg bg-[hsl(var(--muted))] animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-[hsl(var(--muted))] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const unassignedMentors = getUnassignedMentors();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Admin Panel
              </h1>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Manage programs, mentors, and assignments
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Forms */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* Create Program */}
            <motion.div variants={fadeUp}>
              <Card className="glass border-[hsl(var(--border))] overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <FolderOpen className="h-4 w-4 text-purple-400" />
                    </div>
                    Create Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateProgram} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                        Program Name
                      </label>
                      <Input
                        placeholder="e.g., Web Development Cohort 3"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        disabled={creatingProgram}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={creatingProgram || !programName.trim()}
                      className="w-full"
                    >
                      {creatingProgram ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="h-4 w-4 mr-2" />
                      )}
                      {creatingProgram ? "Creating..." : "Create Program"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Create Mentor */}
            <motion.div variants={fadeUp}>
              <Card className="glass border-[hsl(var(--border))] overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-blue-400" />
                    </div>
                    Create Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateMentor} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                        Full Name
                      </label>
                      <Input
                        placeholder="Mentor's full name"
                        value={mentorName}
                        onChange={(e) => setMentorName(e.target.value)}
                        disabled={creatingMentor}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="mentor@igdtuw.ac.in"
                        value={mentorEmail}
                        onChange={(e) => setMentorEmail(e.target.value)}
                        disabled={creatingMentor}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Secure password"
                        value={mentorPassword}
                        onChange={(e) => setMentorPassword(e.target.value)}
                        disabled={creatingMentor}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={
                        creatingMentor ||
                        !mentorName.trim() ||
                        !mentorEmail.trim() ||
                        !mentorPassword.trim()
                      }
                      className="w-full"
                    >
                      {creatingMentor ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <UserPlus className="h-4 w-4 mr-2" />
                      )}
                      {creatingMentor ? "Creating..." : "Create Mentor"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column: Programs & Mentors List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-[hsl(var(--border))] overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xl">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-emerald-400" />
                    </div>
                    Programs & Mentors
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {programs.length} program{programs.length !== 1 ? "s" : ""}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {programs.length === 0 ? (
                    <motion.div
                      key="empty"
                      variants={fadeUp}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-center py-12"
                    >
                      <FolderOpen className="h-12 w-12 mx-auto text-[hsl(var(--muted-foreground))] mb-3" />
                      <p className="text-[hsl(var(--muted-foreground))]">
                        No programs yet. Create one to get started!
                      </p>
                    </motion.div>
                  ) : (
                    programs.map((program, idx) => {
                      const programMentors = (program.mentors || []).map((m) => {
                        if (typeof m === "string") {
                          return mentors.find((mentor) => mentor._id === m) || { _id: m, name: "Unknown" };
                        }
                        return m;
                      });

                      return (
                        <motion.div
                          key={program._id || idx}
                          variants={fadeUp}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                          className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/50 p-4 hover:border-[hsl(var(--primary))]/30 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-[hsl(var(--foreground))]">
                                {program.name}
                              </h3>
                              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                                {programMentors.length} mentor
                                {programMentors.length !== 1 ? "s" : ""} assigned
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-[10px] uppercase tracking-wider"
                            >
                              Active
                            </Badge>
                          </div>

                          {/* Assigned Mentors */}
                          {programMentors.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {programMentors.map((m, mIdx) => (
                                <div
                                  key={m._id || mIdx}
                                  className="flex items-center gap-2 rounded-lg bg-[hsl(var(--muted))]/50 px-2.5 py-1.5"
                                >
                                  <div className="h-6 w-6 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-white">
                                    {getInitials(m.name)}
                                  </div>
                                  <span className="text-xs font-medium text-[hsl(var(--foreground))]">
                                    {m.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Assign Mentor Dropdown */}
                          {unassignedMentors.length > 0 && (
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setOpenDropdown(
                                    openDropdown === program._id ? null : program._id
                                  )
                                }
                                className="flex items-center gap-2 text-xs text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 transition-colors cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                                Assign Mentor
                                <ChevronDown
                                  className={`h-3 w-3 transition-transform ${
                                    openDropdown === program._id ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              <AnimatePresence>
                                {openDropdown === program._id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -5, height: 0 }}
                                    className="mt-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl overflow-hidden"
                                  >
                                    {unassignedMentors.map((mentor) => (
                                      <button
                                        key={mentor._id}
                                        onClick={() =>
                                          handleAssignMentor(program._id, mentor._id)
                                        }
                                        disabled={assigning === `${program._id}-${mentor._id}`}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-[hsl(var(--muted))]/50 transition-colors text-left cursor-pointer disabled:opacity-50"
                                      >
                                        <div className="h-7 w-7 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-[10px] font-bold">
                                          {getInitials(mentor.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-[hsl(var(--foreground))] text-xs truncate">
                                            {mentor.name}
                                          </p>
                                          <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">
                                            {mentor.email}
                                          </p>
                                        </div>
                                        {assigning === `${program._id}-${mentor._id}` ? (
                                          <Loader2 className="h-4 w-4 animate-spin text-[hsl(var(--primary))]" />
                                        ) : (
                                          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                                        )}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>

                {/* All Mentors Quick View */}
                {mentors.length > 0 && (
                  <div className="pt-4 border-t border-[hsl(var(--border))]">
                    <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] mb-3 uppercase tracking-wider">
                      All Mentors ({mentors.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mentors.map((m) => (
                        <div
                          key={m._id}
                          className="flex items-center gap-2 rounded-full bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))] px-3 py-1.5"
                        >
                          <div className="h-5 w-5 rounded-full gradient-bg flex items-center justify-center text-[8px] font-bold text-white">
                            {getInitials(m.name)}
                          </div>
                          <span className="text-xs text-[hsl(var(--foreground))]">
                            {m.name}
                          </span>
                          {getAssignedMentorIds().has(m._id) ? (
                            <Badge variant="success" className="text-[8px] py-0 px-1.5">
                              Assigned
                            </Badge>
                          ) : (
                            <Badge variant="warning" className="text-[8px] py-0 px-1.5">
                              Free
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
