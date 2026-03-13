import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Send, TrendingUp } from "lucide-react";
import { Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, LinearProgress, Tooltip, IconButton } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PartnerReviews() {
  const { reviews } = usePartnerData();
  const partnerReviews = reviews.filter(r => r.partner === "OdishaTourism Pro");
  const avgRating = partnerReviews.length ? (partnerReviews.reduce((a, r) => a + r.rating, 0) / partnerReviews.length).toFixed(1) : "0";
  const [replyDialog, setReplyDialog] = useState<typeof reviews[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: reviews.filter(rv => rv.rating === r).length,
    pct: Math.round(reviews.filter(rv => rv.rating === r).length / reviews.length * 100),
  }));

  const handleLike = (id: number) => {
    setLikedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  return (
    <PanelLayout panel="partner">
      <PageHeader title="Customer Reviews" subtitle="See what travelers say about your Odisha packages" />

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display text-primary">{avgRating}</p>
          <div className="flex items-center justify-center gap-0.5 my-2">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display">{reviews.length}</p>
          <p className="text-sm text-muted-foreground mt-2">Total Reviews</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display text-success">{reviews.filter(r => r.rating >= 4).length}</p>
          <p className="text-sm text-muted-foreground mt-2">Positive (4+★)</p>
        </div>
        <div className="bg-card border rounded-xl p-6">
          <p className="text-sm font-medium mb-3">Rating Distribution</p>
          {ratingDist.map(r => (
            <div key={r.stars} className="flex items-center gap-2 mb-1.5">
              <span className="text-xs w-4 text-right">{r.stars}★</span>
              <LinearProgress variant="determinate" value={r.pct} sx={{ flex: 1, height: 6, borderRadius: 3, bgcolor: "hsl(210,18%,94%)", "& .MuiLinearProgress-bar": { bgcolor: r.stars >= 4 ? "hsl(32,95%,52%)" : r.stars >= 3 ? "hsl(38,92%,50%)" : "hsl(0,72%,51%)", borderRadius: 3 } }} />
              <span className="text-xs text-muted-foreground w-8">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(192, 70%, 28%)", width: 40, height: 40, fontSize: 15, fontWeight: 700 }}>{r.customer[0]}</Avatar>
                <div>
                  <p className="font-medium text-sm">{r.customer}</p>
                  <p className="text-xs text-muted-foreground">{r.package} • {r.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              <button
                onClick={() => handleLike(r.id)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${likedIds.has(r.id) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${likedIds.has(r.id) ? "fill-primary" : ""}`} /> {likedIds.has(r.id) ? "Liked" : "Helpful"}
              </button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setReplyDialog(r); setReplyText(""); }}>
                <MessageSquare className="w-3.5 h-3.5 mr-1" /> Reply
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!replyDialog} onClose={() => setReplyDialog(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {replyDialog && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Reply to {replyDialog.customer}</DialogTitle>
            <DialogContent>
              <div className="bg-muted/50 rounded-lg p-3 mb-4 mt-2">
                <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= replyDialog.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />)}</div>
                <p className="text-sm text-muted-foreground italic">"{replyDialog.comment}"</p>
              </div>
              <Input
                placeholder="Write your reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">Your reply will be visible to the customer and other travelers.</p>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setReplyDialog(null)}>Cancel</Button>
              <Button className="bg-primary text-primary-foreground" disabled={!replyText.trim()} onClick={() => { setReplyDialog(null); setSnackbar({ open: true, message: "Reply sent to " + replyDialog.customer }); }}>
                <Send className="w-4 h-4 mr-1" /> Send Reply
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
