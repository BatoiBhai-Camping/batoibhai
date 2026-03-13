import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader, DataTablePagination } from "@/components/StatCard";
import { useAdminData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, MoreHorizontal, Filter, CheckCircle, XCircle, FileText } from "lucide-react";
import { Chip, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Snackbar, Alert } from "@mui/material";
import { format } from "date-fns";

const statusFilters = ["All", "confirmed", "pending", "cancelled"];

export default function AdminBookings() {
  const { bookings } = useAdminData();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "info" | "warning" }>({ open: false, message: "", severity: "info" });
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = bookings
    .filter(b => filter === "All" || b.status === filter)
    .filter(b => searchTerm === "" || b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.package.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "amount") return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
      return sortDir === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });

  const perPage = 5;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleExport = () => {
    const csv = ["ID,Customer,Package,Partner,Date,Amount,Status", ...filtered.map(b => `${b.id},${b.customer},${b.package},${b.partner},${b.date},${b.amount},${b.status}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "bookings-export.csv"; a.click();
    setSnackbar({ open: true, message: "Bookings exported successfully!", severity: "success" });
  };

  const handleSort = (col: "date" | "amount") => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  return (
    <PanelLayout panel="admin">
      <PageHeader
        title="Booking Management"
        subtitle="View and manage all platform bookings"
        actions={<Chip label={`${filtered.length} bookings`} size="small" sx={{ bgcolor: "hsl(192,70%,28%)", color: "white", fontWeight: 600 }} />}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by ID, customer, package..." className="pl-10" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex gap-1.5">
            {statusFilters.map(s => (
              <Chip
                key={s}
                label={s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                onClick={() => { setFilter(s); setPage(1); }}
                size="small"
                sx={{
                  bgcolor: filter === s ? "hsl(192, 70%, 28%)" : "hsl(210, 18%, 94%)",
                  color: filter === s ? "white" : "hsl(210, 30%, 10%)",
                  fontWeight: 600, fontSize: 12, cursor: "pointer",
                  "&:hover": { opacity: 0.85 },
                }}
              />
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Partner</th>
                <th className="cursor-pointer select-none" onClick={() => handleSort("date")}>
                  Date {sortBy === "date" && (sortDir === "desc" ? "↓" : "↑")}
                </th>
                <th>Travelers</th>
                <th className="cursor-pointer select-none" onClick={() => handleSort("amount")}>
                  Amount {sortBy === "amount" && (sortDir === "desc" ? "↓" : "↑")}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-xs font-medium">{b.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: "hsl(192,70%,28%)" }}>{b.customer[0]}</Avatar>
                      <span className="font-medium text-sm">{b.customer}</span>
                    </div>
                  </td>
                  <td className="text-sm max-w-[180px] truncate">{b.package}</td>
                  <td className="text-sm text-muted-foreground">{b.partner}</td>
                  <td className="text-muted-foreground text-sm">{b.date}</td>
                  <td className="text-sm">{b.travelers}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="flex gap-0.5">
                      <Tooltip title="View Details" arrow>
                        <IconButton size="small" onClick={() => setSelectedBooking(b)}><Eye className="w-3.5 h-3.5" /></IconButton>
                      </Tooltip>
                      {b.status === "pending" && (
                        <>
                          <Tooltip title="Confirm" arrow>
                            <IconButton size="small" sx={{ color: "hsl(152,60%,40%)" }} onClick={() => setSnackbar({ open: true, message: `Booking ${b.id} confirmed!`, severity: "success" })}>
                              <CheckCircle className="w-3.5 h-3.5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel" arrow>
                            <IconButton size="small" sx={{ color: "hsl(0,72%,51%)" }} onClick={() => setSnackbar({ open: true, message: `Booking ${b.id} cancelled.`, severity: "warning" })}>
                              <XCircle className="w-3.5 h-3.5" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="Generate Invoice" arrow>
                        <IconButton size="small"><FileText className="w-3.5 h-3.5" /></IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DataTablePagination total={filtered.length} page={page} perPage={perPage} onPageChange={setPage} />
      </motion.div>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onClose={() => setSelectedBooking(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedBooking && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700, pb: 0 }}>
              Booking Details — {selectedBooking.id}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="font-semibold text-sm mt-0.5">{selectedBooking.customer}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Partner</p>
                    <p className="font-semibold text-sm mt-0.5">{selectedBooking.partner}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Package</p>
                    <p className="font-semibold text-sm mt-0.5">{selectedBooking.package}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Travel Date</p>
                    <p className="font-semibold text-sm mt-0.5">{selectedBooking.date}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Travelers</p>
                    <p className="font-semibold text-sm mt-0.5">{selectedBooking.travelers} persons</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-semibold text-sm mt-0.5 text-primary">₹{selectedBooking.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <StatusBadge status={selectedBooking.status} />
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setSelectedBooking(null)}>Close</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { setSelectedBooking(null); setSnackbar({ open: true, message: "Invoice generated!", severity: "success" }); }}>
                <FileText className="w-4 h-4 mr-1" /> Generate Invoice
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2, fontFamily: "var(--font-body)" }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
