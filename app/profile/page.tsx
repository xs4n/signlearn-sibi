import { mockUser, mockModules, recentActivity } from '@/lib/mockData';
import Link from 'next/link';
import { 
  Flame, 
  Target, 
  Clock, 
  BookOpen,
  TrendingUp,
  Award,
  Settings,
  Edit2,
  Share2,
  Calendar,
  Zap
} from 'lucide-react';

function StatCard({ icon: Icon, value, label, color }: { 
  icon: typeof Flame; value: string | number; label: string; color: string 
}) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div 
        className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{value}</div>
      <div className="text-slate-500 text-xs mt-0.5">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const user = mockUser;

  const totalProgress = mockModules.reduce((a, m) => a + m.completedSigns, 0);
  const totalSigns = mockModules.reduce((a, m) => a + m.totalSigns, 0);
  const overallPct = Math.round((totalProgress / totalSigns) * 100);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6" style={{ background: 'var(--navy-950)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Profile header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 via-teal-500 to-purple-500 flex items-center justify-center text-4xl font-extrabold text-white shadow-xl"
                   style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 0 30px rgba(45,212,191,0.4)' }}>
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-sm shadow-lg">
                🔥
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-teal-400/15 text-teal-400 border border-teal-400/20">
                  {user.level}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-3">{user.email}</p>
              
              {/* XP bar */}
              <div className="max-w-xs mx-auto sm:mx-0">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>XP: {user.totalXP}</span>
                  <span>Level berikutnya: 2000 XP</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${(user.totalXP / 2000) * 100}%`,
                      background: 'linear-gradient(90deg, #2dd4bf, #818cf8)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button 
                id="btn-edit-profile"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Edit2 size={14} />
                Edit Profil
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <Share2 size={14} />
                Bagikan
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <Settings size={14} />
                Pengaturan
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Flame} value={user.streak} label="Hari Streak" color="#fbbf24" />
          <StatCard icon={Target} value={`${user.stats.averageAccuracy}%`} label="Rata-rata Akurasi" color="#2dd4bf" />
          <StatCard icon={BookOpen} value={user.stats.totalSignsPracticed} label="Isyarat Dipelajari" color="#818cf8" />
          <StatCard icon={Clock} value={user.stats.minutesPracticed} label="Menit Berlatih" color="#c084fc" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left: Badges */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges collection */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Award size={18} className="text-amber-400" />
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Koleksi Badge
                </h2>
                <span className="ml-auto text-slate-500 text-sm">
                  {user.badges.filter(b => b.earned).length}/{user.badges.length} diperoleh
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {user.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="rounded-2xl p-4 text-center transition-all"
                    style={{
                      background: badge.earned ? 'rgba(45,212,191,0.06)' : 'rgba(255,255,255,0.03)',
                      border: badge.earned ? '1px solid rgba(45,212,191,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      opacity: badge.earned ? 1 : 0.45,
                    }}
                  >
                    <div className="text-4xl mb-2">{badge.emoji}</div>
                    <div className="text-white font-semibold text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      {badge.name}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">{badge.description}</div>
                    {badge.earned && (
                      <div className="mt-2 text-xs text-teal-400 font-semibold">✓ Diperoleh</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Module progress */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={18} className="text-teal-400" />
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Progress Modul
                </h2>
              </div>

              <div className="space-y-4">
                {mockModules.map((module) => {
                  const pct = Math.round((module.completedSigns / module.totalSigns) * 100);
                  const colorMap: Record<string, string> = {
                    teal: '#2dd4bf', blue: '#818cf8', amber: '#fbbf24',
                    purple: '#c084fc', rose: '#fb7185',
                  };
                  const color = colorMap[module.color];
                  return (
                    <div key={module.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{module.icon}</span>
                          <span className="text-white text-sm font-medium">{module.title}</span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color }}>
                          {module.completedSigns}/{module.totalSigns}
                        </span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white font-semibold text-sm">Total Progress</span>
                  <span className="text-teal-400 font-bold">{overallPct}%</span>
                </div>
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ 
                      width: `${overallPct}%`,
                      background: 'linear-gradient(90deg, #2dd4bf, #818cf8)' 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Streak info */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame size={16} className="text-amber-400 animate-fire" />
                <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Streak</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 rounded-xl bg-amber-400/8 border border-amber-400/15">
                  <div className="text-2xl font-extrabold text-amber-400" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {user.streak}
                  </div>
                  <div className="text-slate-500 text-xs">Saat ini</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {user.longestStreak}
                  </div>
                  <div className="text-slate-500 text-xs">Terpanjang</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-xs">Bergabung sejak</div>
                <div className="text-white text-sm font-semibold mt-0.5">
                  {new Date(user.joinedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-teal-400" />
                <h3 className="text-white font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Aktivitas Terbaru
                </h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/3 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-sm flex-shrink-0">
                      {act.score === 100 ? '⭐' : act.score >= 90 ? '✅' : '📝'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium">{act.sign}</div>
                      <div className="text-slate-500 text-xs">{act.module} · {act.date}</div>
                    </div>
                    <div 
                      className="text-sm font-bold flex-shrink-0"
                      style={{ color: act.score >= 90 ? '#2dd4bf' : act.score >= 75 ? '#fbbf24' : '#fb7185' }}
                    >
                      {act.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Aksi Cepat
              </h3>
              <div className="space-y-2">
                {[
                  { href: '/learn/abjad', icon: BookOpen, label: 'Lanjutkan Abjad', color: '#2dd4bf' },
                  { href: '/dictionary', icon: Target, label: 'Buka Kamus', color: '#818cf8' },
                  { href: '/practice/halo', icon: Zap, label: 'Latih: Halo', color: '#fbbf24' },
                ].map(({ href, icon: Icon, label, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/8 transition-colors group"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
