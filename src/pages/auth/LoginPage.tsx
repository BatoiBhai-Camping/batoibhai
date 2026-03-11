import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  TextField, Button as MuiButton, Alert, CircularProgress, IconButton, InputAdornment,
  Divider, Chip, Avatar, Paper, Box, Typography, Tabs, Tab
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email, Lock, AdminPanelSettings,
  Handshake, Person, TravelExplore
} from "@mui/icons-material";
import { Palmtree } from "lucide-react";

const demoAccounts = [
  { label: "Admin", email: "admin@batoibhai.com", password: "admin123", icon: <AdminPanelSettings />, color: "#1565c0" },
  { label: "Partner", email: "partner@batoibhai.com", password: "partner123", icon: <Handshake />, color: "#2e7d32" },
  { label: "Customer", email: "customer@batoibhai.com", password: "customer123", icon: <Person />, color: "#e65100" },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) {
      // Navigate to the appropriate dashboard based on role or original location
      if (from) {
        navigate(from, { replace: true });
      } else {
        const entry = demoAccounts.find(d => d.email === email.toLowerCase());
        navigate(entry ? `/${entry.label.toLowerCase()}` : "/customer", { replace: true });
      }
    } else {
      setError(result.error || "Login failed");
    }
  };

  const quickLogin = async (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
    const result = await login(account.email, account.password);
    if (result.success) {
      navigate(`/${account.label.toLowerCase()}`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 100 + i * 80,
                height: 100 + i * 80,
                border: "1px solid rgba(255,255,255,0.2)",
                top: `${10 + i * 12}%`,
                left: `${-5 + i * 8}%`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-primary-foreground">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center font-bold text-lg">BB</div>
              <span className="font-display text-2xl font-bold">BatoiBhai</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-display font-extrabold leading-tight mb-6">
              Your Gateway to<br />
              <span className="text-accent">Incredible Odisha</span>
            </h1>
            <p className="text-lg opacity-80 max-w-md mb-10 leading-relaxed">
              Discover curated travel packages, premium hotels, and authentic experiences across the soul of East India.
            </p>
            <div className="flex gap-6">
              {[
                { value: "18.5K+", label: "Travelers" },
                { value: "186+", label: "Packages" },
                { value: "4.7★", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-display font-bold">{s.value}</p>
                  <p className="text-sm opacity-60">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center font-bold text-accent-foreground">BB</div>
            <span className="font-display text-xl font-bold">BatoiBhai</span>
          </div>

          <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mb: 4 }}>
            Sign in to continue your journey
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2.5 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"><Email sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment>
                  ),
                }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 1 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"><Lock sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </Box>

            <MuiButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 15,
                textTransform: "none",
                bgcolor: "hsl(192, 70%, 28%)",
                "&:hover": { bgcolor: "hsl(192, 70%, 22%)" },
              }}
            >
              {isLoading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Sign In"}
            </MuiButton>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" sx={{ color: "hsl(210,10%,50%)" }}>Quick Demo Login</Typography>
          </Divider>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            {demoAccounts.map((acc) => (
              <MuiButton
                key={acc.label}
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => quickLogin(acc)}
                disabled={isLoading}
                startIcon={acc.icon}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 12,
                  py: 1,
                  borderColor: acc.color,
                  color: acc.color,
                  "&:hover": { bgcolor: `${acc.color}10`, borderColor: acc.color },
                }}
              >
                {acc.label}
              </MuiButton>
            ))}
          </Box>

          <Typography variant="body2" sx={{ mt: 4, textAlign: "center", color: "hsl(210,10%,50%)" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </Typography>

          <Typography variant="caption" sx={{ mt: 2, display: "block", textAlign: "center", color: "hsl(210,10%,60%)" }}>
            <Link to="/" className="hover:underline">← Back to Home</Link>
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}
