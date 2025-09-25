import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ParticleBackground } from "@/components/ui/particle-background";

// Secondary font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IPNOTEC.VIP - Your Future Starts Here | FUTURE 11 Event",
  description: "Join the exclusive FUTURE 11 event on January 10, 2026. Create your unique I-ID and experience the future of digital identity. Limited to 11 spots only.",
  keywords: "digital identity, I-ID, future tech, exclusive event, IPNOTEC, avatar creation",
  authors: [{ name: "IPNOTEC.VIP" }],
  creator: "IPNOTEC.VIP",
  openGraph: {
    title: "IPNOTEC.VIP - Your Future Starts Here",
    description: "Join the exclusive FUTURE 11 event on January 10, 2026. Create your unique I-ID and experience the future of digital identity.",
    url: "https://ipnotec.vip",
    siteName: "IPNOTEC.VIP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPNOTEC.VIP - Your Future Starts Here",
    description: "Join the exclusive FUTURE 11 event. Create your unique I-ID.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
