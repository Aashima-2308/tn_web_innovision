"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Code, Heart } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Curated curricula with quizzes, resources, and milestone-based progression that keeps you on track.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Learn from experienced student mentors who guide you through every concept with personalized feedback.",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description:
      "Build real-world projects, get them reviewed by mentors, and create a portfolio that stands out.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Join a vibrant community of learners, collaborate on projects, and grow together at IGDTUW.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* subtle bg accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] -z-10 opacity-20 blur-3xl rounded-full pointer-events-none"
        style={{ background: "hsl(var(--gradient-end) / 0.25)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
            About TechNeeds
          </h2>
          <p className="max-w-xl mx-auto text-[hsl(var(--muted-foreground))]">
            A student-run mentorship initiative fostering technical excellence at
            IGDTUW since 2022.
          </p>
        </motion.div>

        {/* two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* left — descriptive text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-[hsl(var(--foreground))] mb-5 leading-snug">
              Building the bridge between{" "}
              <span className="gradient-text">learning</span> and{" "}
              <span className="gradient-text">doing</span>
            </h3>
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
              <p>
                TechNeeds IGDTUW is a peer-to-peer mentorship platform that
                pairs experienced student mentors with eager learners. Our
                cohort-based programs cover everything from web development and
                data structures to machine learning and AR/VR.
              </p>
              <p>
                Every cohort is structured around hands-on resources, timed
                quizzes, and capstone projects — giving mentees a real,
                portfolio-worthy learning experience. Mentors provide regular
                feedback, project reviews, and guide mentees toward their goals.
              </p>
              <p>
                Whether you&apos;re writing your first line of code or preparing
                for placements, TechNeeds has a program designed for you.
              </p>
            </div>

            {/* decorative bar */}
            <div className="mt-6 flex gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full gradient-bg"
                  initial={{ width: 0 }}
                  whileInView={{ width: i === 1 ? 48 : i === 2 ? 32 : 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* right — feature cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={itemVariants}
                  className="glass rounded-2xl p-6 group hover:glow transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
