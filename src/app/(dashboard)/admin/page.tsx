import type { Metadata } from "next";

import {
  BillsOverview,
  type BillsReport,
} from "@/components/dashboard/admin/bills-overview";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

// TODO: Replace this placeholder with your real API response (`data` field).
const placeholderReport: BillsReport = {
  totalBills: 14,
  totalBillAmount: 10000,
  paidBills: 7,
  paidAmount: 5900,
  paidMethod: {
    cashCollectedBills: 6,
    cashCollectedAmount: 4900,
    bkashPaidBills: 1,
    bkashPaidAmount: 1000,
  },
  unpaidBills: 5,
  unpaidAmount: 2900,
  overdueBills: 2,
  overdueAmount: 1200,
  collectionRate: 59,
};

export default function AdminDashboardPage() {
  return <BillsOverview data={placeholderReport} />;
}