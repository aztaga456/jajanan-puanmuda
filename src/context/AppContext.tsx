"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  MENU_ITEMS as DEFAULT_MENU_ITEMS,
  DELIVERY_ZONES as DEFAULT_DELIVERY_ZONES,
  BUSINESS_INFO as DEFAULT_BUSINESS_INFO,
  MenuItem,
  DeliveryZone,
} from "@/data/menuData";

export interface SiteContent {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTagline: string;
  heroSubtitle: string;
  heroDesc: string;
  heroImage: string;
  promoBadge: string;
  promoTitle: string;
  promoHighlight: string;
  promoDesc: string;
  promoImage: string;
  promoButtonText: string;
  businessName: string;
  businessTagline: string;
  businessPhone: string;
  businessPhoneRaw: string;
  businessHours: string;
  businessAddress: string;
}

export interface EventPackage {
  id: string;
  name: string;
  price: number;
  minOrder: number;
  items: string[];
  suitableFor: string;
  image: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  orderMethod: "antar" | "ambil";
  deliveryAddress?: string;
  items: { name: string; quantity: number; price: number; note?: string }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "Baru" | "Dikonfirmasi" | "Diproses" | "Selesai" | "Batal";
  type: "reguler" | "preorder";
}

export interface FinanceTransaction {
  id: string;
  type: "pemasukan" | "pengeluaran";
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface AppContextType {
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  deliveryZones: DeliveryZone[];
  updateDeliveryZone: (id: string, zone: Partial<DeliveryZone>) => void;
  eventPackages: EventPackage[];
  updateEventPackage: (id: string, pkg: Partial<EventPackage>) => void;
  addEventPackage: (pkg: Omit<EventPackage, "id">) => void;
  deleteEventPackage: (id: string) => void;
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, "id" | "date" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderRecord["status"]) => void;
  financeTransactions: FinanceTransaction[];
  addFinanceTransaction: (tx: Omit<FinanceTransaction, "id">) => void;
  deleteFinanceTransaction: (id: string) => void;
  resetAllToDefaults: () => void;
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  heroTitleLine1: "Jajanan",
  heroTitleLine2: "Puan Muda",
  heroTagline: "Cemilan Kekinian",
  heroSubtitle: "",
  heroDesc: "",
  heroImage: "/images/hero-food-cutout.png",
  promoBadge: "PENAWARAN SPESIAL BULAN INI",
  promoTitle: "Dimsum Gurih",
  promoHighlight: "Harga Star 10K!",
  promoDesc:
    "Cobain kelezatan Dimsum Mentai Isi 3 dan Dimsum Bakar dengan harga hemat mulai Rp10.000 saja. Isian daging melimpah, saus mentai gurih lumer, dan 100% tanpa pengawet.",
  promoImage: "/images/834420764_122221420862590268_1386869829820128574_n.jpg",
  promoButtonText: "Klaim Promo WhatsApp",
  businessName: "Jajanan Puanmuda",
  businessTagline: "Cemilan Kekinian — Cobain sekarang, dijamin ketagihan!",
  businessPhone: "0819 2803 4054",
  businessPhoneRaw: "6281928034054",
  businessHours: "Setiap Hari, 10.00 – 21.00 WITA",
  businessAddress: "Suela, Lombok Timur, Nusa Tenggara Barat",
};

