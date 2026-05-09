import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Letterhead Editor",
  description: "Create and edit documents with custom letterhead",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
