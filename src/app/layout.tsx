import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Forsyth County Schools | Where Tomorrow Begins",
    template: "%s | Forsyth County Schools",
  },
  description: "Forsyth County Schools serves over 54,000 students across 42 world-class schools in Forsyth County, Georgia. Safe. Connected. Thriving.",
  keywords: ["Forsyth County Schools", "Georgia schools", "education", "public schools", "Cumming GA"],
  authors: [{ name: "Forsyth County Schools" }],
  creator: "Forsyth County Schools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.forsyth.k12.ga.us",
    siteName: "Forsyth County Schools",
    title: "Forsyth County Schools | Where Tomorrow Begins",
    description: "Serving over 54,000 students across 42 world-class schools in Forsyth County, Georgia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Forsyth County Schools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forsyth County Schools | Where Tomorrow Begins",
    description: "Serving over 54,000 students across 42 world-class schools in Forsyth County, Georgia.",
    images: ["/og-image.jpg"],
    creator: "@ForsythSchools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#050505]`}
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
