import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelLayout from "@/components/PanelLayout";
import { PageHeader, EmptyState } from "@/components/StatCard";
import { wishlist } from "@/data/dummyData";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, MapPin, Trash2, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, IconButton } from "@mui/material";

export default function CustomerWishlist() {
  const navigate = useNavigate();
  const [items, setItems] = useState(wishlist);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleRemove = (id: number) => {
    const item = items.find(w => w.id === id);
    setItems(prev => prev.filter(w => w.id !== id));
    setDeleteConfirm(null);
    setSnackbar({ open: true, message: `${item?.destination} removed from wishlist` });
  };

  if (items.length === 0) {
    return (
      <PanelLayout panel="customer">
        <PageHeader title="My Wishlist" subtitle="Saved Odisha destinations you'd love to visit" />
        <EmptyState
          icon={<Heart className="w-8 h-8" />}
          title="Your wishlist is empty"
          description="Start exploring and save your favorite Odisha destinations!"
          action={<Button className="bg-primary text-primary-foreground" onClick={() => navigate("/customer")}>Explore Destinations</Button>}
        />
      </PanelLayout>
    );
  }

  return (
    <PanelLayout panel="customer">
      <PageHeader
        title="My Wishlist"
        subtitle="Saved Odisha destinations you'd love to visit"
        actions={<Chip label={`${items.length} saved`} size="small" sx={{ bgcolor: "hsl(0,72%,51%,0.1)", color: "hsl(0,72%,51%)", fontWeight: 700 }} icon={<Heart className="w-3 h-3" style={{ color: "hsl(0,72%,51%)" }} />} />}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence>
          {items.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.06 }}
              className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={w.image} alt={w.destination} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <Tooltip title="Remove from wishlist" arrow>
                  <button
                    onClick={() => setDeleteConfirm(w.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-destructive/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
                  >
                    <Heart className="w-4 h-4 text-destructive-foreground fill-destructive-foreground" />
                  </button>
                </Tooltip>
                <div className="absolute bottom-2 left-2">
                  <Chip label={w.category} size="small" sx={{ bgcolor: "rgba(255,255,255,0.92)", fontWeight: 600, fontSize: 10, height: 22 }} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-display font-semibold">{w.destination}</h3>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" /> {w.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div>
                    <span className="text-primary font-bold text-lg">₹{w.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground ml-1">per person</span>
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs" onClick={() => navigate("/customer/book?package=1")}>
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Book
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Remove from Wishlist?</DialogTitle>
        <DialogContent>
          <p className="text-sm text-muted-foreground">This destination will be removed from your saved list. You can always add it back later.</p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Keep</Button>
          <Button className="bg-destructive text-destructive-foreground" onClick={() => deleteConfirm && handleRemove(deleteConfirm)}>
            <Trash2 className="w-4 h-4 mr-1" /> Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="info" variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PanelLayout>
  );
}
