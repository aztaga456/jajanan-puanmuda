"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, DeliveryZone } from "@/data/menuData";
import { useApp } from "./AppContext";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  note?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, note?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  selectedZone: DeliveryZone;
  setSelectedZone: (zone: DeliveryZone) => void;
  orderMethod: "antar" | "ambil";
  setOrderMethod: (method: "antar" | "ambil") => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppLink: () => string;
  recordCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteContent, deliveryZones, addOrder } = useApp();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(deliveryZones[0]);
  const [orderMethod, setOrderMethod] = useState<"antar" | "ambil">("antar");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Keep selected zone synchronized with deliveryZones if zone is updated
  useEffect(() => {
    if (deliveryZones.length > 0) {
      const match = deliveryZones.find((z) => z.id === selectedZone?.id);
      if (match) setSelectedZone(match);
      else setSelectedZone(deliveryZones[0]);
    }
  }, [deliveryZones]);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("puanmuda_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("puanmuda_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity = 1, note = "") => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, note: note || ci.note }
            : ci
        );
      }
      return [...prev, { item, quantity, note }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  // Calculate delivery fee
  const deliveryFee =
    orderMethod === "ambil"
      ? 0
      : selectedZone && subtotal >= selectedZone.freeMinOrder && selectedZone.freeMinOrder > 0
      ? 0
      : selectedZone
      ? selectedZone.fee
      : 0;

  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  // Record order into AppContext state for admin tracking
  const recordCheckout = () => {
    if (cart.length === 0) return;
    addOrder({
      customerName: customerName || "Pelanggan",
      customerPhone: customerPhone || "-",
      orderMethod,
      deliveryAddress,
      items: cart.map((ci) => ({
        name: ci.item.name,
        quantity: ci.quantity,
        price: ci.item.price,
        note: ci.note,
      })),
      subtotal,
      deliveryFee,
      total,
      type: "reguler",
    });
  };

  // Generate automated formatted WhatsApp message matching PRD 8.4
  const generateWhatsAppLink = () => {
    const phoneRaw = siteContent.businessPhoneRaw || "6281928034054";
    if (cart.length === 0) return `https://wa.me/${phoneRaw}`;

    let text = `Halo Jajanan Puanmuda, saya mau pesan:\n`;
    cart.forEach((ci, idx) => {
      text += `${idx + 1}. ${ci.item.name} x${ci.quantity} = Rp${(
        ci.item.price * ci.quantity
      ).toLocaleString("id-ID")}\n`;
      if (ci.note) {
        text += `   Catatan: ${ci.note}\n`;
      }
    });

    text += `--------------------------------\n`;
    text += `Subtotal: Rp${subtotal.toLocaleString("id-ID")}\n`;
    if (orderMethod === "antar") {
      text += `Ongkir (${selectedZone?.name || "Antar"}): ${
        deliveryFee === 0 ? "GRATIS ONGKIR" : `Rp${deliveryFee.toLocaleString("id-ID")}`
      }\n`;
    }
    text += `Total: Rp${total.toLocaleString("id-ID")}\n\n`;

    text += `Nama: ${customerName || "-"}\n`;
    if (customerPhone) text += `No WhatsApp: ${customerPhone}\n`;
    text += `Metode: ${orderMethod === "antar" ? "Antar ke Alamat" : "Ambil di Tempat (Suela)"}\n`;

    if (orderMethod === "antar") {
      text += `Alamat Lengkap: ${deliveryAddress || "-"}\n`;
    }

    if (orderNotes) {
      text += `Catatan Tambahan: ${orderNotes}\n`;
    }

    text += `\nMohon dikonfirmasi ya kak, terima kasih! 🙏`;

    return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
        recordCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
