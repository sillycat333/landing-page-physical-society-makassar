import matter from 'gray-matter';

const postFiles = import.meta.glob('../posts/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

export const getPostBySlug = (slug) => {
  const path = `../posts/${slug}.md`;
  const rawContent = postFiles[path];
  
  if (!rawContent) return null;

  const { data, content } = matter(rawContent);
  return { slug, metadata: data, content };
};

/**
 * Mengembalikan semua postingan, diurutkan berdasarkan tanggal (terbaru dulu).
 */
export const getAllPosts = () => {
  const posts = [];
  for (const [path, rawContent] of Object.entries(postFiles)) {
    const { data, content } = matter(rawContent);
    // Ekstrak slug dari nama file: ../posts/slug-name.md -> slug-name
    const slug = path.replace('../posts/', '').replace('.md', '');
    posts.push({ slug, metadata: data, content });
  }
  // Urutkan berdasarkan tanggal terbaru
  posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
  return posts;
};

/**
 * Mengembalikan postingan sebelumnya dan selanjutnya berdasarkan slug.
 */
export const getAdjacentPosts = (currentSlug) => {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === currentSlug);
  
  if (currentIndex === -1) return { prev: null, next: null };

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
};

/**
 * Mengembalikan postingan terkait (berdasarkan kategori atau acak, maks 3).
 */
export const getRelatedPosts = (currentSlug, maxCount = 3) => {
  const allPosts = getAllPosts();
  const current = allPosts.find(p => p.slug === currentSlug);
  
  if (!current) return allPosts.filter(p => p.slug !== currentSlug).slice(0, maxCount);

  const currentCategory = current.metadata.category || '';
  
  // Prioritaskan postingan dengan kategori yang sama
  const sameCategory = allPosts.filter(
    p => p.slug !== currentSlug && p.metadata.category === currentCategory
  );
  const different = allPosts.filter(
    p => p.slug !== currentSlug && p.metadata.category !== currentCategory
  );

  return [...sameCategory, ...different].slice(0, maxCount);
};