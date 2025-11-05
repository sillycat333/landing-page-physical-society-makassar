import { Link } from 'react-router-dom';
import { kegiatanData, books as bukuData } from "../components/data.jsx"
import Sampul from "../assets/sampul.jpeg"

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export default function Home() {
    const kegiatanTerbaru = [...kegiatanData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    const bukuTerbaru = bukuData.slice(0, 3);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* HERO */}
            <section className="relative bg-blue-950 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-300">
                            PSI Cabang Makassar
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                            Mewujudkan Kemajuan Fisika di Kawasan Timur Indonesia
                        </h1>
                        <p className="text-sm md:text-base text-blue-100 max-w-lg">
                            Physical Society of Indonesia (PSI) Cabang Makassar menjadi wadah bagi dosen,
                            peneliti, dan praktisi fisika untuk berkolaborasi dalam pendidikan, riset, dan
                            pengabdian kepada masyarakat.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                to="/tentang"
                                className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-400 hover:bg-blue-300 text-blue-950 font-semibold text-sm shadow-md transition-colors"
                            >
                                Pelajari lebih lanjut
                            </Link>
                            <Link
                                to="/kegiatan"
                                className="inline-flex items-center px-5 py-2.5 rounded-full border border-blue-300 text-blue-100 hover:bg-blue-900 font-semibold text-sm transition-colors"
                            >
                                Lihat Kegiatan
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full rounded-2xl overflow-hidden bg-blue-900/40 border border-blue-700/60 shadow-xl">
                            <div className="w-full h-full object-contain flex items-center justify-center">
                                <img src={Sampul} alt="PSI Cabang Makassar" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-blue-600 text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg">
                            <span className="font-semibold">PSI Cabang Makassar</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-[2fr,1fr] gap-10 items-start">
                        <div>
                            <h2 className="text-xl md:text-2xl font-extrabold text-blue-950 mb-3 uppercase tracking-wide">
                                Tentang Physical Science Society of Indonesia
                            </h2>
                            <p className="text-slate-700 mb-3">
                                Physical Society of Indonesia (PSI) adalah organisasi profesi ilmiah untuk bidang FISIKA yang merupakan nama baru dari Himpunan Fisika Indonesia (HFI). Pergantian nama ini dikarenakan dalam permohonan Pengesahan Badan Hukum kepada Menteri Hukum dan Hak Asasi Manusia Republik Indonesia pada tahun 2017 tidak memungkinkan lagi menggunakan nama Himpunan Fisika Indonesia. Jika HFI telah berdiri sejak 17 Agustus 1973 yang disahkan oleh Notaris Wiratni Achmadi, SH tanggal 1 Juli 1977 di Bandung, maka PSI berdiri sejak 17 April 2017 yang disahkan oleh Notaris Pinta Rahmadani, S.H., M.Kn. tanggal 3 Maret 2017 di Bandung
                            </p>
                            <p className="text-slate-700 mb-5">
                                Melalui konferensi, publikasi, dan program jangkauan, kami mendorong penelitian, inovasi, dan kolaborasi dalam semua bidang fisika. Kami percaya bahwa pemahaman fisika sangat penting untuk kemajuan teknologi dan solusi atas tantangan global. Asas PSI adalah Pancasila dan UUD 1945, sedangkan tujuan didirikannya PSI adalah untuk membina, mengkomunikasikan dan mengembangkan Ilmu Fisika dan Pendidikan Fisika untuk kepentingan anggota, bangsa Indonesia dan kepentingan manusia pada umumnya.
                            </p>
                            <Link
                                to="/tentang"
                                className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-950 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                            >
                                Selengkapnya
                            </Link>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-slate-700 shadow-sm">
                            <h3 className="font-semibold text-blue-900 mb-2">Fokus Kegiatan Cab. Makassar 2021-2025</h3>
                            <ul className="list-decimal list-inside space-y-1.5">
                                <li>
                                    Seminar, Kuliah Umum & Workshop
                                    <ul className='list-disc ml-8'>
                                        <li>Seminar Fisika Nasional PSI Cabang Makassar.</li>
                                        <li>Workshop Penulisan Proposal Hibah Penelitian & Penulisan Jurnal Fisika.</li>
                                        <li>Kuliah Umum.</li>
                                    </ul>
                                </li>
                                <li>
                                    Pengembangan Profesi Guru
                                    <ul className='list-disc ml-8'>
                                        <li>Pelatihan Guru Fisika se-Sulawesi Selatan (Kolaborasi dengan MGMP Fisika).</li>
                                        <li>Workshop Pembelajaran Berbasis STEM di Sekolah Menengah.</li>
                                    </ul>
                                </li>
                                <li>
                                    Bidang Pengabdian Masyarakat
                                    <ul className='list-disc ml-8'>
                                        <li>Pengabdian Kepada Masyarakat (PKM).</li>
                                        <li>Pengenalan Energi Terbarukan dan Eksperimen Fisika untuk Siswa.</li>
                                        <li>Pembelajaran Fisika Berbasis STEM.</li>
                                        <li>Pembuatan alat peraga sederhana berbasis IoT </li>
                                    </ul>
                                </li>
                                <li>
                                    Sistem & Teknologi Informasi
                                    <ul className='list-disc ml-8'>
                                        <li>Pembuatan website resmi PSI Cabang Makassar.</li>
                                        <li>Penerapan sistem digitalisasi administrasi anggota.</li>
                                    </ul>
                                </li>
                                <li>
                                    Jurnal & Penulisan Buku
                                    <ul className='list-disc ml-8'>
                                        <li>Pembuatan Jurnal</li>
                                        <li>Pembuatan Buku</li>
                                    </ul>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* KEGIATAN TERBARU SECTION */}
            <section className="py-12 md:py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-extrabold text-blue-950 uppercase tracking-wide">
                                Kegiatan Terbaru
                            </h2>
                            <p className="text-sm text-slate-600 mt-1">
                                Beberapa kegiatan terbaru yang diselenggarakan oleh PSI Cabang Makassar.
                            </p>
                        </div>
                        <Link
                            to="/kegiatan"
                            className="hidden md:inline-flex px-4 py-2 rounded-full border border-blue-300 text-blue-900 text-sm font-semibold hover:bg-blue-100 transition-colors"
                        >
                            Lihat Semua Kegiatan
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {kegiatanTerbaru.map((item, idx) => {
                            const imageSrc =
                                item.images && item.images.length > 0
                                    ? item.images[0]
                                    : 'https://via.placeholder.com/600x400?text=Kegiatan';

                            return (
                                <article
                                    key={`${item.date}-${idx}`}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                                >
                                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                                        <img
                                            src={imageSrc}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <p className="text-xs font-medium text-blue-600 mb-1">
                                            {formatDate(item.date)}
                                        </p>
                                        <h3 className="font-semibold text-slate-900 text-sm mb-3 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <div className="mt-auto pt-2">
                                            <Link
                                                to="/kegiatan"
                                                className="inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-6 md:hidden">
                        <Link
                            to="/kegiatan"
                            className="w-full inline-flex justify-center px-4 py-2.5 rounded-full border border-blue-300 text-blue-900 text-sm font-semibold hover:bg-blue-100 transition-colors"
                        >
                            Lihat Semua Kegiatan
                        </Link>
                    </div>
                </div>
            </section>

            {/* BUKU TERBARU SECTION */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-extrabold text-blue-950 uppercase tracking-wide">
                                Publikasi / Buku Terbaru
                            </h2>
                            <p className="text-sm text-slate-600 mt-1">
                                Beberapa buku terkait fisika dari anggota PSI Cabang Makassar.
                            </p>
                        </div>
                        <Link
                            to="/buku"
                            className="hidden md:inline-flex px-4 py-2 rounded-full border border-blue-300 text-blue-900 text-sm font-semibold hover:bg-blue-100 transition-colors"
                        >
                            Lihat Semua Buku
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {bukuTerbaru.map((book) => {
                            const authorsText = Array.isArray(book.authors)
                                ? book.authors.join(', ')
                                : book.authors || 'Penulis tidak tersedia';
                            const hasCover = Boolean(book.cover);
                            return (
                                <article
                                    key={book.id}
                                    className="bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                                >
                                    <div className="aspect-[3/4] bg-slate-200 flex items-center justify-center overflow-hidden">
                                        {hasCover ? (
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-500 px-4 text-center">
                                                Tidak ada cover tersedia
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 mb-3">
                                            {authorsText}
                                        </p>
                                        <div className="mt-auto pt-1">
                                            <Link
                                                to="/buku"
                                                className="inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-6 md:hidden">
                        <Link
                            to="/buku"
                            className="w-full inline-flex justify-center px-4 py-2.5 rounded-full border border-blue-300 text-blue-900 text-sm font-semibold hover:bg-blue-100 transition-colors"
                        >
                            Lihat Semua Buku
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
