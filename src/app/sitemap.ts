import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mctourtravel.com";

  const staticPages = [
    "",
    "/tentang-kami",
    "/paket-tour-domestik",
    "/paket-tour-luar-negeri",
    "/outbound",
    "/event-organizer",
    "/umroh-haji",
    "/tiket-pesawat",
    "/dokumen-perjalanan",
    "/blog",
    "/faq",
    "/galeri",
    "/kontak",
  ];

  const blogPosts = [
    "/blog/travel-bali-terbaik",
    "/blog/wisata-bromo-guide",
    "/blog/wisata-dieng",
    "/blog/wisata-jogja-murah",
    "/blog/harga-tiket-pesawat",
    "/blog/paket-umroh-terbaik",
    "/blog/gathering-perusahaan-sukses",
    "/blog/tips-liburan-keluarga",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
