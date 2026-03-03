import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { partners } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Mail, ExternalLink, Phone, MapPin } from "lucide-react";
import { Avatar } from "@mui/material";

export default function AdminPartners() {
  return (
    <PanelLayout panel="admin">
      <PageHeader title="Partner Management" subtitle="Manage and verify Odisha travel partners" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-10" />
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">+ Add Partner</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(192, 70%, 28%)", width: 40, height: 40, fontSize: 16 }}>
                  {p.name[0]}
                </Avatar>
                <div>
                  <h3 className="font-display font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.owner}</p>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="font-semibold font-display">₹{(p.revenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Packages</p>
                <p className="font-semibold font-display">{p.packages}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground mb-3">
              <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {p.email}</p>
              <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {p.phone}</p>
            </div>

            <div className="flex items-center justify-between text-sm pt-3 border-t">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {p.rating} • Joined {p.joined}
              </div>
              <Button variant="ghost" size="sm"><ExternalLink className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelLayout>
  );
}
