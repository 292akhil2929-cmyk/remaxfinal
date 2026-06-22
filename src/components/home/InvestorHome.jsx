import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import MarketTicker from '@/components/MarketTicker';

const SELLER_TESTIMONIALS = [
  {
    name: 'Sarah M.',
    country: 'United Kingdom',
    text: 'Sold my Business Bay apartment 3 weeks after listing. The team handled absolutely everything — I just signed and received the funds.',
    badge: 'Sold in 21 days',
  },
  {
    name: 'Ahmed K.',
    country: 'UAE',
    text: 'Got AED 180K above my original asking price. Their buyer network is real — serious offers came in within the first week.',
    badge: '+AED 180K above ask',
  },
  {
    name: 'Priya R.',
    country: 'India',
    text: 'I needed a fast, clean sale before relocating. They delivered exactly that. Professional, transparent, and genuinely excellent.',
    badge: 'Sold, stress-free',
  },
];

const COMMUNITIES = [
  {
    name: 'Palm Jumeirah',
    tag: 'Ultra-Luxury',
    roi: '5.2%',
    img: 'https://images.unsplash.com/photo-1682410601904-24ec1d9858e6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Downtown Dubai',
    tag: 'City Living',
    roi: '6.1%',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dubai Marina',
    tag: 'Waterfront',
    roi: '7.4%',
    img: 'https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Business Bay',
    tag: 'High Yield',
    roi: '8.2%',
    img: 'https://plus.unsplash.com/premium_photo-1697729983477-345d7407a0d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function InvestorHome() {
  const navigate = useNavigate();
  const { data: featuredProperties, isLoading, isError, error } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => base44.entities.Property.filter({ featured: true }, '-created_date', 6),
  });

  const { data: recentProperties = [] } = useQuery({
    queryKey: ['recent-properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 6),
    enabled: !isLoading && (!featuredProperties || featuredProperties.length === 0),
  });

  if (isError) {
    console.error('[InvestorHome] Featured properties query failed:', error);
  }

  // Exclude pocket listings from public home page
  const publicFeatured = (featuredProperties || []).filter((p) => !p.isPocketListing);
  const publicRecent = recentProperties.filter((p) => !p.isPocketListing);
  const properties = (publicFeatured && publicFeatured.length > 0)
    ? publicFeatured
    : publicRecent;

  return (
    <>
      <MarketTicker />

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 leading-tight">
                Dubai's Most Attractive<br />Investment Opportunities
              </h2>
            </div>
            <Link to="/properties" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-body transition-colors group">
              View all listings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="flex sm:grid sm:grid-cols-3 gap-5 overflow-x-auto scrollbar-none sm:overflow-visible">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse shrink-0 w-[85vw] sm:w-auto" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-gray-400 font-body text-sm">
              Could not load properties. Please refresh the page.
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((p, idx) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 font-body text-sm">
              No properties available right now. Check back soon.
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link to="/properties" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-body">
              View all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY GUIDE ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 leading-tight">
                Dubai's Highest<br />Yield Communities
              </h2>
            </div>
            <Link to="/area-guides" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-body transition-colors group">
              Explore all area guides <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMUNITIES.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => navigate(`/properties?community=${c.name}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block text-xs font-heading font-bold text-white/60 tracking-wider uppercase mb-1">{c.tag}</span>
                  <p className="text-white font-display font-black text-lg leading-tight mb-2">{c.name}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    <span className="text-amber-400 font-heading font-bold text-sm">{c.roi} yield</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELLER TESTIMONIALS ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 leading-tight">
              What Sellers Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SELLER_TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-gray-50 rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 font-body text-sm leading-relaxed">"{t.text}"</p>
                </div>
                <div className="flex items-end justify-between mt-6 pt-5 border-t border-gray-200">
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 font-body text-xs mt-0.5">{t.country}</p>
                  </div>
                  <span className="text-xs font-heading font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">{t.badge}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 box-border">
      
      {/* ── INNER CANVAS: Matches Hero border radius and dark theme ── */}
      <section className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl py-12 sm:py-16 lg:py-20">
        
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/landscape.png')" }} />
        <div className="absolute inset-0 bg-black/10" />
        {/* Subtle premium ambient gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* ── LEFT COLUMN: Copy & Bullet Points ── */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="max-w-xl"
            >

              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                Build Your <br className="hidden sm:block" />
                <span className="text-amber-500">Dubai Portfolio</span>
              </h2>
              
              <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                Our senior advisors will sit down with you, understand what you are trying to achieve, and show you exactly which properties match your budget and goals. No jargon, no pressure.
              </p>
              
              <ul className="space-y-5">
                {[
                  'ROI analysis based on your actual budget and timeline',
                  'An honest comparison of off-plan versus ready property',
                  'Golden Visa pathway and tax-free income structuring',
                  'Free 30-minute strategy session with no obligation',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm sm:text-base text-white/90 font-body font-medium">
                    {/* Upgraded Checkmark Icon */}
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-[10px] shrink-0 mt-0.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      ✓
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── RIGHT COLUMN: Glassmorphic Form Card ── */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white mb-2">
                  Start Your Investment Journey
                </h3>
                <p className="text-xs sm:text-sm text-white/50 font-body mb-8">
                  We respond within 24 hours.
                </p>
                
                <LeadCaptureForm leadType="Investor" source="Home - Investor" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>

      {/* ── INVESTOR CTA ── */}
      {/* <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,130,50,0.15),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/30" />
                <span className="text-white/40 font-body text-xs tracking-[0.2em] uppercase">Free Consultation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white leading-tight mb-5">
                Build Your<br />Dubai Portfolio
              </h2>
              <p className="text-gray-400 font-body text-sm leading-relaxed mb-8">
                Our senior advisors will sit down with you, understand what you are trying to achieve, and show you exactly which properties match your budget and goals. No jargon, no pressure.
              </p>
              <ul className="space-y-4">
                {[
                  'ROI analysis based on your actual budget and timeline',
                  'An honest comparison of off-plan versus ready property',
                  'Golden Visa pathway and tax-free income structuring',
                  'Free 30-minute strategy session with no obligation',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300 font-body">
                    <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-lg font-heading font-semibold tracking-tight text-white mb-1">Start Your Investment Journey</h3>
              <p className="text-xs text-gray-500 font-body mb-7">We respond within 24 hours.</p>
              <LeadCaptureForm leadType="Investor" source="Home - Investor" />
            </motion.div>
          </div>
        </div>
      </section> */}
    </>
  );
}