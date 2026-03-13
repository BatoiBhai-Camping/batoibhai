import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Avatar, Badge, IconButton, Tooltip, Menu, MenuItem, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from "@mui/material";
import {
  LayoutDashboard, Package, Users, BarChart3, Map, CalendarCheck, Heart,
  Wallet, Building2, Star, Compass, Bell, Settings, LogOut,
  Search, HelpCircle, Trash2
} from "lucide-react";
import { useAdminData, usePartnerData } from "@/hooks/useBackendData";
import { notifications as fallbackNotifications } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi, agentApi, userApi } from "@/lib/api";

type PanelType = "admin" | "partner" | "customer";

interface PanelLayoutProps {
  children: ReactNode;
  panel: PanelType;
}

const adminLinks = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Partners", url: "/admin/partners", icon: Building2 },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Packages", url: "/admin/packages", icon: Package },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const partnerLinks = [
  { title: "Dashboard", url: "/partner", icon: LayoutDashboard },
  { title: "My Packages", url: "/partner/packages", icon: Package },
  { title: "Bookings", url: "/partner/bookings", icon: CalendarCheck },
  { title: "Earnings", url: "/partner/earnings", icon: Wallet },
  { title: "Reviews", url: "/partner/reviews", icon: Star },
];

const customerLinks = [
  { title: "Explore", url: "/customer", icon: Compass },
  { title: "My Trips", url: "/customer/trips", icon: Map },
  { title: "Bookings", url: "/customer/bookings", icon: CalendarCheck },
  { title: "Wishlist", url: "/customer/wishlist", icon: Heart },
];

const panelConfig: Record<PanelType, { links: typeof adminLinks; label: string; user: { name: string; role: string; email: string } }> = {
  admin: { links: adminLinks, label: "Administration", user: { name: "Admin User", role: "Super Admin", email: "admin@batoibhai.com" } },
  partner: { links: partnerLinks, label: "Partner Portal", user: { name: "OdishaTourism Pro", role: "Verified Partner", email: "info@odishatourism.pro" } },
  customer: { links: customerLinks, label: "Traveler", user: { name: "Rajesh Mohanty", role: "Premium Member", email: "rajesh@email.com" } },
};

