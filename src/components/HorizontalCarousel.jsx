import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Shared horizontal-scroll carousel with peek & arrows — mobile only.
 * On sm+ it renders children in a standard responsive grid via the `gridClass` prop.
 *
 * Props:
 *   items          – array of data
 *   renderItem     – (item, index) => JSX for each card
 *   keyFn          – (item, index) => unique key
 *   cardClass      – class for each card wrapper (default: "shrink-0 w-[85vw] snap-start")
 *   gridClass      – class for the desktop grid (default: "hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5")
 *   gapClass       – gap between cards on mobile (default: "gap-4")
 *   scrollAmount   – fraction of container width to scroll per arrow click (default: 0.85)
 *   deps           – dependency array for re-initialising scroll listeners
 */
export default function HorizontalCarousel({
  items = [],
  renderItem,
  keyFn = (_, i) => i,
  cardClass = 'shrink-0 w-[85vw] snap-start',
  gridClass = 'hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5',
  gapClass = 'gap-4',
  scrollAmount = 0.85,
  deps = [],
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, ...deps]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * scrollAmount * dir, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Mobile: horizontal carousel ── */}
      <div className="sm:hidden relative">
        <div
          ref={scrollRef}
          className={`flex ${gapClass} overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth`}
        >
          {items.map((item, idx) => (
            <div key={keyFn(item, idx)} className={`${cardClass} overflow-hidden`}>
              {renderItem(item, idx)}
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Desktop: grid ── */}
      <div className={gridClass}>
        {items.map((item, idx) => renderItem(item, idx))}
      </div>
    </>
  );
}
