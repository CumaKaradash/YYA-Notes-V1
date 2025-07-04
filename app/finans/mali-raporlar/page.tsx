"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, DollarSign, Download } from "lucide-react"

const raporData = {
  aylikGelir: "₺45,600",
  aylikGider: "₺12,300",
  netKar: "₺33,300",
  danisanSayisi: 28,
  seansOrtalama: "₺350",
  odemeOrani: "%94",
}

export default function MaliRaporlarPage() {
  return (
    <main className="w-[85%] mx-auto px-4 py-6">
      <PageHeader title="Mali Raporlar" description="Detaylı finansal analiz ve raporlar">
        <div className="flex space-x-2">
          <Select defaultValue="bu-ay">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bu-ay">Bu Ay</SelectItem>
              <SelectItem value="gecen-ay">Geçen Ay</SelectItem>
              <SelectItem value="bu-yil">Bu Yıl</SelectItem>
              <SelectItem value="gecen-yil">Geçen Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            PDF İndir
          </Button>
        </div>
      </PageHeader>

      {/* Özet Kartlar */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{raporData.aylikGelir}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Gider</CardTitle>
            <BarChart3 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{raporData.aylikGider}</div>
            <p className="text-xs text-muted-foreground">+3% geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Kar</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{raporData.netKar}</div>
            <p className="text-xs text-muted-foreground">+15% geçen aya göre</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gelir Analizi */}
        <Card>
          <CardHeader>
            <CardTitle>Gelir Analizi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Bireysel Terapi</span>
                <span className="font-medium">₺28,000 (61%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "61%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Çift Terapisi</span>
                <span className="font-medium">₺12,600 (28%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "28%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Test Değerlendirmeleri</span>
                <span className="font-medium">₺5,000 (11%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "11%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gider Analizi */}
        <Card>
          <CardHeader>
            <CardTitle>Gider Analizi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ofis Kirası</span>
                <span className="font-medium">₺6,000 (49%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: "49%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Kırtasiye & Malzeme</span>
                <span className="font-medium">₺2,800 (23%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: "23%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Ulaşım</span>
                <span className="font-medium">₺1,500 (12%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "12%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Diğer</span>
                <span className="font-medium">₺2,000 (16%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: "16%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danışan İstatistikleri */}
        <Card>
          <CardHeader>
            <CardTitle>Danışan İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{raporData.danisanSayisi}</div>
                <p className="text-sm text-muted-foreground">Aktif Danışan</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{raporData.seansOrtalama}</div>
                <p className="text-sm text-muted-foreground">Seans Ortalaması</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{raporData.odemeOrani}</div>
                <p className="text-sm text-muted-foreground">Ödeme Oranı</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <p className="text-sm text-muted-foreground">Memnuniyet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aylık Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Aylık Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span className="text-sm">Ocak 2024</span>
                <span className="font-medium text-green-600">₺31,200</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span className="text-sm">Şubat 2024</span>
                <span className="font-medium text-green-600">₺28,900</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-primary/10 rounded border border-primary/20">
                <span className="text-sm font-medium">Mart 2024</span>
                <span className="font-bold text-primary">₺33,300</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
