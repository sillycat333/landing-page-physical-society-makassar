import { useState, useMemo, useEffect, useRef } from "react";
import { books } from "../components/data.jsx";
import { Search, X, ChevronUp, BookOpen } from "lucide-react";
import SEOHead from "../components/SEOHead.jsx";

export default function Buku() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const modalRef = useRef(null);

    // Search: judul + penulis
    const filteredBooks = useMemo(() => {
        if (!searchQuery.trim()) return books;
        const query = searchQuery.trim().toLowerCase();
        return books.filter(
            (book) =>
                book.title.toLowerCase().includes(query) ||
                book.authors.some((a) => a.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    // Back to top visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close modal on Escape
    useEffect(() => {
        if (!selectedBook) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedBook(null);
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedBook]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearSearch = () => setSearchQuery("");

    // Cek apakah cover adalah gambar valid (bukan string placeholder)
    const isValidCover = (cover) =>
        cover && typeof cover !== "string" 
        ? true 
        : (typeof cover === "string" && (cover.startsWith("/") || cover.startsWith("http") || cover.startsWith("data:")));

    return (
        <>
            <SEOHead
                title="Koleksi Buku"
                description={`Koleksi ${books.length} buku fisika karya anggota PSI Cabang Makassar. Mencakup buku ajar, riset, dan referensi bidang fisika.`}
                url="/buku"
                keywords="Buku Fisika, PSI Makassar, Publikasi Fisika, Buku Ajar Fisika"
            />

            <main className="bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
                            Koleksi Buku
                        </h1>
                        <h2 className="mt-2 text-3xl font-extrabold text-blue-950">
                            Buku PSI Cabang Makassar
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
                            Daftar buku yang telah/akan dicetak oleh anggota
                            Physical Society of Indonesia Cabang Makassar.
                        </p>
                    </div>

                    {/* Search + Count */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                id="search-buku"
                                type="text"
                                placeholder="Cari judul atau penulis..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    aria-label="Hapus pencarian"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 shrink-0">
                            <span className="font-semibold text-slate-700">
                                {filteredBooks.length}
                            </span>{" "}
                            {searchQuery.trim()
                                ? `dari ${books.length} buku`
                                : "buku"}
                        </p>
                    </div>

                    {/* Book Grid */}
                    {filteredBooks.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <BookOpen
                                    size={24}
                                    className="text-slate-400"
                                />
                            </div>
                            <p className="text-sm text-slate-500 font-medium">
                                Tidak ada buku yang cocok dengan "
                                {searchQuery.trim()}".
                            </p>
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors cursor-pointer"
                            >
                                Hapus pencarian
                            </button>
                        </div>
                    ) : (
                        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {filteredBooks.map((book) => {
                                const hasCover = isValidCover(book.cover);
                                return (
                                    <article
                                        key={book.id}
                                        className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
                                        onClick={() => setSelectedBook(book)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            )
                                                setSelectedBook(book);
                                        }}
                                        aria-label={`Lihat detail buku: ${book.title}`}
                                    >
                                        <div className="aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                                            {hasCover ? (
                                                <img
                                                    src={book.cover}
                                                    alt={`Cover buku ${book.title}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-slate-100">
                                                    <BookOpen
                                                        size={32}
                                                        className="text-blue-300 mb-2"
                                                    />
                                                    <p className="text-[10px] text-slate-400 text-center leading-tight">
                                                        Cover belum tersedia
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3 flex-1 flex flex-col">
                                            <h3 className="text-xs sm:text-sm font-semibold text-blue-950 line-clamp-2 group-hover:text-blue-700 transition-colors">
                                                {book.title}
                                            </h3>
                                            <p className="mt-1 text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                                                {book.authors.join(", ")}
                                            </p>
                                        </div>
                                    </article>
                                );
                            })}
                        </section>
                    )}
                </div>

                {/* Back to Top Button */}
                {showBackToTop && (
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-blue-950 text-white shadow-lg hover:bg-blue-800 transition-all duration-300 cursor-pointer animate-[fadeIn_0.3s_ease-out]"
                        aria-label="Kembali ke atas"
                    >
                        <ChevronUp size={20} />
                    </button>
                )}

                {/* Modal Preview */}
                {selectedBook && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        onClick={(e) => {
                            if (e.target === e.currentTarget)
                                setSelectedBook(null);
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Detail buku: ${selectedBook.title}`}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

                        {/* Modal Content */}
                        <div
                            ref={modalRef}
                            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-[modalSlideIn_0.3s_ease-out]"
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedBook(null)}
                                className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white transition-colors cursor-pointer shadow-sm"
                                aria-label="Tutup"
                            >
                                <X size={16} />
                            </button>

                            {/* Cover Image */}
                            <div className="bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6 sm:p-8">
                                {isValidCover(selectedBook.cover) ? (
                                    <img
                                        src={selectedBook.cover}
                                        alt={`Cover buku ${selectedBook.title}`}
                                        className="max-h-80 w-auto rounded-lg shadow-xl object-contain"
                                    />
                                ) : (
                                    <div className="w-48 h-64 flex flex-col items-center justify-center rounded-lg bg-white/60 border-2 border-dashed border-slate-300">
                                        <BookOpen
                                            size={48}
                                            className="text-blue-300 mb-3"
                                        />
                                        <p className="text-sm text-slate-400">
                                            Cover belum tersedia
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Book Info */}
                            <div className="p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-blue-950 leading-tight">
                                    {selectedBook.title}
                                </h3>

                                <div className="mt-4 space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                            Penulis
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedBook.authors.map(
                                                (author, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                                                    >
                                                        {author}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Keyframe animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
