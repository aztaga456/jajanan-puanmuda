"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { DELIVERY_ZONES, DeliveryZone } from "@/data/menuData";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectedZone,
    setSelectedZone,
    orderMethod,
    setOrderMethod,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    deliveryAddress,
    setDeliveryAddress,
    orderNotes,
    setOrderNotes,
    subtotal,
    deliveryFee,
    total,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    generateWhatsAppLink,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const waLink = generateWhatsAppLink();
    window.open(waLink, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] shadow-2xl flex flex-col border-l-2 border-amber-200">
          {/* Header */}
          <div className="p-5 bg-[#B3121B] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFC62B] text-[#4A2A17] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-black leading-tight">
                  Keranjang Pesanan
                </h3>
                <span className="text-xs text-amber-200 font-medium">
                  {totalItems} item dipilih
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Tutup Keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#4A2A17]/60">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4 text-3xl">
                  🥟
                </div>
                <h4 className="font-display font-extrabold text-lg text-[#4A2A17] mb-1">
                  Keranjangmu Masih Kosong
                </h4>
                <p className="text-xs text-[#4A2A17]/70 max-w-xs mb-6">
                  Yuk cobain Dimsum Mentai, Risol renyah, atau Mie Jebew pedas gurih!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#FFC62B] text-[#4A2A17] font-display font-extrabold text-xs shadow-md"
                >
                  Pilih Menu Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Daftar Menu
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Kosongkan
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="p-3.5 rounded-2xl bg-white border border-amber-200/90 shadow-sm flex items-start gap-3"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-amber-100">
                        <Image
                          src={ci.item.image}
                          alt={ci.item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-display font-bold text-sm text-[#4A2A17] truncate">
                            {ci.item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="text-gray-400 hover:text-red-600 p-0.5"
                            aria-label={`Hapus ${ci.item.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#B3121B] block mb-2">
                          Rp{(ci.item.price * ci.quantity).toLocaleString("id-ID")}
                        </span>

                        {ci.note && (
                          <p className="text-[11px] text-gray-500 italic mb-2 truncate">
                            Catatan: {ci.note}
                          </p>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(ci.item.id, ci.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-[#4A2A17]"
                            aria-label="Kurang satu"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#4A2A17]">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(ci.item.id, ci.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-[#4A2A17]"
                            aria-label="Tambah satu"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Details Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-4 border-t border-amber-200 space-y-3.5 text-xs">
                  <h4 className="font-display font-bold text-sm text-[#4A2A17]">
                    Data Pemesanan
                  </h4>

                  {/* Delivery / Pickup switcher */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-amber-100/70 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOrderMethod("antar")}
                      className={`py-2 rounded-lg font-display font-bold text-xs transition-all ${
                        orderMethod === "antar"
                          ? "bg-[#B3121B] text-white shadow"
                          : "text-[#4A2A17] hover:bg-white/50"
                      }`}
                    >
                      Antar ke Alamat
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMethod("ambil")}
                      className={`py-2 rounded-lg font-display font-bold text-xs transition-all ${
                        orderMethod === "ambil"
                          ? "bg-[#B3121B] text-white shadow"
                          : "text-[#4A2A17] hover:bg-white/50"
                      }`}
                    >
                      Ambil di Outlet
                    </button>
                  </div>

                  {/* Delivery Area Selection */}
                  {orderMethod === "antar" && (
                    <div>
                      <label className="block font-bold text-[#4A2A17] mb-1">
                        Area Pengantaran (Lombok Timur)
                      </label>
                      <select
                        value={selectedZone.id}
                        onChange={(e) => {
                          const z = DELIVERY_ZONES.find(
                            (item) => item.id === e.target.value
                          );
                          if (z) setSelectedZone(z);
                        }}
                        aria-label="Pilih area pengantaran di Lombok Timur"
                        className="w-full p-2.5 rounded-xl border border-amber-200 bg-white font-medium text-[#4A2A17] focus:outline-none focus:ring-2 focus:ring-[#B3121B]"
                      >
                        {DELIVERY_ZONES.filter((z) => z.id !== "pickup").map(
                          (zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name} (Ongkir Rp{zone.fee.toLocaleString("id-ID")})
                            </option>
                          )
                        )}
                      </select>
                      {subtotal >= selectedZone.freeMinOrder && (
                        <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                          🎉 Belanja &gt; Rp100.000: Kamu dapat GRATIS ONGKIR!
                        </span>
                      )}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block font-bold text-[#4A2A17] mb-1">
                      Nama Pemesan
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama kamu"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                      required
                    />
                  </div>

                  {/* Address Input (if delivery) */}
                  {orderMethod === "antar" && (
                    <div>
                      <label className="block font-bold text-[#4A2A17] mb-1">
                        Alamat Lengkap / Patokan
                      </label>
                      <input
                        type="text"
                        placeholder="Nama jalan, desa, patokan rumah"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                        required
                      />
                    </div>
                  )}

                  {/* General notes */}
                  <div>
                    <label className="block font-bold text-[#4A2A17] mb-1">
                      Catatan Tambahan (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Saus jangan terlalu pedas, bungkus terpisah"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B3121B] text-[#4A2A17]"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Summary & WhatsApp Order Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-amber-200 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#4A2A17] mb-3">
                <div className="flex justify-between">
                  <span>Subtotal Pesanan:</span>
                  <span className="font-bold">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                {orderMethod === "antar" && (
                  <div className="flex justify-between">
                    <span>Ongkos Kirim ({selectedZone.name.split(" ")[0]}):</span>
                    <span className="font-bold text-[#B3121B]">
                      {deliveryFee === 0 ? "GRATIS" : `Rp${deliveryFee.toLocaleString("id-ID")}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-display font-black text-[#4A2A17] pt-2 border-t border-amber-100">
                  <span>Total Bayar:</span>
                  <span className="text-[#B3121B] text-xl">
                    Rp{total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all active:scale-98"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Kirim Pesanan via WhatsApp</span>
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Pesan otomatis terformat akan langsung terbuka di WhatsApp Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
