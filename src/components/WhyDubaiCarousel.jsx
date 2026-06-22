import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

/* ── SKELETON CARD ── */
function SkeletonCard({ wide = false }) {
  return (
    <div className={`bg-gray-100 rounded-2xl animate-pulse relative h-[240px] sm:h-auto ${wide ? 'lg:col-span-2 aspect-[16/7]' : 'aspect-[16/10]'}`} />
  );
}

/* ── REVAMPED BLOG CARD ── */
function BlogCard({ post = {}, wide = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={`h-full ${wide ? 'lg:col-span-2' : ''}`}
    >
      <Link
        to={`/blog/${post.id}`}
        className="group block relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full"
      >
        <div className={`w-full h-full relative ${wide ? 'lg:aspect-[16/7]' : 'lg:aspect-[16/10]'}`}>
          <img
            src={post.image_url || `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80`}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {/* Linear text backdrop protection + subtle bright glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300" />
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Floating Content Block pinned over image */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 z-10 select-none">
          {/* Date Indicator */}
          {post.created_date && (
            <div className="text-[11px] text-white/60 font-body flex items-center gap-1.5 mb-2.5">
              <Calendar className="w-3.5 h-3.5 text-white/50" />
              {format(new Date(post.created_date), 'MMM d, yyyy')}
            </div>
          )}

          {/* Floating Heading Overlay */}
          <h3 className={`font-heading font-bold text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors ${wide ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg'}`}>
            {post.title}
          </h3>

          {/* Read More link explicitly appearing for desktop wide frames */}
          {wide && (
            <div className="hidden sm:flex items-center gap-1.5 mt-3 text-amber-400 font-heading text-xs font-bold tracking-wide uppercase">
              Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/* ── MAIN COMPONENT ── */
export default function BlogCarousel() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['latest-blogs-home'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date'),
    staleTime: 5 * 60 * 1000,
  });

  // Mobile carousel
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
  }, [posts]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.85 * dir, behavior: 'smooth' });
  };

  const blogs = posts.slice(0, 6);
  const grid = [
    { post: blogs[0], wide: true, delay: 0 },
    { post: blogs[1], wide: false, delay: 0.08 },
    { post: blogs[2], wide: false, delay: 0.16 },
    { post: blogs[3], wide: false, delay: 0.08 },
    { post: blogs[4], wide: false, delay: 0.16 },
    { post: blogs[5], wide: true, delay: 0.24 },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 box-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 leading-tight">
              Recent Articles & News
            </h2>
          </div>
          <Link to="/insights" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-body transition-colors group">
            View all Blogs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── BLOG DISPLAY ── */}
        {isLoading ? (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto scrollbar-none sm:overflow-visible">
            <SkeletonCard wide />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard wide />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-body text-sm">Fresh insights are being written — check back soon.</p>
          </div>
        ) : (
          <>
            {/* Mobile: horizontal scroll carousel */}
            <div className="sm:hidden relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
              >
                {grid.map(
                  (item, idx) =>
                    item.post && (
                      <div key={item.post.id || idx} className="shrink-0 w-[85vw] snap-start overflow-hidden">
                        <BlogCard post={item.post} wide={false} delay={item.delay} />
                      </div>
                    )
                )}
              </div>
              {canScrollLeft && (
                <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors z-10">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {canScrollRight && (
                <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors z-10">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Desktop: staggered 4-column grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {grid.map(
                (item, idx) =>
                  item.post && (
                    <BlogCard
                      key={item.post.id || idx}
                      post={item.post}
                      wide={item.wide}
                      delay={item.delay}
                    />
                  )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}