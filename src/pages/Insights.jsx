import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import usePageSEO from '@/lib/usePageSEO';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, ArrowRight, BookOpen, BarChart2, Globe, Home, Star, ChevronRight } from 'lucide-react';
import moment from 'moment';

/* ── Static evergreen data ─────────────────────────────────── */

const MARKET_STATS = [
  { label: 'Q1 2026 Transaction Volume', value: 'AED 170B+', delta: '+19% YoY', up: true },
  { label: 'Average Rental Yield (Dubai)', value: '7.5%', delta: 'vs 4.2% London', up: true },
  { label: 'Off-Plan Sales Share', value: '68%', delta: 'New record high', up: true },
  { label: 'Golden Visa Property Threshold', value: 'AED 2M', delta: 'Stable since 2022', up: null },
];

const EVERGREEN_ARTICLES = [
  {
    category: 'Investment Guide',
    title: 'Dubai Real Estate Investment Guide 2025: Everything Foreign Investors Need to Know',
    excerpt: 'A comprehensive breakdown of freehold zones, purchase process, DLD fees, mortgage options for non-residents, and the Golden Visa pathway — the definitive starting point for international property investors.',
    readTime: '12 min read',
    icon: Globe,
    tags: ['Freehold Zones', 'DLD Fees', 'Mortgage', 'Golden Visa'],
    slug: 'dubai-real-estate-investment-guide-2025',
  },
  {
    category: 'Market Analysis',
    title: 'Dubai Property Market Outlook 2025–2030: Key Trends Shaping the Next Cycle',
    excerpt: 'Population growth targets, Expo City legacy demand, infrastructure investment pipeline, and why Dubai is positioned as a top-5 global city by 2030 — backed by government data and transaction analytics.',
    readTime: '9 min read',
    icon: TrendingUp,
    tags: ['Market Trends', 'Population Growth', 'Price Forecasts', 'Supply Pipeline'],
    slug: 'dubai-property-market-outlook-2025-2030',
  },
  {
    category: 'Area Spotlight',
    title: 'Dubai Marina vs Business Bay vs Downtown: Which Community Delivers the Best ROI in 2025?',
    excerpt: 'A data-driven comparison of Dubai\'s three most transacted investment communities — rental yields, price appreciation, liquidity, tenant profiles, and total return analysis for buy-to-let investors.',
    readTime: '8 min read',
    icon: BarChart2,
    tags: ['ROI Comparison', 'Dubai Marina', 'Business Bay', 'Downtown Dubai'],
    slug: 'dubai-marina-vs-business-bay-vs-downtown-roi-2025',
  },
  {
    category: 'Golden Visa',
    title: 'UAE Golden Visa Through Property Investment: Complete 2025 Eligibility & Application Guide',
    excerpt: 'Step-by-step breakdown of the AED 2M property route to UAE residency — eligible property types, off-plan vs ready rules, family inclusion, renewal conditions, and common mistakes to avoid.',
    readTime: '7 min read',
    icon: Star,
    tags: ['Golden Visa', 'UAE Residency', 'Eligibility', 'Application Process'],
    slug: 'uae-golden-visa-property-investment-guide-2025',
  },
  {
    category: 'Investment Guide',
    title: 'Off-Plan vs Ready Properties in Dubai: A Complete Risk-Return Analysis for 2025 Buyers',
    excerpt: 'When does it make sense to buy off-plan vs ready? Developer track records, payment plan structures, handover risk, resale liquidity, and yield timelines — all assessed objectively for 2025 market conditions.',
    readTime: '10 min read',
    icon: Home,
    tags: ['Off-Plan', 'Ready Properties', 'Payment Plans', 'Risk Analysis'],
    slug: 'off-plan-vs-ready-properties-dubai-2025',
  },
  {
    category: 'Agent Tips',
    title: 'How to Choose a Dubai Real Estate Agent: 10 Questions Every International Buyer Must Ask',
    excerpt: 'What separates a credible, RERA-licensed Dubai agent from a high-pressure salesperson? This guide arms international investors with the key due-diligence questions before making the most important financial decision of their life.',
    readTime: '6 min read',
    icon: BookOpen,
    tags: ['RERA Licensed', 'Due Diligence', 'Agent Selection', 'Buyer Protection'],
    slug: 'how-to-choose-dubai-real-estate-agent',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Can foreigners buy property in Dubai?',
    a: 'Yes. Dubai allows 100% foreign ownership of freehold properties in designated freehold zones — including Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, and JVC. There is no requirement to be a UAE resident to purchase property.',
  },
  {
    q: 'What is the minimum investment for the UAE Golden Visa?',
    a: 'The UAE Golden Visa property route requires a minimum investment of AED 2,000,000 (approximately USD 545,000) in ready or off-plan property. The visa grants 10-year renewable UAE residency including immediate family members.',
  },
  {
    q: 'What are the typical rental yields in Dubai?',
    a: 'Dubai consistently delivers among the highest rental yields globally — averaging 6–8% gross per annum across prime communities. JVC and Dubai South offer 8–10%, while Palm Jumeirah and Downtown typically yield 5–7% with stronger capital appreciation profiles.',
  },
  {
    q: 'Are there property taxes in Dubai?',
    a: 'Dubai has no annual property tax, no capital gains tax, and no inheritance tax on real estate. The one-time Dubai Land Department (DLD) transfer fee is 4% of the purchase price, paid at time of transfer.',
  },
  {
    q: 'What is the mortgage eligibility for non-residents in Dubai?',
    a: 'Non-residents can access UAE bank mortgages with a minimum 20–25% deposit (LTV up to 75–80%). Interest rates for non-residents typically range 4.5–6.5% depending on the bank, loan amount, and applicant profile. Pre-approval is available remotely.',
  },
  {
    q: 'How long does a property purchase take in Dubai?',
    a: 'A cash purchase in Dubai can complete in 3–7 business days after signing the MOU. Mortgage transactions typically take 4–6 weeks. Off-plan purchases are simpler — you sign a Sales & Purchase Agreement (SPA) directly with the developer.',
  },
];

