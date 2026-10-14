"use client";

import React from "react";
import { BrandLogo } from "./BrandLogo";
import { BUSINESS_INFO } from "@/data/menuData";
import { Phone, MapPin, Clock, Heart, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#8E0F0F] text-white pt-16 pb-12 border-t-4 border-[#FFC62B] relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-red-800/60">
          {/* Col 1: Brand Info & Tagline */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <BrandLogo variant="horizontal" theme="light" className="mb-4" />
            <p className="font-script text-2xl text-[#FFC62B] font-bold mb-3">
              Cemilan Kekinian — Cobain sekarang, dijamin ketagihan!
            </p>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Etalase kuliner resmi Jajanan Puanmuda di Suela, Lombok Timur. Menyajikan aneka Dimsum Mentai, Risol Gurih, Mie Jebew, dan Paket Katering Arisan berstandar higienis dan halal.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E4405F] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-extrabold text-base text-[#FFC62B] uppercase tracking-wider mb-4">
              Navigasi Menu
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <a href="#hero" className="hover:text-[#FFC62B] transition-colors">
                  Beranda Utama
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FFC62B] transition-colors">
                  Menu Dimsum & Mentai
                </a>
              </li>
              <li>
                <a href="#promo" className="hover:text-[#FFC62B] transition-colors">
                  Promo Dimsum Star 10K
                </a>
              </li>
              <li>
                <a href="#risol-showcase" className="hover:text-[#FFC62B] transition-colors">
                  Aneka Varian Risol
                </a>
              </li>
              <li>
                <a href="#preorder" className="hover:text-[#FFC62B] transition-colors">
                  Paket Arisan & Katering
                </a>
              </li>
              <li>
                <a href="#cara-pesan" className="hover:text-[#FFC62B] transition-colors">
                  Cara Pemesanan WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Operasional */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-extrabold text-base text-[#FFC62B] uppercase tracking-wider mb-4">
              Outlet & Pemesanan
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFC62B] shrink-0 mt-0.5" />
                <span>
                  <strong>Outlet:</strong> {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFC62B] shrink-0 mt-0.5" />
                <span>
                  <strong>Jam Buka:</strong> {BUSINESS_INFO.hours}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FFC62B] shrink-0 mt-0.5" />
                <span>
                  <strong>WhatsApp Bisnis:</strong> {BUSINESS_INFO.phone}
                </span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-[11px] text-amber-200 font-bold block mb-1">
                Area Layanan Antar:
              </span>
              <span className="text-xs text-white/90">
                Suela, Aikmel, Wanasaba, Pringgabaya, Selong & Sekitarnya (Lombok Timur)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2026 Jajanan Puanmuda. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-200">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-[#FFC62B] fill-current" /> untuk pecinta kuliner
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/15 hover:bg-[#FFC62B] hover:text-[#4A2A17] text-white transition-colors"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
