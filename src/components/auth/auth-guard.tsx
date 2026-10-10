"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useCurrentRole } from "@/hooks";
import { LOGIN_PATH } from "@/lib/auth";
import { AuthLoading } from "./auth-loading";



interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isPending, isAuthenticated } = useCurrentRole();

  React.useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace(LOGIN_PATH);
    }
  }, [isPending, isAuthenticated, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return <AuthLoading message="Redirecting to login..." />;
  }

  return <>{children}</>;
}


