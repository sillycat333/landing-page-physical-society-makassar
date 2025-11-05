import pengurusPdf from "../assets/pengurus.pdf";

const PengurusContent = () => (
    <article className="prose md:prose-lg max-w-none">
        <h3 className="uppercase font-extrabold text-blue-900">Pengurus Cab. Makassar</h3>
        <p>
            Struktur kepengurusan PSI pusat:
        </p>
        <img src="https://member.fisika.or.id/files/page/foto/8/pengurus.jpg" alt="Pengurus PSI Pusat" />
        <p>
            Struktur kepengurusan PSI Cabang Makassar terdiri dari para profesional dan akademisi yang berdedikasi untuk memajukan fisika di kawasan Indonesia Timur.
        </p>
        <div className="not-prose space-y-4 mt-8">
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Prof. Dr. Arifin, M.T.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Ketua</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Dr. Khaeruddin, S.Pd., M.Pd.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Wakil Ketua</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Nur Hasanah, S.Si., M.Si.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Sekretaris</p>
            </div>
            <div>
                <h4 className="font-semibold text-base md:text-lg text-blue-950">Dr. Nurlina, S.Si., M.Pd.</h4>
                <p className="text-blue-700 font-bold uppercase text-sm">Bendahara</p>
            </div>
        </div>
        <embed
            className="my-10 w-full aspect-3/2"
            src={pengurusPdf}
            type="application/pdf"
        />
    </article>
);

export default PengurusContent;
