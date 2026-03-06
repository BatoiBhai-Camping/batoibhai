import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { partners } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Mail, ExternalLink, Phone, MapPin, Plus, CheckCircle, XCircle, Eye, Edit } from "lucide-react";
import { Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Tooltip, IconButton, LinearProgress } from "@mui/material";
import { Label } from "@/components/ui/label";

export default function AdminPartners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "warning" });

  const filtered = partners
    .filter(p => statusFilter === "all" || p.status === statusFilter)
    .filter(p => searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.owner.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <PanelLayout panel="admin">
      <PageHeader
        title="Partner Management"
        subtitle="Manage and verify Odisha travel partners"
        actions={
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add Partner
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {["all", "verified", "pending"].map(s => (
            <Chip
              key={s}
              label={s.charAt(0).toUpperCase() + s.slice(1)}
              onClick={() => setStatusFilter(s)}
              size="small"
              sx={{
                bgcolor: statusFilter === s ? "hsl(192, 70%, 28%)" : "hsl(210, 18%, 94%)",
                color: statusFilter === s ? "white" : "hsl(210, 30%, 10%)",
                fontWeight: 600, fontSize: 12, cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(192, 70%, 28%)", width: 44, height: 44, fontSize: 16, fontWeight: 700 }}>
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
              <div className="bg-muted/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="font-semibold font-display text-primary">₹{(p.revenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-muted/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Packages</p>
                <p className="font-semibold font-display">{p.packages}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
              <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {p.email}</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {p.phone}</p>
            </div>

            <div className="flex items-center justify-between text-sm pt-3 border-t">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {p.rating} • Joined {p.joined}
              </div>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="View Details" arrow>
                  <IconButton size="small" onClick={() => setSelectedPartner(p)}><Eye className="w-3.5 h-3.5" /></IconButton>
                </Tooltip>
                {p.status === "pending" && (
                  <Tooltip title="Verify Partner" arrow>
                    <IconButton size="small" sx={{ color: "hsl(152,60%,40%)" }} onClick={() => setSnackbar({ open: true, message: `${p.name} verified successfully!`, severity: "success" })}>
                      <CheckCircle className="w-3.5 h-3.5" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Partner Detail Dialog */}
      <Dialog open={!!selectedPartner} onClose={() => setSelectedPartner(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedPartner && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(192, 70%, 28%)", width: 48, height: 48, fontSize: 18 }}>{selectedPartner.name[0]}</Avatar>
                <div>
                  <p>{selectedPartner.name}</p>
                  <p className="text-sm font-normal text-muted-foreground">{selectedPartner.owner}</p>
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium mt-0.5">{selectedPartner.email}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium mt-0.5">{selectedPartner.phone}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-sm font-semibold text-primary mt-0.5">₹{selectedPartner.revenue.toLocaleString()}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Packages</p><p className="text-sm font-semibold mt-0.5">{selectedPartner.packages}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Rating</p><p className="text-sm font-semibold mt-0.5 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-accent fill-accent" /> {selectedPartner.rating}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Joined</p><p className="text-sm font-medium mt-0.5">{selectedPartner.joined}</p></div>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setSelectedPartner(null)}>Close</Button>
              <Button className="bg-primary text-primary-foreground" onClick={() => { setSelectedPartner(null); setSnackbar({ open: true, message: "Partner profile updated!", severity: "success" }); }}>
                <Edit className="w-4 h-4 mr-1" /> Edit Partner
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Partner Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Add New Partner</DialogTitle>
        <DialogContent>
          <div className="grid gap-4 mt-2">
            <div><Label className="text-sm mb-1.5 block">Company Name</Label><Input placeholder="Enter company name" /></div>
            <div><Label className="text-sm mb-1.5 block">Owner Name</Label><Input placeholder="Enter owner name" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm mb-1.5 block">Email</Label><Input type="email" placeholder="email@company.com" /></div>
              <div><Label className="text-sm mb-1.5 block">Phone</Label><Input placeholder="+91 9XXXXXXXXX" /></div>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button className="bg-primary text-primary-foreground" onClick={() => { setAddDialogOpen(false); setSnackbar({ open: true, message: "Partner added successfully!", severity: "success" }); }}>Add Partner</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
