import Link from 'next/link';
import { mockModules, mockUser, recentActivity } from '@/lib/mockData';
import { 
  Flame, 
  Trophy, 
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  ChevronRight,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

function ProgressRing({ percentage, size = 80, strokeWidth = 6, color = '#2dd4bf' }: { 
  percentage: number; size?: number; strokeWidth?: number; color?: string 
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
}

const moduleColors: Record<string, { ring: string; bg: string; text: string; border: string }> = {
  abjad: { ring: '#2dd4bf', bg: 'rgba(45,212,191,0.08)', text: '#2dd4bf', border: 'rgba(45,212,191,0.2)' },
  angka: { ring: '#818cf8', bg: 'rgba(129,140,248,0.08)', text: '#818cf8', border: 'rgba(129,140,248,0.2)' },
  sapaan: { ring: '#fbbf24', bg: 'rgba(251,191,36,0.08)', text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
  keluarga: { ring: '#c084fc', bg: 'rgba(192,132,252,0.08)', text: '#c084fc', border: 'rgba(192,132,252,0.2)' },
  darurat: { ring: '#fb7185', bg: 'rgba(251,113,133,0.08)', text: '#fb7185', border: 'rgba(251,113,133,0.2)' },
};

export default function DashboardPage() {
  const user = mockUser;
  const totalProgress = mockModules.reduce((acc, m) => acc + m.completedSigns, 0);
  const totalSigns = mockModules.reduce((acc, m) => acc + m.totalSigns, 0);
  const overallPct = Math.round((totalProgress / totalSigns) * 100);

  const activeModule = mockModules[0]; // abjad as active

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6" style={{ background: 'var(--navy-950)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Selamat datang, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-400 mt-1">
              {user.streak > 0 
                ? `Kamu sudah belajar ${user.streak} hari berturut-turut. Pertahankan!` 
                : 'Mulai belajar hari ini dan bangun streak-mu!'}
            </p>
          </div>
          <Link
            href={`/learn/${activeModule.id}`}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold rounded-xl hover:from-teal-400 hover:to-teal-300 transition-all shadow-lg shadow-teal-500/25 hover:scale-105"
          >
            <BookOpen size={18} />
            Lanjutkan Belajar
          </Link>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Streak */}
          <div className="glass rounded-2xl p-5 border border-amber-400/10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <Flame size={20} className="text-amber-400" />
              </div>
              <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-lg">Aktif</span>
            </div>
            <div className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user.streak}
            </div>
            <div className="text-slate-400 text-sm">Hari streak</div>
          </div>

          {/* XP */}
          <div className="glass rounded-2xl p-5 border border-teal-400/10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center">
                <Zap size={20} className="text-teal-400" />
              </div>
              <span className="text-xs text-teal-400 font-semibold bg-teal-400/10 px-2 py-0.5 rounded-lg">
                {user.level}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user.totalXP.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm">Total XP</div>
          </div>

          {/* Accuracy */}
          <div className="glass rounded-2xl p-5 border border-purple-400/10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center">
                <Target size={20} className="text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user.stats.averageAccuracy}%
            </div>
            <div className="text-slate-400 text-sm">Rata-rata akurasi</div>
          </div>

          {/* Time */}
          <div className="glass rounded-2xl p-5 border border-rose-400/10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-400/10 flex items-center justify-center">
                <Clock size={20} className="text-rose-400" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user.stats.minutesPracticed}
            </div>
            <div className="text-slate-400 text-sm">Menit berlatih</div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left: Modules */}
          <div className="lg:col-span-2 space-y-4">
            {/* Overall progress */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Progress Keseluruhan
                </h2>
                <span className="text-slate-400 text-sm">{totalProgress}/{totalSigns} isyarat</span>
              </div>
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${overallPct}%`,
                    background: 'linear-gradient(90deg, #2dd4bf, #818cf8)'
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Pemula</span>
                <span className="text-teal-400 font-semibold">{overallPct}% selesai</span>
                <span className="text-slate-500">Lanjut</span>
              </div>
            </div>

            {/* Module cards */}
            <h2 className="text-white font-bold text-lg mt-6 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Modul Belajar
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockModules.map((module) => {
                const pct = Math.round((module.completedSigns / module.totalSigns) * 100);
                const colors = moduleColors[module.id] || moduleColors.abjad;
                return (
                  <Link
                    key={module.id}
                    href={`/learn/${module.id}`}
                    id={`module-${module.id}`}
                    className="glass glass-hover rounded-2xl p-5 block group"
                    style={{ borderColor: colors.border }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Progress ring */}
                      <div className="relative flex-shrink-0">
                        <ProgressRing percentage={pct} size={64} strokeWidth={5} color={colors.ring} />
                        <div className="absolute inset-0 flex items-center justify-center text-xl">
                          {module.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {module.title}
                          </h3>
                          <ChevronRight size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{module.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs" style={{ color: colors.text }}>
                            {module.completedSigns}/{module.totalSigns} isyarat
                          </span>
                          <span 
                            className="text-xs font-bold px-2 py-0.5 rounded-lg"
                            style={{ background: colors.bg, color: colors.text }}
                          >
                            {pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Active module card */}
            <div className="glass rounded-2xl p-5 border border-teal-400/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Aktif Sekarang</span>
              </div>
              <h3 className="text-white font-bold mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {activeModule.title}
              </h3>
              <p className="text-slate-400 text-xs mb-4">{activeModule.description}</p>
              <div className="relative h-2 bg-white/5 rounded-full mb-3 overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ 
                    width: `${Math.round((activeModule.completedSigns / activeModule.totalSigns) * 100)}%`,
                    background: '#2dd4bf'
                  }}
                />
              </div>
              <Link
                href={`/practice/d`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-500/20 text-teal-400 font-semibold text-sm rounded-xl border border-teal-400/20 hover:bg-teal-500/30 transition-colors"
              >
                Lanjutkan — Abjad D
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Streak calendar */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Streak Harian</h3>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Flame size={16} className="animate-fire" />
                  <span className="font-extrabold">{user.streak}</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => (
                  <div key={i} className="text-center text-slate-600 text-xs">{d}</div>
                ))}
                {Array.from({ length: 21 }).map((_, i) => {
                  const isActive = i >= 14 && i <= 20;
                  const isToday = i === 20;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-md flex items-center justify-center text-xs"
                      style={{
                        background: isActive 
                          ? isToday ? '#2dd4bf' : 'rgba(45,212,191,0.3)' 
                          : 'rgba(255,255,255,0.04)',
                        border: isToday ? '2px solid #2dd4bf' : '1px solid transparent',
                      }}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
                    </div>
                  );
                })}
              </div>
              <p className="text-slate-500 text-xs text-center">Rekor terbaik: {user.longestStreak} hari</p>
            </div>

            {/* Badges */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Badge</h3>
                <Link href="/profile" className="text-teal-400 text-xs hover:underline">Lihat semua</Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {user.badges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all"
                    style={{
                      background: badge.earned ? 'rgba(45,212,191,0.08)' : 'rgba(255,255,255,0.03)',
                      border: badge.earned ? '1px solid rgba(45,212,191,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      opacity: badge.earned ? 1 : 0.4,
                    }}
                    title={badge.description}
                  >
                    <span className="text-2xl">{badge.emoji}</span>
                    <span className="text-slate-400 text-xs text-center leading-tight">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-teal-400" />
                <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Aktivitas Terbaru</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.slice(0, 4).map((act, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-sm flex-shrink-0">
                      {act.score === 100 ? '⭐' : act.score >= 90 ? '✅' : '📝'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium">{act.sign}</div>
                      <div className="text-slate-500 text-xs">{act.module}</div>
                    </div>
                    <div 
                      className="text-sm font-bold"
                      style={{ color: act.score >= 90 ? '#2dd4bf' : act.score >= 75 ? '#fbbf24' : '#fb7185' }}
                    >
                      {act.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
