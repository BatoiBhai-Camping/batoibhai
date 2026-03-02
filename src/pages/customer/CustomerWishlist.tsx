import PanelLayout from "@/components/PanelLayout";
import { PageHeader } from "@/components/StatCard";
import { wishlist } from "@/data/dummyData";
import { motion } from "framer-motion";
import { Heart, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerWishlist() {
  return (
    <PanelLayout panel="customer">
      <PageHeader title="My Wishlist" subtitle="Saved destinations you'd love to visit" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={w.image} alt={w.destination} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-destructive/90 backdrop-blur rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-destructive-foreground fill-destructive-foreground" />
              </button>
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold">
                {w.category}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold">{w.destination}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {w.rating}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="text-primary font-bold text-lg">From ৳{w.price.toLocaleString()}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PanelLayout>
  );
}