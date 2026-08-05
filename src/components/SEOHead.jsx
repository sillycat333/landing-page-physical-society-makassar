import { useEffect } from "react";

const SITE_NAME = "Physical Society of Indonesia | Cabang Makassar";
const SITE_URL = "https://psimakassar.org"; // Ganti dengan URL produksi
const DEFAULT_DESCRIPTION =
  "Situs resmi Physical Society of Indonesia (PSI) Cabang Makassar. Wadah kolaborasi dosen, peneliti, dan praktisi fisika di Indonesia Timur.";
const DEFAULT_IMAGE = "/logo.png";

/**
 * SEOHead — komponen untuk mengelola meta tag dinamis per halaman.
 *
 * Props:
 *  - title        : Judul halaman (akan di-suffix dengan nama situs)
 *  - description  : Deskripsi halaman (max ~160 karakter)
 *  - image        : URL gambar OG / Twitter Card (path relatif atau absolut)
 *  - url          : Path URL halaman saat ini (misal /post/slug)
 *  - type         : Tipe OG — "website" | "article" (default "website")
 *  - article      : Object tambahan untuk artikel { publishedTime, author }
 *  - keywords     : String keywords SEO
 *  - noIndex      : Boolean — jika true, halaman tidak di-indeks
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = "",
  type = "website",
  article = null,
  keywords = "",
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const fullUrl = `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    // --- Document title ---
    document.title = fullTitle;

    // --- Helper: set or create meta tag ---
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // --- Standard meta ---
    setMeta("name", "description", description);
    if (keywords) {
      setMeta("name", "keywords", keywords);
    }
    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow");
    }

    // --- Canonical link ---
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // --- Open Graph ---
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", fullImage);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "id_ID");

    if (type === "article" && article) {
      if (article.publishedTime) {
        setMeta("property", "article:published_time", article.publishedTime);
      }
      if (article.author) {
        setMeta("property", "article:author", article.author);
      }
    }

    // --- Twitter Card ---
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", fullImage);

    // --- JSON-LD Structured Data ---
    // Hapus JSON-LD sebelumnya (jika ada)
    const existingJsonLd = document.querySelector(
      'script[data-seo-jsonld="true"]'
    );
    if (existingJsonLd) existingJsonLd.remove();

    const jsonLdScript = document.createElement("script");
    jsonLdScript.type = "application/ld+json";
    jsonLdScript.setAttribute("data-seo-jsonld", "true");

    const jsonLdData = {
      "@context": "https://schema.org",
    };

    if (type === "article" && article) {
      Object.assign(jsonLdData, {
        "@type": "NewsArticle",
        headline: title,
        description: description,
        image: fullImage,
        url: fullUrl,
        datePublished: article.publishedTime || "",
        author: {
          "@type": "Organization",
          name: article.author || "PSI Cabang Makassar",
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": fullUrl,
        },
      });
    } else {
      Object.assign(jsonLdData, {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: description,
      });
    }

    jsonLdScript.textContent = JSON.stringify(jsonLdData);
    document.head.appendChild(jsonLdScript);

    // --- BreadcrumbList JSON-LD ---
    const existingBreadcrumb = document.querySelector(
      'script[data-seo-breadcrumb="true"]'
    );
    if (existingBreadcrumb) existingBreadcrumb.remove();

    if (url && url !== "/") {
      const breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.setAttribute("data-seo-breadcrumb", "true");

      const segments = url.split("/").filter(Boolean);
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: SITE_URL,
        },
      ];

      if (segments[0] === "post") {
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 2,
          name: "Kegiatan",
          item: `${SITE_URL}/kegiatan`,
        });
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 3,
          name: title || "Artikel",
          item: fullUrl,
        });
      } else {
        const pageNames = {
          kegiatan: "Kegiatan",
          buku: "Buku",
          tentang: "Tentang",
          art: "AD/ART",
        };
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 2,
          name: pageNames[segments[0]] || segments[0],
          item: fullUrl,
        });
      }

      breadcrumbScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      });
      document.head.appendChild(breadcrumbScript);
    }

    // --- Cleanup saat unmount ---
    return () => {
      const jsonLd = document.querySelector(
        'script[data-seo-jsonld="true"]'
      );
      if (jsonLd) jsonLd.remove();
      const breadcrumb = document.querySelector(
        'script[data-seo-breadcrumb="true"]'
      );
      if (breadcrumb) breadcrumb.remove();
    };
  }, [fullTitle, description, fullImage, fullUrl, type, article, keywords, noIndex, title, url]);

  // Komponen ini tidak merender apapun ke DOM secara visual
  return null;
}
