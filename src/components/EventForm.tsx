import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, Calendar, MapPin, Shirt, StickyNote, Type } from 'lucide-react';
import { api } from '../services/api';
import { Dresscode, EventData } from '../types';

export const EventForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    namaAcara: '',
    tanggalWaktu: '',
    lokasi: '',
    dresscode: '',
    note: ''
  });

  const generateId = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Date not in past
    if (!formData.tanggalWaktu) {
      toast.error('Tanggal dan waktu harus diisi');
      return;
    }
    
    const selectedDate = new Date(formData.tanggalWaktu);
    const now = new Date();
    if (selectedDate < now) {
      toast.error('Tanggal tidak boleh di masa lalu');
      return;
    }

    setLoading(true);
    const newEvent: EventData = {
      id: generateId(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    try {
      await api.createEvent(newEvent);
      toast.success('Acara berhasil dibuat!');
      setFormData({
        namaAcara: '',
        tanggalWaktu: '',
        lokasi: '',
        dresscode: '',
        note: ''
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Gagal membuat acara. Cek koneksi atau URL webhook.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-600" />
        Buat Acara Baru
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Acara */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nama Acara <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Type className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              value={formData.namaAcara}
              onChange={e => setFormData({...formData, namaAcara: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Contoh: Ulang Tahun Perusahaan"
            />
          </div>
        </div>

        {/* Tanggal & Waktu */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Tanggal & Waktu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              required
              value={formData.tanggalWaktu}
              onChange={e => setFormData({...formData, tanggalWaktu: e.target.value})}
              className="w-full pl-4 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Tempat/Alamat <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <textarea
              required
              rows={3}
              value={formData.lokasi}
              onChange={e => setFormData({...formData, lokasi: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Masukkan alamat lengkap"
            />
          </div>
        </div>

        {/* Dresscode */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Dresscode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Shirt className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              value={formData.dresscode}
              onChange={e => setFormData({...formData, dresscode: e.target.value as Dresscode})}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Contoh: Batik, Formal, Casual"
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Note (Optional)
          </label>
          <div className="relative">
            <StickyNote className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <textarea
              rows={2}
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              placeholder="Catatan tambahan..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Simpan Acara'
          )}
        </button>
      </form>
    </div>
  );
};
