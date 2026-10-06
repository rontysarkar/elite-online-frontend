"use client";

import * as React from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getInitials, formatDate } from "@/helper";
import { cn } from "@/lib/utils";


import { EmailVerifiedBadge } from "./email-verified-badge";
import { RequestDetailsModal } from "./request-details-modal";
import {  ConnectionRequestResponse } from "@/types";
import { Skeleton } from "../../skeleton/skeleton";
import { useAcceptConnectionRequest, useGetConnectionRequests } from "@/hooks";
import { toast } from "@/components/ui/toast";


export function RequestsManagement() {
  const { data, isPending, isFetching, isError, refetch } =
    useGetConnectionRequests();

  const [selectedRequest, setSelectedRequest] =
    React.useState<ConnectionRequestResponse | null>(null);

  const requests = (data ?? []) as ConnectionRequestResponse[];

  const {mutate: acceptRequest,isPending: isAccepting} = useAcceptConnectionRequest();

  async function handleAccept() {
    if (!selectedRequest) return;

    acceptRequest(selectedRequest.id,{
        onSuccess: () => {
          toast.add({
            title: "Request accepted",
            description: "The request has been accepted successfully.",
            type: "success",
          });
          setSelectedRequest(null);
        },
        onError: () => {
          toast.add({
            title: "Couldn't accept request",
            description: "Something went wrong. Please try again.",
            type: "error",
          });
          setSelectedRequest(null);
        },
    });

  }

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <h2 className="text-base font-semibold text-foreground">
            Pending requests
          </h2>
          {!isPending && !isError && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {requests.length}
            </span>
          )}
        </div>

        <div
          className={cn(
            "overflow-x-auto transition-opacity",
            isFetching && !isPending && "opacity-60",
          )}
        >
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {isPending &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="ml-auto h-8 w-20" />
                    </td>
                  </tr>
                ))}

              {!isPending &&
                !isError &&
                requests.map((request) => (
                  <tr
                    key={request.id}
                    tabIndex={0}
                    onClick={() => setSelectedRequest(request)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target === e.currentTarget) {
                        setSelectedRequest(request);
                      }
                    }}
                    className="cursor-pointer transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(request.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {request.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-foreground">
                      {request.phone}
                    </td>

                    <td className="px-4 py-3 text-foreground">
                      {request.area?.name ?? "—"}
                    </td>

                    <td className="px-4 py-3">
                      {request.package ? (
                        <div>
                          <p className="font-medium text-foreground">
                            {request.package.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.package.speed} · ৳{request.package.price}
                          </p>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <EmailVerifiedBadge verified={request.emailVerified} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(request);
                        }}
                      >
                        <Eye className="size-4" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {isError && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                Couldn&apos;t load requests
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong. Please try again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {!isPending && !isError && requests.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                No pending requests
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                New connection requests will show up here.
              </p>
            </div>
          )}
        </div>
      </section>

      <RequestDetailsModal
        request={selectedRequest}
        isAccepting={isAccepting}
        onAccept={handleAccept}
        onClose={() => setSelectedRequest(null)}
      />
    </>
  );
}