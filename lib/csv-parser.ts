export interface DanisanOdeme {
  tarih: string
  odemeTarihi: string
  adiSoyadi: string
  seansSayisi: string
  odemeYontemi: string
  terapist: string
  gorusmeTipi: string
  fiyatTarifesi: string
  danisanTuru: string
  hizmetBedeli: string
  odenenUcret: string
  danisanBorcu: string
  aciklama: string
  odemePlani: string
}

export interface Gider {
  tarih: string
  giderTuru: string
  giderCesidi: string
  odemeSekli: string
  harcamaTutari: string
  aciklama: string
}

export function parseCSV(csvContent: string, delimiter: string = ';'): string[][] {
  const lines = csvContent.split('\n').filter((line: string) => line.trim())
  return lines.map((line: string) => 
    line.split(delimiter).map((cell: string) => cell.trim().replace(/"/g, ''))
  )
}

export function parseDanisanOdemeleri(csvContent: string): DanisanOdeme[] {
  const rows = parseCSV(csvContent)
  const headers = rows[0]
  const dataRows = rows.slice(1)
  
  return dataRows.map(row => ({
    tarih: row[0] || '',
    odemeTarihi: row[1] || '',
    adiSoyadi: row[2] || '',
    seansSayisi: row[3] || '',
    odemeYontemi: row[4] || '',
    terapist: row[5] || '',
    gorusmeTipi: row[6] || '',
    fiyatTarifesi: row[7] || '',
    danisanTuru: row[8] || '',
    hizmetBedeli: row[9] || '',
    odenenUcret: row[10] || '',
    danisanBorcu: row[11] || '',
    aciklama: row[12] || '',
    odemePlani: row[13] || ''
  }))
}

export function parseGiderler(csvContent: string): Gider[] {
  const rows = parseCSV(csvContent)
  const headers = rows[0]
  const dataRows = rows.slice(1)
  
  return dataRows.map(row => ({
    tarih: row[0] || '',
    giderTuru: row[1] || '',
    giderCesidi: row[2] || '',
    odemeSekli: row[3] || '',
    harcamaTutari: row[4] || '',
    aciklama: row[5] || ''
  }))
}

export function formatCurrency(amount: string): string {
  // TRY, TL gibi para birimlerini temizle ve sayısal değere çevir
  const cleanAmount = amount.replace(/[^\d,.-]/g, '').replace(',', '.')
  const numAmount = parseFloat(cleanAmount)
  
  if (isNaN(numAmount)) return '0.00'
  
  return numAmount.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  })
}

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  
  // DD.MM.YYYY formatını parse et
  const parts = dateStr.split('.')
  if (parts.length === 3) {
    const day = parseInt(parts[0])
    const month = parseInt(parts[1]) - 1 // JavaScript'te ay 0'dan başlar
    const year = parseInt(parts[2])
    
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day)
    }
  }
  
  return null
} 