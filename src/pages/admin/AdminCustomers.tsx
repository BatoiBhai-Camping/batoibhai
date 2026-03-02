import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { customers } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, Mail } from "lucide-react";
import { Avatar } from "@mui/material";

export default function AdminCustomers() {
  return (
    <PanelLayout panel="admin">
      <PageHeader title="Customer Management" subtitle="View and manage platform customers" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Total Trips</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ bgcolor: "hsl(32, 95%, 52%)", width: 32, height: 32, fontSize: 13 }}>{c.name[0]}</Avatar>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{c.email}</td>
                  <td className="font-semibold">{c.trips}</td>
                  <td className="font-semibold">৳{c.spent.toLocaleString()}</td>
                  <td className="text-muted-foreground">{c.joined}</td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Mail className="w-4 h-4" /></Button>
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