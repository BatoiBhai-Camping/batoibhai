import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Tooltip, IconButton, Badge } from "@mui/material";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down";
  tooltip?: string;
}

export function StatCard({ title, value, change, icon, trend, tooltip }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground font-medium truncate">{title}</p>
            {tooltip && (
              <Tooltip title={tooltip} arrow placement="top">
                <IconButton size="small" sx={{ p: 0.25 }}>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </IconButton>
              </Tooltip>
            )}
          </div>
          <p className="text-2xl font-bold font-display mt-1 tracking-tight">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 text-xs mt-1.5 font-medium ${trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
              {trend === "up" && <TrendingUp className="w-3 h-3" />}
              {trend === "down" && <TrendingDown className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { cls: string; dot: string }> = {
    confirmed: { cls: "badge-success", dot: "bg-success" },
    active: { cls: "badge-success", dot: "bg-success" },
    verified: { cls: "badge-success", dot: "bg-success" },
    completed: { cls: "badge-success", dot: "bg-success" },
    pending: { cls: "badge-warning", dot: "bg-warning" },
    cancelled: { cls: "badge-destructive", dot: "bg-destructive" },
    rejected: { cls: "badge-destructive", dot: "bg-destructive" },
  };
  const c = config[status] || { cls: "badge-info", dot: "bg-info" };
  return (
    <span className={`${c.cls} inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div>
        <h1 className="panel-header">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </motion.div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

export function DataTablePagination({ total, page, perPage, onPageChange }: { total: number; page: number; perPage: number; onPageChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
      <span>Showing {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)} of {total}</span>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-md border text-xs font-medium disabled:opacity-40 hover:bg-muted transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${p === page ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-md border text-xs font-medium disabled:opacity-40 hover:bg-muted transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
