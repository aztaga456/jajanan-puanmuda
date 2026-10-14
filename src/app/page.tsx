"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PromoBanner } from "@/components/PromoBanner";
import { MenuSection } from "@/components/MenuSection";
import { RisolShowcase } from "@/components/RisolShowcase";
import { PreOrderSection } from "@/components/PreOrderSection";
import { CaraPesanSection } from "@/components/CaraPesanSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingCartButton } from "@/components/FloatingCartButton";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF3E3] text-[#4A2A17] flex flex-col font-sans selection:bg-[#FFC62B] selection:text-[#4A2A17]">
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Main Content Flow matching UI.jpg */}
        <main className="flex-1">
          {/* 1. Hero Section + Overlapping Floating Feature Bar */}
          <HeroSection />

          {/* 2. Middle Promo Banner Card (UI.jpg Section 2) */}
          <PromoBanner />

          {/* 3. Featured Menu Catalog Grid (UI.jpg Section 3: Red, Yellow, Cream cards) */}
          <MenuSection />

          {/* 4. Aneka Rasa Risol Showcase (UI.jpg Section 4 bottom yellow transition) */}
          <RisolShowcase />

          {/* 5. Pre-Order & Paket Acara (Arisan, Meeting Kantor, Katering) */}
          <PreOrderSection />

          {/* 6. Cara Pemesanan 3 Langkah Praktis */}
          <CaraPesanSection />

          {/* 7. Outlet Suela & Area Pengantaran Lombok Timur */}
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Slide-Over Cart Drawer & Floating Checkout Button */}
        <CartDrawer />
        <FloatingCartButton />
      </div>
    </CartProvider>
  );
}
