
import { getCustomerBills, getCustomerPaymentDetails, paymentByCustomer } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGetCustomerBills() {
  return useQuery({
    queryKey: ["customer-bills"],
    queryFn: async () => {
      const res = await getCustomerBills();
      return res.data;
    },
  });
}

export function useGetCustomerPaymentDetails(id: string) {
  return useQuery({
    queryKey: ["customer-payment-details", id],
    queryFn: async () => {
      const res = await getCustomerPaymentDetails(id);
      return res.data;
    },
    // enabled: !!id,
  });
}


export function usePaymentByCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ billId }: { billId: string }) => {
        const res = await paymentByCustomer(billId);
        return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-bills"] });
      queryClient.invalidateQueries({ queryKey: ["customer-payment-details"] });
    },
  });
}


