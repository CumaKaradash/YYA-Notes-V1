"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"

const initialHesapHareketleriData = [
  {
    id: 1,
    tarih: "2024-01-15",
    aciklama: "Danışan Ödemesi - Ayşe K.",
    tip: "Gelir",
    tutar: "₺300",
    bakiye: "₺15,450",
    kategori: "Bireysel Terapi",
  },
  {
    id: 2,
    tarih: "2024-01-15",
    aciklama: "Ofis Kirası",
    tip: "Gider",
    tutar: "₺6,000",
    bakiye: "₺15,150",
    kategori: "Sabit Gider",
  },
  {
    id: 3,
    tarih: "2024-01-14",
    aciklama: "Çift Terapisi - Zeynep & Ali B.",
    tip: "Gelir",
    tutar: "₺450",
    bakiye: "₺21,150",
    kategori: "Çift Terapisi",
  },
  {
    id: 4,
    tarih: "2024-01-14",
    aciklama: "Kırtasiye Malzemeleri",
    tip: "Gider",
    tutar: "₺250",
    bakiye: "₺20,700",
    kategori: "Ofis Gideri",
  },
  {
    id: 5,
    tarih: "2024-01-13",
    aciklama: "MMPI Test - Fatma D.",
    tip: "Gelir",
    tutar: "₺200",
    bakiye: "₺20,950",
    kategori: "Test Değerlendirme",
  },
]

const columns = [
  { key: "tarih", label: "Tarih", sortable: true },
  { key: "aciklama", label: "Açıklama" },
  { key: "tip", label: "Tip" },
  { key: "kategori", label: "Kategori" },
  { key: "tutar", label: "Tutar", sortable: true },
  { key: "bakiye", label: "Bakiye", sortable: true },
]

export default function HesapHareketleriPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("bu-ay")
  const [hesapHareketleriData, setHesapHareketleriData] = useState(initialHesapHareketleriData)

  const toplamGelir = "₺12,450"
  const toplamGider = "₺8,250"
  const netAkis = "₺4,200"
  const mevcutBakiye = "₺15,450"

  const handleImport = (importedData: any[]) => {
    const formattedData = importedData.map((item, index) => ({
      id: Math.max(...hesapHareketleriData.map((h) => h.id)) + index + 1,
      tarih: item.tarih || item.Tarih || "",
      aciklama: item.aciklama || item.Açıklama || "",
      tip: item.tip || item.Tip || "Gelir",
      tutar: item.tutar || item.Tutar || "₺0",
      bakiye: item.bakiye || item.Bakiye || "₺0",
      kategori: item.kategori || item.Kategori || "",
    }))
    setHesapHareketleriData((prev) => [...prev, ...formattedData])
  }

  return (
    <main className="w-[85%] mx-auto px-4 py-6">
      <PageHeader title="Hesap Hareketleri" description="Tüm gelir ve gider hareketlerini görüntüleyin">
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bu-hafta">Bu Hafta</SelectItem>
              <SelectItem value="bu-ay">Bu Ay</SelectItem>
              <SelectItem value="gecen-ay">Geçen Ay</SelectItem>
              <SelectItem value="bu-yil">Bu Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Rapor Al</Button>
        </div>
      </PageHeader>

      {/* Özet Kartlar */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{toplamGelir}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gider</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{toplamGider}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -5% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Nakit Akışı</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{netAkis}</div>
            <p className="text-xs text-muted-foreground">Bu ay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mevcut Bakiye</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Pozitif
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mevcutBakiye}</div>
            <p className="text-xs text-muted-foreground">Güncel durum</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        title="Hesap Hareketleri"
        columns={columns}
        data={hesapHareketleriData.map((item) => ({
          ...item,
          tip: (
            <Badge variant={item.tip === "Gelir" ? "default" : "destructive"} className="text-xs">
              {item.tip}
            </Badge>
          ),
        }))}
        onImport={handleImport}
      />
    </main>
  )
}
