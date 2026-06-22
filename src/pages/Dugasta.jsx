import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, CheckCircle2, ArrowRight, MapPin, Calendar,
  Star, Shield, Building2, Phone, ChevronDown, Users, Award, Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { sendLeadToBitrix } from '@/lib/bitrix';
import { trackLeadEvent } from '@/lib/analytics';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: 'Terra Tower',
    community: 'Dubailand Residence Complex',
    type: 'Apartments',
    priceFrom: 'AED 634,000',
    bedrooms: '1 to 3 BR',
    handover: 'Q2 2027',
    paymentPlan: '5-Year Post-Handover Plan',
    roi: '10% Guaranteed',
    area: '719 to 1,400 sqft',
    tag: '10 on 10 Plan',
    image: '/images/12.webp',
    highlights: [
      '10% net ROI guaranteed for 10 years by contract',
      'Zero service charges for the full 10 year period',
      '100% buyback option after 10 years',
      '22 minutes to Burj Khalifa, 23 minutes to Dubai Airport',
      '12 floors with over 400 parking spaces on site',
    ],
    description: 'Terra Tower is the flagship Dugasta project in Dubailand Residence Complex. It comes with the full 10 on 10 package including 12 floors, resort-style amenities and a payment plan that runs 5 years post-handover.',
  },
  {
    name: 'Al Haseen Residences',
    community: 'Dubai South, Industrial City',
    type: 'Apartments',
    priceFrom: 'AED 477,000',
    bedrooms: 'Studio to 2 BR',
    handover: 'Q3 2027',
    paymentPlan: 'Flexible Payment Plan',
    roi: '10% Guaranteed',
    area: 'From 450 sqft',
    tag: 'Low Entry Price',
    image: '/images/13.webp',
    highlights: [
      'Most affordable entry point in the Dugasta portfolio',
      '10% guaranteed annual return for the first 5 years',
      'No service charges and 100% buyback included',
      'Positioned in the heart of the Dubai South growth corridor near Expo City',
      'Strong ongoing demand from airport and industrial zone workers',
    ],
    description: 'Al Haseen Residences is located in Dubai South, right in the middle of one of the city\'s biggest growth stories. With the new Al Maktoum International Airport nearby, this corridor is only going to get busier.',
  },
  {
    name: 'Moonsa Residences 2',
    community: 'International City (Warsan Fourth)',
    type: 'Apartments',
    priceFrom: 'AED 540,000',
    bedrooms: 'Studio to 1 BR',
    handover: 'Q4 2026',
    paymentPlan: 'Post-Handover Plan',
    roi: '9 to 10%',
    area: 'From 500 sqft',
    tag: 'Near Handover',
    image: '/images/14.webp',
    highlights: [
      'Very close to handover, so you can start earning quickly',
      'International City consistently has the highest rental demand in Dubai',
      'Average occupancy sits above 95% in this community',
      'Perfect for investors who want rental income without a long wait',
      'Fully registered with RERA and DLD escrow protected',
    ],
    description: "Moonsa Residences 2 is in International City, which has one of the highest occupancy rates in all of Dubai. Because it's so close to handover, investors can realistically start earning rental income within a few months.",
  },
];

