import LeadCaptureForm from './LeadCaptureForm';
import { motion } from 'framer-motion';

export default function CTASection({ image }) {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-black to-slate-950 relative overflow-hidden">
      <div className="absolute -top-40 left-1/3 w-80 h-80 bg-[#B87333]/20 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-4">
              Get Your Investment Strategy
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-body leading-relaxed mb-6">
              Free consultation with our senior advisors. We'll analyze your goals and create a tailored Dubai property plan.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20">
              <img src={image} alt="Dubai luxury" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] border border-white/20 rounded-lg p-6 backdrop-blur-xl h-fit"
          >
            <h3 className="text-2xl font-display font-black text-white mb-2">Free Consultation</h3>
            <p className="text-xs text-gray-400 font-body mb-6">We'll get back to you within 24 hours with personalized advice.</p>
            <LeadCaptureForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}