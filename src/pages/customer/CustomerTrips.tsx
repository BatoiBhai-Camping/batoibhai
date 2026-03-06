import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { myTrips } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Star, Calendar, MapPin, Download, Eye, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Rating, Avatar, Tooltip, IconButton } from "@mui/material";
import { Input } from "@/components/ui/input";

export default function CustomerTrips() {
  const [cancelDialog, setCancelDialog] = useState<typeof myTrips[0] | null>(null);
  const [reviewDialog, setReviewDialog] = useState<typeof myTrips[0] | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const upcoming = myTrips.filter(t => t.status === "upcoming");
  const completed = myTrips.filter(t => t.status === "completed");

  return (
    <PanelLayout panel="customer">
      <PageHeader
        title="My Trips"
        subtitle="Your Odisha travel history and upcoming adventures"
        actions={<Chip label={`${upcoming.length} upcoming`} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 700 }} />}
      />

      {upcoming.length > 0 && (
        <>
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-info" /> Upcoming Trips ({upcoming.length})
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {upcoming.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border-2 border-primary/20 rounded-xl p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-sm">{t.package}</h4>
                      <p className="text-xs text-muted-foreground">{t.partner}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm mt-3 bg-muted/50 rounded-lg p-2.5">
                  <span className="flex items-center gap-1 text-muted-foreground text-xs"><Calendar className="w-3.5 h-3.5" /> {t.date}</span>
                  <span className="font-semibold text-primary text-sm">₹{t.amount.toLocaleString()}</span>
                </div>
                <div className="mt-3 pt-3 border-t flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs flex-1">
                    <Eye className="w-3.5 h-3.5 mr-1" /> Details
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => setCancelDialog(t)}>
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <h3 className="font-display font-semibold text-lg mb-4">Past Trips ({completed.length})</h3>
      <div className="space-y-3">
        {completed.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-4">
              <Avatar sx={{ bgcolor: "hsl(192,70%,28%)", width: 40, height: 40, fontSize: 14 }}>{t.package[0]}</Avatar>
              <div>
                <h4 className="font-medium text-sm">{t.package}</h4>
                <p className="text-xs text-muted-foreground">{t.partner} • {t.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-semibold">₹{t.amount.toLocaleString()}</span>
              {t.rating && (
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= t.rating! ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              )}
              <StatusBadge status={t.status} />
              <div className="flex gap-0.5">
                {!t.rating && (
                  <Tooltip title="Write Review" arrow>
                    <IconButton size="small" onClick={() => { setReviewDialog(t); setReviewRating(5); setReviewText(""); }}>
                      <MessageSquare className="w-3.5 h-3.5" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Download Receipt" arrow>
                  <IconButton size="small"><Download className="w-3.5 h-3.5" /></IconButton>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cancel Confirmation */}
      <Dialog open={!!cancelDialog} onClose={() => setCancelDialog(null)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        {cancelDialog && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Cancel Trip?</DialogTitle>
            <DialogContent>
              <p className="text-sm text-muted-foreground mb-3">Are you sure you want to cancel <strong>{cancelDialog.package}</strong> on {cancelDialog.date}?</p>
              <div className="bg-success/10 rounded-lg p-3 text-xs text-success">
                ✓ Full refund of ₹{cancelDialog.amount.toLocaleString()} will be processed within 5-7 business days if cancelled 48 hours before travel.
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setCancelDialog(null)}>Keep Trip</Button>
              <Button className="bg-destructive text-destructive-foreground" onClick={() => { setCancelDialog(null); setSnackbar({ open: true, message: "Trip cancelled. Refund will be processed shortly." }); }}>
                <XCircle className="w-4 h-4 mr-1" /> Cancel Trip
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={!!reviewDialog} onClose={() => setReviewDialog(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {reviewDialog && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Review — {reviewDialog.package}</DialogTitle>
            <DialogContent>
              <div className="space-y-4 mt-2">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">How was your experience?</p>
                  <Rating value={reviewRating} onChange={(_, v) => v && setReviewRating(v)} size="large" sx={{ "& .MuiRating-iconFilled": { color: "hsl(32,95%,52%)" } }} />
                </div>
                <Input placeholder="Tell us about your trip..." value={reviewText} onChange={e => setReviewText(e.target.value)} />
                <p className="text-xs text-muted-foreground">Your review helps other travelers make better decisions.</p>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setReviewDialog(null)}>Cancel</Button>
              <Button className="bg-primary text-primary-foreground" disabled={!reviewText.trim()} onClick={() => { setReviewDialog(null); setSnackbar({ open: true, message: "Thank you for your review! ⭐" }); }}>
                Submit Review
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
