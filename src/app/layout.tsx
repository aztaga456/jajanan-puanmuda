import type { Metadata } from "next";
import { Fredoka, Poppins, Caveat } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jajananpuanmuda.com"),
  title: "Jajanan Puanmuda — Cemilan Kekinian Suela | Dimsum, Risol, Mie Jebew",
  description:
    "Etalase resmi dan pemesanan online Jajanan Puanmuda di Suela, Lombok Timur. Nikmati aneka Dimsum Mentai, Risol Aneka Rasa, Mie Jebew, dan Paket Acara. Order via WhatsApp 0819-2803-4054.",
  keywords: [
    "Jajanan Puanmuda",
    "Dimsum Mentai Suela",
    "Risol Mayo Lombok Timur",
    "Cemilan Kekinian Lombok",
    "Mie Jebew",
    "Paket Arisan Snack Box",
  ],
  openGraph: {
    title: "Jajanan Puanmuda — Cemilan Kekinian",
    description: "Cobain sekarang, dijamin ketagihan! Pesan langsung via WhatsApp.",
    url: "https://jajananpuanmuda.com",
    siteName: "Jajanan Puanmuda",
    images: [
      {
        url: "/images/662279887_122199867620590268_6738119228535683969_n.jpg",
        width: 1200,
        height: 630,
        alt: "Jajanan Puanmuda Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

import { ClientProviders } from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${poppins.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF3E3] text-[#4A2A17] font-sans antialiased selection:bg-[#FFC62B] selection:text-[#4A2A17]">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
