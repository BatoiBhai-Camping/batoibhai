import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { TextField, Button as MuiButton, Alert, CircularProgress, InputAdornment, Typography, Box } from "@mui/material";
import { Email, CheckCircle } from "@mui/icons-material";

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await forgotPassword(email);
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error || "Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center font-bold text-accent-foreground">BB</div>
          <span className="font-display text-xl font-bold">BatoiBhai</span>
        </div>

        {sent ? (
          <Box sx={{ textAlign: "center" }}>
            <CheckCircle sx={{ fontSize: 56, color: "hsl(152,60%,40%)", mb: 2 }} />
            <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1 }}>Check your email</Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mb: 3 }}>
              We've sent a password reset link to <strong>{email}</strong>
            </Typography>
            <Link to="/login">
              <MuiButton variant="contained" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }}>
                Back to Login
              </MuiButton>
            </Link>
          </Box>
        ) : (
          <>
            <Typography variant="h5" sx={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, mb: 1, textAlign: "center" }}>
              Forgot Password?
            </Typography>
            <Typography variant="body2" sx={{ color: "hsl(210,10%,50%)", mb: 3, textAlign: "center" }}>
              Enter your email and we'll send a reset link
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError("")}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 3 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 20, color: "hsl(210,10%,50%)" }} /></InputAdornment> } }} />
              <MuiButton type="submit" fullWidth variant="contained" disabled={isLoading}
                sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: "none", bgcolor: "hsl(192,70%,28%)", "&:hover": { bgcolor: "hsl(192,70%,22%)" } }}>
                {isLoading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Send Reset Link"}
              </MuiButton>
            </form>
            <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: "hsl(210,10%,50%)" }}>
              <Link to="/login" className="font-semibold text-primary hover:underline">← Back to Login</Link>
            </Typography>
          </>
        )}
      </motion.div>
    </div>
  );
}
