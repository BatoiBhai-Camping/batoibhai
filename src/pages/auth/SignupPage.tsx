import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  TextField, Button as MuiButton, Alert, CircularProgress, IconButton, InputAdornment,
  ToggleButtonGroup, ToggleButton, Typography, Box, Stepper, Step, StepLabel
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email, Lock, Person, Phone,
  AdminPanelSettings, Handshake, TravelExplore
} from "@mui/icons-material";

const roles: { value: UserRole; label: string; icon: React.ReactElement; desc: string }[] = [
  { value: "customer", label: "Traveler", icon: <TravelExplore />, desc: "Book trips & explore Odisha" },
  { value: "partner", label: "Partner", icon: <Handshake />, desc: "List packages & grow business" },
  { value: "admin", label: "Admin", icon: <AdminPanelSettings />, desc: "Manage the platform" },
];

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (step === 0 && !role) { setError("Select a role"); return; }
    if (step === 1) {
      if (!name || !email || !phone) { setError("Fill all fields"); return; }
    }
    setError("");
    setStep(step + 1);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }

    const result = await signup({ name, email, phone, password, role });
    if (result.success) {
      navigate(`/${role}`, { replace: true });
    } else {
      setError(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-primary-foreground">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center font-bold text-lg">BB</div>
              <span className="font-display text-2xl font-bold">BatoiBhai</span>
            </div>
            <h1 className="text-4xl font-display font-extrabold leading-tight mb-6">
              Join Odisha's<br />#1 Travel Platform
            </h1>
            <p className="text-lg opacity-80 max-w-md leading-relaxed">
              Whether you're a traveler, tour operator, or platform admin — we've got you covered.
            </p>
            <div className="mt-10 space-y-4">
              {["Verified local partners", "Best price guarantee", "24/7 travel support"].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm">✓</div>
                  <span className="text-sm opacity-90">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center font-bold text-accent-foreground">BB</div>
            <span className="font-display text-xl font-bold">BatoiBhai</span>
          </div>

          <Typography variant="h4" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mb: 3 }}>
            Start your Odisha adventure today
          </Typography>

          <Stepper activeStep={step} sx={{ mb: 4 }}>
            {["Role", "Details", "Password"].map((l) => (
              <Step key={l}><StepLabel>{l}</StepLabel></Step>
            ))}
          </Stepper>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError("")}>{error}</Alert>}

          {step === 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>I want to join as:</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {roles.map((r) => (
                  <MuiButton
                    key={r.value}
                    variant={role === r.value ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => setRole(r.value)}
                    startIcon={r.icon}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      py: 2,
                      px: 3,
                      borderRadius: 2,
                      fontWeight: 600,
                      ...(role === r.value
                        ? { bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }
                        : {}),
                    }}
                  >
                    <Box sx={{ textAlign: "left", ml: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{r.label}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>{r.desc}</Typography>
                    </Box>
                  </MuiButton>
                ))}
              </Box>
              <MuiButton fullWidth variant="contained" sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: "none", bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }} onClick={handleNext}>
                Continue
              </MuiButton>
            </Box>
          )}

          {step === 1 && (
            <Box>
              <TextField fullWidth label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Person sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment> } }} />
              <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment> } }} />
              <TextField fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required sx={{ mb: 3 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Phone sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment> } }} />
              <Box sx={{ display: "flex", gap: 2 }}>
                <MuiButton variant="outlined" sx={{ flex: 1, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600 }} onClick={() => setStep(0)}>Back</MuiButton>
                <MuiButton variant="contained" sx={{ flex: 2, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }} onClick={handleNext}>Continue</MuiButton>
              </Box>
            </Box>
          )}

          {step === 2 && (
            <form onSubmit={handleSignup}>
              <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment>,
                    endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}</IconButton></InputAdornment>,
                  }
                }} />
              <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required sx={{ mb: 3 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment> } }} />
              <Box sx={{ display: "flex", gap: 2 }}>
                <MuiButton variant="outlined" sx={{ flex: 1, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 600 }} onClick={() => setStep(1)}>Back</MuiButton>
                <MuiButton type="submit" variant="contained" disabled={isLoading} sx={{ flex: 2, py: 1.5, borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }}>
                  {isLoading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Create Account"}
                </MuiButton>
              </Box>
            </form>
          )}

          <Typography variant="body2" sx={{ mt: 4, textAlign: "center", color: "hsl(210,10%,50%)" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </Typography>
          <Typography variant="caption" sx={{ mt: 2, display: "block", textAlign: "center", color: "hsl(210,10%,60%)" }}>
            <Link to="/" className="hover:underline">← Back to Home</Link>
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}
