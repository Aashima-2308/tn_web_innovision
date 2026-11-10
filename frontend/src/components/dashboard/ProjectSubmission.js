"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitProject } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  Github,
  Globe,
  FileText,
  Send,
  AlertCircle,
  ArrowLeft,
  Rocket,
} from "lucide-react";

export default function ProjectSubmission({ resourceId, onComplete }) {
  const [formData, setFormData] = useState({
    githubLink: "",
    deployedLink: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError(null);
  };

  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canSubmit =
    formData.githubLink.trim() &&
    isValidUrl(formData.githubLink) &&
    isValidUrl(formData.deployedLink) &&
    !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setError(null);
      await submitProject(resourceId, {
        githubLink: formData.githubLink.trim(),
        deployedLink: formData.deployedLink.trim() || undefined,
        description: formData.description.trim() || undefined,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-4"
      >
        <Card className="border-2 border-emerald-300 dark:border-emerald-700 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-green-500" />
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="mx-auto mb-4 h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
            >
              <Rocket className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2"
            >
              Project Submitted! 🚀
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[hsl(var(--muted-foreground))] mb-2"
            >
              Your project has been submitted for review.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Badge variant="info" className="mb-6">Pending Verification</Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button onClick={onComplete} className="mt-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <Card className="border-[hsl(var(--primary)/0.2)] glow overflow-hidden">
        <div className="h-1.5 w-full gradient-bg" />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="h-5 w-5 text-[hsl(var(--primary))]" />
              Submit Project
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onComplete}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* GitHub Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Github className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                GitHub Repository
                <span className="text-[hsl(var(--destructive))]">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubLink}
                onChange={handleChange("githubLink")}
                className={cn(
                  "transition-all duration-200",
                  formData.githubLink && !isValidUrl(formData.githubLink)
                    ? "border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive))]"
                    : ""
                )}
                required
              />
              {formData.githubLink && !isValidUrl(formData.githubLink) && (
                <p className="text-xs text-[hsl(var(--destructive))]">Please enter a valid URL</p>
              )}
            </div>

            {/* Deployed Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                Deployed Link
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-normal">(optional)</span>
              </label>
              <Input
                type="url"
                placeholder="https://your-project.vercel.app"
                value={formData.deployedLink}
                onChange={handleChange("deployedLink")}
                className={cn(
                  "transition-all duration-200",
                  formData.deployedLink && !isValidUrl(formData.deployedLink)
                    ? "border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive))]"
                    : ""
                )}
              />
              {formData.deployedLink && !isValidUrl(formData.deployedLink) && (
                <p className="text-xs text-[hsl(var(--destructive))]">Please enter a valid URL</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                Description
                <span className="text-xs text-[hsl(var(--muted-foreground))] font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Briefly describe your project, the approach you took, challenges faced..."
                value={formData.description}
                onChange={handleChange("description")}
                rows={4}
                className="flex w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-[hsl(var(--background))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
              />
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {formData.description.length}/500 characters
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))]"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <Button type="submit" disabled={!canSubmit} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Project
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
