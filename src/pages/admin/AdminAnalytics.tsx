import PanelLayout from "@/components/PanelLayout";
import { StatCard, PageHeader } from "@/components/StatCard";
import { adminStats, analyticsData } from "@/data/dummyData";
import { motion } from "framer-motion";
import { TrendingUp, Users, Package, DollarSign } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["hsl(192, 70%, 28%)", "hsl(32, 95%, 52%)", "hsl(152, 60%, 40%)", "hsl(210, 80%, 55%)", "hsl(0, 72%, 51%)"];

export default function AdminAnalytics() {
  return (
    <PanelLayout panel="admin">
      <PageHeader title="Platform Analytics" subtitle="Deep insights into platform performance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={`৳${(adminStats.totalRevenue / 1000).toFixed(0)}K`} change={`${adminStats.growthRate}%`} icon={<DollarSign className="w-5 h-5" />} trend="up" />
        <StatCard title="Total Bookings" value={adminStats.totalBookings.toLocaleString()} change="12%" icon={<Package className="w-5 h-5" />} trend="up" />
        <StatCard title="Total Customers" value={adminStats.totalCustomers.toLocaleString()} change="18%" icon={<Users className="w-5 h-5" />} trend="up" />
        <StatCard title="Growth Rate" value={`${adminStats.growthRate}%`} change="vs last quarter" icon={<TrendingUp className="w-5 h-5" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue & Bookings Trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Revenue & Bookings Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analyticsData.bookingsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area yAxisId="left" type="monotone" dataKey="revenue" fill="hsl(192, 70%, 28%)" fillOpacity={0.15} stroke="hsl(192, 70%, 28%)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="hsl(32, 95%, 52%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(32, 95%, 52%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Growth */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analyticsData.customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Customers"]} />
              <Line type="monotone" dataKey="customers" stroke="hsl(152, 60%, 40%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(152, 60%, 40%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Destinations */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Top Destinations by Bookings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.topDestinations} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Bookings"]} />
              <Bar dataKey="bookings" radius={[0, 6, 6, 0]}>
                {analyticsData.topDestinations.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Partner Earnings */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Partner Earnings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.partnerEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, "Earnings"]} />
              <Bar dataKey="earnings" fill="hsl(32, 95%, 52%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </PanelLayout>
  );
}