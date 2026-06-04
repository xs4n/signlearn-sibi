import { mockModules } from '@/lib/mockData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Lock, Play, Star } from 'lucide-react';

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function LearnModulePage({ params }: PageProps) {
  const { moduleId } = await params;
  const module = mockModules.find(m => m.id === moduleId);

  if (!module) notFound();

  const levelColorMap: Record<string, { bg: string; text: string; border: string }> = {
    teal: { bg: 'rgba(45,212,191,0.1)', text: '#2dd4bf', border: 'rgba(45,212,191,0.2)' },
    blue: { bg: 'rgba(129,140,248,0.1)', text: '#818cf8', border: 'rgba(129,140,248,0.2)' },
    amber: { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
    purple: { bg: 'rgba(192,132,252,0.1)', text: '#c084fc', border: 'rgba(192,132,252,0.2)' },
    rose: { bg: 'rgba(251,113,133,0.1)', text: '#fb7185', border: 'rgba(251,113,133,0.2)' },
  };
  const colors = levelColorMap[module.color] || levelColorMap.teal;

  const completedCount = module.signs.filter(s => s.completed).length;
  const pct = module.signs.length > 0 ? Math.round((completedCount / module.signs.length) * 100) : 0;

  // Generate all signs for display (fill up to totalSigns if mock data is smaller)
  const allSigns = [...module.signs];
  // Add placeholder signs to reach totalSigns
  const existingIds = new Set(allSigns.map(s => s.id));
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = allSigns.length; i < module.totalSigns; i++) {
    const char = module.id === 'abjad' ? alphabet[i] : `${i}`;
    const id = char.toLowerCase();
    if (!existingIds.has(id)) {
      allSigns.push({
        id,
        name: char,
        nameSibi: `${module.title} ${char}`,
        category: module.signs[0]?.category || 'abjad',
        level: 'pemula',
        description: `Isyarat ${module.title} ${char}`,
        completed: false,
        accuracy: 0,
      } as typeof allSigns[0]);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6" style={{ background: 'var(--navy-950)' }}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={16} />
            Dashboard
          </Link>

          <div className="glass rounded-2xl p-6" style={{ borderColor: colors.border }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: colors.bg }}
              >
                {module.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {module.title}
                  </h1>
                  <span 
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {module.level}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{module.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold" style={{ color: colors.text, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {pct}%
                </div>
                <div className="text-slate-500 text-xs">{completedCount}/{module.totalSigns} selesai</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${colors.text}, ${colors.text}88)` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          {['Semua', 'Belum Selesai', 'Sudah Selesai'].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                i === 0 
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-400/20' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto text-slate-500 text-sm">{module.totalSigns} isyarat total</div>
        </div>

        {/* Signs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {allSigns.map((sign) => {
            const isLocked = !sign.completed && allSigns.findIndex(s => s.id === sign.id) > completedCount + 2;
            return (
              <Link
                key={sign.id}
                href={isLocked ? '#' : `/practice/${sign.id}`}
                id={`sign-${sign.id}`}
                className={`glass rounded-2xl p-4 text-center group transition-all duration-200 ${
                  isLocked ? 'opacity-40 cursor-not-allowed' : 'glass-hover cursor-pointer'
                } ${sign.completed ? 'border-teal-400/20' : ''}`}
              >
                {/* Status icon */}
                <div className="absolute top-2 right-2">
                  {sign.completed ? (
                    <CheckCircle2 size={14} className="text-teal-400" />
                  ) : isLocked ? (
                    <Lock size={14} className="text-slate-600" />
                  ) : null}
                </div>

                {/* Sign emoji/avatar */}
                <div 
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl font-extrabold text-white"
                  style={{ 
                    background: sign.completed 
                      ? 'rgba(45,212,191,0.15)' 
                      : 'rgba(255,255,255,0.05)',
                    border: sign.completed ? '1px solid rgba(45,212,191,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif'
                  }}
                >
                  {sign.emoji || sign.name}
                </div>

                <div className="text-white font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {sign.name}
                </div>
                <div className="text-slate-500 text-xs mt-0.5 truncate">{sign.nameSibi}</div>

                {/* Accuracy badge */}
                {sign.completed && sign.accuracy && (
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-teal-400">
                    <Star size={10} className="fill-teal-400" />
                    {sign.accuracy}%
                  </div>
                )}

                {/* Practice button on hover */}
                {!sign.completed && !isLocked && (
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center gap-1 text-xs text-teal-400">
                      <Play size={10} />
                      Latih
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick practice CTA */}
        <div className="mt-8 glass rounded-2xl p-6 text-center" style={{ borderColor: colors.border }}>
          <p className="text-slate-400 mb-4">Siap untuk mode latihan terstruktur?</p>
          <Link
            href={`/practice/${allSigns.find(s => !s.completed)?.id || allSigns[0]?.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${colors.text}, ${colors.text}99)` }}
          >
            <Play size={18} />
            Mulai Mode Pelajaran
          </Link>
        </div>
      </div>
    </div>
  );
}
