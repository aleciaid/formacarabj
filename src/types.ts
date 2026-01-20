export type Dresscode = 'Batik' | 'Formal' | 'Casual' | 'Smart Casual' | 'Traditional' | string;

export interface EventData {
  id: string;
  namaAcara: string;
  tanggalWaktu: string;
  lokasi: string;
  dresscode: Dresscode;
  note?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}export type Dresscode = 'Batik' | 'Formal' | 'Casual' | 'Smart Casual' | 'Traditional' | string;

export interface EventData {
  id: string;
  namaAcara: string;
  tanggalWaktu: string;
  lokasi: string;
  dresscode: Dresscode;
  note?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}