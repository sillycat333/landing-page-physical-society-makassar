/**
 * generate-sitemap.js
 * 
 * Script Node.js untuk menghasilkan sitemap.xml secara otomatis
 * berdasarkan rute website dan file postingan markdown.
 * 
 * Jalankan: node scripts/generate-sitemap.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://psimakassar.org"; // Ganti sesuai URL produksi

// Rute statis utama
const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/kegiatan", priority: "0.9", changefreq: "weekly" },
  { url: "/buku", priority: "0.7", changefreq: "monthly" },
  { url: "/tentang", priority: "0.6", changefreq: "monthly" },
  { url: "/art", priority: "0.5", changefreq: "yearly" },
];

// Baca semua file markdown postingan
const postsDir = path.resolve(__dirname, "../src/posts");
const postFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

// Ekstrak slug dan tanggal dari frontmatter
function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      fm[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
    }
  });
  return fm;
}

const postRoutes = postFiles.map((file) => {
  const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
  const fm = extractFrontmatter(content);
  const slug = file.replace(".md", "");
  return {
    url: `/post/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: fm.date || new Date().toISOString().split("T")[0],
  };
});

// Generate XML
const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticRoutes.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
  ...postRoutes.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

// Tulis ke public/sitemap.xml
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");
console.log(`✅ Sitemap berhasil dibuat: ${outputPath}`);
console.log(`   Total URL: ${urls.length} (${staticRoutes.length} statis + ${postRoutes.length} postingan)`);
