import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, PageHeader } from "@/components/StatCard";
import { usePublicData } from "@/hooks/useBackendData";
import { Map, Wallet, Heart, CalendarCheck, Star, MapPin, Users, Search, Hotel, Tag, Percent, Filter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chip, Snackbar, Alert, Tooltip, Rating } from "@mui/material";

const categories = ["All", "Beach", "Hill", "Nature", "Heritage", "Wildlife", "Travel"];

export default function CustomerDashboard() {
  const { destinations, packages, offers, hotels, customerTrips, customerBookings, wishlist } = usePublicData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set([1, 3]));
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const customerStats = {
    totalTrips: customerTrips.length,
    totalSpent: customerBookings.reduce((sum, b) => sum + Number(b.amount || 0), 0),
    upcomingTrips: customerTrips.filter((t) => t.status === "upcoming").length,
    savedPlaces: wishlist.length,
    rewards: Math.round(customerBookings.reduce((sum, b) => sum + Number(b.amount || 0), 0) * 0.02),
  };

  const filtered = destinations
    .filter(d => activeCategory === "All" || d.category === activeCategory)
    .filter(d => searchTerm === "" || d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.location.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleWishlist = (id: number, name: string) => {
    setWishlistedIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) { s.delete(id); setSnackbar({ open: true, message: `${name} removed from wishlist` }); }
      else { s.add(id); setSnackbar({ open: true, message: `${name} added to wishlist ❤️` }); }
      return s;
    });
  };

  return (
    <PanelLayout panel="customer">
      <PageHeader title="Explore Odisha" subtitle="Find your perfect getaway in the land of temples" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard title="Total Trips" value={customerStats.totalTrips} icon={<Map className="w-5 h-5" />} />
        <StatCard title="Total Spent" value={`₹${customerStats.totalSpent.toLocaleString()}`} icon={<Wallet className="w-5 h-5" />} />
        <StatCard title="Upcoming" value={customerStats.upcomingTrips} icon={<CalendarCheck className="w-5 h-5" />} />
        <StatCard title="Saved" value={customerStats.savedPlaces} icon={<Heart className="w-5 h-5" />} />
        <StatCard title="Rewards" value={`₹${customerStats.rewards}`} change="Earn more!" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      {/* Active Offers */}
      <div className="mb-8">
        <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2"><Tag className="w-5 h-5 text-accent" /> Active Offers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {offers.slice(0, 4).map(o => (
            <motion.div
              key={o.id}
              whileHover={{ scale: 1.02 }}
              className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-accent/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Percent className="w-6 h-6 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{o.title}</p>
                <p className="text-xs text-muted-foreground">Code: <code className="font-bold text-accent">{o.code}</code> • {o.discount}% off</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search destinations in Odisha..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              onClick={() => setActiveCategory(c)}
              size="small"
              sx={{
                bgcolor: activeCategory === c ? "hsl(192, 70%, 28%)" : "hsl(210, 18%, 94%)",
                color: activeCategory === c ? "white" : "hsl(210, 30%, 10%)",
                fontWeight: 600, fontSize: 12, cursor: "pointer",
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
            transition={{ delay: i * 0.05 }}
            className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button
                onClick={() => toggleWishlist(d.id, d.name)}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${wishlistedIds.has(d.id) ? "bg-destructive/90" : "bg-card/80 backdrop-blur hover:bg-card"}`}
              >
                <Heart className={`w-4 h-4 ${wishlistedIds.has(d.id) ? "text-destructive-foreground fill-destructive-foreground" : "text-destructive"}`} />
              </button>
              <div className="absolute bottom-2 left-2">
                <Chip label={d.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.92)", fontWeight: 600, fontSize: 10, height: 22 }} />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {d.location}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="w-3 h-3 text-accent fill-accent" /> {d.rating}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{d.description}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <div>
                  <span className="text-primary font-bold">₹{d.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground ml-1">per person</span>
                </div>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7" onClick={() => navigate(`/customer/book?package=${d.id}`)}>
                  Book <ArrowRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hotels */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg flex items-center gap-2"><Hotel className="w-5 h-5 text-primary" /> Top Hotels in Odisha</h3>
          <Button variant="link" size="sm" className="text-primary text-xs">View All</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.slice(0, 3).map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-36 overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2">
                  <Chip label={`${"★".repeat(h.stars)} ${h.stars}-Star`} size="small" sx={{ bgcolor: "hsl(32,95%,52%)", color: "white", fontWeight: 700, fontSize: 10, height: 22 }} />
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-display font-semibold text-sm">{h.name}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {h.location} • {h.rooms} rooms</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {h.amenities.slice(0, 3).map(a => <Chip key={a} label={a} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 9, height: 20 }} />)}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-primary font-bold">₹{h.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/night</span></span>
                  <Button size="sm" variant="outline" className="text-xs h-7">Book Room</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg">Available Packages</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Curated packages from verified partners</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 p-5">
          {packages.filter(p => p.status === "active").map((pkg) => (
            <motion.div key={pkg.id} whileHover={{ y: -2 }} className="border rounded-xl p-4 hover:shadow-md transition-all">
              <h4 className="font-display font-semibold">{pkg.name}</h4>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1"><CalendarCheck className="w-3.5 h-3.5" /> {pkg.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Max {pkg.maxPeople}</span>
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {pkg.includes.map((inc) => <Chip key={inc} label={inc} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 10, height: 22 }} />)}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <span className="text-primary font-bold text-lg">₹{pkg.price.toLocaleString()}</span>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs" onClick={() => navigate(`/customer/book?package=${pkg.id}`)}>
                  Book Now <ArrowRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
