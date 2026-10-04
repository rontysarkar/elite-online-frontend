import {
  CreditCard,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Receipt,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "admin" | "collector" | "customer";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardConfig {
  label: string;
  nav: NavItem[];
}


export const DASHBOARD_CONFIG: Record<DashboardRole, DashboardConfig> = {
  admin: {
    label: "Admin Panel",
    nav: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Requests", href: "/admin/requests", icon: FileText },
      { title: "Customers", href: "/admin/customers", icon: Users },
      { title: "Collectors", href: "/admin/collectors", icon: Wallet },
      { title: "Packages", href: "/admin/packages", icon: Package },
      { title: "Areas", href: "/admin/areas", icon: MapPin },
    ],
  },
  collector: {
    label: "Collector Panel",
    nav: [
      { title: "Dashboard", href: "/collector", icon: LayoutDashboard },
      { title: "Collections", href: "/collector/collections", icon: Wallet },
      { title: "Customers", href: "/collector/customers", icon: Users },
    ],
  },
  customer: {
    label: "Customer Panel",
    nav: [
      { title: "Dashboard", href: "/customer", icon: LayoutDashboard },
      { title: "My Package", href: "/customer/package", icon: Package },
      { title: "Bills", href: "/customer/bills", icon: Receipt },
      { title: "Payments", href: "/customer/payments", icon: CreditCard },
    ],
  },
};