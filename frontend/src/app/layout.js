"use client";

import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { usePathname } from "next/navigation";

const tailwindConfigCode = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "on-tertiary-fixed": "#001e2c",
          "on-primary": "#ffffff",
          "primary-fixed": "#dbe1ff",
          "on-secondary": "#ffffff",
          "primary-fixed-dim": "#b5c4ff",
          "background": "#faf8ff",
          "secondary-container": "#316bf3",
          "outline-variant": "#c3c5d7",
          "tertiary-container": "#00698f",
          "error": "#ba1a1a",
          "on-primary-fixed-variant": "#003dab",
          "tertiary": "#00506d",
          "error-container": "#ffdad6",
          "surface-container-low": "#f2f3ff",
          "surface-tint": "#1353d8",
          "secondary-fixed-dim": "#b4c5ff",
          "surface-container-lowest": "#ffffff",
          "outline": "#737686",
          "on-secondary-fixed": "#00174b",
          "surface-container-highest": "#dbe1ff",
          "on-error-container": "#93000a",
          "on-surface-variant": "#434654",
          "on-tertiary": "#ffffff",
          "secondary": "#0051d5",
          "inverse-primary": "#b5c4ff",
          "tertiary-fixed": "#c4e7ff",
          "surface-container": "#ebedff",
          "on-tertiary-fixed-variant": "#004c69",
          "primary-container": "#1a56db",
          "surface-variant": "#dbe1ff",
          "on-secondary-container": "#fefcff",
          "surface-dim": "#d0d9fd",
          "surface-container-high": "#e3e7ff",
          "on-background": "#111a36",
          "inverse-on-surface": "#eff0ff",
          "primary": "#003fb1",
          "on-error": "#ffffff",
          "secondary-fixed": "#dbe1ff",
          "on-tertiary-container": "#b8e3ff",
          "on-surface": "#111a36",
          "on-secondary-fixed-variant": "#003ea8",
          "surface-bright": "#faf8ff",
          "on-primary-container": "#d4dcff",
          "inverse-surface": "#262f4c",
          "on-primary-fixed": "#00174d",
          "surface": "#faf8ff",
          "tertiary-fixed-dim": "#7bd0ff"
        },
        borderRadius: {
          DEFAULT: "0.25rem",
          lg: "0.5rem",
          xl: "0.75rem",
          full: "9999px"
        },
        spacing: {
          "space-md": "1rem",
          "gutter-mobile": "1rem",
          "space-xs": "0.25rem",
          "space-xl": "2.5rem",
          "margin-mobile": "1.25rem",
          "space-lg": "1.5rem",
          "margin": "3rem",
          "gutter": "1.5rem",
          "space-sm": "0.5rem"
        },
        fontFamily: {
          "display-hero-mobile": ["Plus Jakarta Sans", "sans-serif"],
          "body-md": ["Inter", "sans-serif"],
          "display-hero": ["Plus Jakarta Sans", "sans-serif"],
          "body-lg": ["Inter", "sans-serif"],
          "code-tech": ["JetBrains Mono", "monospace"],
          "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
          "label-md": ["Inter", "sans-serif"],
          "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
          "label-lg": ["Inter", "sans-serif"],
          "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
          "title-md": ["Inter", "sans-serif"],
          "headline-md": ["Plus Jakarta Sans", "sans-serif"]
        },
        fontSize: {
          "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.025em", fontWeight: "800" }],
          "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
          "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "800" }],
          "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
          "code-tech": ["13px", { lineHeight: "20px", fontWeight: "500" }],
          "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
          "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
          "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "700" }],
          "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
          "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
          "title-md": ["18px", { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "600" }],
          "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "700" }]
        }
      }
    }
  };
`;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isConsoleRoute =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/mentor") ||
    pathname?.startsWith("/dashboard");

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>TechNeeds IGDTUW</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{ __html: tailwindConfigCode }} />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-primary">
        {!isConsoleRoute && <Navbar />}
        <main className={isConsoleRoute ? "w-full bg-surface" : "w-full pt-20 bg-surface"}>
          {children}
        </main>
        {!isConsoleRoute && <Footer />}
      </body>
    </html>
  );
}