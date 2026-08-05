import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { themeBootScript } from "@/lib/theme";
import { brand } from "@/app/content/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://systemsummit.com"),
  title: {
    default: "System Summit · Digital Architects for Diplomacy",
    template: "%s · System Summit",
  },
  description:
    "System Summit builds the digital backbone for Model UN conferences: custom sites, delegate registration & payments, an EB dashboard, and an AI-assisted Merit-Logic Allotment Engine. Proper infrastructure for every MUN, affordably.",
  keywords: [
    "MUN",
    "Model United Nations",
    "conference website",
    "delegate registration",
    "country allotment",
  ],
  openGraph: {
    title: "System Summit · Digital Architects for Diplomacy",
    description:
      "Digital infrastructure built exclusively for Model UN conferences. Get a website for your MUN.",
    type: "website",
    siteName: brand.name,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0C2454" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
