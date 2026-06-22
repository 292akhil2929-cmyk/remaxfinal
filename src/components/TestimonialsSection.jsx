import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'James H.', country: 'UK', text: 'Found me two off-plan units in Marina before public market. Both up 35%. Institutional-grade team.' },
  { name: 'Sophie C.', country: 'SG', text: 'First-time buyer from Singapore. Team guided every step. Now generating 6.8% yield.' },
  { name: 'Arjun M.', country: 'India', text: 'Got my villa and Golden Visa sorted. Family now has 10-year UAE residency.' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden">
      <div className="absolute -top-40 left-20 w-80 h-80 bg-[#B87333]/20 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-3">What Investors Say</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className="w-4 h-4 text-[#B87333] fill-[#B87333]" />
            ))}
          </div>
          <p className="text-sm text-gray-400 font-body">4.9 / 5 · 340+ reviews</p>
        </motion.div>

        {/* Grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#B87333]/50 transition-all"
            >
              <Quote className="w-4 h-4 text-[#B87333] mb-3" />
              <p className="text-sm text-gray-300 font-body leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <p className="font-heading font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 font-body">{t.country}</p>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-3 h-3 text-[#B87333] fill-[#B87333]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}