function PanelSidebar({ panel }: { panel: PanelType }) {
  const config = panelConfig[panel];
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar flex flex-col">
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center text-accent-foreground font-bold text-sm shrink-0">
            BB
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-display text-base font-bold text-sidebar-foreground">BatoiBhai</h2>
              <p className="text-xs text-sidebar-muted">{config.label}</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-xs uppercase tracking-widest">
            {!collapsed && "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.links.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === `/${panel}`}
                      className="text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="mr-3 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function PanelLayout({ children, panel }: PanelLayoutProps) {
  const adminData = useAdminData();
  const partnerData = usePartnerData();
  const notifications = panel === "admin" ? adminData.notifications : panel === "partner" ? partnerData.notifications : fallbackNotifications;
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const { user, logout, refreshProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const config = panelConfig[panel];
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const displayUser = user || config.user;

  const [form, setForm] = useState({
    fullName: displayUser.name || "",
    phone: user?.phone || "",
    profileImageUrl: user?.avatar || "",
  });

  const handleOpenSettings = () => {
    setForm({
      fullName: displayUser.name || "",
      phone: user?.phone || "",
      profileImageUrl: user?.avatar || "",
    });
    setProfileAnchor(null);
    setSettingsOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let res;
      if (user.role === "customer") {
        res = await userApi.updateProfile({ fullName: form.fullName, phone: form.phone, profileImageUrl: form.profileImageUrl });
      } else if (user.role === "partner") {
        res = await agentApi.updateProfile({ fullName: form.fullName, phone: form.phone, profileImageUrl: form.profileImageUrl });
      } else {
        res = await adminApi.updateProfile({ fullName: form.fullName, phone: form.phone, profileImageUrl: form.profileImageUrl });
      }

      if (!res?.success) {
        setSnackbar({ open: true, message: res?.message || "Profile update failed", severity: "error" });
        return;
      }

      updateProfile({ name: form.fullName, phone: form.phone, avatar: form.profileImageUrl });
      await refreshProfile();
      setSettingsOpen(false);
      setSnackbar({ open: true, message: "Profile updated successfully", severity: "success" });
    } catch (error: any) {
      setSnackbar({ open: true, message: error?.message || "Unable to update profile", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || user.role !== "customer") return;
    const ok = window.confirm("Delete your account permanently?");
    if (!ok) return;

    const res = await userApi.deleteAccount();
    if (!res?.success) {
      setSnackbar({ open: true, message: res?.message || "Delete account failed", severity: "error" });
      return;
    }
    await logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PanelSidebar panel={panel} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0 sticky top-0 z-30 backdrop-blur-sm bg-card/95">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  placeholder="Search anything..."
                  className="bg-transparent border-none outline-none text-xs w-40 placeholder:text-muted-foreground"
                />
                <kbd className="text-[10px] bg-background rounded px-1.5 py-0.5 text-muted-foreground border">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors mr-2 hidden sm:block">
                ← Home
              </Link>
              <Tooltip title="Notifications" arrow>
                <IconButton size="small" onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ color: "hsl(var(--muted-foreground))" }}>
                  <Badge badgeContent={unreadNotifs} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}>
                    <Bell className="w-4 h-4" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={notifAnchor}
                open={Boolean(notifAnchor)}
                onClose={() => setNotifAnchor(null)}
                PaperProps={{
                  sx: { width: 340, maxHeight: 400, borderRadius: 2, mt: 1, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div className="px-4 py-2.5 border-b">
                  <p className="font-display font-semibold text-sm">Notifications</p>
                  <p className="text-xs text-muted-foreground">{unreadNotifs} unread</p>
                </div>
                {notifications.map(n => (
                  <MenuItem key={n.id} onClick={() => setNotifAnchor(null)} sx={{ whiteSpace: "normal", py: 1.5, px: 2 }}>
                    <div className="w-full">
                      <p className={`text-xs leading-relaxed ${n.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>{n.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem sx={{ justifyContent: "center", py: 1 }}>
                  <span className="text-xs font-medium text-primary">View All Notifications</span>
                </MenuItem>
              </Menu>

              <Tooltip title="Profile" arrow>
                <IconButton size="small" onClick={(e) => setProfileAnchor(e.currentTarget)}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: "hsl(32, 95%, 52%)", fontSize: 12, fontWeight: 700 }}>
                    {displayUser.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={() => setProfileAnchor(null)}
                PaperProps={{ sx: { width: 220, borderRadius: 2, mt: 1 } }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <div className="px-4 py-3 border-b">
                  <p className="font-medium text-sm">{displayUser.name}</p>
                  <p className="text-xs text-muted-foreground">{displayUser.role || config.user.role}</p>
                </div>
                <MenuItem onClick={handleOpenSettings} sx={{ fontSize: 13, py: 1 }}><Settings className="w-3.5 h-3.5 mr-2" /> Settings</MenuItem>
                <MenuItem sx={{ fontSize: 13, py: 1 }}><HelpCircle className="w-3.5 h-3.5 mr-2" /> Help Center</MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout(); navigate("/"); setProfileAnchor(null); }} sx={{ fontSize: 13, py: 1, color: "hsl(0, 72%, 51%)" }}><LogOut className="w-3.5 h-3.5 mr-2" /> Logout</MenuItem>
              </Menu>

            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogContent className="space-y-4" sx={{ pt: "12px !important" }}>
          <TextField
            label="Full Name"
            fullWidth
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
          />
          <TextField
            label="Phone"
            fullWidth
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
          <TextField
            label="Profile Image URL"
            fullWidth
            value={form.profileImageUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, profileImageUrl: e.target.value }))}
          />
          {user?.role === "customer" && (
            <Button variant="outline" className="w-full text-destructive border-destructive/30" onClick={handleDeleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outline" onClick={() => setSettingsOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} disabled={saving} className="bg-primary text-primary-foreground">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </SidebarProvider>
  );
}
