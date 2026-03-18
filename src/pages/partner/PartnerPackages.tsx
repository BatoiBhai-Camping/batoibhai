import { useState, useRef } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Users, Clock, Eye, Package, Search, Loader2 } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Tooltip, IconButton, Chip, LinearProgress } from "@mui/material";
import { agentApi } from "@/lib/api";

export default function PartnerPackages() {
  const { packages, isLoading, refetchPackages } = usePartnerData();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  const [editPkg, setEditPkg] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "warning" | "info" | "error" });
  const [searchTerm, setSearchTerm] = useState("");
  const [publishing, setPublishing] = useState(false);

  // Form refs
  const formRef = useRef<HTMLFormElement>(null);

  const filtered = packages.filter(p => searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handlePublishPackage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPublishing(true);

    try {
      const result = await agentApi.publishPackage({
        title: form.get("title") as string,
        description: form.get("description") as string || "",
        pricePerPerson: Number(form.get("price")),
        totalSeats: Number(form.get("maxPeople")),
        destination: form.get("destination") as string || "Odisha",
        durationDays: Number(form.get("durationDays")),
        bookingActiveFrom: form.get("bookingActiveFrom") as string || new Date().toISOString(),
        bookingEndAt: form.get("bookingEndAt") as string || new Date(Date.now() + 90 * 86400000).toISOString(),
        bannerImageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
        bannerImageFileId: "placeholder",
        itineraryDays: [{
          dayNumber: 1,
          title: "Day 1 - Arrival",
          transports: [{ fromLocation: "Bhubaneswar", toLocation: form.get("destination") as string || "Puri", mode: "BUS" }],
          visits: [{ name: form.get("destination") as string || "Destination" }],
        }],
      });

      if (result.success) {
        setSnackbar({ open: true, message: "Package published successfully! Awaiting admin approval.", severity: "success" });
        setAddDialogOpen(false);
        refetchPackages();
      } else {
        setSnackbar({ open: true, message: result.message || "Failed to publish", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Network error", severity: "error" });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <PanelLayout panel="partner">
      <PageHeader title="My Packages" subtitle="Create and manage your Odisha travel packages"
        actions={<Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setAddDialogOpen(true)}><Plus className="w-4 h-4 mr-1" /> Create Package</Button>} />

      {isLoading && <LinearProgress sx={{ mb: 2, borderRadius: 1, "& .MuiLinearProgress-bar": { bgcolor: "hsl(192, 70%, 28%)" } }} />}

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search packages..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((pkg, i) => (
          <motion.div key={pkg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><Package className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-display font-semibold text-base">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> {pkg.duration} <span className="mx-0.5">•</span> <Users className="w-3.5 h-3.5" /> Max {pkg.maxPeople}
                  </p>
                </div>
              </div>
              <StatusBadge status={pkg.status} />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {pkg.includes.map((inc: string) => (
                <Chip key={inc} label={inc} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 10, height: 22 }} />
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-primary font-bold text-xl font-display">₹{pkg.price.toLocaleString()}</span>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="Preview" arrow><IconButton size="small"><Eye className="w-4 h-4" /></IconButton></Tooltip>
                <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => setEditPkg(pkg)}><Edit className="w-4 h-4" /></IconButton></Tooltip>
                <Tooltip title="Delete" arrow><IconButton size="small" sx={{ color: "hsl(0,72%,51%)" }} onClick={() => setDeleteConfirm(pkg)}><Trash2 className="w-4 h-4" /></IconButton></Tooltip>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Package Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <form onSubmit={handlePublishPackage}>
          <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Create New Package</DialogTitle>
          <DialogContent>
            <div className="grid gap-4 mt-2">
              <div><Label className="text-sm mb-1.5 block">Package Title *</Label><Input name="title" placeholder="e.g. Puri Beach Getaway" required /></div>
              <div><Label className="text-sm mb-1.5 block">Description</Label><Input name="description" placeholder="Describe your package..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Duration (days) *</Label><Input name="durationDays" type="number" placeholder="3" required /></div>
                <div><Label className="text-sm mb-1.5 block">Price per Person (₹) *</Label><Input name="price" type="number" placeholder="8500" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Total Seats *</Label><Input name="maxPeople" type="number" placeholder="20" required /></div>
                <div><Label className="text-sm mb-1.5 block">Destination *</Label><Input name="destination" placeholder="Puri" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm mb-1.5 block">Booking Active From</Label><Input name="bookingActiveFrom" type="date" /></div>
                <div><Label className="text-sm mb-1.5 block">Booking End At</Label><Input name="bookingEndAt" type="date" /></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground" disabled={publishing}>
              {publishing ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Publishing...</> : "Publish Package"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Package Dialog */}
      <Dialog open={!!editPkg} onClose={() => setEditPkg(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {editPkg && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Edit — {editPkg.name}</DialogTitle>
            <DialogContent>
              <div className="grid gap-4 mt-2">
                <div><Label className="text-sm mb-1.5 block">Package Name</Label><Input defaultValue={editPkg.name} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-sm mb-1.5 block">Duration</Label><Input defaultValue={editPkg.duration} /></div>
                  <div><Label className="text-sm mb-1.5 block">Price (₹)</Label><Input type="number" defaultValue={editPkg.price} /></div>
                </div>
                <div><Label className="text-sm mb-1.5 block">Max People</Label><Input type="number" defaultValue={editPkg.maxPeople} /></div>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setEditPkg(null)}>Cancel</Button>
              <Button className="bg-primary text-primary-foreground" onClick={() => { setEditPkg(null); setSnackbar({ open: true, message: "Package updated!", severity: "success" }); }}>Update</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Delete Package?</DialogTitle>
        <DialogContent><p className="text-sm text-muted-foreground">This action cannot be undone.</p></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button className="bg-destructive text-destructive-foreground" onClick={() => { setDeleteConfirm(null); setSnackbar({ open: true, message: "Package deleted.", severity: "warning" }); }}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
