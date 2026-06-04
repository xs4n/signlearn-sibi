'use client';

import { mockSigns } from '@/lib/mockData';
import Link from 'next/link';
import { use, useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  CameraOff,
  CheckCircle2,
  RefreshCw,
  XCircle,
  RotateCcw,
  Info,
  Zap,
  Target
} from 'lucide-react';

interface PageProps {
  params: Promise<{ signId: string }>;
}

type FeedbackState = 'idle' | 'detecting' | 'correct' | 'retry' | 'wrong';

function HandLandmarkSVG({ className }: { className?: string }) {
  // Simulated hand landmarks for demo
  const landmarks = [
    // Wrist
    { x: 50, y: 85 },
    // Thumb
    { x: 32, y: 72 }, { x: 24, y: 60 }, { x: 18, y: 50 }, { x: 13, y: 42 },
    // Index
    { x: 43, y: 60 }, { x: 40, y: 40 }, { x: 38, y: 25 }, { x: 37, y: 14 },
    // Middle
    { x: 52, y: 58 }, { x: 50, y: 36 }, { x: 49, y: 20 }, { x: 49, y: 9 },
    // Ring
    { x: 61, y: 60 }, { x: 61, y: 40 }, { x: 61, y: 24 }, { x: 61, y: 14 },
    // Pinky
    { x: 70, y: 64 }, { x: 72, y: 48 }, { x: 73, y: 35 }, { x: 74, y: 26 },
  ];

  const connections = [
    [0,1],[1,2],[2,3],[3,4],        // thumb
    [0,5],[5,6],[6,7],[7,8],        // index
    [0,9],[9,10],[10,11],[11,12],   // middle
    [0,13],[13,14],[14,15],[15,16], // ring
    [0,17],[17,18],[18,19],[19,20], // pinky
    [5,9],[9,13],[13,17],           // palm
  ];

  return (
    <svg viewBox="0 0 100 100" className={className} style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.5))' }}>
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={landmarks[a].x} y1={landmarks[a].y}
          x2={landmarks[b].x} y2={landmarks[b].y}
          stroke="rgba(45,212,191,0.6)"
          strokeWidth="0.8"
        />
      ))}
      {landmarks.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={i === 0 ? 2.5 : 1.5}
          fill={i === 0 ? '#2dd4bf' : '#5eead4'}
          className="landmark-dot"
        />
      ))}
    </svg>
  );
}

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? '#2dd4bf' : score >= 65 ? '#fbbf24' : '#fb7185';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold" style={{ color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{score}</span>
        <span className="text-slate-400 text-xs">/ 100</span>
      </div>
    </div>
  );
}

