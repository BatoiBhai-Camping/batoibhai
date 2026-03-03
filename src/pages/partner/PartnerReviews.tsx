import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { reviews } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar } from "@mui/material";
import { Button } from "@/components/ui/button";

export default function PartnerReviews() {
  const partnerReviews = reviews.filter(r => r.partner === "OdishaTourism Pro");
  const avgRating = partnerReviews.length ? (partnerReviews.reduce((a, r) => a + r.rating, 0) / partnerReviews.length).toFixed(1) : "0";

  return (
    <PanelLayout panel="partner">
      <PageHeader title="Customer Reviews" subtitle="See what travelers say about your Odisha packages" />

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display text-primary">{avgRating}</p>
          <div className="flex items-center justify-center gap-0.5 my-2">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "text-accent fill-accent" : "text-muted-foreground"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display">{partnerReviews.length}</p>
          <p className="text-sm text-muted-foreground mt-2">Total Reviews</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display text-success">{partnerReviews.filter(r => r.rating >= 4).length}</p>
          <p className="text-sm text-muted-foreground mt-2">Positive (4+)</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center">
          <p className="text-4xl font-bold font-display text-accent">{partnerReviews.filter(r => r.rating === 5).length}</p>
          <p className="text-sm text-muted-foreground mt-2">5-Star Reviews</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(192, 70%, 28%)", width: 36, height: 36, fontSize: 14 }}>{r.customer[0]}</Avatar>
                <div>
                  <p className="font-medium">{r.customer}</p>
                  <p className="text-xs text-muted-foreground">{r.package} • {r.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground"><ThumbsUp className="w-3.5 h-3.5 mr-1" /> Helpful</Button>
              <Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4 mr-1" /> Reply</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelLayout>
  );
}
