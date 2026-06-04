import Link from 'next/link';
import Image from 'next/image';
import { 
  Camera, 
  BookOpen, 
  Trophy, 
  Shield, 
  Zap,
  ChevronRight,
  Star,
  CheckCircle2,
  ArrowRight,
  Globe,
  Heart,
  Play
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Deteksi Tangan Real-Time',
    description: 'AI mendeteksi gerakan tangan via webcam secara instan. Seluruh proses berjalan di browser — tidak ada data kamera dikirim ke server.',
    color: '#2dd4bf',
    badge: 'Teknologi AI',
  },
  {
    icon: BookOpen,
    title: 'Kurikulum SIBI Terstruktur',
    description: '71+ isyarat resmi dari Kemendikbud. Dari abjad dasar hingga kalimat kompleks, ikuti jalur belajar yang terstruktur dan terarah.',
    color: '#818cf8',
    badge: 'Konten Resmi',
  },
  {
    icon: Trophy,
    title: 'Gamifikasi & Progress',
    description: 'Streak harian, badge pencapaian, skor akurasi — semua dirancang untuk menjaga motivasi belajarmu tetap tinggi.',
    color: '#fbbf24',
    badge: 'Gamifikasi',
  },
  {
    icon: Shield,
    title: 'Privasi Terjaga 100%',
    description: 'Kamera tidak pernah direkam atau dikirim ke server. Deteksi gerakan tangan sepenuhnya berjalan lokal di perangkatmu.',
    color: '#34d399',
    badge: 'Privacy First',
  },
  {
    icon: Globe,
    title: 'Tanpa Install Apapun',
    description: 'Buka browser, langsung belajar. Tidak perlu download aplikasi. Works di Chrome, Firefox, Edge — desktop & mobile.',
    color: '#c084fc',
    badge: 'Browser Native',
  },
  {
    icon: Heart,
    title: 'Dibuat untuk Komunitas',
    description: 'Membantu 2,5 juta komunitas tuli di Indonesia dan keluarga mereka untuk berkomunikasi lebih baik.',
    color: '#fb7185',
    badge: 'Impact Sosial',
  },
];

const modules = [
  { icon: '🔤', title: 'Abjad A–Z', count: 26, level: 'Pemula', color: '#2dd4bf' },
  { icon: '🔢', title: 'Angka 0–9', count: 10, level: 'Pemula', color: '#818cf8' },
  { icon: '👋', title: 'Sapaan Dasar', count: 15, level: 'Pemula', color: '#fbbf24' },
  { icon: '👨‍👩‍👧', title: 'Keluarga', count: 10, level: 'Pemula', color: '#c084fc' },
  { icon: '🆘', title: 'Situasi Darurat', count: 10, level: 'Pemula', color: '#fb7185' },
];

const testimonials = [
  {
    name: 'Rina Kusuma',
    role: 'Ibu dari anak tuli, Jakarta',
    text: 'Akhirnya bisa belajar SIBI tanpa harus keluar rumah. Anakku sangat senang karena kami sekarang bisa berkomunikasi lebih lancar!',
    avatar: '👩',
  },
  {
    name: 'Pak Budi Santoso',
    role: 'Guru SLB, Surabaya',
    text: 'Tool yang sangat berguna untuk referensi mengajar. Siswa-siswa lebih antusias karena bisa langsung praktik dan dapat feedback.',
    avatar: '👨‍🏫',
  },
  {
    name: 'Maya Dewi',
    role: 'Mahasiswi Psikologi, Bandung',
    text: 'Sebagai volunteer di komunitas tuli, SignLearn sangat membantu saya belajar SIBI secara mandiri. UI-nya juga cantik banget!',
    avatar: '👩‍🎓',
  },
];

