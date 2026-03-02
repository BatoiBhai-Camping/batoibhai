export const destinations = [
  { id: 1, name: "Cox's Bazar", location: "Chittagong", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", price: 4500, rating: 4.8, category: "Beach", bookings: 1240 },
  { id: 2, name: "Sundarbans", location: "Khulna", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop", price: 6200, rating: 4.6, category: "Nature", bookings: 890 },
  { id: 3, name: "Sajek Valley", location: "Rangamati", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", price: 5800, rating: 4.9, category: "Hill", bookings: 1050 },
  { id: 4, name: "Saint Martin", location: "Teknaf", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop", price: 7500, rating: 4.7, category: "Island", bookings: 780 },
  { id: 5, name: "Bandarban", location: "Chittagong", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", price: 3800, rating: 4.5, category: "Hill", bookings: 960 },
  { id: 6, name: "Sylhet Tea Gardens", location: "Sylhet", image: "https://images.unsplash.com/photo-1582407947092-50b8e7a0e0bf?w=600&h=400&fit=crop", price: 4200, rating: 4.4, category: "Nature", bookings: 670 },
];

export const packages = [
  { id: 1, name: "Cox's Bazar Premium", duration: "3 Days / 2 Nights", price: 12500, maxPeople: 4, includes: ["Hotel", "Transport", "Meals", "Guide"], partner: "TravelBD", status: "active" },
  { id: 2, name: "Sundarbans Explorer", duration: "4 Days / 3 Nights", price: 18000, maxPeople: 6, includes: ["Boat", "Lodge", "Meals", "Guide"], partner: "NatureTours", status: "active" },
  { id: 3, name: "Sajek Valley Retreat", duration: "2 Days / 1 Night", price: 8500, maxPeople: 5, includes: ["Resort", "Transport", "Breakfast"], partner: "HillView", status: "pending" },
  { id: 4, name: "Saint Martin Island Tour", duration: "3 Days / 2 Nights", price: 15000, maxPeople: 4, includes: ["Hotel", "Boat", "Meals", "Snorkeling"], partner: "IslandEscape", status: "active" },
  { id: 5, name: "Bandarban Adventure", duration: "3 Days / 2 Nights", price: 11000, maxPeople: 8, includes: ["Camping", "Transport", "Meals", "Trekking"], partner: "AdventureBD", status: "active" },
];

export const bookings = [
  { id: "BK-001", customer: "Rahim Ahmed", package: "Cox's Bazar Premium", date: "2026-03-15", amount: 12500, status: "confirmed", partner: "TravelBD" },
  { id: "BK-002", customer: "Karim Hossain", package: "Sundarbans Explorer", date: "2026-03-18", amount: 18000, status: "pending", partner: "NatureTours" },
  { id: "BK-003", customer: "Fatema Begum", package: "Sajek Valley Retreat", date: "2026-03-20", amount: 8500, status: "confirmed", partner: "HillView" },
  { id: "BK-004", customer: "Jamal Uddin", package: "Saint Martin Island Tour", date: "2026-03-22", amount: 15000, status: "cancelled", partner: "IslandEscape" },
  { id: "BK-005", customer: "Nusrat Jahan", package: "Bandarban Adventure", date: "2026-03-25", amount: 11000, status: "confirmed", partner: "AdventureBD" },
  { id: "BK-006", customer: "Salma Akter", package: "Cox's Bazar Premium", date: "2026-03-28", amount: 12500, status: "pending", partner: "TravelBD" },
  { id: "BK-007", customer: "Arif Khan", package: "Sundarbans Explorer", date: "2026-04-01", amount: 18000, status: "confirmed", partner: "NatureTours" },
  { id: "BK-008", customer: "Mina Roy", package: "Sajek Valley Retreat", date: "2026-04-03", amount: 8500, status: "confirmed", partner: "HillView" },
];

export const partners = [
  { id: 1, name: "TravelBD", owner: "Mahbub Alam", email: "info@travelbd.com", packages: 8, revenue: 285000, rating: 4.7, status: "verified", joined: "2024-06-15" },
  { id: 2, name: "NatureTours", owner: "Shahin Alam", email: "hello@naturetours.com", packages: 5, revenue: 198000, rating: 4.5, status: "verified", joined: "2024-08-20" },
  { id: 3, name: "HillView", owner: "Rashed Karim", email: "contact@hillview.com", packages: 4, revenue: 145000, rating: 4.3, status: "pending", joined: "2025-01-10" },
  { id: 4, name: "IslandEscape", owner: "Tanvir Hassan", email: "book@islandescape.com", packages: 3, revenue: 120000, rating: 4.8, status: "verified", joined: "2024-11-05" },
  { id: 5, name: "AdventureBD", owner: "Rezwan Ali", email: "info@adventurebd.com", packages: 6, revenue: 210000, rating: 4.6, status: "verified", joined: "2024-09-12" },
];

export const customers = [
  { id: 1, name: "Rahim Ahmed", email: "rahim@email.com", trips: 5, spent: 62500, joined: "2025-01-15" },
  { id: 2, name: "Karim Hossain", email: "karim@email.com", trips: 3, spent: 38000, joined: "2025-02-20" },
  { id: 3, name: "Fatema Begum", email: "fatema@email.com", trips: 7, spent: 85000, joined: "2024-11-10" },
  { id: 4, name: "Jamal Uddin", email: "jamal@email.com", trips: 2, spent: 23000, joined: "2025-03-01" },
  { id: 5, name: "Nusrat Jahan", email: "nusrat@email.com", trips: 4, spent: 48000, joined: "2025-01-28" },
];

export const revenueData = [
  { month: "Sep", revenue: 120000 },
  { month: "Oct", revenue: 185000 },
  { month: "Nov", revenue: 210000 },
  { month: "Dec", revenue: 280000 },
  { month: "Jan", revenue: 245000 },
  { month: "Feb", revenue: 320000 },
];

export const adminStats = {
  totalRevenue: 1360000,
  totalBookings: 3420,
  totalPartners: 48,
  totalCustomers: 12500,
  activePackages: 156,
  growthRate: 23.5,
};

export const partnerStats = {
  totalEarnings: 285000,
  activeBookings: 24,
  totalPackages: 8,
  avgRating: 4.7,
  pendingPayouts: 45000,
  monthlyGrowth: 15.2,
};

export const customerStats = {
  totalTrips: 5,
  totalSpent: 62500,
  savedPlaces: 12,
  upcomingTrips: 2,
  rewards: 1250,
};
