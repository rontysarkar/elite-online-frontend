"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetMe } from "@/hooks";

export default function HeroSectionButton() {
  const { data, isLoading } = useGetMe();
  console.log(data);
  if (isLoading) {
    return ;
  }
  return !isLoading && !data ? (
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
      <Button nativeButton={false} render={<Link href="#packages" />}>
        View Packages
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <Button nativeButton={false} render={<Link href="/request-connection" />}>
        Request Connection
      </Button>
    </div>
  ) : (
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"></div>
  );
}
