import {
  changePassword,
  forgotPassword,
  getMe,
  resendEmailVerify,
  resetPassword,
  sendConnectionRequest,
  userLogin,
  userLogout,
  verifyEmail,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () =>{
      const res = await getMe();
      return res.data;
    },
    retry: false,
  });
}

export function useSendConnectionRequest() {
  return useMutation({
    mutationFn: sendConnectionRequest,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

export function useResendEmailVerify() {
  return useMutation({
    mutationFn: resendEmailVerify,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}   


export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}