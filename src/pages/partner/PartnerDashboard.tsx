import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { partnerStats, bookings, packages, notifications } from "@/data/dummyData";
import { Wallet, CalendarCheck, Package, Star, TrendingUp, Clock, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const earningsData = [
  { week: "W1", earnings: 55000 },
  { week: "W2", earnings: 72000 },
  { week: "W3", earnings: 58000 },
  { week: "W4", earnings: 85000 },
  { week: "W5", earnings: 78000 },
  { week: "W6", earnings: 92000 },
];

export default function PartnerDashboard() {
  return (
    <PanelLayout panel="partner">
      <PageHeader title="Partner Dashboard" subtitle="Manage packages & track earnings — Odisha Network" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Earnings" value={`₹${(partnerStats.totalEarnings / 1000).toFixed(0)}K`} change={`${partnerStats.monthlyGrowth}% this month`} icon={<Wallet className="w-5 h-5" />} trend="up" />
        <StatCard title="Active Bookings" value={partnerStats.activeBookings} change="5 new today" icon={<CalendarCheck className="w-5 h-5" />} trend="up" />
        <StatCard title="My Packages" value={partnerStats.totalPackages} icon={<Package className="w-5 h-5" />} />
        <StatCard title="Avg Rating" value={partnerStats.avgRating} change="0.2 increase" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Weekly Earnings (₹)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earnings"]} />
              <Line type="monotone" dataKey="earnings" stroke="hsl(32, 95%, 52%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(32, 95%, 52%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-display font-semibold mb-4">Payout Summary</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Pending Payout</p>
                <p className="text-2xl font-bold font-display text-accent">₹{partnerStats.pendingPayouts.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Next Payout Date</p>
                <p className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> March 15, 2026</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Notifications</h3>
            <div className="space-y-2">
              {notifications.filter(n => n.type === "review" || n.type === "booking").slice(0, 3).map(n => (
                <div key={n.id} className={`text-xs p-2 rounded-lg ${n.read ? "bg-muted/50" : "bg-accent/5 border border-accent/20"}`}>
                  <p className={n.read ? "text-muted-foreground" : "font-medium"}>{n.message}</p>
                  <p className="text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border rounded-xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="font-display font-semibold">My Packages</h3>
          <Button variant="link" className="text-primary text-sm" onClick={() => window.location.href = "/partner/packages"}>Manage All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.duration}</td>
                  <td className="font-semibold">₹{p.price.toLocaleString()}</td>
                  <td>{p.maxPeople}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PanelLayout>
  );
}
