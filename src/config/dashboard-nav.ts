import {
  CreditCard,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Receipt,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "ADMIN" | "COLLECTOR" | "CUSTOMER";

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
  ADMIN: {
    label: "Admin Panel",
    nav: [
      {title:"Profile", href: "/admin/profile", icon: UserCog},
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title:"Users", href: "/admin/users", icon: UserCog },
      { title: "Customers", href: "/admin/customers", icon: Users },
      { title: "Requests", href: "/admin/requests", icon: FileText },
      { title: "Collectors", href: "/admin/collectors", icon: Wallet },
      { title: "Packages", href: "/admin/packages", icon: Package },
      { title: "Areas", href: "/admin/areas", icon: MapPin },
    ],
  },
  COLLECTOR: {
    label: "Collector Panel",
    nav: [
      {title:"Profile", href: "/collector/profile", icon: UserCog},
      { title: "Dashboard", href: "/collector", icon: LayoutDashboard },
      { title: "Customers", href: "/collector/customers", icon: Users },
      { title: "Bills", href: "/collector/bills", icon: Receipt },
    ],
  },
  CUSTOMER: {
    label: "Customer Panel",
    nav: [
      {title:"Profile", href: "/customer/profile", icon: UserCog},
      // { title: "Dashboard", href: "/customer", icon: LayoutDashboard },
      // { title: "My Package", href: "/customer/package", icon: Package },
      { title: "Bills", href: "/customer/bills", icon: Receipt },
      // { title: "Payments", href: "/customer/payments", icon: CreditCard },
    ],
  },
};