export default function PracticePage({ params }: PageProps) {
  const { signId } = use(params);
  const sign = mockSigns.find(s => s.id === signId) || mockSigns[0];
  
  const [cameraActive, setCameraActive] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [score, setScore] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const signIndex = mockSigns.findIndex(s => s.id === signId);
  const prevSign = signIndex > 0 ? mockSigns[signIndex - 1] : null;
  const nextSign = signIndex < mockSigns.length - 1 ? mockSigns[signIndex + 1] : null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraActive(true);
      setFeedback('idle');
    } catch {
      alert('Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan di browser.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
    setFeedback('idle');
    setScore(0);
  };

  const startDetecting = () => {
    setIsDetecting(true);
    setFeedback('detecting');
    // Simulate detection after 2s
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100
      setScore(mockScore);
      const xp = Math.round(mockScore / 10);
      setXpGained(xp);
      if (mockScore >= 85) setFeedback('correct');
      else if (mockScore >= 65) setFeedback('retry');
      else setFeedback('wrong');
      setIsDetecting(false);
    }, 2000);
  };

  const reset = () => {
    setFeedback('idle');
    setScore(0);
    setXpGained(0);
    setIsDetecting(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const feedbackConfig = {
    idle: { color: '#64748b', bg: 'rgba(100,116,139,0.1)', icon: null, text: 'Tekan "Mulai Deteksi" untuk memulai', emoji: '' },
    detecting: { color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)', icon: null, text: 'Mendeteksi gerakan tangan...', emoji: '🔍' },
    correct: { color: '#2dd4bf', bg: 'rgba(45,212,191,0.15)', icon: CheckCircle2, text: 'Luar biasa! Isyarat benar!', emoji: '✅' },
    retry: { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)', icon: RefreshCw, text: 'Hampir benar! Coba lagi', emoji: '🔄' },
    wrong: { color: '#fb7185', bg: 'rgba(251,113,133,0.15)', icon: XCircle, text: 'Kurang tepat — perhatikan posisi jari', emoji: '❌' },
  };

  const fb = feedbackConfig[feedback];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6" style={{ background: 'var(--navy-950)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href={`/learn/${sign.category}`}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            Kembali ke modul
          </Link>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>#{signIndex + 1}</span>
            <span>/</span>
            <span>{mockSigns.length}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-400 text-xs font-semibold mb-3">
            <Target size={12} />
            Isyarat Target
          </div>
          <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {sign.nameSibi}
          </h1>
          <p className="text-slate-400 mt-2">{sign.description}</p>
        </div>

        {/* Main practice area */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          
          {/* Left: Reference */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                <Info size={14} className="text-teal-400" />
                Referensi Isyarat
              </div>
              <span className="text-xs text-slate-500">SIBI Resmi</span>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              {/* Hand shape display */}
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center"
                     style={{ background: 'rgba(15,32,64,0.8)' }}>
                  {/* Big emoji representation */}
                  <div className="text-8xl">{sign.emoji || '🤲'}</div>
                </div>
                {/* Skeleton overlay */}
                <HandLandmarkSVG className="absolute inset-0 w-full h-full opacity-60" />
              </div>
              
              <div className="text-center">
                <div className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {sign.name}
                </div>
                <div className="text-slate-400 text-sm">{sign.nameSibi}</div>
                <div className="mt-3 px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm">
                  💡 {sign.description}
                </div>
              </div>

              {/* Tips */}
              <div className="mt-4 w-full p-3 rounded-xl bg-teal-400/5 border border-teal-400/10">
                <p className="text-teal-400 text-xs font-semibold mb-1">Tips Latihan:</p>
                <p className="text-slate-400 text-xs">Pastikan tangan berada dalam frame kamera dan pencahayaan cukup terang.</p>
              </div>
            </div>
          </div>

          {/* Right: Camera */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                <Camera size={14} className="text-teal-400" />
                Kamera Kamu
              </div>
              {cameraActive && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Live
                </div>
              )}
            </div>

            <div className="relative aspect-video bg-navy-900 flex items-center justify-center"
                 style={{ background: 'rgba(10,22,40,0.8)' }}>
              {cameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  {/* Overlay grid */}
                  <div className="absolute inset-0 pointer-events-none"
                       style={{ 
                         backgroundImage: 'linear-gradient(rgba(45,212,191,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.05) 1px, transparent 1px)',
                         backgroundSize: '40px 40px'
                       }} />
                  {/* Center target */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-40 border-2 border-dashed border-teal-400/40 rounded-xl" />
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <CameraOff size={40} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 mb-4">Aktifkan kamera untuk mulai berlatih</p>
                  <button
                    id="btn-start-camera"
                    onClick={startCamera}
                    className="px-6 py-3 bg-teal-500/20 text-teal-400 font-semibold rounded-xl border border-teal-400/20 hover:bg-teal-500/30 transition-colors"
                  >
                    Aktifkan Kamera
                  </button>
                </div>
              )}

              {/* Feedback overlay */}
              {feedback !== 'idle' && cameraActive && (
                <div 
                  className="absolute bottom-4 left-4 right-4 rounded-xl p-3 text-center"
                  style={{ background: fb.bg, border: `1px solid ${fb.color}30` }}
                >
                  <span className="font-semibold text-sm" style={{ color: fb.color }}>
                    {fb.emoji} {fb.text}
                  </span>
                  {feedback === 'detecting' && (
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full animate-pulse" style={{ width: '70%' }} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Camera controls */}
            {cameraActive && (
              <div className="p-4">
                {(feedback === 'idle' || feedback === 'detecting') ? (
                  <button
                    id="btn-detect"
                    onClick={startDetecting}
                    disabled={isDetecting}
                    className="w-full py-3.5 font-bold text-white rounded-xl transition-all disabled:opacity-50"
                    style={{ background: isDetecting ? 'rgba(45,212,191,0.3)' : 'linear-gradient(135deg, #2dd4bf, #0d9488)' }}
                  >
                    {isDetecting ? '🔍 Mendeteksi...' : '▶ Mulai Deteksi'}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={reset}
                      className="flex-1 py-3 font-semibold text-slate-300 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Coba Lagi
                    </button>
                    {nextSign && (
                      <Link
                        href={`/practice/${nextSign.id}`}
                        className="flex-1 py-3 font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)' }}
                      >
                        Isyarat Berikutnya
                        <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                )}
                <button
                  onClick={stopCamera}
                  className="mt-2 w-full py-2 text-slate-500 text-sm hover:text-slate-300 transition-colors"
                >
                  Matikan Kamera
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Score & XP area */}
        {score > 0 && (
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ScoreRing score={score} size={120} />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-white font-extrabold text-2xl mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {feedback === 'correct' ? '🎉 Hebat! Isyarat Benar!' : 
                   feedback === 'retry' ? '💪 Hampir Sempurna!' : '📚 Terus Berlatih!'}
                </h3>
                <p className="text-slate-400 mb-4">
                  {feedback === 'correct' 
                    ? 'Gerakan tanganmu sangat akurat! Lanjutkan ke isyarat berikutnya.' 
                    : feedback === 'retry'
                    ? 'Posisi sudah mendekati benar. Perhatikan sudut jari-jari lebih teliti.'
                    : 'Jangan menyerah! Perhatikan kembali referensi isyarat di sebelah kiri.'}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400/10 border border-teal-400/20">
                    <Zap size={16} className="text-teal-400" />
                    <span className="text-teal-400 font-bold">+{xpGained} XP</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Target size={16} className="text-slate-400" />
                    <span className="text-slate-300">Akurasi: <strong>{score}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3">
                {prevSign && (
                  <Link
                    href={`/practice/${prevSign.id}`}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <ChevronLeft size={20} />
                  </Link>
                )}
                {nextSign && (
                  <Link
                    href={`/practice/${nextSign.id}`}
                    className="flex items-center gap-2 px-5 py-3 font-bold text-white rounded-xl transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)' }}
                  >
                    Lanjut
                    <ChevronRight size={18} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
