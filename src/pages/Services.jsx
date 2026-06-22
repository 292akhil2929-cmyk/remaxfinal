import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Globe, Home, FileText, Users, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import usePageSEO from '@/lib/usePageSEO';

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

export default function Services() {
  usePageSEO({
    title: 'Our Services | Buy, Sell, Invest & Golden Visa | RE/MAX Zam Dubai',
    description: 'From property acquisition to portfolio management and Golden Visa advisory — RE/MAX Zam provides end-to-end real estate services in Dubai.',
    canonical: 'https://remaxzam.ae/services',
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-card/50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-semibold text-primary tracking-widest mb-3 uppercase">What We Do</p>
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">Our Investment Services</h1>
          <p className="text-base text-muted-foreground font-body max-w-2xl leading-relaxed">
            From first-time off-plan purchases to multi-asset portfolio management — RE/MAX Zam provides the full spectrum of Dubai real estate investment services under one roof.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((s, i) => (
              <div key={s.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs font-heading font-semibold text-accent tracking-widest mb-2 uppercase">{s.tagline}</p>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">{s.title}</h2>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{s.desc}</p>
                  <Button className="font-heading font-bold" asChild>
                    <Link to={s.link}>{s.cta} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
                <div className={`bg-card border border-border/50 rounded-lg p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="font-heading font-semibold text-foreground mb-4 text-sm">What's Included</h4>
                  <ul className="space-y-3">
                    {s.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
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
      <section className="py-14 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Not Sure Which Service You Need?</h2>
          <p className="text-white/75 font-body mb-7 text-sm">Book a free consultation and one of our advisors will create a personalised investment plan for your goals and budget.</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-heading font-bold border-0" asChild>
            <Link to="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}