import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, Shield, ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import usePageSEO from '@/lib/usePageSEO';

const TOP_AREAS = [
  { area: 'JVC', avgYield: '8.2%', avgPrice: 'AED 950/sqft', type: 'Apartments', why: 'Young professionals keep JVC consistently tenanted. Affordable entry, strong demand and easy highway access make this one of the most popular yield plays in Dubai.' },
  { area: 'Business Bay', avgYield: '7.8%', avgPrice: 'AED 1,480/sqft', type: 'Apartments and Offices', why: "Business Bay never sleeps. Corporate tenants, short-term rentals and proximity to Downtown mean demand here is practically permanent." },
  { area: 'Dubai Marina', avgYield: '7.4%', avgPrice: 'AED 1,650/sqft', type: 'Apartments', why: 'Tourists, expats and short-term rental guests all want to be in the Marina. Airbnb performs exceptionally well here and long-term tenants rarely leave.' },
  { area: 'Al Warsan and Dubailand', avgYield: '9 to 11%', avgPrice: 'AED 650/sqft', type: 'Apartments', why: 'Lower purchase prices combined with a growing population of working professionals create some of the best yields in the entire city.' },
  { area: 'International City', avgYield: '9.5%', avgPrice: 'AED 480/sqft', type: 'Apartments', why: "The most affordable area in Dubai with one of the highest occupancy rates. It's not glamorous but the numbers are hard to argue with." },
  { area: 'Arjan and Motor City', avgYield: '8.0%', avgPrice: 'AED 850/sqft', type: 'Apartments', why: 'Families love this area for the schools and greenery. Rental demand is stable, consistent and growing as infrastructure continues to improve.' },
];

const ROI_TYPES = [
  { icon: PiggyBank, title: 'Rental Yield', desc: 'Collect 7 to 11% annually from long-term tenants. Dubai charges zero income tax on rent, so every dirham of income is yours to keep.' },
  { icon: TrendingUp, title: 'Capital Appreciation', desc: 'Dubai property values grew by over 20% in 2023 and 2024. Investors who bought off-plan in the right areas are seeing 30 to 40% gains by handover.' },
  { icon: Star, title: 'Short-Term Rentals', desc: 'Airbnb and holiday homes generate 15 to 25% gross yields in areas like Marina, JBR and Downtown. All you need is a DTCM holiday home permit, which is straightforward to get.' },
];

export default function HighROI() {
  usePageSEO({
    title: 'High-ROI Investment Properties in Dubai | RE/MAX Zam',
    description: 'Discover Dubai properties with the strongest rental yields and capital growth. RE/MAX Zam helps investors target high-ROI areas with data-driven advice.',
    canonical: 'https://remaxzam.ae/high-roi',
  });

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-[#0a0a0a]">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-white/50 font-body text-xs tracking-[0.2em] uppercase">Passive Income & Capital Growth</span>
            </div>
            <h1 className="font-display font-black text-white leading-[1.0] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-[5rem]">High Yield</span>
              <span className="block text-5xl sm:text-6xl lg:text-[5rem]">Dubai Property</span>
              <span className="block text-white/70 font-body text-3xl sm:text-4xl mt-2">7–11% Returns. Zero Tax.</span>
            </h1>
            <p className="text-white/60 font-body text-base leading-relaxed mb-10 max-w-xl">
              Dubai keeps outperforming every other major property market in the world. No tax on rental income. World-class infrastructure. A city that genuinely never stops growing. Every year more businesses, tourists and residents arrive, and they all need somewhere to live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black font-heading font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-100 transition-all">
                Get My Free ROI Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 font-heading font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
                Browse High-Yield Listings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {[
              { value: '0%', label: 'Income Tax on Rental Returns', source: 'UAE Gov' },
              { value: '7–11%', label: 'Average Net Rental Yield', source: 'RERA/DLD' },
              { value: '20%+', label: 'Capital Growth (2023–24)', source: 'DLD' },
              { value: '3.5M+', label: 'Dubai Population and Growing Fast', source: 'DSC' },
            ].map(s => (
              <div key={s.label} className="shrink-0">
                <p className="text-black font-display font-black text-2xl">{s.value}</p>
                <p className="text-gray-500 font-body text-xs mt-0.5">{s.label}</p>
                <p className="text-gray-300 font-body text-[10px] tracking-wider uppercase mt-0.5">Source: {s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI TYPES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Your Return Strategy</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight max-w-xl">
              Three Ways Your<br />Money Works in Dubai
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {ROI_TYPES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group border border-gray-100 rounded-2xl p-8 hover:border-black hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-black flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP YIELD AREAS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Where to Invest</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight">
              Dubai's Highest Yielding<br />Communities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOP_AREAS.map((a, i) => (
              <motion.div key={a.area} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-heading font-black text-gray-900 text-lg">{a.area}</p>
                    <p className="text-gray-400 font-body text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{a.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-gray-900 text-xl">{a.avgYield}</p>
                    <p className="text-gray-400 text-[10px] font-body">avg yield</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                  <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-700 font-heading font-bold text-sm">{a.avgPrice}</span>
                  <span className="text-gray-400 font-body text-xs">avg price</span>
                </div>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{a.why}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/area-guides" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-body transition-colors group">
              View all area guides <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* DUGASTA HIGHLIGHT */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white leading-tight mb-5">
                Dugasta Projects:<br />9–11% Yields
              </h2>
              <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
                RE/MAX Zam is the exclusive sales partner for Dugasta in Dubai. Their 1% monthly payment plan and Dubailand locations consistently produce the highest rental yields we see across our entire portfolio.
              </p>
              <ul className="space-y-3 mb-8">
                {['Get access to units before they go public', '1% per month is genuinely the most accessible plan in Dubai', 'Yields of 9 to 11% backed by a legally binding contract', 'No agency fees when you buy Dugasta through us'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300 font-body">
                    <CheckCircle2 className="w-4 h-4 text-white/60 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dugasta" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  View Dugasta Projects <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/10-net-roi-dubai-property" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  ROI Calculator & Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=700&q=80" alt="Dubai investment property" className="w-full rounded-2xl object-cover aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA + LEAD FORM */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-4">Free ROI Analysis</p>
              <h2 className="text-4xl font-display font-black text-gray-900 leading-tight mb-5">
                Get a Personalised<br />ROI Breakdown
              </h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                Share your budget and what you are hoping to achieve. Our team will put together a clear picture of exactly what is possible for you, with real numbers. No cost, no obligation.
              </p>
              <ul className="space-y-3">
                {['Yield projections tailored to your actual budget', 'An honest comparison of off-plan versus ready property', 'Community recommendations matched to your goals', 'Golden Visa eligibility check included'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600 font-body">
                    <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 text-xs shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-display font-black text-gray-900 mb-1">Start Your ROI Journey</h3>
              <p className="text-xs text-gray-400 font-body mb-6">We respond within 24 hours.</p>
              <LeadCaptureForm leadType="Investor" source="High ROI Page" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
