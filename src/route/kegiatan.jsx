import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { kegiatanData } from "../components/data.jsx";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, X } from "lucide-react";
import SEOHead from "../components/SEOHead.jsx";

function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
}

export default function Kegiatan() {
    const [selectedYear, setSelectedYear] = useState(2026);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("desc"); // "desc" = terbaru, "asc" = terlama

    // Daftar tahun (unik, descending)
    const years = Array.from(new Set(kegiatanData.map((k) => k.year))).sort(
        (a, b) => b - a
    );

    // Filter + search + sort
    const filteredKegiatan = useMemo(() => {
        let result = kegiatanData;

        // Filter tahun
        result = result.filter((k) => k.year === selectedYear);

        // Search berdasarkan judul
        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            result = result.filter((k) =>
                k.title.toLowerCase().includes(query)
            );
        }

        // Sort berdasarkan tanggal
        result = [...result].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [selectedYear, searchQuery, sortOrder]);

    // Hitung total kegiatan per tahun (untuk search lintas tahun)
    const totalAllYears = useMemo(() => {
        if (!searchQuery.trim()) return null;
        const query = searchQuery.trim().toLowerCase();
        return kegiatanData.filter((k) =>
            k.title.toLowerCase().includes(query)
        ).length;
    }, [searchQuery]);

    const toggleSort = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <>
            <SEOHead
                title="Kegiatan"
                description="Daftar kegiatan PSI Cabang Makassar dari tahun ke tahun: seminar, PKM, workshop, dan kolaborasi fisika."
                url="/kegiatan"
                keywords="Kegiatan PSI Makassar, Seminar Fisika, PKM Fisika, Workshop Fisika"
            />

            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="md:w-64 shrink-0">
                        <h1 className="text-2xl font-extrabold text-blue-950 uppercase tracking-wide">
                            Kegiatan
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Pilih tahun untuk melihat daftar kegiatan PSI Cabang
                            Makassar.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-5 relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                id="search-kegiatan"
                                type="text"
                                placeholder="Cari kegiatan..."
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

                        {/* Tahun Filter */}
                        <div className="mt-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                            {years.map((year) => {
                                const isActive = year === selectedYear;
                                const countForYear = kegiatanData.filter(
                                    (k) => k.year === year
                                ).length;
                                return (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => setSelectedYear(year)}
                                        className={
                                            "px-4 py-2 rounded-full text-sm font-semibold border transition-all flex items-center justify-between gap-2 cursor-pointer " +
                                            (isActive
                                                ? "bg-blue-950 text-white border-blue-950 shadow-sm"
                                                : "bg-white text-blue-950 border-blue-200 hover:border-blue-500 hover:bg-blue-50")
                                        }
                                    >
                                        <span>{year}</span>
                                        <span
                                            className={
                                                "text-xs px-1.5 py-0.5 rounded-full " +
                                                (isActive
                                                    ? "bg-blue-800 text-blue-200"
                                                    : "bg-slate-100 text-slate-500")
                                            }
                                        >
                                            {countForYear}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1">
                        {/* Header + Sort */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {searchQuery.trim()
                                        ? `Hasil Pencarian "${searchQuery.trim()}"`
                                        : `Kegiatan Tahun ${selectedYear}`}
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {filteredKegiatan.length} kegiatan ditemukan
                                    {searchQuery.trim() &&
                                        totalAllYears !== null &&
                                        totalAllYears !== filteredKegiatan.length &&
                                        ` di tahun ${selectedYear} (${totalAllYears} total di semua tahun)`}
                                </p>
                            </div>

                            {/* Sort Dropdown */}
                            <button
                                type="button"
                                onClick={toggleSort}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shrink-0 cursor-pointer"
                                aria-label={`Urutkan ${sortOrder === "desc" ? "terlama" : "terbaru"} dulu`}
                                title={
                                    sortOrder === "desc"
                                        ? "Urutan: Terbaru → Terlama"
                                        : "Urutan: Terlama → Terbaru"
                                }
                            >
                                {sortOrder === "desc" ? (
                                    <ArrowDown size={14} className="text-blue-600" />
                                ) : (
                                    <ArrowUp size={14} className="text-blue-600" />
                                )}
                                <span className="hidden sm:inline">
                                    {sortOrder === "desc"
                                        ? "Terbaru"
                                        : "Terlama"}
                                </span>
                            </button>
                        </div>

                        {/* Kegiatan Grid */}
                        {filteredKegiatan.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                    <Search size={24} className="text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-500 font-medium">
                                    {searchQuery.trim()
                                        ? `Tidak ada kegiatan yang cocok dengan "${searchQuery.trim()}" di tahun ${selectedYear}.`
                                        : "Belum ada data kegiatan untuk tahun ini."}
                                </p>
                                {searchQuery.trim() && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors cursor-pointer"
                                    >
                                        Hapus pencarian
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {filteredKegiatan.map((item, index) => {
                                    const hasSlug = Boolean(item.slug);

                                    const CardWrapper = hasSlug ? Link : "div";
                                    const wrapperProps = hasSlug
                                        ? {
                                              to: `/post/${item.slug}`,
                                              className: "group block",
                                          }
                                        : {};

                                    return (
                                        <article
                                            key={`${item.year}-${index}-${item.title}`}
                                            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                        >
                                            <CardWrapper {...wrapperProps}>
                                                {item.images?.[0] && (
                                                    <div className="aspect-video overflow-hidden bg-slate-100">
                                                        <img
                                                            src={
                                                                item.images[0]
                                                            }
                                                            alt={item.title}
                                                            loading="lazy"
                                                            className={`w-full h-full object-cover transition-transform duration-500 ${
                                                                hasSlug
                                                                    ? "group-hover:scale-110"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </div>
                                                )}

                                                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                                            {formatDate(
                                                                item.date
                                                            )}
                                                        </span>
                                                        {hasSlug && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100">
                                                                Artikel
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3
                                                        className={`text-base sm:text-lg font-semibold text-slate-900 ${
                                                            hasSlug
                                                                ? "group-hover:text-blue-700 transition-colors"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </CardWrapper>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
