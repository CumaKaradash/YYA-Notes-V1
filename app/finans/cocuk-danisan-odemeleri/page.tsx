"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { FormBuilder } from "@/components/form-builder"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialCocukOdemeleriData = [
  {
    id: 1,
    cocuk_adi: "Ali Kaya",
    veli_adi: "Ayşe Kaya",
    tarih: "2024-01-15",
    seans: "Oyun Terapisi",
    tutar: "₺250",
    durum: "Ödendi",
    yas: "8",
  },
  {
    id: 2,
    cocuk_adi: "Zeynep Demir",
    veli_adi: "Mehmet Demir",
    tarih: "2024-01-14",
    seans: "Davranış Terapisi",
    tutar: "₺300",
    durum: "Beklemede",
    yas: "12",
  },
  {
    id: 3,
    cocuk_adi: "Can Yılmaz",
    veli_adi: "Fatma Yılmaz",
    tarih: "2024-01-13",
    seans: "Aile Terapisi",
    tutar: "₺400",
    durum: "Ödendi",
    yas: "10",
  },
]

const columns = [
  { key: "cocuk_adi", label: "Çocuk Adı", sortable: true },
  { key: "veli_adi", label: "Veli Adı", sortable: true },
  { key: "yas", label: "Yaş" },
  { key: "tarih", label: "Tarih", sortable: true },
  { key: "seans", label: "Seans Türü" },
  { key: "tutar", label: "Tutar", sortable: true },
  { key: "durum", label: "Durum" },
]

const formFields = [
  { name: "cocuk_adi", label: "Çocuk Adı", type: "text" as const, required: true },
  { name: "veli_adi", label: "Veli Adı", type: "text" as const, required: true },
  { name: "yas", label: "Yaş", type: "number" as const, required: true },
  { name: "tarih", label: "Tarih", type: "date" as const, required: true },
  {
    name: "seans",
    label: "Seans Türü",
    type: "select" as const,
    options: ["Oyun Terapisi", "Davranış Terapisi", "Aile Terapisi", "Grup Terapisi"],
    required: true,
  },
  { name: "tutar", label: "Tutar", type: "number" as const, required: true },
  {
    name: "durum",
    label: "Durum",
    type: "select" as const,
    options: ["Beklemede", "Ödendi", "Gecikmiş"],
    required: true,
  },
]

export default function CocukDanisanOdemeleriPage() {
  const [cocukOdemeleriData, setCocukOdemeleriData] = useState(initialCocukOdemeleriData)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const handleSubmit = (data: any) => {
    if (editingItem) {
      setCocukOdemeleriData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...data, id: editingItem.id } : item)),
      )
    } else {
      const newId = Math.max(...cocukOdemeleriData.map((item) => item.id)) + 1
      setCocukOdemeleriData((prev) => [...prev, { ...data, id: newId }])
    }
    setShowForm(false)
    setEditingItem(null)
  }

  const handleImport = (importedData: any[]) => {
    console.log("İçeri aktarılan çocuk danışan verileri:", importedData)

    const formattedData = importedData.map((item, index) => ({
      id: Math.max(...cocukOdemeleriData.map((c) => c.id)) + index + 1,
      cocuk_adi: item.cocuk_adi || item["Çocuk Adı"] || item.cocuk_adi || "",
      veli_adi: item.veli_adi || item["Veli Adı"] || item.veli_adi || "",
      yas: item.yas || item.Yas || item.yaş || "",
      tarih: item.tarih || item.Tarih || "",
      seans: item.seans || item.Seans || item["Seans Türü"] || "Oyun Terapisi",
      tutar: item.tutar || item.Tutar || "₺0",
      durum: item.durum || item.Durum || "Beklemede",
    }))

    setCocukOdemeleriData((prev) => [...prev, ...formattedData])
  }

  const handleDelete = (item: any) => {
    setCocukOdemeleriData((prev) => prev.filter((odeme) => odeme.id !== item.id))
  }

  return (
    <main className="w-[85%] mx-auto px-4 py-6">
      <PageHeader title="Çocuk Danışan Ödemeleri" description="Çocuk danışan ödeme kayıtlarını takip edin" />

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bu Ay Toplam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₺2,450</div>
            <p className="text-xs text-muted-foreground">7 seans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bekleyen Ödemeler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₺300</div>
            <p className="text-xs text-muted-foreground">1 seans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Aktif Çocuk Danışan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-muted-foreground">Bu ay</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        title="Çocuk Danışan Ödeme Listesi"
        columns={columns}
        data={cocukOdemeleriData}
        onAdd={() => setShowForm(true)}
        onEdit={setEditingItem}
        onDelete={handleDelete}
        onImport={handleImport}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Çocuk Danışan Ödeme Kaydı</DialogTitle>
          </DialogHeader>
          <FormBuilder
            title=""
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            initialData={editingItem}
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
