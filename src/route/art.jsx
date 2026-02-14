import SKPengurus from "../assets/pengurus2025-2029.pdf"
import ART from "/art/adart.pdf"

export default function ADART() {
    return (
        <main className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
                        AD ART PSI
                    </h1>
                    <h2 className="mt-2 text-3xl font-extrabold text-blue-950">
                        Anggaran Dasar dan Anggaran Rumah Tangga Physical Society of Indonesia
                    </h2>
                </div>
                <section>
                    <embed
                        className="my-10 w-full aspect-3/2"
                        src={ART}
                        type="application/pdf"
                    />
                    <embed
                        className="my-10 w-full aspect-3/2"
                        src={SKPengurus}
                        type="application/pdf"
                    />
                </section>
            </div>
        </main>
    )
}
