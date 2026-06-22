import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Shield, Globe, Award, DollarSign, Clock, BarChart3, Star } from 'lucide-react';
import usePageSEO from '@/lib/usePageSEO';
import SellerLeadForm from '../components/SellerLeadForm';

const reasons = [
  {
    icon: Globe,
    title: 'Global Investor Network',
    description: 'Access to over 10,000+ qualified international investors actively looking to buy or rent in Dubai. Your property gets seen by serious buyers from 40+ countries.',
  },
  {
    icon: TrendingUp,
    title: 'Maximum Market Exposure',
    description: 'Your listing is promoted across premium portals, social media channels, email campaigns, and our high-traffic website — driving more enquiries faster.',
  },
  {
    icon: Users,
    title: 'Dedicated Agent Support',
    description: 'A personal property consultant handles everything — viewings, negotiations, paperwork — so you never have to worry about the process.',
  },
  {
    icon: Shield,
    title: 'Vetted Tenants & Buyers',
    description: 'We pre-qualify all prospective tenants and buyers, verifying finances and intent before any viewing, protecting your time and investment.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Commission Rates',
    description: 'Transparent, market-competitive fees with no hidden charges. Our success-based model means we only get paid when you do.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Pricing Strategy',
    description: 'We provide a free market valuation backed by real transaction data, ensuring your property is priced to attract the best offers quickly.',
  },
  {
    icon: Clock,
    title: 'Fast Transaction Times',
    description: 'Our streamlined process and in-house legal support means faster sales and rentals — typically completing transactions 30% faster than the market average.',
  },
  {
    icon: Award,
    title: 'RERA-Licensed Brokerage',
    description: 'Fully licensed and regulated by RERA and DLD. Your property is managed with full legal compliance, giving you complete peace of mind.',
  },
];

const stats = [
  { value: '2,500+', label: 'Properties Listed' },
  { value: '94%', label: 'Listing-to-Sale Rate' },
  { value: '45 Days', label: 'Avg. Time to Sell' },
  { value: 'AED 4.2B+', label: 'Transaction Volume' },
];

const testimonials = [
  {
    name: 'Ahmed Al Rashidi',
    property: 'Villa, Palm Jumeirah',
    quote: 'RE/MAX Zam sold my villa in just 3 weeks at above asking price. The exposure they generated was incredible — I had 12 serious enquiries in the first 5 days.',
  },
  {
    name: 'Sarah Mitchell',
    property: 'Apartment, Downtown Dubai',
    quote: 'As an overseas investor, I needed a trustworthy team. They managed the entire sale remotely, kept me updated at every step, and achieved a great result.',
  },
  {
    name: 'Rajesh Patel',
    property: 'Penthouse, Business Bay',
    quote: 'Professional, fast, and honest. They gave me a realistic valuation and delivered on their promises. My portfolio management is now entirely with them.',
  },
];

const steps = [
  { step: '01', title: 'Free Valuation', description: 'We assess your property with current market data and provide a competitive price recommendation.' },
  { step: '02', title: 'Professional Listing', description: 'Our team handles photography, floor plans, and crafts a compelling listing across all platforms.' },
  { step: '03', title: 'Active Marketing', description: 'Your property is promoted to our investor network, portals, and social media channels immediately.' },
  { step: '04', title: 'Viewings & Offers', description: 'We manage all enquiries, schedule viewings, and present qualified offers to you.' },
  { step: '05', title: 'Close the Deal', description: 'Our in-house team handles contracts, DLD registration, and NOC — seamlessly to completion.' },
];

export default function Landlords() {
  usePageSEO({
    title: 'Sell or Lease Your Dubai Property | RE/MAX Zam',
    description: 'List your Dubai property with RE/MAX Zam and reach qualified local and international buyers through the RE/MAX global network.',
    canonical: 'https://remaxzam.ae/landlords',
  });

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/50 font-body text-xs tracking-[0.2em] uppercase mb-4">For Landlords &amp; Sellers</p>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Sell or Rent Your Dubai<br />Property with Confidence
            </h1>
            <p className="text-white/70 font-body text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of landlords who trust RE/MAX Zam to market their properties to a global audience and achieve the best possible results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#list-with-us" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-heading font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors">
                List Your Property
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white font-heading font-bold text-sm rounded-xl hover:bg-white/10 transition-colors">
                Get Free Valuation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-black py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}>
              <p className="font-display text-3xl md:text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-white/40 font-body text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY LIST WITH US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight max-w-xl">
              Why Landlords Choose<br />RE/MAX Zam
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
            {reasons.map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white p-8 group hover:bg-black transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-900 group-hover:bg-white/10 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-heading font-bold tracking-tight text-gray-900 group-hover:text-white mb-2 transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 font-body leading-relaxed transition-colors">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Simple. Transparent. Effective.</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight">How It Works</h2>
          </motion.div>
          <div className="space-y-4">
            {steps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-6 items-start bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="font-display font-black text-white text-sm">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg mb-1">{s.title}</h3>
                  <p className="text-gray-500 font-body text-sm leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Seller Stories</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900">What Our Landlords Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 mb-5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-gray-300 text-gray-300" />)}
                  </div>
                  <p className="text-gray-700 font-body text-sm leading-relaxed mb-6">"{t.quote}"</p>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-heading font-bold tracking-tight text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400 font-body">{t.property}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / LEAD FORM ── */}
      <div className="bg-white px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 box-border">
        <section id="list-with-us" className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl py-16 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/landscape.png')" }} />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }} className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                  Ready to List<br className="hidden sm:block" />
                  Your Property?
                </h2>
                <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                  Get a free, no-obligation market valuation and find out how much your property could achieve today.
                </p>
                <ul className="space-y-5">
                  {[
                    'Free market valuation within 24 hours',
                    'No upfront fees — success-based commission',
                    'Full marketing campaign included',
                    'Dedicated agent from listing to completion',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm sm:text-base text-white/90 font-body font-medium">
                      <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-[10px] shrink-0 mt-0.5">✓</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }} className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white mb-2">Get Your Free Valuation</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-body mb-8">Fill in your details and we'll be in touch within 24 hours.</p>
                  <SellerLeadForm source="Landlords Page" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
