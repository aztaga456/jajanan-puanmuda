"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Truck, Award, Heart, CheckCircle2, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/data/menuData";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-[#B3121B] overflow-hidden">
      {/* Background radial lighting effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-red-950/40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Sparkles matching UI.jpg and poster */}
      <div className="absolute top-36 left-12 text-[#FFC62B] text-2xl font-bold animate-pulse pointer-events-none select-none">
        ✦
      </div>
      <div className="absolute bottom-40 left-1/3 text-[#FFC62B] text-xl font-bold animate-float-delayed pointer-events-none select-none">
        ★
      </div>
      <div className="absolute top-44 right-1/4 text-amber-200 text-3xl font-bold animate-float pointer-events-none select-none">
        ✦
      </div>
      <div className="absolute top-1/3 right-8 text-[#FFC62B] text-2xl font-bold animate-pulse pointer-events-none select-none">
        ★
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Call To Action (Matching UI.jpg typography & layout) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Tag / Kicker in Yellow Script & Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-yellow-300/40 mb-4 shadow-sm">
              <span className="text-[#FFC62B] text-sm font-bold">✦</span>
              <span className="text-yellow-200 font-display font-bold text-xs uppercase tracking-wider">
                Cemilan Kekinian No. 1 di Suela
              </span>
              <span className="text-[#FFC62B] text-sm font-bold">✦</span>
            </div>

            {/* Main Headline (Styling identical to UI.jpg: Large, punchy, white bold display font) */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black text-white leading-[1.08] tracking-tight drop-shadow-md">
              Jajanan <br className="hidden sm:inline" />
              <span className="text-white">Puan Muda</span>
            </h1>

            {/* Handwritten Script Tagline Accent (From banner: "Cemilan Kekinian - Cobain sekarang, dijamin ketagihan!") */}
            <div className="mt-2.5 mb-4">
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#FFC62B] font-bold tracking-wide drop-shadow-sm block -rotate-1">
                Cemilan Kekinian
              </span>
              <span className="text-white/95 text-base sm:text-lg font-medium italic mt-1 block">
                Cobain sekarang, dijamin ketagihan!
              </span>
            </div>

            {/* Description Subtext */}
            <p className="text-white/85 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Pilihan lengkap aneka <strong>Dimsum Mentai lumer</strong>,{" "}
              <strong>Risol aneka rasa renyah</strong>, Mie Jebew pedas gurih, dan Es Teler segar.
              Dibuat fresh setiap hari dengan bahan berkualitas tinggi di Suela, Lombok Timur.
            </p>

            {/* Action Buttons (UI.jpg Yellow Pill Button + Secondary WhatsApp Call Button) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-base sm:text-lg px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(255,198,43,0.45)] hover:shadow-[0_12px_32px_rgba(255,198,43,0.6)] transition-all hover:scale-105 active:scale-95 border-2 border-yellow-200"
              >
                <span>Lihat Menu Pilihan</span>
                <ArrowRight className="w-5 h-5 text-[#B3121B]" />
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>Order Now ({BUSINESS_INFO.phone})</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/15 text-white/80 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FFC62B]" /> 100% Halal
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FFC62B]" /> Daging Pilihan
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FFC62B]" /> Tanpa Pengawet
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#FFC62B]" /> Outlet Suela
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Matching UI.jpg hero food platter on wooden base) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Circular Glow Under Platter */}
            <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-amber-400/30 to-red-500/20 blur-2xl pointer-events-none" />

            {/* Outer Circular Frame & Hero Food Composition */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              {/* Steamer / Platter Image with Floating Leaves & Badges */}
              <div className="relative w-[300px] sm:w-[400px] lg:w-[440px] aspect-square rounded-full p-3 bg-gradient-to-b from-amber-200/40 via-amber-700/20 to-black/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-sm group">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-300/40 shadow-inner">
                  <Image
                    src="/images/834420764_122221420862590268_1386869829820128574_n.jpg"
                    alt="Dimsum Mentai Lezat Jajanan Puanmuda"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle steam/gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating "Harga Star 10K" Starburst Badge (Exactly like poster reference) */}
                <div className="absolute -top-3 -right-3 sm:top-2 sm:right-2 z-20 animate-float">
                  <div className="starburst-badge w-24 h-24 sm:w-28 sm:h-28 shadow-2xl flex flex-col items-center justify-center p-2 text-center transform rotate-12 hover:rotate-0 transition-transform">
                    <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-tighter">
                      Harga Star
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#FFC62B] leading-none drop-shadow-md">
                      10K
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-amber-100 font-semibold">
                      Dimsum Pilihan
                    </span>
                  </div>
                </div>

                {/* Floating Bottom Badge: "Rasa Istimewa Setiap Gigitan" */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 z-20 animate-float-delayed">
                  <div className="bg-[#FAF3E3] text-[#4A2A17] px-4 py-2 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#B3121B] text-[#FFC62B] flex items-center justify-center font-bold text-sm">
                      🥟
                    </div>
                    <div>
                      <p className="text-xs font-extrabold font-display leading-tight">
                        Rasa Istimewa
                      </p>
                      <p className="text-[10px] text-red-900/80 font-script font-bold text-xs">
                        Setiap Gigitan ♡
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Mint Leaf Decorative SVGs matching reference */}
                <div className="absolute -left-6 top-1/3 text-emerald-400 drop-shadow-md pointer-events-none select-none text-3xl">
                  🍃
                </div>
                <div className="absolute -right-4 bottom-1/4 text-emerald-400 drop-shadow-md pointer-events-none select-none text-2xl">
                  🌿
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Quick Features Bar (Identical to UI.jpg's white floating pill bar) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 -mb-24 sm:-mb-28 relative z-20">
        <div className="bg-white rounded-3xl sm:rounded-full p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#EEDFCA] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Feature 1: Fast Delivery */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Truck className="w-6 h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#4A2A17]">
                PENGIRIMAN CEPAT
              </span>
              <span className="text-xs text-[#4A2A17]/70 font-medium">
                Area Suela & Lombok Timur
              </span>
            </div>
          </div>

          <div className="hidden md:block h-10 w-px bg-amber-200/80" />

          {/* Feature 2: 100% Quality & Halal */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-6 h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#4A2A17]">
                100% BAHAN PILIHAN
              </span>
              <span className="text-xs text-[#4A2A17]/70 font-medium">
                Daging Segar, Higienis & Halal
              </span>
            </div>
          </div>

          <div className="hidden md:block h-10 w-px bg-amber-200/80" />

          {/* Feature 3: Authentic Taste */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Heart className="w-6 h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-sm sm:text-base text-[#4A2A17]">
                RASA OTENTIK NAGIH
              </span>
              <span className="text-xs text-[#4A2A17]/70 font-medium">
                Bumbu Melimpah & Gurih Meleleh
              </span>
            </div>
          </div>

          {/* Right Action Button (UI.jpg yellow pill) */}
          <a
            href="#menu"
            className="w-full md:w-auto inline-flex items-center justify-center bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            ORDER SEKARANG
          </a>
        </div>
      </div>
    </section>
  );
};
