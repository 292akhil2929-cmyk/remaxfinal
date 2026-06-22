import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Search, Handshake } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PROCESS_STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Understand Your Goals',
    description: 'We listen to your investment objectives, budget, timeline, and risk tolerance to create a personalized strategy.',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: TrendingUp,
    step: '02',
    title: 'Market Research & Analysis',
    description: 'Our expert team analyzes Dubai\'s real estate trends, identifies high-ROI zones, and uncovers emerging opportunities.',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: CheckCircle2,
    step: '03',
    title: 'Curated Property Selection',
    description: 'We shortlist only the best-performing assets tailored to your needs—no noise, only validated opportunities.',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Handshake,
    step: '04',
    title: 'End-to-End Guidance',
    description: 'From purchase to exit strategy, we provide seamless support to ensure a smooth and profitable journey.',
    color: 'bg-purple-500/10 text-purple-600',
  },
];

export default function HowWeWork() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs font-heading font-semibold text-primary tracking-widest uppercase mb-3">Our Process</p>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-foreground leading-tight mb-4">
            How We Build Your Investment Strategy
          </h2>
          <p className="text-base text-muted-foreground font-body leading-relaxed">
            Our systematic approach removes guesswork and puts data-driven insights at the center of every decision. Here's how we work with you.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                {/* Step Number Badge */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-4`}>
                  <span className="text-sm font-heading font-bold">{item.step}</span>
                </div>

                {/* Icon */}
                <Icon className={`w-8 h-8 mb-4 ${item.color.split(' ')[1]}`} />

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{item.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>

                {/* Connector Line (desktop only) */}
                {idx < PROCESS_STEPS.length - 1 && idx % 2 === 0 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-foreground to-foreground/80 rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-display font-bold mb-3">
            Ready to Start Your Investment Journey?
          </h3>
          <p className="text-white/75 font-body text-base max-w-lg mx-auto mb-8">
            Schedule a free consultation with one of our advisors. We'll walk through your goals and show you how to build a profitable Dubai real estate portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 font-heading font-bold border-0" asChild>
              <Link to="/contact">Schedule Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-heading" asChild>
              <Link to="/team">Meet Our Team</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}