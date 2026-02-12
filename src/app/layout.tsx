import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Setembro.net",
    default: "Setembro.net - Tech Solutions & AI Hub",
  },
  description: "Soluções avançadas de tecnologia, integração de IA e desenvolvimento de sistemas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://setembro.net",
    siteName: "Setembro.net",
    title: "Setembro.net - Tech Solutions & AI Hub",
    description: "Soluções avançadas de tecnologia, integração de IA e desenvolvimento de sistemas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setembro.net - Tech Solutions & AI Hub",
    creator: "@setembronet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Pular para o conteúdo principal
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
