import path from 'path';
import fs from 'fs';

/**
 * Vite Plugin untuk memantau perubahan pada kegiatanData.js.
 * Setiap kali kegiatanData.js di-save (HMR/change event),
 * plugin ini akan memeriksa slug baru dan otomatis membuat file .md yang belum ada.
 */
export default function syncPostsPlugin() {
  return {
    name: 'vite-plugin-sync-posts',
    handleHotUpdate({ file, server }) {
      // Periksa jika file yang di-save adalah kegiatanData.js
      if (file.replace(/\\/g, '/').endsWith('src/data/kegiatanData.js')) {
        const postsDir = path.resolve(server.config.root, 'src/posts');

        if (!fs.existsSync(postsDir)) {
          fs.mkdirSync(postsDir, { recursive: true });
        }

        // BACA isi kegiatanData.js secara instan menggunakan regex agar aman dari cache ESM
        try {
          const content = fs.readFileSync(file, 'utf-8');
          
          // Match setiap blok objek kegiatan
          const slugMatches = [...content.matchAll(/slug\s*:\s*["']([^"']+)["']/g)];
          
          for (const match of slugMatches) {
            const slug = match[1];
            const mdPath = path.join(postsDir, `${slug}.md`);

            if (!fs.existsSync(mdPath)) {
              // Cari title jika ada di dekat slug
              const titleMatch = content.slice(Math.max(0, match.index - 300), match.index).match(/title\s*:\s*["']([^"']+)["']/);
              const title = titleMatch ? titleMatch[1] : slug;

              const dateMatch = content.slice(Math.max(0, match.index - 300), match.index).match(/date\s*:\s*["']([^"']+)["']/);
              const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

              const imgMatch = content.slice(Math.max(0, match.index - 300), match.index).match(/images\s*:\s*\[\s*["']([^"']+)["']/);
              const featuredImage = imgMatch ? imgMatch[1] : '';

              const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
author: "Admin"
featuredImage: "${featuredImage}"
slug: "${slug}"
category: "Kegiatan"
description: "${title.replace(/"/g, '\\"')}"
---

Tuliskan artikel atau rincian berita kegiatan **${title}** di sini...
`;

              fs.writeFileSync(mdPath, template, 'utf-8');
              console.log(`\n✨ [Auto-Sync Plugin] File markdown baru dibuat otomatis: src/posts/${slug}.md`);
            }
          }
        } catch (err) {
          console.error('[Auto-Sync Plugin Error]', err);
        }
      }
    },
  };
}
