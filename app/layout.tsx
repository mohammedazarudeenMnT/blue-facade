import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Blufacade | Inspiring Skylines - Premium Facade Solutions",
  description:
    "Blufacade specializes in innovative, high-quality facade solutions including ACP, structural glazing, aluminium doors & windows, HPL, and spider glazing.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://www.blufacade.com"),
  openGraph: {
    title: "Blufacade | Inspiring Skylines",
    description: "Premium facade solutions that redefine the visual identity of modern buildings.",
    url: "https://www.blufacade.com",
    siteName: "Blufacade",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blufacade | Inspiring Skylines",
    description: "Premium facade solutions that redefine the visual identity of modern buildings.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#014a74" />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