const DEFAULT_EVENT_PACKAGES: EventPackage[] = [
  {
    id: "snack-box-hemat",
    name: "Snack Box Hemat (Isi 3)",
    price: 35000,
    minOrder: 5,
    items: [
      "1x Risol Mayo Creamy",
      "1x Risol Ayam Suwir Gurih",
      "1x Dimsum Original Kukus",
      "Box Cantik & Tisu",
    ],
    suitableFor: "Rapat Kantor, Seminar, Pengajian, Study Tour",
    image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
  },
  {
    id: "paket-arisan-10org",
    name: "Paket Arisan Meriah (10 Orang)",
    price: 275000,
    minOrder: 1,
    items: [
      "5 Porsi Dimsum Mentai Bakar",
      "10 Risol Campur Aneka Rasa",
      "10 Cup Es Teler Segar Spesial",
      "Saus Cocol & Kemasan",
    ],
    suitableFor: "Arisan Keluarga, Ulang Tahun, Kumpul Bestie",
    image: "/images/662279887_122199867620590268_6738119228535683969_n.jpg",
  },
  {
    id: "hampers-spesial",
    name: "Hampers Eksklusif Dimsum & Risol",
    price: 150000,
    minOrder: 1,
    items: [
      "16 Pcs Dimsum Mentai & Bakar",
      "8 Pcs Risol Bolognase & Mayo",
      "2 Botol Saus Sambal & Mentai Khas",
      "Pita & Greeting Card",
    ],
    suitableFor: "Hantaran, Hadiah Sahabat, Syukuran",
    image: "/images/834420764_122221420862590268_1386869829820128574_n.jpg",
  },
];

const DEFAULT_ORDERS: OrderRecord[] = [
  {
    id: "ORD-20261015-01",
    date: "2026-10-15 12:30",
    customerName: "Siti Rahma",
    customerPhone: "081912345678",
    orderMethod: "antar",
    deliveryAddress: "Jl. Wisata Suela No. 45",
    items: [
      { name: "Dimsum Mentai", quantity: 2, price: 20000, note: "Mentai dibakar wangi" },
      { name: "Risol Bolognase", quantity: 3, price: 10000 },
    ],
    subtotal: 70000,
    deliveryFee: 5000,
    total: 75000,
    status: "Selesai",
    type: "reguler",
  },
  {
    id: "ORD-20261015-02",
    date: "2026-10-15 14:10",
    customerName: "Ahmad Fauzi",
    customerPhone: "087899887766",
    orderMethod: "ambil",
    items: [
      { name: "Mie Jebew Dimsum", quantity: 2, price: 15000 },
      { name: "Es Teler Spesial", quantity: 2, price: 10000 },
    ],
    subtotal: 50000,
    deliveryFee: 0,
    total: 50000,
    status: "Diproses",
    type: "reguler",
  },
];

