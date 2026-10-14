"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, DELIVERY_ZONES, DeliveryZone, BUSINESS_INFO } from "@/data/menuData";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DELIVERY_ZONES[0]);
  const [orderMethod, setOrderMethod] = useState<"antar" | "ambil">("antar");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      : subtotal >= selectedZone.freeMinOrder && selectedZone.freeMinOrder > 0
      ? 0
      : selectedZone.fee;

  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  // Generate automated formatted WhatsApp message matching PRD 8.4
  const generateWhatsAppLink = () => {
    if (cart.length === 0) return BUSINESS_INFO.whatsappUrl;

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
      text += `Ongkir (${selectedZone.name}): ${
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

    return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
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
