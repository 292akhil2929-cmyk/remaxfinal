import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Award, Globe, Users, TrendingUp, ArrowRight, Phone, Mail, MessageCircle, Building2, Home, Landmark, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { trackLeadEvent } from '@/lib/analytics';
import usePageSEO from '@/lib/usePageSEO';

const FALLBACK = 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/12/man.jpg';

const services = [
  {
    icon: Building2,
    title: 'Off-Plan Investment Advisory',
    tagline: 'First-access to the best launches before they hit the market',
    desc: 'We maintain direct relationships with every major Dubai developer — EMAAR, DAMAC, Nakheel, Sobha, Aldar, and more. Our clients receive priority access to off-plan launches before public release, with exclusive payment plan structures and early-bird pricing.',
    features: [
      'Developer-direct relationships across all tier-1 and tier-2 projects',
      'Access to pre-launch pricing and exclusive investor payment plans',
      'Full due diligence on developer track record and project delivery',
      'Detailed ROI projections and exit strategy planning',
    ],
    link: '/off-plan',
    cta: 'Explore Off-Plan Projects',
  },
  {
    icon: Home,
    title: 'Ready Property Acquisition',
    tagline: 'Immediate rental income from day one of ownership',
    desc: 'For investors seeking immediate yield, our ready property division sources tenanted and vacant units across Dubai\'s highest-demand rental communities. We negotiate on your behalf and manage the full transfer process through Dubai Land Department.',
    features: [
      'Sourcing from MLS, off-market, and distressed sale databases',
      'Independent valuation and price benchmarking',
      'Full DLD transfer management and title deed issuance',
      'Tenant introduction and property management referrals',
    ],
    link: '/properties',
    cta: 'View Ready Properties',
  },
  {
    icon: Landmark,
    title: 'Golden Visa Facilitation',
    tagline: 'UAE 10-year residency through property investment',
    desc: 'Our dedicated Golden Visa team handles the entire UAE residency application process for qualifying investors — from property selection through to Emirates ID issuance. We have processed over 300 successful Golden Visa applications.',
    features: [
      'Qualifying property identification and acquisition',
      'Complete visa application and government liaison',
      'Family sponsorship processing (spouse, children, helpers)',
      'Emirates ID and medical clearance coordination',
    ],
    link: '/golden-visa',
    cta: 'Learn About Golden Visa',
  },
  {
    icon: TrendingUp,
    title: 'Portfolio Strategy & ROI Optimisation',
    tagline: 'Build a multi-asset portfolio designed for maximum returns',
    desc: 'For investors holding or building a portfolio of 3+ properties, our investment strategy team creates a customised asset allocation plan — balancing yield, capital appreciation, and liquidity across different communities, property types, and hold periods.',
    features: [
      'Full portfolio analysis and performance benchmarking',
      'Asset diversification strategy across communities and types',
      'Refinancing and equity release advisory',
      'Exit strategy planning and resale market timing',
    ],
    link: '/contact',
    cta: 'Book Strategy Session',
  },
  {
    icon: Globe,
    title: 'International Investor Relocation',
    tagline: 'Everything you need to move to Dubai — from one team',
    desc: 'For clients relocating to Dubai, we provide an end-to-end concierge service: property acquisition, school selection guidance, banking setup referrals, and connections to our network of legal, tax, and wealth management professionals across the UAE.',
    features: [
      'Property search aligned with school catchment areas',
      'Bank account opening introductions (ADCB, Emirates NBD, Mashreq)',
      'Legal will and estate planning referrals',
      'Corporate residency and free zone company setup connections',
    ],
    link: '/contact',
    cta: 'Discuss Your Move',
  },
  {
    icon: Users,
    title: 'Agent & Broker Partnership Programme',
    tagline: 'Partner with Dubai\'s leading investment brokerage',
    desc: 'International agents and brokers can refer their clients to RE/MAX Zam for Dubai real estate transactions. We offer competitive co-brokerage fees, full client management, and dedicated support — allowing you to offer Dubai as an investment destination without needing a UAE presence.',
    features: [
      'Competitive referral and co-brokerage commission structure',
      'Dedicated client management from enquiry to handover',
      'White-label marketing materials and investment reports',
      'Ongoing client portfolio reporting and after-sale support',
    ],
    link: '/join',
    cta: 'Become a Partner',
  },
];

