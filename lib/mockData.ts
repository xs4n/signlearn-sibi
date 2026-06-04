// Mock data for SignLearn SIBI
// This represents what would come from Supabase in production

export interface Sign {
  id: string;
  name: string;
  nameSibi: string;
  category: 'abjad' | 'angka' | 'sapaan' | 'keluarga' | 'darurat';
  level: 'pemula' | 'menengah' | 'lanjut';
  description: string;
  emoji?: string;
  handShape: string; // description of hand shape
  completed?: boolean;
  accuracy?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: 'pemula' | 'menengah' | 'lanjut';
  icon: string;
  color: string;
  totalSigns: number;
  completedSigns: number;
  signs: Sign[];
}

export const mockSigns: Sign[] = [
  // Abjad
  { id: 'a', name: 'A', nameSibi: 'Abjad A', category: 'abjad', level: 'pemula', description: 'Kepalan tangan dengan ibu jari di samping', emoji: '✊', handShape: 'fist', completed: true, accuracy: 95 },
  { id: 'b', name: 'B', nameSibi: 'Abjad B', category: 'abjad', level: 'pemula', description: 'Empat jari lurus ke atas, ibu jari dilipat', emoji: '🖐️', handShape: 'four-up', completed: true, accuracy: 88 },
  { id: 'c', name: 'C', nameSibi: 'Abjad C', category: 'abjad', level: 'pemula', description: 'Tangan membentuk huruf C', emoji: '🤌', handShape: 'c-shape', completed: true, accuracy: 92 },
  { id: 'd', name: 'D', nameSibi: 'Abjad D', category: 'abjad', level: 'pemula', description: 'Telunjuk lurus, jari lain membentuk lingkaran', emoji: '☝️', handShape: 'index-circle', completed: false, accuracy: 0 },
  { id: 'e', name: 'E', nameSibi: 'Abjad E', category: 'abjad', level: 'pemula', description: 'Jari-jari melengkung ke bawah', emoji: '🤙', handShape: 'curved-down', completed: false, accuracy: 0 },
  { id: 'f', name: 'F', nameSibi: 'Abjad F', category: 'abjad', level: 'pemula', description: 'Ibu jari dan telunjuk membentuk lingkaran', emoji: '👌', handShape: 'ok-sign', completed: false, accuracy: 0 },
  { id: 'g', name: 'G', nameSibi: 'Abjad G', category: 'abjad', level: 'pemula', description: 'Telunjuk dan ibu jari menunjuk ke samping', emoji: '👉', handShape: 'side-point', completed: false, accuracy: 0 },
  { id: 'h', name: 'H', nameSibi: 'Abjad H', category: 'abjad', level: 'pemula', description: 'Telunjuk dan jari tengah lurus ke samping', emoji: '✌️', handShape: 'two-side', completed: false, accuracy: 0 },
  { id: 'i', name: 'I', nameSibi: 'Abjad I', category: 'abjad', level: 'pemula', description: 'Kelingking lurus ke atas', emoji: '🤙', handShape: 'pinky-up', completed: false, accuracy: 0 },
  { id: 'j', name: 'J', nameSibi: 'Abjad J', category: 'abjad', level: 'pemula', description: 'Kelingking menggambar huruf J di udara', emoji: '🤙', handShape: 'pinky-j', completed: false, accuracy: 0 },

  // Angka
  { id: '0', name: '0', nameSibi: 'Angka 0', category: 'angka', level: 'pemula', description: 'Ibu jari dan jari-jari membentuk lingkaran', emoji: '⭕', handShape: 'circle', completed: true, accuracy: 97 },
  { id: '1', name: '1', nameSibi: 'Angka 1', category: 'angka', level: 'pemula', description: 'Telunjuk lurus ke atas', emoji: '☝️', handShape: 'one-up', completed: true, accuracy: 99 },
  { id: '2', name: '2', nameSibi: 'Angka 2', category: 'angka', level: 'pemula', description: 'Telunjuk dan jari tengah lurus ke atas', emoji: '✌️', handShape: 'two-up', completed: false, accuracy: 0 },
  { id: '3', name: '3', nameSibi: 'Angka 3', category: 'angka', level: 'pemula', description: 'Tiga jari lurus ke atas', emoji: '🤟', handShape: 'three-up', completed: false, accuracy: 0 },
  { id: '4', name: '4', nameSibi: 'Angka 4', category: 'angka', level: 'pemula', description: 'Empat jari lurus ke atas', emoji: '🖖', handShape: 'four-up', completed: false, accuracy: 0 },
  { id: '5', name: '5', nameSibi: 'Angka 5', category: 'angka', level: 'pemula', description: 'Semua jari terbuka lebar', emoji: '✋', handShape: 'open-hand', completed: false, accuracy: 0 },

  // Sapaan
  { id: 'halo', name: 'Halo', nameSibi: 'Halo', category: 'sapaan', level: 'pemula', description: 'Melambaikan tangan terbuka', emoji: '👋', handShape: 'wave', completed: true, accuracy: 100 },
  { id: 'terima-kasih', name: 'Terima Kasih', nameSibi: 'Terima Kasih', category: 'sapaan', level: 'pemula', description: 'Tangan terbuka bergerak dari dagu ke bawah', emoji: '🙏', handShape: 'flat-move', completed: true, accuracy: 85 },
  { id: 'maaf', name: 'Maaf', nameSibi: 'Maaf', category: 'sapaan', level: 'pemula', description: 'Kepalan tangan berputar di dada', emoji: '✊', handShape: 'fist-chest', completed: false, accuracy: 0 },
  { id: 'tolong', name: 'Tolong', nameSibi: 'Tolong', category: 'sapaan', level: 'pemula', description: 'Ibu jari di atas kepalan tangan bergerak ke depan', emoji: '🤲', handShape: 'help-sign', completed: false, accuracy: 0 },
  { id: 'ya', name: 'Ya', nameSibi: 'Ya', category: 'sapaan', level: 'pemula', description: 'Kepalan tangan mengangguk', emoji: '✅', handShape: 'fist-nod', completed: false, accuracy: 0 },
  { id: 'tidak', name: 'Tidak', nameSibi: 'Tidak', category: 'sapaan', level: 'pemula', description: 'Telunjuk bergerak dari sisi ke sisi', emoji: '❌', handShape: 'finger-shake', completed: false, accuracy: 0 },

  // Keluarga
  { id: 'ibu', name: 'Ibu', nameSibi: 'Ibu', category: 'keluarga', level: 'pemula', description: 'Ibu jari menyentuh dagu', emoji: '👩', handShape: 'thumb-chin', completed: false, accuracy: 0 },
  { id: 'ayah', name: 'Ayah', nameSibi: 'Ayah', category: 'keluarga', level: 'pemula', description: 'Ibu jari menyentuh dahi', emoji: '👨', handShape: 'thumb-forehead', completed: false, accuracy: 0 },
  { id: 'kakak', name: 'Kakak', nameSibi: 'Kakak', category: 'keluarga', level: 'pemula', description: 'Dua tangan menunjuk ke atas bergantian', emoji: '🧑', handShape: 'alternating-up', completed: false, accuracy: 0 },

  // Darurat
  { id: 'sakit', name: 'Sakit', nameSibi: 'Sakit', category: 'darurat', level: 'pemula', description: 'Jari tengah kedua tangan menunjuk ke dalam bergantian', emoji: '🤒', handShape: 'pain-sign', completed: false, accuracy: 0 },
  { id: 'bahaya', name: 'Bahaya', nameSibi: 'Bahaya', category: 'darurat', level: 'pemula', description: 'Dua tangan membentuk X di depan tubuh', emoji: '⚠️', handShape: 'x-cross', completed: false, accuracy: 0 },
  { id: 'bantuan', name: 'Bantuan', nameSibi: 'Bantuan', category: 'darurat', level: 'pemula', description: 'Satu tangan di atas telapak yang lain, bergerak ke atas', emoji: '🆘', handShape: 'help-lift', completed: false, accuracy: 0 },
];