const FAQS = [
  {
    q: 'What is the Dugasta 10 on 10 guaranteed ROI plan?',
    a: "The 10 on 10 plan means you receive a contractually guaranteed 10% net return on your purchase price every single year for 10 years. It is not a projection, a forecast or a promise made verbally. It is written into your Sales Purchase Agreement and is legally enforceable under UAE law. On top of that, Dugasta waives all service charges for the same 10-year period, and gives you the option to sell the unit back to them at your original price at the end.",
  },
  {
    q: 'Can I really earn 10% guaranteed when most Dubai landlords get 6 to 8%?',
    a: "Yes, and here is why it is possible. Dugasta's parent company, City Towers Real Estate, has been managing residential properties in Dubai since 1991. Because they run all the rentals in-house, they control the income. If the market only delivers 7% in a given year, City Towers covers the remaining 3% from their own operations. You still receive your 10%. The risk sits entirely with them, not with you.",
  },
  {
    q: 'Is this suitable for overseas investors who cannot manage a property themselves?',
    a: "This is actually designed for exactly that investor. You buy the property, sign the contracts, and then do nothing. City Towers handles tenants, maintenance, rent collection and all day-to-day management. You do not need to be in Dubai. You do not need to speak to a single tenant. Your guaranteed income arrives annually regardless of where you are in the world.",
  },
  {
    q: 'What happens when the 10 years are up?',
    a: "You have three clean exit options. You can keep the property and continue earning rental income at the market rate, which after a decade of Dubai growth is typically strong. You can sell on the open market, where Dubai property values have historically risen significantly over 10-year periods. Or you can exercise the 100% buyback option and have Dugasta repurchase the unit at your original purchase price. That buyback option is your guaranteed floor.",
  },
  {
    q: 'How much do I actually save by having zero service charges?',
    a: "In Dubai, service charges typically run at around 1.5% of property value per year. On a property worth AED 700,000 that is roughly AED 10,500 a year, or AED 105,000 over the 10-year period. Dugasta covers all of this, which means your effective annual return is closer to 11 to 11.5% once you include the saving.",
  },
  {
    q: 'Is Dugasta regulated and is my money protected?',
    a: "Every Dugasta project is registered with RERA (the Real Estate Regulatory Authority) and all purchase funds are held in a DLD-regulated escrow account as required by UAE law. The ROI guarantee and service charge waiver are both documented in your Sales Purchase Agreement, which is a legally binding contract. It is fully regulated, not a side arrangement.",
  },
  {
    q: 'What is the minimum investment to get started?',
    a: "Entry prices start from AED 477,000 for a studio at Al Haseen Residences in Dubai South. One-bedroom apartments in Terra Tower start from AED 634,000. Payment plans are available across all projects, with some offering just 1% per month, making this accessible to investors at a range of budget levels.",
  },
];

// ─── LEAD FORM ─────────────────────────────────────────────────────────────────

