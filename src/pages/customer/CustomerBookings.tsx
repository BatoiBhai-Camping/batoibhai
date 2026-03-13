import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader, DataTablePagination } from "@/components/StatCard";
import { bookings } from "@/data/dummyData";
import { usePublicData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Download, MessageSquare, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Avatar, Tooltip, IconButton } from "@mui/material";

export default function CustomerBookings() {
  usePublicData();
  const myBookings = bookings.filter(b => b.customer === "Rajesh Mohanty" || b.customer === "Bikash Das");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const filtered = myBookings.filter(b => searchTerm === "" || b.package.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const perPage = 5;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <PanelLayout panel="customer">
      <PageHeader
        title="My Bookings"
        subtitle="View your booking history and receipts"
        actions={<Chip label={`${myBookings.length} total`} size="small" sx={{ bgcolor: "hsl(192,70%,28%)", color: "white", fontWeight: 600 }} />}
      />

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search bookings..." className="pl-10" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Package</th>
                <th>Partner</th>
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
                  <td className="font-mono text-xs font-medium">{b.id}</td>
                  <td className="font-medium text-sm">{b.package}</td>
                  <td className="text-sm text-muted-foreground">{b.partner}</td>
                  <td className="text-muted-foreground text-sm">{b.date}</td>
                  <td>{b.travelers}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="flex gap-0.5">
                      <Tooltip title="View Details" arrow><IconButton size="small" onClick={() => setSelectedBooking(b)}><Eye className="w-3.5 h-3.5" /></IconButton></Tooltip>
                      <Tooltip title="Download Receipt" arrow><IconButton size="small" onClick={() => setSnackbar({ open: true, message: "Receipt downloaded!" })}><Download className="w-3.5 h-3.5" /></IconButton></Tooltip>
                      <Tooltip title="Contact Partner" arrow><IconButton size="small"><MessageSquare className="w-3.5 h-3.5" /></IconButton></Tooltip>
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
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Package</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.package}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Partner</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.partner}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Travel Date</p><p className="font-semibold text-sm mt-0.5">{selectedBooking.date}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Amount</p><p className="font-semibold text-sm mt-0.5 text-primary">₹{selectedBooking.amount.toLocaleString()}</p></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <StatusBadge status={selectedBooking.status} />
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setSelectedBooking(null)}>Close</Button>
              <Button className="bg-primary text-primary-foreground" onClick={() => { setSelectedBooking(null); setSnackbar({ open: true, message: "Receipt downloaded!" }); }}>
                <FileText className="w-4 h-4 mr-1" /> Download Receipt
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
