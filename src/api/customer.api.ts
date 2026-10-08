import { apiClient } from "@/lib/api-client";

export const getCustomerPaymentDetails = async (id: string) => {
  return apiClient(`/payments/my-payments/${id}`, {
    method: "GET",
  });
};


export const getCustomerBills = async () => {
    return apiClient(`/bills/customer/my-bills`, {
      method: "GET",
    }); 
}


export const paymentByCustomer = async (billId:string) => {
  return apiClient(`/payments/bkash`, {
    method: "POST",
    body: JSON.stringify({ billId }),
  });
}
