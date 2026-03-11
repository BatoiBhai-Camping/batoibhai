import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Chip, Avatar, Rating, Paper, Box, Typography, IconButton, Fab
} from "@mui/material";
import {
  Plane, Shield, Handshake, Users, ArrowRight, Star, MapPin,
  Hotel, Palmtree, Train, Bus, Search, Tag, Bell, Percent,
  Calendar, ChevronRight, TrendingUp, Award, Heart, Play,
  CheckCircle, Globe, Headphones, CreditCard, Clock, Sparkles,
  ArrowDown, Menu, X, Phone
} from "lucide-react";
import {
  TravelExplore, Verified, EmojiEvents, SupportAgent,
  LocalOffer, FlightTakeoff, KeyboardArrowRight
} from "@mui/icons-material";
import { destinations, offers, hotels } from "@/data/dummyData";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

const travelTypes = [
  { icon: <Palmtree className="w-5 h-5" />, label: "Holidays", active: true },
  { icon: <Hotel className="w-5 h-5" />, label: "Hotels" },
  { icon: <Bus className="w-5 h-5" />, label: "Bus" },
  { icon: <Train className="w-5 h-5" />, label: "Trains" },
  { icon: <Plane className="w-5 h-5" />, label: "Flights" },
];

const features = [
  { icon: <Users className="w-7 h-7" />, title: "For Travelers", desc: "Discover curated Odisha travel packages & hotels at best prices", color: "hsl(192, 70%, 28%)" },
  { icon: <Handshake className="w-7 h-7" />, title: "For Partners", desc: "List your packages and grow your travel business across Odisha", color: "hsl(32, 95%, 52%)" },
  { icon: <Shield className="w-7 h-7" />, title: "For Admins", desc: "Full control over platform operations, analytics & partners", color: "hsl(152, 60%, 40%)" },
];

const popularSearches = ["Puri", "Konark", "Chilika Lake", "Daringbadi", "Simlipal", "Bhubaneswar"];

const whyChooseUs = [
  { icon: <Verified sx={{ fontSize: 28 }} />, title: "Verified Partners", desc: "Every tour operator is background-verified and rated by real travelers" },
  { icon: <LocalOffer sx={{ fontSize: 28 }} />, title: "Best Price Guarantee", desc: "Find a lower price? We'll match it plus give you 10% off" },
  { icon: <SupportAgent sx={{ fontSize: 28 }} />, title: "24/7 Support", desc: "Round-the-clock assistance in Odia, Hindi, and English" },
  { icon: <EmojiEvents sx={{ fontSize: 28 }} />, title: "Reward Points", desc: "Earn BB Coins on every booking, redeem on your next trip" },
];

