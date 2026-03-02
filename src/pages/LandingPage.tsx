import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chip } from "@mui/material";
import { Plane, Shield, Handshake, Users, ArrowRight, Star, MapPin } from "lucide-react";
import { destinations } from "@/data/dummyData";

const features = [
  { icon: <Users className="w-6 h-6" />, title: "For Travelers", desc: "Discover curated travel packages across Bangladesh" },
  { icon: <Handshake className="w-6 h-6" />, title: "For Partners", desc: "List your packages and grow your travel business" },
  { icon: <Shield className="w-6 h-6" />, title: "For Admins", desc: "Full control over platform operations and analytics" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-card border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-bold">
            BB
          </div>
          <span className="font-display text-xl font-bold">BatoiBhai</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/customer">
            <Button variant="ghost" size="sm">Explore</Button>
          </Link>
          <Link to="/partner">
            <Button variant="ghost" size="sm">Partner Portal</Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label="🚀 Bangladesh's #1 Travel Platform" sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.15)", color: "white", fontWeight: 600 }} />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight mb-6">
              Travel Smarter<br />
              with <span className="text-accent">BatoiBhai</span>
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mb-8 font-body">
              Aggregate platform connecting travelers with verified tour operators. 
              Book curated packages, manage your business, or oversee the entire ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/customer">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12">
                  <Plane className="mr-2 h-5 w-5" /> Start Exploring
                </Button>
              </Link>
              <Link to="/partner">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 h-12">
                  Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">One Platform, Three Portals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
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
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-2">Popular Destinations</h2>
          <p className="text-muted-foreground mb-8">Discover the most loved travel spots</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.slice(0, 6).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" /> {d.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-lg">{d.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {d.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-bold">৳{d.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{d.bookings} bookings</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t bg-card">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold text-xs">
              BB
            </div>
            <span className="font-display font-bold">BatoiBhai</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 BatoiBhai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
