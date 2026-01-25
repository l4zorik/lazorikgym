"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user pro demo
const MOCK_USER: User = {
  id: "1",
  name: "Jan Novák",
  email: "jan@lazorikgym.cz",
  avatar: undefined,
  fitnessLevel: "intermediate",
  goals: ["Nabrat svalovou hmotu", "Zlepšit výdrž"],
  createdAt: new Date(),
};

// Mock credentials
const MOCK_CREDENTIALS = {
  email: "demo@lazorikgym.cz",
  password: "demo123",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock auth - accept demo credentials or any email/password
    if (
      (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) ||
      (email && password.length >= 4)
    ) {
      setUser({
        ...MOCK_USER,
        email,
        name: email.split("@")[0],
      });
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (name && email && password.length >= 4) {
      setUser({
        ...MOCK_USER,
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        createdAt: new Date(),
      });
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
