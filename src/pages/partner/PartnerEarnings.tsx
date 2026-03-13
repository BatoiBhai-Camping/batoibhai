import { useState } from "react";
import PanelLayout from "@/components/PanelLayout";
import { StatCard, PageHeader } from "@/components/StatCard";
import { usePartnerData } from "@/hooks/useBackendData";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Clock, ArrowUpRight, Download, DollarSign, BanknoteIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, LinearProgress } from "@mui/material";

const transactions = [
  { id: "TXN-001", date: "2026-02-28", amount: 28500, type: "Payout", status: "completed", method: "NEFT" },
  { id: "TXN-002", date: "2026-02-15", amount: 32000, type: "Payout", status: "completed", method: "IMPS" },
  { id: "TXN-003", date: "2026-02-01", amount: 25000, type: "Payout", status: "completed", method: "NEFT" },
  { id: "TXN-004", date: "2026-03-15", amount: 75000, type: "Payout", status: "pending", method: "NEFT" },
];

export default function PartnerEarnings() {
  const { partnerStats, analyticsData } = usePartnerData();
  const [payoutDialog, setPayoutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const totalPaid = transactions.filter(t => t.status === "completed").reduce((a, t) => a + t.amount, 0);

  return (
    <PanelLayout panel="partner">
      <PageHeader
        title="Earnings & Payouts"
        subtitle="Track your earnings and payout history"
        actions={
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setPayoutDialog(true)}>
            <BanknoteIcon className="w-4 h-4 mr-1" /> Request Payout
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Earnings" value={`₹${(partnerStats.totalEarnings / 1000).toFixed(0)}K`} change={`${partnerStats.monthlyGrowth}%`} icon={<Wallet className="w-5 h-5" />} trend="up" />
        <StatCard title="Total Paid Out" value={`₹${(totalPaid / 1000).toFixed(0)}K`} change="All time" icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Pending Payout" value={`₹${partnerStats.pendingPayouts.toLocaleString()}`} change="Next: Mar 15" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Growth Rate" value={`${partnerStats.monthlyGrowth}%`} change="vs last month" icon={<TrendingUp className="w-5 h-5" />} trend="up" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Earnings Trend (₹)</h3>
          <Chip label="6 months" size="small" sx={{ bgcolor: "hsl(210,18%,94%)", fontWeight: 600, fontSize: 11 }} />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData.partnerEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <ReTooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earnings"]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(210,18%,90%)" }} />
            <Area type="monotone" dataKey="earnings" fill="hsl(32, 95%, 52%)" fillOpacity={0.12} stroke="hsl(32, 95%, 52%)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-xl overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold">Transaction History</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{transactions.length} transactions</p>
          </div>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td className="font-mono text-xs font-medium">{t.id}</td>
                  <td className="text-muted-foreground text-sm">{t.date}</td>
                  <td className="font-semibold text-primary">₹{t.amount.toLocaleString()}</td>
                  <td><Chip label={t.method} size="small" sx={{ bgcolor: "hsl(210,18%,94%)", fontWeight: 600, fontSize: 10, height: 22 }} /></td>
                  <td className="flex items-center gap-1 text-sm"><ArrowUpRight className="w-3.5 h-3.5 text-success" /> {t.type}</td>
                  <td>
                    <span className={t.status === "completed" ? "badge-success" : "badge-warning"}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.status === "completed" ? "bg-success" : "bg-warning"}`} />
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payout Request Dialog */}
      <Dialog open={payoutDialog} onClose={() => setPayoutDialog(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Request Payout</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold font-display text-accent">₹{partnerStats.pendingPayouts.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Payout Method</p>
              <select className="w-full h-10 rounded-md border bg-background px-3 text-sm">
                <option>NEFT - SBI ****1234</option>
                <option>IMPS - ICICI ****5678</option>
                <option>UPI - partner@upi</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground">Payouts are processed within 2-3 business days. Minimum payout: ₹5,000.</p>
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outline" onClick={() => setPayoutDialog(false)}>Cancel</Button>
          <Button className="bg-accent text-accent-foreground" onClick={() => { setPayoutDialog(false); setSnackbar({ open: true, message: "Payout request submitted! Expected by March 18." }); }}>
            Request ₹{partnerStats.pendingPayouts.toLocaleString()}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
