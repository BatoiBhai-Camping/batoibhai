import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { myTrips } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Star, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@mui/material";

export default function CustomerTrips() {
  const upcoming = myTrips.filter(t => t.status === "upcoming");
  const completed = myTrips.filter(t => t.status === "completed");

  return (
    <PanelLayout panel="customer">
      <PageHeader title="My Trips" subtitle="Your travel history and upcoming adventures" />

      {upcoming.length > 0 && (
        <>
          <h3 className="font-display font-semibold text-lg mb-4">Upcoming Trips</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {upcoming.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border-2 border-primary/20 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display font-semibold">{t.package}</h4>
                  <Chip label="Upcoming" size="small" sx={{ bgcolor: "hsl(210, 80%, 55%)", color: "white", fontWeight: 600, fontSize: 11 }} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{t.partner}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> {t.date}</span>
                  <span className="font-semibold text-primary">৳{t.amount.toLocaleString()}</span>
                </div>
                <div className="mt-3 pt-3 border-t flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                  <Button size="sm" variant="ghost" className="text-xs text-destructive">Cancel</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <h3 className="font-display font-semibold text-lg mb-4">Past Trips</h3>
      <div className="space-y-3">
        {completed.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <h4 className="font-medium">{t.package}</h4>
                <p className="text-xs text-muted-foreground">{t.partner} • {t.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">৳{t.amount.toLocaleString()}</span>
              {t.rating && (
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= t.rating! ? "text-accent fill-accent" : "text-muted-foreground"}`} />
                  ))}
                </div>
              )}
              <StatusBadge status={t.status} />
            </div>
          </motion.div>
        ))}
      </div>
    </PanelLayout>
  );
}