'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaUtensils, FaEllipsisH } from "react-icons/fa";

type Petugas = { nama: string; foto: string; };
type SubKegiatan = { nama: string; selesai: boolean; };
type Proker = { id: number; nama: string; gambar: string; catatan: string; sub_kegiatan: SubKegiatan[]; };

import jadwalData from '../public/data/jadwal.json';
import prokerData from '../public/data/proker.json';

export default function HomePage() {
  const [jadwalHariIni] = useState(jadwalData[0]);
  const [tugasAktif, setTugasAktif] = useState<string | null>(null);

  const handleTugasClick = (jenisTugas: string) => {
    setTugasAktif(tugasAktif === jenisTugas ? null : jenisTugas);
  };

  const hitungProgress = (proker: Proker) => {
    const totalSub = proker.sub_kegiatan.length;
    if (totalSub === 0) return 0;
    const selesaiSub = proker.sub_kegiatan.filter((sub) => sub.selesai).length;
    return Math.round((selesaiSub / totalSub) * 100);
  };

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="relative bg-indigo-600 p-6 rounded-b-3xl text-center text-white overflow-hidden shadow-lg">
         <h1 className="text-4xl font-bold z-10 relative">Dashboard WarTeg!</h1>
      </div>
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <input type="text" placeholder="Cari sesuatu..." className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-slate-800">JADWAL HARIAN</h2>
        <div className="text-center mb-4">
          <p className="font-semibold text-slate-600">{jadwalHariIni.hari}, {jadwalHariIni.tanggal}</p>
        </div>
        <div className="flex justify-around mb-4 text-slate-700">
          <button onClick={() => handleTugasClick('balai_desa')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-100 hover:bg-slate-200 w-24 h-24 border border-slate-200 transition-all">
            <FaHome size={28} /> 
            <span className="text-sm font-medium">Balai Desa</span>
          </button>
          <button onClick={() => handleTugasClick('masak')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-100 hover:bg-slate-200 w-24 h-24 border border-slate-200 transition-all">
            <FaUtensils size={28} />
            <span className="text-sm font-medium">Masak</span>
          </button>
          <button onClick={() => handleTugasClick('lain_lain')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-100 hover:bg-slate-200 w-24 h-24 border border-slate-200 transition-all">
            <FaEllipsisH size={28} />
            <span className="text-sm font-medium">Lain-lain</span>
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm min-h-[120px]">
          {tugasAktif === 'balai_desa' && ( <div> /* ... Konten Balai Desa ... */ </div> )}
          {tugasAktif === 'masak' && ( <div> /* ... Konten Masak ... */ </div> )}
          {tugasAktif === 'lain_lain' && ( <div> /* ... Konten Lain-lain ... */ </div> )}
          {!tugasAktif && ( <div className="flex items-center justify-center h-full pt-6"><p className="text-slate-400">Pilih jadwal untuk melihat petugas.</p></div> )}
        </div>
        <h2 className="text-xl font-bold mt-8 mb-2 text-slate-800">PROGRESS PROKER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prokerData.map((proker: Proker) => {
            const progress = hitungProgress(proker);
            return (
              <div key={proker.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                <div className="relative">
                  <Image src={proker.gambar} alt={proker.nama} width={400} height={150} className="w-full h-36 object-cover" />
                  <span className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">{progress}%</span>
                </div>
                <div className="p-3 flex justify-between items-center bg-slate-50">
                  <p className="font-semibold text-slate-800">{proker.nama}</p>
                  <Link href={`/proker/${proker.id}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Lihat Detail</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}