function DugastaLeadForm({ dark = true }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', investment_budget: '', notes: '' });

  const createLead = useMutation({
    mutationFn: async (data) => {
      const res = await base44.functions.invoke('createLead', data);
      // Forward to Bitrix
      try {
        await sendLeadToBitrix({
          title: 'DUGASTA Website Lead',
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          investment_budget: data.investment_budget,
          source: 'DUGASTA',
        });
      } catch (e) {
        console.error('[Dugasta] Bitrix forward failed:', e);
      }
      return res;
    },
    onSuccess: () => {
      setSubmitted(true);
      trackLeadEvent('form_submission', { lead_type: 'Investor', source: 'Dugasta Page', form_id: 'dugasta-lead-form-en' });
    },
  });

  const inputClass = dark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-12';

  const labelClass = dark ? 'text-white/50' : 'text-gray-500';

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${dark ? 'bg-emerald-500/20' : 'bg-emerald-50'}`}>
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className={`font-heading font-bold text-xl mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Request Received</h3>
        <p className={`font-body text-sm ${dark ? 'text-white/50' : 'text-gray-500'}`}>
          Our Dugasta specialist will contact you within 2 hours with full project details and ROI breakdown.
        </p>
      </div>
    );
  }

  return (
    <form id="dugasta-lead-form-en" onSubmit={(e) => { e.preventDefault(); createLead.mutate({ ...form, lead_type: 'Investor', source: 'Dugasta Page — 10 on 10' }); }} className="space-y-3">
      <Input placeholder="Full Name *" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inputClass} />
      <Input placeholder="Email Address *" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
      <Input placeholder="Phone / WhatsApp *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
      <Select value={form.investment_budget} onValueChange={(v) => setForm({ ...form, investment_budget: v })}>
        <SelectTrigger className={inputClass}>
          <SelectValue placeholder="Investment Budget" />
        </SelectTrigger>
        <SelectContent>
          {['Under 500K AED', '500K - 1M AED', '1M - 3M AED', '3M - 5M AED', '5M+ AED'].map(b => (
            <SelectItem key={b} value={b}>{b}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={createLead.isPending} className="w-full h-12 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm tracking-wide">
        {createLead.isPending ? 'Sending...' : 'Get Full Project Details & ROI Analysis'} <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <p className={`text-[10px] font-body text-center ${dark ? 'text-white/25' : 'text-gray-400'}`}>
        No spam. A Dugasta investment specialist contacts you directly within 2 hours.
      </p>
    </form>
  );
}

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-heading font-bold text-gray-900 text-sm leading-snug">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-sm text-gray-500 font-body leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Dugasta() {
  const [activeProject, setActiveProject] = useState(0);

  // Canonical points to the more detailed campaign page
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = 'https://remaxzam.ae/10-net-roi-dubai-property';
    return () => { link.href = 'https://remaxzam.ae/dugasta'; };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-center bg-cover opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

            {/* Copy — 3 cols */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>

              <h1 className="font-display font-black text-white leading-[0.95] mb-6">
                <span className="block text-5xl sm:text-7xl lg:text-8xl">10% Guaranteed</span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">ROI. 10 Years.</span>
                <span className="block text-xl sm:text-2xl text-white/35 font-body font-normal mt-4 leading-relaxed">No Service Charges &nbsp;·&nbsp; Zero Tax &nbsp;·&nbsp; Fully Managed &nbsp;·&nbsp; 100% Buyback</span>
              </h1>

              <p className="text-white/60 font-body text-base leading-relaxed mb-8 max-w-xl">
                Most Dubai property investors deal with market uncertainty, unexpected service charges and the stress of managing tenants. The Dugasta 10 on 10 plan removes all of that. <strong className="text-white/85">You invest. They manage everything. You collect 10% every year, contractually guaranteed, for a full decade.</strong>
              </p>

              {/* 3 pillars */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { value: '10%', label: 'Net ROI / Year', sub: 'Written into your contract' },
                  { value: '0 AED', label: 'Service Charges', sub: 'Waived for 10 years' },
                  { value: '100%', label: 'Buyback Option', sub: 'Exit at original price' },
                ].map(s => (
                  <div key={s.label} className="bg-white/[0.05] border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-white font-display font-black text-2xl">{s.value}</p>
                    <p className="text-white font-heading font-bold text-xs mt-1">{s.label}</p>
                    <p className="text-white/30 font-body text-[9px] mt-0.5 leading-tight">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/97145828158?text=Hi, I'd like to know more about the Dugasta 10 on 10 guaranteed ROI plan" target="_blank" rel="noopener noreferrer"
                  onClick={() => trackLeadEvent('whatsapp', { source: 'Dugasta' })}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> WhatsApp a Specialist
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  See Available Projects <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Lead Form — 2 cols */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
                <h2 className="font-display font-black text-white text-2xl mb-1">See the Numbers for Yourself</h2>
                <p className="text-white/40 font-body text-xs mb-6">Get the full ROI contract, project brochure and payment plan breakdown sent directly to you.</p>
                <DugastaLeadForm dark={true} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CITY TOWERS LEGACY ── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Why the Guarantee is Real</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-5">
                The Company That Has<br />Managed Dubai Property Since 1991
              </h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                The reason Dugasta can guarantee 10% when the average Dubai landlord earns 6 to 8% is simple: their parent company, <strong className="text-gray-800">City Towers Real Estate</strong>, manages all the properties in-house. They have been doing this in Dubai since 1991.
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                That means they control the entire rental cycle: tenant sourcing, lease agreements, rent collection and maintenance. If the market yields less than 10% in any given year, <strong className="text-gray-800">City Towers absorbs the difference. The shortfall is their problem, not yours.</strong>
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                For investors who want real estate exposure without landlord headaches, this is as clean as it gets. You own a Dubai apartment. They run it. You receive your annual income. That is the entire relationship.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: 'Founded', value: '1991' },
                  { icon: Users, label: 'Leadership', value: 'Khan Family' },
                  { icon: Award, label: 'Units Delivered', value: '5,000+' },
                  { icon: Banknote, label: 'Management', value: 'In-House' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-gray-900 text-sm">{value}</p>
                      <p className="text-gray-400 font-body text-[10px]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#0a0a0a] rounded-2xl p-8 relative overflow-hidden">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-12 bg-white/30 rounded-full" />
                    <div>
                      <p className="text-white font-heading font-bold text-sm">Tauseef Khan</p>
                      <p className="text-white/40 font-body text-xs">Founder & Chairman, Dugasta Properties</p>
                    </div>
                  </div>
                  <blockquote className="text-white/70 font-body text-sm leading-relaxed italic mb-8">
                    "At Dugasta, trust is not just a slogan — it is the very DNA of our business. The '10 on 10' model I introduced stands as the best example of this philosophy, offering investors 10% net ROI for 10 years with zero service charges. By eliminating uncertainty, we provide our customers with absolute clarity and complete confidence."
                  </blockquote>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-white/30 font-body text-xs mb-3">Leadership Team</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Tauseef Khan', role: 'Founder & Chairman' },
                        { name: 'Azaan Khan', role: 'Chief Executive Officer' },
                        { name: 'Eifaad Khan', role: 'President' },
                      ].map(p => (
                        <div key={p.name} className="flex items-center justify-between">
                          <span className="text-white font-heading font-semibold text-xs">{p.name}</span>
                          <span className="text-white/40 font-body text-xs">{p.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW 10 on 10 WORKS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">What You Actually Get</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-4">
             10% Guaranteed ROI in Dubai:<br />Here Is How It Works
            </h2>
            <p className="text-gray-500 font-body text-sm max-w-2xl mx-auto leading-relaxed">
              This is not a projection, an estimate or a marketing promise. Every figure below is written into your Sales Purchase Agreement and is fully enforceable under UAE law.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-center">
                <div className="p-5 border-r border-gray-100">
                  <p className="text-gray-400 font-body text-xs uppercase tracking-wider mb-1">Metric (5 Years)</p>
                </div>
                <div className="p-5 bg-gray-50 border-r border-gray-100">
                  <p className="text-gray-900 font-heading font-bold text-sm uppercase tracking-wider">Dugasta 10 on 10</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-400 font-heading font-semibold text-sm">Regular Dubai Apartment</p>
                </div>
              </div>
              {[
                ['Annual ROI', '10% Guaranteed', '6–8% (not guaranteed)'],
                ['Rental Income (5 yrs on AED 691K)', 'AED 345,500', 'AED 207,300–276,400'],
                ['Service Charges (5 yrs)', 'AED 0 (fully waived)', '~AED 51,825'],
                ['Vacancy Risk', 'Zero (developer backed)', 'Market risk applies'],
                ['Exit Strategy', '100% buyback guaranteed', 'Market-dependent resale'],
                ['Net 5-Year Profit', '~AED 345,500', '~AED 155,475–224,575'],
              ].map(([metric, dugasta, regular], i) => (
                <div key={metric} className={`grid grid-cols-3 text-sm border-t border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <div className="p-4 font-body text-gray-500 border-r border-gray-100">{metric}</div>
                  <div className="p-4 font-heading font-semibold text-emerald-700 bg-gray-50/50 border-r border-gray-100 text-center">{dugasta}</div>
                  <div className="p-4 font-body text-gray-500 text-center">{regular}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 font-body text-xs mt-3">
              Based on Terra Tower 1BR at AED 691,000. Service charges est. at 1.5% p.a. Source: RERA / DLD market data.
            </p>
          </motion.div>

          {/* 4 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: '10% Net ROI Every Year — Guaranteed', desc: 'Your return is contractually fixed at 10% of your purchase price, paid annually. The rental market can go up or down. Your income stays exactly the same.' },
              { num: '02', title: 'Zero Service Charges for 10 Years', desc: "Service charges on Dubai property typically cost 1.5% per year. Dugasta waives all of them for the full decade, pushing your effective return closer to 11.5% annually." },
              { num: '03', title: 'Completely Hands-Off Investment', desc: "City Towers manages every aspect of your property: tenants, maintenance and rent collection. You never deal with a single tenant complaint. You just receive your income." },
              { num: '04', title: 'A Guaranteed Exit After 10 Years', desc: "Most property investors worry about when and how to exit. With Dugasta, you have the option to sell the unit back at your original purchase price, guaranteed in writing." },
            ].map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-gray-900 font-display font-black text-4xl mb-4">{p.num}</p>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Where to Invest</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-3">
              Dubai Properties With 10% Guaranteed Returns
            </h2>
            <p className="text-gray-500 font-body text-sm max-w-2xl leading-relaxed">
              Each project below comes with the full 10 on 10 package: guaranteed ROI, zero service charges and the buyback option. Entry prices start from AED 477,000.
            </p>
          </motion.div>

          {/* Project tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PROJECTS.map((p, i) => (
              <button key={p.name} onClick={() => setActiveProject(i)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${activeProject === i ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {p.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeProject} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                {/* Image — fills full column height */}
                <div className="relative min-h-[320px] lg:min-h-full overflow-hidden">
                  <img src={PROJECTS[activeProject].image} alt={PROJECTS[activeProject].name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Tag */}
                  <span className="absolute top-5 left-5 bg-black text-white text-[10px] font-heading font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {PROJECTS[activeProject].tag}
                  </span>
                  {/* Title overlay */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white font-display font-black text-2xl leading-tight drop-shadow-lg">{PROJECTS[activeProject].name}</p>
                    <p className="text-white/70 text-xs font-body flex items-center gap-1 mt-1.5 drop-shadow">
                      <MapPin className="w-3 h-3" />{PROJECTS[activeProject].community}
                    </p>
                  </div>
                </div>
                {/* Details */}
                <div className="p-8 lg:p-10 flex flex-col">
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">{PROJECTS[activeProject].description}</p>
                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-body">
                    {[
                      { label: 'Price From', value: PROJECTS[activeProject].priceFrom },
                      { label: 'Bedrooms', value: PROJECTS[activeProject].bedrooms },
                      { label: 'Handover', value: PROJECTS[activeProject].handover },
                      { label: 'Payment Plan', value: PROJECTS[activeProject].paymentPlan },
                      { label: 'Area', value: PROJECTS[activeProject].area },
                      { label: 'ROI', value: PROJECTS[activeProject].roi },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-xl p-3 border border-gray-100">
                        <p className="text-gray-400 mb-0.5 text-[10px] uppercase tracking-wider">{label}</p>
                        <p className={`font-heading font-bold text-sm ${label === 'ROI' ? 'text-emerald-600' : 'text-gray-900'}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Highlights */}
                  <ul className="space-y-2 mb-auto">
                    {PROJECTS[activeProject].highlights.map(h => (
                      <li key={h} className="flex items-start gap-2 text-xs text-gray-600 font-body">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {h}
                      </li>
                    ))}
                  </ul>
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-6 border-t border-gray-200">
                    <Link to="/contact" className="flex-1 text-center bg-black hover:bg-gray-800 text-white font-heading font-bold text-sm py-3.5 rounded-xl transition-colors">
                      Request Brochure
                    </Link>
                    <a href="https://wa.me/97145828158?text=Hi, I'd like details on the Dugasta project" target="_blank" rel="noopener noreferrer"
                      onClick={() => trackLeadEvent('whatsapp', { source: 'Dugasta' })}
                      className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm py-3.5 rounded-xl transition-colors">
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── WHY RE/MAX ZAM ── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-black rounded-full px-3 py-1 mb-4">
                <Star className="w-3 h-3 text-gray-400 fill-gray-400" />
                <span className="text-white font-heading font-bold text-[10px] tracking-[0.2em] uppercase">Why Buy Through RE/MAX Zam</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 leading-tight mb-5">
                How to Buy a Dugasta<br />Property Through RE/MAX Zam
              </h2>
              <p className="text-gray-600 font-body text-sm leading-relaxed mb-3">
                RE/MAX Zam is an authorised selling agent for Dugasta in Dubai. Our advisors have walked dozens of investors through the 10 on 10 purchase process, from first enquiry all the way to DLD registration and handover.
              </p>
              <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                Because the developer pays our commission, <strong className="text-gray-900">there is absolutely no agency fee for you to pay.</strong> You get full professional guidance at zero cost.
              </p>
              <ul className="space-y-3">
                {[
                   'We show you available units and walk you through every option',
                   'Full ROI contract review so you understand exactly what you are signing',
                   'No agency fee. The developer covers our cost.',
                   'We handle DLD registration, NOC and all paperwork on your behalf',
                   'City Towers takes over from handover — you never deal with tenants',
                 ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-body">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="font-display font-black text-gray-900 text-2xl mb-1">Book a Consultation</h3>
                <p className="text-gray-400 font-body text-xs mb-6">Get the full project brochure, ROI breakdown and payment plan options sent to you directly.</p>
                <DugastaLeadForm dark={false} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Common Investor Questions</p>
            <h2 className="text-4xl font-display font-black text-gray-900 mb-3">Guaranteed ROI in Dubai: Questions Answered</h2>
            <p className="text-gray-500 font-body text-sm leading-relaxed">Everything first-time and experienced investors ask before committing to the 10 on 10 plan.</p>
          </motion.div>
          <div>
            {FAQS.map(faq => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/50 font-body text-xs tracking-[0.2em] uppercase mb-4">Start Earning 10% Guaranteed</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white leading-tight mb-5">
              Invest in Dubai Property.<br />Collect 10% Every Year.<br />Do Nothing Else.
            </h2>
            <p className="text-gray-400 font-body text-sm mb-10 max-w-xl mx-auto leading-relaxed">
              If you are looking for guaranteed rental income from Dubai property with no service charges, no tenant stress and a built-in exit strategy, the 10 on 10 plan is built for you. Talk to our team today. No pressure, no cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a onClick={() => trackLeadEvent('whatsapp', { source: 'Dugasta' })}
                 href="https://wa.me/97145828158?text=Hi, I want to learn more about the Dugasta 10 on 10 plan" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm px-8 py-4 rounded-xl transition-colors">
                <Phone className="w-4 h-4" /> WhatsApp a Specialist
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 font-heading font-bold text-sm px-8 py-4 rounded-xl transition-colors">
                Book a Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/10-net-roi-dubai-property" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs px-6 py-3 rounded-xl transition-colors mt-2">
                Full campaign page with ROI calculator → /10-net-roi-dubai-property
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}