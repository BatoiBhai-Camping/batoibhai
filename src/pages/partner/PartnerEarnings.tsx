import PanelLayout from "@/components/PanelLayout";
import { StatCard, PageHeader } from "@/components/StatCard";
import { partnerStats, analyticsData } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: "TXN-001", date: "2026-02-28", amount: 28500, type: "Payout", status: "completed" },
  { id: "TXN-002", date: "2026-02-15", amount: 32000, type: "Payout", status: "completed" },
  { id: "TXN-003", date: "2026-02-01", amount: 25000, type: "Payout", status: "completed" },
  { id: "TXN-004", date: "2026-03-15", amount: 75000, type: "Payout", status: "pending" },
];

export default function PartnerEarnings() {
  return (
    <PanelLayout panel="partner">
      <PageHeader title="Earnings & Payouts" subtitle="Track your earnings and payout history" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Earnings" value={`₹${(partnerStats.totalEarnings / 1000).toFixed(0)}K`} change={`${partnerStats.monthlyGrowth}%`} icon={<Wallet className="w-5 h-5" />} trend="up" />
        <StatCard title="Pending Payout" value={`₹${partnerStats.pendingPayouts.toLocaleString()}`} change="Next: Mar 15" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Growth Rate" value={`${partnerStats.monthlyGrowth}%`} change="vs last month" icon={<TrendingUp className="w-5 h-5" />} trend="up" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6 mb-6">
        <h3 className="font-display font-semibold mb-4">Earnings Trend (₹)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={analyticsData.partnerEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earnings"]} />
            <Area type="monotone" dataKey="earnings" fill="hsl(32, 95%, 52%)" fillOpacity={0.15} stroke="hsl(32, 95%, 52%)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="font-display font-semibold">Transaction History</h3>
          <Button variant="outline" size="sm">Request Payout</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-sm">{t.id}</td>
                  <td className="text-muted-foreground">{t.date}</td>
                  <td className="font-semibold">₹{t.amount.toLocaleString()}</td>
                  <td className="flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-success" /> {t.type}</td>
                  <td>
                    <span className={t.status === "completed" ? "badge-success" : "badge-warning"}>{t.status}</span>
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
