"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const butceKategorileri = [
  {
    kategori: "Ofis Kirası",
    butce: 6000,
    harcanan: 6000,
    kalan: 0,
    durum: "Tamamlandı",
    renk: "bg-green-500",
  },
  {
    kategori: "Kırtasiye & Malzeme",
    butce: 3000,
    harcanan: 2100,
    kalan: 900,
    durum: "Normal",
    renk: "bg-blue-500",
  },
  {
    kategori: "Ulaşım",
    butce: 2000,
    harcanan: 1850,
    kalan: 150,
    durum: "Dikkat",
    renk: "bg-orange-500",
  },
  {
    kategori: "Eğitim & Gelişim",
    butce: 4000,
    harcanan: 4200,
    kalan: -200,
    durum: "Aşıldı",
    renk: "bg-red-500",
  },
  {
    kategori: "Teknoloji",
    butce: 2500,
    harcanan: 1200,
    kalan: 1300,
    durum: "Normal",
    renk: "bg-blue-500",
  },
]

const getDurumIcon = (durum: string) => {
  switch (durum) {
    case "Tamamlandı":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "Dikkat":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />
    case "Aşıldı":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    default:
      return <Target className="h-4 w-4 text-blue-600" />
  }
}

const getDurumBadge = (durum: string) => {
  const variants = {
    Tamamlandı: "default",
    Normal: "secondary",
    Dikkat: "destructive",
    Aşıldı: "destructive",
  }
  return (
    <Badge variant={variants[durum as keyof typeof variants] as any} className="text-xs">
      {durum}
    </Badge>
  )
}

export default function ButceTakibiPage() {
  const toplamButce = butceKategorileri.reduce((sum, item) => sum + item.butce, 0)
  const toplamHarcanan = butceKategorileri.reduce((sum, item) => sum + item.harcanan, 0)
  const toplamKalan = toplamButce - toplamHarcanan
  const kullanımOrani = (toplamHarcanan / toplamButce) * 100

  return (
    <main className="w-[85%] mx-auto px-4 py-6">
      <PageHeader title="Bütçe Takibi" description="Aylık bütçe planlaması ve takip sistemi">
        <Button>Bütçe Planı Düzenle</Button>
      </PageHeader>

      {/* Genel Özet */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Toplam Bütçe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{toplamButce.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Bu ay için</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Harcanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₺{toplamHarcanan.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">%{kullanımOrani.toFixed(1)} kullanıldı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Kalan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${toplamKalan >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₺{Math.abs(toplamKalan).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{toplamKalan >= 0 ? "Bütçe içinde" : "Bütçe aşıldı"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Kullanım Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{kullanımOrani.toFixed(1)}</div>
            <Progress value={kullanımOrani} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Kategori Detayları */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Bazında Bütçe Takibi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {butceKategorileri.map((item, index) => {
              const kullanımYuzdesi = (item.harcanan / item.butce) * 100
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDurumIcon(item.durum)}
                      <span className="font-medium">{item.kategori}</span>
                      {getDurumBadge(item.durum)}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ₺{item.harcanan.toLocaleString()} / ₺{item.butce.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.kalan >= 0
                          ? `₺${item.kalan.toLocaleString()} kaldı`
                          : `₺${Math.abs(item.kalan).toLocaleString()} aşıldı`}
                      </div>
                    </div>
                  </div>
                  <Progress value={Math.min(kullanımYuzdesi, 100)} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>%{kullanımYuzdesi.toFixed(1)} kullanıldı</span>
                    <span>
                      {kullanımYuzdesi > 100 ? "Bütçe aşıldı" : `%${(100 - kullanımYuzdesi).toFixed(1)} kaldı`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Öneriler */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Bütçe Önerileri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Ulaşım bütçesi tükenmek üzere</p>
                <p className="text-xs text-muted-foreground">Kalan ₺150 ile ayın geri kalanını planlamanız önerilir.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Eğitim & Gelişim bütçesi aşıldı</p>
                <p className="text-xs text-muted-foreground">
                  ₺200 fazla harcama yapıldı. Gelecek ay için bütçe artırımı düşünülebilir.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Teknoloji bütçesi verimli kullanılıyor</p>
                <p className="text-xs text-muted-foreground">
                  ₺1,300 tasarruf sağlandı. Bu miktar diğer kategorilere aktarılabilir.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
