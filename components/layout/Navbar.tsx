'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  BookOpen, 
  Grid3X3, 
  User, 
  Search, 
  Bell, 
  Flame,
  Menu,
  X,
  HandMetal
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Grid3X3 },
  { href: '/learn', label: 'Belajar', icon: BookOpen },
  { href: '/dictionary', label: 'Kamus', icon: Search },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === '/';

  /* ─── Landing page navbar ─── */
  if (isHome) {
    return (
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '16px 24px',
        background: 'rgba(2,8,23,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HandMetal size={18} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff' }}>
              Sign<span style={{ color: '#2dd4bf' }}>Learn</span>
            </span>
          </Link>

          {/* Center links — desktop */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { href: '#features', label: 'Fitur' },
              { href: '#how-it-works', label: 'Cara Kerja' },
              { href: '#curriculum', label: 'Kurikulum' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#2dd4bf')}
                 onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right — CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/dashboard"
              className="nav-desktop-cta"
              style={{ padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 20px rgba(45,212,191,0.25)' }}
            >
              Mulai Belajar Gratis
            </Link>
            <button
              className="nav-mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 4 }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="glass" style={{ marginTop: 16, borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Fitur', 'Cara Kerja', 'Kurikulum'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  style={{ color: '#cbd5e1', padding: '10px 16px', borderRadius: 12, textDecoration: 'none', fontSize: 15 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/dashboard"
                style={{ marginTop: 8, padding: '12px 20px', textAlign: 'center', fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #14b8a6, #0d9488)', borderRadius: 12, textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
              >
                Mulai Belajar Gratis
              </Link>
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .nav-desktop-links { display: none !important; }
            .nav-desktop-cta { display: none !important; }
            .nav-mobile-btn { display: block !important; }
          }
        `}</style>
      </nav>
    );
  }

  /* ─── App navbar (dashboard, learn, practice, etc.) ─── */
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(2,8,23,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HandMetal size={16} style={{ color: '#fff' }} />
            </div>
            <span className="nav-logo-text" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff' }}>
              Sign<span style={{ color: '#2dd4bf' }}>Learn</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-app-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 12,
                    fontSize: 14, fontWeight: 500, textDecoration: 'none',
                    color: active ? '#2dd4bf' : '#94a3b8',
                    background: active ? 'rgba(45,212,191,0.1)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Streak badge */}
            <div className="nav-streak" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 12, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <Flame size={14} className="animate-fire" style={{ color: '#fbbf24' }} />
              <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: 14 }}>7</span>
            </div>

            {/* Notification bell */}
            <button
              aria-label="Notifikasi"
              style={{ position: 'relative', width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}
            >
              <Bell size={16} />
              <span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: '50%', background: '#2dd4bf' }} />
            </button>

            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #2dd4bf, #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              A
            </div>

            {/* Mobile menu button */}
            <button
              className="nav-app-mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 4, marginLeft: 4 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div style={{ paddingBottom: 16, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 12,
                      fontSize: 15, fontWeight: 500, textDecoration: 'none',
                      color: active ? '#2dd4bf' : '#94a3b8',
                      background: active ? 'rgba(45,212,191,0.1)' : 'transparent',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-app-links { display: none !important; }
          .nav-streak { display: none !important; }
          .nav-logo-text { display: none !important; }
          .nav-app-mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
