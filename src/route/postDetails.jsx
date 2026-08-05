import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAdjacentPosts, getRelatedPosts } from "../utils/postHelper";
import SEOHead from "../components/SEOHead";
import { Share2, Link2, ChevronLeft, ChevronRight, ArrowLeft, Clock, User, Check } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const adjacent = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // --- Copy link handler ---
  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      // Tampilkan notifikasi singkat
      const btn = document.getElementById("copy-link-btn");
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Tersalin!`;
        btn.classList.add("bg-green-100", "text-green-700", "border-green-300");
        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.remove("bg-green-100", "text-green-700", "border-green-300");
        }, 2000);
      }
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  if (!post) {
    return (
      <>
        <SEOHead
          title="Postingan Tidak Ditemukan"
          description="Halaman yang Anda cari tidak ditemukan."
          url={`/post/${slug}`}
          noIndex={true}
        />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-800">
            Postingan tidak ditemukan
          </h2>
          <p className="text-slate-500 mt-2">
            Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-blue-950 text-white font-semibold text-sm hover:bg-blue-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </div>
      </>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.metadata.title || "";
  const shareDescription = post.metadata.description || "";

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareTitle}\n\n${shareUrl}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareTitle
    )}&url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <>
      {/* === SEO Head === */}
      <SEOHead
        title={post.metadata.title}
        description={
          post.metadata.description ||
          `${post.metadata.title} — Kegiatan PSI Cabang Makassar`
        }
        image={post.metadata.featuredImage || "/logo.png"}
        url={`/post/${slug}`}
        type="article"
        article={{
          publishedTime: post.metadata.date,
          author: post.metadata.author || "PSI Cabang Makassar",
        }}
        keywords={`${post.metadata.category || "Fisika"}, PSI Makassar, Physical Society of Indonesia, ${post.metadata.title}`}
      />

      <article className="max-w-3xl mx-auto px-6 py-10 bg-white">
        {/* === Breadcrumbs === */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500 flex items-center gap-1.5 flex-wrap"
        >
          <Link
            to="/"
            className="hover:text-blue-700 transition-colors font-medium"
          >
            Beranda
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            to="/kegiatan"
            className="hover:text-blue-700 transition-colors font-medium"
          >
            Kegiatan
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700 font-medium line-clamp-1">
            {post.metadata.title}
          </span>
        </nav>

        {/* === Header === */}
        <header className="mb-8">
          {post.metadata.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-3">
              {post.metadata.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {post.metadata.title}
          </h1>
          <div className="flex flex-wrap items-center text-slate-500 text-sm gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              {formatDate(post.metadata.date)}
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              {post.metadata.author}
            </span>
          </div>
        </header>

        {/* === Featured Image === */}
        {post.metadata.featuredImage && (
          <figure className="mb-8">
            <img
              src={post.metadata.featuredImage}
              alt={post.metadata.title}
              className="w-full rounded-2xl shadow-lg"
              loading="eager"
            />
          </figure>
        )}

        {/* === Konten Markdown === */}
        <div className="prose prose-blue max-w-none prose-slate prose-img:rounded-xl prose-img:shadow-md prose-headings:text-slate-800">
          <ReactMarkdown
            components={{
              img: ({ node, ...props }) => (
                <figure className="my-6">
                  <img
                    {...props}
                    loading="lazy"
                    className="w-full rounded-xl shadow-md"
                  />
                  {props.alt && props.alt !== "" && (
                    <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
                      {props.alt}
                    </figcaption>
                  )}
                </figure>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* === Bagikan Artikel === */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Share2 size={18} className="text-slate-600" />
            <h3 className="font-semibold text-slate-800 text-sm">
              Bagikan Artikel
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-300 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
              aria-label="Bagikan ke WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              aria-label="Bagikan ke Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors"
              aria-label="Bagikan ke Twitter/X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter / X
            </a>
            <button
              id="copy-link-btn"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Salin tautan artikel"
            >
              <Link2 size={16} />
              Salin Tautan
            </button>
          </div>
        </div>

        {/* === Navigasi Prev / Next === */}
        {(adjacent.prev || adjacent.next) && (
          <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adjacent.prev ? (
              <Link
                to={`/post/${adjacent.prev.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                <ChevronLeft
                  size={20}
                  className="mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors"
                />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">
                    ← Sebelumnya
                  </p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors">
                    {adjacent.prev.metadata.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {adjacent.next ? (
              <Link
                to={`/post/${adjacent.next.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-right sm:flex-row-reverse"
              >
                <ChevronRight
                  size={20}
                  className="mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors"
                />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1">
                    Selanjutnya →
                  </p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors">
                    {adjacent.next.metadata.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* === Artikel Terkait === */}
        {related.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  to={`/post/${relPost.slug}`}
                  className="group block rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  {relPost.metadata.featuredImage && (
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={relPost.metadata.featuredImage}
                        alt={relPost.metadata.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-xs text-blue-600 font-medium mb-1">
                      {formatDate(relPost.metadata.date)}
                    </p>
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors">
                      {relPost.metadata.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* === Kembali ke Kegiatan === */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <Link
            to="/kegiatan"
            className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Kegiatan
          </Link>
        </div>
      </article>
    </>
  );
}

export default PostDetail;