"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Truck, Award, Heart, CheckCircle2, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const HeroSection: React.FC = () => {
  const { siteContent } = useApp();

  const renderFoodPlatter = () => (
    <div className="relative w-full max-w-[480px] lg:max-w-[560px] mx-auto animate-float group">
      {/* Subtle Warm Amber Glow Behind Foods */}
      <div className="absolute inset-0 m-auto w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-amber-400/20 via-red-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Seamless Cutout Presentation (No Box / No Border Frame) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
        <Image
          src={siteContent.heroImage || "/images/hero-food-cutout.png"}
          alt="Jajanan Puanmuda Cemilan Kekinian Platter"
          fill
          priority
          className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Floating Starburst Badge "Harga Star 10K" */}
      <div className="absolute -top-3 -right-2 sm:top-2 sm:right-4 z-20 animate-float-delayed">
        <div className="starburst-badge w-20 h-20 sm:w-24 sm:h-24 shadow-2xl flex flex-col items-center justify-center p-2 text-center transform rotate-12 hover:rotate-0 transition-transform cursor-pointer">
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
            Harga Star
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#FFC62B] leading-none drop-shadow-md">
            10K
          </span>
          <span className="text-[8px] sm:text-[9px] text-amber-100 font-semibold">
            Dimsum
          </span>
        </div>
      </div>

      {/* Floating Leaf SVGs */}
      <div className="absolute -left-2 bottom-8 text-emerald-400 drop-shadow-md pointer-events-none select-none text-2xl animate-pulse">
        🍃
      </div>
      <div className="absolute right-6 bottom-4 text-emerald-400 drop-shadow-md pointer-events-none select-none text-xl animate-float">
        🌿
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{
        background:
          "linear-gradient(110deg, #360508 0%, #54080D 30%, #7A0D13 65%, #9E1018 100%)",
      }}
    >
      {/* Background Lighting & Depth (Overflow isolated to prevent page scroll while allowing floating bar overlap) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-950/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Sparkles & Leaves matching reference */}
        <div className="absolute top-36 left-10 text-[#FFC62B] text-2xl font-bold animate-pulse pointer-events-none select-none">
          ✦
        </div>
        <div className="absolute bottom-40 left-1/4 text-amber-200 text-lg font-bold animate-float-delayed pointer-events-none select-none">
          ★
        </div>
        <div className="absolute top-48 right-1/3 text-[#FFC62B] text-3xl font-bold animate-float pointer-events-none select-none">
          ✦
        </div>
        <div className="absolute top-1/4 right-10 text-[#FFC62B] text-xl font-bold animate-pulse pointer-events-none select-none">
          ★
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headline, Tagline, & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-yellow-300/30 mb-4 shadow-sm">
              <span className="text-[#FFC62B] text-xs font-bold">✦</span>
              <span className="text-yellow-200 font-display font-bold text-xs uppercase tracking-wider">
                Cemilan Kekinian No. 1 di Suela
              </span>
              <span className="text-[#FFC62B] text-xs font-bold">✦</span>
            </div>

            {/* Main Headline */}
            <h1 className="leading-[1.05] tracking-tight drop-shadow-md">
              <span className="font-script italic font-bold text-[#FFC62B] text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] block -rotate-1 drop-shadow-sm leading-none">
                {siteContent.heroTitleLine1}
              </span>
              <span className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] block tracking-tight mt-1">
                {siteContent.heroTitleLine2}
              </span>
            </h1>

            {/* Tagline Accent matching brand identity */}
            <div className="mt-4 mb-4 sm:mb-8 flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFC62B] text-[#4A2A17] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-md">
                {siteContent.heroTagline}
              </span>
              <span className="font-script text-2xl sm:text-3xl text-amber-200 font-bold -rotate-2 drop-shadow-sm">
                Bikin Nagih!
              </span>
            </div>

            {/* Mobile-Only Hero Food Cutout (Renders ABOVE action buttons on mobile screens) */}
            <div className="block lg:hidden w-full my-5 py-1">
              {renderFoodPlatter()}
            </div>

            {/* Action Buttons (Yellow Pill + WhatsApp Order Now Pill) */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_8px_25px_rgba(255,198,43,0.4)] hover:shadow-[0_12px_30px_rgba(255,198,43,0.6)] transition-all hover:scale-105 active:scale-95 border-2 border-yellow-200"
              >
                <span>Lihat Menu Pilihan</span>
                <ArrowRight className="w-4 h-4 text-[#B3121B]" />
              </a>

              <a
                href={`https://wa.me/${siteContent.businessPhoneRaw || "6281928034054"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/25 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs">
                  <Phone className="w-3 h-3" />
                </div>
                <span>Order Now ({siteContent.businessPhone})</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-5 border-t border-white/10 text-white/75 text-xs sm:text-sm">
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

          {/* Right Column: Desktop Only Food Cutout (Centered side-by-side on desktop) */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center pt-4 lg:pt-0">
            {renderFoodPlatter()}
          </div>
        </div>
      </div>

      {/* Floating Quick Features Bar (Overlapping Bottom) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 -mb-20 sm:-mb-24 md:-mb-28 relative z-20">
        <div className="bg-white rounded-3xl sm:rounded-full p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#EEDFCA] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Feature 1: Fast Delivery */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-xs sm:text-sm text-[#4A2A17]">
                PENGIRIMAN CEPAT
              </span>
              <span className="text-[11px] sm:text-xs text-[#4A2A17]/70 font-medium">
                Area Suela & Lombok Timur
              </span>
            </div>
          </div>

          <div className="hidden md:block h-10 w-px bg-amber-200/80" />

          {/* Feature 2: 100% Quality & Halal */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-xs sm:text-sm text-[#4A2A17]">
                100% BAHAN PILIHAN
              </span>
              <span className="text-[11px] sm:text-xs text-[#4A2A17]/70 font-medium">
                Daging Segar, Higienis & Halal
              </span>
            </div>
          </div>

          <div className="hidden md:block h-10 w-px bg-amber-200/80" />

          {/* Feature 3: Authentic Taste */}
          <div className="flex items-center gap-3.5 w-full md:w-auto px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-yellow-100 text-[#B3121B] flex items-center justify-center shrink-0 shadow-inner">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#B3121B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-extrabold text-xs sm:text-sm text-[#4A2A17]">
                RASA OTENTIK NAGIH
              </span>
              <span className="text-[11px] sm:text-xs text-[#4A2A17]/70 font-medium">
                Bumbu Melimpah & Gurih Meleleh
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <a
            href="#menu"
            className="w-full md:w-auto inline-flex items-center justify-center bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-xs sm:text-sm px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            ORDER SEKARANG
          </a>
        </div>
      </div>

      {/* Smooth Bottom Ombre Gradient Transition to Section Below */}
      <div
        className="absolute -bottom-1 left-0 right-0 h-48 sm:h-64 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(54, 5, 8, 0) 0%, rgba(54, 5, 8, 0.4) 30%, rgba(138, 17, 24, 0.35) 60%, rgba(250, 243, 227, 0.75) 85%, #FAF3E3 100%)",
        }}
      />
    </section>
  );
};
