import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { Wallet, CalendarCheck, Package, Star, TrendingUp, Clock, Bell, Eye, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Avatar, Chip, Tooltip, IconButton, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const earningsData = [
  { week: "W1", earnings: 55000 },
  { week: "W2", earnings: 72000 },
  { week: "W3", earnings: 58000 },
  { week: "W4", earnings: 85000 },
  { week: "W5", earnings: 78000 },
  { week: "W6", earnings: 92000 },
];

export default function PartnerDashboard() {
  const { partnerStats, bookings, packages, notifications, analyticsData } = usePartnerData();
  const navigate = useNavigate();
  const partnerBookings = bookings.filter(b => b.partner === "OdishaTourism Pro");
  const pendingCount = partnerBookings.filter(b => b.status === "pending").length;

  return (
    <PanelLayout panel="partner">
      <PageHeader
        title="Partner Dashboard"
        subtitle="Manage packages & track earnings — OdishaTourism Pro"
        actions={
          <div className="flex gap-2">
            <Chip label={`${pendingCount} pending`} size="small" sx={{ bgcolor: "hsl(38,92%,50%,0.1)", color: "hsl(38,92%,40%)", fontWeight: 700 }} />
            <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => navigate("/partner/packages")}>
              <Package className="w-4 h-4 mr-1" /> Manage Packages
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Earnings" value={`₹${(partnerStats.totalEarnings / 1000).toFixed(0)}K`} change={`${partnerStats.monthlyGrowth}% this month`} icon={<Wallet className="w-5 h-5" />} trend="up" tooltip="Total earnings after platform commission" />
        <StatCard title="Active Bookings" value={partnerStats.activeBookings} change="5 new today" icon={<CalendarCheck className="w-5 h-5" />} trend="up" />
        <StatCard title="My Packages" value={partnerStats.totalPackages} icon={<Package className="w-5 h-5" />} />
        <StatCard title="Avg Rating" value={partnerStats.avgRating} change="0.2 increase" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      {/* Performance Progress */}
      <div className="bg-card border rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-sm">Monthly Target Progress</h3>
          <span className="text-xs text-muted-foreground">₹4.85L / ₹6L target</span>
        </div>
        <LinearProgress variant="determinate" value={80.8} sx={{ height: 10, borderRadius: 5, bgcolor: "hsl(210,18%,94%)", "& .MuiLinearProgress-bar": { bgcolor: "hsl(32,95%,52%)", borderRadius: 5 } }} />
        <p className="text-xs text-muted-foreground mt-2">You're <span className="font-semibold text-accent">80.8%</span> of the way to your monthly target! Keep it up.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Weekly Earnings (₹)</h3>
            <Chip label="Last 6 weeks" size="small" sx={{ bgcolor: "hsl(210,18%,94%)", fontWeight: 600, fontSize: 11 }} />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <ReTooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earnings"]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(210,18%,90%)" }} />
              <Area type="monotone" dataKey="earnings" stroke="hsl(32, 95%, 52%)" fill="hsl(32, 95%, 52%)" fillOpacity={0.12} strokeWidth={2.5} dot={{ r: 4, fill: "hsl(32, 95%, 52%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-display font-semibold mb-4">Payout Summary</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="text-xs text-muted-foreground">Pending Payout</p>
                <p className="text-2xl font-bold font-display text-accent">₹{partnerStats.pendingPayouts.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/60">
                <p className="text-xs text-muted-foreground">Next Payout Date</p>
                <p className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> March 15, 2026</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate("/partner/earnings")}>
                <ArrowUpRight className="w-4 h-4 mr-1" /> View All Earnings
              </Button>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-accent" /> Notifications</h3>
            <div className="space-y-2">
              {notifications.filter(n => n.type === "review" || n.type === "booking" || n.type === "payout").slice(0, 3).map(n => (
                <div key={n.id} className={`text-xs p-2.5 rounded-lg ${n.read ? "bg-muted/50" : "bg-accent/5 border border-accent/20"}`}>
                  <p className={n.read ? "text-muted-foreground" : "font-medium"}>{n.message}</p>
                  <p className="text-muted-foreground mt-0.5">{n.time}</p>
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
            <p className="text-xs text-muted-foreground mt-0.5">{partnerBookings.length} bookings for your packages</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/partner/bookings")}>View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Package</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {partnerBookings.slice(0, 4).map((b) => (
                <tr key={b.id}>
                  <td className="font-mono text-xs">{b.id}</td>
                  <td className="font-medium text-sm">{b.customer}</td>
                  <td className="text-sm">{b.package}</td>
                  <td className="text-muted-foreground text-sm">{b.date}</td>
                  <td className="font-semibold">₹{b.amount.toLocaleString()}</td>
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
