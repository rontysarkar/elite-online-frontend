import { PaymentFailure, PaymentSuccess } from "@/components/dashboard/customers/payment-result";
import type { Metadata } from "next";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "Payment",
};

interface PaymentResultPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function PaymentResultPage({
  searchParams,
}: PaymentResultPageProps) {
  const { status } = await searchParams;

  if (status === "success") return <PaymentSuccess />;
  if (status === "failure") return <PaymentFailure />;

  redirect("/customer/bills");
}