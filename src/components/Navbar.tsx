"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { useApp } from "@/context/AppContext";
import { ShoppingBag, Menu as MenuIcon, X, Settings } from "lucide-react";

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { siteContent } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu Favorit", href: "#menu" },
    { name: "Pre-Order Acara", href: "#preorder" },
    { name: "Cara Pesan", href: "#cara-pesan" },
    { name: "Kontak & Lokasi", href: "#lokasi" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Suspended Capsule / Pill Navbar ("navbar lebih minimalis menggantung") */}
      <div
        className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 border shadow-[0_15px_35px_rgba(0,0,0,0.4)] ${
          isScrolled
            ? "bg-[#660B0F]/95 backdrop-blur-md border-red-400/30 scale-[0.98]"
            : "bg-[#7D0E14]/90 backdrop-blur-sm border-white/20"
        }`}
      >
        {/* Brand Name: "hanya jajanan (tulisan keci miring) dan PUANMUDA (dibawahnya)" */}
        <a href="#hero" className="flex items-center gap-2 group shrink-0">
          <BrandLogo variant="navbarMinimal" theme="light" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/85 hover:text-[#FFC62B] text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Panel Link */}
          <Link
            href="/admin"
            title="Buka Panel Admin"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/15"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* Cart Icon in Glass Circle Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 border border-white/20 shrink-0"
            aria-label="Keranjang Pesanan"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC62B]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFC62B] text-[#4A2A17] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>



          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-2 pointer-events-auto bg-[#660B0F]/98 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#FFC62B] font-semibold text-sm py-2 border-b border-white/10"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-amber-300 font-bold text-sm py-2 flex items-center gap-2 border-b border-white/10"
            >
              <Settings className="w-4 h-4" />
              <span>Panel Admin (Kelola Konten & Data)</span>
            </Link>
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteContent.businessPhoneRaw || "6281928034054"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm py-2.5 rounded-full shadow-md"
              >
                Pesan via WhatsApp ({siteContent.businessPhone})
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
