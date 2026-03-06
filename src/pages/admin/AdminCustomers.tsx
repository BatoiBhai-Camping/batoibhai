import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { PageHeader, DataTablePagination } from "@/components/StatCard";
import { customers } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, Mail, MapPin, Phone, User, Wallet, TrendingUp } from "lucide-react";
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Chip, Tooltip, IconButton } from "@mui/material";

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [sortBy, setSortBy] = useState<"trips" | "spent">("spent");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = customers
    .filter(c => searchTerm === "" || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.city.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortDir === "desc" ? (b[sortBy] as number) - (a[sortBy] as number) : (a[sortBy] as number) - (b[sortBy] as number));

  const perPage = 6;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleExport = () => {
    const csv = ["Name,Email,Phone,City,Trips,Spent,Joined", ...filtered.map(c => `${c.name},${c.email},${c.phone},${c.city},${c.trips},${c.spent},${c.joined}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "customers-export.csv"; a.click();
    setSnackbar({ open: true, message: "Customer data exported!" });
  };

  const handleSort = (col: "trips" | "spent") => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const totalSpent = customers.reduce((a, c) => a + c.spent, 0);
  const totalTrips = customers.reduce((a, c) => a + c.trips, 0);

  return (
    <PanelLayout panel="admin">
      <PageHeader title="Customer Management" subtitle="View and manage platform customers across Odisha" />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Customers</p>
          <p className="text-2xl font-bold font-display mt-1">{customers.length}</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold font-display mt-1 text-primary">₹{(totalSpent / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Trips</p>
          <p className="text-2xl font-bold font-display mt-1">{totalTrips}</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Avg. Spend/Customer</p>
          <p className="text-2xl font-bold font-display mt-1">₹{(totalSpent / customers.length / 1000).toFixed(1)}K</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, city..." className="pl-10" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th className="cursor-pointer select-none" onClick={() => handleSort("trips")}>Trips {sortBy === "trips" && (sortDir === "desc" ? "↓" : "↑")}</th>
                <th className="cursor-pointer select-none" onClick={() => handleSort("spent")}>Total Spent {sortBy === "spent" && (sortDir === "desc" ? "↓" : "↑")}</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: "hsl(32, 95%, 52%)", width: 32, height: 32, fontSize: 13, fontWeight: 700 }}>{c.name[0]}</Avatar>
                      <span className="font-medium text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground text-sm">{c.email}</td>
                  <td className="text-muted-foreground text-xs">{c.phone}</td>
                  <td><Chip label={c.city} size="small" sx={{ bgcolor: "hsl(210,80%,55%,0.1)", color: "hsl(210,80%,45%)", fontWeight: 600, fontSize: 11 }} /></td>
                  <td className="font-semibold">{c.trips}</td>
                  <td className="font-semibold text-primary">₹{c.spent.toLocaleString()}</td>
                  <td className="text-muted-foreground text-sm">{c.joined}</td>
                  <td>
                    <div className="flex gap-0.5">
                      <Tooltip title="View Profile" arrow>
                        <IconButton size="small" onClick={() => setSelectedCustomer(c)}><Eye className="w-3.5 h-3.5" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Send Email" arrow>
                        <IconButton size="small"><Mail className="w-3.5 h-3.5" /></IconButton>
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

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedCustomer && (
          <>
            <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "hsl(32, 95%, 52%)", width: 48, height: 48, fontSize: 18 }}>{selectedCustomer.name[0]}</Avatar>
                <div>
                  <p>{selectedCustomer.name}</p>
                  <p className="text-sm font-normal text-muted-foreground">{selectedCustomer.city}, Odisha</p>
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p><p className="text-sm font-medium mt-0.5">{selectedCustomer.email}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</p><p className="text-sm font-medium mt-0.5">{selectedCustomer.phone}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Total Trips</p><p className="text-lg font-bold mt-0.5">{selectedCustomer.trips}</p></div>
                <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">Total Spent</p><p className="text-lg font-bold mt-0.5 text-primary">₹{selectedCustomer.spent.toLocaleString()}</p></div>
              </div>
              <div className="mt-4 bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                <p className="text-sm font-medium">{selectedCustomer.joined}</p>
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button variant="outline" onClick={() => setSelectedCustomer(null)}>Close</Button>
              <Button className="bg-primary text-primary-foreground" onClick={() => { setSelectedCustomer(null); setSnackbar({ open: true, message: "Email sent to " + selectedCustomer.name }); }}>
                <Mail className="w-4 h-4 mr-1" /> Send Email
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
