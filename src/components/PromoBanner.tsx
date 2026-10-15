"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, ArrowRight, Tag } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const PromoBanner: React.FC = () => {
  const { siteContent } = useApp();

  return (
    <section id="promo" className="pt-36 sm:pt-44 pb-16 bg-[#FAF3E3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Rounded Crimson Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#9A0F16] via-[#B3121B] to-[#C41520] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-[0_20px_50px_rgba(179,18,27,0.3)] border-2 border-red-800/40">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

          {/* Sparkles */}
          <div className="absolute top-8 right-1/3 text-[#FFC62B] text-2xl font-bold animate-pulse pointer-events-none select-none">
            ✦
          </div>
          <div className="absolute bottom-8 right-1/4 text-amber-200 text-xl font-bold animate-float pointer-events-none select-none">
            ★
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-yellow-300/40 mb-3 text-xs font-bold text-[#FFC62B]">
                <Tag className="w-3.5 h-3.5" />
                <span>{siteContent.promoBadge}</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-3">
                {siteContent.promoTitle} <br />
                <span className="text-[#FFC62B]">{siteContent.promoHighlight}</span>
              </h2>

              {/* Subtext */}
              <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                {siteContent.promoDesc}
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${siteContent.businessPhoneRaw || "6281928034054"}?text=${encodeURIComponent(
                    `Halo Jajanan Puanmuda, saya ingin klaim ${siteContent.promoTitle} ${siteContent.promoHighlight}!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-[#B3121B]" />
                  <span>{siteContent.promoButtonText || "Klaim Promo WhatsApp"}</span>
                </a>

                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 text-white hover:text-yellow-200 text-sm font-bold underline underline-offset-4 transition-colors"
                >
                  <span>Lihat Syarat & Menu Lain</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-2xl overflow-hidden border-4 border-amber-300/40 shadow-2xl bg-amber-950/40">
                <Image
                  src={siteContent.promoImage || "/images/834420764_122221420862590268_1386869829820128574_n.jpg"}
                  alt="Promo Dimsum Star 10K"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Stamp */}
                <div className="absolute bottom-3 left-3 bg-[#B3121B] text-[#FFC62B] border border-amber-300/50 px-3 py-1.5 rounded-xl font-display font-black text-xs shadow-md">
                  ★ Dimsum Favorit Semua!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
