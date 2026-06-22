import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Shield, TrendingUp, Users, CheckCircle, Star, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const GLOBAL_STATS = [
  { value: '50+', label: 'Years of Global Leadership', sub: 'Founded Denver, USA — 1973' },
  { value: '#1', label: 'Real Estate Brand Worldwide', sub: 'Entrepreneur Franchise 500 — 42 consecutive years' },
  { value: '145,000+', label: 'Agents in 120+ Countries', sub: 'Largest global real estate network' },
  { value: '8,500+', label: 'Offices Worldwide', sub: 'On every inhabited continent' },
];

const WHY_REMAX_GLOBALLY = [
  {
    icon: Award,
    title: '#1 Real Estate Brand on Earth — 42 Years Running',
    desc: "RE/MAX has been ranked the world's number one real estate franchise by Entrepreneur Magazine for 42 consecutive years. This is not a marketing claim — it is an independently verified track record spanning five decades. When you transact through a RE/MAX agent, you are operating within the most scrutinised, regulated, and performance-tested real estate network ever built.",
  },
  {
    icon: Globe,
    title: 'A Brand That Buyers and Sellers Recognise Everywhere',
    desc: 'Whether your buyer comes from London, New York, Mumbai, Moscow, or Sydney — they know the RE/MAX balloon. Brand recognition matters in Dubai because 70%+ of property buyers are international. When they search for trusted real estate help in Dubai, a RE/MAX branded agent carries instant credibility that local-only brands simply cannot match.',
  },
  {
    icon: Shield,
    title: 'The Highest Ethical & Professional Standards',
    desc: "Every RE/MAX franchisee must meet rigorous performance, compliance, and ethics standards set by RE/MAX International. Agents who underperform or act improperly are removed. This network-wide accountability is why RE/MAX commands a trust premium globally — and why investors from established markets specifically seek RE/MAX agents when buying abroad.",
  },
  {
    icon: Users,
    title: '145,000 Agents Means Global Market Intelligence',
    desc: "When you work with RE/MAX Zam Dubai, you have access to the market intelligence of 145,000 agents operating across 120 countries. If a qualified buyer in Frankfurt, Singapore, or Toronto is looking for Dubai investment, the RE/MAX global referral network can connect them directly to your property — no other Dubai agency has that reach.",
  },
  {
    icon: TrendingUp,
    title: 'The Network Behind the Sale',
    desc: "RE/MAX agents globally closed more than 1 million transactions annually. That transaction volume creates pricing intelligence, negotiation leverage, and buyer network depth that no independent agency can replicate. In Dubai's competitive off-plan and luxury market, that network advantage translates directly into better deals for our clients.",
  },
  {
    icon: Building,
    title: 'Institutional-Grade Transaction Standards',
    desc: "RE/MAX International's global compliance framework means every RE/MAX transaction follows documented, audited processes. Title transfer, escrow handling, payment plan structuring — all done to international best-practice standards. For investors from mature markets (UK, USA, EU, Australia), this familiar rigour is a decisive factor.",
  },
];

const REMAX_UAE_ADVANTAGE = [
  {
    title: 'RE/MAX Zam vs Independent Dubai Agencies',
    points: [
      'RE/MAX brand trust recognised in 120+ countries vs local brand only known in UAE',
      'Global referral network of 145,000 agents vs isolated local network',
      '50+ years of performance data and compliance standards vs unverified track record',
      'International transaction processes familiar to UK/US/EU investors vs UAE-only practices',
      'RE/MAX marketing reach across 8,500+ offices vs local digital advertising only',
    ],
  },
];

const INVESTOR_PROFILES = [
  {
    flag: '🇬🇧',
    country: 'UK Investors',
    insight: "British buyers often start their Dubai search through agents they recognise from home. RE/MAX has over 1,000 offices in the UK — when a UK investor sees the RE/MAX name in Dubai, trust is instant. RE/MAX Zam Dubai is the team they should contact.",
  },
  {
    flag: '🇺🇸',
    country: 'US Investors',
    insight: "RE/MAX is an American brand, born in Denver in 1973. American investors inherently trust the RE/MAX system — the compliance standards, the agent accountability, the transaction rigour. RE/MAX Zam brings that same standard to the Dubai market.",
  },
  {
    flag: '🇮🇳',
    country: 'Indian & South Asian Investors',
    insight: "RE/MAX has hundreds of offices across India. Indian investors who have bought or sold through RE/MAX back home will seek the same brand trust when entering the Dubai market. We are their natural point of contact.",
  },
  {
    flag: '🇷🇺',
    country: 'Russian & CIS Investors',
    insight: "RE/MAX operates across Russia, Kazakhstan, Ukraine, and CIS markets. Investors from these regions who know RE/MAX globally will specifically seek a RE/MAX agent in Dubai for their investment. RE/MAX Zam Dubai has a dedicated Russian-speaking team.",
  },
  {
    flag: '🇩🇪',
    country: 'European Investors',
    insight: "RE/MAX is the dominant real estate brand across Germany, France, Spain, Portugal, and broader Europe. European investors entering Dubai trust the RE/MAX compliance and professional standards from experience. We serve them in their language and with their expectations.",
  },
  {
    flag: '🇸🇬',
    country: 'Singapore & Asian Investors',
    insight: "Sophisticated Asian investors — particularly from Singapore, Hong Kong, and Malaysia — treat brand reputation as a primary filter when selecting a real estate advisor. RE/MAX's global profile gives RE/MAX Zam immediate credibility with this high-value segment.",
  },
];

