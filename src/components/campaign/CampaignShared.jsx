/**
 * Shared components for the Dubai Wealth Engine campaign landing pages.
 * Used by: /10-net-roi-dubai-property, /dubai-golden-visa-property,
 *          /dubai-property-investment, /my-dubai-passive-income, /dugasta-faq
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhoneInput from '@/components/PhoneInput';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { sendLeadToBitrix } from '@/lib/bitrix';
import { trackLeadEvent } from '@/lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

export const WA_NUMBER = '97145828158';
export const WA_BASE = `https://wa.me/${WA_NUMBER}?text=Hi%20RE%2FMAX%20ZAM%2C%20I%27m%20interested%20in%20Dubai%20property%20investment.%20Can%20you%20help%3F`;

// ─── UTM CAPTURE ─────────────────────────────────────────────────────────────

export function getUTMParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_content: p.get('utm_content') || '',
    utm_term: p.get('utm_term') || '',
    gclid: p.get('gclid') || '',
    fbclid: p.get('fbclid') || '',
    page_url: window.location.href,
  };
}

// ─── TRUST STRIP ─────────────────────────────────────────────────────────────

export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 px-4 bg-gray-50 border-y border-gray-200 text-xs font-body text-gray-500">
      <span className="flex items-center gap-1.5"><span className="text-black font-bold">✦</span> RE/MAX — world's most recognised real estate brand</span>
      <span className="hidden sm:block text-gray-300">|</span>
      <span className="flex items-center gap-1.5"><span className="text-black font-bold">✦</span> 6–9% tax-free Dubai yields</span>
      <span className="hidden sm:block text-gray-300">|</span>
      <span className="flex items-center gap-1.5"><span className="text-black font-bold">✦</span> Founder-invested in Dubai property</span>
    </div>
  );
}

// ─── CAMPAIGN HEADER ─────────────────────────────────────────────────────────

export function CampaignHeader({ ctaLabel = 'Book a Consultation', ctaHref = '#lead-form' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: '10% ROI', href: '/10-net-roi-dubai-property' },
    { label: 'Golden Visa', href: '/dubai-golden-visa-property' },
    { label: 'Passive Income', href: '/dubai-property-investment' },
    { label: 'Why Dugasta', href: '/dugasta-faq' },
    { label: 'Founder Story', href: '/my-dubai-passive-income' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Back to main site */}
      <div className="bg-black/90 backdrop-blur-sm px-5 lg:px-10 py-1.5 flex items-center">
        <Link to="/" className="flex items-center gap-1.5 text-white/50 hover:text-white/80 text-[11px] font-body transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to RE/MAX ZAM
        </Link>
      </div>
    <header className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16">
        <Link to="/">
          <img src="https://media.base44.com/images/public/6a16b586e769393fe031b9fd/202b99f88_RemaxZamLogo.webp" alt="RE/MAX ZAM" className="h-9 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} to={l.href} className="text-xs font-body text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={ctaHref} className="hidden sm:inline-flex items-center gap-1.5 bg-black hover:bg-gray-900 text-white font-heading font-bold text-xs tracking-wide px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
            {ctaLabel}
          </a>
          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-1.5 text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3">
          {links.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-body text-gray-500 hover:text-gray-900 py-1">{l.label}</Link>
          ))}
          <a href={ctaHref} className="block w-full mt-3 bg-black text-white font-heading font-bold text-xs text-center py-3 rounded-xl">{ctaLabel}</a>
        </div>
      )}
    </header>
    </div>
  );
}

// ─── WHATSAPP FLOAT ───────────────────────────────────────────────────────────

export function WhatsAppFloat({ message }) {
  const href = message
    ? `https://wa.me/${WA_NUMBER}?text=${message}`
    : WA_BASE;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadEvent('whatsapp', { source: 'Campaign Float' })}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

// ─── CAMPAIGN FOOTER ─────────────────────────────────────────────────────────

