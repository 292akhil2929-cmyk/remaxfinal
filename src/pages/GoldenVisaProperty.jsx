/**
 * Landing page: /dubai-golden-visa-property
 * Campaign: Dubai Wealth Engine — Golden Visa
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Home, Globe, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  WhatsAppFloat, TrustStrip,
  FounderStrip, RedCTABand, CampaignLeadForm, FaqAccordion, WA_BASE
} from '@/components/campaign/CampaignShared';
import usePageSEO from '@/lib/usePageSEO';

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://remaxzam.ae/dubai-golden-visa-property',
      url: 'https://remaxzam.ae/dubai-golden-visa-property',
      name: 'Dubai Golden Visa Through Property | AED 2M 10-Year Residency | RE/MAX Zam',
      description: 'Invest AED 2M in Dubai property and secure a renewable 10-year UAE Golden Visa for your family. Check your eligibility in 60 seconds and see qualifying properties.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://remaxzam.ae' },
          { '@type': 'ListItem', position: 2, name: 'Invest', item: 'https://remaxzam.ae/dubai-property-investment' },
          { '@type': 'ListItem', position: 3, name: 'Dubai Golden Visa Through Property', item: 'https://remaxzam.ae/dubai-golden-visa-property' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "What's the minimum investment for a Golden Visa?", acceptedAnswer: { '@type': 'Answer', text: 'AED 2,000,000 in property (DLD-registered value). You can combine multiple properties to reach it.' } },
        { '@type': 'Question', name: 'Can I qualify with a mortgage or payment plan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — as of 2025, the full property value counts, so mortgaged and staged-payment purchases can qualify.' } },
        { '@type': 'Question', name: 'Who is covered by the Golden Visa?', acceptedAnswer: { '@type': 'Answer', text: 'You, your spouse, your children, and domestic staff.' } },
        { '@type': 'Question', name: 'How long does the Golden Visa process take?', acceptedAnswer: { '@type': 'Answer', text: 'Once your property and valuation are in place, the visa process is typically a few weeks. We guide you through every step.' } },
      ],
    },
  ],
};

// ─── ELIGIBILITY CHECKER ──────────────────────────────────────────────────────

function EligibilityChecker() {
  const [budget, setBudget] = useState('');
  const [purchase, setPurchase] = useState('');
  const [propertyStatus, setPropertyStatus] = useState('');
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function check() {
    const qualifies = budget === 'AED 2M' || budget === 'Above AED 2M';
    setResult(qualifies ? 'qualify' : 'close');
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7">
      <p className="font-heading font-bold text-gray-900 text-lg mb-5">Check My Eligibility</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-body text-gray-500 block mb-1.5">What's your property investment budget?</label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Under AED 2M">Under AED 2M</SelectItem>
              <SelectItem value="AED 2M">AED 2M</SelectItem>
              <SelectItem value="Above AED 2M">Above AED 2M</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-body text-gray-500 block mb-1.5">Are you buying one property or combining several?</label>
          <Select value={purchase} onValueChange={setPurchase}>
            <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One">One property</SelectItem>
              <SelectItem value="Multiple">Multiple properties</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-body text-gray-500 block mb-1.5">Ready, off-plan or mortgaged?</label>
          <Select value={propertyStatus} onValueChange={setPropertyStatus}>
            <SelectTrigger className="h-11 bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ready">Ready</SelectItem>
              <SelectItem value="Off-plan">Off-plan</SelectItem>
              <SelectItem value="Mortgaged">Mortgaged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!result && (
        <Button onClick={check} disabled={!budget} className="w-full h-11 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm rounded-xl">
          Check My Eligibility
        </Button>
      )}

      {result === 'qualify' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="font-heading font-bold text-emerald-700 text-sm">Great news — you likely qualify for the 10-year Golden Visa.</p>
          </div>
          <p className="text-emerald-600 font-body text-xs leading-relaxed">Get your personalised eligibility report and property options.</p>
        </div>
      )}
      {result === 'close' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
          <p className="font-heading font-bold text-gray-900 text-sm mb-1">You're close.</p>
          <p className="text-gray-600 font-body text-xs leading-relaxed">We can show you how to structure your investment to reach the AED 2M threshold, including flexible payment plans.</p>
        </div>
      )}

      {result && !showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full h-11 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm rounded-xl">
          Get My Eligibility Report <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}
      {showForm && (
        <CampaignLeadForm source="Eligibility Checker — /dubai-golden-visa-property" ctaLabel="Get My Eligibility Report" />
      )}

      <p className="text-[10px] text-gray-400 font-body text-center mt-3">Eligibility guidance based on current UAE rules; final approval is via the Dubai Land Department / ICP.</p>
    </div>
  );
}

// ─── FAQS ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What's the minimum investment for a Golden Visa?", a: 'AED 2,000,000 in property (DLD-registered value). You can combine multiple properties to reach it.' },
  { q: 'Can I qualify with a mortgage or payment plan?', a: "Yes — as of 2025, the full property value counts, so mortgaged and staged-payment purchases can qualify." },
  { q: 'Who is covered?', a: 'You, your spouse, your children, and domestic staff.' },
  { q: 'How long does it take?', a: 'Once your property and valuation are in place, the visa process is typically a few weeks. We guide you through every step.' },
];

const BENEFIT_CARDS = [
  { icon: Globe, title: 'A plan B for your family', desc: 'Long-term security in a stable, tax-free hub.' },
  { icon: Home, title: 'Live, work, study, retire', desc: 'Full residency rights without a local sponsor.' },
  { icon: Users, title: 'Bring your family', desc: 'Spouse, children and domestic staff included.' },
  { icon: TrendingUp, title: 'Plus the income', desc: 'Your qualifying property also earns up to 10% net rental ROI, tax-free.' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function GoldenVisaProperty() {
  usePageSEO({
    title: 'Dubai Golden Visa Through Property | AED 2M 10-Year Residency | RE/MAX Zam',
    description: 'Invest AED 2M in Dubai property and secure a renewable 10-year UAE Golden Visa for your family. Check your eligibility in 60 seconds and see qualifying properties.',
    canonical: 'https://remaxzam.ae/dubai-golden-visa-property',
    keywords: 'dubai golden visa property, property for golden visa dubai, aed 2 million golden visa, uae residency by investment, dubai golden visa 2025, golden visa payment plan dubai',
    schema: PAGE_SCHEMA,
  });

  return (
    <div className="min-h-screen bg-white font-body">
      <WhatsAppFloat />

      {/* ── HERO ── */}
      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-body tracking-[0.25em] uppercase text-gray-400 mb-4">10-YEAR UAE RESIDENCY</p>
            <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl leading-tight mb-5">
              AED 2M in Dubai property. <span className="text-gray-900">10 years of UAE residency</span> for your whole family.
            </h1>
            <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
              Turn a property investment into a renewable 10-year Golden Visa — for you, your spouse, your children and your domestic staff. Check if you qualify in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#eligibility" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                Check My Eligibility
              </a>
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-900 font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                Book a Free Consultation
              </a>
            </div>
          </motion.div>

          <motion.div id="eligibility" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <EligibilityChecker />
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Invest AED 2M+', desc: 'Buy property with a DLD-registered value of AED 2,000,000 or more — ready, off-plan or mortgaged. You can combine multiple properties.' },
              { step: '02', title: 'Apply via DLD', desc: 'Submit a current DLD valuation certificate; we handle the paperwork with you.' },
              { step: '03', title: '10-year residency', desc: 'A renewable 10-year visa covering your spouse, children and domestic staff. No local sponsor required.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <p className="font-display font-black text-gray-900 text-4xl mb-4">{s.step}</p>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-3">{s.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2025 UPDATE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
            <p className="text-xs font-body tracking-[0.2em] uppercase text-gray-400 mb-3">2025–26 Update</p>
            <h2 className="font-display font-black text-gray-900 text-2xl sm:text-3xl mb-4">It just got easier.</h2>
            <p className="font-body text-gray-600 text-base leading-relaxed">
              The old AED 1M minimum down-payment has been removed, and the full DLD-registered value of a mortgaged property now counts toward the AED 2M threshold. That means the Golden Visa is now reachable on flexible Dugasta payment plans — not only with cash up front.
            </p>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Why a Golden Visa changes everything</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFIT_CARDS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <blockquote className="font-body text-white/70 text-lg leading-relaxed italic mb-6">
            "I built my own Dubai portfolio — the income and the residency. I'll show you exactly how to do the same."
          </blockquote>
          <p className="font-heading font-bold text-white/50 text-sm mb-8">— Faisal Contractor, Owner, RE/MAX Zam</p>
          <Link to="/my-dubai-passive-income" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-heading font-bold text-sm px-7 py-3 rounded-xl transition-colors">
            See how the founder invests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <h2 className="font-display font-black text-gray-900 text-3xl mb-8 text-center">Frequently Asked Questions</h2>
          {FAQS.map(f => <FaqAccordion key={f.q} {...f} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <RedCTABand heading="Find out if you qualify — and see the properties that get you there.">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-7 shadow-xl">
          <CampaignLeadForm dark={false} source="Bottom CTA — /dubai-golden-visa-property" ctaLabel="Get My Eligibility Report" />
        </div>
      </RedCTABand>

    </div>
  );
}