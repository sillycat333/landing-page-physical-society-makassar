// Auto-import semua gambar cover buku dari assets
const bookCovers = import.meta.glob('../assets/buku-*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

// Helper untuk mendapatkan cover gambar berdasarkan ID/nama file (misal 'buku-1' -> /assets/buku-1.png)
function getCoverImage(coverName) {
  if (!coverName) return null;
  // Jika sudah berupa path absolut atau URL
  if (coverName.startsWith('/') || coverName.startsWith('http')) return coverName;

  for (const [path, imgUrl] of Object.entries(bookCovers)) {
    if (path.includes(`/${coverName}.`)) {
      return imgUrl;
    }
  }
  return null;
}

const rawBooks = [
  {
    id: 'buku-1',
    title: 'Aplikasi Sensor Berbasis Serat Optik',
    authors: ['Prof. Dr. Arifin, M.T.', 'Ida Laila, S.Si, M.Si'],
    cover: 'buku-1',
  },
  {
    id: 'buku-2',
    title: 'Sensor Berbasis Internet of Medical Things (IoMT)',
    authors: ['Prof. Dr. Arifin, M.T.', 'Ida Laila, S.Si, M.Si'],
    cover: 'buku-2',
  },
  {
    id: 'buku-3',
    title: 'Sistem Cerdas Pengelolaan Energi dan Lingkungan',
    authors: ['Prof. Dr. Arifin, M.T.', 'Ida Laila, S.Si, M.Si'],
    cover: 'buku-3',
  },
  {
    id: 'buku-4',
    title: 'Instrumentasi Berbasis Internet of Things (IoT)',
    authors: ['Prof. Dr. Arifin, M.T.', 'Ida Laila, S.Si, M.Si'],
    cover: 'buku-4',
  },
  {
    id: 'buku-5',
    title: 'Teori & Praktik Sensor',
    authors: ['Prof. Dr. Arifin, M.T.', 'Ida Laila, S.Si, M.Si'],
    cover: 'buku-5',
  },
  {
    id: 'buku-8',
    title: 'Ilmu Lingkungan',
    authors: ['Prof. Dr. Sri Suryani, DEA'],
    cover: 'buku-8',
  },
  {
    id: 'buku-9',
    title: 'Mengapa Harus Berjemur',
    authors: ['Prof. Dr. Sri Suryani, DEA'],
    cover: 'buku-9',
  },
  {
    id: 'buku-10',
    title: 'Fisika It’s Amazing',
    authors: ['Prof. Dr. Sri Suryani, DEA'],
    cover: 'buku-10',
  },
  {
    id: 'buku-11',
    title: 'Super Kapasitor dan Biomassa',
    authors: ['Prof. Dr. Ir. Bidayatul Arminah, M.T'],
    cover: 'buku-11',
  },
  {
    id: 'buku-12',
    title: 'Psikologi Pendidikan dan Pembelajaran',
    authors: ['Prof. Dr. Nurlina, S.Si., M.Pd.', 'Nasir', 'Muh. Alka', 'Fitri Wahyuni'],
    cover: 'buku-12',
  },
  {
    id: 'buku-13',
    title: 'Inovasi Belajar Fisika Abad 21',
    authors: ['Prof. Dr. Nurlina, S.Si., M.Pd.', 'Nurfadilah, S.Pd., M.Pd.'],
    cover: 'buku-13',
  },
  {
    id: 'buku-14',
    title: 'Fisika Dasar Berorientasi Merdeka Belajar Dilengkapi Asesmen Berbasis Kahoot',
    authors: ['Prof. Dr. Nurlina, S. Si., M. Pd.'],
    cover: 'buku-14',
  },
  {
    id: 'buku-15',
    title: 'Pengantar Telaah Kurikulum Merdeka pada Mata Pelajaran Fisika SMA Berbasis Kearifan Lokal',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mutahharah Hasyim', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-15',
  },
  {
    id: 'buku-16',
    title: 'Buku Ajar Perkembangan Peserta Didik',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-16',
  },
  {
    id: 'buku-17',
    title: 'Microteaching Pembelajaran Fisika',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mahir, S.Pd., M.Pd.', 'Mutahharah Hasyim'],
    cover: 'buku-17',
  },
  {
    id: 'buku-18',
    title: 'Model Pembelajaran Fisika Berbasis Kearifan Lokal Untuk Kurikulum Merdeka',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-18',
  },
  {
    id: 'buku-19',
    title: 'Buku Ajar Belajar dan Pembelajaran Kognitif Peserta Didik Berbasis Kearifan Lokal',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-19',
  },
  {
    id: 'buku-20',
    title: 'Belajar dan Pembelajaran Sosial Peserta Didik Berbasis Kearifan Lokal',
    authors: ['Prof. Dr. M. A. Martawijaya, M.Pd.', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-20',
  },
  {
    id: 'buku-21',
    title: '5 Teori Belajar dalam Pembelajaran Fisika',
    authors: ['Drs. Abdul Haris, M.Si.', 'Mahir, S.Pd., M.Pd.'],
    cover: 'buku-21',
  },
  {
    id: 'buku-22',
    title: 'Pembelajaran Konstruktif Terintegrasi Kearifan Lokal',
    authors: ['Mahir, S.Pd., M.Pd.'],
    cover: 'buku-22',
  },
  {
    id: 'buku-23',
    title: 'Pengantar Filsafat',
    authors: ['Drs. Abdul Haris, M.Si.'],
    cover: 'buku-23',
  },
  {
    id: 'buku-24',
    title: 'Buku Ajar Listrik Dinamis',
    authors: ['Drs. Abdul Haris, M.Si.', 'Prof. Dr. Jasruddin, M.Si.', 'Prof. Dr. Patta Bundu, M.Ed.'],
    cover: 'buku-24',
  },
  {
    id: 'buku-25',
    title: 'Energi',
    authors: ['Dirga Kaso Sanusi'],
    cover: 'buku-25',
  },
  {
    id: 'buku-26',
    title: 'Strategi Pembelajaran Fisika',
    authors: ['Ihfa Indira Nurnaifah', 'Sukmawati Said', 'Nurul Mutmainnah Herman', 'Dirgah Kaso Sanusi', 'Ria Rezki Hamzah'],
    cover: 'buku-26',
  },
  {
    id: 'buku-27',
    title: 'Integrasi Sains dan Nilai Islam dalam Pembelajaran Fisika di Perguruan Tinggi',
    authors: ['Nurhilaliyah', 'Ria Rezki Hamzah', 'Dirgah Kaso Sanusi'],
    cover: 'buku-27',
  },
  {
    id: 'buku-28',
    title: 'Ilmu-Ilmu Material: Prinsip, Karakterisasi, dan Aplikasinya',
    authors: ['Resky Irfanita', 'Wahyuna Nur', 'Asnaeni Ansar', 'Sukmawati Said', 'Ni Wayan Mega Savira Utami'],
    cover: 'buku-28',
  },
  {
    id: 'buku-29',
    title: 'Fisika Zat Padat Jilid 1',
    authors: ['Subaer', 'Vicran Zharvan', 'Resky Irfanita'],
    cover: 'buku-29',
  },
  {
    id: 'buku-30',
    title: 'Profesi Kependidikan',
    authors: ['Syamsul Wahid S'],
    cover: 'buku-30',
  },
  {
    id: 'buku-31',
    title: 'Mitigasi Bencana di lingkungan Kawasan Karst',
    authors: ['Muhammad Arsyad', 'Arie Arma Arsyad', 'Muhammad Arief Fitrah Istiyanto Aslim'],
    cover: 'buku-31',
  },
  {
    id: 'buku-32',
    title: 'Evaluasi Pembelajaran dalam Era Digital',
    authors: ['Ihfa Indira Nurnaifah Idris'],
    cover: 'buku-32',
  },
  {
    id: 'buku-33',
    title: 'Fisika Dasar 2',
    authors: ['A. Jusriana dkk'],
    cover: 'buku-33',
  },
  {
    id: 'buku-34',
    title: 'Fisika Optik: Teori, instrumen dan Aplikasinya',
    authors: ['A. Jusriana dkk'],
    cover: 'buku-34',
  },
  {
    id: 'buku-35',
    title: 'Fisika Dasar untuk Teknik Industri',
    authors: ['A. Jusriana dkk'],
    cover: 'buku-35',
  },
  {
    id: 'buku-36',
    title: 'Fisika Material: Prinsip, Aplikasi, dan Inovasi',
    authors: ['A. Jusriana dkk'],
    cover: 'buku-36',
  },
  {
    id: 'buku-37',
    title: 'Mengenal Scanning Electron Microscopy (SEM)',
    authors: ['Subaer', 'Resky Irfanita', 'Armayani'],
    cover: 'buku-37',
  },
  {
    id: 'buku-38',
    title: 'Fisika Kuantum',
    authors: ['Subaer', 'Muh. Saleh', 'Sukmawati Said'],
    cover: 'buku-38',
  },
  {
    id: 'buku-39',
    title: 'Medan Elektromagnetik',
    authors: ['Sukmawati Said', 'Sri Agustini'],
    cover: 'buku-39',
  },
  {
    id: 'buku-40',
    title: 'Interaksi Antar Faktor Fisis',
    authors: ['Muh Tawil', 'Ahmad Dahlan'],
    cover: 'buku-40',
  },
  {
    id: 'buku-41',
    title: 'FISIKA ZAT PADAT: GETARAN KISI-KISI, KRISTAL SATU DIMENSI, GETARAN KISI MODEL EINSTEIN DAN MODEL DEBYE',
    authors: ['A. Jusriana', 'Ihfa Indira Nurnaifah Idris', 'Nurhasmi', 'Dirgah Kaso Sanusi'],
    cover: 'buku-41',
  },
  {
    id: 'buku-42',
    title: 'Pengantar Radiasi Sinkrotron: Teknik Analisis dan Aplikasinya dalam Pengembangan Material Maju',
    authors: ['Husain dkk'],
    cover: 'buku-42',
  },
  {
    id: 'buku-43',
    title: 'Teknologi Sensor Elektronik dan Implementasi Arduino Uno',
    authors: ['Ida Laila dan Arifin'],
    cover: 'buku-43',
  },
];

// Map data dengan resolver cover gambar otomatis
export const books = rawBooks.map((book) => ({
  ...book,
  cover: getCoverImage(book.cover),
}));
