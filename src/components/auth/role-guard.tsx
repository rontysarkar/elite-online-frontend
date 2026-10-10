"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useCurrentRole, type CurrentRole } from "@/hooks";
import { LOGIN_PATH, ROLE_HOME } from "@/lib/auth";
import { AuthLoading } from "./auth-loading";



interface RoleGuardProps {
  allowedRoles: CurrentRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { role, isPending, isAuthenticated } = useCurrentRole();

  const isAllowed = role !== null && allowedRoles.includes(role);

  React.useEffect(() => {
    if (isPending) return;

    if (!isAuthenticated) {
      router.replace(LOGIN_PATH);
      return;
    }

    if (!isAllowed) {
      router.replace(role ? (ROLE_HOME[role] ?? "/") : "/");
    }
  }, [isPending, isAuthenticated, isAllowed, role, router]);

  if (isPending) {
    return <AuthLoading fullScreen={false} />;
  }

  if (!isAllowed) {
    return <AuthLoading fullScreen={false} message="Redirecting..." />;
  }

  return <>{children}</>;
}