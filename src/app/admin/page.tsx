"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp, FinanceTransaction } from "@/context/AppContext";
import { MenuItem } from "@/data/menuData";
import {
  LayoutDashboard,
  FileText,
  UtensilsCrossed,
  Truck,
  Gift,
  ClipboardList,
  DollarSign,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Upload,
  ExternalLink,
  RotateCcw,
  Save,
  CheckCircle,
  Eye,
  Download,
  Printer,
  Phone,
  Shield,
  Lock,
  ArrowLeft,
  X,
} from "lucide-react";

export default function AdminPage() {
  const {
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
    updateOrderStatus,
    financeTransactions,
    addFinanceTransaction,
    deleteFinanceTransaction,
    resetAllToDefaults,
  } = useApp();

  // Authentication State (simple PIN/passcode security for owner)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "content" | "menu" | "delivery" | "preorder" | "orders" | "finance"
  >("overview");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Local copy for editing site content
  const [contentForm, setContentForm] = useState(siteContent);

  // Sync content form when siteContent changes
  React.useEffect(() => {
    setContentForm(siteContent);
  }, [siteContent]);

  // Menu Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState<Omit<MenuItem, "id">>({
    name: "",
    category: "dimsum",
    price: 15000,
    originalPrice: undefined,
    description: "",
    label: "",
    isPromo: false,
    isAvailable: true,
    rating: 4.9,
    image: "/images/846396452_122222602274590268_4769449599173602396_n.jpg",
    cardBgTheme: "red",
    ingredients: [],
  });

  // Package Modal State
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [pkgForm, setPkgForm] = useState({
    name: "",
    price: 35000,
    minOrder: 1,
    suitableFor: "",
    itemsText: "",
    image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
  });

  // Finance Form State
  const [financeForm, setFinanceForm] = useState<Omit<FinanceTransaction, "id">>({
    type: "pemasukan",
    category: "Penjualan Outlet Langsung",
    amount: 50000,
    date: "2026-10-15",
    description: "",
  });

  React.useEffect(() => {
    setFinanceForm((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  // Image Upload Handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSuccess(event.target.result as string);
        showToast("Gambar berhasil dimuat!");
      }
    };
    reader.readAsDataURL(file);
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().toLowerCase() === "kekinian") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Financial calculations
  const totalIncome = financeTransactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = financeTransactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  // Export CSV Handler
  const downloadFinanceCSV = () => {
    let csv = "ID,Tanggal,Tipe,Kategori,Nominal (Rp),Keterangan\n";
    financeTransactions.forEach((t) => {
      csv += `"${t.id}","${t.date}","${t.type}","${t.category}","${t.amount}","${t.description.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Laporan_Keuangan_Puanmuda_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Laporan CSV berhasil diunduh!");
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF3E3] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border-2 border-amber-200 text-center">
          <div className="w-16 h-16 rounded-full bg-[#B3121B] text-[#FFC62B] flex items-center justify-center mx-auto mb-4 shadow-md text-2xl font-bold">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="font-display text-2xl font-black text-[#4A2A17] mb-1">
            Panel Admin Puanmuda
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            Kelola seluruh media, menu, pesanan, dan keuangan secara langsung
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A2A17] text-left mb-1">
                Password Akses Admin
              </label>
              <input
                type="password"
                placeholder="Masukkan password admin"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#B3121B]"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-600 font-bold mt-1 text-left">
                  Password salah. Silakan coba lagi.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#B3121B] hover:bg-[#8E0F0F] text-white font-display font-black text-sm shadow-lg transition-all active:scale-95"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-center text-xs text-gray-500">
            <Link href="/" className="hover:text-[#B3121B] flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Web
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EEDC] text-[#4A2A17] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#B3121B] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-top-2 border-2 border-[#FFC62B]">
          <CheckCircle className="w-5 h-5 text-[#FFC62B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-[#8E0F0F] text-white px-4 sm:px-8 py-3.5 shadow-md sticky top-0 z-40 flex items-center justify-between border-b-2 border-[#FFC62B]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FFC62B] text-[#4A2A17] flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-lg font-black leading-tight text-white">
              CMS Panel & Keuangan Puanmuda
            </h1>
            <span className="text-[11px] text-amber-200">
              Pengelolaan Frontend & Data Terpadu
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors border border-white/20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Web</span>
            <ExternalLink className="w-3 h-3 text-[#FFC62B]" />
          </Link>

          <button
            onClick={() => {
              if (confirm("Kembalikan semua teks, media, dan menu ke pengaturan bawaan?")) {
                resetAllToDefaults();
                showToast("Semua data berhasil di-reset ke default!");
              }
            }}
            title="Reset ke Default"
            className="p-1.5 rounded-full bg-white/10 hover:bg-red-800 text-white/80 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white font-semibold transition-colors"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-amber-200/80 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "overview"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "content"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Konten & Media Web</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "menu"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Katalog Menu ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "orders"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("finance")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "finance"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Keuangan & Rekap</span>
          </button>

          <button
            onClick={() => setActiveTab("delivery")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "delivery"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Ongkir & Area</span>
          </button>

          <button
            onClick={() => setActiveTab("preorder")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "preorder"
                ? "bg-[#B3121B] text-white shadow-md scale-102"
                : "bg-white text-[#4A2A17] hover:bg-amber-100"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Paket Acara ({eventPackages.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Total Menu Aktif
                  </span>
                  <h3 className="font-display text-3xl font-black text-[#4A2A17] mt-1">
                    {menuItems.filter((m) => m.isAvailable).length}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    dari {menuItems.length} total produk
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#B3121B] flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Pesanan Masuk
                  </span>
                  <h3 className="font-display text-3xl font-black text-[#B3121B] mt-1">
                    {orders.length}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    {orders.filter((o) => o.status === "Baru").length} perlu diproses
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#B3121B] flex items-center justify-center">
                  <ClipboardList className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Total Pemasukan
                  </span>
                  <h3 className="font-display text-2xl font-black text-emerald-700 mt-1">
                    Rp{totalIncome.toLocaleString("id-ID")}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    Dari penjualan web & outlet
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Laba Bersih
                  </span>
                  <h3 className={`font-display text-2xl font-black mt-1 ${netProfit >= 0 ? "text-emerald-700" : "text-red-600"}`}>
                    Rp{netProfit.toLocaleString("id-ID")}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    Pengeluaran: Rp{totalExpense.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-[#4A2A17] flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-[#B3121B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs text-[#FFC62B] font-black uppercase tracking-wider">
                  Kustomisasi Cepat
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black mt-1 mb-2">
                  Edit Media & Menu Langsung dari Sini
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                  Seluruh perubahan teks, foto banner, harga menu, promo 10K, dan ongkir langsung tersinkronisasi ke halaman web pengunjung secara real-time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab("content")}
                  className="px-5 py-2.5 rounded-full bg-[#FFC62B] text-[#4A2A17] font-display font-extrabold text-xs shadow-md hover:bg-[#FFD452] transition-colors"
                >
                  Ubah Hero & Media
                </button>
                <button
                  onClick={() => {
                    setEditingMenuItem(null);
                    setIsMenuModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-display font-extrabold text-xs border border-white/30 transition-colors"
                >
                  + Tambah Produk Baru
                </button>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-black text-[#4A2A17]">
                  Pesanan Terbaru
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-[#B3121B] font-bold underline"
                >
                  Lihat Semua ({orders.length})
                </button>
              </div>

              <div className="divide-y divide-amber-100">
                {orders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-[#4A2A17]">{ord.customerName}</span>
                      <span className="text-gray-400 text-xs ml-2">({ord.date})</span>
                      <p className="text-xs text-gray-500">
                        {ord.items.map((it) => `${it.name} x${it.quantity}`).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-black text-[#B3121B]">
                        Rp{ord.total.toLocaleString("id-ID")}
                      </span>
                      <span className="block text-[11px] font-bold text-amber-800">
                        Status: {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KONTEN & MEDIA WEB */}
        {activeTab === "content" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-8">
            <div>
              <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                Kustomisasi Media & Teks Website
              </h2>
              <p className="text-xs text-gray-500">
                Ubah judul hero, gambar makanan, promo banner, dan kontak resmi bisnis
              </p>
            </div>

            {/* SECTION 1: HERO SECTION */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
              <h3 className="font-display text-lg font-black text-[#B3121B] flex items-center gap-2">
                <FileText className="w-5 h-5" /> 1. Hero Section (Header Utama)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Judul Utama Baris 1
                  </label>
                  <input
                    type="text"
                    value={contentForm.heroTitleLine1}
                    onChange={(e) => setContentForm({ ...contentForm, heroTitleLine1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Judul Utama Baris 2
                  </label>
                  <input
                    type="text"
                    value={contentForm.heroTitleLine2}
                    onChange={(e) => setContentForm({ ...contentForm, heroTitleLine2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Tagline Script (Aksen Kuning)
                  </label>
                  <input
                    type="text"
                    value={contentForm.heroTagline}
                    onChange={(e) => setContentForm({ ...contentForm, heroTagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Sub-tagline
                  </label>
                  <input
                    type="text"
                    value={contentForm.heroSubtitle}
                    onChange={(e) => setContentForm({ ...contentForm, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                  Deskripsi Lengkap Hero
                </label>
                <textarea
                  rows={2}
                  value={contentForm.heroDesc}
                  onChange={(e) => setContentForm({ ...contentForm, heroDesc: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                />
              </div>

              {/* Hero Image Customization */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                  Gambar Hero Kanan (Cutout Makanan)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-red-950 border border-amber-300 shrink-0">
                    <Image
                      src={contentForm.heroImage || "/images/hero-food-cutout.png"}
                      alt="Hero Preview"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="URL Gambar / Path..."
                      value={contentForm.heroImage}
                      onChange={(e) => setContentForm({ ...contentForm, heroImage: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs"
                    />

                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B3121B] text-white text-xs font-bold hover:bg-[#8E0F0F] transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto dari Komputer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (dataUrl) =>
                              setContentForm({ ...contentForm, heroImage: dataUrl })
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setContentForm({ ...contentForm, heroImage: "/images/hero-food-cutout.png" })
                        }
                        className="text-xs text-amber-800 underline font-semibold"
                      >
                        Reset ke Cutout Puanmuda
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: PROMO BANNER */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
              <h3 className="font-display text-lg font-black text-[#B3121B] flex items-center gap-2">
                <FileText className="w-5 h-5" /> 2. Banner Promo (Section 2)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Label Badge Promo
                  </label>
                  <input
                    type="text"
                    value={contentForm.promoBadge}
                    onChange={(e) => setContentForm({ ...contentForm, promoBadge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Judul Promo
                  </label>
                  <input
                    type="text"
                    value={contentForm.promoTitle}
                    onChange={(e) => setContentForm({ ...contentForm, promoTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Highlight Promo (Kuning)
                  </label>
                  <input
                    type="text"
                    value={contentForm.promoHighlight}
                    onChange={(e) => setContentForm({ ...contentForm, promoHighlight: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Teks Tombol Promo
                  </label>
                  <input
                    type="text"
                    value={contentForm.promoButtonText}
                    onChange={(e) => setContentForm({ ...contentForm, promoButtonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                  Deskripsi Promo
                </label>
                <textarea
                  rows={2}
                  value={contentForm.promoDesc}
                  onChange={(e) => setContentForm({ ...contentForm, promoDesc: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                />
              </div>

              {/* Promo Image */}
              <div>
                <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                  Foto Banner Promo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-amber-950 border border-amber-300 shrink-0">
                    <Image
                      src={contentForm.promoImage || "/images/834420764_122221420862590268_1386869829820128574_n.jpg"}
                      alt="Promo Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      placeholder="URL Gambar Promo..."
                      value={contentForm.promoImage}
                      onChange={(e) => setContentForm({ ...contentForm, promoImage: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B3121B] text-white text-xs font-bold hover:bg-[#8E0F0F] transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Gambar Promo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setContentForm({ ...contentForm, promoImage: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: INFORMASI BISNIS & KONTAK */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4">
              <h3 className="font-display text-lg font-black text-[#B3121B] flex items-center gap-2">
                <Settings className="w-5 h-5" /> 3. Kontak Resmi & Outlet
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Nomor WhatsApp (Tampilan)
                  </label>
                  <input
                    type="text"
                    value={contentForm.businessPhone}
                    onChange={(e) => setContentForm({ ...contentForm, businessPhone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Nomor WhatsApp Raw (Format 62...)
                  </label>
                  <input
                    type="text"
                    value={contentForm.businessPhoneRaw}
                    onChange={(e) => setContentForm({ ...contentForm, businessPhoneRaw: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Jam Operasional
                  </label>
                  <input
                    type="text"
                    value={contentForm.businessHours}
                    onChange={(e) => setContentForm({ ...contentForm, businessHours: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2A17] mb-1">
                    Alamat Lengkap Outlet
                  </label>
                  <input
                    type="text"
                    value={contentForm.businessAddress}
                    onChange={(e) => setContentForm({ ...contentForm, businessAddress: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  updateSiteContent(contentForm);
                  showToast("Semua teks & media website berhasil disimpan!");
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B3121B] hover:bg-[#8E0F0F] text-white font-display font-black text-sm shadow-xl transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Seluruh Konten & Media</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: KATALOG MENU */}
        {activeTab === "menu" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                  Kelola Produk & Katalog Menu
                </h2>
                <p className="text-xs text-gray-500">
                  Tambah, ubah harga, ganti foto, atau sembunyikan stok menu
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMenuItem(null);
                  setMenuForm({
                    name: "",
                    category: "dimsum",
                    price: 15000,
                    originalPrice: undefined,
                    description: "",
                    label: "",
                    isPromo: false,
                    isAvailable: true,
                    rating: 4.9,
                    image: "/images/846396452_122222602274590268_4769449599173602396_n.jpg",
                    cardBgTheme: "red",
                    ingredients: [],
                  });
                  setIsMenuModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B3121B] hover:bg-[#8E0F0F] text-white font-display font-bold text-xs shadow-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Menu Baru</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-amber-200 bg-amber-50/70 text-[#4A2A17]">
                    <th className="py-3 px-4">Foto</th>
                    <th className="py-3 px-4">Nama Produk</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Harga</th>
                    <th className="py-3 px-4">Label</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-2.5 px-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-amber-100 shadow-sm">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-display font-bold text-[#4A2A17]">
                        {item.name}
                        {item.description && (
                          <p className="text-[11px] text-gray-500 font-normal line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#4A2A17] font-bold text-[11px] uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-[#B3121B]">
                        Rp{item.price.toLocaleString("id-ID")}
                      </td>
                      <td className="py-2.5 px-4">
                        {item.label ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#FFC62B] text-[#4A2A17]">
                            {item.label}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4">
                        <button
                          onClick={() => {
                            updateMenuItem(item.id, { isAvailable: !item.isAvailable });
                            showToast(`Status ${item.name} diperbarui!`);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            item.isAvailable
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {item.isAvailable ? "Tersedia" : "Habis"}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingMenuItem(item);
                              setMenuForm({
                                name: item.name,
                                category: item.category,
                                price: item.price,
                                originalPrice: item.originalPrice,
                                description: item.description,
                                label: item.label || "",
                                isPromo: item.isPromo || false,
                                isAvailable: item.isAvailable,
                                rating: item.rating,
                                image: item.image,
                                cardBgTheme: item.cardBgTheme,
                                ingredients: item.ingredients || [],
                              });
                              setIsMenuModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-[#4A2A17]"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus ${item.name}?`)) {
                                deleteMenuItem(item.id);
                                showToast(`${item.name} telah dihapus.`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PESANAN MASUK (ORDER TRACKER) */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                  Daftar Pesanan & Order Tracker
                </h2>
                <p className="text-xs text-gray-500">
                  Pantau pesanan yang dikirim pelanggan dari WhatsApp Checkout web
                </p>
              </div>

              <div className="text-xs font-bold text-gray-500">
                Total: {orders.length} pesanan
              </div>
            </div>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  Belum ada pesanan yang tercatat.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm text-[#B3121B]">
                          {order.id}
                        </span>
                        <span className="text-xs text-gray-400">• {order.date}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-[#4A2A17] uppercase">
                          {order.type}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-base text-[#4A2A17]">
                        {order.customerName} {order.customerPhone !== "-" && `(${order.customerPhone})`}
                      </h4>

                      <p className="text-xs text-gray-600">
                        <strong>Metode:</strong> {order.orderMethod === "antar" ? "Antar ke Alamat" : "Ambil di Outlet Suela"}
                        {order.deliveryAddress && ` • ${order.deliveryAddress}`}
                      </p>

                      <div className="text-xs text-[#4A2A17]/85 pt-1">
                        <strong>Rincian Menu:</strong>{" "}
                        {order.items.map((it, idx) => (
                          <span key={idx} className="mr-2 inline-block bg-white px-2 py-0.5 rounded border border-amber-200">
                            {it.name} x{it.quantity} (Rp{(it.price * it.quantity).toLocaleString("id-ID")})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Total Pembayaran</span>
                        <span className="font-display text-xl font-black text-[#B3121B]">
                          Rp{order.total.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value as any);
                            showToast(`Status order ${order.id} diubah ke ${e.target.value}`);
                          }}
                          className="text-xs px-3 py-1.5 rounded-xl border border-amber-300 font-bold bg-white text-[#4A2A17]"
                        >
                          <option value="Baru">Baru</option>
                          <option value="Dikonfirmasi">Dikonfirmasi</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Batal">Batal</option>
                        </select>

                        {order.customerPhone !== "-" && (
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Halo ${order.customerName}, kami dari Jajanan Puanmuda ingin mengonfirmasi pesanan ${order.id}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            title="Chat Pelanggan di WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: KEUANGAN & REKAP (PRD 8.10) */}
        {activeTab === "finance" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                  Modul Pencatatan Keuangan (PRD 8.10)
                </h2>
                <p className="text-xs text-gray-500">
                  Catat pemasukan, pengeluaran, pantau laba bersih, dan unduh laporan
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={downloadFinanceCSV}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B3121B] hover:bg-[#8E0F0F] text-white text-xs font-bold shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh CSV</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-[#4A2A17] text-xs font-bold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* Financial Summary KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold uppercase">Total Pemasukan</span>
                <p className="font-display text-2xl font-black text-emerald-700 mt-1">
                  Rp{totalIncome.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <span className="text-xs text-red-800 font-bold uppercase">Total Pengeluaran</span>
                <p className="font-display text-2xl font-black text-red-700 mt-1">
                  Rp{totalExpense.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xs text-amber-800 font-bold uppercase">Laba Bersih</span>
                <p className={`font-display text-2xl font-black mt-1 ${netProfit >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                  Rp{netProfit.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Form Catat Transaksi Baru */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h3 className="font-display font-black text-sm text-[#4A2A17] mb-3">
                + Catat Transaksi Baru
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addFinanceTransaction(financeForm);
                  setFinanceForm({
                    type: "pemasukan",
                    category: "Penjualan Outlet Langsung",
                    amount: 50000,
                    date: new Date().toISOString().slice(0, 10),
                    description: "",
                  });
                  showToast("Transaksi berhasil dicatat!");
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end text-xs"
              >
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Tipe</label>
                  <select
                    value={financeForm.type}
                    onChange={(e) => setFinanceForm({ ...financeForm, type: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white"
                  >
                    <option value="pemasukan">Pemasukan (+)</option>
                    <option value="pengeluaran">Pengeluaran (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Kategori</label>
                  <select
                    value={financeForm.category}
                    onChange={(e) => setFinanceForm({ ...financeForm, category: e.target.value })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white"
                  >
                    <option value="Penjualan Web">Penjualan Web</option>
                    <option value="Penjualan Outlet Langsung">Penjualan Outlet Langsung</option>
                    <option value="Bahan Baku">Bahan Baku (Ayam, Daging, Tepung)</option>
                    <option value="Kemasan">Kemasan & Plastik</option>
                    <option value="Operasional & Gas">Operasional & Gas</option>
                    <option value="Gaji / Upah">Gaji / Upah</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Nominal (Rp)</label>
                  <input
                    type="number"
                    min={1000}
                    value={financeForm.amount}
                    onChange={(e) => setFinanceForm({ ...financeForm, amount: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Keterangan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Belanja ayam 5kg"
                    value={financeForm.description}
                    onChange={(e) => setFinanceForm({ ...financeForm, description: e.target.value })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#B3121B] hover:bg-[#8E0F0F] text-white font-display font-bold shadow transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>

            {/* Riwayat Transaksi */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-amber-200 bg-amber-50/70 text-[#4A2A17]">
                    <th className="py-2.5 px-4">Tanggal</th>
                    <th className="py-2.5 px-4">Tipe</th>
                    <th className="py-2.5 px-4">Kategori</th>
                    <th className="py-2.5 px-4">Keterangan</th>
                    <th className="py-2.5 px-4 text-right">Nominal</th>
                    <th className="py-2.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {financeTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-amber-50/40">
                      <td className="py-2.5 px-4 text-gray-500">{tx.date}</td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            tx.type === "pemasukan"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-[#4A2A17]">{tx.category}</td>
                      <td className="py-2.5 px-4 text-gray-600">{tx.description}</td>
                      <td
                        className={`py-2.5 px-4 text-right font-display font-black ${
                          tx.type === "pemasukan" ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {tx.type === "pemasukan" ? "+" : "-"}Rp{tx.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => {
                            deleteFinanceTransaction(tx.id);
                            showToast("Transaksi dihapus.");
                          }}
                          className="p-1 rounded text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: ONGKIR & AREA ANTAR */}
        {activeTab === "delivery" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                Pengaturan Tarif Ongkir (Lombok Timur)
              </h2>
              <p className="text-xs text-gray-500">
                Atur tarif pengantaran, estimasi waktu, dan batas gratis ongkir
              </p>
            </div>

            <div className="space-y-4">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-2 w-full">
                    <span className="text-xs font-bold text-gray-500 uppercase">Zona: {zone.id}</span>
                    <input
                      type="text"
                      value={zone.name}
                      onChange={(e) => updateDeliveryZone(zone.id, { name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-amber-300 font-bold text-sm bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500">Tarif (Rp)</label>
                      <input
                        type="number"
                        value={zone.fee}
                        onChange={(e) => updateDeliveryZone(zone.id, { fee: parseInt(e.target.value) || 0 })}
                        className="w-28 px-3 py-1.5 rounded-lg border border-amber-300 font-bold text-sm bg-white text-[#B3121B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500">Estimasi</label>
                      <input
                        type="text"
                        value={zone.estimate}
                        onChange={(e) => updateDeliveryZone(zone.id, { estimate: e.target.value })}
                        className="w-32 px-3 py-1.5 rounded-lg border border-amber-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500">Gratis Min. Belanja</label>
                      <input
                        type="number"
                        value={zone.freeMinOrder}
                        onChange={(e) => updateDeliveryZone(zone.id, { freeMinOrder: parseInt(e.target.value) || 0 })}
                        className="w-28 px-3 py-1.5 rounded-lg border border-amber-300 text-xs bg-white text-emerald-700 font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => showToast("Pengaturan ongkir berhasil disimpan!")}
                className="px-6 py-2.5 rounded-full bg-[#B3121B] text-white font-bold text-xs shadow hover:bg-[#8E0F0F]"
              >
                Simpan Perubahan Ongkir
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: PAKET ACARA & PRE-ORDER */}
        {activeTab === "preorder" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-black text-[#4A2A17]">
                  Kelola Paket Acara & Pre-Order
                </h2>
                <p className="text-xs text-gray-500">
                  Atur paket snack box arisan, rapat, dan katering
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPkgId(null);
                  setPkgForm({
                    name: "",
                    price: 35000,
                    minOrder: 5,
                    suitableFor: "Rapat Kantor, Pengajian",
                    itemsText: "1x Risol Mayo\n1x Risol Bolognase\n1x Dimsum",
                    image: "/images/842902220_122222434478590268_5969896741731148261_n.jpg",
                  });
                  setIsPkgModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B3121B] text-white text-xs font-bold shadow hover:bg-[#8E0F0F]"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Paket Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventPackages.map((pkg) => (
                <div key={pkg.id} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-amber-100">
                      <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                    </div>

                    <h3 className="font-display font-black text-lg text-[#4A2A17] mb-1">
                      {pkg.name}
                    </h3>
                    <p className="font-display font-black text-base text-[#B3121B] mb-2">
                      Rp{pkg.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">Min. Pesan: {pkg.minOrder} paket</p>

                    <div className="space-y-1 mb-4">
                      {pkg.items.map((it, idx) => (
                        <span key={idx} className="block text-xs text-[#4A2A17]/80">
                          • {it}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-amber-200">
                    <button
                      onClick={() => {
                        setEditingPkgId(pkg.id);
                        setPkgForm({
                          name: pkg.name,
                          price: pkg.price,
                          minOrder: pkg.minOrder,
                          suitableFor: pkg.suitableFor,
                          itemsText: pkg.items.join("\n"),
                          image: pkg.image,
                        });
                        setIsPkgModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-[#4A2A17]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus paket ${pkg.name}?`)) {
                          deleteEventPackage(pkg.id);
                          showToast("Paket dihapus.");
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: EDIT / TAMBAH PRODUK MENU */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-amber-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
              <h3 className="font-display font-black text-xl text-[#4A2A17]">
                {editingMenuItem ? "Edit Menu Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingMenuItem) {
                  updateMenuItem(editingMenuItem.id, menuForm);
                  showToast(`${menuForm.name} berhasil diperbarui!`);
                } else {
                  addMenuItem(menuForm);
                  showToast(`${menuForm.name} berhasil ditambahkan!`);
                }
                setIsMenuModalOpen(false);
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Kategori</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white"
                  >
                    <option value="dimsum">Dimsum</option>
                    <option value="risol">Risol</option>
                    <option value="mie">Mie</option>
                    <option value="camilan">Burger & Camilan</option>
                    <option value="minuman">Minuman</option>
                    <option value="paket">Paket Acara</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Label / Badge</label>
                  <input
                    type="text"
                    placeholder="BEST SELLER / PROMO 10K"
                    value={menuForm.label || ""}
                    onChange={(e) => setMenuForm({ ...menuForm, label: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Tema Kartu (UI Style)</label>
                  <select
                    value={menuForm.cardBgTheme}
                    onChange={(e) => setMenuForm({ ...menuForm, cardBgTheme: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-amber-300 bg-white"
                  >
                    <option value="red">Merah (Red Card)</option>
                    <option value="yellow">Kuning (Yellow Card)</option>
                    <option value="cream">Krem (Cream Card)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                />
              </div>

              {/* Photo Input & Local File Upload */}
              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Foto Produk</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-amber-100 border border-amber-300 shrink-0">
                    <Image src={menuForm.image} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={menuForm.image}
                      onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                      placeholder="URL Gambar..."
                      className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-xs"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#B3121B] text-white text-xs font-bold hover:bg-[#8E0F0F]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih Foto dari Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setMenuForm({ ...menuForm, image: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#B3121B] text-white font-bold hover:bg-[#8E0F0F]"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / TAMBAH PAKET ACARA */}
      {isPkgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-amber-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-100">
              <h3 className="font-display font-black text-xl text-[#4A2A17]">
                {editingPkgId ? "Edit Paket Acara" : "Tambah Paket Acara"}
              </h3>
              <button
                onClick={() => setIsPkgModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const items = pkgForm.itemsText
                  .split("\n")
                  .map((t) => t.trim())
                  .filter(Boolean);

                if (editingPkgId) {
                  updateEventPackage(editingPkgId, {
                    name: pkgForm.name,
                    price: pkgForm.price,
                    minOrder: pkgForm.minOrder,
                    suitableFor: pkgForm.suitableFor,
                    items,
                    image: pkgForm.image,
                  });
                  showToast("Paket acara berhasil diperbarui!");
                } else {
                  addEventPackage({
                    name: pkgForm.name,
                    price: pkgForm.price,
                    minOrder: pkgForm.minOrder,
                    suitableFor: pkgForm.suitableFor,
                    items,
                    image: pkgForm.image,
                  });
                  showToast("Paket acara berhasil ditambahkan!");
                }
                setIsPkgModalOpen(false);
              }}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Nama Paket</label>
                <input
                  type="text"
                  value={pkgForm.name}
                  onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    value={pkgForm.price}
                    onChange={(e) => setPkgForm({ ...pkgForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#4A2A17] mb-1">Minimal Order (Paket)</label>
                  <input
                    type="number"
                    value={pkgForm.minOrder}
                    onChange={(e) => setPkgForm({ ...pkgForm, minOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Cocok Untuk Acara</label>
                <input
                  type="text"
                  placeholder="Contoh: Rapat Kantor, Arisan Keluarga"
                  value={pkgForm.suitableFor}
                  onChange={(e) => setPkgForm({ ...pkgForm, suitableFor: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Isi Paket (1 baris per item)</label>
                <textarea
                  rows={3}
                  value={pkgForm.itemsText}
                  onChange={(e) => setPkgForm({ ...pkgForm, itemsText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A2A17] mb-1">Foto Paket</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-amber-100 border border-amber-300 shrink-0">
                    <Image src={pkgForm.image} alt="Preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={pkgForm.image}
                      onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-xs"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#B3121B] text-white text-xs font-bold hover:bg-[#8E0F0F]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setPkgForm({ ...pkgForm, image: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsPkgModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-gray-200 text-gray-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#B3121B] text-white font-bold hover:bg-[#8E0F0F]"
                >
                  Simpan Paket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
