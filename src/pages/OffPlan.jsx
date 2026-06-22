import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, CheckCircle2, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackLeadEvent } from '@/lib/analytics';
import usePageSEO from '@/lib/usePageSEO';

const projects = [
  {
    id: 1,
    name: 'EMAAR The Heights',
    developer: 'EMAAR Properties',
    community: 'Dubai Hills Estate',
    type: 'Apartments & Townhouses',
    priceFrom: 'AED 1.3M',
    handover: 'Q4 2027',
    paymentPlan: '80/20 Post-Handover',
    expectedROI: '7–9%',
    status: 'Launching Soon',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/bf81c74e4_generated_image.png',
    highlights: ['Direct golf course views', 'EMAAR payment plan', '10 minutes to Downtown'],
    tag: 'Hot Launch',
  },
  {
    id: 2,
    name: 'Sobha Seahaven Tower B',
    developer: 'Sobha Realty',
    community: 'Dubai Harbour',
    type: 'Ultra-Luxury Apartments',
    priceFrom: 'AED 2.8M',
    handover: 'Q2 2026',
    paymentPlan: '60/40',
    expectedROI: '6–8%',
    status: 'Available',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/7201f8b06_generated_image.png',
    highlights: ['Palm & Marina sea views', 'Private beach access', 'Ultra-luxury finish'],
    tag: 'Sea View',
  },
  {
    id: 3,
    name: 'DAMAC Lagoons — Morocco',
    developer: 'DAMAC Properties',
    community: 'DAMAC Lagoons',
    type: 'Townhouses & Villas',
    priceFrom: 'AED 1.1M',
    handover: 'Q3 2027',
    paymentPlan: '70/30',
    expectedROI: '8–10%',
    status: 'Available',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/e60f463ab_generated_image.png',
    highlights: ['Crystal lagoon community', 'Private beach on your doorstep', 'Flexible 70/30 plan'],
    tag: 'Best Value',
  },
  {
    id: 4,
    name: 'Nakheel Rixos Dubai Islands',
    developer: 'Nakheel & Rixos',
    community: 'Dubai Islands',
    type: 'Branded Residences',
    priceFrom: 'AED 3.5M',
    handover: 'Q1 2027',
    paymentPlan: '50/50',
    expectedROI: '7–9%',
    status: 'Limited Units',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/60f40d955_generated_image.png',
    highlights: ['Rixos hotel management', 'Guaranteed rental programme', 'Dubai Islands beachfront'],
    tag: 'Branded',
  },
  {
    id: 5,
    name: 'Ellington The Highbury',
    developer: 'Ellington Properties',
    community: 'Mohammed Bin Rashid City',
    type: 'Boutique Apartments',
    priceFrom: 'AED 900K',
    handover: 'Q2 2026',
    paymentPlan: '60/40',
    expectedROI: '7–9%',
    status: 'Available',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/19b7c4754_generated_image.png',
    highlights: ['Design-led boutique project', 'MBR City park views', 'Strong resale market'],
    tag: 'Boutique',
  },
  {
    id: 6,
    name: 'Aldar Athlon',
    developer: 'Aldar Properties',
    community: 'Dubailand',
    type: 'Villas & Townhouses',
    priceFrom: 'AED 1.7M',
    handover: 'Q4 2027',
    paymentPlan: '75/25 Post-Handover',
    expectedROI: '6–8%',
    status: 'Available',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/de85c8b28_generated_image.png',
    highlights: ['Aldar quality in Dubai', 'Sports & wellness focus', 'Family community'],
    tag: 'Family Living',
  },
];

const statusColors = {
  'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Limited Units': 'bg-amber-50 text-amber-700 border-amber-200',
  'Launching Soon': 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function OffPlan() {
  usePageSEO({
    title: 'Off-Plan Properties in Dubai | RE/MAX Zam',
    description: "Browse Dubai's best off-plan projects with flexible payment plans and strong capital growth. RE/MAX Zam advisors help you buy direct from top developers.",
    canonical: 'https://remaxzam.ae/off-plan',
  });

  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-gray-400 tracking-widest mb-3 uppercase">New Launches</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Off-Plan Projects in Dubai</h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            First-access to Dubai's most sought-after off-plan launches — handpicked by RE/MAX Zam analysts for developer credibility, location fundamentals, and projected returns. Prices start from AED 900K with flexible payment plans.
          </p>
          <div className="flex flex-wrap gap-2">
            {['all', 'Available', 'Limited Units', 'Launching Soon'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-colors ${
                  filter === f ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'
                }`}
              >
                {f === 'all' ? 'All Projects' : f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors group">
                <div className="relative aspect-video overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-heading font-bold px-2 py-1 rounded bg-black text-white">{p.tag}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-heading font-bold px-2 py-1 rounded border ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-bold text-gray-900 mb-0.5">{p.name}</h3>
                  <p className="text-xs text-gray-500 font-body mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {p.community}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-body">
                    <div>
                      <p className="text-gray-500 mb-0.5">From</p>
                      <p className="font-heading font-black text-gray-900">{p.priceFrom}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Handover</p>
                      <p className="font-heading font-bold text-gray-900 flex items-center gap-1"><Calendar className="w-3 h-3" />{p.handover}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Payment Plan</p>
                      <p className="font-heading font-bold text-gray-900">{p.paymentPlan}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Expected ROI</p>
                      <p className="font-heading font-bold text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{p.expectedROI}</p>
                    </div>
                  </div>

                  <ul className="space-y-1 mb-4">
                    {p.highlights.map(h => (
                      <li key={h} className="flex items-center gap-1.5 text-xs text-gray-500 font-body">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Link to="/contact" className="flex-1 inline-flex items-center justify-center bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm py-2 px-3 rounded-lg transition-colors">
                      Request Brochure
                    </Link>
                    <a
                      href={`https://wa.me/97145828158?text=Hi, I'm interested in ${encodeURIComponent(p.name)} — can an agent assist me?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackLeadEvent('whatsapp', { source: 'OffPlan' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-xs font-heading font-bold shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Agent
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Off-Plan */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-display font-black text-gray-900 mb-3">Why Invest in Dubai Off-Plan Property?</h2>
            <p className="text-sm text-gray-500 font-body max-w-xl mx-auto">Off-plan properties offer the highest potential returns in the Dubai market — here is why investors worldwide prefer buying before completion.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Lower Entry Price', desc: 'Buy at launch prices typically 15–30% below post-handover market value — maximising capital appreciation from day one.' },
              { title: 'Flexible Payment Plans', desc: 'Pay in installments over 2–5 years, often with 0% interest. Post-handover plans let you move in while continuing to pay.' },
              { title: 'First Mover Advantage', desc: 'Early investors in master-planned communities consistently see the strongest price growth as infrastructure and amenities develop.' },
              { title: 'Developer Guarantees', desc: "Dubai's RERA escrow laws require developers to hold buyer funds in regulated accounts — protecting your investment throughout construction." },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5">
                <h4 className="font-heading font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Get First Access to New Launches</h2>
          <p className="text-white/75 font-body mb-7 text-sm">Register with RE/MAX Zam to receive off-plan launch alerts, exclusive pre-launch pricing, and developer EOI invitations before they hit the public market.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-heading font-bold px-6 py-3 rounded-xl transition-colors">
            Register for Launch Alerts <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
