// BatoiBhai API Service Layer
// Base URL for all API calls

const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1";

// Generic fetch wrapper with cookie-based auth

async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; statusCode: number; data: T | null; message: string; errors?: any[] }> {
 const url = `${API_BASE}${endpoint}`;

const config: RequestInit = {
  ...options,
  credentials: "include",
  headers: {
    ...(options?.headers || {}),
    "Content-Type": "application/json",
  },
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const json = isJson ? await response.json() : null;

    if (json) return json;

    return {
      success: response.ok,
      statusCode: response.status,
      data: null,
      message: response.ok ? "Request successful" : `Request failed with status ${response.status}`,
      errors: [],
    };
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      data: null,
      message: error?.message || "Network error. Please try again.",
      errors: [],
    };
  }
}

// ============ APP (Public) ============

export const appApi = {
  /** Get all available packages (public, no auth) */
  getAllPackages: () =>
    apiFetch("/app/get-all-pkg", { method: "GET" }),
};

// ============ USER (Traveler) ============

export const userApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch("/user/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch("/user/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch("/user/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch("/user/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  getProfile: () =>
    apiFetch("/user/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
    addresses?: Array<{
      id?: string;
      addressType?: "PERMANENT" | "CURRENT" | "TRAVEL";
      country?: string;
      state?: string;
      district?: string;
      pin?: string;
      city?: string;
      longitude?: string;
      latitude?: string;
    }>;
  }) =>
    apiFetch("/user/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () =>
    apiFetch("/user/logout", { method: "DELETE" }),

  deleteAccount: () =>
    apiFetch("/user/delete-acc", { method: "DELETE" }),
};

// ============ AGENT (Partner) ============

export const agentApi = {
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    profileImageUrl: string;
    profileImageFileId: string;
    companyName: string;
    description?: string;
    aadharNumber: string;
    panNumber?: string;
    gstNumber?: string;
    bannerImageUrl: string;
    bannerImageFileId: string;
    addressType: "PERMANENT" | "CURRENT" | "TRAVEL";
    country: string;
    state: string;
    district: string;
    pin: string;
    city: string;
    longitude?: string;
    latitude?: string;
    aadharDocumentUrl: string;
    aadharDocumentFileId: string;
    panDocumentUrl?: string;
    panDocumentFileId?: string;
  }) =>
    apiFetch("/agent/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch("/agent/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch("/agent/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch("/agent/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  getProfile: () =>
    apiFetch("/agent/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
    companyName?: string;
    description?: string;
    aadharNumber?: string;
    panNumber?: string;
    gstNumber?: string;
    bannerImageUrl?: string;
    bannerFileId?: string;
    addresses?: Array<{
      id?: string;
      addressType?: string;
      country?: string;
      state?: string;
      district?: string;
      pin?: string;
      city?: string;
    }>;
  }) =>
    apiFetch("/agent/update-profile", { method: "POST", body: JSON.stringify(data) }),

  publishPackage: (data: {
    title: string;
    description: string;
    pricePerPerson: number;
    totalSeats: number;
    destination: string;
    durationDays: number;
    bookingActiveFrom: string;
    bookingEndAt: string;
    bannerImageUrl: string;
    bannerImageFileId: string;
    discountAmount?: number;
    discountPercentage?: number;
    withTax?: boolean;
    taxPercentage?: number;
    startDate?: string;
    endDate?: string;
    packagePolicies?: string;
    cancellationPolicies?: string;
    packageImages?: Array<{ imageUrl: string; fileId: string }>;
    itineraryDays: Array<{
      dayNumber: number;
      title: string;
      description?: string;
      hotelStay?: {
        hotelName: string;
        checkIn?: string;
        checkOut?: string;
        address?: string;
        wifi?: boolean;
        tv?: boolean;
        attachWashroom?: boolean;
        acRoom?: boolean;
        kitchen?: boolean;
      };
      transports: Array<{
        fromLocation: string;
        toLocation: string;
        mode: string;
        startTime?: string;
        endTime?: string;
      }>;
      visits: Array<{
        name: string;
        address?: string;
        description?: string;
        visitTime?: string;
      }>;
      meals?: Array<{
        type: "BREAKFAST" | "LUNCH" | "DINNER";
        mealDescription?: string;
      }>;
    }>;
  }) =>
    apiFetch("/agent/publish-package", { method: "POST", body: JSON.stringify(data) }),

  getAllPackages: () =>
    apiFetch("/agent/get-all-pkgs", { method: "GET" }),

  updatePackage: (data: any) =>
    apiFetch("/agent/update-package", { method: "POST", body: JSON.stringify(data) }),

  logout: () =>
    apiFetch("/agent/logout", { method: "DELETE" }),

  deleteAccount: () =>
    apiFetch("/agent/delete-acc", { method: "DELETE" }),
};

