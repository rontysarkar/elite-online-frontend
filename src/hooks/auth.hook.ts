import {
  changePassword,
  forgotPassword,
  getMe,
  refreshToken,
  resendEmailVerify,
  resetPassword,
  sendConnectionRequest,
  userLogin,
  userLogout,
  verifyEmail,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

// export function useLogout() {
//   return useMutation({
//     mutationFn: userLogout,
//   });
// }

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: userLogout,

    onSuccess: () => {
      queryClient.clear();
      router.replace("/login");

      router.refresh();
    },
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
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

export function useRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
    retry: 0,
  });
}
