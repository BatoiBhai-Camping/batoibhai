import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerPackages from "./pages/partner/PartnerPackages";
import PartnerBookings from "./pages/partner/PartnerBookings";
import PartnerEarnings from "./pages/partner/PartnerEarnings";
import PartnerReviews from "./pages/partner/PartnerReviews";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerTrips from "./pages/customer/CustomerTrips";
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerWishlist from "./pages/customer/CustomerWishlist";
import BookingFlow from "./pages/customer/BookingFlow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/packages" element={<AdminDashboard />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* Partner */}
          <Route path="/partner" element={<PartnerDashboard />} />
          <Route path="/partner/packages" element={<PartnerPackages />} />
          <Route path="/partner/bookings" element={<PartnerBookings />} />
          <Route path="/partner/earnings" element={<PartnerEarnings />} />
          <Route path="/partner/reviews" element={<PartnerReviews />} />
          {/* Customer */}
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/trips" element={<CustomerTrips />} />
          <Route path="/customer/bookings" element={<CustomerBookings />} />
          <Route path="/customer/wishlist" element={<CustomerWishlist />} />
          <Route path="/customer/book" element={<BookingFlow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