const steps = [
  { step: '01', title: 'Buka Browser', desc: 'Tidak perlu install apapun. Cukup buka signlearn.id di Chrome atau Firefox.' },
  { step: '02', title: 'Izinkan Kamera', desc: 'Izinkan akses kamera — data TIDAK dikirim ke server, aman 100%.' },
  { step: '03', title: 'Pilih Modul', desc: 'Mulai dari Abjad untuk pemula, atau langsung ke modul yang kamu butuhkan.' },
  { step: '04', title: 'Praktik & Dapat Feedback', desc: 'Lakukan isyarat di depan kamera, AI menilai akurasi secara real-time.' },
];

/* ── Tiny wrapper so we don't repeat max-width + padding ── */
function Container({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1120, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24, width: '100%', ...style }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ badge, title, subtitle }: { badge?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', marginBottom: 64 }}>
      {badge && (
        <span
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(45,212,191,0.3)', background: 'rgba(45,212,191,0.08)', color: '#2dd4bf', fontSize: 13, fontWeight: 600, marginBottom: 20 }}
        >
          {badge}
        </span>
      )}
      <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="animated-bg" style={{ minHeight: '100vh' }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80, overflow: 'hidden' }}>
        {/* Background blurs */}
        <div style={{ position: 'absolute', top: '20%', left: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, #2dd4bf, transparent)', opacity: 0.15, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, #818cf8, transparent)', opacity: 0.12, filter: 'blur(80px)', pointerEvents: 'none' }} />

        <Container style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="hero-grid">
          {/* Left column — text */}
          <div className="hero-text" style={{ maxWidth: 560 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(45,212,191,0.3)', background: 'rgba(45,212,191,0.08)', color: '#2dd4bf', fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
              <Zap size={14} style={{ fill: '#2dd4bf', color: '#2dd4bf' }} />
              Platform SIBI Pertama Berbasis AI di Indonesia
            </div>

            <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              Belajar{' '}
              <span className="gradient-text text-glow">Bahasa Isyarat</span>
              <br />dengan AI
            </h1>

            <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 36 }}>
              Pelajari Sistem Isyarat Bahasa Indonesia (SIBI) secara interaktif.
              Praktikkan gerakan tangan via kamera, dapatkan feedback real-time dari AI — gratis, tanpa install apapun.
            </p>

            {/* Mini stats */}
            <div className="hero-stats" style={{ display: 'flex', gap: 40, marginBottom: 36 }}>
              {[
                { value: '71+', label: 'Isyarat SIBI' },
                { value: '2.5 Jt', label: 'Komunitas Tuli' },
                { value: '5 Modul', label: 'Kurikulum' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 22, color: '#fff' }}>{value}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}>
              <Link
                href="/dashboard"
                id="cta-mulai-belajar"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)', color: '#fff', fontWeight: 700, fontSize: 17, borderRadius: 16, textDecoration: 'none', boxShadow: '0 12px 32px rgba(45,212,191,0.3)' }}
              >
                Mulai Belajar Gratis
                <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, fontSize: 17, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}
              >
                <Play size={16} style={{ color: '#2dd4bf' }} />
                Lihat Demo
              </a>
            </div>

            {/* Trust */}
            <div className="hero-trust" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {['Gratis Selamanya', 'Tanpa Registrasi', 'Privacy Aman', 'SIBI Resmi'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94a3b8', fontSize: 13 }}>
                  <CheckCircle2 size={13} style={{ color: '#2dd4bf' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — hero image */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div className="animate-float" style={{ position: 'relative' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', inset: -20, borderRadius: 24, background: 'radial-gradient(circle, rgba(45,212,191,0.35), rgba(129,140,248,0.2))', filter: 'blur(50px)', pointerEvents: 'none' }} />

              <div className="glass glow-teal" style={{ position: 'relative', width: 480, height: 480, maxWidth: '90vw', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(45,212,191,0.2)' }}>
                <Image
                  src="/hero-hand.png"
                  alt="Deteksi tangan SIBI dengan skeleton overlay AI"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {/* Overlay */}
                <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                  <div className="glass" style={{ borderRadius: 14, padding: 12, border: '1px solid rgba(45,212,191,0.2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="pulse-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: '#2dd4bf', position: 'relative', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Isyarat Terdeteksi</div>
                      <div style={{ color: '#2dd4bf', fontSize: 11 }}>21 titik landmark aktif</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 22, color: '#2dd4bf' }}>98%</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>akurasi</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="glass animate-slide-up" style={{ position: 'absolute', top: -14, right: -14, borderRadius: 14, padding: '10px 16px', border: '1px solid rgba(251,191,36,0.2)', animationDelay: '0.5s', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🔥</span>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>7 Hari Streak!</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>Terus semangat!</div>
                  </div>
                </div>
              </div>
              <div className="glass animate-slide-up" style={{ position: 'absolute', bottom: -14, left: -14, borderRadius: 14, padding: '10px 16px', border: '1px solid rgba(45,212,191,0.2)', animationDelay: '0.8s', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Isyarat C — Benar!</div>
                    <div style={{ fontSize: 11, color: '#2dd4bf' }}>+10 XP diperoleh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════ STATS BANNER ═══════════════ */}
      <section style={{ padding: '44px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(45,212,191,0.03)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }} className="stats-grid">
            {[
              { value: '2.5 Juta', label: 'Komunitas Tuli Indonesia', icon: '👥' },
              { value: '71+', label: 'Isyarat SIBI Resmi', icon: '🤲' },
              { value: '100%', label: 'Berjalan di Browser', icon: '🌐' },
              { value: '0 Rupiah', label: 'Biaya Kursus', icon: '💚' },
            ].map(({ value, label, icon }) => (
              <div key={label} style={{ padding: '16px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 22, color: '#fff' }}>{value}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" style={{ padding: '96px 0' }}>
        <Container>
          <SectionHeading
            badge="Mengapa SignLearn?"
            title={<>Semua yang kamu butuhkan<br /><span className="gradient-text">untuk belajar SIBI</span></>}
            subtitle="Dirancang khusus untuk komunitas Indonesia dengan pendekatan teknologi AI yang accessible dan gratis."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="features-grid">
            {features.map(({ icon: Icon, title, description, color, badge }) => (
              <div
                key={title}
                className="glass glass-hover"
                style={{ borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}30`, flexShrink: 0 }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: `${color}15`, color }}>{badge}</span>
                </div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" style={{ padding: '96px 0', background: 'rgba(45,212,191,0.02)' }}>
        <Container>
          <SectionHeading
            title={<>Cara kerja yang<br /><span className="gradient-text">super mudah</span></>}
            subtitle="Dari buka browser sampai belajar SIBI — cuma 4 langkah"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="steps-grid">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="glass" style={{ borderRadius: 20, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(13,148,136,0.15))', border: '1px solid rgba(45,212,191,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 20, color: '#2dd4bf' }}>{step}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 6 }}>{title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <Link
              href="/dashboard"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)', color: '#fff', fontWeight: 700, fontSize: 17, borderRadius: 16, textDecoration: 'none', boxShadow: '0 12px 24px rgba(45,212,191,0.25)' }}
            >
              Coba Sekarang — Gratis!
              <ChevronRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ═══════════════ CURRICULUM ═══════════════ */}
      <section id="curriculum" style={{ padding: '96px 0' }}>
        <Container>
          <SectionHeading
            title={<>Kurikulum <span className="gradient-text">SIBI Resmi</span></>}
            subtitle="5 modul dengan 71+ isyarat berdasarkan Kamus SIBI resmi Kemendikbud"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="curriculum-grid">
            {modules.map(({ icon, title, count, level, color }) => (
              <div
                key={title}
                className="glass glass-hover"
                style={{ borderRadius: 20, padding: 24, cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', borderColor: `${color}20` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: `${color}15`, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 4 }}>{title}</h3>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 12, background: `${color}20`, color }}>{level}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, marginTop: 'auto' }}>
                  <span style={{ color: '#64748b' }}>{count} isyarat</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8' }}>
                    Mulai <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}

            {/* Coming soon */}
            <div className="glass" style={{ borderRadius: 20, padding: 24, opacity: 0.45, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: 'rgba(255,255,255,0.05)', flexShrink: 0 }}>💬</div>
                <div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 4 }}>Kalimat Dasar</h3>
                  <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>Segera Hadir</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 'auto' }}>Modul menengah — coming soon</div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section style={{ padding: '96px 0', background: 'rgba(45,212,191,0.02)' }}>
        <Container>
          <SectionHeading
            title={<>Apa kata <span className="gradient-text">pengguna kami</span></>}
            subtitle="Ribuan keluarga dan pengajar sudah merasakan manfaatnya"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
            {testimonials.map(({ name, role, text, avatar }) => (
              <div key={name} className="glass glass-hover" style={{ borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>
                {/* Quote */}
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.75, marginBottom: 20, flex: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  &ldquo;{text}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(192,132,252,0.15))', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {avatar}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section style={{ padding: '96px 0' }}>
        <Container style={{ maxWidth: 880 }}>
          <div className="glass" style={{ position: 'relative', borderRadius: 28, padding: '64px 40px', textAlign: 'center', overflow: 'hidden' }}>
            {/* Glow */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.15), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>🤲</div>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
                Mulai perjalananmu<br /><span className="gradient-text">bersama SIBI hari ini</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginBottom: 32 }}>
                Bergabung dan jadilah bagian dari gerakan inklusif Indonesia.
                Komunikasi tanpa batas — belajar SIBI sekarang, gratis selamanya.
              </p>
              <Link
                href="/dashboard"
                id="cta-bottom"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 40px', background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)', color: '#fff', fontWeight: 700, fontSize: 19, borderRadius: 16, textDecoration: 'none', boxShadow: '0 16px 40px rgba(45,212,191,0.3)' }}
              >
                Mulai Belajar Gratis
                <ArrowRight size={20} />
              </Link>
              <p style={{ marginTop: 14, color: '#64748b', fontSize: 13 }}>Tidak perlu kartu kredit. Tidak perlu install apapun.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '56px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, marginBottom: 32 }} className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>SL</div>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff' }}>
                  Sign<span style={{ color: '#2dd4bf' }}>Learn</span>
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>Platform belajar SIBI interaktif berbasis AI. Gratis. Aksesibel. Untuk semua.</p>
            </div>

            {[
              { title: 'Belajar', links: ['Abjad A-Z', 'Angka', 'Sapaan', 'Keluarga', 'Darurat'] },
              { title: 'Platform', links: ['Dashboard', 'Kamus Isyarat', 'Profil', 'Leaderboard'] },
              { title: 'Info', links: ['Tentang SIBI', 'Privasi & Kamera', 'Hubungi Kami', 'Kemendikbud SIBI'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map((link) => (
                    <li key={link}><a href="#" style={{ color: '#64748b', fontSize: 14, textDecoration: 'none' }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#475569', fontSize: 13 }}>© 2026 SignLearn SIBI. Dibuat dengan ❤️ untuk komunitas tuli Indonesia.</p>
            <p style={{ color: '#475569', fontSize: 13 }}>Berbasis Kamus SIBI Resmi Kemendikbud</p>
          </div>
        </Container>
      </footer>

      {/* ═══════════════ RESPONSIVE CSS ═══════════════ */}
      <style>{`
        .hero-text { text-align: left; }
        .hero-stats { justify-content: flex-start; }
        .hero-cta { justify-content: flex-start; }
        .hero-trust { justify-content: flex-start; }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-text { text-align: center !important; max-width: 560px !important; margin: 0 auto !important; }
          .hero-stats { justify-content: center !important; }
          .hero-cta { justify-content: center !important; }
          .hero-trust { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .curriculum-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .curriculum-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
