import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down";
}

export function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold font-display mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
              {trend === "up" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const cls = status === "confirmed" || status === "active" || status === "verified"
    ? "badge-success"
    : status === "pending"
    ? "badge-warning"
    : "badge-info";
  return <span className={cls}>{status}</span>;
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <h1 className="panel-header">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
    </motion.div>
  );
}
