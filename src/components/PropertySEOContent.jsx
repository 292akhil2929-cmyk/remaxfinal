import { Link } from 'react-router-dom';
import { CheckCircle2, TrendingUp, Building2, Globe, Shield, Landmark } from 'lucide-react';
import { Button } from "@/components/ui/button";

const investorFaqs = [
  {
    q: 'Can foreigners buy property in Dubai?',
    a: 'Yes. Dubai is one of the most open real estate markets in the world. Foreign nationals can purchase freehold properties in designated areas including Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, and over 60 other prime locations — with full ownership rights and no restrictions on repatriation of funds or rental income.'
  },
  {
    q: 'What is the expected rental yield on Dubai property?',
    a: 'Dubai consistently delivers among the highest rental yields globally, averaging 6–10% per annum depending on location, property type, and management. Emerging areas like Jumeirah Village Circle (JVC) and Dubai South are recording yields above 8%, while prime zones like Downtown and Marina average 5–7% for capital-appreciation-led investors.'
  },
  {
    q: 'Are there taxes on Dubai real estate investment?',
    a: 'Dubai levies zero income tax, zero capital gains tax, and zero inheritance tax on real estate investments. The only transactional cost is a one-time 4% Dubai Land Department (DLD) transfer fee on purchase. This makes Dubai one of the most tax-efficient real estate markets globally for international investors.'
  },
  {
    q: 'What is the Dubai Golden Visa through property investment?',
    a: 'Investors who purchase property worth AED 2 million or more (approximately USD 545,000) are eligible for the UAE 10-year Golden Visa. This grants you and your family long-term UAE residency — including the right to live, work, and study in the UAE without a local sponsor. Off-plan purchases from approved developers also qualify.'
  },
  {
    q: 'How does the off-plan property payment plan work in Dubai?',
    a: 'Dubai\'s off-plan market offers highly attractive developer payment plans — typically 20–30% on booking, with the remainder spread across construction milestones and even post-handover. This allows investors to control a high-value asset with significantly less upfront capital, amplifying returns on investment.'
  },
];

const stats = [
  { value: '0%', label: 'Capital Gains Tax' },
  { value: '7–10%', label: 'Average Rental Yield' },
  { value: 'AED 2M+', label: 'Golden Visa Threshold' },
  { value: '#1', label: 'Most Visited City 2024' },
];

const areas = [
  { name: 'Downtown Dubai', desc: 'World-famous skyline, Burj Khalifa views, premium yields of 5–7%', tag: 'Trophy Asset' },
  { name: 'Dubai Marina', desc: 'Waterfront lifestyle, high rental demand, 6–8% yields, strong expat tenant base', tag: 'High Yield' },
  { name: 'Palm Jumeirah', desc: 'Iconic ultra-luxury island, global prestige, strong capital appreciation', tag: 'Luxury' },
  { name: 'Business Bay', desc: 'Central business district, mixed-use, high occupancy rates and corporate tenants', tag: 'Growth Zone' },
  { name: 'Dubai Hills Estate', desc: 'Green master-planned community, premium villas, family-friendly with strong ROI', tag: 'Family Living' },
  { name: 'Jumeirah Village Circle', desc: 'Fastest-growing affordable investment zone, 8–10% yields, high appreciation potential', tag: 'Best Value' },
];

export default function PropertySEOContent() {
  return (
    <div className="border-t border-border/50">

      {/* Investment Stats Strip */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-3xl font-display font-black text-white mb-1">{s.value}</p>
                <p className="text-xs font-body text-white/70 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why International Investors Choose Dubai */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-heading font-semibold text-primary tracking-widest mb-3 uppercase">Why Dubai</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Why International Investors Are Choosing Dubai Real Estate in 2025
            </h2>
            <p className="text-base text-muted-foreground font-body leading-relaxed">
              Dubai has firmly established itself as the world's premier destination for real estate investment. With record-breaking transaction volumes, tax-free returns, and a rapidly growing population of 3.6 million — the fundamentals have never been stronger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Zero Tax Environment', desc: 'No capital gains tax, no income tax, no inheritance tax. Keep 100% of your rental income and property appreciation.' },
              { icon: TrendingUp, title: '7–10% Rental Yields', desc: 'Dubai delivers 3x the rental yields of London, New York, or Singapore — with a growing population driving consistent tenant demand.' },
              { icon: Landmark, title: 'Golden Visa Residency', desc: 'Invest AED 2M+ and secure a 10-year UAE Golden Visa for you and your family, with full rights to live and work in the UAE.' },
              { icon: Building2, title: 'World-Class Developers', desc: 'Buy direct from EMAAR, DAMAC, Nakheel, and Meraas — globally recognised developers with proven track records and strong resale markets.' },
              { icon: Globe, title: 'Safe Haven Currency', desc: 'The UAE Dirham is pegged to the US Dollar at AED 3.67, eliminating currency risk for USD, GBP, EUR, and INR investors.' },
              { icon: CheckCircle2, title: 'RERA-Regulated Market', desc: 'The Dubai Land Department (DLD) and RERA provide investor protections, escrow requirements, and transparent title deed issuance for every transaction.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-border/50 rounded-lg hover:border-primary/30 transition-colors">
                <Icon className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Guides */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-heading font-semibold text-primary tracking-widest mb-3 uppercase">Area Guides</p>
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Best Areas to Buy Property in Dubai</h2>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              From iconic waterfront developments to emerging investment corridors — RE/MAX Zam covers every key district across Dubai and the wider UAE.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map(a => (
              <div key={a.name} className="bg-background border border-border/50 rounded-lg p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">{a.name}</h3>
                  <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-accent/10 text-accent whitespace-nowrap">{a.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — SEO rich text */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-heading font-semibold text-primary tracking-widest mb-3 uppercase">FAQs</p>
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">Frequently Asked Questions — Buying Property in Dubai</h2>
            <p className="text-sm text-muted-foreground font-body">Everything international investors need to know before investing in Dubai real estate.</p>
          </div>
          <div className="space-y-6">
            {investorFaqs.map(({ q, a }) => (
              <div key={q} className="border-b border-border/50 pb-6">
                <h3 className="font-heading font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Ready to Invest in Dubai Real Estate?</h2>
          <p className="text-white/75 font-body mb-7 text-sm leading-relaxed">
            RE/MAX Zam's expert team helps international investors identify, acquire, and maximise returns from Dubai's most lucrative property opportunities. Book a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-heading font-bold border-0" asChild>
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-heading" asChild>
              <Link to="/apply">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}