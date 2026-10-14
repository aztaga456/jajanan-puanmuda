"use client";

import React from "react";
import { ShoppingCart, MessageCircle, Truck } from "lucide-react";

export const CaraPesanSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <ShoppingCart className="w-8 h-8 text-[#B3121B]" />,
      title: "Pilih Menu & Paket",
      desc: "Telusuri etalase digital kami, pilih varian dimsum, risol, mie, atau paket acara favoritmu, lalu tambahkan ke keranjang.",
    },
    {
      num: "02",
      icon: <MessageCircle className="w-8 h-8 text-[#B3121B]" />,
      title: "Kirim Ringkasan via WhatsApp",
      desc: "Buka keranjang pesanan, isi nama dan alamat, lalu klik tombol kirim. Format pesanan dan estimasi ongkir otomatis tersusun rapi.",
    },
    {
      num: "03",
      icon: <Truck className="w-8 h-8 text-[#B3121B]" />,
      title: "Konfirmasi & Diantar Hangat",
      desc: "Admin akan mengonfirmasi total biaya dan estimasi waktu. Pesananmu segera dimasak fresh dan diantar langsung ke lokasimu!",
    },
  ];

  return (
    <section id="cara-pesan" className="py-20 sm:py-24 bg-white border-y border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#B3121B] font-display font-black text-xs uppercase tracking-widest mb-1.5 block">
            ✦ MUDAH & CEPAT ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2A17]">
            Cara Pemesanan Praktis
          </h2>
          <p className="font-script text-2xl sm:text-3xl font-bold text-[#B3121B] mt-1">
            Hanya 3 Langkah Sederhana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative bg-[#FAF3E3] rounded-3xl p-8 border-2 border-amber-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 right-6 bg-[#B3121B] text-[#FFC62B] font-display font-black text-sm px-3.5 py-1 rounded-full shadow-md">
                Langkah {step.num}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 rounded-2xl bg-white shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-amber-200">
                {step.icon}
              </div>

              <h3 className="font-display text-xl font-black text-[#4A2A17] mb-3">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4A2A17]/80 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
