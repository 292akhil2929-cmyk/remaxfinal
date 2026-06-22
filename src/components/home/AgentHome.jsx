import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, BadgeCheck, Zap, BookOpen, TrendingUp, Headphones, ArrowRight } from 'lucide-react';

const BENEFITS = [
  {
    icon: Globe,
    title: 'Global Referral Network',
    desc: '145,000+ RE/MAX agents across 110 countries. Inbound international referrals. Outbound global reach. Built-in deal flow from day one.',
  },
  {
    icon: BadgeCheck,
    title: 'RE/MAX Brand Power',
    desc: "The world's most recognised real estate brand. Your clients already trust the name before you say a word.",
  },
  {
    icon: Zap,
    title: 'Marketing & Lead Generation',
    desc: 'Listing campaigns, portal presence, social promotion and qualified leads — managed by our in-house marketing team.',
  },
  {
    icon: BookOpen,
    title: 'Training & Technology',
    desc: 'RE/MAX University access, CRM system, market data tools, and deal management platform — available from day one.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Commission Splits',
    desc: 'Industry-leading structure. The more you grow, the more you keep. Transparent tiers with no hidden fees.',
  },
  {
    icon: Headphones,
    title: 'Full Back-Office Support',
    desc: 'Legal, NOC, DLD registration, mortgage coordination — our admin team handles it so you can focus entirely on closing.',
  },
];

const TIERS = [
  {
    title: 'Associate',
    who: 'New to Dubai real estate',
    split: '50/50',
    color: 'bg-white border-gray-100',
    textColor: 'text-gray-900',
    subColor: 'text-gray-400',
    includes: ['Full RE/MAX training program', 'Brand & marketing support', 'CRM & leads access', 'Senior agent mentorship'],
  },
  {
    title: 'Senior Agent',
    who: '1+ year experience',
    split: '70/30',
    color: 'bg-black border-black',
    textColor: 'text-white',
    subColor: 'text-gray-400',
    highlight: true,
    includes: ['Priority lead allocation', 'Dedicated marketing budget', 'Direct developer relationships', 'Global referral network'],
  },
  {
    title: 'Team Leader',
    who: 'Building your own team',
    split: 'Custom',
    color: 'bg-white border-gray-100',
    textColor: 'text-gray-900',
    subColor: 'text-gray-400',
    includes: ['Own office branding', 'Team training & onboarding', 'Override commissions', 'Strategic partnership terms'],
  },
];

export default function AgentHome() {
  return (
    <>
      {/* ── BENEFITS GRID ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">What You Get</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight max-w-xl">
              Everything You Need<br />to Win in Dubai
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {BENEFITS.map(({ icon: Icon, title, desc }, idx) => (
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
                <p className="text-sm text-gray-500 group-hover:text-gray-400 font-body leading-relaxed transition-colors">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMISSION TIERS ── */}
      <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Clear Progression</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight">
              Partnership Tiers
            </h2>
            <p className="text-gray-500 font-body text-sm mt-2">The more you grow, the more you keep.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-8 border-2 relative overflow-hidden ${tier.color}`}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300" />
                )}
                {tier.highlight && (
                  <span className="inline-block text-xs font-heading font-bold bg-white text-black px-3 py-1 rounded-full mb-5">Most Popular</span>
                )}
                <h3 className={`text-lg font-display font-black tracking-tight mb-1 ${tier.textColor}`}>{tier.title}</h3>
                <p className={`text-xs font-body mb-6 ${tier.subColor}`}>{tier.who}</p>
                <div className={`text-4xl font-display font-black mb-1 ${tier.textColor}`}>{tier.split}</div>
                <p className={`text-xs font-body mb-7 ${tier.subColor}`}>Commission Split</p>
                <ul className="space-y-2.5">
                  {tier.includes.map(item => (
                    <li key={item} className={`flex items-start gap-2.5 text-xs font-body ${tier.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-white' : 'text-black'}`}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT CTA ── */}
      <div className="bg-white px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 box-border">
        <section id="agent-apply" className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl py-16 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/landscape.png')" }} />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }} className="max-w-xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                  Ready to Build Your<br className="hidden sm:block" />
                  <span className="text-amber-500">Career in Dubai?</span>
                </h2>
                <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                  Whether you're an experienced agent ready to scale, or brand new and hungry to start — we have a clear path, real support, and the brand to match.
                </p>
                <ul className="space-y-5">
                  {[
                    'RERA-licensed brokerage with full compliance support',
                    'No desk fees for qualifying associates',
                    'Direct access to exclusive off-plan developer inventory',
                    'Weekly deal-sharing sessions & ongoing training',
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
                  <h3 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white mb-2">Apply to Join Our Team</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-body mb-8">We'll be in touch within 48 hours.</p>
                  <Link to="/apply">
                    <button className="w-full bg-white text-black hover:bg-gray-100 font-heading font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                      Apply to Join <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}