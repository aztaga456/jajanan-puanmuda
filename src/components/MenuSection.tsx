"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { useApp } from "@/context/AppContext";
import { ProductModal } from "./ProductModal";
import { Plus, Search, Filter, Sparkles, Check, Eye } from "lucide-react";

export const MenuSection: React.FC = () => {
  const { addToCart } = useCart();
  const { menuItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "low" | "high">("default");
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: "semua", label: "Semua Menu" },
    { id: "dimsum", label: "Dimsum Spesial" },
    { id: "risol", label: "Aneka Risol" },
    { id: "mie", label: "Mie Jebew" },
    { id: "camilan", label: "Burger & Camilan" },
    { id: "minuman", label: "Minuman Segar" },
    { id: "paket", label: "Paket Acara" },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === "semua" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1000);
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#FAF3E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container (Directly modeled on UI.jpg's big white rounded container) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[#EBD8BE]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[#B3121B] font-display font-black text-xs sm:text-sm tracking-widest uppercase mb-1.5 block">
              ✦ MENU TERLENGKAP ✦
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2A17] tracking-tight leading-tight">
              Lezatnya Setiap Gigitan
            </h2>
            <p className="font-script text-2xl sm:text-3xl text-[#B3121B] font-bold mt-1 mb-3">
              Jajanan Favorit Semua! ♡
            </p>
            <p className="text-[#4A2A17]/75 text-sm sm:text-base leading-relaxed">
              Pilih cemilan favoritmu langsung dari etalase. Seluruh menu disiapkan fresh setiap hari dengan bahan pilihan dan bumbu otentik.
            </p>
          </div>

          {/* Search, Filter, and Sort Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-amber-100">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#B3121B] text-white shadow-md scale-105"
                      : "bg-[#FAF3E3] text-[#4A2A17] hover:bg-amber-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2 rounded-full border border-amber-200 bg-[#FAF3E3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Urutkan menu berdasarkan harga atau rekomendasi"
                className="text-xs sm:text-sm px-3 py-2 rounded-full border border-amber-200 bg-[#FAF3E3] focus:outline-none font-medium text-[#4A2A17] cursor-pointer"
              >
                <option value="default">Rekomendasi</option>
                <option value="low">Harga Terendah</option>
                <option value="high">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Product Grid (UI.jpg 3-Card Signature Pattern: Red, Yellow, Cream) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              // Alternate background styling matching UI.jpg's red / yellow / cream cards
              const themeIndex = index % 3;
              const cardTheme =
                themeIndex === 0 ? "red" : themeIndex === 1 ? "yellow" : "cream";

              const isRed = cardTheme === "red";
              const isYellow = cardTheme === "yellow";
              const isCream = cardTheme === "cream";

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className={`group relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                    isRed
                      ? "bg-gradient-to-b from-[#B3121B] to-[#990F16] text-white shadow-[0_12px_30px_rgba(179,18,27,0.25)] hover:shadow-[0_20px_40px_rgba(179,18,27,0.4)]"
                      : isYellow
                      ? "bg-gradient-to-b from-[#FFC62B] to-[#F2B516] text-[#4A2A17] shadow-[0_12px_30px_rgba(255,198,43,0.3)] hover:shadow-[0_20px_40px_rgba(255,198,43,0.45)]"
                      : "bg-[#FAF3E3] text-[#4A2A17] border-2 border-[#ECD9BF] shadow-[0_12px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  }`}
                >
                  {/* Card Top Label */}
                  <div className="flex items-center justify-between mb-3 z-10">
                    {item.label ? (
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
                          isRed
                            ? "bg-[#FFC62B] text-[#4A2A17]"
                            : isYellow
                            ? "bg-[#B3121B] text-white"
                            : "bg-[#B3121B] text-[#FFC62B]"
                        }`}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        isRed ? "text-amber-200" : "text-[#4A2A17]/80"
                      }`}
                    >
                      ★ {item.rating}
                    </span>
                  </div>

                  {/* Food Image Container */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-black/10 shadow-inner group-hover:scale-[1.03] transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-[#4A2A17] font-display text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Lihat Detail
                      </span>
                    </div>
                  </div>

                  {/* Food Content Details */}
                  <div className="flex flex-col flex-1">
                    <h3
                      className={`font-display text-xl sm:text-2xl font-black mb-1.5 leading-tight ${
                        isRed ? "text-white" : "text-[#4A2A17]"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 ${
                        isRed ? "text-white/85" : "text-[#4A2A17]/80"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom: Price and Quick Order Button (UI.jpg Pill Style) */}
                  <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isRed ? "text-amber-200" : "text-[#4A2A17]/60"
                        }`}
                      >
                        Harga
                      </span>
                      <span
                        className={`font-display text-xl sm:text-2xl font-black ${
                          isRed
                            ? "text-[#FFC62B]"
                            : isYellow
                            ? "text-[#B3121B]"
                            : "text-[#B3121B]"
                        }`}
                      >
                        Rp{item.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    {/* Button */}
                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-extrabold px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 ${
                        justAddedId === item.id
                          ? "bg-emerald-600 text-white"
                          : isRed
                          ? "bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17]"
                          : isYellow
                          ? "bg-[#B3121B] hover:bg-[#8E0F0F] text-white"
                          : "bg-[#B3121B] hover:bg-[#8E0F0F] text-white"
                      }`}
                    >
                      {justAddedId === item.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Ditambahkan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>+ Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display text-lg text-gray-500 mb-2">
                Tidak ada menu yang sesuai dengan pencarian.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("semua");
                }}
                className="text-[#B3121B] text-sm font-bold underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
};
