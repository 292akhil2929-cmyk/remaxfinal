import { Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const videos = [
  { id: 'X0YeF0lsHYU', title: "Don't Invest in Dubai Until You Watch This" },
  { id: 'XCrtYo-W5Es', title: 'How Smart Investors Move Capital' },
  { id: 'Lk8xaih-zGY', title: 'Is Dubai Real Estate in Trouble?' },
];

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="rounded-lg overflow-hidden border border-white/10 bg-slate-900"
    >
      {playing ? (
        <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} title={video.title} allowFullScreen />
      ) : (
        <div className="relative aspect-video cursor-pointer bg-black overflow-hidden group" onClick={() => setPlaying(true)}>
          <img src={thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.15 }} className="w-14 h-14 rounded-full bg-gradient-to-r from-[#B87333] to-[#A86228] flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </motion.div>
          </div>
        </div>
      )}
      <div className="p-3">
        <p className="text-xs font-heading font-bold text-white line-clamp-2">{video.title}</p>
      </div>
    </motion.div>
  );
}

export default function YouTubeSection() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-2">Learn & Invest</h2>
          <p className="text-sm text-gray-300 font-body">Expert insights in 5–15 minutes</p>
        </motion.div>

        {/* Grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v, idx) => (
            <VideoCard key={v.id} video={v} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}