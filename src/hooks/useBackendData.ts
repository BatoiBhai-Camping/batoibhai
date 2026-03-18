import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import {
  adminApi,
  agentApi,
  appApi,
  type AdminPaymentRecord,
  type AgentListRecord,
  type PublicPackageRecord,
  type UserListRecord,
} from "@/lib/api";
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
  myTrips as fallbackMyTrips,
  wishlist as fallbackWishlist,
} from "@/data/dummyData";

interface NormalizedPackage {
  id: number;
  apiId: string;
  name: string;
  duration: string;
  price: number;
  maxPeople: number;
  includes: string[];
  partner: string;
  status: string;
  destination: string;
  image: string;
  rating: number;
  description: string;
  bookings: number;
  category: string;
}

const FALLBACK_PACKAGE_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop";

function getPackageId(pkg: PublicPackageRecord, index: number): string {
  return pkg.id || pkg.packageId || String(index + 1);
}

function getPackageStatus(pkg: PublicPackageRecord): string {
  const rawStatus = pkg.packageApprovedStatus || pkg.approveStatus;
  if (rawStatus) {
    const normalized = rawStatus.toLowerCase();
    if (normalized === "approved") return "active";
    if (normalized === "rejected") return "cancelled";
    return normalized;
  }

  if (pkg.isBookingActive) return "active";
  return "pending";
}

function getPackageImage(pkg: PublicPackageRecord): string {
  return (
    pkg.packageBannerImage?.imageUrl ||
    pkg.packageBannerImage?.url ||
    pkg.bannerImage?.imageUrl ||
    pkg.bannerImageUrl ||
    FALLBACK_PACKAGE_IMAGE
  );
}

function normalizePackage(pkg: PublicPackageRecord, index: number): NormalizedPackage {
  const apiId = getPackageId(pkg, index);

  return {
    id: index + 1,
    apiId,
    name: pkg.title || pkg.name || "Untitled Package",
    duration: `${pkg.durationDays || 1} Days`,
    price: Number(pkg.pricePerPerson || pkg.price || 0),
    maxPeople: Number(pkg.totalSeats || 0),
    includes: pkg.tags?.length ? pkg.tags : ["Hotel", "Transport"],
    partner: pkg.agent?.companyName || "Verified Partner",
    status: getPackageStatus(pkg),
    destination: pkg.destination || "Odisha",
    image: getPackageImage(pkg),
    rating: 4.6,
    description: pkg.description || "Curated travel experience",
    bookings: Number(pkg.seatBooked || pkg.bookedSeats || 0),
    category: pkg.tags?.[0] || "Travel",
  };
}

function fallbackPackageList(): NormalizedPackage[] {
  return fallbackPackages.map((pkg, index) => ({
    id: index + 1,
    apiId: String(pkg.id),
    name: pkg.name,
    duration: pkg.duration,
    price: pkg.price,
    maxPeople: pkg.maxPeople,
    includes: pkg.includes,
    partner: pkg.partner,
    status: pkg.status,
    destination: pkg.name,
    image: FALLBACK_PACKAGE_IMAGE,
    rating: 4.6,
    description: "Curated travel experience",
    bookings: 0,
    category: pkg.includes[0] || "Travel",
  }));
}

export function usePublicData() {
  const { data: publicPackages } = useApi<PublicPackageRecord[]>(() => appApi.getAllPackages(), []);

  const packageList = useMemo(() => {
    if (!publicPackages.length) {
      return fallbackPackageList();
    }

    return publicPackages.map(normalizePackage);
  }, [publicPackages]);

  const destinations = useMemo(() => {
    if (!packageList.length) return fallbackDestinations;

    return packageList.slice(0, 8).map((pkg, index) => ({
      id: pkg.id || index + 1,
      name: pkg.name,
      location: pkg.destination || "Odisha",
      image: pkg.image,
      price: pkg.price,
      rating: pkg.rating,
      category: pkg.category,
      bookings: pkg.bookings,
      description: pkg.description,
    }));
  }, [packageList]);

  const customerBookings = useMemo(() => {
    if (!packageList.length) return fallbackBookings;

    return packageList.slice(0, 6).map((pkg, index) => ({
      id: `BK-${String(index + 1).padStart(3, "0")}`,
      customer: "Traveler",
      package: pkg.name,
      date: new Date().toISOString().slice(0, 10),
      amount: pkg.price,
      status: index % 3 === 0 ? "confirmed" : index % 3 === 1 ? "pending" : "cancelled",
      partner: pkg.partner,
      travelers: 2,
    }));
  }, [packageList]);

  const customerTrips = useMemo(() => {
    if (!customerBookings.length) return fallbackMyTrips;

    return customerBookings.map((booking, index) => ({
      id: index + 1,
      package: booking.package,
      partner: booking.partner,
      date: booking.date,
      status: booking.status === "confirmed" ? "completed" : "upcoming",
      amount: booking.amount,
      rating: booking.status === "confirmed" ? 5 : null,
    }));
  }, [customerBookings]);

  const wishlist = useMemo(() => {
    if (!destinations.length) return fallbackWishlist;

    return destinations.slice(0, 4).map((destination, index) => ({
      id: destination.id || index + 1,
      destination: destination.name,
      image: destination.image,
      price: destination.price,
      rating: destination.rating,
      category: destination.category,
    }));
  }, [destinations]);

  return {
    packages: packageList,
    destinations,
    hotels: fallbackHotels,
    offers: fallbackOffers,
    customerBookings,
    customerTrips,
    wishlist,
  };
}

