"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export const FloatingCartButton: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-3 bg-[#B3121B] hover:bg-[#8E0F0F] text-white px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(179,18,27,0.45)] hover:shadow-[0_14px_40px_rgba(179,18,27,0.6)] transition-all hover:scale-105 active:scale-95 border-2 border-[#FFC62B] group"
        aria-label="Buka Keranjang Pesanan"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-[#FFC62B]" />
          <span className="absolute -top-2 -right-2 bg-[#FFC62B] text-[#4A2A17] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider">
            Keranjang ({totalItems})
          </span>
          <span className="font-display font-black text-sm text-white">
            Rp{subtotal.toLocaleString("id-ID")}
          </span>
        </div>

        <span className="bg-[#FFC62B] text-[#4A2A17] font-display font-extrabold text-xs px-3 py-1 rounded-full group-hover:bg-[#FFD452] transition-colors ml-1">
          Bayar
        </span>
      </button>
    </div>
  );
};
