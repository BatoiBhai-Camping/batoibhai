import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chip, Avatar, Rating, Paper, Box, Typography } from "@mui/material";
import {
  Plane,
  Shield,
  Handshake,
  Users,
  ArrowRight,
  Star,
  MapPin,
  Hotel,
  Palmtree,
  Train,
  Bus,
  Search,
  Percent,
  Menu,
  X,
  Phone,
  Compass,
  Sparkles,
  Camera,
  Waves,
  Trees,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import {
  TravelExplore,
  Verified,
  EmojiEvents,
  SupportAgent,
  LocalOffer,
  FlightTakeoff,
  AutoStories,
  Hiking,
} from "@mui/icons-material";
import { usePublicData } from "@/hooks/useBackendData";
import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const travelTypes = [
  { icon: <Palmtree className="w-5 h-5" />, label: "Holidays", active: true },
  { icon: <Hotel className="w-5 h-5" />, label: "Hotels" },
  { icon: <Bus className="w-5 h-5" />, label: "Bus" },
  { icon: <Train className="w-5 h-5" />, label: "Trains" },
  { icon: <Plane className="w-5 h-5" />, label: "Flights" },
];

const portalFeatures = [
  {
    icon: <Users className="w-7 h-7" />,
    title: "For Travelers",
    desc: "Plan an Odisha journey that feels handcrafted from your first search to your final sunset.",
    color: "hsl(192, 70%, 28%)",
    link: "/customer",
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    title: "For Partners",
    desc: "Turn your local knowledge into bookable stories, repeat guests, and long-term growth.",
    color: "hsl(32, 95%, 52%)",
    link: "/partner",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "For Admins",
    desc: "Oversee bookings, partner quality, and platform performance with a clear operational view.",
    color: "hsl(152, 60%, 40%)",
    link: "/admin",
  },
];

const whyChooseUs = [
  {
    icon: <Verified sx={{ fontSize: 28 }} />,
    title: "Verified Partners",
    desc: "Every itinerary is backed by operators who understand local timing, routes, and hospitality.",
  },
  {
    icon: <LocalOffer sx={{ fontSize: 28 }} />,
    title: "Best Value",
    desc: "Transparent pricing helps travelers compare smartly without losing the premium feel of the trip.",
  },
  {
    icon: <SupportAgent sx={{ fontSize: 28 }} />,
    title: "Always Supported",
    desc: "Get help before, during, and after your trip in Odia, Hindi, and English.",
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 28 }} />,
    title: "Built for Repeat Trips",
    desc: "Save favorites, return with new plans, and keep discovering different sides of Odisha.",
  },
];

const testimonials = [
  {
    name: "Priya Patel",
    location: "Mumbai",
    rating: 5,
    text: "We didn't just book Puri. We felt guided through a full coastal story with details we would've missed on our own.",
    avatar: "P",
  },
  {
    name: "Amit Dash",
    location: "Bhubaneswar",
    rating: 5,
    text: "As a partner, BatoiBhai lets me present experiences the way travelers actually imagine them — vivid, personal, and trustworthy.",
    avatar: "A",
  },
  {
    name: "Sneha Rao",
    location: "Bangalore",
    rating: 4,
    text: "The Chilika booking felt effortless, but the experience felt cinematic. That's a rare combination.",
    avatar: "S",
  },
];

const storyMoments = [
  {
    icon: <Waves className="w-5 h-5" />,
    title: "Sunrise by the Bay",
    desc: "Start with sea air, temple bells, and quiet roads before the crowds arrive.",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Landmarks Worth Slowing Down For",
    desc: "Move beyond checklist tourism into stays and routes designed around atmosphere.",
  },
  {
    icon: <Trees className="w-5 h-5" />,
    title: "Nature That Changes the Pace",
    desc: "Shift from beaches to lakes, forests, and hills without losing trip continuity.",
  },
];

const journeySteps = [
  {
    eyebrow: "Chapter 01",
    title: "Choose the mood of your trip",
    desc: "Beach escape, temple trail, wildlife retreat, or a blended circuit — begin with the feeling you want to remember.",
  },
  {
    eyebrow: "Chapter 02",
    title: "Shape it with local insight",
    desc: "Browse verified stays, package details, and trusted operators who know the region's rhythm.",
  },
  {
    eyebrow: "Chapter 03",
    title: "Travel with clarity",
    desc: "From search to booking, every step is designed to feel guided, clean, and confidence-building.",
  },
];