function normalizeAgent(agent: AgentListRecord, index: number) {
  const fallbackPartner = fallbackPartners[index % fallbackPartners.length];
  return {
    id: agent.id || fallbackPartner.id,
    name: agent.companyName || fallbackPartner.name,
    owner: agent.fullName || fallbackPartner.owner,
    company: agent.companyName || fallbackPartner.name,
    email: agent.email || fallbackPartner.email,
    phone: agent.phone || fallbackPartner.phone,
    status: (agent.status || "pending").toLowerCase(),
    rating: fallbackPartner.rating,
    earnings: fallbackPartner.revenue,
    bookings: fallbackPartner.packages,
    joinedDate: agent.createdAt || fallbackPartner.joined,
  };
}

function normalizeUser(user: UserListRecord, index: number) {
  const fallbackCustomer = fallbackCustomers[index % fallbackCustomers.length];
  return {
    id: user.id || fallbackCustomer.id,
    name: user.fullName || fallbackCustomer.name,
    email: user.email || fallbackCustomer.email,
    phone: user.phone || fallbackCustomer.phone,
    status: user.emailVerified ? "active" : "pending",
    joinedDate: user.createdAt || fallbackCustomer.joined,
    bookings: fallbackCustomer.trips,
    spent: fallbackCustomer.spent,
  };
}

function normalizePayment(payment: AdminPaymentRecord, index: number) {
  const fallbackBooking = fallbackBookings[index % fallbackBookings.length];
  return {
    id: payment.bookingId || payment.paymentId || fallbackBooking.id,
    customer: fallbackBooking.customer,
    package: fallbackBooking.package,
    date: (payment.createdAt || fallbackBooking.date).slice(0, 10),
    amount: Number(payment.amount || fallbackBooking.amount),
    status: (payment.status || fallbackBooking.status).toLowerCase(),
    partner: fallbackBooking.partner,
    travelers: fallbackBooking.travelers,
  };
}

export function useAdminData() {
  const { data: agents } = useApi<AgentListRecord[]>(() => adminApi.getAllAgents(), []);
  const { data: users } = useApi<UserListRecord[]>(() => adminApi.getAllUsers(), []);
  const { data: packages } = useApi<PublicPackageRecord[]>(() => adminApi.getAllPackages(), []);
  const { data: payments } = useApi<AdminPaymentRecord[]>(() => adminApi.getAllPayments(), []);

  const partnerList = useMemo(
    () => (agents.length ? agents.map(normalizeAgent) : fallbackPartners.map((_, index) => normalizeAgent({
      id: String(fallbackPartners[index].id),
      fullName: fallbackPartners[index].owner,
      email: fallbackPartners[index].email,
      phone: fallbackPartners[index].phone,
      companyName: fallbackPartners[index].name,
      status: fallbackPartners[index].status,
      createdAt: fallbackPartners[index].joined,
    }, index))),
    [agents]
  );

  const customerList = useMemo(
    () => (users.length ? users.map(normalizeUser) : fallbackCustomers.map((customer, index) => normalizeUser({
      id: String(customer.id),
      fullName: customer.name,
      email: customer.email,
      phone: customer.phone,
      role: "TRAVELER",
      emailVerified: true,
      createdAt: customer.joined,
    }, index))),
    [users]
  );

  const packageList = useMemo(() => {
    if (!packages.length) return fallbackPackageList();
    return packages.map(normalizePackage);
  }, [packages]);

  const bookingList = useMemo(() => {
    if (!payments.length) return fallbackBookings;
    return payments.map(normalizePayment);
  }, [payments]);

  const adminStats = useMemo(
    () => ({
      ...fallbackAdminStats,
      totalPartners: partnerList.length || fallbackAdminStats.totalPartners,
      totalCustomers: customerList.length || fallbackAdminStats.totalCustomers,
      totalBookings: bookingList.length || fallbackAdminStats.totalBookings,
      totalRevenue:
        bookingList.reduce((sum, booking) => sum + Number(booking.amount || 0), 0) || fallbackAdminStats.totalRevenue,
      activePackages: packageList.filter((pkg) => pkg.status === "active").length || fallbackAdminStats.activePackages,
    }),
    [bookingList, customerList, packageList, partnerList]
  );

  return {
    partners: partnerList,
    customers: customerList,
    bookings: bookingList,
    packages: packageList,
    adminStats,
    analyticsData: fallbackAnalytics,
    revenueData: fallbackAnalytics.bookingsByMonth.map((month) => ({ month: month.month, revenue: month.revenue })),
    notifications: fallbackNotifications,
  };
}

export function usePartnerData() {
  const { data: packages } = useApi<PublicPackageRecord[]>(() => agentApi.getAllPackages(), []);

  const packageList = useMemo(() => {
    if (!packages.length) return fallbackPackageList();
    return packages.map(normalizePackage);
  }, [packages]);

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
  };
}
