import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Elite Online — Fast Internet Service",
  description: "Blazing fast broadband internet for home and business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
