import type { Metadata, Viewport } from "next";
import "../index.css";

export const metadata: Metadata = {
  title:
    "Tojammel Hoque — Full-Stack Web Developer | Modern Websites for Businesses",
  description:
    "I design and develop modern, fast and conversion-focused websites for businesses, founders, coaches, consultants and growing brands.",
  openGraph: {
    title:
      "Tojammel Hoque — Full-Stack Web Developer | Modern Websites for Businesses",
    description:
      "I design and develop modern, fast and conversion-focused websites for businesses, founders, coaches, consultants and growing brands.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
