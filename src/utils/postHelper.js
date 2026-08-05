import matter from 'gray-matter';
import { kegiatanData } from '../data/kegiatanData.js';

const postFiles = import.meta.glob('../posts/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

/**
 * Mengambil postingan berdasarkan slug.
 * Metadata diambil & digabungkan dari kegiatanData.js sebagai sumber utama,
 * ditambah konten markdown dari src/posts/[slug].md.
 */
export const getPostBySlug = (slug) => {
  if (!slug) return null;

  // Cari metadata dari kegiatanData.js sebagai Single Source of Truth
  const kegiatanItem = kegiatanData.find((item) => item.slug === slug);

  // Cari file markdown
  const path = `../posts/${slug}.md`;
  const rawContent = postFiles[path];

  let mdData = {};
  let content = "";

  if (rawContent) {
    const parsed = matter(rawContent);
    mdData = parsed.data || {};
    content = parsed.content || "";
  }

  // Jika tidak ada kegiatanItem & tidak ada rawContent, return null
  if (!kegiatanItem && !rawContent) return null;

  // Gabungkan metadata: kegiatanData.js diutamakan untuk atribut utama
  const metadata = {
    title: kegiatanItem?.title || mdData.title || "Tanpa Judul",
    date: kegiatanItem?.date || mdData.date || "",
    author: mdData.author || "PSI Cabang Makassar",
    featuredImage: kegiatanItem?.images?.[0] || mdData.featuredImage || "",
    slug: slug,
    category: mdData.category || "Kegiatan",
    description: mdData.description || kegiatanItem?.title || "",
    ...mdData, // frontmatter kustom jika ada
  };

  return { slug, metadata, content };
};

/**
 * Mengembalikan semua postingan (hanya kegiatan yang memiliki slug).
 */
export const getAllPosts = () => {
  const postsWithSlug = kegiatanData.filter((k) => k.slug);

  const posts = postsWithSlug.map((item) => {
    return getPostBySlug(item.slug);
  });

  // Urutkan berdasarkan tanggal terbaru
  posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
  return posts;
};

/**
 * Mengembalikan postingan sebelumnya dan selanjutnya berdasarkan slug.
 */
export const getAdjacentPosts = (currentSlug) => {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
};

/**
 * Mengembalikan postingan terkait.
 */
export const getRelatedPosts = (currentSlug, maxCount = 3) => {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);

  if (!current)
    return allPosts.filter((p) => p.slug !== currentSlug).slice(0, maxCount);

  const currentCategory = current.metadata.category || "";

  const sameCategory = allPosts.filter(
    (p) => p.slug !== currentSlug && p.metadata.category === currentCategory
  );
  const different = allPosts.filter(
    (p) => p.slug !== currentSlug && p.metadata.category !== currentCategory
  );

  return [...sameCategory, ...different].slice(0, maxCount);
};