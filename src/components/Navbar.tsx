"use client";

import React, { useState, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu as MenuIcon, X, PhoneCall } from "lucide-react";
import { BUSINESS_INFO } from "@/data/menuData";

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#hero" },
    { name: "Menu Favorit", href: "#menu" },
    { name: "Promo 10K", href: "#promo" },
    { name: "Aneka Risol", href: "#risol-showcase" },
    { name: "Pre-Order Acara", href: "#preorder" },
    { name: "Cara Pesan", href: "#cara-pesan" },
    { name: "Kontak & Lokasi", href: "#lokasi" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#9E0F17]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-red-900/40"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <BrandLogo variant="horizontal" theme="light" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-[#FFC62B] text-sm font-semibold tracking-wide transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FFC62B] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 border border-white/20"
              aria-label="Keranjang Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-[#FFC62B]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFC62B] text-[#4A2A17] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Direct Order Now Yellow Pill Button (Identical to UI.jpg) */}
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-extrabold text-sm px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(255,198,43,0.4)] hover:shadow-[0_6px_20px_rgba(255,198,43,0.6)] transition-all hover:scale-105 active:scale-95 border border-yellow-300"
            >
              <PhoneCall className="w-4 h-4 text-[#B3121B]" />
              <span>Pesan Sekarang</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Menu Navigasi"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#8E0F0F] border-b border-red-950/60 px-6 py-5 shadow-2xl transition-all animate-in slide-in-from-top">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#FFC62B] font-semibold text-base py-2 border-b border-red-800/40"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-extrabold text-base py-3 rounded-full shadow-lg"
              >
                Pesan via WhatsApp (0819 2803 4054)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
