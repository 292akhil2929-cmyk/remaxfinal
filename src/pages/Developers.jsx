import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink, Building2 } from 'lucide-react';
import { useEffect } from 'react';
import usePageSEO from '@/lib/usePageSEO';

const DEVELOPERS = [
  {
    name: 'Emaar Properties',
    slug: 'emaar-properties',
    tier: 'Tier 1',
    tierLabel: 'Most Trusted',
    founded: '1997',
    projects: '200+',
    units: '85,000+',
    yield: '6–8%',
    paymentPlan: 'Flexible Post-Handover',
    tagline: 'They built Burj Khalifa, Downtown Dubai and Dubai Hills. The benchmark every other developer is measured against.',
    description: 'Emaar is the most trusted name in Dubai real estate. 25+ years of consistent delivery, a public listing on the DFM, and communities that consistently outperform on resale. If you want certainty, start here.',
    highlights: ['Listed on Dubai Financial Market (DFM)', '25+ years of on-time delivery', 'Best-in-class resale values'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/cc981df5d_generated_image.png',
    currentProjects: [
      { name: 'The Oasis by Emaar', status: 'Selling', path: '/properties?developer=Emaar&community=The+Oasis' },
      { name: 'Emaar Beachfront', status: 'Selling', path: '/properties?developer=Emaar&community=Emaar+Beachfront' },
      { name: 'Dubai Hills Estate', status: 'Selling', path: '/properties?developer=Emaar&community=Dubai+Hills+Estate' },
      { name: 'Creek Harbour', status: 'Selling', path: '/properties?developer=Emaar&community=Creek+Harbour' },
      { name: 'The Valley', status: 'Upcoming', path: '/properties?developer=Emaar&community=The+Valley' },
    ],
  },
  {
    name: 'DAMAC Properties',
    slug: 'damac-properties',
    tier: 'Tier 1',
    tierLabel: 'Highly Trusted',
    founded: '2002',
    projects: '100+',
    units: '40,000+',
    yield: '7–9%',
    paymentPlan: '70/30',
    tagline: 'Dubai\'s luxury off-plan leader. Versace, Cavalli, Lamborghini — branded residences with strong resale value.',
    description: "DAMAC dominates the branded luxury segment. Their communities like DAMAC Hills and DAMAC Lagoons consistently attract international investors who want a premium address with genuine yield.",
    highlights: ['Versace, Cavalli, Pagani branded residences', 'Strong secondary market demand', 'Full community infrastructure from day one'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/eca310001_generated_image.png',
    currentProjects: [
      { name: 'DAMAC Lagoons', status: 'Selling', path: '/properties?developer=DAMAC&community=DAMAC+Lagoons' },
      { name: 'DAMAC Hills 2', status: 'Selling', path: '/properties?developer=DAMAC&community=DAMAC+Hills+2' },
      { name: 'Cavalli Couture', status: 'Selling', path: '/properties?developer=DAMAC&community=Business+Bay' },
      { name: 'Canal Crown', status: 'Selling', path: '/properties?developer=DAMAC&community=Business+Bay' },
      { name: 'Riverside by DAMAC', status: 'Upcoming', path: '/properties?developer=DAMAC' },
    ],
  },
  {
    name: 'Sobha Realty',
    slug: 'sobha-realty',
    tier: 'Tier 1',
    tierLabel: 'Highly Trusted',
    founded: '1976',
    projects: '40+',
    units: '20,000+',
    yield: '6–8%',
    paymentPlan: '60/40',
    tagline: 'The only developer in Dubai that manufactures its own building materials. End-to-end quality control.',
    description: 'Sobha is genuinely different. They control everything — from raw materials to finishing — which means quality is never compromised. Sobha Hartland and SeaHaven are two of the most respected luxury addresses in Dubai.',
    highlights: ['No third-party contractors — complete quality control', 'Ultra-luxury finishes as standard', 'Strong demand from Indian and Asian investors'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/a73fc8e63_generated_image.png',
    currentProjects: [
      { name: 'Sobha Hartland II', status: 'Selling', path: '/properties?developer=Sobha&community=Sobha+Hartland' },
      { name: 'Sobha SeaHaven', status: 'Selling', path: '/properties?developer=Sobha&community=Dubai+Harbour' },
      { name: 'Sobha One', status: 'Selling', path: '/properties?developer=Sobha&community=Sobha+One' },
      { name: 'Sobha Reserve', status: 'Upcoming', path: '/properties?developer=Sobha' },
    ],
  },
  {
    name: 'Nakheel',
    slug: 'nakheel',
    tier: 'Tier 1',
    tierLabel: 'Government-Backed',
    founded: '2000',
    projects: '50+',
    units: '60,000+',
    yield: '5–7%',
    paymentPlan: 'Varies by Project',
    tagline: 'They built Palm Jumeirah. The most iconic addresses in Dubai. Value that holds over decades.',
    description: 'Government-backed and globally recognised, Nakheel properties carry implicit credibility. Palm Jumeirah is the most famous piece of real estate in the world. Values here are some of the most resilient in the entire city.',
    highlights: ['Government-backed, institutionally credible', 'Palm Jumeirah — globally recognised address', 'Long-term capital appreciation track record'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/aebd9732b_generated_image.png',
    currentProjects: [
      { name: 'Palm Jumeirah Villas', status: 'Selling', path: '/properties?developer=Nakheel&community=Palm+Jumeirah' },
      { name: 'Dubai Islands', status: 'Selling', path: '/properties?developer=Nakheel&community=Dubai+Islands' },
      { name: 'Jumeirah Village Triangle', status: 'Selling', path: '/properties?developer=Nakheel&community=JVT' },
      { name: 'Palm Jebel Ali', status: 'Upcoming', path: '/properties?developer=Nakheel&community=Palm+Jebel+Ali' },
    ],
  },
  {
    name: 'Meraas',
    slug: 'meraas',
    tier: 'Tier 1',
    tierLabel: 'Government-Backed',
    founded: '2007',
    projects: '30+',
    units: '15,000+',
    yield: '5–7%',
    paymentPlan: 'Flexible',
    tagline: 'The developer behind Bluewaters Island, City Walk and La Mer. Lifestyle destinations that command premium pricing.',
    description: 'Meraas is the lifestyle developer for Dubai. They create destinations first and residences second — which is why City Walk, Bluewaters and La Mer attract consistent premium pricing. Owning here means owning in a place people actually want to be.',
    highlights: ['Government-backed lifestyle destinations', 'Consistently above-market resale premiums', 'Unmatched retail, F&B and entertainment integration'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/1208b92e1_generated_image.png',
    currentProjects: [
      { name: 'Bluewaters Residences', status: 'Selling', path: '/properties?developer=Meraas&community=Bluewaters+Island' },
      { name: 'City Walk Residences', status: 'Selling', path: '/properties?developer=Meraas&community=City+Walk' },
      { name: 'Port De La Mer', status: 'Selling', path: '/properties?developer=Meraas&community=La+Mer' },
      { name: 'The Beach JBR', status: 'Upcoming', path: '/properties?developer=Meraas' },
    ],
  },
  {
    name: 'Aldar Properties',
    slug: 'aldar-properties',
    tier: 'Tier 1',
    tierLabel: 'Highly Trusted',
    founded: '2004',
    projects: '60+',
    units: '30,000+',
    yield: '6–8%',
    paymentPlan: 'Post-Handover Available',
    tagline: 'Abu Dhabi\'s largest developer, now building actively in Dubai. RERA-backed with a DFM listing.',
    description: "Aldar is the most prominent developer moving into Dubai from Abu Dhabi, bringing institutional credibility and a strong track record. Their Dubai launches — particularly in Yas Island expansions and new Dubai masterplans — have sold out quickly.",
    highlights: ['Listed on Abu Dhabi Securities Exchange', 'Strong government and institutional backing', 'Expanding aggressively into Dubai market'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/cb0736ef1_generated_image.png',
    currentProjects: [
      { name: 'Aldar in Dubai Hills', status: 'Selling', path: '/properties?developer=Aldar&community=Dubai+Hills' },
      { name: 'Aldar Verdes', status: 'Selling', path: '/properties?developer=Aldar' },
      { name: 'Saadiyat Reserve', status: 'Upcoming', path: '/properties?developer=Aldar' },
    ],
  },
  {
    name: 'Ellington Properties',
    slug: 'ellington-properties',
    tier: 'Tier 2',
    tierLabel: 'Established',
    founded: '2014',
    projects: '20+',
    units: '5,000+',
    yield: '7–9%',
    paymentPlan: '60/40',
    tagline: 'Award-winning boutique developer. Beautifully designed buildings with consistent resale premiums.',
    description: 'Ellington makes beautiful buildings. If you are buying in MBR City or JVC and want something that feels designed rather than just built, Ellington is the developer you want. Their resale premiums consistently outperform the wider market.',
    highlights: ['Award-winning architecture in every project', 'Premium finishes at accessible price points', 'Boutique resale premiums in the secondary market'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/cca3474ab_generated_image.png',
    currentProjects: [
      { name: 'Crestmark', status: 'Selling', path: '/properties?developer=Ellington&community=Business+Bay' },
      { name: 'The Highbury', status: 'Selling', path: '/properties?developer=Ellington&community=MBR+City' },
      { name: 'Ellington Ocean House', status: 'Selling', path: '/properties?developer=Ellington&community=Palm+Jumeirah' },
      { name: 'Burlington Residences', status: 'Upcoming', path: '/properties?developer=Ellington' },
    ],
  },
  {
    name: 'Binghatti Developers',
    slug: 'binghatti-developers',
    tier: 'Tier 2',
    tierLabel: 'Established',
    founded: '2013',
    projects: '50+',
    units: '18,000+',
    yield: '7–10%',
    paymentPlan: '50/50 to 70/30',
    tagline: 'Known for striking architecture and high yields. Binghatti Bugatti is the most expensive apartment in Dubai history.',
    description: "Binghatti has built a name with distinctive architecture and strong yield performance. Their properties in Business Bay and Dubai Silicon Oasis attract investors looking for above-average returns. The Bugatti Residences placed them firmly on the global luxury map.",
    highlights: ['Above-market yields in key investment corridors', 'Distinctive architecture with strong brand recognition', 'Bugatti, Mercedes-Benz branded residences'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/d4ab73d21_generated_image.png',
    currentProjects: [
      { name: 'Binghatti Nova', status: 'Selling', path: '/properties?developer=Binghatti&community=JVC' },
      { name: 'Binghatti Skyrise', status: 'Selling', path: '/properties?developer=Binghatti&community=Business+Bay' },
      { name: 'Mercedes-Benz Places', status: 'Selling', path: '/properties?developer=Binghatti&community=Downtown+Dubai' },
      { name: 'Bugatti Residences', status: 'Selling', path: '/properties?developer=Binghatti&community=Business+Bay' },
    ],
  },
  {
    name: 'Danube Properties',
    slug: 'danube-properties',
    tier: 'Tier 2',
    tierLabel: 'Established',
    founded: '2014',
    projects: '25+',
    units: '10,000+',
    yield: '7–9%',
    paymentPlan: '1% Monthly',
    tagline: 'The best payment plans in the market. 1% per month makes entry accessible for first-time investors.',
    description: "Danube is one of the most investor-friendly developers in Dubai. Their 1% monthly payment plan has made Dubai property accessible to a much wider pool of buyers, and they consistently deliver on time. Strong yields across JVC, Arjan and Al Furjan.",
    highlights: ['Market-leading 1% monthly payment plans', 'Consistent on-time delivery track record', 'Ideal for first-time Dubai investors'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/991b34008_generated_image.png',
    currentProjects: [
      { name: 'Fashionz by Danube', status: 'Selling', path: '/properties?developer=Danube&community=JVC' },
      { name: 'Pearlz by Danube', status: 'Selling', path: '/properties?developer=Danube&community=Al+Furjan' },
      { name: 'Skyz by Danube', status: 'Selling', path: '/properties?developer=Danube&community=Arjan' },
      { name: 'Bayz 102', status: 'Upcoming', path: '/properties?developer=Danube&community=Business+Bay' },
    ],
  },
  {
    name: 'Select Group',
    slug: 'select-group',
    tier: 'Tier 2',
    tierLabel: 'Established',
    founded: '2002',
    projects: '15+',
    units: '8,000+',
    yield: '6–8%',
    paymentPlan: '60/40',
    tagline: 'One of Dubai Marina\'s most prolific developers. Six Senses Residences is their crown jewel.',
    description: "Select Group has defined large parts of Dubai Marina's skyline. They are responsible for some of the most desirable mid-to-luxury residential buildings along the waterfront. Their Six Senses Residences on Palm Jumeirah is one of the most anticipated launches in recent memory.",
    highlights: ['Strong track record in Dubai Marina and waterfront', 'Six Senses wellness residences — a market first', 'Consistent delivery with premium tenant demand'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/791cb31c7_generated_image.png',
    currentProjects: [
      { name: 'Six Senses Residences Palm', status: 'Selling', path: '/properties?developer=Select+Group&community=Palm+Jumeirah' },
      { name: 'The Edge', status: 'Selling', path: '/properties?developer=Select+Group&community=Business+Bay' },
      { name: 'Marina Gate', status: 'Selling', path: '/properties?developer=Select+Group&community=Dubai+Marina' },
    ],
  },
];

const tierColors = {
  'Tier 1': { badge: 'bg-white text-gray-700 border border-gray-200', dot: 'bg-gray-700' },
  'Tier 2': { badge: 'bg-gray-100 text-gray-500 border border-gray-200', dot: 'bg-gray-400' },
};

const statusColors = {
  'Selling': 'bg-gray-100 text-gray-700',
  'Upcoming': 'bg-gray-50 text-gray-500',
};

export default function Developers() {
  usePageSEO({
    title: 'Top Dubai Property Developers | RE/MAX Zam',
    description: 'Explore projects from Dubai\'s leading developers. RE/MAX Zam connects investors directly with trusted developers and the latest launches.',
    canonical: 'https://remaxzam.ae/developers',
  });

  const [searchParams] = useSearchParams();
  const highlightedDeveloper = searchParams.get('developer');

  useEffect(() => {
    if (highlightedDeveloper) {
      setTimeout(() => {
        const element = document.getElementById(`developer-${highlightedDeveloper.toLowerCase().replace(/\s+/g, '-')}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightedDeveloper]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Developer Intelligence</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Top 10 Dubai Developer Profiles</h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            Who built your property matters more than most people realise. Here are the developers we trust, their projects currently selling, and what you can expect from each one.
          </p>
        </div>
      </section>

      {/* DEVELOPER LIST */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          {DEVELOPERS.map((dev, i) => (
            <motion.div
              id={`developer-${dev.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={dev.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all ${
                highlightedDeveloper && dev.name.toLowerCase().includes(highlightedDeveloper.toLowerCase())
                  ? 'border-black shadow-lg ring-2 ring-gray-100'
                  : 'border-gray-100'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">

                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[180px] overflow-hidden">
                  <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-heading font-bold px-2.5 py-1 rounded-full mb-2 ${tierColors[dev.tier].badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tierColors[dev.tier].dot}`} />
                      {dev.tier} — {dev.tierLabel}
                    </span>
                    <p className="text-white font-display font-black text-xl leading-tight">{dev.name}</p>
                    <p className="text-white/60 font-body text-xs mt-1">Est. {dev.founded}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <p className="text-gray-800 font-heading font-bold text-sm mb-2 leading-snug">{dev.tagline}</p>
                  <p className="text-gray-500 font-body text-xs leading-relaxed mb-5">{dev.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'Projects', value: dev.projects },
                      { label: 'Units Delivered', value: dev.units },
                      { label: 'Avg Yield', value: dev.yield },
                      { label: 'Payment Plan', value: dev.paymentPlan },
                    ].map(s => (
                      <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="font-display font-black text-[#C9A84C] text-sm leading-tight">{s.value}</p>
                        <p className="text-gray-400 font-body text-[9px] uppercase tracking-wider mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-[#C9A84C] font-heading font-bold text-[10px] uppercase tracking-widest">Current &amp; Upcoming Projects</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dev.currentProjects.map(proj => (
                        <Link
                          key={proj.name}
                          to={proj.path}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all hover:shadow-sm hover:scale-[1.02] ${statusColors[proj.status]}`}
                        >
                          {proj.name}
                          <span className="text-[9px] font-body opacity-70">· {proj.status}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Highlights + CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {dev.highlights.map(h => (
                        <li key={h} className="flex items-center gap-1.5 text-[11px] text-gray-500 font-body">
                          <CheckCircle2 className="w-3 h-3 text-[#C9A84C] shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={`/developers/${dev.slug}`}
                        className="inline-flex items-center gap-1.5 border border-black text-black hover:bg-black hover:text-white font-heading font-bold text-xs px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                      >
                        Profile <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/properties?developer=${encodeURIComponent(dev.name.split(' ')[0])}`}
                        className="inline-flex items-center gap-1.5 border border-[#C9A84C] hover:border-black hover:text-black text-[#C9A84C] font-heading font-bold text-xs px-4 py-2 rounded-xl transition-colors whitespace-nowrap"
                      >
                        Listings <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 mb-4">
              Not Sure Which Developer to Go With?
            </h2>
            <p className="text-gray-500 font-body text-sm mb-8 leading-relaxed max-w-xl mx-auto">
              Our advisors work directly with every developer on this page. Tell us your budget and goals and we will match you to the right project within 24 hours.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-heading font-bold text-sm px-8 py-4 rounded-xl transition-colors">
              Speak to an Advisor <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}