'use client';

import { mockSigns } from '@/lib/mockData';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Info, BookOpen } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  abjad: 'Abjad',
  angka: 'Angka',
  sapaan: 'Sapaan',
  keluarga: 'Keluarga',
  darurat: 'Darurat',
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  abjad: { bg: 'rgba(45,212,191,0.1)', text: '#2dd4bf', border: 'rgba(45,212,191,0.2)' },
  angka: { bg: 'rgba(129,140,248,0.1)', text: '#818cf8', border: 'rgba(129,140,248,0.2)' },
  sapaan: { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
  keluarga: { bg: 'rgba(192,132,252,0.1)', text: '#c084fc', border: 'rgba(192,132,252,0.2)' },
  darurat: { bg: 'rgba(251,113,133,0.1)', text: '#fb7185', border: 'rgba(251,113,133,0.2)' },
};

export default function DictionaryPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSign, setSelectedSign] = useState<typeof mockSigns[0] | null>(null);

  const filtered = useMemo(() => {
    return mockSigns.filter(sign => {
      const matchesQuery = query.trim() === '' || 
        sign.name.toLowerCase().includes(query.toLowerCase()) ||
        sign.nameSibi.toLowerCase().includes(query.toLowerCase()) ||
        sign.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || sign.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const categories = Object.keys(categoryLabels);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6" style={{ background: 'var(--navy-950)' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-400 text-sm font-medium mb-4">
            <BookOpen size={14} />
            Kamus SIBI Resmi
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Kamus <span className="gradient-text">Isyarat SIBI</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Temukan dan pelajari isyarat SIBI resmi dari Kemendikbud. Tersedia video demo, skeleton overlay, dan nama resmi.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="dictionary-search"
            type="text"
            placeholder="Cari isyarat (contoh: Halo, A, Ibu...)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-4 rounded-2xl text-white placeholder-slate-500 bg-white/5 border border-white/10 focus:border-teal-400/40 focus:bg-white/8 outline-none transition-all text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              aria-label="Hapus pencarian"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !activeCategory 
                ? 'bg-teal-500/20 text-teal-400 border border-teal-400/30' 
                : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Semua ({mockSigns.length})
          </button>
          {categories.map(cat => {
            const c = categoryColors[cat];
            const count = mockSigns.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
                style={{
                  background: activeCategory === cat ? c.bg : 'transparent',
                  color: activeCategory === cat ? c.text : '#64748b',
                  borderColor: activeCategory === cat ? c.border : 'transparent',
                }}
              >
                {categoryLabels[cat]} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-500 text-sm">
            {filtered.length} isyarat ditemukan
            {query && <span className="text-teal-400"> untuk &quot;{query}&quot;</span>}
          </p>
        </div>

        {/* Signs grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((sign) => {
              const c = categoryColors[sign.category];
              return (
                <button
                  key={sign.id}
                  id={`dict-sign-${sign.id}`}
                  onClick={() => setSelectedSign(sign)}
                  className="glass glass-hover rounded-2xl p-4 text-center group text-left"
                >
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl font-extrabold"
                    style={{ background: c.bg, fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'white' }}
                  >
                    {sign.emoji || sign.name}
                  </div>
                  <div className="text-white font-bold text-sm text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {sign.name}
                  </div>
                  <div 
                    className="text-xs text-center mt-1 px-2 py-0.5 rounded-lg mx-auto w-fit"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {categoryLabels[sign.category]}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg mb-2">Tidak ada isyarat ditemukan</p>
            <p className="text-slate-600 text-sm">Coba kata kunci yang berbeda</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(null); }}
              className="mt-4 px-4 py-2 text-teal-400 text-sm hover:underline"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>

      {/* Sign Detail Modal */}
      {selectedSign && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedSign(null)}
        >
          <div 
            className="glass rounded-3xl p-8 w-full max-w-lg relative animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Hand display */}
              <div 
                className="w-28 h-28 rounded-2xl mx-auto mb-4 flex items-center justify-center text-5xl"
                style={{ background: categoryColors[selectedSign.category].bg }}
              >
                {selectedSign.emoji || selectedSign.name}
              </div>

              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ 
                  background: categoryColors[selectedSign.category].bg,
                  color: categoryColors[selectedSign.category].text 
                }}
              >
                {categoryLabels[selectedSign.category]}
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {selectedSign.name}
              </h2>
              <p className="text-slate-400 mb-2">{selectedSign.nameSibi}</p>

              <div className="mt-4 p-4 rounded-xl bg-white/5 text-left">
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">{selectedSign.description}</p>
                </div>
              </div>

              {/* Accuracy if completed */}
              {selectedSign.completed && selectedSign.accuracy && (
                <div className="mt-4 flex items-center justify-center gap-2 text-teal-400">
                  <span className="text-sm">Akurasi terbaikmu:</span>
                  <span className="font-extrabold text-lg">{selectedSign.accuracy}%</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <Link
                  href={`/practice/${selectedSign.id}`}
                  className="flex-1 py-3 font-bold text-white rounded-xl text-sm transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)' }}
                  onClick={() => setSelectedSign(null)}
                >
                  🎥 Latih Sekarang
                </Link>
                <Link
                  href={`/learn/${selectedSign.category}`}
                  className="flex-1 py-3 font-semibold text-slate-300 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm"
                  onClick={() => setSelectedSign(null)}
                >
                  📚 Buka Modul
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
