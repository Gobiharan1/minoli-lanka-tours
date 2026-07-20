import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://minolilankatours.com"),
  title: { default: "Minoli Lanka Tours | Private Sri Lanka Tours", template: "%s | Minoli Lanka Tours" },
  description: "Private, personalized Sri Lanka tours from a warm Kandy-based team. Day tours, round tours, wildlife, culture, highlands and beaches.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Minoli Lanka Tours",
    description: "Discover the Real Heart of Sri Lanka",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Minoli Lanka Tours — Discover the Real Heart of Sri Lanka" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
