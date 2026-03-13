import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader, DataTablePagination } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chip, Snackbar, Alert, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from "@mui/material";

export default function PartnerBookings() {
  const { bookings } = usePartnerData();
  const partnerBookings = bookings.filter(b => b.partner === "OdishaTourism Pro");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "warning" });

  const filtered = partnerBookings
    .filter(b => filter === "All" || b.status === filter)
    .filter(b => searchTerm === "" || b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const perPage = 5;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleAction = (id: string, action: "confirm" | "reject") => {
    setSnackbar({
      open: true,
      message: action === "confirm" ? `Booking ${id} confirmed! Customer will be notified.` : `Booking ${id} rejected.`,
      severity: action === "confirm" ? "success" : "warning"
    });
  };

  return (
    <PanelLayout panel="partner">
      <PageHeader
        title="My Bookings"
        subtitle="Track and manage incoming bookings for your packages"
        actions={<Chip label={`${partnerBookings.filter(b => b.status === "pending").length} pending`} size="small" sx={{ bgcolor: "hsl(38,92%,50%,0.1)", color: "hsl(38,92%,40%)", fontWeight: 700 }} />}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-10" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
        </div>
        <div className="flex gap-1.5">
          {["All", "confirmed", "pending", "cancelled"].map(s => (
            <Chip key={s} label={s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)} onClick={() => { setFilter(s); setPage(1); }} size="small"
              sx={{ bgcolor: filter === s ? "hsl(192,70%,28%)" : "hsl(210,18%,94%)", color: filter === s ? "white" : "hsl(210,30%,10%)", fontWeight: 600, fontSize: 12, cursor: "pointer" }} />
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Date</th>
                <th>Travelers</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-xs">{b.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: "hsl(32,95%,52%)" }}>{b.customer[0]}</Avatar>
                      <span className="font-medium text-sm">{b.customer}</span>
                    </div>
                  </td>
                  <td className="text-sm">{b.package}</td>
                  <td className="text-muted-foreground text-sm">{b.date}</td>
                  <td>{b.travelers}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="flex gap-0.5">
                      <Tooltip title="View" arrow><IconButton size="small" onClick={() => setSelectedBooking(b)}><Eye className="w-3.5 h-3.5" /></IconButton></Tooltip>
                      {b.status === "pending" && (
                        <>
                          <Tooltip title="Confirm" arrow><IconButton size="small" sx={{ color: "hsl(152,60%,40%)" }} onClick={() => handleAction(b.id, "confirm")}><CheckCircle className="w-3.5 h-3.5" /></IconButton></Tooltip>
                          <Tooltip title="Reject" arrow><IconButton size="small" sx={{ color: "hsl(0,72%,51%)" }} onClick={() => handleAction(b.id, "reject")}><XCircle className="w-3.5 h-3.5" /></IconButton></Tooltip>
                        </>
                      )}
                      <Tooltip title="Message Customer" arrow><IconButton size="small"><MessageSquare className="w-3.5 h-3.5" /></IconButton></Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DataTablePagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} />
      </motion.div>

      {/* Booking Detail */}
      <Dialog open={!!selectedBooking} onClose={() => setSelectedBooking(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedBooking && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Booking {selectedBooking.id}</DialogTitle>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Customer</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.customer}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Package</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.package}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Date</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.date}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Amount</p><p className="font-semibold text-sm mt-0.5 text-primary">₹{selectedBooking.amount.toLocaleString()}</p></div>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setSelectedBooking(null)}>Close</Button>
              {selectedBooking.status === "pending" && (
                <Button className="bg-success text-success-foreground" onClick={() => { setSelectedBooking(null); handleAction(selectedBooking.id, "confirm"); }}>
                  <CheckCircle className="w-4 h-4 mr-1" /> Confirm Booking
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
