import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import {
  userApi, agentApi, adminApi,
  roleToRoute, getLogoutApiForRole, getProfileApiForRole,
  type ApiRole
} from "@/lib/api";

export type UserRole = "admin" | "partner" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  apiRole: ApiRole;
  avatar?: string;
  verified?: boolean;
  createdAt: string;
  profileImage?: { imageUrl: string; fileId: string } | null;
  companyName?: string;
  agentStatus?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, loginAs: UserRole) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<User>) => void;
  refreshProfile: () => Promise<void>;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapApiRole(apiRole: string): UserRole {
  switch (apiRole) {
    case "AGENT": return "partner";
    case "ADMIN":
    case "ROOTADMIN": return "admin";
    case "TRAVELER":
    default: return "customer";
  }
}

function mapProfileToUser(data: any, role: UserRole, apiRole: ApiRole): User {
  return {
    id: data.id || data.userId || "",
    name: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    role,
    apiRole,
    verified: data.emailVerified ?? false,
    createdAt: data.createdAt || new Date().toISOString(),
    profileImage: data.profileImage || null,
    avatar: data.profileImage?.imageUrl || undefined,
    companyName: data.agentProfile?.companyName || data.companyName || undefined,
    agentStatus: data.agentProfile?.status || data.status || undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("bb_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Persist user to localStorage
  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem("bb_user", JSON.stringify(u));
      localStorage.setItem("bb_role", u.role);
    } else {
      localStorage.removeItem("bb_user");
      localStorage.removeItem("bb_role");
    }
  }, []);

  // Fetch profile based on role
  const fetchProfile = useCallback(async (role: UserRole): Promise<User | null> => {
    const getProfile = getProfileApiForRole(role);
    const res = await getProfile();
    if (res.success && res.data) {
      const apiRole: ApiRole = role === "admin" ? "ADMIN" : role === "partner" ? "AGENT" : "TRAVELER";
      return mapProfileToUser(res.data, role, apiRole);
    }
    return null;
  }, []);

  // Login with role selection
  const login = useCallback(async (email: string, password: string, loginAs: UserRole) => {
    setIsLoading(true);
    try {
      // Call the correct login endpoint based on selected role
      let loginFn: (data: { email: string; password: string }) => Promise<any>;
      switch (loginAs) {
        case "admin": loginFn = adminApi.login; break;
        case "partner": loginFn = agentApi.login; break;
        case "customer":
        default: loginFn = userApi.login; break;
      }

      const result = await loginFn({ email, password });

      if (!result.success) {
        return { success: false, error: result.message || "Login failed" };
      }

      // Login sets cookies, now fetch profile
      const profileUser = await fetchProfile(loginAs);
      if (profileUser) {
        persistUser(profileUser);
        return { success: true };
      }

      // If profile fetch fails, create minimal user from login info
      const minimalUser: User = {
        id: "",
        name: email.split("@")[0],
        email,
        phone: "",
        role: loginAs,
        apiRole: loginAs === "admin" ? "ADMIN" : loginAs === "partner" ? "AGENT" : "TRAVELER",
        verified: false,
        createdAt: new Date().toISOString(),
      };
      persistUser(minimalUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || "Network error" };
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile, persistUser]);

  // Signup
  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    try {
      let result: any;

      if (data.role === "customer") {
        result = await userApi.register({
          fullName: data.name,
          email: data.email,
          password: data.password,
        });
      } else if (data.role === "admin") {
        result = await adminApi.register({
          fullName: data.name,
          email: data.email,
          password: data.password,
        });
      } else {
        // For partner/agent, we do a basic registration
        // Full agent registration requires more fields - redirect to complete profile
        result = await agentApi.register({
          fullName: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          profileImageUrl: "https://via.placeholder.com/150",
          profileImageFileId: "placeholder",
          companyName: data.name + "'s Travel Agency",
          aadharNumber: "000000000000",
          bannerImageUrl: "https://via.placeholder.com/600x200",
          bannerImageFileId: "placeholder_banner",
          addressType: "PERMANENT",
          country: "India",
          state: "Odisha",
          district: "Bhubaneswar",
          pin: "751001",
          city: "Bhubaneswar",
          aadharDocumentUrl: "https://via.placeholder.com/doc",
          aadharDocumentFileId: "placeholder_doc",
        });
      }

      if (!result.success) {
        return { success: false, error: result.message || "Registration failed" };
      }

      // After registration, cookies are set. Fetch profile.
      const profileUser = await fetchProfile(data.role);
      if (profileUser) {
        persistUser(profileUser);
      } else {
        // Minimal user
        const minimalUser: User = {
          id: "",
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          apiRole: data.role === "admin" ? "ADMIN" : data.role === "partner" ? "AGENT" : "TRAVELER",
          verified: false,
          createdAt: new Date().toISOString(),
        };
        persistUser(minimalUser);
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error?.message || "Network error" };
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile, persistUser]);

  // Logout
  const logout = useCallback(async () => {
    if (user) {
      try {
        const logoutFn = getLogoutApiForRole(user.role);
        await logoutFn();
      } catch {
        // Ignore logout API errors
      }
    }
    persistUser(null);
  }, [user, persistUser]);

  // Forgot password (placeholder - API may not have this endpoint)
  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      // The API doesn't have a forgot password endpoint documented
      // Simulate for now
      await new Promise((r) => setTimeout(r, 800));
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update local profile
  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("bb_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Refresh profile from API
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const profileUser = await fetchProfile(user.role);
    if (profileUser) {
      persistUser(profileUser);
    }
  }, [user, fetchProfile, persistUser]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      forgotPassword,
      updateProfile,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