export default function LandingPage() {
  const { destinations, offers, hotels } = usePublicData();
  const [activeTab, setActiveTab] = useState("Holidays");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return "/login";
    return `/${user.role}`;
  };

  const featuredDestinations = useMemo(() => destinations.slice(0, 3), [destinations]);
  const featuredHotels = useMemo(() => hotels.slice(0, 3), [hotels]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
                <span className="hidden sm:inline text-[10px] ml-2 opacity-60 uppercase tracking-[0.3em]">Travel stories of Odisha</span>
              </div>
            </div>

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
                    avatar={
                      <Avatar sx={{ bgcolor: "hsl(32,95%,52%)", width: 24, height: 24, fontSize: 11 }}>
                        {user?.name[0]}
                      </Avatar>
                    }
                    label={user?.name.split(" ")[0]}
                    size="small"
                    sx={{ color: "white", fontWeight: 600, cursor: "pointer", "& .MuiChip-label": { fontSize: 12 } }}
                  />
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 text-xs">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-bold">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden pb-4 border-t border-primary-foreground/10"
            >
              <div className="flex gap-2 pt-3 flex-wrap">
                {travelTypes.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => {
                      setActiveTab(t.label);
                      setMobileMenu(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                      activeTab === t.label ? "bg-primary-foreground/15" : "opacity-70"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <section className="gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-foreground/10"
              style={{ width: 240 + i * 180, height: 240 + i * 180, top: "55%", left: "68%", x: "-50%", y: "-50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 36 + i * 8, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,179,71,0.18),transparent_30%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Chip
                icon={<AutoStories sx={{ fontSize: 16, color: "white !important" }} />}
                label="Story-led travel planning"
                size="small"
                sx={{
                  mb: 3,
                  bgcolor: "rgba(255,255,255,0.12)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 0.5,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.05] mb-5 max-w-4xl">
                Don't just book Odisha.
                <br />
                <span className="text-accent">Enter the journey</span> before you arrive.
              </h1>
              <p className="text-base md:text-lg opacity-80 max-w-2xl mb-8 leading-relaxed">
                BatoiBhai turns packages, stays, and local expertise into a travel story you can see, compare, and trust — from coastal dawns in Puri to forest silence near Simlipal.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link to={isAuthenticated ? "/customer" : "/signup"}>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-12 text-sm shadow-lg">
                    <Sparkles className="mr-2 h-4 w-4" /> Begin Your Story
                  </Button>
                </Link>
                <Link to="/partner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-bold px-8 h-12 text-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Host an Experience <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 max-w-3xl">
                {storyMoments.map((moment) => (
                  <div key={moment.title} className="rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm p-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">{moment.icon}</div>
                    <p className="text-sm font-semibold mb-1">{moment.title}</p>
                    <p className="text-xs opacity-70 leading-5">{moment.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 5,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  bgcolor: "rgba(255,255,255,0.97)",
                }}
              >
                <Box sx={{ p: 3.5 }}>
                  <Typography variant="overline" sx={{ letterSpacing: 2, color: "hsl(210,12%,40%)", fontWeight: 800 }}>
                    Featured itinerary preview
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1.2, color: "hsl(210,30%,10%)" }}>
                    A journey with chapters, not just checkboxes.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "hsl(210,10%,45%)", lineHeight: 1.7, mb: 3 }}>
                    Picture a route that begins with a sunrise darshan, drifts through coastal cafés, pauses at Konark, and ends with a quiet evening stay chosen by someone who knows the place.
                  </Typography>

                  <div className="space-y-3 mb-4">
                    {journeySteps.map((step) => (
                      <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary/70 mb-1">{step.eyebrow}</p>
                        <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                        <p className="text-xs text-muted-foreground leading-5">{step.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl bg-primary text-primary-foreground p-4">
                      <div className="flex items-center gap-2 mb-2 text-primary-foreground/80 text-xs font-semibold uppercase tracking-[0.2em]">
                        <Clock3 className="w-4 h-4" /> Travel tempo
                      </div>
                      <p className="text-sm font-semibold">Balanced, scenic, and easy to follow</p>
                    </div>
                    <div className="rounded-2xl bg-accent/15 p-4 text-accent-foreground">
                      <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                        <Compass className="w-4 h-4" /> Ideal for
                      </div>
                      <p className="text-sm font-semibold text-slate-900">Couples, families, and first-time Odisha explorers</p>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 text-sm shadow-md" onClick={() => navigate("/customer")}>
                    <Search className="mr-2 h-4 w-4" /> Explore Curated Trips
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <Chip label="THE JOURNEY FEEL" size="small" sx={{ mb: 2, fontWeight: 700, letterSpacing: 1, bgcolor: "hsl(192,70%,28%,0.08)", color: "hsl(192,70%,28%)" }} />
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1.5 }}>
              Travel planning that reads like a preview, not a spreadsheet.
            </Typography>
            <Typography variant="body1" sx={{ color: "hsl(210,10%,45%)", lineHeight: 1.8, maxWidth: 540 }}>
              Great trips are remembered as moods, moments, and scenes. So the landing experience now guides visitors through atmosphere first, then trust, then conversion.
            </Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper elevation={0} sx={{ borderRadius: 4, p: 3, border: "1px solid hsl(210,18%,90%)", height: "100%" }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 font-bold">0{index + 1}</div>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", lineHeight: 1.7 }}>{step.desc}</Typography>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                <TravelExplore sx={{ color: "hsl(192,70%,28%)" }} /> Story-worthy destinations
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>
                Lead with scenes travelers can instantly imagine themselves inside.
              </Typography>
            </div>
            <Button variant="ghost" className="text-primary font-semibold text-sm" onClick={() => navigate("/customer")}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {featuredDestinations.map((destination, i) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Paper
                  elevation={0}
                  onClick={() => navigate("/customer/book?package=1")}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid hsl(210,18%,90%)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 16px 44px -16px rgba(0,0,0,0.18)", transform: "translateY(-4px)" },
                  }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img src={destination.image} alt={destination.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                      <Chip
                        size="small"
                        icon={<Star className="w-3 h-3 text-accent fill-accent" />}
                        label={destination.rating}
                        sx={{ bgcolor: "rgba(255,255,255,0.92)", fontWeight: 700, fontSize: 11, height: 24 }}
                      />
                      <Chip label={`${destination.bookings.toLocaleString()} travelers`} size="small" sx={{ bgcolor: "rgba(17,24,39,0.65)", color: "white", fontWeight: 700, fontSize: 10 }} />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/75 mb-1">Featured scene</p>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "white", mb: 0.5 }}>{destination.name}</Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", gap: 0.75 }}>
                        <MapPin className="w-4 h-4" /> {destination.location}
                      </Typography>
                    </div>
                  </div>
                  <Box sx={{ p: 3 }}>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary/70 mb-3">
                      <Sparkles className="w-4 h-4" /> What makes it unforgettable
                    </div>
                    <Typography variant="body2" sx={{ color: "hsl(210,10%,45%)", lineHeight: 1.8, mb: 3 }}>
                      Scenic pacing, local character, and flexible trip options make this destination easy to picture and even easier to book.
                    </Typography>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "hsl(192,70%,28%)" }}>
                          ₹{destination.price.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>starting price</Typography>
                      </div>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View Journey
                      </Button>
                    </div>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                <LocalOffer sx={{ color: "hsl(32,95%,52%)" }} /> Offers that fit the narrative
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>
                Savings should feel like momentum, not clutter.
              </Typography>
            </div>
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
                  <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", display: "block", mb: 2, lineHeight: 1.6 }}>
                    {offer.description}
                  </Typography>
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

      <section className="py-14 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <div>
            <Chip label="TRUST LAYER" size="small" sx={{ mb: 2, fontWeight: 700, letterSpacing: 1, bgcolor: "hsl(152,60%,40%,0.08)", color: "hsl(152,60%,34%)" }} />
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1.5 }}>
              Behind every beautiful trip is a system travelers can rely on.
            </Typography>
            <Typography variant="body1" sx={{ color: "hsl(210,10%,45%)", lineHeight: 1.8, mb: 4, maxWidth: 560 }}>
              The storytelling layer creates desire. The platform layer earns trust. BatoiBhai balances both with verified supply, responsive support, and clean booking pathways.
            </Typography>
            <div className="grid sm:grid-cols-2 gap-5">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Paper elevation={0} sx={{ borderRadius: 4, p: 3, border: "1px solid hsl(210,18%,90%)", height: "100%" }}>
                    <Avatar sx={{ width: 52, height: 52, bgcolor: "hsl(192,70%,28%,0.08)", color: "hsl(192,70%,28%)", mb: 2 }}>
                      {item.icon}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", lineHeight: 1.7 }}>{item.desc}</Typography>
                  </Paper>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <Paper elevation={0} sx={{ borderRadius: 4, p: 4, border: "1px solid hsl(210,18%,90%)", background: "linear-gradient(135deg, rgba(9,55,78,1) 0%, rgba(16,88,112,1) 100%)", color: "white" }}>
              <div className="flex items-center gap-2 mb-3 text-white/70 text-xs uppercase tracking-[0.24em] font-semibold">
                <Hiking sx={{ fontSize: 18 }} /> Partner promise
              </div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1.5, color: "white" }}>
                Local operators can now sell the feeling of the trip, not only the logistics.
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.8, mb: 3 }}>
                This layout gives partners a stronger stage to present experiences with emotion, clarity, and social proof — increasing confidence on both sides.
              </Typography>
              <div className="space-y-2.5">
                {[
                  "Story-first framing for package discovery",
                  "Premium trust cues embedded near conversion moments",
                  "More memorable messaging for repeat visits and referrals",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Paper>

            <div className="grid sm:grid-cols-3 gap-4">
              {portalFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Paper elevation={0} sx={{ borderRadius: 4, p: 3, border: "1px solid hsl(210,18%,90%)", height: "100%", position: "relative", overflow: "hidden" }}>
                    <div className="absolute inset-x-0 top-0 h-1" style={{ background: feature.color }} />
                    <Avatar sx={{ width: 54, height: 54, bgcolor: `${feature.color}14`, color: feature.color, mb: 2 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", lineHeight: 1.7, mb: 2 }}>{feature.desc}</Typography>
                    <Link to={feature.link}>
                      <Button variant="outline" size="sm" className="text-xs font-semibold">
                        Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </Paper>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
                <Hotel className="w-6 h-6 text-primary" /> Stays that match the story arc
              </Typography>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mt: 0.5 }}>
                Lodging should extend the trip atmosphere, not interrupt it.
              </Typography>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredHotels.map((hotel, i) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid hsl(210,18%,90%)",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 12px 40px -10px rgba(0,0,0,0.12)", transform: "translateY(-4px)" },
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <Chip label={"★".repeat(hotel.stars)} size="small" sx={{ position: "absolute", top: 12, left: 12, bgcolor: "hsl(32,95%,52%)", color: "white", fontWeight: 700, fontSize: 11 }} />
                  </div>
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{hotel.name}</Typography>
                    <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)", display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                      <MapPin className="w-3 h-3" /> {hotel.location}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mt: 1.5, flexWrap: "wrap" }}>
                      {hotel.amenities.slice(0, 3).map((amenity) => (
                        <Chip key={amenity} label={amenity} size="small" sx={{ fontSize: 9, fontWeight: 600, bgcolor: "hsl(210,80%,55%,0.08)", color: "hsl(210,80%,55%)", height: 22 }} />
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, pt: 2, borderTop: "1px solid hsl(210,18%,92%)" }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "hsl(192,70%,28%)" }}>₹{hotel.price.toLocaleString()}</Typography>
                        <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>/night</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{hotel.rating}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
              Real reactions to memorable journeys
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)" }}>
              Social proof now supports the story rather than sitting apart from it.
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Paper elevation={0} sx={{ borderRadius: 4, p: 3.5, border: "1px solid hsl(210,18%,90%)", height: "100%" }}>
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2, "& .MuiRating-iconFilled": { color: "hsl(32,95%,52%)" } }} />
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, color: "hsl(210,10%,30%)", fontStyle: "italic" }}>
                    "{testimonial.text}"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "hsl(192,70%,28%)", width: 36, height: 36, fontWeight: 700, fontSize: 14 }}>{testimonial.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{testimonial.name}</Typography>
                      <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>{testimonial.location}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 gradient-hero text-primary-foreground">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "18.5K+", label: "Happy Travelers", icon: <Users className="w-5 h-5" /> },
            { value: "68+", label: "Verified Partners", icon: <Handshake className="w-5 h-5" /> },
            { value: "186+", label: "Active Packages", icon: <Palmtree className="w-5 h-5" /> },
            { value: "4.7★", label: "Average Rating", icon: <Star className="w-5 h-5" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-display font-extrabold">{stat.value}</p>
              <p className="text-sm opacity-60 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Chip label="NEXT CHAPTER" size="small" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1, bgcolor: "hsl(32,95%,52%,0.1)", color: "hsl(32,95%,52%)" }} />
            <Typography variant="h3" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 2 }}>
              Ready to turn inspiration into itinerary?
            </Typography>
            <Typography variant="body1" sx={{ color: "hsl(210,10%,50%)", mb: 5, maxWidth: 560, mx: "auto", lineHeight: 1.8 }}>
              Browse the platform as a traveler, partner, or admin — each route now sits inside a clearer, richer landing-page story built to convert with confidence.
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

      <footer className="py-12 px-4 md:px-8 border-t bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm">BB</div>
                <span className="font-display font-bold text-lg">BatoiBhai</span>
              </div>
              <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", maxWidth: 320, lineHeight: 1.7, mb: 2 }}>
                Odisha's travel platform for discovering trips as stories — built with verified local operators, memorable stays, and conversion-ready trust.
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
