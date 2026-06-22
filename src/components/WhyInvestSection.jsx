import { motion } from 'framer-motion';
import { PiggyBank, Landmark, Building2, Sun, Plane, FileCheck } from 'lucide-react';

const reasons = [
  { icon: PiggyBank, title: '0% Tax', desc: 'Tax-free capital gains and rental income.' },
  { icon: Landmark, title: 'Golden Visa', desc: 'Residency via AED 2M+ property investment.' },
  { icon: Building2, title: 'Infrastructure', desc: 'World-class development and connectivity.' },
  { icon: Sun, title: '8.5% Yield', desc: 'Consistent rental income potential.' },
  { icon: Plane, title: 'Global Hub', desc: '4-hour flight to 1/3 of world population.' },
  { icon: FileCheck, title: 'RERA Regulated', desc: 'Full transparency and investor protection.' },
];

export default function WhyInvestSection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-4">
            Why Dubai Real Estate?
          </h2>
          <p className="text-base text-gray-300 font-body max-w-2xl mx-auto">
            Six compelling reasons to invest in Dubai properties.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group p-7 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors mb-4">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-display font-black text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400 font-body leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}