import { useState, useCallback } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Users, Clock, Eye, Package, Search } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Tooltip, IconButton, Chip } from "@mui/material";
import { agentApi } from "@/lib/api";
import { useApi } from "@/hooks/useApi";

export default function PartnerPackages() {
  const { packages } = usePartnerData();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [editPkg, setEditPkg] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "warning" | "info" });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch agent packages from API
  const fetchPackages = useCallback(() => agentApi.getAllPackages(), []);
  const { data: apiPackages, refetch } = useApi(fetchPackages, null);

  // Map API packages to UI format, fallback to dummy
  const packageList = apiPackages
    ? (apiPackages as any[]).map((p: any) => ({
        id: p.id,
        name: p.title || "Untitled Package",
        duration: `${p.durationDays || 0} Days`,
        price: p.pricePerPerson || 0,
        maxPeople: p.totalSeats || 0,
        includes: p.tags || [],
        partner: "",
        status: (p.packageApprovedStatus || "PENDING").toLowerCase() === "approved" ? "active" : "pending",
      }))
    : packages;

  const filtered = packageList.filter(p => searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <PanelLayout panel="partner">
      <PageHeader
        title="My Packages"
        subtitle="Create and manage your Odisha travel packages"
        actions={
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Create Package
          </Button>
        }
      />

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search packages..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                    <span className="mx-0.5">•</span>
                    <Users className="w-3.5 h-3.5" /> Max {pkg.maxPeople}
                  </p>
                </div>
              </div>
              <StatusBadge status={pkg.status} />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {pkg.includes.map((inc) => (
                <Chip key={inc} label={inc} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 10, height: 22 }} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-primary font-bold text-xl font-display">₹{pkg.price.toLocaleString()}</span>
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip title="Preview" arrow><IconButton size="small"><Eye className="w-4 h-4" /></IconButton></Tooltip>
                <Tooltip title="Edit" arrow><IconButton size="small" onClick={() => setEditPkg(pkg)}><Edit className="w-4 h-4" /></IconButton></Tooltip>
                <Tooltip title="Delete" arrow><IconButton size="small" sx={{ color: "hsl(0,72%,51%)" }} onClick={() => setDeleteConfirm(pkg.id)}><Trash2 className="w-4 h-4" /></IconButton></Tooltip>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Package Dialog */}
      <Dialog open={addDialogOpen || !!editPkg} onClose={() => { setAddDialogOpen(false); setEditPkg(null); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          {editPkg ? `Edit — ${editPkg.name}` : "Create New Package"}
        </DialogTitle>
        <DialogContent>
          <div className="grid gap-4 mt-2">
            <div><Label className="text-sm mb-1.5 block">Package Name</Label><Input placeholder="e.g. Puri Beach Getaway" defaultValue={editPkg?.name} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm mb-1.5 block">Duration</Label><Input placeholder="3 Days / 2 Nights" defaultValue={editPkg?.duration} /></div>
              <div><Label className="text-sm mb-1.5 block">Price (₹)</Label><Input type="number" placeholder="8500" defaultValue={editPkg?.price} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-sm mb-1.5 block">Max People</Label><Input type="number" placeholder="4" defaultValue={editPkg?.maxPeople} /></div>
              <div>
                <Label className="text-sm mb-1.5 block">Status</Label>
                <select className="w-full h-10 rounded-md border bg-background px-3 text-sm" defaultValue={editPkg?.status || "active"}>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div><Label className="text-sm mb-1.5 block">Includes (comma separated)</Label><Input placeholder="Hotel, Transport, Meals, Guide" defaultValue={editPkg?.includes.join(", ")} /></div>
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outline" onClick={() => { setAddDialogOpen(false); setEditPkg(null); }}>Cancel</Button>
          <Button className="bg-primary text-primary-foreground" onClick={() => { setAddDialogOpen(false); setEditPkg(null); setSnackbar({ open: true, message: editPkg ? "Package updated!" : "Package created successfully!", severity: "success" }); }}>
            {editPkg ? "Update Package" : "Create Package"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Delete Package?</DialogTitle>
        <DialogContent>
          <p className="text-sm text-muted-foreground">This action cannot be undone. All bookings associated with this package will need to be reassigned.</p>
        </DialogContent>
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