const DEFAULT_FINANCES: FinanceTransaction[] = [
  {
    id: "FT-01",
    type: "pemasukan",
    category: "Penjualan Menu",
    amount: 75000,
    date: "2026-10-15",
    description: "Pesanan ORD-20261015-01 (Siti Rahma)",
  },
  {
    id: "FT-02",
    type: "pemasukan",
    category: "Penjualan Outlet Langsung",
    amount: 140000,
    date: "2026-10-15",
    description: "Penjualan Dine-in Siang Outlet Suela",
  },
  {
    id: "FT-03",
    type: "pengeluaran",
    category: "Bahan Baku",
    amount: 85000,
    date: "2026-10-15",
    description: "Belanja Daging Ayam Pilihan & Kulit Risol",
  },
  {
    id: "FT-04",
    type: "pengeluaran",
    category: "Kemasan",
    amount: 35000,
    date: "2026-10-14",
    description: "Stok Mika Dimsum & Box Katering",
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(DEFAULT_DELIVERY_ZONES);
  const [eventPackages, setEventPackages] = useState<EventPackage[]>(DEFAULT_EVENT_PACKAGES);
  const [orders, setOrders] = useState<OrderRecord[]>(DEFAULT_ORDERS);
  const [financeTransactions, setFinanceTransactions] = useState<FinanceTransaction[]>(DEFAULT_FINANCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem("puanmuda_site_content");
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed.heroSubtitle === "Cobain sekarang, dijamin ketagihan!") parsed.heroSubtitle = "";
        if (parsed.heroDesc && parsed.heroDesc.includes("Pilihan lengkap aneka Dimsum")) parsed.heroDesc = "";
        setSiteContent(parsed);
      }

      const savedMenu = localStorage.getItem("puanmuda_menu_items");
      if (savedMenu) setMenuItems(JSON.parse(savedMenu));

      const savedZones = localStorage.getItem("puanmuda_delivery_zones");
      if (savedZones) setDeliveryZones(JSON.parse(savedZones));

      const savedPackages = localStorage.getItem("puanmuda_event_packages");
      if (savedPackages) setEventPackages(JSON.parse(savedPackages));

      const savedOrders = localStorage.getItem("puanmuda_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedFinance = localStorage.getItem("puanmuda_finances");
      if (savedFinance) setFinanceTransactions(JSON.parse(savedFinance));
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_site_content", JSON.stringify(siteContent));
    } catch (e) {
      console.error(e);
    }
  }, [siteContent, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_menu_items", JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_delivery_zones", JSON.stringify(deliveryZones));
    } catch (e) {
      console.error(e);
    }
  }, [deliveryZones, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_event_packages", JSON.stringify(eventPackages));
    } catch (e) {
      console.error(e);
    }
  }, [eventPackages, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("puanmuda_finances", JSON.stringify(financeTransactions));
    } catch (e) {
      console.error(e);
    }
  }, [financeTransactions, isLoaded]);

  // Methods
  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...content }));
  };

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const id = "menu-" + Date.now();
    setMenuItems((prev) => [...prev, { ...item, id }]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDeliveryZone = (id: string, zoneUpdate: Partial<DeliveryZone>) => {
    setDeliveryZones((prev) =>
      prev.map((zone) => (zone.id === id ? { ...zone, ...zoneUpdate } : zone))
    );
  };

  const updateEventPackage = (id: string, pkgUpdate: Partial<EventPackage>) => {
    setEventPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...pkgUpdate } : pkg))
    );
  };

  const addEventPackage = (pkg: Omit<EventPackage, "id">) => {
    const id = "pkg-" + Date.now();
    setEventPackages((prev) => [...prev, { ...pkg, id }]);
  };

  const deleteEventPackage = (id: string) => {
    setEventPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const addOrder = (orderData: Omit<OrderRecord, "id" | "date" | "status">) => {
    const now = new Date();
    const id = "ORD-" + now.toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(100 + Math.random() * 900);
    const dateStr = now.toISOString().slice(0, 16).replace("T", " ");
    const newOrder: OrderRecord = {
      ...orderData,
      id,
      date: dateStr,
      status: "Baru",
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Also auto record finance income when order is made
    addFinanceTransaction({
      type: "pemasukan",
      category: "Penjualan Web",
      amount: orderData.total,
      date: now.toISOString().slice(0, 10),
      description: `Pesanan ${id} (${orderData.customerName})`,
    });
  };

  const updateOrderStatus = (id: string, status: OrderRecord["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
  };

  const addFinanceTransaction = (tx: Omit<FinanceTransaction, "id">) => {
    const id = "FT-" + Date.now();
    setFinanceTransactions((prev) => [{ ...tx, id }, ...prev]);
  };

  const deleteFinanceTransaction = (id: string) => {
    setFinanceTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const resetAllToDefaults = () => {
    setSiteContent(DEFAULT_SITE_CONTENT);
    setMenuItems(DEFAULT_MENU_ITEMS);
    setDeliveryZones(DEFAULT_DELIVERY_ZONES);
    setEventPackages(DEFAULT_EVENT_PACKAGES);
    setOrders(DEFAULT_ORDERS);
    setFinanceTransactions(DEFAULT_FINANCES);
    localStorage.removeItem("puanmuda_site_content");
    localStorage.removeItem("puanmuda_menu_items");
    localStorage.removeItem("puanmuda_delivery_zones");
    localStorage.removeItem("puanmuda_event_packages");
    localStorage.removeItem("puanmuda_orders");
    localStorage.removeItem("puanmuda_finances");
  };

  return (
    <AppContext.Provider
      value={{
        siteContent,
        updateSiteContent,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        deliveryZones,
        updateDeliveryZone,
        eventPackages,
        updateEventPackage,
        addEventPackage,
        deleteEventPackage,
        orders,
        addOrder,
        updateOrderStatus,
        financeTransactions,
        addFinanceTransaction,
        deleteFinanceTransaction,
        resetAllToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
