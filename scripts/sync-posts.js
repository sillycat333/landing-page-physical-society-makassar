/**
 * scripts/sync-posts.js
 * 
 * Script otomatis untuk memeriksa data kegiatan di `src/data/kegiatanData.js`.
 * Jika ada entri kegiatan yang memiliki `slug` tetapi file `.md`-nya belum ada di `src/posts/`,
 * script akan otomatis membuatkan file `.md` baru dengan template awal!
 * 
 * Jalankan: node scripts/sync-posts.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.resolve(__dirname, '../src/posts');
const kegiatanDataPath = path.resolve(__dirname, '../src/data/kegiatanData.js');

// Pastikan folder src/posts ada
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Import kegiatanData
async function syncPosts() {
  const fileUrl = `file://${kegiatanDataPath.replace(/\\/g, '/')}`;
  const { kegiatanData } = await import(fileUrl);

  let createdCount = 0;

  for (const item of kegiatanData) {
    if (!item.slug) continue;

    const mdPath = path.join(postsDir, `${item.slug}.md`);

    if (!fs.existsSync(mdPath)) {
      const featuredImage = item.images && item.images.length > 0 ? item.images[0] : '';
      
      const template = `---
title: "${item.title.replace(/"/g, '\\"')}"
date: "${item.date}"
author: "Admin"
featuredImage: "${featuredImage}"
slug: "${item.slug}"
category: "Kegiatan"
description: "${item.title.replace(/"/g, '\\"')}"
---

Tuliskan artikel atau rincian berita kegiatan **${item.title}** di sini...
`;

      fs.writeFileSync(mdPath, template, 'utf-8');
      console.log(`✨ Automatic .md created: src/posts/${item.slug}.md`);
      createdCount++;
    }
  }

  if (createdCount === 0) {
    console.log('✅ Semua slug kegiatan di kegiatanData.js sudah memiliki file .md.');
  } else {
    console.log(`🎉 Berhasil membuat ${createdCount} file .md baru!`);
  }
}

syncPosts().catch(console.error);
