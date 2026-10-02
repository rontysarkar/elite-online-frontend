import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Elite Online — Fast Internet Service",
  description:
    "Blazing fast broadband internet for home and business.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}