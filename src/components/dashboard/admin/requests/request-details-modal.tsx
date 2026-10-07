"use client";

import { Check, Home, Mail, MapPin, Package, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, getInitials } from "@/helper";

import { EmailVerifiedBadge } from "./email-verified-badge";
import { ConnectionRequestResponse } from "@/types";
import { InfoCard } from "../../components/info-card";




interface RequestDetailsModalProps {
  request: ConnectionRequestResponse | null;
  isAccepting: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function RequestDetailsModal({
  request,
  isAccepting,
  onAccept,
  onClose,
}: RequestDetailsModalProps) {
  return (
    <Dialog
      open={Boolean(request)}
      onOpenChange={(open) => {
        if (!open && !isAccepting) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-xl">
        {request && (
          <>
            <DialogHeader className="flex-row items-center gap-4 border-b border-border bg-primary/5 px-5 py-5 text-left sm:px-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
                {getInitials(request.name)}
              </span>

              <div className="min-w-0 flex-1 space-y-1.5 pr-8">
                <DialogTitle className="truncate text-xl font-bold sm:text-2xl">
                  {request.name}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <EmailVerifiedBadge verified={request.emailVerified} />
                  <DialogDescription className="text-xs">
                    Requested on {formatDate(request.createdAt)}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={request.phone}
                  href={`tel:${request.phone}`}
                />
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={request.email}
                  href={`mailto:${request.email}`}
                />
                <InfoCard
                  icon={MapPin}
                  label="Area"
                  value={request.area?.name ?? "—"}
                />
                <InfoCard
                  icon={Package}
                  label="Package"
                  value={request.package?.name ?? "—"}
                  hint={
                    request.package
                      ? `${request.package.speed} · ৳${request.package.price}/mo`
                      : undefined
                  }
                />
                <InfoCard
                  icon={Home}
                  label="Address"
                  value={request.address}
                  className="sm:col-span-2"
                />
              </div>

              {!request.emailVerified && (
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  <p>This customer has not verified their email address yet.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border bg-muted/30 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11"
                disabled={isAccepting}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                type="button"
                size="lg"
                className="h-11"
                disabled={isAccepting}
                onClick={onAccept}
              >
                <Check className="size-4" />
                {isAccepting ? "Accepting..." : "Accept request"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}