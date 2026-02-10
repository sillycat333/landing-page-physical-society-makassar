import pengurusPdf from "../assets/pengurus2025-2029.pdf";
import pengurus2021Pdf from "../assets/pengurus2021-2025.pdf";
const PengurusContent = () => (
    <article className="prose md:prose-lg max-w-none">
        <h3 className="uppercase font-extrabold text-blue-900">Pengurus Cab. Makassar</h3>
        <p>
            Struktur kepengurusan PSI pusat:
        </p>
        <img src="https://member.fisika.or.id/files/page/foto/8/pengurus.jpg" alt="Pengurus PSI Pusat" />
        <p>
            Struktur kepengurusan <b>PSI Cabang Makassar Periode 2025-2029</b> terdiri dari para profesional dan akademisi yang berdedikasi untuk memajukan fisika di kawasan Indonesia Timur.
        </p>
        <div className="not-prose space-y-4 mt-8">
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Dr. Khaeruddin, S.Pd., M.Pd</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Ketua</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Prof. Dr. Nurlina, S.Si., M.Pd.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Wakil Ketua</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Muhammad Arief Fitrah Istiyanto Aslim, S.Si., M.Si.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Sekretaris</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Ida Laila, S.SI., M.Si.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Bendahara</p>
            </div>
        </div>
        <embed
            className="my-10 w-full aspect-3/2"
            src={pengurusPdf}
            type="application/pdf"
        />

        <div className="not-prose mt-8">
        <details className="group border border-blue-200 rounded-lg mb-4">
            <summary className="cursor-pointer list-none px-4 py-3 flex justify-between items-center bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-950 text-base md:text-lg">
                Pengurus PSI Cabang Makassar 2021-2025
            </h3>
            <span className="transition-transform group-open:rotate-180 text-blue-700">
                ▼
            </span>
            </summary>

            <div className="space-y-4 px-4 py-4">
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">
                Prof. Dr. Arifin, M.T.
                </h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Ketua</p>
            </div>

            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">
                Dr. Khaeruddin, S.Pd., M.Pd.
                </h4>
                <p className="text-blue-700 font-bold uppercase text-sm">
                Wakil Ketua
                </p>
            </div>

            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">
                Nur Hasanah, S.Si., M.Si.
                </h4>
                <p className="text-blue-700 font-bold uppercase text-sm">
                Sekretaris
                </p>
            </div>

            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">
                Dr. Nurlina, S.Si., M.Pd.
                </h4>
                <p className="text-blue-700 font-bold uppercase text-sm">
                Bendahara
                </p>
            </div>
            </div>
            <embed
            className="my-10 w-full aspect-3/2"
            src={pengurus2021Pdf}
            type="application/pdf"
        />
        </details>
        </div>
    </article>
);

export default PengurusContent;
