import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import {
  adminApi,
  agentApi,
  getLoginApiForRole,
  getLogoutApiForRole,
  getPrimaryErrorMessage,
  getProfileApiForRole,
  type AdminProfileRecord,
  type AgentProfileRecord,
  type ApiRole,
  type UserProfileRecord,
  userApi,
} from "@/lib/api";

export type UserRole = "admin" | "partner" | "customer";

type ProfileRecord = UserProfileRecord | AgentProfileRecord | AdminProfileRecord;

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
  logout: () => Promise<void>;
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

function mapApiRole(apiRole: ApiRole): UserRole {
  switch (apiRole) {
    case "AGENT":
      return "partner";
    case "ADMIN":
    case "ROOTADMIN":
      return "admin";
    case "TRAVELER":
    default:
      return "customer";
  }
}

function inferApiRole(profile: ProfileRecord, fallbackRole: UserRole): ApiRole {
  if ("agentProfile" in profile) return "AGENT";
  if (profile.role === "ADMIN" || profile.role === "ROOTADMIN") return profile.role;
  if (profile.role === "TRAVELER") return "TRAVELER";
  return fallbackRole === "admin" ? "ADMIN" : fallbackRole === "partner" ? "AGENT" : "TRAVELER";
}

function mapProfileToUser(profile: ProfileRecord, fallbackRole: UserRole): User {
  const apiRole = inferApiRole(profile, fallbackRole);

  return {
    id: profile.id || ("userId" in profile ? profile.userId : ""),
    name: profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    role: mapApiRole(apiRole),
    apiRole,
    verified: profile.emailVerified ?? false,
    createdAt: profile.createdAt || new Date().toISOString(),
    profileImage: profile.profileImage || null,
    avatar: profile.profileImage?.imageUrl,
    companyName: "agentProfile" in profile ? profile.agentProfile?.companyName : undefined,
    agentStatus: "agentProfile" in profile ? profile.agentProfile?.status : undefined,
  };
}

function getStoredUser(): User | null {
  const stored = localStorage.getItem("bb_user");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    localStorage.removeItem("bb_user");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const persistUser = useCallback((nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("bb_user", JSON.stringify(nextUser));
      localStorage.setItem("bb_role", nextUser.role);
    } else {
      localStorage.removeItem("bb_user");
      localStorage.removeItem("bb_role");
    }
  }, []);

  const fetchProfile = useCallback(async (role: UserRole): Promise<User | null> => {
    const getProfile = getProfileApiForRole(role);
    const response = await getProfile();
    if (!response.success || !response.data) return null;
    return mapProfileToUser(response.data, role);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      if (user) return;

      const storedRole = localStorage.getItem("bb_role");
      if (storedRole !== "admin" && storedRole !== "partner" && storedRole !== "customer") return;

      setIsLoading(true);
      try {
        const restoredUser = await fetchProfile(storedRole);
        if (restoredUser) {
          persistUser(restoredUser);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void restoreSession();
  }, [fetchProfile, persistUser, user]);

  const login = useCallback(
    async (email: string, password: string, loginAs: UserRole) => {
      setIsLoading(true);
      try {
        const response = await getLoginApiForRole(loginAs)({ email, password });
        if (!response.success) {
          return { success: false, error: getPrimaryErrorMessage(response) };
        }

        const profileUser = await fetchProfile(loginAs);
        if (profileUser) {
          persistUser(profileUser);
          return { success: true };
        }

        return { success: false, error: "Login succeeded, but your profile could not be loaded yet." };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Network error" };
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProfile, persistUser]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      setIsLoading(true);
      try {
        const response =
          data.role === "customer"
            ? await userApi.register({ fullName: data.name, email: data.email, password: data.password })
            : data.role === "admin"
              ? await adminApi.register({ fullName: data.name, email: data.email, password: data.password })
              : await agentApi.register({
                  fullName: data.name,
                  email: data.email,
                  password: data.password,
                  phone: data.phone || "+919999999999",
                  profileImageUrl: "https://placehold.co/200x200/png",
                  profileImageFileId: "temporary-profile-image",
                  companyName: `${data.name} Travels`,
                  description: "Travel partner onboarding from the BatoiBhai web app",
                  aadharNumber: "123456789012",
                  bannerImageUrl: "https://placehold.co/1200x400/png",
                  bannerImageFileId: "temporary-banner-image",
                  addressType: "PERMANENT",
                  country: "India",
                  state: "Odisha",
                  district: "Khordha",
                  pin: "751001",
                  city: "Bhubaneswar",
                  aadharDocumentUrl: "https://placehold.co/600x800/png",
                  aadharDocumentFileId: "temporary-aadhar-document",
                });

        if (!response.success) {
          return { success: false, error: getPrimaryErrorMessage(response) };
        }

        const profileUser = await fetchProfile(data.role);
        if (profileUser) {
          persistUser(profileUser);
          return { success: true };
        }

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
        return { success: true };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Network error" };
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProfile, persistUser]
  );

  const logout = useCallback(async () => {
    if (user) {
      try {
        await getLogoutApiForRole(user.role)();
      } catch {
        // Ignore logout API errors and clear local auth state regardless.
      }
    }

    persistUser(null);
  }, [persistUser, user]);

  const forgotPassword = useCallback(async (_email: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((previousUser) => {
      if (!previousUser) return previousUser;
      const updatedUser = { ...previousUser, ...data };
      localStorage.setItem("bb_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    const refreshedUser = await fetchProfile(user.role);
    if (refreshedUser) {
      persistUser(refreshedUser);
    }
  }, [fetchProfile, persistUser, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        forgotPassword,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
