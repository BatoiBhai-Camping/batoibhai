import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { bookings } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Download, MessageSquare } from "lucide-react";

export default function CustomerBookings() {
  const myBookings = bookings.filter(b => b.customer === "Rajesh Mohanty" || b.customer === "Bikash Das");

  return (
    <PanelLayout panel="customer">
      <PageHeader title="My Bookings" subtitle="View your booking history and receipts" />

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
              {myBookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-sm">{b.id}</td>
                  <td className="font-medium">{b.package}</td>
                  <td>{b.partner}</td>
                  <td className="text-muted-foreground">{b.date}</td>
                  <td>{b.travelers}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PanelLayout>
  );
}
