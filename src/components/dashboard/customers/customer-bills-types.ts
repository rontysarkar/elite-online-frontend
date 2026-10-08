import type { BillStatus } from "@/types/customers-types";

export type PaymentMethod = "BKASH" | "CASH_COLLECTOR";

export interface BillPayment {
  id: string;
  amount: string;
  method: PaymentMethod;
  status: string;
  trxId: string | null;
  paidAt: string;
  customer: {
    address: string;
    user: {
      name: string;
      email: string;
      phone: string;
    };
  };
  bill: {
    year: number;
    month: number;
    amount: string;
    status: BillStatus;
  };
  collector: {
    name: string;
    phone: string;
  } | null;
}