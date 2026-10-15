"use client";

import React from "react";
import { MapPin, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const LocationSection: React.FC = () => {
  const { siteContent, deliveryZones } = useApp();

  return (
    <section id="lokasi" className="py-20 sm:py-28 bg-[#FAF3E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#B3121B] font-display font-black text-xs uppercase tracking-widest mb-1.5 block">
            ✦ AREA JANGKAUAN & OUTLET ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2A17]">
            Outlet & Area Pengantaran
          </h2>
          <p className="font-script text-2xl sm:text-3xl font-bold text-[#B3121B] mt-1">
            Melayani Suela & Seluruh Lombok Timur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Outlet Info & Operating Hours */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#B3121B] text-[#FFC62B] flex items-center justify-center font-bold shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-[#4A2A17]">
                    Outlet {siteContent.businessName}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {siteContent.businessAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                  <Clock className="w-5 h-5 text-[#B3121B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2A17]">
                      Jam Operasional
                    </h4>
                    <p className="text-sm font-display font-bold text-[#4A2A17]">
                      {siteContent.businessHours}
                    </p>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      ● Buka Setiap Hari (Melayani Dine-in, Takeaway & Delivery)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                  <Phone className="w-5 h-5 text-[#B3121B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2A17]">
                      Pemesanan WhatsApp
                    </h4>
                    <p className="text-sm font-display font-bold text-[#4A2A17]">
                      {siteContent.businessPhone}
                    </p>
                    <span className="text-[11px] text-gray-600">
                      Respon cepat & ramah untuk tanya menu atau katering
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                  <Navigation className="w-5 h-5 text-[#B3121B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2A17]">
                      Titik Dapur / Outlet
                    </h4>
                    <p className="text-sm font-display font-bold text-[#4A2A17]">
                      Pusat Kecamatan Suela, Lombok Timur
                    </p>
                    <span className="text-[11px] text-gray-600">
                      Dekat jalur utama, mudah diakses untuk ambil pesanan langsung
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteContent.businessPhoneRaw || "6281928034054"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] font-display font-black text-sm shadow-md transition-all hover:scale-102"
            >
              <Phone className="w-4 h-4 text-[#B3121B]" />
              <span>Hubungi Admin Outlet Sekarang</span>
            </a>
          </div>

          {/* Delivery Rates & Coverage */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-100">
                <div>
                  <h3 className="font-display text-2xl font-black text-[#4A2A17]">
                    Daftar Tarif Ongkir & Estimasi
                  </h3>
                  <p className="text-xs text-gray-500">
                    Dikirim hangat dengan kemasan higienis
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                  Gratis Ongkir &gt; Rp100.000
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {deliveryZones.filter((z) => z.id !== "pickup").map((zone) => (
                  <div
                    key={zone.id}
                    className="p-4 rounded-2xl bg-[#FAF3E3] border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-[#4A2A17]">
                        {zone.name}
                      </h4>
                      <p className="text-xs text-[#4A2A17]/70">
                        Estimasi antar: <strong>{zone.estimate}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-lg text-[#B3121B]">
                        Rp{zone.fee.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[10px] bg-amber-200/80 text-[#4A2A17] font-bold px-2 py-0.5 rounded">
                        Min. Rp30K
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Delivery Guarantee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A2A17]">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B3121B] shrink-0" />
                  <span>Saus mentai & cocol dikemas terpisah agar tidak tumpah</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-[#B3121B] shrink-0" />
                  <span>Dimsum tetap hangat saat tiba di tangan pelanggan</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 text-center text-xs text-gray-500">
              *Alamat di luar daftar? Silakan chat admin untuk konfirmasi kurir khusus.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
