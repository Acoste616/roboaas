import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EuroBot Hub - Europejskie Centrum Robotów Humanoidalnych",
  description: "Zaufane źródło informacji o robotach humanoidalnych w Europie. Bezpieczeństwo, GDPR, porównania i ekspertyzę.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout must return children only (html/body in [locale]/layout.tsx)
  return <>{children}</>;
}
