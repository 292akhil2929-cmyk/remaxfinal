import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Shield, Globe, Users, TrendingUp, Star, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePageSEO from '@/lib/usePageSEO';

const STATS = [
  { value: '15+', label: 'Years in Dubai Real Estate', sub: 'Founded 2010' },
  { value: 'AED 2B+', label: 'Total Transactions Closed', sub: 'Verified by DLD' },
  { value: '40+', label: 'Countries Represented', sub: 'Truly global reach' },
  { value: '1,200+', label: 'Satisfied Investors', sub: 'And counting' },
];

const CREDENTIALS = [
  {
    icon: Award,
    title: 'RERA Licensed & DLD Registered',
    desc: 'RE/MAX ZAM is fully licensed by the Dubai Land Department (DLD) and the Real Estate Regulatory Agency (RERA). Every advisor holds an active RERA broker card — verifiable online at the DLD portal.',
    badge: 'License Verified',
  },
  {
    icon: Shield,
    title: 'RE/MAX Global Network',
    desc: "As a RE/MAX franchise, we operate under one of the world's most recognised real estate brands — 150,000+ agents across 110+ countries. Your Dubai investment is backed by a global institution with 50+ years of proven track record.",
    badge: 'Top 10 UAE Franchise',
  },
  {
    icon: Globe,
    title: 'Multilingual Team — 12 Languages',
    desc: 'Our 20+ advisors speak English, Arabic, Russian, Hindi, Urdu, French, Mandarin, and more. We serve international investors across 40+ countries without language barriers getting in the way.',
    badge: '12 Languages Spoken',
  },
  {
    icon: TrendingUp,
    title: 'Institutional-Grade Investment Analysis',
    desc: 'We provide full ROI modelling, rental yield projections, service charge breakdowns, and exit analysis before you commit to any purchase. Data-driven, not commission-driven.',
    badge: 'Full ROI Analysis',
  },
  {
    icon: Users,
    title: 'Golden Visa Advisory — End to End',
    desc: 'Our dedicated Golden Visa specialists have guided hundreds of investors from property selection through to Emirates ID issuance. We coordinate directly with ICP and DLD on your behalf.',
    badge: '500+ Visas Facilitated',
  },
  {
    icon: Star,
    title: 'Post-Sale Support & Property Management',
    desc: 'Our relationship does not end at handover. We offer tenancy management, rental collection, maintenance coordination, and resale advisory — a complete lifecycle service for your Dubai asset.',
    badge: 'Full Lifecycle Service',
  },
];

const AWARDS = [
  'Top 10 RE/MAX Franchise in the UAE — 2024',
  'Dubai Land Department Approved Broker',
  'RERA Registered — All Advisors Certified',
  'Property Finder Top Agency — 2023 & 2024',
  'Bayut Verified Agency — Gold Status',
];

const PROCESS = [
  { step: '01', title: 'Free Strategy Call', desc: 'Tell us your budget, goals, and timeline. Our senior advisor maps the right investment strategy — no jargon, no pressure.' },
  { step: '02', title: 'Curated Property Shortlist', desc: 'We analyse hundreds of listings and present 3–5 properties that genuinely match your brief, with full ROI modelling for each.' },
  { step: '03', title: 'Developer Negotiation', desc: 'As one of Dubai\'s top-performing RE/MAX franchises, we have direct relationships with every major developer — giving you access to best pricing and early launch allocations.' },
  { step: '04', title: 'Transaction Management', desc: 'We handle the paperwork, DLD registration, payment plan setup, and all coordination — from reservation to Title Deed in your name.' },
  { step: '05', title: 'Golden Visa & Beyond', desc: 'Eligible purchases come with full Golden Visa advisory at no extra cost. Post-handover, we manage your property and maximise your rental returns.' },
];

