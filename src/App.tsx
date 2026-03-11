import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBookings /></ProtectedRoute>} />
            <Route path="/admin/partners" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPartners /></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCustomers /></ProtectedRoute>} />
            <Route path="/admin/packages" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAnalytics /></ProtectedRoute>} />
            {/* Partner */}
            <Route path="/partner" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerDashboard /></ProtectedRoute>} />
            <Route path="/partner/packages" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerPackages /></ProtectedRoute>} />
            <Route path="/partner/bookings" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerBookings /></ProtectedRoute>} />
            <Route path="/partner/earnings" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerEarnings /></ProtectedRoute>} />
            <Route path="/partner/reviews" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerReviews /></ProtectedRoute>} />
            {/* Customer */}
            <Route path="/customer" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerDashboard /></ProtectedRoute>} />
            <Route path="/customer/trips" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerTrips /></ProtectedRoute>} />
            <Route path="/customer/bookings" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerBookings /></ProtectedRoute>} />
            <Route path="/customer/wishlist" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerWishlist /></ProtectedRoute>} />
            <Route path="/customer/book" element={<ProtectedRoute allowedRoles={["customer"]}><BookingFlow /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
