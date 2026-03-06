import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { adminStats, bookings, partners, revenueData, notifications } from "@/data/dummyData";
import { BarChart3, Users, Package, DollarSign, TrendingUp, Building2, Bell, AlertCircle, Download, RefreshCcw, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Avatar, Chip, Tooltip, IconButton, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { label: "Add Partner", icon: Building2, href: "/admin/partners" },
  { label: "View Bookings", icon: Package, href: "/admin/bookings" },
  { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <PanelLayout panel="admin">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform overview & analytics — Odisha Travel Network"
        actions={
          <div className="flex gap-2">
            <Tooltip title="Refresh Data" arrow>
              <IconButton size="small" onClick={handleRefresh} sx={{ border: "1px solid hsl(210,18%,90%)", borderRadius: 2 }}>
                <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              </IconButton>
            </Tooltip>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" /> Export Report
            </Button>
          </div>
        }
      />

      {refreshing && <LinearProgress sx={{ mb: 2, borderRadius: 1, "& .MuiLinearProgress-bar": { bgcolor: "hsl(192, 70%, 28%)" } }} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`} change={`${adminStats.growthRate}% vs last month`} icon={<DollarSign className="w-5 h-5" />} trend="up" tooltip="Total platform revenue including all partners" />
        <StatCard title="Total Bookings" value={adminStats.totalBookings.toLocaleString()} change="12% increase" icon={<Package className="w-5 h-5" />} trend="up" tooltip="All confirmed and pending bookings" />
        <StatCard title="Partners" value={adminStats.totalPartners} change="8 new this month" icon={<Building2 className="w-5 h-5" />} trend="up" />
        <StatCard title="Customers" value={`${(adminStats.totalCustomers / 1000).toFixed(1)}K`} change="18% growth" icon={<Users className="w-5 h-5" />} trend="up" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {quickActions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(a.href)}
            className="bg-card border rounded-xl p-4 flex items-center gap-3 hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <a.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">{a.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Revenue Overview (₹)</h3>
            <Chip label="Last 6 months" size="small" sx={{ bgcolor: "hsl(210, 18%, 94%)", fontWeight: 600, fontSize: 11 }} />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "var(--font-body)" }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
              <ReTooltip
                formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: 12, border: "1px solid hsl(210,18%,90%)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "var(--font-body)" }}
              />
              <Bar dataKey="revenue" fill="hsl(192, 70%, 28%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Top Partners</h3>
              <Button variant="link" size="sm" className="text-primary text-xs p-0 h-auto" onClick={() => navigate("/admin/partners")}>View All</Button>
            </div>
            <div className="space-y-3">
              {partners.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: `hsl(${192 + i * 30}, 60%, 35%)`, fontSize: 12, fontWeight: 700 }}>{p.name[0]}</Avatar>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.packages} pkgs • ₹{(p.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Recent Activity</h3>
            <div className="space-y-2">
              {notifications.slice(0, 3).map(n => (
                <div key={n.id} className={`text-xs p-2.5 rounded-lg transition-colors ${n.read ? "bg-muted/50" : "bg-accent/5 border border-accent/20"}`}>
                  <p className={n.read ? "text-muted-foreground" : "font-medium"}>{n.message}</p>
                  <p className="text-muted-foreground mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border rounded-xl overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold">Recent Bookings</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Showing latest 6 bookings across the platform</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/admin/bookings")}>View All</Button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 6).map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-xs">{b.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: "hsl(192,70%,28%)" }}>{b.customer[0]}</Avatar>
                      <span className="text-sm">{b.customer}</span>
                    </div>
                  </td>
                  <td className="text-sm">{b.package}</td>
                  <td className="text-sm text-muted-foreground">{b.partner}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
                  <td><StatusBadge status={b.status} /></td>
                  <td>
                    <Tooltip title="View Details" arrow>
                      <IconButton size="small"><Eye className="w-3.5 h-3.5" /></IconButton>
                    </Tooltip>
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
