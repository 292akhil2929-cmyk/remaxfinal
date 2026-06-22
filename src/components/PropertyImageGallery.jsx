import { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

export default function PropertyImageGallery({ images, title, videoId }) {
  const [current, setCurrent] = useState(0);
  const [videoActive, setVideoActive] = useState(false);
  const scrollRef = useRef(null);

  const hasImages = images && images.length > 0;
  const hasVideo = !!videoId;
  const totalItems = (hasImages ? images.length : 0) + (hasVideo ? 1 : 0);

  const goToImage = useCallback((idx) => {
    setVideoActive(false);
    setCurrent(idx);
  }, []);

  const goToVideo = useCallback(() => {
    setVideoActive(true);
  }, []);

  if (!hasImages && !hasVideo) {
    return (
      <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border/50 flex items-center justify-center text-muted-foreground">
        No Image
      </div>
    );
  }

  const prev = () => {
    if (videoActive) {
      setVideoActive(false);
      setCurrent(hasImages ? images.length - 1 : 0);
    } else {
      setCurrent(current === 0 ? (hasImages ? images.length - 1 : 0) : current - 1);
    }
  };
  const next = () => {
    if (hasImages && current === images.length - 1 && hasVideo) {
      setVideoActive(true);
    } else if (videoActive) {
      setVideoActive(false);
      setCurrent(0);
    } else {
      setCurrent(current === images.length - 1 ? 0 : current + 1);
    }
  };

  return (
    <div className="space-y-3">
      {/* Main Area — image or video embed */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-card border border-border/50">
        {videoActive ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Property Video Tour"
            />
            <button
              onClick={() => setVideoActive(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all z-10"
              title="Back to images"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          hasImages && (
            <img
              src={images[current]}
              alt={`${title} - ${current + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=675&q=80';
              }}
            />
          )
        )}
        {totalItems > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {videoActive ? '▶ Video' : `${current + 1} / ${hasImages ? images.length : 0}`}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {totalItems > 1 && (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
          >
            {hasImages && images.map((img, idx) => (
              <button
                key={`img-${idx}`}
                onClick={() => goToImage(idx)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  !videoActive && current === idx ? 'border-primary' : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&q=80';
                  }}
                />
              </button>
            ))}
            {hasVideo && (
              <button
                onClick={goToVideo}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all relative group ${
                  videoActive ? 'border-red-500' : 'border-border/50 hover:border-red-400'
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                  alt="Video tour"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}