const TESTIMONIALS = [
  {
    name: 'Michael Chen',
    country: 'Singapore',
    flag: '🇸🇬',
    text: "RE/MAX ZAM found me a 2-bedroom in Business Bay that now generates 7.8% yield. The process was completely transparent and they handled everything from DLD registration to the Golden Visa application. Exceptional service.",
    property: 'Business Bay — 2BR Canal View',
    yield: '7.8% yield',
  },
  {
    name: 'Anna Petrov',
    country: 'Russia',
    flag: '🇷🇺',
    text: "I was worried about investing remotely, but the team made it easy. They gave me real data — not just sales pitches — and found me an off-plan unit in JVC that has already appreciated 22% before handover.",
    property: 'JVC — Off-Plan 1BR',
    yield: '22% capital gain',
  },
  {
    name: 'James & Sarah Mitchell',
    country: 'United Kingdom',
    flag: '🇬🇧',
    text: "We bought a villa in Dubai Hills Estate for our family relocation. RE/MAX ZAM guided us through the mortgage process, school choices, and even coordinated our Golden Visa. They genuinely care about getting it right.",
    property: 'Dubai Hills — 4BR Villa',
    yield: 'Golden Visa secured',
  },
  {
    name: 'Raj Mehta',
    country: 'India',
    flag: '🇮🇳',
    text: "Third property I have bought through RE/MAX ZAM. Every time, they show me the real numbers — service charges, net yields, exit strategy. No other agent in Dubai operates at this level of transparency.",
    property: 'Portfolio — 3 Properties',
    yield: 'AED 1.2M portfolio',
  },
];

export default function WhyREMAXZAM() {
  usePageSEO({
    title: "Why RE/MAX Zam | Dubai's Global-Backed Brokerage",
    description: 'Work with the RE/MAX global network in Dubai — international reach, senior advisors and end-to-end support. See why investors choose RE/MAX Zam.',
    canonical: 'https://remaxzam.ae/why-remax-zam',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Trust &amp; Credentials</p>
            <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Why Investors Choose RE/MAX ZAM Dubai</h1>
            <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
              <span className="text-[#C9A84C] font-bold">15 years</span>. <span className="text-[#C9A84C] font-bold">AED 2 billion</span> in transactions. <span className="text-[#C9A84C] font-bold">1,200+</span> investors across <span className="text-[#C9A84C] font-bold">40</span> countries. Here is exactly why international investors trust us with their most significant financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0" asChild>
                <Link to="/contact">Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-gray-50 font-heading" asChild>
                <Link to="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&q=80&auto=format&fit=crop"
              alt="Dubai Marina — RE/MAX ZAM"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white text-xs font-heading font-bold">Dubai Marina</p>
              <p className="text-[#C9A84C] text-[10px] font-body">Our primary investment corridor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 py-10 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="font-display font-black text-[#C9A84C] text-3xl sm:text-4xl">{s.value}</p>
              <p className="text-gray-700 font-body text-xs mt-1">{s.label}</p>
              <p className="text-gray-400 font-body text-[10px] uppercase tracking-wider mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">Why We're Different</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 leading-tight">
              What Sets RE/MAX ZAM Apart
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREDENTIALS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <span className="text-xs font-heading font-bold text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-1 rounded-full">{c.badge}</span>
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2 text-sm leading-snug">{c.title}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Accreditations */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-8">Awards & Accreditations</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            {AWARDS.map(a => (
              <div key={a} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
                <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span className="text-gray-700 font-body text-xs font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">How It Works</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              Our Investment Process
            </h2>
          </div>
          <div className="space-y-8">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center shrink-0">
                  <span className="font-display font-black text-black text-sm">{p.step}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-gray-500 font-body text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">Client Stories</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              What Our Investors Say
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 border-l-4 border-l-[#C9A84C] shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />)}
                </div>
                <p className="text-gray-600 font-body text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-sm">{t.flag} {t.name}</p>
                    <p className="text-gray-400 font-body text-xs">{t.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-body text-gray-500">{t.property}</p>
                    <p className="text-xs font-heading font-bold text-[#C9A84C]">{t.yield}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Phone className="w-8 h-8 text-gray-400 mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 mb-4">
            Ready to Invest With Confidence?
          </h2>
          <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
            Book a free 30-minute strategy call with one of our senior advisors. Real numbers, honest advice, no obligation.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0 px-10" asChild>
            <Link to="/contact">Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
