"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menuData";
import { Sparkles, Heart, Plus, Check } from "lucide-react";

export const RisolShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const risolItems = [
    {
      id: "risol-mayo",
      name: "Risol Mayo",
      subtitle: "Creamy & Gurih",
      tagColor: "bg-[#FFC62B] text-[#4A2A17]",
      borderColor: "border-amber-300",
      description:
        "Perpaduan lembutnya mayones gurih dengan isian telur rebus dan smoked beef yang lumer di mulut.",
      price: 10000,
      image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
    },
    {
      id: "risol-bolognase",
      name: "Risol Bolognase",
      subtitle: "Rasa Daging Asli",
      tagColor: "bg-[#7A1218] text-white",
      borderColor: "border-red-400",
      description:
        "Isian daging sapi cincang pilihan berpadu saus bolognase otentik rempah dan keju leleh nagih.",
      price: 10000,
      image: "/images/839167572_122222017328590268_2603683356343166522_n.jpg",
    },
    {
      id: "risol-ayam-suwir",
      name: "Risol Ayam Suwir",
      subtitle: "Ayam Suwir Pilihan Terbaik",
      tagColor: "bg-[#2D6A4F] text-white",
      borderColor: "border-emerald-400",
      description:
        "Ayam suwir gurih bumbu rempah aromatik pedas manis khas yang memanjakan lidah di setiap gigitan.",
      price: 10000,
      image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
    },
  ];

  const handleAdd = (id: string) => {
    const found = MENU_ITEMS.find((m) => m.id === id);
    if (found) {
      addToCart(found, 1);
      setAddedId(id);
      setTimeout(() => setAddedId(null), 1000);
    }
  };

  return (
    <section id="risol-showcase" className="py-20 sm:py-24 bg-[#FFC62B] text-[#4A2A17] relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header from poster reference: "Aneka Rasa Risol — Camilan Lezat, Bikin Nagih!" */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B3121B] text-[#FFC62B] text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
            ✦ 100% BAHAN PILIHAN ✦
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A2A17] tracking-tight">
            Aneka Rasa Risol
          </h2>
          <p className="font-script text-2xl sm:text-3xl font-bold text-[#8E0F0F] mt-1">
            Camilan Lezat, Bikin Nagih!
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs sm:text-sm font-bold bg-white/70 px-3 py-1 rounded-full text-[#4A2A17]">
              Kulit Renyah · Isi Melimpah · Rasa Istimewa
            </span>
          </div>
        </div>

        {/* 3-Column Risol Cards (Matching poster 4 and UI.jpg bottom section) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {risolItems.map((risol) => (
            <div
              key={risol.id}
              className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-900/10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div>
                {/* Variant Header Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-display text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm ${risol.tagColor}`}
                  >
                    {risol.name}
                  </span>
                  <span className="text-xs font-bold text-[#B3121B]">
                    Rp{risol.price.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Mouthwatering Cut-Open Photo */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-amber-50 shadow-inner group-hover:scale-102 transition-transform duration-500">
                  <Image
                    src={risol.image}
                    alt={risol.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[11px] font-bold font-script text-sm">
                    {risol.subtitle}
                  </div>
                </div>

                {/* Subtitle & Description */}
                <h3 className="font-display text-xl font-black text-[#4A2A17] mb-2">
                  {risol.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A2A17]/80 leading-relaxed mb-6">
                  {risol.description}
                </p>
              </div>

              {/* Order Button */}
              <button
                onClick={() => handleAdd(risol.id)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-display font-black text-sm shadow-md transition-all active:scale-95 ${
                  addedId === risol.id
                    ? "bg-emerald-600 text-white"
                    : "bg-[#B3121B] hover:bg-[#8E0F0F] text-white hover:shadow-lg"
                }`}
              >
                {addedId === risol.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ditambahkan ke Pesanan!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah {risol.name}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner Accent from poster: "Tiga Rasa, Satu Kenikmatan ♡" */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#4A2A17] text-amber-200 px-6 py-2.5 rounded-full shadow-lg">
            <span className="text-xs font-bold">~</span>
            <span className="font-script text-xl sm:text-2xl font-bold">
              Tiga Rasa, Satu Kenikmatan ♡
            </span>
            <span className="text-xs font-bold">~</span>
          </div>
        </div>
      </div>
    </section>
  );
};
