import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { bookings } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Eye } from "lucide-react";
import { useState } from "react";
import { Chip } from "@mui/material";

const statusFilters = ["All", "confirmed", "pending", "cancelled"];

export default function AdminBookings() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <PanelLayout panel="admin">
      <PageHeader title="Booking Management" subtitle="View and manage all platform bookings" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by ID, customer, or package..." className="pl-10" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5 flex-wrap">
            {statusFilters.map(s => (
              <Chip
                key={s}
                label={s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                onClick={() => setFilter(s)}
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
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
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
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-sm">{b.id}</td>
                  <td className="font-medium">{b.customer}</td>
                  <td>{b.package}</td>
                  <td>{b.partner}</td>
                  <td className="text-muted-foreground">{b.date}</td>
                  <td className="font-semibold">৳{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filtered.length} of {bookings.length} bookings</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </motion.div>
    </PanelLayout>
  );
}