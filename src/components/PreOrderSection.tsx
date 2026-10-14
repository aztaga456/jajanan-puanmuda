"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Users, Gift, CheckCircle, Send, PhoneCall } from "lucide-react";
import { BUSINESS_INFO } from "@/data/menuData";

export const PreOrderSection: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState("snack-box-hemat");
  const [quantity, setQuantity] = useState(10);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const packages = [
    {
      id: "snack-box-hemat",
      name: "Snack Box Hemat (Isi 3)",
      price: 35000,
      minOrder: 5,
      items: ["1x Risol Mayo Creamy", "1x Risol Ayam Suwir Gurih", "1x Dimsum Original Kukus", "Box Cantik & Tisu"],
      suitableFor: "Rapat Kantor, Seminar, Pengajian, Study Tour",
      image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
    },
    {
      id: "paket-arisan-10org",
      name: "Paket Arisan Meriah (10 Orang)",
      price: 275000,
      minOrder: 1,
      items: ["5 Porsi Dimsum Mentai Bakar", "10 Risol Campur Aneka Rasa", "10 Cup Es Teler Segar Spesial", "Saus Cocol & Kemasan"],
      suitableFor: "Arisan Keluarga, Ulang Tahun, Kumpul Bestie",
      image: "/images/662279887_122199867620590268_6738119228535683969_n.jpg",
    },
    {
      id: "hampers-spesial",
      name: "Hampers Eksklusif Dimsum & Risol",
      price: 150000,
      minOrder: 1,
      items: ["16 Pcs Dimsum Mentai & Bakar", "8 Pcs Risol Bolognase & Mayo", "2 Botol Saus Sambal & Mentai Khas", "Pita & Greeting Card"],
      suitableFor: "Hantaran, Hadiah Sahabat, Syukuran",
      image: "/images/834420764_122221420862590268_1386869829820128574_n.jpg",
    },
  ];

  const currentPkg = packages.find((p) => p.id === selectedPackage) || packages[0];
  const totalPrice = currentPkg.price * quantity;

  const handlePreOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let text = `*PRE-ORDER ACARA & KATERING*\n`;
    text += `Jajanan Puanmuda — Suela\n`;
    text += `--------------------------------\n`;
    text += `Paket: ${currentPkg.name}\n`;
    text += `Jumlah: ${quantity} paket\n`;
    text += `Estimasi Total: Rp${totalPrice.toLocaleString("id-ID")}\n\n`;
    text += `Rincian Pengambilan:\n`;
    text += `Nama Pemesan: ${name || "-"}\n`;
    text += `Tanggal Acara: ${date || "-"}\n`;
    text += `Waktu/Jam: ${time || "-"}\n`;
    text += `Alamat/Lokasi: ${address || "Ambil di Outlet Suela"}\n`;
    if (notes) text += `Catatan Khusus: ${notes}\n`;
    text += `\nMohon dicek ketersediaan slot tanggal ini ya kak. Terima kasih!`;

    const url = `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="preorder" className="py-20 sm:py-28 bg-[#FAF3E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B3121B] text-[#FFC62B] text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
            ✦ LAYANAN KATERING & ARISAN ✦
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2A17]">
            Pre-Order & Paket Acara
          </h2>
          <p className="font-script text-2xl sm:text-3xl font-bold text-[#B3121B] mt-1">
            Siap Hadir di Setiap Momen Spesialmu!
          </p>
          <p className="text-[#4A2A17]/75 text-sm sm:text-base mt-2">
            Pesan paket snack box, hampers, dan konsumsi arisan dengan kemasan higienis, porsi melimpah, dan rasa premium khas Jajanan Puanmuda.
          </p>
        </div>

        {/* 2-Column: Left Package Cards, Right Pre-Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Package Selection Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackage(pkg.id);
                    setQuantity(pkg.minOrder);
                  }}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border-2 ${
                    isSelected
                      ? "bg-white border-[#B3121B] shadow-[0_15px_35px_rgba(179,18,27,0.15)] ring-2 ring-[#B3121B]/20"
                      : "bg-[#FFFBF2] border-amber-200/80 hover:bg-white hover:border-amber-300 shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-amber-100 shadow-sm">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-lg sm:text-xl font-black text-[#4A2A17]">
                          {pkg.name}
                        </h3>
                        <span className="font-display text-lg font-black text-[#B3121B]">
                          Rp{pkg.price.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <p className="text-xs text-amber-900/70 font-semibold mb-2 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#B3121B]" /> Cocok untuk: {pkg.suitableFor}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {pkg.items.map((it, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-amber-50 text-[#4A2A17] border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Notice Box */}
            <div className="bg-amber-100/60 border border-amber-300/80 rounded-2xl p-4 text-xs text-[#4A2A17] flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#B3121B] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Aturan Pemesanan Pre-Order:</strong>
                Pemesanan paket acara disarankan H-1 atau H-2 sebelum acara untuk memastikan ketersediaan bahan segar. Hubungi admin untuk pesanan khusus & di atas 50 porsi!
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100">
              <div className="w-10 h-10 rounded-full bg-[#B3121B] text-[#FFC62B] flex items-center justify-center font-bold">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-[#4A2A17]">
                  Formulir Pre-Order
                </h3>
                <p className="text-xs text-gray-500">
                  Langsung terhubung dengan tim admin katering
                </p>
              </div>
            </div>

            <form onSubmit={handlePreOrderSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">
                  Paket Terpilih
                </label>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 font-display font-bold text-[#4A2A17] flex items-center justify-between">
                  <span>{currentPkg.name}</span>
                  <span className="text-[#B3121B]">Rp{currentPkg.price.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">
                  Jumlah Pesanan (Minimal {currentPkg.minOrder} paket)
                </label>
                <input
                  type="number"
                  min={currentPkg.minOrder}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(currentPkg.minOrder, parseInt(e.target.value) || currentPkg.minOrder))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] font-bold text-[#4A2A17]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">
                    Tanggal Acara
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">
                    Jam Selesai/Ambil
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">
                  Nama Pemesan / Instansi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ibu Rina / Kantor Camat Suela"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">
                  Alamat / Lokasi Pengantaran
                </label>
                <input
                  type="text"
                  placeholder="Kecamatan, desa, atau patokan lokasi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Varian rasa risol, level pedas, request kartu ucapan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                />
              </div>

              {/* Total Summary */}
              <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                <span className="font-bold text-[#4A2A17]">Estimasi Total:</span>
                <span className="font-display text-2xl font-black text-[#B3121B]">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-102 active:scale-98"
              >
                <Send className="w-4 h-4 text-[#B3121B]" />
                <span>Kirim Pre-Order via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
