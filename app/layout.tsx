import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EuroBot Hub - Europejskie Centrum Robotów Humanoidalnych",
  description: "Zaufane źródło informacji o robotach humanoidalnych w Europie. Bezpieczeństwo, GDPR, porównania i ekspertyzę.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
