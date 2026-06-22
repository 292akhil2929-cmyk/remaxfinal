import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Zap, Users, Globe, DollarSign, ArrowRight, Award, BookOpen, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const brandStats = [
  { value: '145,000+', label: 'Agents Globally' },
  { value: '110+', label: 'Countries' },
  { value: '50+', label: 'Years' },
  { value: '#1', label: 'Most Trusted*' },
];

const benefits = [
  {
    icon: Globe,
    title: 'Work Under the World\'s #1 Brand',
    desc: 'Your clients already know RE/MAX before you introduce yourself. Open doors that no local brokerage can — backed by a brand recognised across 110+ countries.',
  },
  {
    icon: TrendingUp,
    title: 'Global Referral Income',
    desc: 'Tap into a pipeline of 145,000 RE/MAX agents worldwide. International investors referred to Dubai come to you first — not your competitors.',
  },
  {
    icon: BookOpen,
    title: 'RE/MAX University',
    desc: 'World-class on-demand training, certifications, and professional development that elevates your credibility and closes more deals.',
  },
  {
    icon: Zap,
    title: 'MAXTech & AI Tools',
    desc: 'Access BoldTrail CRM, personal agent websites, AI lead scoring, and smart marketing tools — technology most Dubai brokerages simply can\'t match.',
  },
  {
    icon: DollarSign,
    title: 'Premium Commission Splits',
    desc: 'Industry-leading commission structure with complete transparency. No hidden fees. Your earnings, maximised.',
  },
  {
    icon: Award,
    title: 'RE/MAX Awards & Recognition',
    desc: 'Earn globally-recognised production awards that set you apart from every other Dubai agent — the RE/MAX Hall of Fame, Platinum Club, and more.',
  },
];

const comparisons = [
  { point: 'Brand recognition in 110+ countries', remax: true, local: false },
  { point: 'Cross-border referral network (145K agents)', remax: true, local: false },
  { point: 'On-demand global training (RE/MAX University)', remax: true, local: false },
  { point: 'Internationally recognised agent awards', remax: true, local: false },
  { point: 'AI-powered CRM & tech platform (MAXTech)', remax: true, local: false },
  { point: 'RERA licensed & compliant', remax: true, local: true },
  { point: 'Local Dubai market expertise', remax: true, local: true },
];

export default function JoinUs() {
  return (
    <div className="min-h-screen">

      {/* Hero — dark navy */}
      <section className="bg-[#0d1b3e] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#c9a84c] font-heading font-semibold text-sm tracking-widest uppercase mb-3">JOIN RE/MAX Zam DUBAI</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-white leading-tight mb-5">
            Build Your Career Under<br />
            <span className="text-[#c9a84c]">The World's Most Trusted</span> Real Estate Brand
          </h1>
          <p className="text-white/65 font-body text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            In Dubai's crowded real estate market, the agents who win are the ones backed by a name clients already trust globally. 
            That name is RE/MAX — and RE/MAX Zam brings it to Dubai.
          </p>

          {/* Brand stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {brandStats.map(({ value, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-2xl lg:text-3xl font-display font-black text-[#c9a84c] mb-1">{value}</p>
                <p className="text-white/60 font-body text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RE/MAX ZAM beats local brokerages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-semibold text-primary tracking-widest mb-2 uppercase">The RE/MAX Difference</p>
            <h2 className="text-2xl lg:text-4xl font-display font-bold text-foreground">
              Why Top Dubai Agents Choose RE/MAX Zam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="max-w-2xl mx-auto mb-4">
            <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">RE/MAX Zam vs. Local Brokerage</h3>
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="grid grid-cols-3 bg-[#0d1b3e] text-white text-sm font-heading font-semibold">
                <div className="p-4 col-span-1">What You Get</div>
                <div className="p-4 text-center text-[#c9a84c]">RE/MAX Zam</div>
                <div className="p-4 text-center text-white/50">Local Brokerage</div>
              </div>
              {comparisons.map(({ point, remax, local }, i) => (
                <div key={point} className={`grid grid-cols-3 text-sm border-t border-border/50 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                  <div className="p-4 font-body text-foreground col-span-1">{point}</div>
                  <div className="p-4 text-center">{remax ? <span className="text-emerald-500 font-bold text-base">✓</span> : <span className="text-destructive/40">✗</span>}</div>
                  <div className="p-4 text-center">{local ? <span className="text-emerald-500 font-bold text-base">✓</span> : <span className="text-destructive/40">✗</span>}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">* RE/MAX voted Most Trusted Real Estate Brand — independent survey. Stats as of 2025.</p>
          </div>
        </div>
      </section>

      {/* Testimonial / pull quote */}
      <section className="bg-[#0d1b3e]/5 border-y border-border/50 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="w-8 h-8 text-[#c9a84c] mx-auto mb-4" />
          <p className="text-xl lg:text-2xl font-heading font-semibold text-foreground italic leading-relaxed mb-4">
            "When I tell a client I'm with RE/MAX, half the conversation is already done. They know the brand. 
            They trust it. In Dubai's market, that brand recognition is worth more than any commission split."
          </p>
          <p className="text-sm font-body text-muted-foreground">— RE/MAX Zam Agent, Dubai</p>
        </div>
      </section>

      {/* CTA — Apply to Join */}
      <section className="py-20 bg-[#0d1b3e]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#c9a84c] font-heading font-semibold text-sm tracking-widest uppercase mb-3">Apply Now</p>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">Ready to Join RE/MAX Zam Dubai?</h2>
          <p className="text-white/60 font-body text-base mb-8 leading-relaxed">
            Complete our comprehensive application form and our recruitment team will review your profile within 48 hours.
          </p>
          <Link to="/apply">
            <Button className="bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-[#0d1b3e] font-heading font-bold text-base px-10 py-6 border-0">
              Apply to Join <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}