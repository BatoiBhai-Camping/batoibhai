import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { customerStats, destinations, packages, bookings } from "@/data/dummyData";
import { Map, Wallet, Heart, CalendarCheck, Star, MapPin, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chip } from "@mui/material";
import { useState } from "react";

const categories = ["All", "Beach", "Hill", "Nature", "Island"];

export default function CustomerDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? destinations : destinations.filter(d => d.category === activeCategory);

  return (
    <PanelLayout panel="customer">
      <PageHeader title="Explore Destinations" subtitle="Find your perfect getaway" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Trips" value={customerStats.totalTrips} icon={<Map className="w-5 h-5" />} />
        <StatCard title="Total Spent" value={`৳${customerStats.totalSpent.toLocaleString()}`} icon={<Wallet className="w-5 h-5" />} />
        <StatCard title="Upcoming Trips" value={customerStats.upcomingTrips} icon={<CalendarCheck className="w-5 h-5" />} />
        <StatCard title="Reward Points" value={customerStats.rewards} change="Earn more!" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search destinations..." className="pl-10" />
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
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                "&:hover": { opacity: 0.85 },
              }}
            />
          ))}
        </div>
      </div>

      {/* Destination Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-card transition-colors">
                <Heart className="w-4 h-4 text-destructive" />
              </button>
              <div className="absolute bottom-3 left-3">
                <Chip label={d.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 11 }} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold">{d.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {d.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {d.rating}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-primary font-bold text-lg">৳{d.price.toLocaleString()}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Available Packages */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-display font-semibold text-lg">Available Packages</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-6">
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
                <span className="text-primary font-bold text-lg">৳{pkg.price.toLocaleString()}</span>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs">
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
