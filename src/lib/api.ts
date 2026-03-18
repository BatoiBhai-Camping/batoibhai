const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1";

export interface ApiErrorItem {
  field?: string;
  message?: string;
  code?: string;
  path?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T | null;
  message: string;
  errors?: ApiErrorItem[];
}

export interface AddressInput {
  id?: string;
  addressType?: "PERMANENT" | "CURRENT" | "TRAVEL";
  country?: string;
  state?: string;
  district?: string;
  pin?: string;
  city?: string;
  longitude?: string;
  latitude?: string;
}

export interface ImageAsset {
  id?: string;
  imageUrl: string;
  fileId: string;
}

export interface PublicPackageRecord {
  id?: string;
  packageId?: string;
  agentId?: string;
  title?: string;
  name?: string;
  description?: string;
  pricePerPerson?: number;
  price?: number;
  packageApprovedStatus?: string;
  approveStatus?: string;
  discountAmount?: number;
  discountPercentage?: number;
  withTax?: boolean;
  taxPercentage?: number;
  totalSeats?: number;
  seatsAvailable?: number;
  seatBooked?: number;
  bookedSeats?: number;
  destination?: string;
  durationDays?: number;
  startDate?: string;
  endDate?: string;
  bookingActiveFrom?: string;
  bookingEndAt?: string;
  packagePolicies?: string;
  cancellationPolicies?: string;
  isBookingActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  packageBannerImage?: { url?: string; imageUrl?: string; fileId?: string };
  bannerImage?: ImageAsset;
  bannerImageUrl?: string;
  packageBannerImageId?: string;
  agent?: {
    companyName?: string;
  };
}

export interface UserProfileRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: "TRAVELER";
  emailVerified: boolean;
  profileImage?: ImageAsset | null;
  addresses?: AddressInput[];
  createdAt: string;
}

export interface AgentProfileRecord {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  profileImage?: ImageAsset | null;
  agentProfile?: {
    id: string;
    companyName: string;
    description?: string;
    aadharNumber?: string;
    panNumber?: string;
    gstNumber?: string;
    status?: string;
    bannerImage?: ImageAsset | null;
  };
  addresses?: AddressInput[];
  documents?: Array<{
    id?: string;
    documentType?: string;
    documentUrl?: string;
    documentFileId?: string;
  }>;
  createdAt: string;
}

export interface AdminProfileRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "ROOTADMIN";
  roleStatus?: string;
  emailVerified: boolean;
  profileImage?: ImageAsset | null;
  createdAt: string;
}

