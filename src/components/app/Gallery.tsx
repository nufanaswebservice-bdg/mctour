"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, X, ExternalLink } from "lucide-react";

const photos = [
  { title: "Gathering Fun", image: "/gallery-1.png" },
  { title: "Team Building", image: "/gallery-2.png" },
  { title: "Tour Seru", image: "/gallery-3.png" },
  { title: "Wisata Alam", image: "/gallery-4.png" },
];

const videos = [
  { id: "8PnjNvlukO4", title: "mcTour & Travel Highlight" },
  { id: "PleYYsN-ED8", title: "Gathering Perusahaan" },
  { id: "ITFn_DrGD8Y", title: "Tour Experience" },
  { id: "-9iSp1o7U1A", title: "Adventure Trip" },
];

export default function Gallery() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="px-4 py-5"
    >
      {/* Photo Gallery */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Galeri
          </h2>
          <p className="text-xs text-muted mt-0.5">Momen indah bersama pelanggan</p>
        </div>
        <a
          href="https://www.instagram.com/mctourtravel/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary text-xs font-semibold active:opacity-70"
        >
          Instagram <ChevronRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {photos.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden aspect-[4/3] relative active:scale-[0.97] transition-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-[10px] text-white font-medium">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Gallery */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-dark-text">
            Video
          </h2>
          <p className="text-xs text-muted mt-0.5">Lihat perjalanan kami</p>
        </div>
        <a
          href="https://www.youtube.com/@mctourtravel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-red-600 text-xs font-semibold active:opacity-70"
        >
          YouTube <ChevronRight size={14} />
        </a>
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x-mandatory">
        {videos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-[220px] snap-start">
            <button
              onClick={() => setPlayingVideo(video.id)}
              className="w-full rounded-2xl overflow-hidden relative aspect-video bg-black active:scale-[0.97] transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <Play size={16} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-[10px] text-white font-medium truncate">{video.title}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* YouTube CTA */}
      <a
        href="https://www.youtube.com/@mctourtravel"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 py-3 rounded-2xl bg-red-50 text-red-600 text-xs font-bold active:scale-[0.98] transition-transform"
      >
        <Play size={14} fill="currentColor" />
        Tonton video selengkapnya di YouTube
        <ExternalLink size={12} />
      </a>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white z-10"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg aspect-video rounded-2xl overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                title="Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