const CATEGORY_COLORS = {
  'Investment Guide': 'bg-gray-100 text-gray-700 border-gray-200',
  'Market Analysis': 'bg-gray-100 text-gray-700 border-gray-200',
  'Area Spotlight': 'bg-gray-100 text-gray-700 border-gray-200',
  'Golden Visa': 'bg-gray-100 text-gray-700 border-gray-200',
  'Developer News': 'bg-gray-100 text-gray-700 border-gray-200',
  'Agent Tips': 'bg-gray-100 text-gray-700 border-gray-200',
};

function ArticleCard({ article, isLarge = false }) {
  const Icon = article.icon;
  const colorClass = CATEGORY_COLORS[article.category] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <article className={`group bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col ${isLarge ? 'lg:flex-row' : ''}`}>
      {/* Icon banner */}
      <div className={`${isLarge ? 'lg:w-48 lg:flex-shrink-0' : ''} bg-gray-50 flex items-center justify-center p-8`}>
        {Icon && <Icon className="w-10 h-10 text-gray-300" />}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-heading font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}>{article.category}</span>
          <span className="text-xs text-gray-500 font-body">{article.readTime}</span>
        </div>
        <h3 className={`font-heading font-bold text-gray-900 mb-2 group-hover:text-black transition-colors leading-snug ${isLarge ? 'text-lg' : 'text-base'}`}>{article.title}</h3>
        <p className="text-sm text-gray-500 font-body leading-relaxed mb-4 flex-1">{article.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 rounded font-body text-gray-500">{t}</span>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="self-start text-gray-900 hover:bg-gray-50 font-heading p-0 h-auto" asChild>
          <Link to="/contact">Request Full Report <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></Link>
        </Button>
      </div>
    </article>
  );
}

