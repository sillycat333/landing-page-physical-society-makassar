import { useState } from "react";
import { kegiatanData } from "../components/data.jsx"

function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
}

export default function Kegiatan() {
    const [selectedYear, setSelectedYear] = useState(2026);

    const years = Array.from(new Set(kegiatanData.map((k) => k.year))).sort(
        (a, b) => b - a
    );

    const filteredKegiatan = kegiatanData.filter(
        (kegiatan) => kegiatan.year === selectedYear
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-64 shrink-0">
                    <h1 className="text-2xl font-extrabold text-blue-950 uppercase tracking-wide">
                        Kegiatan
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Pilih tahun untuk melihat daftar kegiatan PSI Cabang Makassar.
                    </p>

                    <div className="mt-6 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                        {years.map((year) => {
                            const isActive = year === selectedYear;
                            return (
                                <button
                                    key={year}
                                    type="button"
                                    onClick={() => setSelectedYear(year)}
                                    className={
                                        "px-4 py-2 rounded-full text-sm font-semibold border transition " +
                                        (isActive
                                            ? "bg-blue-950 text-white border-blue-950 shadow-sm"
                                            : "bg-white text-blue-950 border-blue-200 hover:border-blue-500 hover:bg-blue-50")
                                    }
                                >
                                    {year}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <h2 className="text-xl font-bold text-slate-900">
                            Kegiatan Tahun {selectedYear}
                        </h2>
                        <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold hidden sm:block">
                            Physical Society of Indonesia · Cabang Makassar
                        </p>
                    </div>

                    {filteredKegiatan.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            Belum ada data kegiatan untuk tahun ini.
                        </p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {filteredKegiatan.map((item, index) => (
                                <article
                                    key={`${item.year}-${index}-${item.title}`}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                                >
                                    {item.images?.[0] && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={item.images[0]}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                            {item.year}
                                        </p>
                                        <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 mt-1">
                                            {formatDate(item.date)}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
