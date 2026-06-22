/**
 * Landing page: /dugasta-faq
 * Campaign: Dubai Wealth Engine — FAQ / Objection Handling
 * Includes FAQ schema structured data for rich results.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import {
  WhatsAppFloat, TrustStrip,
  RedCTABand, CampaignLeadForm, FaqAccordion, WA_BASE
} from '@/components/campaign/CampaignShared';
import usePageSEO from '@/lib/usePageSEO';

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────

const FAQ_GROUPS = [
  {
    heading: 'Returns & Income',
    faqs: [
      { q: 'What ROI does Dugasta offer?', a: 'Select Dugasta projects offer up to 10% net ROI for up to 10 years, with 0% service charges. The exact terms vary by project — we will show you the contract before you commit.' },
      { q: 'Is the ROI guaranteed?', a: 'It is a contractual, projected net return on specific projects for a defined period. Like any investment it depends on the project and market, so we show you the actual terms and evidence.' },
      { q: 'Are there really 0% service charges?', a: 'Yes, on select projects — which meaningfully increases your true net yield versus standard Dubai apartments.' },
    ],
  },
  {
    heading: 'Prices & Payment',
    faqs: [
      { q: 'How much do I need to start?', a: 'Select Dugasta units start from around AED 350,000 (e.g. studios), with flexible payment plans.' },
      { q: 'What payment plans are available?', a: 'Options include staged plans such as 40/60, 30/70 and 10/50/40, with post-handover instalments on some projects.' },
      { q: 'Is there a buy-back option?', a: 'Selected projects offer a defined buy-back, giving you a clearer exit. We will confirm which projects include it.' },
    ],
  },
  {
    heading: 'Golden Visa',
    faqs: [
      { q: 'Can a Dugasta purchase get me a Golden Visa?', a: 'Yes — reach AED 2M in property value (you can combine units) and you qualify for a renewable 10-year Golden Visa for your family.' },
      { q: 'Does a payment plan still count toward the AED 2M?', a: 'As of 2025, the full DLD-registered value counts, so mortgaged and staged-payment purchases can qualify.' },
    ],
  },
  {
    heading: 'Risk & Trust',
    faqs: [
      { q: 'Is Dugasta safe? What about off-plan risk?', a: 'Off-plan in Dubai is escrow-protected and milestone-based, and we focus on connected, high-demand communities. We will share the developer track record and delivery history so you can judge for yourself.' },
      { q: 'Why should I trust RE/MAX ZAM on this?', a: 'Because we invest in it ourselves. Our founder personally owns and earns income from Dugasta projects — we recommend what we own.' },
      { q: 'What if the project is delayed?', a: 'We give you the developer delivery record up front and only recommend projects we are confident in. Escrow rules protect your staged payments.' },
    ],
  },
  {
    heading: 'Getting Started',
    faqs: [
      { q: "I'm overseas — can I buy remotely?", a: 'Yes. Most of our investors buy from abroad; we handle the process and you can sign digitally.' },
      { q: "What's the first step?", a: 'A short consultation. We learn your goals, model your returns and visa path, and show you matching Dugasta units.' },
    ],
  },
];

// ─── FAQ SCHEMA ───────────────────────────────────────────────────────────────

function FAQSchema() {
  const allFaqs = FAQ_GROUPS.flatMap(g => g.faqs);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  useEffect(() => {
    const el = document.getElementById('faq-schema');
    if (el) el.remove();
    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { const s = document.getElementById('faq-schema'); if (s) s.remove(); };
  }, []);

  return null;
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DugastaFAQ() {
  usePageSEO({
    title: 'Dugasta Properties FAQ | ROI, Payment Plans, Golden Visa & Risk | RE/MAX ZAM',
    description: 'Honest answers about Dugasta properties — up to 10% net ROI, 0% service charges, payment plans, buy-back and the Golden Visa. Trusted advice from RE/MAX ZAM.',
    canonical: 'https://remaxzam.ae/dugasta-faq',
    keywords: 'dugasta properties review, is dugasta safe, dugasta roi, dugasta payment plan, dugasta golden visa, dugasta dubai review 2025',
  });

  return (
    <div className="min-h-screen bg-white font-body">
      <FAQSchema />
      <WhatsAppFloat />

      {/* ── HERO ── */}
      <section className="pt-12 pb-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-body tracking-[0.25em] uppercase text-gray-400 mb-4">DUGASTA — HONEST ANSWERS</p>
            <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl leading-tight mb-5">
              Dugasta properties: your questions, answered straight.
            </h1>
            <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
              Everything investors ask us about Dugasta — returns, risks, payment plans and the Golden Visa. No spin. If you would rather just talk it through, we are one tap away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                Talk to an Advisor
              </a>
              <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* ── FAQ GROUPS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          {FAQ_GROUPS.map((group, gi) => (
            <motion.div
              key={group.heading}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.05 }}
              className="mb-12"
            >
              <h2 className="font-display font-black text-gray-900 text-2xl mb-2">{group.heading}</h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
                {group.faqs.map(f => <FaqAccordion key={f.q} {...f} />)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER STRIP ── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <blockquote className="font-body text-white/70 text-lg leading-relaxed italic mb-6">
            "I recommend Dugasta because I invest in it myself. Ask me anything."
          </blockquote>
          <p className="font-heading font-bold text-white/50 text-sm mb-8">— Faisal Contractor, Owner, RE/MAX ZAM</p>
          <Link to="/my-dubai-passive-income" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-heading font-semibold text-sm px-7 py-3 rounded-xl transition-colors">
            See how the founder invests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <RedCTABand heading="Still have a question? Get a straight answer from an advisor.">
        <div id="lead-form" className="max-w-md mx-auto bg-white rounded-2xl p-7 shadow-xl mb-6">
          <CampaignLeadForm dark={false} source="Bottom CTA — /dugasta-faq" ctaLabel="Talk to an Advisor" />
        </div>
        <a href={WA_BASE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-heading font-bold text-sm px-7 py-3 rounded-xl transition-colors">
          <MessageCircle className="w-4 h-4" /> WhatsApp Us
        </a>
      </RedCTABand>

    </div>
  );
}