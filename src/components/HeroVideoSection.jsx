import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function HeroVideoSection() {
  const [videoUrl, setVideoUrl] = useState(''); // Add your video URL here
  const [showVideo, setShowVideo] = useState(false);

  // Fallback to current hero if no video
  if (!videoUrl) {
    return null;
  }

  return (
    <section className="relative py-0 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        >
          {showVideo ? (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title="RE/MAX Zam Founder Message"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              {/* Placeholder with play button */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center">
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </button>
              </div>
              {/* Fallback image */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop"
                alt="Video Placeholder"
                className="w-full h-full object-cover"
              />
            </>
          )}
        </motion.div>

        {/* Text below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-white"
        >
          <h3 className="text-2xl font-display font-bold mb-3">A Message from Our Founder</h3>
          <p className="text-base text-white/75 font-body max-w-2xl mx-auto">
            Learn why RE/MAX Zam is different, and how we're transforming real estate investing in Dubai.
          </p>
        </motion.div>
      </div>
    </section>
  );
}