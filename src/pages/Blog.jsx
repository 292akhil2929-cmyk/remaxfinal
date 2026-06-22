import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import usePageSEO from '@/lib/usePageSEO';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

const CATEGORY_COLORS = {
  'Market Analysis': 'bg-gray-100 text-gray-700',
  'Investment Guide': 'bg-gray-100 text-gray-700',
  'Golden Visa': 'bg-gray-100 text-gray-700',
  'Area Spotlight': 'bg-gray-100 text-gray-700',
  'Developer News': 'bg-gray-100 text-gray-700',
  'Agent Tips': 'bg-gray-100 text-gray-700',
};

export default function Blog() {
  usePageSEO({
    title: 'Dubai Real Estate Insights & Market News | RE/MAX Zam',
    description: "Expert analysis on Dubai's property market — prices, trends and investment opportunities. Stay ahead with RE/MAX Zam's latest insights.",
    canonical: 'https://remaxzam.ae/insights',
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date'),
    select: (data) => Array.isArray(data) ? data : [],
  });

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Dubai Real Estate Blog</p>
            <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Market Updates &amp; Investment Insights</h1>
            <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed">
              Expert analysis, area spotlights, and investment guides to help international investors navigate Dubai's property market with confidence.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1543579596-2c11997c7706?w=900&q=80&auto=format&fit=crop"
              alt="Dubai city skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No posts published yet.</p>
            <p className="text-sm mt-1">Check back soon for market updates and investment guides.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <Link to={`/blog/${featured.id}`} className="group block mb-16">
                <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 border-l-4 border-l-[#C9A84C] hover:shadow-xl transition-shadow">
                  {featured.image_url ? (
                    <img src={featured.image_url} alt={featured.title} className="w-full h-72 md:h-full object-cover" />
                  ) : (
                    <div className="w-full h-72 md:h-auto bg-gray-100 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit ${CATEGORY_COLORS[featured.category] || 'bg-gray-100 text-gray-500'}`}>
                      {featured.category}
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">{featured.title}</h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(featured.created_date), 'MMMM d, yyyy')}
                      </span>
                      <span className="text-gray-900 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post Grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 border-l-4 border-l-[#C9A84C] hover:shadow-lg transition-shadow flex flex-col">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-44 object-cover" />
                    ) : (
                      <div className="w-full h-44 bg-gray-50 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 w-fit ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-500'}`}>
                        {post.category}
                      </span>
                      <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-black transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.created_date), 'MMM d, yyyy')}
                        </span>
                        <span className="text-gray-900 text-xs font-bold flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}