"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuiz, submitQuiz } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  Trophy,
  AlertCircle,
} from "lucide-react";

function QuizSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 bg-[hsl(var(--muted))] rounded-lg" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-[hsl(var(--muted))] rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function QuizAttempt({ resourceId, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);
        setError(null);
        const res = await getQuiz(resourceId);
        const quizData = res.data.questions || res.data.quiz?.questions || res.data;
        const questionsArray = Array.isArray(quizData) ? quizData : [];
        setQuestions(questionsArray);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [resourceId]);

  const handleSelectOption = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const formattedAnswers = questions.map((_, idx) => answers[idx] ?? -1);
      const res = await submitQuiz(resourceId, formattedAnswers);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const allAnswered = questions.length > 0 && questions.every((_, idx) => answers[idx] !== undefined);
  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((Object.keys(answers).length / questions.length) * 100) : 0;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="border-[hsl(var(--primary)/0.2)] glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Loader2 className="h-5 w-5 animate-spin text-[hsl(var(--primary))]" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Loading quiz questions...</span>
            </div>
            <QuizSkeleton />
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error && !result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <Card className="border-red-200 dark:border-red-900/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-[hsl(var(--destructive))]">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4" onClick={onComplete}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (result) {
    const score = result.score ?? result.marks ?? 0;
    const maxScore = result.maxScore ?? result.totalMarks ?? questions.length;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const passed = percentage >= 50;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mt-4"
      >
        <Card className={cn(
          "border-2 overflow-hidden",
          passed ? "border-emerald-300 dark:border-emerald-700" : "border-amber-300 dark:border-amber-700"
        )}>
          <div className={cn(
            "h-1.5 w-full",
            passed ? "bg-gradient-to-r from-emerald-400 to-green-500" : "bg-gradient-to-r from-amber-400 to-orange-500"
          )} />
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className={cn(
                "mx-auto mb-4 h-20 w-20 rounded-full flex items-center justify-center",
                passed
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : "bg-amber-100 dark:bg-amber-900/30"
              )}
            >
              {passed ? (
                <Trophy className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              )}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-2"
            >
              {passed ? "Great Job! 🎉" : "Keep Trying! 💪"}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[hsl(var(--muted-foreground))] mb-4">
                You scored
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-4xl font-bold gradient-text">{score}</span>
                <span className="text-xl text-[hsl(var(--muted-foreground))]">/ {maxScore}</span>
              </div>
              <Badge variant={passed ? "success" : "warning"} className="text-sm px-4 py-1">
                {percentage}% — {passed ? "Passed" : "Needs Improvement"}
              </Badge>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button onClick={onComplete} className="mt-6">
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
        {/* Progress bar */}
        <div className="h-1.5 w-full bg-[hsl(var(--muted))]">
          <motion.div
            className="h-full gradient-bg rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Question {currentIndex + 1}
              <span className="text-[hsl(var(--muted-foreground))] font-normal text-sm ml-2">
                of {questions.length}
              </span>
            </CardTitle>
            <Badge variant="secondary">
              {Object.keys(answers).length}/{questions.length} answered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {currentQuestion && (
                <>
                  <p className="text-base font-medium mb-5 leading-relaxed">
                    {currentQuestion.question || currentQuestion.text}
                  </p>

                  <div className="space-y-3">
                    {(currentQuestion.options || []).map((option, optIdx) => {
                      const isSelected = answers[currentIndex] === optIdx;
                      return (
                        <motion.button
                          key={optIdx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelectOption(currentIndex, optIdx)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                            isSelected
                              ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] shadow-md"
                              : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--muted)/0.5)]"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shrink-0 transition-all duration-200",
                                isSelected
                                  ? "gradient-bg text-white shadow-lg"
                                  : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                              )}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className={cn(
                              "text-sm",
                              isSelected ? "font-medium" : ""
                            )}>
                              {typeof option === "string" ? option : option.text || option.label || ""}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[hsl(var(--border))]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            {/* Question dots */}
            <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all duration-200 cursor-pointer",
                    idx === currentIndex
                      ? "gradient-bg scale-125"
                      : answers[idx] !== undefined
                      ? "bg-emerald-400"
                      : "bg-[hsl(var(--muted))]"
                  )}
                />
              ))}
            </div>

            {currentIndex < questions.length - 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentIndex((p) => Math.min(questions.length - 1, p + 1))}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-1" />
                )}
                Submit
              </Button>
            )}
          </div>

          {!allAnswered && currentIndex === questions.length - 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[hsl(var(--muted-foreground))] text-center mt-3"
            >
              Please answer all questions before submitting
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
