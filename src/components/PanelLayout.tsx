import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { Avatar } from "@mui/material";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  Map,
  CalendarCheck,
  Heart,
  Wallet,
  ShieldCheck,
  Building2,
  Star,
  Menu,
  Compass,
} from "lucide-react";

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

const panelConfig: Record<PanelType, { links: typeof adminLinks; label: string; user: { name: string; role: string } }> = {
  admin: { links: adminLinks, label: "Administration", user: { name: "Admin User", role: "Super Admin" } },
  partner: { links: partnerLinks, label: "Partner Portal", user: { name: "TravelBD", role: "Verified Partner" } },
  customer: { links: customerLinks, label: "Traveler", user: { name: "Rahim Ahmed", role: "Premium Member" } },
};

function PanelSidebar({ panel }: { panel: PanelType }) {
  const config = panelConfig[panel];
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
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

        {/* User info at bottom */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <Avatar sx={{ width: 32, height: 32, bgcolor: "hsl(32, 95%, 52%)", fontSize: 14 }}>
                {config.user.name[0]}
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{config.user.name}</p>
                <p className="text-xs text-sidebar-muted">{config.user.role}</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export default function PanelLayout({ children, panel }: PanelLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PanelSidebar panel={panel} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {panelConfig[panel].label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Home
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