export interface AgentListRecord {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  status?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface UserListRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface AdminPaymentRecord {
  paymentId?: string;
  bookingId?: string;
  userId?: string;
  amount?: number;
  status?: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt?: string;
}

export interface PaymentOrderRecord {
  orderId: string;
  amount: number;
  currency: string;
  bookingId: string;
  bookingCode: string;
  paymentId: string;
  packageTitle: string;
  numberOfTravelers: number;
  breakdown?: {
    baseAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
  };
  razorpayKeyId: string;
}

function isApiEnvelope<T>(value: unknown): value is ApiResponse<T> {
  return typeof value === "object" && value !== null && "success" in value && "statusCode" in value;
}

function buildHeaders(body: BodyInit | null | undefined, headers?: HeadersInit): HeadersInit {
  const nextHeaders = new Headers(headers);
  if (body && !(body instanceof FormData) && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json");
  }
  return nextHeaders;
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    ...options,
    credentials: "include",
    headers: buildHeaders(options.body, options.headers),
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload: unknown = isJson ? await response.json() : null;

    if (isApiEnvelope<T>(payload)) {
      return payload;
    }

    return {
      success: response.ok,
      statusCode: response.status,
      data: (payload as T | null) ?? null,
      message: response.ok ? "Request successful" : `Request failed with status ${response.status}`,
      errors: undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error. Please try again.";
    return {
      success: false,
      statusCode: 500,
      data: null,
      message,
      errors: undefined,
    };
  }
}

export const appApi = {
  getAllPackages: () => apiFetch<PublicPackageRecord[]>("/app/get-all-pkg", { method: "GET" }),
};

export const userApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch<null>("/user/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch<null>("/user/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch<null>("/user/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch<null>("/user/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  getProfile: () => apiFetch<UserProfileRecord>("/user/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
    addresses?: AddressInput[];
  }) => apiFetch<UserProfileRecord>("/user/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () => apiFetch<null>("/user/logout", { method: "DELETE" }),

  deleteAccount: () => apiFetch<null>("/user/delete-acc", { method: "DELETE" }),
};

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
  }) => apiFetch<null>("/agent/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch<null>("/agent/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch<null>("/agent/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch<null>("/agent/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  getProfile: () => apiFetch<AgentProfileRecord>("/agent/get-profile", { method: "GET" }),

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
    addresses?: AddressInput[];
  }) => apiFetch<AgentProfileRecord>("/agent/update-profile", { method: "POST", body: JSON.stringify(data) }),

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
  }) => apiFetch<null>("/agent/publish-package", { method: "POST", body: JSON.stringify(data) }),

  getAllPackages: () => apiFetch<PublicPackageRecord[]>("/agent/get-all-pkgs", { method: "GET" }),

  updatePackage: (data: Record<string, unknown>) =>
    apiFetch<null>("/agent/update-package", { method: "POST", body: JSON.stringify(data) }),

  logout: () => apiFetch<null>("/agent/logout", { method: "DELETE" }),

  deleteAccount: () => apiFetch<null>("/agent/delete-acc", { method: "DELETE" }),
};