export default function Insights() {
  usePageSEO({
    title: 'Dubai Real Estate Insights & Market News | RE/MAX Zam',
    description: "Expert analysis on Dubai's property market — prices, trends and investment opportunities. Stay ahead with RE/MAX Zam's latest insights.",
    canonical: 'https://remaxzam.ae/insights',
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }, '-created_date', 20),
    select: (data) => Array.isArray(data) ? data : [],
  });

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">RE/MAX Zam — Knowledge Hub</p>
            <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">
              Dubai Real Estate Market Insights 2025
            </h1>
            <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
              Expert analysis, investment guides, rental yield data, and the latest Dubai property market trends — everything international investors need to make smarter decisions.
            </p>
            {/* Live Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MARKET_STATS.map(s => (
                <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-xl lg:text-2xl font-heading font-black text-[#C9A84C] mb-0.5">{s.value}</p>
                  <p className="text-xs font-heading font-semibold mb-1 text-gray-500">{s.delta}</p>
                  <p className="text-xs text-gray-400 font-body leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop"
              alt="Dubai aerial view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white text-xs font-heading font-bold">Dubai Market Data</p>
              <p className="text-[#C9A84C] text-[10px] font-body">Updated monthly by our analysts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Blog Posts (if any) ─────────────────────── */}
      {(isLoading || posts.length > 0) && (
        <section className="py-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-900" /> Latest from Our Team
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="bg-white border border-gray-100 rounded-xl h-64 animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                    <article className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all h-full flex flex-col">
                      {post.image_url && (
                        <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {moment(post.created_date).format('MMM D, YYYY')}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">{post.title}</h3>
                        <p className="text-sm text-gray-500 font-body line-clamp-3 flex-1">{post.excerpt}</p>
                        <span className="mt-3 text-xs text-gray-900 font-heading font-bold flex items-center gap-1">
                          Read Article <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Evergreen Investment Guides ──────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest uppercase mb-2">Deep-Dive Guides</p>
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900">Essential Reading for Dubai Investors</h2>
              <p className="text-sm text-gray-500 font-body mt-2 max-w-xl">Comprehensive research reports on the topics that matter most — updated for 2025 market conditions.</p>
            </div>
            <Button className="bg-black hover:bg-gray-900 text-white font-heading font-bold shrink-0" asChild>
              <Link to="/contact">Request Custom Report <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          {/* Featured top 2 */}
          <div className="grid grid-cols-1 gap-5 mb-5">
            {EVERGREEN_ARTICLES.slice(0, 2).map(a => (
              <ArticleCard key={a.slug} article={a} isLarge />
            ))}
          </div>
          {/* Grid of remaining */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {EVERGREEN_ARTICLES.slice(2).map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Snapshot Table ────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest uppercase mb-2">Data Intelligence</p>
          <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">Dubai Community Yield Snapshot — 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm font-body bg-white">
              <thead className="bg-black text-white">
                <tr>
                  {['Community', 'Avg. Rental Yield', 'Entry Price', 'Investor Type', 'Capital Growth Outlook'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-heading font-semibold text-sm">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { area: 'Jumeirah Village Circle (JVC)', yield: '8–10%', entry: 'AED 350K', type: 'Yield-First', outlook: '⬆ High Upside', outClass: 'text-gray-900' },
                  { area: 'Business Bay', yield: '6–8%', entry: 'AED 600K', type: 'Balanced', outlook: '⬆ Strong', outClass: 'text-gray-900' },
                  { area: 'Dubai Marina', yield: '6–8%', entry: 'AED 700K', type: 'Yield + Liquidity', outlook: '⬆ Strong', outClass: 'text-gray-900' },
                  { area: 'Downtown Dubai', yield: '5–7%', entry: 'AED 1.2M', type: 'Capital Growth', outlook: '⬆ Premium', outClass: 'text-gray-900' },
                  { area: 'Dubai Hills Estate', yield: '5–6%', entry: 'AED 1.5M', type: 'Family / Long-Term', outlook: '⬆ Consistent', outClass: 'text-gray-900' },
                  { area: 'Palm Jumeirah', yield: '5–7%', entry: 'AED 1.5M', type: 'Trophy Asset', outlook: '⬆ Strong Scarcity Value', outClass: 'text-gray-900' },
                ].map((row, i) => (
                  <tr key={row.area} className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="py-3.5 px-4 font-medium text-gray-900">{row.area}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 rounded text-xs font-heading font-semibold">{row.yield}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{row.entry}</td>
                    <td className="py-3.5 px-4 text-gray-500">{row.type}</td>
                    <td className={`py-3.5 px-4 font-medium ${row.outClass}`}>{row.outlook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 font-body mt-3">Data based on Q1 2026 DLD transaction records and RE/MAX Zam proprietary market analysis. Yields are gross estimates; net yields vary by service charges and occupancy.</p>
        </div>
      </section>

      {/* ── FAQ — high GEO / voice search value ─────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest uppercase mb-2 text-center">Investor FAQs</p>
          <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-3 text-center">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 font-body text-center mb-10">The most common questions international investors ask before buying property in Dubai.</p>

          <div className="space-y-4">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-xl p-6 hover:border-gray-200 transition-colors">
                <h3 className="font-heading font-bold text-gray-900 mb-3 flex items-start gap-2">
                  <span className="text-gray-400 font-heading text-lg leading-none mt-0.5">Q.</span>
                  {q}
                </h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed pl-5">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <TrendingUp className="w-8 h-8 text-white/40 mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-display font-black mb-3">Get a Personalised Investment Report</h2>
          <p className="text-white/70 font-body mb-7 text-sm leading-relaxed">
            Our advisors will build a tailored analysis — matching your budget, risk profile, and ROI targets to the right Dubai community and property type.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-black font-heading font-bold border-0" asChild>
              <Link to="/contact">Request Free Analysis <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-heading" asChild>
              <Link to="/area-guides">Explore Area Guides</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}