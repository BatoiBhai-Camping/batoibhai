import PanelLayout from "@/components/PanelLayout";
import { StatCard, StatusBadge, PageHeader } from "@/components/StatCard";
import { partnerStats, bookings, packages } from "@/data/dummyData";
import { Wallet, CalendarCheck, Package, Star, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { week: "W1", earnings: 35000 },
  { week: "W2", earnings: 42000 },
  { week: "W3", earnings: 38000 },
  { week: "W4", earnings: 55000 },
  { week: "W5", earnings: 48000 },
  { week: "W6", earnings: 62000 },
];

export default function PartnerDashboard() {
  return (
    <PanelLayout panel="partner">
      <PageHeader title="Partner Dashboard" subtitle="Manage your packages and track earnings" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Earnings" value={`৳${(partnerStats.totalEarnings / 1000).toFixed(0)}K`} change={`${partnerStats.monthlyGrowth}% this month`} icon={<Wallet className="w-5 h-5" />} trend="up" />
        <StatCard title="Active Bookings" value={partnerStats.activeBookings} change="3 new today" icon={<CalendarCheck className="w-5 h-5" />} trend="up" />
        <StatCard title="My Packages" value={partnerStats.totalPackages} icon={<Package className="w-5 h-5" />} />
        <StatCard title="Avg Rating" value={partnerStats.avgRating} change="0.2 increase" icon={<Star className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Earnings chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Weekly Earnings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, "Earnings"]} />
              <Line type="monotone" dataKey="earnings" stroke="hsl(32, 95%, 52%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(32, 95%, 52%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pending payout */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Payout Summary</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Pending Payout</p>
              <p className="text-2xl font-bold font-display text-accent">৳{partnerStats.pendingPayouts.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Next Payout Date</p>
              <p className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> March 15, 2026</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* My Packages */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-card border rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-display font-semibold">My Packages</h3>
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
                  <td className="font-semibold">৳{p.price.toLocaleString()}</td>
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
