import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type UserRole = "admin" | "partner" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => void;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Dummy users for demo
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "admin@batoibhai.com": {
    password: "admin123",
    user: { id: "u1", name: "Admin User", email: "admin@batoibhai.com", phone: "+91 9876543210", role: "admin", verified: true, createdAt: "2025-01-01" },
  },
  "partner@batoibhai.com": {
    password: "partner123",
    user: { id: "u2", name: "OdishaTourism Pro", email: "partner@batoibhai.com", phone: "+91 9876543211", role: "partner", verified: true, createdAt: "2025-03-15" },
  },
  "customer@batoibhai.com": {
    password: "customer123",
    user: { id: "u3", name: "Rajesh Mohanty", email: "customer@batoibhai.com", phone: "+91 9876543212", role: "customer", verified: true, createdAt: "2025-06-01" },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("bb_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    const entry = DEMO_USERS[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      return { success: false, error: "Invalid email or password" };
    }
    setUser(entry.user);
    localStorage.setItem("bb_user", JSON.stringify(entry.user));
    return { success: true };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);

    if (DEMO_USERS[data.email.toLowerCase()]) {
      return { success: false, error: "Email already registered" };
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      verified: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    localStorage.setItem("bb_user", JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("bb_user");
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    if (!DEMO_USERS[email.toLowerCase()]) {
      return { success: false, error: "No account found with this email" };
    }
    return { success: true };
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("bb_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, forgotPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
