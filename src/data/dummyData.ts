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

export const reviews = [
  { id: 1, customer: "Rahim Ahmed", package: "Cox's Bazar Premium", rating: 5, comment: "Amazing experience! The hotel was wonderful and the guide was very knowledgeable.", date: "2026-02-20", partner: "TravelBD" },
  { id: 2, customer: "Fatema Begum", package: "Sundarbans Explorer", rating: 4, comment: "Great trip overall. The boat ride was breathtaking. Could improve meal quality.", date: "2026-02-18", partner: "NatureTours" },
  { id: 3, customer: "Nusrat Jahan", package: "Bandarban Adventure", rating: 5, comment: "Best trekking experience ever! Highly recommend to adventure lovers.", date: "2026-02-15", partner: "AdventureBD" },
  { id: 4, customer: "Arif Khan", package: "Sajek Valley Retreat", rating: 4, comment: "Beautiful views and peaceful atmosphere. Transport could be better.", date: "2026-02-12", partner: "HillView" },
  { id: 5, customer: "Salma Akter", package: "Saint Martin Island Tour", rating: 5, comment: "Crystal clear water and fantastic snorkeling. Will definitely come back!", date: "2026-02-10", partner: "IslandEscape" },
  { id: 6, customer: "Karim Hossain", package: "Cox's Bazar Premium", rating: 3, comment: "Good package but overcrowded during peak season.", date: "2026-02-08", partner: "TravelBD" },
];

export const myTrips = [
  { id: 1, package: "Cox's Bazar Premium", partner: "TravelBD", date: "2026-01-15", status: "completed", amount: 12500, rating: 5 },
  { id: 2, package: "Sundarbans Explorer", partner: "NatureTours", date: "2026-02-10", status: "completed", amount: 18000, rating: 4 },
  { id: 3, package: "Bandarban Adventure", partner: "AdventureBD", date: "2026-03-15", status: "upcoming", amount: 11000, rating: null },
  { id: 4, package: "Sajek Valley Retreat", partner: "HillView", date: "2026-03-25", status: "upcoming", amount: 8500, rating: null },
  { id: 5, package: "Saint Martin Island Tour", partner: "IslandEscape", date: "2025-12-20", status: "completed", amount: 15000, rating: 5 },
];

export const wishlist = [
  { id: 1, destination: "Cox's Bazar", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", price: 4500, rating: 4.8, category: "Beach" },
  { id: 2, destination: "Sajek Valley", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", price: 5800, rating: 4.9, category: "Hill" },
  { id: 3, destination: "Saint Martin", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop", price: 7500, rating: 4.7, category: "Island" },
];

export const analyticsData = {
  bookingsByMonth: [
    { month: "Sep", bookings: 280, revenue: 120000 },
    { month: "Oct", bookings: 420, revenue: 185000 },
    { month: "Nov", bookings: 510, revenue: 210000 },
    { month: "Dec", bookings: 680, revenue: 280000 },
    { month: "Jan", bookings: 590, revenue: 245000 },
    { month: "Feb", bookings: 750, revenue: 320000 },
  ],
  topDestinations: [
    { name: "Cox's Bazar", bookings: 1240, revenue: 558000 },
    { name: "Sundarbans", bookings: 890, revenue: 401000 },
    { name: "Sajek Valley", bookings: 1050, revenue: 472500 },
    { name: "Saint Martin", bookings: 780, revenue: 351000 },
    { name: "Bandarban", bookings: 960, revenue: 432000 },
  ],
  customerGrowth: [
    { month: "Sep", customers: 8500 },
    { month: "Oct", customers: 9200 },
    { month: "Nov", customers: 9800 },
    { month: "Dec", customers: 10500 },
    { month: "Jan", customers: 11200 },
    { month: "Feb", customers: 12500 },
  ],
  partnerEarnings: [
    { month: "Sep", earnings: 95000 },
    { month: "Oct", earnings: 142000 },
    { month: "Nov", earnings: 168000 },
    { month: "Dec", earnings: 225000 },
    { month: "Jan", earnings: 198000 },
    { month: "Feb", earnings: 260000 },
  ],
};
