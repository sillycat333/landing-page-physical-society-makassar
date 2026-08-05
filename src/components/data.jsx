/**
 * src/components/data.jsx
 * 
 * Re-export dari modul terpisah di folder `src/data/`:
 * - `bukuData.js` -> data koleksi buku
 * - `kegiatanData.js` -> data daftar kegiatan
 * 
 * Hal ini menjaga kompatibilitas impor lama sekaligus membuat
 * manajemen data menjadi rapi dan mudah dirawat.
 */

export { books } from '../data/bukuData.js';
export { kegiatanData } from '../data/kegiatanData.js';
