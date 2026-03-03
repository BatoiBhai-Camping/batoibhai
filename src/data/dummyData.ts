export const destinations = [
  { id: 1, name: "Puri Beach", location: "Puri, Odisha", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", price: 2500, rating: 4.8, category: "Beach", bookings: 2840, description: "Famous Jagannath Temple & golden beach" },
  { id: 2, name: "Chilika Lake", location: "Khurda, Odisha", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop", price: 3200, rating: 4.7, category: "Nature", bookings: 1890, description: "Asia's largest brackish water lagoon" },
  { id: 3, name: "Daringbadi", location: "Kandhamal, Odisha", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", price: 4800, rating: 4.9, category: "Hill", bookings: 1250, description: "The Kashmir of Odisha" },
  { id: 4, name: "Konark Sun Temple", location: "Konark, Odisha", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop", price: 1800, rating: 4.6, category: "Heritage", bookings: 3200, description: "UNESCO World Heritage Site" },
  { id: 5, name: "Simlipal National Park", location: "Mayurbhanj, Odisha", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop", price: 5500, rating: 4.5, category: "Wildlife", bookings: 960, description: "Tiger reserve & lush forests" },
  { id: 6, name: "Gopalpur-on-Sea", location: "Ganjam, Odisha", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop", price: 2800, rating: 4.4, category: "Beach", bookings: 1470, description: "Serene beach town with colonial charm" },
  { id: 7, name: "Bhitarkanika", location: "Kendrapara, Odisha", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", price: 4200, rating: 4.7, category: "Wildlife", bookings: 780, description: "Mangrove forests & crocodile sanctuary" },
  { id: 8, name: "Dhauli Peace Pagoda", location: "Bhubaneswar, Odisha", image: "https://images.unsplash.com/photo-1582407947092-50b8e7a0e0bf?w=600&h=400&fit=crop", price: 1200, rating: 4.3, category: "Heritage", bookings: 2100, description: "Historic Buddhist site" },
];

export const hotels = [
  { id: 1, name: "Mayfair Lagoon", location: "Bhubaneswar", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", price: 6500, rating: 4.8, stars: 5, amenities: ["Pool", "Spa", "WiFi", "Restaurant"], rooms: 12 },
  { id: 2, name: "Hotel Hans Coco Palms", location: "Puri", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop", price: 4200, rating: 4.5, stars: 4, amenities: ["Beach View", "Pool", "WiFi", "Bar"], rooms: 8 },
  { id: 3, name: "Trident Bhubaneswar", location: "Bhubaneswar", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop", price: 5800, rating: 4.7, stars: 5, amenities: ["Pool", "Gym", "WiFi", "Spa", "Restaurant"], rooms: 15 },
  { id: 4, name: "Toshali Sands Resort", location: "Puri", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop", price: 3800, rating: 4.4, stars: 4, amenities: ["Beach Access", "Pool", "WiFi", "Kids Area"], rooms: 20 },
  { id: 5, name: "Nature Camp Bhitarkanika", location: "Kendrapara", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", price: 2800, rating: 4.3, stars: 3, amenities: ["Nature View", "WiFi", "Restaurant"], rooms: 6 },
  { id: 6, name: "Panthanivas Konark", location: "Konark", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop", price: 2200, rating: 4.1, stars: 3, amenities: ["WiFi", "Restaurant", "Parking"], rooms: 10 },
];

export const packages = [
  { id: 1, name: "Puri-Konark Golden Triangle", duration: "3 Days / 2 Nights", price: 8500, maxPeople: 4, includes: ["Hotel", "Transport", "Meals", "Guide"], partner: "OdishaTourism Pro", status: "active" },
  { id: 2, name: "Chilika Lake Safari", duration: "2 Days / 1 Night", price: 6200, maxPeople: 6, includes: ["Boat Ride", "Lodge", "Meals", "Birding Guide"], partner: "Chilika Adventures", status: "active" },
  { id: 3, name: "Daringbadi Hill Retreat", duration: "3 Days / 2 Nights", price: 9500, maxPeople: 5, includes: ["Resort", "Transport", "Breakfast", "Trekking"], partner: "Hill Escapes", status: "pending" },
  { id: 4, name: "Simlipal Wildlife Safari", duration: "4 Days / 3 Nights", price: 14000, maxPeople: 4, includes: ["Forest Lodge", "Jeep Safari", "Meals", "Naturalist"], partner: "Wild Odisha", status: "active" },
  { id: 5, name: "Tribal Odisha Explorer", duration: "5 Days / 4 Nights", price: 18000, maxPeople: 8, includes: ["Camping", "Transport", "Meals", "Local Guide", "Cultural Show"], partner: "Roots & Routes", status: "active" },
  { id: 6, name: "Bhubaneswar Temple Trail", duration: "2 Days / 1 Night", price: 5500, maxPeople: 6, includes: ["Hotel", "AC Transport", "Breakfast", "Temple Guide"], partner: "OdishaTourism Pro", status: "active" },
];

export const bookings = [
  { id: "BK-001", customer: "Rajesh Mohanty", package: "Puri-Konark Golden Triangle", date: "2026-03-15", amount: 8500, status: "confirmed", partner: "OdishaTourism Pro", travelers: 2 },
  { id: "BK-002", customer: "Priya Panda", package: "Chilika Lake Safari", date: "2026-03-18", amount: 6200, status: "pending", partner: "Chilika Adventures", travelers: 4 },
  { id: "BK-003", customer: "Amit Sahoo", package: "Daringbadi Hill Retreat", date: "2026-03-20", amount: 9500, status: "confirmed", partner: "Hill Escapes", travelers: 3 },
  { id: "BK-004", customer: "Suman Behera", package: "Simlipal Wildlife Safari", date: "2026-03-22", amount: 14000, status: "cancelled", partner: "Wild Odisha", travelers: 2 },
  { id: "BK-005", customer: "Deepa Mishra", package: "Tribal Odisha Explorer", date: "2026-03-25", amount: 18000, status: "confirmed", partner: "Roots & Routes", travelers: 5 },
  { id: "BK-006", customer: "Bikash Das", package: "Puri-Konark Golden Triangle", date: "2026-03-28", amount: 8500, status: "pending", partner: "OdishaTourism Pro", travelers: 2 },
  { id: "BK-007", customer: "Ananya Rath", package: "Bhubaneswar Temple Trail", date: "2026-04-01", amount: 5500, status: "confirmed", partner: "OdishaTourism Pro", travelers: 3 },
  { id: "BK-008", customer: "Kiran Patnaik", package: "Chilika Lake Safari", date: "2026-04-03", amount: 6200, status: "confirmed", partner: "Chilika Adventures", travelers: 2 },
  { id: "BK-009", customer: "Sneha Nayak", package: "Simlipal Wildlife Safari", date: "2026-04-05", amount: 14000, status: "pending", partner: "Wild Odisha", travelers: 4 },
  { id: "BK-010", customer: "Rajesh Mohanty", package: "Tribal Odisha Explorer", date: "2026-04-10", amount: 18000, status: "confirmed", partner: "Roots & Routes", travelers: 6 },
];

export const partners = [
  { id: 1, name: "OdishaTourism Pro", owner: "Suresh Mohanty", email: "info@odishatourism.pro", packages: 12, revenue: 485000, rating: 4.8, status: "verified", joined: "2024-06-15", phone: "+91 9437XXXXXX" },
  { id: 2, name: "Chilika Adventures", owner: "Prakash Das", email: "hello@chilikaadventures.com", packages: 6, revenue: 298000, rating: 4.6, status: "verified", joined: "2024-08-20", phone: "+91 9338XXXXXX" },
  { id: 3, name: "Hill Escapes", owner: "Manish Pradhan", email: "contact@hillescapes.in", packages: 4, revenue: 185000, rating: 4.4, status: "pending", joined: "2025-01-10", phone: "+91 9861XXXXXX" },
  { id: 4, name: "Wild Odisha", owner: "Ranjit Lenka", email: "book@wildodisha.com", packages: 5, revenue: 320000, rating: 4.7, status: "verified", joined: "2024-11-05", phone: "+91 9776XXXXXX" },
  { id: 5, name: "Roots & Routes", owner: "Bikram Swain", email: "info@rootsroutes.in", packages: 8, revenue: 410000, rating: 4.5, status: "verified", joined: "2024-09-12", phone: "+91 9658XXXXXX" },
  { id: 6, name: "Temple City Tours", owner: "Ashok Mishra", email: "tours@templecity.com", packages: 7, revenue: 265000, rating: 4.3, status: "verified", joined: "2025-02-01", phone: "+91 9437XXXXXX" },
];

export const customers = [
  { id: 1, name: "Rajesh Mohanty", email: "rajesh@email.com", phone: "+91 9437100001", trips: 8, spent: 82500, joined: "2025-01-15", city: "Bhubaneswar" },
  { id: 2, name: "Priya Panda", email: "priya@email.com", phone: "+91 9338200002", trips: 5, spent: 48000, joined: "2025-02-20", city: "Cuttack" },
  { id: 3, name: "Amit Sahoo", email: "amit@email.com", phone: "+91 9861300003", trips: 12, spent: 125000, joined: "2024-11-10", city: "Rourkela" },
  { id: 4, name: "Suman Behera", email: "suman@email.com", phone: "+91 9776400004", trips: 3, spent: 28000, joined: "2025-03-01", city: "Sambalpur" },
  { id: 5, name: "Deepa Mishra", email: "deepa@email.com", phone: "+91 9658500005", trips: 6, spent: 68000, joined: "2025-01-28", city: "Berhampur" },
  { id: 6, name: "Bikash Das", email: "bikash@email.com", phone: "+91 9437600006", trips: 4, spent: 42000, joined: "2025-04-05", city: "Bhubaneswar" },
  { id: 7, name: "Ananya Rath", email: "ananya@email.com", phone: "+91 9338700007", trips: 9, spent: 98000, joined: "2024-10-12", city: "Puri" },
  { id: 8, name: "Kiran Patnaik", email: "kiran@email.com", phone: "+91 9861800008", trips: 2, spent: 18500, joined: "2025-05-10", city: "Bhubaneswar" },
];

export const revenueData = [
  { month: "Sep", revenue: 220000 },
  { month: "Oct", revenue: 385000 },
  { month: "Nov", revenue: 410000 },
  { month: "Dec", revenue: 580000 },
  { month: "Jan", revenue: 445000 },
  { month: "Feb", revenue: 620000 },
];

export const adminStats = {
  totalRevenue: 2660000,
  totalBookings: 5420,
  totalPartners: 68,
  totalCustomers: 18500,
  activePackages: 186,
  growthRate: 28.5,
};

export const partnerStats = {
  totalEarnings: 485000,
  activeBookings: 34,
  totalPackages: 12,
  avgRating: 4.8,
  pendingPayouts: 75000,
  monthlyGrowth: 18.2,
};

export const customerStats = {
  totalTrips: 8,
  totalSpent: 82500,
  savedPlaces: 15,
  upcomingTrips: 3,
  rewards: 2450,
};

export const reviews = [
  { id: 1, customer: "Rajesh Mohanty", package: "Puri-Konark Golden Triangle", rating: 5, comment: "Incredible experience! The temple visits were well-organized and the beach sunset was magical.", date: "2026-02-20", partner: "OdishaTourism Pro" },
  { id: 2, customer: "Priya Panda", package: "Chilika Lake Safari", rating: 4, comment: "The Irrawaddy dolphins were a highlight! Boat ride was fantastic. Food could be better.", date: "2026-02-18", partner: "Chilika Adventures" },
  { id: 3, customer: "Deepa Mishra", package: "Tribal Odisha Explorer", rating: 5, comment: "Best cultural experience ever! The tribal dance show was mesmerizing. Highly recommend!", date: "2026-02-15", partner: "Roots & Routes" },
  { id: 4, customer: "Ananya Rath", package: "Daringbadi Hill Retreat", rating: 4, comment: "Beautiful pine forests and coffee plantations. The hill station was peaceful. Road could be better.", date: "2026-02-12", partner: "Hill Escapes" },
  { id: 5, customer: "Bikash Das", package: "Simlipal Wildlife Safari", rating: 5, comment: "Spotted a tiger! The forest lodge was perfect. Naturalist guide was extremely knowledgeable.", date: "2026-02-10", partner: "Wild Odisha" },
  { id: 6, customer: "Kiran Patnaik", package: "Puri-Konark Golden Triangle", rating: 3, comment: "Good package but Puri beach was very crowded. Konark temple was magnificent though.", date: "2026-02-08", partner: "OdishaTourism Pro" },
  { id: 7, customer: "Amit Sahoo", package: "Bhubaneswar Temple Trail", rating: 5, comment: "The Lingaraj Temple was breathtaking. Guide explained every sculpture in detail. Loved the Odia cuisine!", date: "2026-02-05", partner: "OdishaTourism Pro" },
  { id: 8, customer: "Sneha Nayak", package: "Chilika Lake Safari", rating: 4, comment: "Beautiful sunset at Chilika. Nalabana bird sanctuary was amazing during migration season.", date: "2026-02-01", partner: "Chilika Adventures" },
];

export const myTrips = [
  { id: 1, package: "Puri-Konark Golden Triangle", partner: "OdishaTourism Pro", date: "2026-01-15", status: "completed", amount: 8500, rating: 5 },
  { id: 2, package: "Chilika Lake Safari", partner: "Chilika Adventures", date: "2026-02-10", status: "completed", amount: 6200, rating: 4 },
  { id: 3, package: "Tribal Odisha Explorer", partner: "Roots & Routes", date: "2026-03-15", status: "upcoming", amount: 18000, rating: null },
  { id: 4, package: "Daringbadi Hill Retreat", partner: "Hill Escapes", date: "2026-03-25", status: "upcoming", amount: 9500, rating: null },
  { id: 5, package: "Simlipal Wildlife Safari", partner: "Wild Odisha", date: "2025-12-20", status: "completed", amount: 14000, rating: 5 },
  { id: 6, package: "Bhubaneswar Temple Trail", partner: "OdishaTourism Pro", date: "2026-04-05", status: "upcoming", amount: 5500, rating: null },
];

export const wishlist = [
  { id: 1, destination: "Puri Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop", price: 2500, rating: 4.8, category: "Beach" },
  { id: 2, destination: "Daringbadi", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", price: 4800, rating: 4.9, category: "Hill" },
  { id: 3, destination: "Bhitarkanika", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop", price: 4200, rating: 4.7, category: "Wildlife" },
  { id: 4, destination: "Konark Sun Temple", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop", price: 1800, rating: 4.6, category: "Heritage" },
];

export const analyticsData = {
  bookingsByMonth: [
    { month: "Sep", bookings: 480, revenue: 220000 },
    { month: "Oct", bookings: 720, revenue: 385000 },
    { month: "Nov", bookings: 810, revenue: 410000 },
    { month: "Dec", bookings: 1080, revenue: 580000 },
    { month: "Jan", bookings: 890, revenue: 445000 },
    { month: "Feb", bookings: 1150, revenue: 620000 },
  ],
  topDestinations: [
    { name: "Puri Beach", bookings: 2840, revenue: 710000 },
    { name: "Konark Sun Temple", bookings: 3200, revenue: 576000 },
    { name: "Chilika Lake", bookings: 1890, revenue: 604800 },
    { name: "Daringbadi", bookings: 1250, revenue: 600000 },
    { name: "Simlipal", bookings: 960, revenue: 528000 },
  ],
  customerGrowth: [
    { month: "Sep", customers: 12500 },
    { month: "Oct", customers: 13800 },
    { month: "Nov", customers: 14900 },
    { month: "Dec", customers: 16200 },
    { month: "Jan", customers: 17400 },
    { month: "Feb", customers: 18500 },
  ],
  partnerEarnings: [
    { month: "Sep", earnings: 175000 },
    { month: "Oct", earnings: 242000 },
    { month: "Nov", earnings: 298000 },
    { month: "Dec", earnings: 425000 },
    { month: "Jan", earnings: 348000 },
    { month: "Feb", earnings: 460000 },
  ],
};

export const offers = [
  { id: 1, title: "Rath Yatra Special", discount: 25, code: "RATH25", validTill: "2026-07-15", description: "Flat 25% off on Puri packages during Rath Yatra festival" },
  { id: 2, title: "Monsoon Escape", discount: 20, code: "MONSOON20", validTill: "2026-09-30", description: "20% off on all hill station packages" },
  { id: 3, title: "Weekend Getaway", discount: 15, code: "WKND15", validTill: "2026-12-31", description: "15% off on 2-day weekend packages" },
  { id: 4, title: "First Trip Bonus", discount: 30, code: "FIRST30", validTill: "2026-12-31", description: "30% off on your first booking with BatoiBhai" },
];

export const notifications = [
  { id: 1, type: "booking", message: "Your booking for Puri-Konark Golden Triangle is confirmed!", time: "2 hours ago", read: false },
  { id: 2, type: "offer", message: "Flash Sale: 25% off on Chilika Lake Safari this weekend!", time: "5 hours ago", read: false },
  { id: 3, type: "review", message: "Rajesh Mohanty left a 5-star review on your package", time: "1 day ago", read: true },
  { id: 4, type: "payout", message: "Payout of ₹45,000 has been processed successfully", time: "2 days ago", read: true },
  { id: 5, type: "system", message: "Your partner verification is complete. Welcome aboard!", time: "3 days ago", read: true },
];
