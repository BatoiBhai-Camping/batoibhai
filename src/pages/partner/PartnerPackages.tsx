import PanelLayout from "@/components/PanelLayout";
import { StatusBadge, PageHeader } from "@/components/StatCard";
import { packages } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Users, Clock } from "lucide-react";

export default function PartnerPackages() {
  return (
    <PanelLayout panel="partner">
      <PageHeader title="My Packages" subtitle="Create and manage your travel packages" />

      <div className="flex justify-end mb-6">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-1" /> Create Package
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-lg">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                  <span className="mx-1">•</span>
                  <Users className="w-3.5 h-3.5" /> Up to {pkg.maxPeople}
                </p>
              </div>
              <StatusBadge status={pkg.status} />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {pkg.includes.map((inc) => (
                <span key={inc} className="badge-info">{inc}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-primary font-bold text-xl font-display">৳{pkg.price.toLocaleString()}</span>
              <div className="flex gap-1">
                <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelLayout>
  );
}