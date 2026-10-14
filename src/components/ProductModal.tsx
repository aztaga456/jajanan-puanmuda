"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, Check, Star, ShieldCheck } from "lucide-react";

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    addToCart(item, quantity, note);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Header */}
        <div className="relative w-full h-64 bg-amber-950/20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}
          {item.label && (
            <div className="absolute top-4 left-4 bg-[#B3121B] text-[#FFC62B] text-xs font-black px-3 py-1 rounded-full shadow-md">
              ★ {item.label}
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-yellow-300 text-xs font-bold mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span>{item.rating} / 5.0</span>
              <span className="text-white/80">· Suela, Lombok Timur</span>
            </div>
            <h3 className="font-display text-2xl font-black">{item.name}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-[#B3121B]">
                Rp{item.price.toLocaleString("id-ID")}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  Rp{item.originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-100 text-[#4A2A17] font-bold uppercase">
              {item.category}
            </span>
          </div>

          <p className="text-sm text-[#4A2A17]/85 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Ingredients if available */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mb-4 pt-3 border-t border-amber-100">
              <h4 className="text-xs font-extrabold uppercase text-[#4A2A17]/70 tracking-wider mb-2">
                Komposisi & Keunggulan
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs bg-amber-50 text-[#4A2A17] border border-amber-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#B3121B]" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes input */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-[#4A2A17] mb-1.5">
              Catatan Khusus (Opsional):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Saus mentai dipisah, sambal banyak, jangan terlalu pedas"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-[#B3121B] bg-white text-[#4A2A17]"
            />
          </div>

          {/* Quantity and Add to Cart action */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-amber-200 rounded-full bg-white p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A2A17] hover:bg-amber-100 transition-colors"
                aria-label="Kurang"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-9 text-center font-display font-black text-base text-[#4A2A17]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A2A17] hover:bg-amber-100 transition-colors"
                aria-label="Tambah"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-display font-black text-sm sm:text-base shadow-lg transition-all ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#FFC62B] hover:bg-[#FFD452] text-[#4A2A17] hover:scale-102 active:scale-98"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-[#B3121B]" />
                  <span>
                    + Tambah (Rp{(item.price * quantity).toLocaleString("id-ID")})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
