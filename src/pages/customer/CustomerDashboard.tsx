import { useNavigate } from "react-router-dom";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { customerStats, destinations, packages, offers, hotels } from "@/data/dummyData";
import { Map, Wallet, Heart, CalendarCheck, Star, MapPin, Users, Search, Hotel, Tag, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chip } from "@mui/material";
import { useState } from "react";

const categories = ["All", "Beach", "Hill", "Nature", "Heritage", "Wildlife"];

export default function CustomerDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const filtered = activeCategory === "All" ? destinations : destinations.filter(d => d.category === activeCategory);

  return (
    <PanelLayout panel="customer">
      <PageHeader title="Explore Odisha" subtitle="Find your perfect getaway in the land of temples" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Trips" value={customerStats.totalTrips} icon={<Map className="w-5 h-5" />} />
        <StatCard title="Total Spent" value={`₹${customerStats.totalSpent.toLocaleString()}`} icon={<Wallet className="w-5 h-5" />} />
        <StatCard title="Upcoming" value={customerStats.upcomingTrips} icon={<CalendarCheck className="w-5 h-5" />} />
        <StatCard title="Saved" value={customerStats.savedPlaces} icon={<Heart className="w-5 h-5" />} />
        <StatCard title="Rewards" value={customerStats.rewards} change="Earn more!" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      {/* Active Offers */}
      <div className="mb-8">
        <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Tag className="w-5 h-5 text-accent" /> Active Offers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {offers.slice(0, 4).map(o => (
            <div key={o.id} className="bg-accent/5 border border-accent/20 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-accent/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Percent className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{o.title}</p>
                <p className="text-xs text-muted-foreground">Use <code className="font-bold">{o.code}</code> • {o.discount}% off</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search destinations in Odisha..." className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              onClick={() => setActiveCategory(c)}
              sx={{
                bgcolor: activeCategory === c ? "hsl(192, 70%, 28%)" : "hsl(210, 18%, 94%)",
                color: activeCategory === c ? "white" : "hsl(210, 30%, 10%)",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                "&:hover": { opacity: 0.85 },
              }}
            />
          ))}
        </div>
      </div>

      {/* Destination Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-card transition-colors">
                <Heart className="w-4 h-4 text-destructive" />
              </button>
              <div className="absolute bottom-2 left-2">
                <Chip label={d.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 10 }} />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {d.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <Star className="w-3 h-3 text-accent fill-accent" /> {d.rating}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{d.description}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <span className="text-primary font-bold">₹{d.price.toLocaleString()}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7" onClick={() => navigate(`/customer/book?package=1`)}>
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hotels Section */}
      <div className="mb-10">
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Hotel className="w-5 h-5 text-primary" /> Top Hotels in Odisha</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.slice(0, 3).map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-36 overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                  {"★".repeat(h.stars)}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-display font-semibold text-sm">{h.name}</h4>
                <p className="text-xs text-muted-foreground">{h.location} • {h.rooms} rooms available</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {h.amenities.slice(0, 3).map(a => <span key={a} className="badge-info text-[10px]">{a}</span>)}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                  <span className="text-primary font-bold">₹{h.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/night</span></span>
                  <Button size="sm" variant="outline" className="text-xs h-7">Book Room</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Packages */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Available Packages</h3>
          <Button variant="link" className="text-primary text-sm">View All</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-5">
          {packages.filter(p => p.status === "active").map((pkg) => (
            <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-display font-semibold">{pkg.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{pkg.duration} • Up to {pkg.maxPeople} people</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {pkg.includes.map((inc) => (
                  <span key={inc} className="badge-info">{inc}</span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <span className="text-primary font-bold text-lg">₹{pkg.price.toLocaleString()}</span>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs" onClick={() => navigate(`/customer/book?package=${pkg.id}`)}>
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}
