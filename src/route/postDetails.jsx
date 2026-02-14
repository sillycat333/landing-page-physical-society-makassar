import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../utils/postHelper";

function PostDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Postingan tidak ditemukan</h2>
        <Link to="/" className="text-blue-600 underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 bg-white">
      {/* Header Berita */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          {post.metadata.title}
        </h1>
        <div className="flex text-slate-500 text-sm gap-4">
          <span>{post.metadata.date}</span>
          <span>•</span>
          <span>{post.metadata.author}</span>
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata.featuredImage && (
        <img 
          src={post.metadata.featuredImage} 
          alt={post.metadata.title} 
          className="w-full rounded-2xl mb-8 shadow-lg"
        />
      )}

      {/* Konten Markdown */}
      <div className="prose prose-blue max-w-none prose-slate">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      <div className="mt-12 pt-6 border-t">
        <Link to="/kegiatan" className="text-blue-700 font-semibold">← Kembali ke Kegiatan</Link>
      </div>
    </article>
  );
}

export default PostDetail;