// ============ ADMIN ============

export const adminApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch("/admin/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch("/admin/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch("/admin/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch("/admin/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  approveAgent: (agentId: string) =>
    apiFetch("/admin/approve-agent", { method: "POST", body: JSON.stringify({ agentId }) }),

  approvePackage: (packageId: string) =>
    apiFetch("/admin/approve-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  rejectPackage: (packageId: string) =>
    apiFetch("/admin/reject-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  getAllAgents: () =>
    apiFetch("/admin/get-all-agent", { method: "GET" }),

  getAllUsers: () =>
    apiFetch("/admin/get-all-user", { method: "GET" }),

  getAllPackages: () =>
    apiFetch("/admin/get-all-pkg", { method: "GET" }),

  getAgentPackages: (id: string) =>
    apiFetch("/admin/get-agent-pkg", { method: "POST", body: JSON.stringify({ id }) }),

  getAllPayments: () =>
    apiFetch("/admin/get-all-payments", { method: "GET" }),

  getProfile: () =>
    apiFetch("/admin/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
  }) =>
    apiFetch("/admin/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () =>
    apiFetch("/admin/logout", { method: "DELETE" }),

  deleteAccount: () =>
    apiFetch("/admin/delete-acc", { method: "DELETE" }),
};

// ============ ROOT ADMIN ============

export const rootAdminApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch("/root-admin/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch("/root-admin/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch("/root-admin/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  approveSubAdmin: (adminId: string) =>
    apiFetch("/root-admin/approve-sub-admin", { method: "POST", body: JSON.stringify({ adminId }) }),

  rejectSubAdmin: (adminId: string) =>
    apiFetch("/root-admin/reject-sub-admin", { method: "POST", body: JSON.stringify({ adminId }) }),

  approveAgent: (agentId: string) =>
    apiFetch("/root-admin/approve-agent", { method: "POST", body: JSON.stringify({ agentId }) }),

  approvePackage: (packageId: string) =>
    apiFetch("/root-admin/approve-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  rejectPackage: (packageId: string) =>
    apiFetch("/root-admin/reject-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  getAllSubAdmins: () =>
    apiFetch("/root-admin/get-all-sub-admin", { method: "GET" }),

  getAllAgents: () =>
    apiFetch("/root-admin/get-all-agent", { method: "GET" }),

  getAllUsers: () =>
    apiFetch("/root-admin/get-all-user", { method: "GET" }),

  getAllPackages: () =>
    apiFetch("/root-admin/get-all-pkg", { method: "GET" }),

  getAgentPackages: (id: string) =>
    apiFetch("/root-admin/get-agent-pkg", { method: "POST", body: JSON.stringify({ id }) }),

  getAllPayments: () =>
    apiFetch("/root-admin/get-all-payments", { method: "GET" }),

  getProfile: () =>
    apiFetch("/root-admin/get-profile", { method: "GET" }),

  updateProfile: (data: any) =>
    apiFetch("/root-admin/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () =>
    apiFetch("/root-admin/logout", { method: "DELETE" }),

  deleteAccount: () =>
    apiFetch("/root-admin/delete-acc", { method: "DELETE" }),
};

// ============ PAYMENT ============

export const paymentApi = {
  createOrder: (data: { packageId: string; numberOfTravelers: number }) =>
    apiFetch("/payment/create-order", { method: "POST", body: JSON.stringify(data) }),

  verifyPayment: (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    bookingId: string;
    paymentId: string;
  }) =>
    apiFetch("/payment/verify-payment", { method: "POST", body: JSON.stringify(data) }),
};

// ============ ROLE HELPERS ============

export type ApiRole = "TRAVELER" | "AGENT" | "ADMIN" | "ROOTADMIN";

/** Map API role to frontend route prefix */
export function roleToRoute(role: ApiRole): string {
  switch (role) {
    case "TRAVELER": return "customer";
    case "AGENT": return "partner";
    case "ADMIN":
    case "ROOTADMIN": return "admin";
    default: return "customer";
  }
}

/** Map frontend role to API login endpoint */
export function getLoginApiForRole(role: string) {
  switch (role) {
    case "admin": return adminApi.login;
    case "partner": return agentApi.login;
    case "customer":
    default: return userApi.login;
  }
}

/** Map frontend role to profile fetcher */
export function getProfileApiForRole(role: string) {
  switch (role) {
    case "admin": return adminApi.getProfile;
    case "partner": return agentApi.getProfile;
    case "customer":
    default: return userApi.getProfile;
  }
}

/** Map frontend role to logout API */
export function getLogoutApiForRole(role: string) {
  switch (role) {
    case "admin": return adminApi.logout;
    case "partner": return agentApi.logout;
    case "customer":
    default: return userApi.logout;
  }
}
