import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
  title: "Login | TechNeeds IGDTUW",
  description: "Login to the TechNeeds mentorship platform",
};

export default function LoginRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]" />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
