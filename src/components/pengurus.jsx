import pengurusPdf from "../assets/pengurus2025-2029.pdf";
import pengurus2021Pdf from "../assets/pengurus2021-2025.pdf";
const PengurusContent = () => (
    <article className="prose md:prose-lg max-w-none">
        <h3 className="uppercase font-extrabold text-blue-900">Pengurus Cab. Makassar</h3>
        <p>
            Struktur kepengurusan PSI pusat Periode 2025-2029:
        </p>
        <p>
            <b>Prof. Ir. Wahyu Srigutomo, S.Si., M.Si., Ph.D. (ITB)</b><br/>Ketua<br/>
            <b>Prof. Ariadne L. Juwono, M.Eng., Ph.D. (UI)</b><br/>Wakil Ketua<br/>
            <b>Prof. Dr. Umiatin, S.Si., M.Si. (UNJ)</b><br/>Sekretaris<br/>
            <b>Lusi Safriani, S.Si., M.Si., Ph.D. (UNPAD)</b><br/>Bendahara<br/>
            <b>Dr. Restu Widiatmono, S.Si., M.Si. (UNY)</b><br/>Koordinator Sistem dan Teknologi Informasi<br/>
            <b>Dr. Wahyu Hidayat, S.Si., M.Si. (ITB)</b><br/>Koordinator Kerjasama dan Hubungan Masyarakat
        </p>
        <p>
            Struktur kepengurusan <b>PSI Cabang Makassar Periode 2025-2029</b> terdiri dari para profesional dan akademisi yang berdedikasi untuk memajukan fisika di kawasan Indonesia Timur.
        </p>
       
        <div className="not-prose mt-10 space-y-4">
  <div className="relative border border-blue-100 rounded-xl p-4 md:p-5 bg-white hover:bg-blue-50/50 transition shadow-sm">
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />
    <h4 className="font-semibold text-blue-950 text-base md:text-lg">
      Dr. Khaeruddin, S.Pd., M.Pd
    </h4>
    <p className="mt-1 text-blue-700 font-bold uppercase text-sm tracking-wide">
      Ketua
    </p>
  </div>

  <div className="relative border border-blue-100 rounded-xl p-4 md:p-5 bg-white hover:bg-blue-50/50 transition shadow-sm">
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />
    <h4 className="font-semibold text-blue-950 text-base md:text-lg">
      Prof. Dr. Nurlina, S.Si., M.Pd.
    </h4>
    <p className="mt-1 text-blue-700 font-bold uppercase text-sm tracking-wide">
      Wakil Ketua
    </p>
  </div>

  <div className="relative border border-blue-100 rounded-xl p-4 md:p-5 bg-white hover:bg-blue-50/50 transition shadow-sm">
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />
    <h4 className="font-semibold text-blue-950 text-base md:text-lg">
      Muhammad Arief Fitrah Istiyanto Aslim, S.Si., M.Si.
    </h4>
    <p className="mt-1 text-blue-700 font-bold uppercase text-sm tracking-wide">
      Sekretaris
    </p>
  </div>

  <div className="relative border border-blue-100 rounded-xl p-4 md:p-5 bg-white hover:bg-blue-50/50 transition shadow-sm">
    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-xl" />
    <h4 className="font-semibold text-blue-950 text-base md:text-lg">
      Ida Laila, S.SI., M.Si.
    </h4>
    <p className="mt-1 text-blue-700 font-bold uppercase text-sm tracking-wide">
      Bendahara
    </p>
  </div>
</div>

        <embed
            className="my-10 w-full aspect-3/2"
            src={pengurusPdf}
            type="application/pdf"
        />

  
        <div className="not-prose mt-10">
  <details className="group border border-blue-200 rounded-xl overflow-hidden shadow-sm"> 
    <summary className="cursor-pointer list-none px-5 py-4 flex justify-between items-center
      bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200
      transition-all">
      <div>
        <h3 className="font-semibold text-blue-950 text-base md:text-lg">
          Pengurus PSI Cabang Makassar
        </h3>
        <span className="inline-block mt-1 text-xs font-bold text-blue-700 bg-blue-200/60 px-2 py-0.5 rounded-full">
          Periode 2021–2025
        </span>
      </div>

      <svg
        className="w-5 h-5 text-blue-700 transition-transform group-open:rotate-180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    {/* CONTENT */}
    <div className="px-5 py-6 bg-white space-y-4">
      {[
        { nama: "Prof. Dr. Arifin, M.T.", jabatan: "Ketua" },
        { nama: "Dr. Khaeruddin, S.Pd., M.Pd.", jabatan: "Wakil Ketua" },
        { nama: "Nur Hasanah, S.Si., M.Si.", jabatan: "Sekretaris" },
        { nama: "Dr. Nurlina, S.Si., M.Pd.", jabatan: "Bendahara" },
      ].map((item, i) => (
        <div
          key={i}
          className="border border-blue-100 rounded-lg p-4 hover:bg-blue-50/50 transition"
        >
          <h4 className="font-semibold text-blue-950 text-base md:text-lg">
            {item.nama}
          </h4>
          <p className="text-blue-700 font-bold uppercase text-sm tracking-wide">
            {item.jabatan}
          </p>
        </div>
      ))}

      {/* PDF SECTION */}
      <div className="mt-8 border border-blue-100 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-blue-50 font-semibold text-blue-900 text-sm">
          Dokumen SK Kepengurusan
        </div>
        <embed
          className="w-full aspect-[3/2]"
          src={pengurus2021Pdf}
          type="application/pdf"
        />
      </div>
    </div>
  </details>
</div>

    </article>
);

export default PengurusContent;
