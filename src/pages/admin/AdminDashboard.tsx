import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { adminStats, bookings, partners, revenueData } from "@/data/dummyData";
import { BarChart3, Users, Package, DollarSign, TrendingUp, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  return (
    <PanelLayout panel="admin">
      <PageHeader title="Admin Dashboard" subtitle="Platform overview and analytics" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`৳${(adminStats.totalRevenue / 1000).toFixed(0)}K`} change={`${adminStats.growthRate}% vs last month`} icon={<DollarSign className="w-5 h-5" />} trend="up" />
        <StatCard title="Total Bookings" value={adminStats.totalBookings.toLocaleString()} change="12% increase" icon={<Package className="w-5 h-5" />} trend="up" />
        <StatCard title="Partners" value={adminStats.totalPartners} change="5 new this month" icon={<Building2 className="w-5 h-5" />} trend="up" />
        <StatCard title="Customers" value={adminStats.totalCustomers.toLocaleString()} change="18% growth" icon={<Users className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(192, 70%, 28%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Partners */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Top Partners</h3>
          <div className="space-y-4">
            {partners.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.packages} packages</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-display font-semibold">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Partner</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-sm">{b.id}</td>
                  <td>{b.customer}</td>
                  <td>{b.package}</td>
                  <td>{b.partner}</td>
                  <td className="font-semibold">৳{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PanelLayout>
  );
}
