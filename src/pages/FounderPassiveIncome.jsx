/**
 * Landing page: /my-dubai-passive-income
 * Campaign: Dubai Wealth Engine — Founder Story (BOFU)
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Percent, Shield, ArrowRight } from 'lucide-react';
import {
  WhatsAppFloat, TrustStrip,
  RedCTABand, CampaignLeadForm, FaqAccordion
} from '@/components/campaign/CampaignShared';
import usePageSEO from '@/lib/usePageSEO';

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://remaxzam.ae/my-dubai-passive-income',
      url: 'https://remaxzam.ae/my-dubai-passive-income',
      name: 'How I Earn Passive Income From Dubai Real Estate | Founder Story | RE/MAX Zam',
      description: 'The owner of RE/MAX Zam shares how he earns passive, tax-free income from his own Dubai property portfolio — and how you can invest in the same strategy.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://remaxzam.ae' },
          { '@type': 'ListItem', position: 2, name: 'Dubai Property Investment', item: 'https://remaxzam.ae/dubai-property-investment' },
          { '@type': 'ListItem', position: 3, name: 'Founder Passive Income Story', item: 'https://remaxzam.ae/my-dubai-passive-income' },
        ],
      },
    },
    {
      '@type': 'Person',
      name: 'Faisal Contractor',
      jobTitle: 'Owner',
      worksFor: { '@type': 'RealEstateAgent', name: 'RE/MAX ZAM Dubai', url: 'https://remaxzam.ae' },
      description: 'Owner of RE/MAX Zam Dubai and personal investor in Dubai property, earning passive income from Dugasta and other high-yield communities.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Does the founder of RE/MAX Zam own Dubai property?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Faisal Contractor invests in the same projects he recommends, including Dugasta communities. His income comes from the same strategy he shares with clients.' } },
        { '@type': 'Question', name: 'Is this financial advice?', acceptedAnswer: { '@type': 'Answer', text: 'No. The founder shares his own experience and the team models transparent projections. Clients make their own decisions with full information.' } },
        { '@type': 'Question', name: 'What happens on a consultation call?', acceptedAnswer: { '@type': 'Answer', text: 'The team learns your goals, models your returns and visa eligibility, and shows you matching properties. About 20 minutes.' } },
      ],
    },
  ],
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STRATEGY = [
  { num: '1', title: 'Buy for income, not hype', desc: 'Choose high-yield, high-demand communities, not trophy addresses.' },
  { num: '2', title: 'Use flexible payment plans', desc: 'Build the position over time (e.g. 10/50/40) without tying up cash.' },
  { num: '3', title: 'Protect the yield', desc: 'Prioritise 0% service charges and, where available, buy-back options.' },
  { num: '4', title: 'Stack toward residency', desc: 'Reach AED 2M and convert the investment into a 10-year Golden Visa.' },
];

const FAQS = [
  { q: 'Do you really own Dubai property yourself?', a: "Yes — I invest in the same projects I recommend, including Dugasta communities. My income comes from the same strategy I'll show you." },
  { q: 'Is this financial advice?', a: 'No. I share my own experience and we model transparent projections. You make the decision with full information.' },
  { q: 'What happens on the call?', a: 'We learn your goals, model your returns and visa eligibility, and show you matching properties. About 20 minutes.' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FounderPassiveIncome() {
  usePageSEO({
    title: 'How I Earn Passive Income From Dubai Real Estate | Founder Story | RE/MAX Zam',
    description: 'The owner of RE/MAX Zam shares how he earns passive, tax-free income from his own Dubai property portfolio — and how you can invest in the same strategy.',
    canonical: 'https://remaxzam.ae/my-dubai-passive-income',
    keywords: 'passive income dubai real estate, how to earn passive income dubai, dubai rental income investment, dubai property founder investor, tax free rental income dubai',
    schema: PAGE_SCHEMA,
  });

  return (
    <div className="min-h-screen bg-white font-body">
      <WhatsAppFloat />

      {/* ── HERO ── */}
      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video placeholder */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80"
                alt="Dubai skyline"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-sm">Founder Story — 2 minutes</p>
                  <p className="text-white/50 font-body text-xs mt-1">Video coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-xs font-body tracking-[0.25em] uppercase text-gray-400 mb-4">FROM THE OWNER OF RE/MAX ZAM</p>
            <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl leading-tight mb-5">
              How I earn passive income from my own Dubai real estate.
            </h1>
            <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
              I'm Faisal Contractor. I don't just sell Dubai property — I invest in it myself and live off the income it generates. Here's exactly how, and how you can do the same.
            </p>
            <a href="#lead-form" className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
              Book a Call With My Team <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* ── INCOME PROOF ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
            <h2 className="font-display font-black text-gray-900 text-3xl mb-4">Real income, shown openly.</h2>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              I built a Dubai portfolio for one reason — passive, tax-free income. On select projects I earn up to 10% net per year, with 0% service charges eroding it. I'll walk you through the actual numbers on a call — no brochures, no spin.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: Percent, stat: 'Up to 10%', label: 'Net annual yield' },
                { icon: Shield, stat: '0%', label: 'Service charges' },
                { icon: TrendingUp, stat: 'Tax-free', label: 'Income, every year' },
              ].map(({ icon: Icon, stat, label }) => (
                <div key={stat} className="bg-gray-50 rounded-xl p-6 text-center">
                  <Icon className="w-6 h-6 text-gray-900 mx-auto mb-3" />
                  <p className="font-display font-black text-gray-900 text-2xl">{stat}</p>
                  <p className="font-body text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">The strategy behind it</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STRATEGY.map(s => (
              <div key={s.num} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <p className="font-display font-black text-gray-900 text-4xl mb-4">{s.num}</p>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAME PROJECTS BAND ── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
            "Most brokers sell you whatever pays them the most. I recommend what I own. When I find a project worth my own money — like Dugasta's high-yield communities — I bring my clients in alongside me. Same projects, same strategy, same upside."
          </p>
          <p className="font-heading font-bold text-white/50 text-sm mb-8">— Faisal Contractor, Owner, RE/MAX Zam</p>
          <Link to="/dugasta-faq" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-heading font-bold text-sm px-7 py-3 rounded-xl transition-colors">
            See why I chose these projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── OFFER ── */}
      <section id="lead-form" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-5">Come into the same strategy as me.</h2>
            <p className="font-body text-gray-600 text-base leading-relaxed">
              Book a 20-minute call with my senior advisory team. We'll understand your goals, model your exact returns and Golden-Visa path, and show you the projects I personally invest in. No pressure — just the numbers.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm p-8">
            <CampaignLeadForm source="Offer Block — /my-dubai-passive-income" ctaLabel="Book a Call With My Team" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <h2 className="font-display font-black text-gray-900 text-3xl mb-8 text-center">Frequently Asked Questions</h2>
          {FAQS.map(f => <FaqAccordion key={f.q} {...f} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <RedCTABand heading="Let me show you the numbers — book a call with my team.">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-7 shadow-xl">
          <CampaignLeadForm dark={false} source="Bottom CTA — /my-dubai-passive-income" ctaLabel="Book a Call With My Team" />
        </div>
      </RedCTABand>

    </div>
  );
}