const FAQS = [
  {
    q: 'Is RE/MAX Zam the official RE/MAX franchise in Dubai?',
    a: "RE/MAX Zam is a licensed RE/MAX franchise operating in Dubai, UAE. We operate under the RE/MAX International franchise agreement, meeting all global standards for agent training, compliance, and professional conduct. Our agents are RERA licensed and DLD registered.",
  },
  {
    q: "How does the RE/MAX global network benefit my Dubai investment?",
    a: "When you buy through RE/MAX Zam, you benefit from our connection to 145,000 RE/MAX agents globally. This means international buyers for your property when you exit, cross-border referrals, and access to a global market intelligence network that no Dubai-only agency can match.",
  },
  {
    q: 'Why choose RE/MAX over other Dubai real estate agencies?',
    a: "The RE/MAX brand carries 50+ years of global trust and #1 franchise rankings for 42 consecutive years. For international investors — particularly from the UK, USA, Europe, and Asia — the RE/MAX name signals professional standards, ethical conduct, and transaction rigour they are already familiar with from their home markets.",
  },
  {
    q: "Can RE/MAX Zam handle my transaction remotely?",
    a: "Yes. We have guided investors from 40+ countries through complete Dubai property transactions remotely — from property selection and ROI analysis through to DLD registration and Golden Visa facilitation. Our process is designed for international buyers who cannot be on the ground in Dubai.",
  },
  {
    q: 'What types of properties does RE/MAX Zam specialise in?',
    a: "We cover the full Dubai market — off-plan investments, ready apartments and villas, luxury and ultra-premium properties, commercial real estate, and Golden Visa-qualifying investments from AED 2M+. We work with all major developers including EMAAR, DAMAC, Nakheel, and Sobha.",
  },
  {
    q: 'Is Dubai property investment safe for international buyers?',
    a: "Dubai operates under one of the world's most investor-friendly regulatory frameworks. The Real Estate Regulatory Agency (RERA) and Dubai Land Department (DLD) enforce strict escrow laws, developer regulations, and buyer protections. As a RE/MAX franchise, we operate to international compliance standards on top of DLD requirements — giving our clients maximum protection.",
  },
];

