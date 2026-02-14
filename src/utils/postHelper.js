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
  return { metadata: data, content };
};