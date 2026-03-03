import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chip } from "@mui/material";
import {
  Plane, Shield, Handshake, Users, ArrowRight, Star, MapPin,
  Hotel, Palmtree, Train, Bus, Search, Tag, Bell, Percent,
  Calendar, ChevronRight, TrendingUp, Award
} from "lucide-react";
import { destinations, offers, hotels } from "@/data/dummyData";
import { useState } from "react";

const travelTypes = [
  { icon: <Palmtree className="w-5 h-5" />, label: "Holidays", active: true },
  { icon: <Hotel className="w-5 h-5" />, label: "Hotels" },
  { icon: <Bus className="w-5 h-5" />, label: "Bus" },
  { icon: <Train className="w-5 h-5" />, label: "Trains" },
  { icon: <Plane className="w-5 h-5" />, label: "Flights" },
];

const features = [
  { icon: <Users className="w-6 h-6" />, title: "For Travelers", desc: "Discover curated Odisha travel packages & hotels at best prices" },
  { icon: <Handshake className="w-6 h-6" />, title: "For Partners", desc: "List your packages and grow your travel business across Odisha" },
  { icon: <Shield className="w-6 h-6" />, title: "For Admins", desc: "Full control over platform operations, analytics & partners" },
];

const popularSearches = ["Puri", "Konark", "Chilika Lake", "Daringbadi", "Simlipal", "Bhubaneswar Temples"];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Holidays");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav - MakeMyTrip style */}
      <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-bold">
                BB
              </div>
              <span className="font-display text-xl font-bold">BatoiBhai</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/customer">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">Explore</Button>
              </Link>
              <Link to="/partner">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">List Property</Button>
              </Link>
              <Link to="/admin">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Admin</Button>
              </Link>
            </div>
          </div>
          {/* Travel Type Tabs - MakeMyTrip style */}
          <div className="flex gap-6 pb-3 overflow-x-auto scrollbar-hide">
            {travelTypes.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-fit ${
                  activeTab === t.label
                    ? "bg-primary-foreground/15 border-b-2 border-accent"
                    : "hover:bg-primary-foreground/10 opacity-70"
                }`}
              >
                {t.icon}
                <span className="text-xs font-semibold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero with Search - MakeMyTrip Style */}
      <section className="gradient-hero text-primary-foreground py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chip label="🏛️ Odisha's #1 Travel Platform" sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.15)", color: "white", fontWeight: 600 }} />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-4">
              Explore the Soul of<br />
              <span className="text-accent">Incredible Odisha</span>
            </h1>
            <p className="text-base md:text-lg opacity-80 max-w-2xl mb-8 font-body">
              From the golden beaches of Puri to the tribal heartlands of Koraput — book curated packages, hotels & experiences.
            </p>
          </motion.div>

          {/* Search Box - MakeMyTrip style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card text-foreground rounded-2xl p-6 shadow-2xl -mb-20 relative z-10"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">FROM</label>
                <Input placeholder="Bhubaneswar" className="text-lg font-semibold border-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
                <p className="text-xs text-muted-foreground mt-1">Odisha, India</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">TO</label>
                <Input placeholder="Puri" className="text-lg font-semibold border-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
                <p className="text-xs text-muted-foreground mt-1">Beach, Temple</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">TRAVEL DATE</label>
                <Input type="date" defaultValue="2026-03-15" className="text-lg font-semibold border-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
                <p className="text-xs text-muted-foreground mt-1">Pick your date</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">TRAVELERS</label>
                <Input placeholder="2 Adults" className="text-lg font-semibold border-0 border-b-2 rounded-none px-0 focus-visible:ring-0" />
                <p className="text-xs text-muted-foreground mt-1">Guests</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2 flex-wrap">
                {popularSearches.map(s => (
                  <Chip key={s} label={s} size="small" onClick={() => {}} sx={{ bgcolor: "hsl(192, 70%, 28%, 0.08)", color: "hsl(192, 70%, 28%)", fontWeight: 500, cursor: "pointer", "&:hover": { bgcolor: "hsl(192, 70%, 28%, 0.15)" } }} />
                ))}
              </div>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-12 text-base" onClick={() => navigate("/customer")}>
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Spacer for overlapping search */}
      <div className="h-24" />

      {/* Offers Section - MakeMyTrip style */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Tag className="w-6 h-6 text-accent" /> Offers
              </h2>
              <p className="text-muted-foreground text-sm">Exclusive deals for your Odisha trip</p>
            </div>
            <Button variant="link" className="text-primary font-semibold">View All <ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border rounded-xl p-5 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-accent">{offer.discount}% OFF</p>
                  </div>
                </div>
                <h3 className="font-display font-semibold mb-1">{offer.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <code className="text-xs font-bold bg-muted px-2 py-1 rounded">{offer.code}</code>
                  <span className="text-xs text-muted-foreground">Till {offer.validTill}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 md:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-center mb-10">One Platform, Three Portals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="stat-card text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold">Popular Destinations in Odisha</h2>
              <p className="text-muted-foreground text-sm">Explore the most loved travel spots</p>
            </div>
            <Button variant="link" className="text-primary font-semibold" onClick={() => navigate("/customer")}>View All <ChevronRight className="w-4 h-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.slice(0, 8).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group bg-card rounded-xl overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/customer/book?package=1")}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" /> {d.rating}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="font-display font-bold text-white text-sm">{d.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" /> {d.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">₹{d.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{d.bookings.toLocaleString()} booked</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Hotels Section */}
      <section className="py-12 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Hotel className="w-6 h-6 text-primary" /> Top Rated Hotels
              </h2>
              <p className="text-muted-foreground text-sm">Handpicked stays across Odisha</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.slice(0, 6).map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground rounded-full px-2.5 py-0.5 text-xs font-bold">
                    {"★".repeat(h.stars)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold">{h.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {h.location}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {h.amenities.slice(0, 3).map(a => (
                      <span key={a} className="badge-info text-[10px]">{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div>
                      <span className="text-primary font-bold text-lg">₹{h.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">/night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {h.rating}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 md:px-8 gradient-hero text-primary-foreground">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "18.5K+", label: "Happy Travelers" },
            { value: "68+", label: "Verified Partners" },
            { value: "186+", label: "Active Packages" },
            { value: "4.7★", label: "Average Rating" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl md:text-4xl font-display font-extrabold">{s.value}</p>
              <p className="text-sm opacity-70 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Explore Odisha?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of travelers discovering the hidden gems of Odisha with trusted local partners.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/customer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12">
                  <Palmtree className="mr-2 h-5 w-5" /> Start Exploring
                </Button>
              </Link>
              <Link to="/partner">
                <Button size="lg" variant="outline" className="font-semibold px-8 h-12">
                  Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 border-t bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xs">BB</div>
                <span className="font-display font-bold">BatoiBhai</span>
              </div>
              <p className="text-sm text-muted-foreground">Odisha's leading travel aggregator connecting travelers with verified local tour operators.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Destinations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Puri</li><li>Konark</li><li>Chilika Lake</li><li>Daringbadi</li><li>Simlipal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li><li>Careers</li><li>Partner With Us</li><li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li><li>Cancellation Policy</li><li>Contact Us</li><li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 BatoiBhai. All rights reserved. Made with ❤️ in Odisha</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
