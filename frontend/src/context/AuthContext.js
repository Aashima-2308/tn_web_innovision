"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "mentee" | "mentor" | "admin"
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing tokens on mount
    const menteeToken = localStorage.getItem("menteeToken");
    const mentorToken = localStorage.getItem("token");
    const mentorData = localStorage.getItem("mentor");

    if (menteeToken) {
      try {
        const decoded = jwtDecode(menteeToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(menteeToken);
          setRole("mentee");
          setUser({ id: decoded.id });
        } else {
          localStorage.removeItem("menteeToken");
        }
      } catch {
        localStorage.removeItem("menteeToken");
      }
    } else if (mentorToken) {
      try {
        const decoded = jwtDecode(mentorToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(mentorToken);
          setRole("mentor");
          setUser(mentorData ? JSON.parse(mentorData) : { id: decoded.id });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("mentor");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("mentor");
      }
    }
    setLoading(false);
  }, []);

  const loginMentee = useCallback((menteeToken) => {
    localStorage.setItem("menteeToken", menteeToken);
    const decoded = jwtDecode(menteeToken);
    setToken(menteeToken);
    setRole("mentee");
    setUser({ id: decoded.id });
    router.push("/dashboard/mentee");
  }, [router]);

  const loginMentor = useCallback((mentorToken, mentorData) => {
    localStorage.setItem("token", mentorToken);
    if (mentorData) {
      localStorage.setItem("mentor", JSON.stringify(mentorData));
    }
    const decoded = jwtDecode(mentorToken);
    setToken(mentorToken);
    setRole("mentor");
    setUser(mentorData || { id: decoded.id });
    router.push("/dashboard/mentor");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("menteeToken");
    localStorage.removeItem("token");
    localStorage.removeItem("mentor");
    setToken(null);
    setRole(null);
    setUser(null);
    router.push("/");
  }, [router]);

  const isAuthenticated = !!token && !!role;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        loading,
        isAuthenticated,
        loginMentee,
        loginMentor,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
