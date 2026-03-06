import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, PageHeader } from "@/components/StatCard";
import { adminStats, analyticsData } from "@/data/dummyData";
import { motion } from "framer-motion";
import { TrendingUp, Users, Package, DollarSign, Download, Calendar } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from "recharts";
import { Chip, Tooltip, IconButton } from "@mui/material";
import { Button } from "@/components/ui/button";

const COLORS = ["hsl(192, 70%, 28%)", "hsl(32, 95%, 52%)", "hsl(152, 60%, 40%)", "hsl(210, 80%, 55%)", "hsl(0, 72%, 51%)"];

const chartTooltipStyle = {
  contentStyle: { borderRadius: 12, border: "1px solid hsl(210,18%,90%)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontFamily: "var(--font-body)", fontSize: 12 }
};

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <PanelLayout panel="admin">
      <PageHeader
        title="Platform Analytics"
        subtitle="Deep insights into Odisha travel platform performance"
        actions={
          <div className="flex gap-2">
            {["1M", "3M", "6M", "1Y"].map(r => (
              <Chip
                key={r}
                label={r}
                onClick={() => setTimeRange(r)}
                size="small"
                sx={{
                  bgcolor: timeRange === r ? "hsl(192,70%,28%)" : "hsl(210,18%,94%)",
                  color: timeRange === r ? "white" : "hsl(210,30%,10%)",
                  fontWeight: 600, fontSize: 11, cursor: "pointer",
                }}
              />
            ))}
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Report</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`} change={`${adminStats.growthRate}%`} icon={<DollarSign className="w-5 h-5" />} trend="up" tooltip="All-time platform revenue" />
        <StatCard title="Total Bookings" value={adminStats.totalBookings.toLocaleString()} change="12%" icon={<Package className="w-5 h-5" />} trend="up" />
        <StatCard title="Total Customers" value={`${(adminStats.totalCustomers / 1000).toFixed(1)}K`} change="18%" icon={<Users className="w-5 h-5" />} trend="up" />
        <StatCard title="Growth Rate" value={`${adminStats.growthRate}%`} change="vs last quarter" icon={<TrendingUp className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Revenue & Bookings Trend</h3>
            <Chip label="Dual Axis" size="small" sx={{ bgcolor: "hsl(210,18%,94%)", fontSize: 10, fontWeight: 600 }} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.bookingsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <ReTooltip formatter={(v: number, name: string) => [name === "revenue" ? `₹${v.toLocaleString()}` : v.toLocaleString(), name === "revenue" ? "Revenue" : "Bookings"]} {...chartTooltipStyle} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" fill="hsl(192, 70%, 28%)" fillOpacity={0.12} stroke="hsl(192, 70%, 28%)" strokeWidth={2.5} />
              <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="hsl(32, 95%, 52%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(32, 95%, 52%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Customer Growth</h3>
            <span className="text-xs text-success font-semibold bg-success/10 px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +48%</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
              <ReTooltip formatter={(v: number) => [v.toLocaleString(), "Customers"]} {...chartTooltipStyle} />
              <Line type="monotone" dataKey="customers" stroke="hsl(152, 60%, 40%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(152, 60%, 40%)", strokeWidth: 2, stroke: "white" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Top Destinations by Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.topDestinations} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontFamily: "var(--font-display)" }} width={110} />
              <ReTooltip formatter={(v: number, name: string) => [name === "bookings" ? v.toLocaleString() : `₹${v.toLocaleString()}`, name === "bookings" ? "Bookings" : "Revenue"]} {...chartTooltipStyle} />
              <Bar dataKey="bookings" radius={[0, 6, 6, 0]}>
                {analyticsData.topDestinations.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analyticsData.topDestinations} dataKey="revenue" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {analyticsData.topDestinations.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} {...chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-body)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </PanelLayout>
  );
}
