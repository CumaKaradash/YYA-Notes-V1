"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { FormBuilder } from "@/components/form-builder"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const initialOdemelerData = [
  {
    id: 1,
    danisan: "Ayşe Kaya",
    tarih: "2024-01-15",
    seans: "Bireysel Terapi",
    tutar: "₺300",
    durum: "Ödendi",
    odeme_yontemi: "Nakit",
  },
  {
    id: 2,
    danisan: "Mehmet Demir",
    tarih: "2024-01-14",
    seans: "Çift Terapisi",
    tutar: "₺450",
    durum: "Beklemede",
    odeme_yontemi: "Kredi Kartı",
  },
  {
    id: 3,
    danisan: "Zeynep Yılmaz",
    tarih: "2024-01-13",
    seans: "MMPI Testi",
    tutar: "₺200",
    durum: "Ödendi",
    odeme_yontemi: "Havale",
  },
]

const columns = [
  { key: "danisan", label: "Danışan", sortable: true },
  { key: "tarih", label: "Tarih", sortable: true },
  { key: "seans", label: "Seans Türü" },
  { key: "tutar", label: "Tutar", sortable: true },
  { key: "durum", label: "Durum" },
  { key: "odeme_yontemi", label: "Ödeme Yöntemi" },
]

const formFields = [
  {
    name: "danisan",
    label: "Danışan",
    type: "select" as const,
    options: ["Ayşe Kaya", "Mehmet Demir", "Zeynep Yılmaz"],
    required: true,
  },
  { name: "tarih", label: "Tarih", type: "date" as const, required: true },
  {
    name: "seans",
    label: "Seans Türü",
    type: "select" as const,
    options: ["Bireysel Terapi", "Çift Terapisi", "MMPI Testi", "SCİD Testi"],
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
  {
    name: "odeme_yontemi",
    label: "Ödeme Yöntemi",
    type: "select" as const,
    options: ["Nakit", "Kredi Kartı", "Havale", "EFT"],
    required: true,
  },
]

export default function DanisanOdemeleriPage() {
  const [odemelerData, setOdemelerData] = useState(initialOdemelerData)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const handleSubmit = (data: any) => {
    if (editingItem) {
      setOdemelerData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...data, id: editingItem.id } : item)),
      )
    } else {
      const newId = Math.max(...odemelerData.map((item) => item.id)) + 1
      setOdemelerData((prev) => [...prev, { ...data, id: newId }])
    }
    setShowForm(false)
    setEditingItem(null)
  }

  const handleImport = (importedData: any[]) => {
    console.log("İçeri aktarılan ödeme verileri:", importedData)

    const formattedData = importedData.map((item, index) => ({
      id: Math.max(...odemelerData.map((o) => o.id)) + index + 1,
      danisan: item.danisan || item.Danisan || "",
      tarih: item.tarih || item.Tarih || "",
      seans: item.seans || item.Seans || item["Seans Türü"] || "Bireysel Terapi",
      tutar: item.tutar || item.Tutar || "₺0",
      durum: item.durum || item.Durum || "Beklemede",
      odeme_yontemi: item.odeme_yontemi || item["Ödeme Yöntemi"] || item.odeme_yontemi || "Nakit",
    }))

    setOdemelerData((prev) => [...prev, ...formattedData])
  }

  const handleDelete = (item: any) => {
    setOdemelerData((prev) => prev.filter((odeme) => odeme.id !== item.id))
  }

  return (
    <main className="w-[85%] mx-auto px-4 py-6">
      <PageHeader title="Danışan Ödemeleri" description="Danışan ödeme kayıtlarını takip edin" />

      <DataTable
        title="Ödeme Listesi"
        columns={columns}
        data={odemelerData}
        onAdd={() => setShowForm(true)}
        onEdit={setEditingItem}
        onDelete={handleDelete}
        onImport={handleImport}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Ödeme Kaydı</DialogTitle>
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