export const mockModules: Module[] = [
  {
    id: 'abjad',
    title: 'Abjad A-Z',
    description: 'Pelajari 26 huruf alfabet dalam SIBI — fondasi komunikasi tertulis',
    level: 'pemula',
    icon: '🔤',
    color: 'teal',
    totalSigns: 26,
    completedSigns: 3,
    signs: mockSigns.filter(s => s.category === 'abjad'),
  },
  {
    id: 'angka',
    title: 'Angka 0-9',
    description: 'Ekspresikan angka dan hitungan dalam bahasa isyarat',
    level: 'pemula',
    icon: '🔢',
    color: 'blue',
    totalSigns: 10,
    completedSigns: 2,
    signs: mockSigns.filter(s => s.category === 'angka'),
  },
  {
    id: 'sapaan',
    title: 'Sapaan Dasar',
    description: 'Isyarat untuk berinteraksi sehari-hari: halo, terima kasih, maaf',
    level: 'pemula',
    icon: '👋',
    color: 'amber',
    totalSigns: 15,
    completedSigns: 2,
    signs: mockSigns.filter(s => s.category === 'sapaan'),
  },
  {
    id: 'keluarga',
    title: 'Keluarga',
    description: 'Sebut anggota keluarga terdekat dalam SIBI',
    level: 'pemula',
    icon: '👨‍👩‍👧‍👦',
    color: 'purple',
    totalSigns: 10,
    completedSigns: 0,
    signs: mockSigns.filter(s => s.category === 'keluarga'),
  },
  {
    id: 'darurat',
    title: 'Situasi Darurat',
    description: 'Isyarat penting untuk kondisi darurat: sakit, bahaya, bantuan',
    level: 'pemula',
    icon: '🆘',
    color: 'rose',
    totalSigns: 10,
    completedSigns: 0,
    signs: mockSigns.filter(s => s.category === 'darurat'),
  },
];

