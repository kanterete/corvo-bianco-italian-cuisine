import type { Metadata } from "next";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "Corvo Bianco - Italian Cuisine",
  description: "Premium Italian restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
