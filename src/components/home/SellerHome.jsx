import { motion } from 'framer-motion';
import { PhoneCall, ClipboardList, Search, BadgeCheck, Star } from 'lucide-react';
import SellerLeadForm from '@/components/SellerLeadForm';

const STEPS = [
  {
    icon: PhoneCall,
    step: '01',
    title: 'Free Property Valuation',
    desc: "We assess your property's market value using live DLD transaction data and comparable sales. No cost, no obligation.",
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
  {
    icon: ClipboardList,
    step: '02',
    title: 'Professional Marketing',
    desc: 'HD photography, staging advice, and your property live across 40+ portals with targeted social campaigns.',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  },
  {
    icon: Search,
    step: '03',
    title: 'Qualified Buyer Matching',
    desc: 'We pre-qualify every buyer. You only meet serious, finance-approved purchasers — no time wasted.',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80',
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Seamless Transaction',
    desc: 'From negotiation to NOC, DLD registration to keys handover — we manage every detail of the close.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    country: 'United Kingdom',
    text: 'Sold my Business Bay apartment 3 weeks after listing. The team handled absolutely everything — I just signed and received the funds.',
    result: 'Sold in 21 days',
  },
  {
    name: 'Ahmed K.',
    country: 'UAE',
    text: 'Got AED 180K above my original asking price. Their buyer network is real — serious offers came in within the first week.',
    result: '+AED 180K above ask',
  },
  {
    name: 'Priya R.',
    country: 'India',
    text: 'I needed a fast, clean sale before relocating. They delivered exactly that. Professional, transparent, and genuinely excellent.',
    result: 'Sold, stress-free',
  },
];

export default function SellerHome() {
  return (
    <>
      {/* ── HOW IT WORKS ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Simple. Transparent. Effective.</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight">
              How We Sell<br />Your Property
            </h2>
          </motion.div>

          <div className="space-y-6">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100`}
                >
                  {/* Image */}
                  <div className="lg:w-2/5 aspect-[16/9] lg:aspect-auto relative overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-5 left-5">
                      <span className="text-5xl font-display font-black text-white/20">{s.step}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900 mb-3">{s.title}</h3>
                    <p className="text-gray-500 font-body text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SELLER TESTIMONIALS ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Seller Stories</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900">What Sellers Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
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
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-700 font-body text-sm leading-relaxed mb-6">"{t.text}"</p>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-heading font-bold tracking-tight text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400 font-body">{t.country}</p>
                  </div>
                  <span className="text-xs font-heading font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">{t.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELLER CTA ── */}
      <div className="bg-white px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 box-border">
        <section id="seller-valuation" className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl py-16 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/landscape.png')" }} />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }} className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                  What Is Your<br className="hidden sm:block" />
                  <span className="text-amber-500">Property Worth?</span>
                </h2>
                <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                  Get an accurate, data-driven valuation backed by live DLD transaction records — and a clear pricing strategy to attract the best buyers.
                </p>
                <ul className="space-y-5">
                  {[
                    'Valuation based on recent comparable DLD transactions',
                    'Pricing strategy to attract premium, qualified buyers',
                    'Current buyer demand analysis for your specific area',
                    'Honest advice — no pressure, just expert guidance',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm sm:text-base text-white/90 font-body font-medium">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-[10px] shrink-0 mt-0.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">✓</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }} className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white mb-2">Request a Free Valuation</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-body mb-8">Our consultants respond within 24 hours.</p>
                  <SellerLeadForm source="Home - Seller" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}