export const mockUser = {
  id: 'user-1',
  name: 'Andi Pratama',
  email: 'andi@example.com',
  avatar: null,
  streak: 7,
  longestStreak: 14,
  totalXP: 1250,
  level: 'Pemula II',
  joinedAt: '2026-05-01',
  badges: [
    { id: 'first-sign', name: 'Isyarat Pertama', emoji: '🌟', description: 'Berhasil melakukan isyarat pertama', earned: true },
    { id: 'alphabet-complete', name: 'Maestro Abjad', emoji: '🔤', description: 'Selesaikan semua abjad A-Z', earned: false },
    { id: 'streak-7', name: 'Seminggu Penuh', emoji: '🔥', description: '7 hari streak berturut-turut', earned: true },
    { id: 'streak-30', name: 'Bulan Api', emoji: '🌙', description: '30 hari streak berturut-turut', earned: false },
    { id: 'accuracy-90', name: 'Presisi Tinggi', emoji: '🎯', description: 'Akurasi rata-rata di atas 90%', earned: false },
    { id: 'social', name: 'Pejuang Inklusif', emoji: '💙', description: 'Selesaikan modul Sapaan', earned: false },
  ],
  stats: {
    totalSignsPracticed: 12,
    averageAccuracy: 92,
    totalSessions: 18,
    minutesPracticed: 145,
  }
};

export const recentActivity = [
  { date: '2026-05-31', module: 'Abjad', sign: 'C', score: 92 },
  { date: '2026-05-31', module: 'Sapaan', sign: 'Terima Kasih', score: 85 },
  { date: '2026-05-30', module: 'Abjad', sign: 'B', score: 88 },
  { date: '2026-05-30', module: 'Angka', sign: '1', score: 99 },
  { date: '2026-05-29', module: 'Sapaan', sign: 'Halo', score: 100 },
];