export default function AboutUs() {
  usePageSEO({
    title: 'About RE/MAX Zam | Dubai Real Estate Advisors',
    description: "RE/MAX Zam combines RE/MAX's global network with senior Dubai property advisors. Learn how we help investors buy with confidence.",
    canonical: 'https://remaxzam.ae/about',
  });

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => base44.entities.Agent.list('sort_order'),
    select: (data) => Array.isArray(data) ? data : [],
  });

  const activeAgents = agents.filter((a) => a.active !== false);
  const ceo = activeAgents[0];
  const rest = activeAgents.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Our Profile</p>
            <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4 max-w-2xl">
              Dubai Real Estate Advisory, Built on Data &amp; Trust
            </h1>
            <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
              RE/MAX Zam takes a consultative, data-backed approach to real estate — acting as true advisors to investors and sellers, while building a clear growth pathway for our agents.
            </p>
            <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0" asChild>
              <Link to="/contact">Talk to Our Team <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=900&q=80&auto=format&fit=crop"
              alt="Burj Al Arab Dubai — RE/MAX Zam"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white text-xs font-heading font-bold">Dubai, UAE</p>
              <p className="text-[#C9A84C] text-[10px] font-body">Trusted advisors since 2010</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest mb-3 uppercase">Our Mission</p>
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-5">Built on Integrity, Driven by Data, Focused on Your Returns</h2>
              <p className="text-sm text-gray-500 font-body leading-relaxed mb-4">
                RE/MAX Zam was founded with one goal: to bring institutional-grade investment thinking to individual property buyers. Too many international investors enter the Dubai market without access to real data, independent analysis, or advisors who prioritise their interests over commission.
              </p>
              <p className="text-sm text-gray-500 font-body leading-relaxed mb-4">
                We changed that. Our team of licensed RERA advisors, investment analysts, and Golden Visa specialists works exclusively on the client side — meaning we help you identify the best opportunities across all developers and communities, not just the ones with the highest referral fees.
              </p>
              <p className="text-sm text-gray-500 font-body leading-relaxed">
                Whether you are a first-time buyer investing AED 500K or a seasoned portfolio investor deploying AED 50M+, our process is the same: understand your goals, analyse the market, and deliver a clear investment strategy backed by real numbers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
              { icon: Award, title: 'RERA Licensed', desc: 'Fully licensed by the Dubai Land Department and Real Estate Regulatory Agency' },
              { icon: Globe, title: 'Global Reach', desc: 'Serving investors from 40+ countries across 6 continents' },
              { icon: Users, title: 'Expert Team', desc: 'Multilingual team of 20+ advisors speaking 12 languages' },
              { icon: TrendingUp, title: 'Track Record', desc: 'Over AED 2 billion in successfully closed transactions since 2010' }].
              map(({ icon: Icon, title, desc }) =>
              <div key={title} className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-lg p-5">
                  <Icon className="w-6 h-6 text-[#C9A84C] mb-3" />
                  <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">{title}</h4>
                  <p className="text-xs text-gray-500 font-body leading-relaxed">{desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest mb-3 uppercase">The Team</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Meet Your Investment Advisors</h2>
            <p className="text-sm text-gray-500 font-body max-w-lg mx-auto">A specialist team built on deep Dubai market knowledge, multilingual capability, and a client-first approach.</p>
          </div>

          {isLoading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />)}
            </div> :

          <>
              {ceo &&
            <div className="mb-8">
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row">
                    <img
                  src={ceo.photo || FALLBACK}
                  alt={ceo.name}
                  className="w-full md:w-72 h-64 md:h-auto object-cover object-top shrink-0"
                  onError={(e) => {e.target.src = FALLBACK;}} />

                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-heading font-bold text-gray-900 text-2xl mb-1">{ceo.name}</h3>
                      <p className="text-sm font-heading font-bold text-gray-700 mb-4">{ceo.role}</p>
                      <p className="text-sm text-gray-500 font-body leading-relaxed mb-6 max-w-xl">{ceo.about}</p>
                      <div className="flex gap-3 flex-wrap">
                        {ceo.phone &&
                    <a href={`tel:${ceo.phone}`} onClick={() => trackLeadEvent('phone', { source: 'AboutUs' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <Phone className="w-4 h-4" /> Call
                          </a>
                    }
                        {ceo.whatsapp &&
                    <a href={`https://wa.me/${ceo.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent('whatsapp', { source: 'AboutUs' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                          </a>
                    }
                        {ceo.email &&
                    <a href={`mailto:${ceo.email}`} onClick={() => trackLeadEvent('email', { source: 'AboutUs' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <Mail className="w-4 h-4" /> Email
                          </a>
                    }
                      </div>
                    </div>
                  </div>
                </div>
            }

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((m) =>
              <div key={m.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
                    <img
                  src={m.photo || FALLBACK}
                  alt={m.name}
                  className="w-full h-52 object-cover object-top"
                  onError={(e) => {e.target.src = FALLBACK;}} />

                    <div className="p-5">
                      <h3 className="font-heading font-bold text-gray-900 mb-0.5">{m.name}</h3>
                      <p className="text-xs font-heading font-bold text-gray-700 mb-2">{m.role}</p>
                      <p className="text-xs text-gray-500 font-body leading-relaxed mb-4">{m.about}</p>
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                        {m.phone &&
                    <a href={`tel:${m.phone}`} onClick={() => trackLeadEvent('phone', { source: 'AboutUs' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <Phone className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">Call</span>
                          </a>
                    }
                        {m.whatsapp &&
                    <a href={`https://wa.me/${m.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent('whatsapp', { source: 'AboutUs' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <MessageCircle className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">WhatsApp</span>
                          </a>
                    }
                        {m.email &&
                    <a href={`mailto:${m.email}`} onClick={() => trackLeadEvent('email', { source: 'AboutUs' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <Mail className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">Email</span>
                          </a>
                    }
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </>
          }

          <div className="text-center mt-8">
            <Link to="/team" className="inline-flex items-center gap-2 text-sm font-heading font-bold text-gray-900 hover:text-black transition-colors">
              View Full Team Page <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest mb-3 uppercase">What We Do</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Our Investment Services</h2>
            <p className="text-sm text-gray-500 font-body max-w-lg mx-auto">
              From first-time off-plan purchases to multi-asset portfolio management — RE/MAX Zam provides the full spectrum of Dubai real estate investment services under one roof.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((s, i) => (
              <div key={s.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#C9A84C]/10 mb-4">
                    <s.icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <p className="text-xs font-heading font-bold text-gray-700 tracking-widest mb-2 uppercase">{s.tagline}</p>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{s.title}</h3>
                  <p className="text-sm text-gray-500 font-body leading-relaxed mb-6">{s.desc}</p>
                  <Button className="font-heading font-bold bg-black hover:bg-gray-900 text-white border-0" asChild>
                    <Link to={s.link}>{s.cta} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className={`bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-lg p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="font-heading font-bold text-gray-900 mb-4 text-sm">What's Included</h4>
                  <ul className="space-y-3">
                    {s.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm font-body text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Ready to Work With Our Team?</h2>
          <p className="text-white/75 font-body mb-7 text-sm">Book a free 30-minute investment consultation with one of our senior advisors.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border border-white/30" asChild>
              <Link to="/contact">Book Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-heading" asChild>
              <Link to="/apply">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>);

}