export function CampaignFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img src="https://media.base44.com/images/public/6a16b586e769393fe031b9fd/202b99f88_RemaxZamLogo.webp" alt="RE/MAX ZAM" className="h-10 w-auto object-contain mb-4 brightness-0 invert" />
          <p className="text-white/50 font-body text-xs leading-relaxed">Dubai's trusted investment real estate advisory. Maximisation of Your Investment.</p>
        </div>
        <div>
          <p className="font-heading font-bold text-sm mb-4">Quick Links</p>
          <div className="space-y-2">
            {[['10% ROI', '/10-net-roi-dubai-property'], ['Golden Visa', '/dubai-golden-visa-property'], ['Invest in Dubai', '/dubai-property-investment'], ['Founder Story', '/my-dubai-passive-income'], ['FAQ', '/dugasta-faq'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={h} to={h} className="block text-xs text-white/40 hover:text-white/80 font-body transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-heading font-bold text-sm mb-4">RE/MAX ZAM, Dubai UAE</p>
          <p className="text-white/40 font-body text-xs leading-relaxed mb-3">Bay View Tower, Office 1102, Dubai</p>
          <p className="text-white/40 font-body text-xs">+97145828158 · info@remaxzam.ae</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 lg:px-10 py-5">
        <p className="text-white/25 font-body text-[10px] leading-relaxed max-w-4xl mx-auto text-center">
          Returns shown are projected, not guaranteed, and depend on market conditions. RE/MAX ZAM is a licensed Dubai real estate brokerage. This is not financial advice. RERA Licensed. © {new Date().getFullYear()} RE/MAX ZAM. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── LEAD FORM ────────────────────────────────────────────────────────────────

export function CampaignLeadForm({ dark = false, source = 'Campaign', ctaLabel = 'Book a Free Consultation', compact = false }) {
  const [submitted, setSubmitted] = useState(false);
  const utms = getUTMParams();

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', phone_country_code: '+971', country: '', investment_budget: '', primary_goal: '',
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = { ...data, ...utms, lead_type: 'Investor', source, phone: `${data.phone_country_code}${data.phone}` };
      const res = await base44.functions.invoke('createLead', payload);
      try {
        await sendLeadToBitrix({ title: `${source} Lead`, ...data, source });
      } catch (e) { console.error('Bitrix forward failed', e); }
      return res;
    },
    onSuccess: () => {
      setSubmitted(true);
      trackLeadEvent('form_submission', { lead_type: 'Investor', source, form_id: 'lead-form' });
    },
  });

  const base = dark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11'
    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11';

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${dark ? 'bg-emerald-500/20' : 'bg-emerald-50'}`}>
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <div>
          <p className={`font-heading font-bold text-lg mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>Thank you!</p>
          <p className={`font-body text-sm ${dark ? 'text-white/50' : 'text-gray-500'}`}>An advisor will WhatsApp you within minutes.</p>
        </div>
        <a
          href={WA_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-heading font-bold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form
      id="lead-form"
      onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}
      className="space-y-3"
    >
      <Input placeholder="Full Name *" required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className={base} />
      <Input placeholder="Email Address *" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={base} />
      <PhoneInput
        value={form.phone}
        countryCode={form.phone_country_code}
        onChange={v => setForm({ ...form, phone: v })}
        onCountryChange={v => setForm({ ...form, phone_country_code: v })}
        dark={dark}
      />
      {!compact && (
        <>
          <Select value={form.country} onValueChange={v => setForm({ ...form, country: v })}>
            <SelectTrigger className={base}><SelectValue placeholder="Country / Market" /></SelectTrigger>
            <SelectContent>
              {['UAE', 'India', 'UK', 'Saudi Arabia', 'Qatar', 'Other'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={form.investment_budget} onValueChange={v => setForm({ ...form, investment_budget: v })}>
            <SelectTrigger className={base}><SelectValue placeholder="Investment Budget" /></SelectTrigger>
            <SelectContent>
              {['Under AED 500K', 'AED 500K–1M', 'AED 1M–2M', 'AED 2M+'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={form.primary_goal} onValueChange={v => setForm({ ...form, primary_goal: v })}>
            <SelectTrigger className={base}><SelectValue placeholder="Primary Goal" /></SelectTrigger>
            <SelectContent>
              {['Passive Income', 'Golden Visa', 'Capital Growth'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </>
      )}
      <Button type="submit" disabled={mutation.isPending} className="w-full h-12 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm tracking-wide rounded-xl transition-colors">
        {mutation.isPending ? 'Sending…' : ctaLabel} {!mutation.isPending && <ArrowRight className="w-4 h-4 ml-1" />}
      </Button>
      <p className={`text-[10px] font-body text-center ${dark ? 'text-white/25' : 'text-gray-400'}`}>No spam. A senior advisor contacts you directly.</p>
    </form>
  );
}

// ─── FAQ ACCORDION ITEM ───────────────────────────────────────────────────────

export function FaqAccordion({ q, a, dark = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${dark ? 'border-white/10' : 'border-gray-100'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className={`font-heading font-bold text-sm leading-snug ${dark ? 'text-white' : 'text-gray-900'}`}>{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${dark ? 'text-white/40' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className={`pb-5 text-sm font-body leading-relaxed ${dark ? 'text-white/50' : 'text-gray-500'}`}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FOUNDER STRIP ────────────────────────────────────────────────────────────

export function FounderStrip({ linkLabel = 'See how the founder invests', linkHref = '/my-dubai-passive-income' }) {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <blockquote className="font-body text-white/70 text-lg leading-relaxed italic mb-6">
          "I don't just sell Dubai real estate — I live off the passive income mine generates. I'll show you the exact numbers."
        </blockquote>
        <p className="font-heading font-bold text-white/50 text-sm mb-8">— Faisal Contractor, Owner, RE/MAX ZAM</p>
        <Link to={linkHref} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-heading font-bold text-sm px-7 py-3 rounded-xl transition-colors">
          {linkLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── DARK CTA BAND ────────────────────────────────────────────────────────────

export function RedCTABand({ heading, children }) {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-5 lg:px-10 text-center">
        <h2 className="font-display font-black text-white text-3xl sm:text-4xl leading-tight mb-10">{heading}</h2>
        {children}
      </div>
    </section>
  );
}
