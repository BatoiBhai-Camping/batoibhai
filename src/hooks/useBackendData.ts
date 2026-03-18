import { useCallback, useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { adminApi, agentApi, appApi } from "@/lib/api";
import {
  adminStats as fallbackAdminStats,
  analyticsData as fallbackAnalytics,
  bookings as fallbackBookings,
  customers as fallbackCustomers,
  destinations as fallbackDestinations,
  hotels as fallbackHotels,
  notifications as fallbackNotifications,
  offers as fallbackOffers,
  packages as fallbackPackages,
  partnerStats as fallbackPartnerStats,
  partners as fallbackPartners,
  reviews as fallbackReviews,
} from "@/data/dummyData";

const toArray = <T,>(value: unknown, fallback: T[]): T[] => (Array.isArray(value) ? (value as T[]) : fallback);

export function usePublicData() {
  const fetcher = useCallback(() => appApi.getAllPackages(), []);
  const { data, isLoading } = useApi<any>(fetcher, []);

  const packageList = useMemo(() => {
    const list = toArray<any>(data, []);
    if (!list.length) return fallbackPackages;
    return list.map((p: any, idx: number) => ({
      id: p.id || idx + 1,
      name: p.title || p.name || "Untitled Package",
      duration: `${p.durationDays || 1} Days`,
      price: Number(p.pricePerPerson || p.price || 0),
      maxPeople: Number(p.totalSeats || 0),
      includes: p.tags || ["Hotel", "Transport"],
      partner: p.agent?.companyName || "Verified Partner",
      status: p.isBookingActive ? "active" : "pending",
      destination: p.destination || "",
      image: p.packageBannerImage?.url || p.bannerImageUrl || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
      rating: 4.6,
      description: p.description || "",
      bookings: Number(p.seatBooked || 0),
      category: (p.tags?.[0] || "Travel") as string,
      // Keep raw API fields for booking
      discountAmount: p.discountAmount,
      discountPercentage: p.discountPercentage,
      withTax: p.withTax,
      taxPercentage: p.taxPercentage,
      isBookingActive: p.isBookingActive,
      bookingActiveFrom: p.bookingActiveFrom,
      bookingEndAt: p.bookingEndAt,
      availableSeats: p.availableSeats,
    }));
  }, [data]);

  const destinations = useMemo(() => {
    if (!packageList.length) return fallbackDestinations;
    return packageList.slice(0, 8).map((p: any, idx: number) => ({
      id: p.id || idx + 1,
      name: p.name,
      location: p.destination || "Odisha",
      image: p.image,
      price: p.price,
      rating: p.rating,
      category: p.category,
      bookings: p.bookings,
      description: p.description,
    }));
  }, [packageList]);

  return {
    packages: packageList,
    destinations,
    hotels: fallbackHotels,
    offers: fallbackOffers,
    isLoading,
  };
}

export function useAdminData() {
  const { data: agents, isLoading: loadingAgents, refetch: refetchAgents } = useApi<any>(useCallback(() => adminApi.getAllAgents(), []), []);
  const { data: users, isLoading: loadingUsers, refetch: refetchUsers } = useApi<any>(useCallback(() => adminApi.getAllUsers(), []), []);
  const { data: packages, isLoading: loadingPkgs, refetch: refetchPackages } = useApi<any>(useCallback(() => adminApi.getAllPackages(), []), []);
  const { data: payments, isLoading: loadingPayments, refetch: refetchPayments } = useApi<any>(useCallback(() => adminApi.getAllPayments(), []), []);

  const isLoading = loadingAgents || loadingUsers || loadingPkgs || loadingPayments;
  const refetchAll = useCallback(() => {
    refetchAgents(); refetchUsers(); refetchPackages(); refetchPayments();
  }, [refetchAgents, refetchUsers, refetchPackages, refetchPayments]);

  const partnerList = toArray<any>(agents, []).length
    ? toArray<any>(agents, []).map((a: any, i: number) => ({
        id: a.id || a.userId || i + 1,
        name: a.companyName || a.fullName || "Unknown",
        owner: a.fullName || "",
        email: a.email || "-",
        phone: a.phone || "-",
        packages: 0,
        revenue: 0,
        rating: 0,
        status: (a.agentApprovedStatus || a.status || "PENDING").toString().toLowerCase() === "approved" ? "verified" : "pending",
        joined: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "",
      }))
    : fallbackPartners;

  const customerList = toArray<any>(users, []).length
    ? toArray<any>(users, []).map((u: any, i: number) => ({
        id: u.id || i + 1,
        name: u.fullName || u.name || "Traveler",
        email: u.email || "-",
        phone: u.phone || "-",
        status: (u.verifyAccountStatus || u.status || "active").toString().toLowerCase(),
        joinedDate: u.createdAt || new Date().toISOString(),
        bookings: Number(u.bookings || 0),
        spent: Number(u.spent || 0),
      }))
    : fallbackCustomers;

  const packageList = toArray<any>(packages, fallbackPackages);

  const paymentList = toArray<any>(payments, []);

  const bookingList = paymentList.length
    ? paymentList.map((p: any, i: number) => ({
        id: p.bookingCode || p.id || p.bookingId || `BK-${i + 1}`,
        customer: p.user?.fullName || p.traveler?.fullName || "Traveler",
        package: p.package?.title || p.packageName || "Travel Package",
        date: (p.createdAt || new Date().toISOString()).slice(0, 10),
        amount: Number(p.amount || p.payableAmount || p.totalAmount || 0),
        status: (p.status || p.paymentStatus || "pending").toString().toLowerCase(),
        partner: p.agent?.companyName || "Partner",
        travelers: Number(p.numberOfTravelers || 1),
        razorpayPaymentId: p.razorpayPaymentId,
      }))
    : fallbackBookings;

  const adminStats = {
    ...fallbackAdminStats,
    totalPartners: partnerList.length || fallbackAdminStats.totalPartners,
    totalCustomers: customerList.length || fallbackAdminStats.totalCustomers,
    totalBookings: bookingList.length || fallbackAdminStats.totalBookings,
    totalRevenue: bookingList.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || fallbackAdminStats.totalRevenue,
  };

  return {
    partners: partnerList,
    customers: customerList,
    bookings: bookingList,
    packages: packageList,
    adminStats,
    analyticsData: fallbackAnalytics,
    revenueData: fallbackAnalytics.bookingsByMonth.map((m) => ({ month: m.month, revenue: m.revenue })),
    notifications: fallbackNotifications,
    isLoading,
    refetchAll,
  };
}

export function usePartnerData() {
  const { data: packages, isLoading, refetch } = useApi<any>(useCallback(() => agentApi.getAllPackages(), []), []);

  const packageList = toArray<any>(packages, []).length
    ? toArray<any>(packages, []).map((p: any, i: number) => ({
        id: p.id || i + 1,
        name: p.title || p.name || "Package",
        duration: `${p.durationDays || 1} Days`,
        price: Number(p.pricePerPerson || p.price || 0),
        maxPeople: Number(p.totalSeats || p.maxPeople || 0),
        includes: p.tags || p.includes || ["Transport"],
        partner: p.agent?.companyName || p.partner || "My Agency",
        status: (p.packageApprovedStatus || p.status || "pending").toString().toLowerCase() === "approved" ? "active" : "pending",
        destination: p.destination || "",
        description: p.description || "",
        durationDays: p.durationDays,
        pricePerPerson: p.pricePerPerson,
        totalSeats: p.totalSeats,
        bannerImageUrl: p.packageBannerImage?.url || p.bannerImageUrl || "",
      }))
    : fallbackPackages;

  return {
    packages: packageList,
    bookings: fallbackBookings,
    partnerStats: {
      ...fallbackPartnerStats,
      totalPackages: packageList.length || fallbackPartnerStats.totalPackages,
    },
    reviews: fallbackReviews,
    analyticsData: fallbackAnalytics,
    notifications: fallbackNotifications,
    isLoading,
    refetchPackages: refetch,
  };
}