export const adminApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch<null>("/admin/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch<null>("/admin/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch<null>("/admin/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  resendVerification: () =>
    apiFetch<null>("/admin/send-verification-link", { method: "POST", body: JSON.stringify({}) }),

  approveAgent: (agentId: string) =>
    apiFetch<null>("/admin/approve-agent", { method: "POST", body: JSON.stringify({ agentId }) }),

  approvePackage: (packageId: string) =>
    apiFetch<null>("/admin/approve-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  rejectPackage: (packageId: string) =>
    apiFetch<null>("/admin/reject-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  getAllAgents: () => apiFetch<AgentListRecord[]>("/admin/get-all-agent", { method: "GET" }),

  getAllUsers: () => apiFetch<UserListRecord[]>("/admin/get-all-user", { method: "GET" }),

  getAllPackages: () => apiFetch<PublicPackageRecord[]>("/admin/get-all-pkg", { method: "GET" }),

  getAgentPackages: (id: string) =>
    apiFetch<PublicPackageRecord[]>("/admin/get-agent-pkg", { method: "POST", body: JSON.stringify({ id }) }),

  getAllPayments: () => apiFetch<AdminPaymentRecord[]>("/admin/get-all-payments", { method: "GET" }),

  getProfile: () => apiFetch<AdminProfileRecord>("/admin/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
  }) => apiFetch<AdminProfileRecord>("/admin/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () => apiFetch<null>("/admin/logout", { method: "DELETE" }),

  deleteAccount: () => apiFetch<null>("/admin/delete-acc", { method: "DELETE" }),
};

export const rootAdminApi = {
  register: (data: { fullName: string; email: string; password: string }) =>
    apiFetch<null>("/root-admin/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch<null>("/root-admin/login", { method: "POST", body: JSON.stringify(data) }),

  verifyAccount: (verifyToken: string) =>
    apiFetch<null>("/root-admin/verify-account", { method: "POST", body: JSON.stringify({ verifyToken }) }),

  approveSubAdmin: (adminId: string) =>
    apiFetch<null>("/root-admin/approve-sub-admin", { method: "POST", body: JSON.stringify({ adminId }) }),

  rejectSubAdmin: (adminId: string) =>
    apiFetch<null>("/root-admin/reject-sub-admin", { method: "POST", body: JSON.stringify({ adminId }) }),

  approveAgent: (agentId: string) =>
    apiFetch<null>("/root-admin/approve-agent", { method: "POST", body: JSON.stringify({ agentId }) }),

  approvePackage: (packageId: string) =>
    apiFetch<null>("/root-admin/approve-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  rejectPackage: (packageId: string) =>
    apiFetch<null>("/root-admin/reject-pkg", { method: "POST", body: JSON.stringify({ packageId }) }),

  getAllSubAdmins: () => apiFetch<UserListRecord[]>("/root-admin/get-all-sub-admin", { method: "GET" }),

  getAllAgents: () => apiFetch<AgentListRecord[]>("/root-admin/get-all-agent", { method: "GET" }),

  getAllUsers: () => apiFetch<UserListRecord[]>("/root-admin/get-all-user", { method: "GET" }),

  getAllPackages: () => apiFetch<PublicPackageRecord[]>("/root-admin/get-all-pkg", { method: "GET" }),

  getAgentPackages: (id: string) =>
    apiFetch<PublicPackageRecord[]>("/root-admin/get-agent-pkg", { method: "POST", body: JSON.stringify({ id }) }),

  getAllPayments: () => apiFetch<AdminPaymentRecord[]>("/root-admin/get-all-payments", { method: "GET" }),

  getProfile: () => apiFetch<AdminProfileRecord>("/root-admin/get-profile", { method: "GET" }),

  updateProfile: (data: {
    fullName?: string;
    phone?: string;
    profileImageUrl?: string;
    profileFileId?: string;
  }) => apiFetch<AdminProfileRecord>("/root-admin/update-profile", { method: "POST", body: JSON.stringify(data) }),

  logout: () => apiFetch<null>("/root-admin/logout", { method: "DELETE" }),

  deleteAccount: () => apiFetch<null>("/root-admin/delete-acc", { method: "DELETE" }),
};

export const paymentApi = {
  createOrder: (data: { packageId: string; numberOfTravelers: number }) =>
    apiFetch<PaymentOrderRecord>("/payment/create-order", { method: "POST", body: JSON.stringify(data) }),

  verifyPayment: (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    bookingId: string;
    paymentId: string;
  }) => apiFetch<null>("/payment/verify-payment", { method: "POST", body: JSON.stringify(data) }),
};

export type ApiRole = "TRAVELER" | "AGENT" | "ADMIN" | "ROOTADMIN";

export function roleToRoute(role: ApiRole): string {
  switch (role) {
    case "TRAVELER":
      return "customer";
    case "AGENT":
      return "partner";
    case "ADMIN":
    case "ROOTADMIN":
      return "admin";
    default:
      return "customer";
  }
}

export function getLoginApiForRole(role: string) {
  switch (role) {
    case "admin":
      return adminApi.login;
    case "partner":
      return agentApi.login;
    case "customer":
    default:
      return userApi.login;
  }
}

export function getProfileApiForRole(role: string) {
  switch (role) {
    case "admin":
      return adminApi.getProfile;
    case "partner":
      return agentApi.getProfile;
    case "customer":
    default:
      return userApi.getProfile;
  }
}

export function getLogoutApiForRole(role: string) {
  switch (role) {
    case "admin":
      return adminApi.logout;
    case "partner":
      return agentApi.logout;
    case "customer":
    default:
      return userApi.logout;
  }
}

export function getProfileUpdateApiForRole(role: string) {
  switch (role) {
    case "admin":
      return adminApi.updateProfile;
    case "partner":
      return agentApi.updateProfile;
    case "customer":
    default:
      return userApi.updateProfile;
  }
}

export function getPrimaryErrorMessage<T>(response: ApiResponse<T>): string {
  return response.errors?.find((error) => error.message)?.message || response.message;
}