export default function RemaxDubai() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">The World's #1 Real Estate Brand — Now in Dubai</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">RE/MAX Dubai — Buy With the Brand the World Trusts</h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            RE/MAX has been the world's #1 real estate brand for <span className="text-[#C9A84C] font-bold">50+ years</span>. <span className="text-[#C9A84C] font-bold">145,000</span> agents. <span className="text-[#C9A84C] font-bold">120</span> countries. <span className="text-[#C9A84C] font-bold">8,500+</span> offices. And in Dubai — one trusted franchise you should know: RE/MAX Zam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0" asChild>
              <Link to="/contact">Talk to RE/MAX Zam Dubai <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-gray-50 font-heading" asChild>
              <Link to="/properties">Browse Dubai Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Global Brand Stats */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {GLOBAL_STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <p className="font-display font-black text-[#C9A84C] text-3xl sm:text-4xl">{s.value}</p>
              <p className="text-gray-700 font-body text-xs mt-1.5 leading-snug">{s.label}</p>
              <p className="text-gray-400 font-body text-[10px] uppercase tracking-wider mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-4">The RE/MAX Story</p>
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl leading-tight mb-6">
                50 Years of Being the World's Most Trusted Name in Real Estate
              </h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                RE/MAX was founded in Denver, Colorado in 1973 by Dave and Gail Liniger on a simple idea: attract the most productive agents, give them the best tools, and hold them to the highest standards. The result was the fastest-growing real estate franchise in history.
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                Today, RE/MAX is ranked the #1 real estate franchise brand globally by Entrepreneur Magazine — a distinction it has held for 42 consecutive years. No other real estate company comes close to that track record.
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                When that brand comes to Dubai — through RE/MAX Zam — international investors gain access to world-class real estate advisory standards backed by the most recognised name in the industry.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  '#1 Real Estate Franchise — Entrepreneur Magazine, 42 years',
                  'Over 1 million transactions closed annually worldwide',
                  'Operating across North America, Europe, Asia, Middle East & Africa',
                  'RE/MAX.com — one of the world\'s most visited property websites',
                ].map(fact => (
                  <div key={fact} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <p className="text-gray-600 font-body text-sm">{fact}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
              {[
                { year: '1973', event: 'RE/MAX founded in Denver, Colorado, USA' },
                { year: '1978', event: 'First international expansion — Canada' },
                { year: '1994', event: 'Entered European markets across 15 countries' },
                { year: '2000', event: 'Surpassed 50,000 agents globally' },
                { year: '2010', event: 'RE/MAX Zam founded in Dubai, UAE' },
                { year: '2015', event: 'RE/MAX reaches 100,000 agents across 100 countries' },
                { year: '2022', event: 'RE/MAX expands to 120+ countries, 145,000+ agents' },
                { year: '2024', event: 'RE/MAX Zam named Top 10 Franchise in the UAE' },
              ].map((m, i) => (
                <div key={m.year} className="flex gap-4 items-start">
                  <div className="w-12 shrink-0 text-right">
                    <span className="text-xs font-heading font-bold text-gray-900">{m.year}</span>
                  </div>
                  <div className="w-2 flex flex-col items-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-gray-900" />
                    {i < 7 && <div className="w-px h-6 bg-gray-200 mt-1" />}
                  </div>
                  <p className="text-gray-500 font-body text-xs leading-relaxed">{m.event}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why RE/MAX Globally */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">Why the Brand Matters</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl leading-tight">
              6 Reasons International Investors<br />Choose RE/MAX Over Anything Else
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_REMAX_GLOBALLY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 border-l-4 border-l-[#C9A84C] hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-sm leading-snug mb-3">{item.title}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RE/MAX in Your Country */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">A Brand You Already Know</p>
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl leading-tight">
              Wherever You're From — You Know RE/MAX.<br />
              <span className="text-gray-700">In Dubai, That's RE/MAX Zam.</span>
            </h2>
            <p className="text-gray-500 font-body text-sm mt-4 max-w-2xl mx-auto">
              International investors recognise the RE/MAX brand from their home markets. In Dubai, RE/MAX Zam is the franchise that carries that global trust and delivers it locally — with RERA-licensed advisors, DLD-registered transactions, and a team that speaks your language.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVESTOR_PROFILES.map((p, i) => (
              <motion.div
                key={p.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="text-3xl mb-3">{p.flag}</div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{p.country}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{p.insight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RE/MAX ZAM Dubai — The Local Expert */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-4">RE/MAX Zam — Dubai's RE/MAX</p>
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl leading-tight mb-6">
                Global Brand Trust.<br />Local Dubai Expertise.
              </h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                RE/MAX Zam has been Dubai's trusted RE/MAX franchise since 2010. In 15 years, we have closed over AED 2 billion in transactions for investors from 40+ countries — earning our place as one of the UAE's top-performing RE/MAX offices.
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                When international investors search for "RE/MAX Dubai" or "RE/MAX UAE property", they should find one answer: RE/MAX Zam. We combine the global credibility of the RE/MAX brand with 15 years of on-the-ground Dubai market knowledge.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { label: 'Established', value: '2010 — 15 years in Dubai' },
                  { label: 'Transactions', value: 'AED 2B+ closed' },
                  { label: 'Team', value: '20+ RERA-licensed advisors, 12 languages' },
                  { label: 'Investors Served', value: '1,200+ from 40+ countries' },
                  { label: 'RE/MAX Ranking', value: 'Top 10 Franchise in UAE' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-gray-400 font-body text-xs uppercase tracking-widest">{item.label}</span>
                    <span className="text-gray-900 font-heading font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0" asChild>
                <Link to="/contact">Contact RE/MAX Zam Dubai <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="font-display font-bold text-gray-900 text-xl mb-1">Start Your Dubai Investment</h3>
              <p className="text-gray-400 font-body text-xs mb-7">Free consultation. Real data. No pressure. We respond within 24 hours.</p>
              <LeadCaptureForm leadType="Investor" source="RE/MAX Dubai Page" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ — Rich SEO content */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-3">Common Questions</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl">
              RE/MAX Dubai — FAQs
            </h2>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-2xl p-6"
              >
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-3">{faq.q}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] font-body text-xs tracking-[0.2em] uppercase mb-4">The World's #1 Real Estate Brand</p>
          <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            Buy Dubai Property<br />Through a Brand You Can Trust
          </h2>
          <p className="text-gray-600 font-body text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            RE/MAX Zam is Dubai's trusted RE/MAX franchise — combining 50 years of global brand credibility with 15 years of on-the-ground Dubai expertise. Book your free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 font-heading font-bold border-0" asChild>
              <Link to="/contact">Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-gray-100 font-heading" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