const testimonials = [
  { name: "Priya Patel", location: "Mumbai", rating: 5, text: "BatoiBhai made our Puri trip absolutely magical! The local guides knew every hidden gem.", avatar: "P" },
  { name: "Amit Dash", location: "Bhubaneswar", rating: 5, text: "As a partner, I've grown my business 3x since joining. The platform is incredibly easy to use.", avatar: "A" },
  { name: "Sneha Rao", location: "Bangalore", rating: 4, text: "The Chilika Lake houseboat experience was beyond amazing. Highly recommend!", avatar: "S" },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Holidays");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return "/login";
    return `/${user.role}`;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Premium Nav */}
      <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-bold cursor-pointer"
              >
                BB
              </motion.div>
              <div>
                <span className="font-display text-xl font-bold">BatoiBhai</span>
                <span className="hidden sm:inline text-[10px] ml-2 opacity-60 uppercase tracking-widest">Odisha's #1</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {travelTypes.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setActiveTab(t.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === t.label ? "bg-primary-foreground/15" : "hover:bg-primary-foreground/10 opacity-70"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Link to={getDashboardLink()}>
                  <Chip
                    avatar={<Avatar sx={{ bgcolor: "hsl(32,95%,52%)", width: 24, height: 24, fontSize: 11 }}>{user?.name[0]}</Avatar>}
                    label={user?.name.split(" ")[0]}
                    size="small"
                    sx={{ color: "white", fontWeight: 600, cursor: "pointer", "& .MuiChip-label": { fontSize: 12 } }}
                  />
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 text-xs">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-bold">Sign Up</Button>
                  </Link>
                </>
              )}
              <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden pb-4 border-t border-primary-foreground/10">
              <div className="flex gap-2 pt-3 flex-wrap">
                {travelTypes.map((t) => (
                  <button key={t.label} onClick={() => { setActiveTab(t.label); setMobileMenu(false); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${activeTab === t.label ? "bg-primary-foreground/15" : "opacity-70"}`}>
                    {t.icon}{t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="gradient-hero text-primary-foreground relative overflow-hidden">
        {/* Animated BG Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-foreground/5"
              style={{ width: 200 + i * 150, height: 200 + i * 150, top: "50%", left: "60%", x: "-50%", y: "-50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div
            className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(32,95%,52%,0.08), transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip
                icon={<FlightTakeoff sx={{ fontSize: 16, color: "white !important" }} />}
                label="Odisha's #1 Travel Platform"
                size="small"
                sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.12)", color: "white", fontWeight: 700, fontSize: 11, letterSpacing: 0.5, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-5">
                Explore the<br />
                Soul of{" "}
                <span className="relative">
                  <span className="text-accent">Incredible</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-accent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </span>
                <br />
                <span className="text-accent">Odisha</span>
              </h1>
              <p className="text-base md:text-lg opacity-75 max-w-lg mb-8 leading-relaxed">
                From the golden shores of Puri to the misty hills of Daringbadi — book curated packages, premium stays & authentic local experiences.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to={isAuthenticated ? "/customer" : "/signup"}>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-12 text-sm shadow-lg">
                    <Sparkles className="mr-2 h-4 w-4" /> Start Exploring
                  </Button>
                </Link>
                <Link to="/partner">
                  <Button size="lg" variant="outline" className="font-bold px-8 h-12 text-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["R", "P", "S", "A"].map((l, i) => (
                    <Avatar key={i} sx={{ width: 32, height: 32, fontSize: 12, fontWeight: 700, bgcolor: i % 2 === 0 ? "hsl(32,95%,52%)" : "hsl(192,70%,40%)", border: "2px solid hsl(192,75%,18%)" }}>
                      {l}
                    </Avatar>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Rating value={4.7} precision={0.1} readOnly size="small" sx={{ "& .MuiRating-iconFilled": { color: "hsl(32,95%,52%)" } }} />
                    <span className="text-sm font-bold">4.7</span>
                  </div>
                  <p className="text-xs opacity-60">18,500+ happy travelers</p>
                </div>
              </div>
            </motion.div>

            {/* Search Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  bgcolor: "rgba(255,255,255,0.97)",
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, mb: 2.5, color: "hsl(210,30%,10%)" }}>
                    <Search className="w-4 h-4 inline mr-2" />Find Your Perfect Trip
                  </Typography>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="border rounded-xl p-3 hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">From</p>
                      <p className="font-display font-bold text-sm text-foreground">Bhubaneswar</p>
                      <p className="text-[10px] text-muted-foreground">Odisha, India</p>
                    </div>
                    <div className="border rounded-xl p-3 hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">To</p>
                      <p className="font-display font-bold text-sm text-foreground">Puri</p>
                      <p className="text-[10px] text-muted-foreground">Beach, Temple</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border rounded-xl p-3 hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Date</p>
                      <p className="font-display font-bold text-sm text-foreground">15 Mar 2026</p>
                      <p className="text-[10px] text-muted-foreground">Saturday</p>
                    </div>
                    <div className="border rounded-xl p-3 hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Travelers</p>
                      <p className="font-display font-bold text-sm text-foreground">2 Adults</p>
                      <p className="text-[10px] text-muted-foreground">1 Room</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 text-sm shadow-md"
                    onClick={() => navigate("/customer")}
                  >
                    <Search className="mr-2 h-4 w-4" /> Search Packages
                  </Button>

                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {popularSearches.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        onClick={() => navigate("/customer")}
                        sx={{ fontSize: 10, fontWeight: 600, cursor: "pointer", bgcolor: "hsl(192,70%,28%,0.06)", color: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,28%,0.12)" } }}
                      />
                    ))}
                  </div>
                </Box>
              </Paper>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offers Carousel */}
      <section className="py-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                <LocalOffer sx={{ color: "hsl(32,95%,52%)" }} /> Exclusive Offers
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>Grab the best deals for your Odisha adventure</Typography>
            </div>
            <Button variant="ghost" className="text-primary font-semibold text-sm">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 2.5,
                    border: "1px solid hsl(210,18%,90%)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 8px 30px -10px rgba(0,0,0,0.12)", transform: "translateY(-4px)" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <Avatar sx={{ bgcolor: "hsl(32,95%,52%,0.1)", color: "hsl(32,95%,52%)", width: 40, height: 40 }}>
                      <Percent className="w-5 h-5" />
                    </Avatar>
                    <Chip label={`${offer.discount}% OFF`} size="small" sx={{ fontWeight: 800, bgcolor: "hsl(32,95%,52%)", color: "white", fontSize: 12 }} />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{offer.title}</Typography>
                  <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", display: "block", mb: 2, lineHeight: 1.5 }}>{offer.description}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <code className="text-xs font-bold bg-muted px-2.5 py-1 rounded-md font-display">{offer.code}</code>
                    <Typography variant="caption" sx={{ color: "hsl(210,10%,60%)" }}>Till {offer.validTill}</Typography>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Chip label="WHY BATOIBHAI" size="small" sx={{ mb: 2, fontWeight: 700, letterSpacing: 1, bgcolor: "hsl(192,70%,28%,0.08)", color: "hsl(192,70%,28%)" }} />
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
              Trusted by 18,500+ Travelers
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", maxWidth: 500, mx: "auto" }}>
              We're not just another travel platform. We're your local companion in exploring Odisha.
            </Typography>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 3.5,
                    textAlign: "center",
                    border: "1px solid hsl(210,18%,90%)",
                    height: "100%",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 8px 30px -10px rgba(0,0,0,0.1)", transform: "translateY(-4px)", borderColor: "hsl(192,70%,28%,0.3)" },
                  }}
                >
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "hsl(192,70%,28%,0.08)", color: "hsl(192,70%,28%)", mx: "auto", mb: 2 }}>
                    {item.icon}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", lineHeight: 1.6 }}>{item.desc}</Typography>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Portals */}
      <section className="py-14 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
              One Platform, Three Portals
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)" }}>Tailored experiences for every user</Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 4,
                    textAlign: "center",
                    border: "1px solid hsl(210,18%,90%)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 12px 40px -10px rgba(0,0,0,0.12)", transform: "translateY(-6px)" },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: f.color,
                    },
                  }}
                >
                  <Avatar sx={{ width: 64, height: 64, bgcolor: `${f.color}14`, color: f.color, mx: "auto", mb: 2.5 }}>
                    {f.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mb: 3, lineHeight: 1.6 }}>{f.desc}</Typography>
                  <Link to={f.title === "For Travelers" ? "/customer" : f.title === "For Partners" ? "/partner" : "/admin"}>
                    <Button variant="outline" className="text-xs font-semibold">
                      Explore <KeyboardArrowRight sx={{ fontSize: 16 }} />
                    </Button>
                  </Link>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800 }}>
                Popular Destinations
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>Explore the most loved spots in Odisha</Typography>
            </div>
            <Button variant="ghost" className="text-primary font-semibold text-sm" onClick={() => navigate("/customer")}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.slice(0, 8).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Paper
                  elevation={0}
                  onClick={() => navigate("/customer/book?package=1")}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid hsl(210,18%,90%)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 12px 40px -10px rgba(0,0,0,0.15)", transform: "translateY(-4px)" },
                  }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Chip size="small" icon={<Star className="w-3 h-3 text-accent fill-accent" />} label={d.rating}
                        sx={{ bgcolor: "rgba(255,255,255,0.95)", fontWeight: 700, fontSize: 11, height: 24, backdropFilter: "blur(10px)" }} />
                    </div>
                    <div className="absolute top-3 left-3">
                      <IconButton size="small" sx={{ bgcolor: "rgba(255,255,255,0.9)", "&:hover": { bgcolor: "white" } }}>
                        <Heart className="w-3.5 h-3.5 text-muted-foreground" />
                      </IconButton>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 700, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>{d.name}</Typography>
                    </div>
                  </div>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <MapPin className="w-3 h-3" /> {d.location}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "hsl(192,70%,28%)" }}>₹{d.price.toLocaleString()}</Typography>
                      </Box>
                      <Chip label={`${d.bookings.toLocaleString()} booked`} size="small" sx={{ fontSize: 9, fontWeight: 600, bgcolor: "hsl(152,60%,40%,0.08)", color: "hsl(152,60%,40%)" }} />
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Hotels */}
      <section className="py-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                <Hotel className="w-6 h-6 text-primary" /> Top Rated Hotels
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>Handpicked premium stays across Odisha</Typography>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.slice(0, 6).map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid hsl(210,18%,90%)",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 12px 40px -10px rgba(0,0,0,0.12)", transform: "translateY(-4px)" },
                  }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                    <Chip
                      label={"★".repeat(h.stars)}
                      size="small"
                      sx={{ position: "absolute", top: 10, left: 10, bgcolor: "hsl(32,95%,52%)", color: "white", fontWeight: 700, fontSize: 11 }}
                    />
                  </div>
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{h.name}</Typography>
                    <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                      <MapPin className="w-3 h-3" /> {h.location}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mt: 1.5, flexWrap: "wrap" }}>
                      {h.amenities.slice(0, 3).map((a) => (
                        <Chip key={a} label={a} size="small" sx={{ fontSize: 9, fontWeight: 600, bgcolor: "hsl(210,80%,55%,0.08)", color: "hsl(210,80%,55%)", height: 22 }} />
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, pt: 2, borderTop: "1px solid hsl(210,18%,92%)" }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "hsl(192,70%,28%)" }}>₹{h.price.toLocaleString()}</Typography>
                        <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>/night</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{h.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
              What Travelers Say
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)" }}>Real stories from real explorers</Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Paper elevation={0} sx={{ borderRadius: 3, p: 3.5, border: "1px solid hsl(210,18%,90%)", height: "100%" }}>
                  <Rating value={t.rating} readOnly size="small" sx={{ mb: 2, "& .MuiRating-iconFilled": { color: "hsl(32,95%,52%)" } }} />
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, color: "hsl(210,10%,30%)", fontStyle: "italic" }}>
                    "{t.text}"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "hsl(192,70%,28%)", width: 36, height: 36, fontWeight: 700, fontSize: 14 }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>{t.location}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 gradient-hero text-primary-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "18.5K+", label: "Happy Travelers", icon: <Users className="w-5 h-5" /> },
            { value: "68+", label: "Verified Partners", icon: <Handshake className="w-5 h-5" /> },
            { value: "186+", label: "Active Packages", icon: <Palmtree className="w-5 h-5" /> },
            { value: "4.7★", label: "Average Rating", icon: <Star className="w-5 h-5" /> },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3">
                {s.icon}
              </div>
              <p className="text-3xl md:text-4xl font-display font-extrabold">{s.value}</p>
              <p className="text-sm opacity-60 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Chip label="START YOUR JOURNEY" size="small" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1, bgcolor: "hsl(32,95%,52%,0.1)", color: "hsl(32,95%,52%)" }} />
            <Typography variant="h3" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 2 }}>
              Ready to Explore Odisha?
            </Typography>
            <Typography variant="body1" sx={{ color: "hsl(210,10%,50%)", mb: 5, maxWidth: 500, mx: "auto", lineHeight: 1.7 }}>
              Join thousands of travelers discovering the hidden gems of Odisha with trusted local partners.
            </Typography>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={isAuthenticated ? "/customer" : "/signup"}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 h-14 text-sm shadow-lg">
                  <Palmtree className="mr-2 h-5 w-5" /> Start Exploring
                </Button>
              </Link>
              <Link to="/partner">
                <Button size="lg" variant="outline" className="font-bold px-10 h-14 text-sm">
                  Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">BB</div>
                <span className="font-display font-bold text-lg">BatoiBhai</span>
              </div>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", maxWidth: 280, lineHeight: 1.7, mb: 2 }}>
                Odisha's leading travel aggregator connecting travelers with verified local tour operators and premium stays.
              </Typography>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5" /> +91 674 123 4567
              </div>
            </div>
            {[
              { title: "Destinations", items: ["Puri", "Konark", "Chilika Lake", "Daringbadi", "Simlipal"] },
              { title: "Company", items: ["About Us", "Careers", "Partner With Us", "Blog"] },
              { title: "Support", items: ["Help Center", "Cancellation Policy", "Contact Us", "Terms & Conditions"] },
            ].map((section) => (
              <div key={section.title}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>{section.title}</Typography>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <Typography variant="caption" sx={{ color: "hsl(210,10%,55%)" }}>© 2026 BatoiBhai. All rights reserved. Made with ❤️ in Odisha</Typography>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
              <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
              <span className="hover:text-foreground cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
