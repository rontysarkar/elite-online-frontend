import type { Metadata } from "next";

import { ProfileView } from "@/components/dashboard/profile/profile-view";

export const metadata: Metadata = {
  title: "Profile",
};

export default function CollectorProfilePage() {
  return <ProfileView />;
}