import { books } from "../components/data.jsx"

export default function Buku() {
    return (
        <main className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
                        Koleksi Buku
                    </h1>
                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">
                        Buku PSI Cabang Makassar
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-600">
                        Daftar buku yang telah/akan dicetak oleh anggota Physical Society of Indonesia Cabang Makassar.
                    </p>
                </div>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {books.map((book) => (
                        <article
                            key={book.id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
                        >
                            <div className="aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                                <img
                                    src={book.cover || BLANK_COVER}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-base md:text-lg font-semibold text-blue-950">
                                    {book.title}
                                </h3>
                                <p className="mt-1 text-xs md:text-sm text-slate-600">
                                    {book.authors.join(', ')}
                                </p>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
