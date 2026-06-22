import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '145K+', label: 'Agents' },
  { icon: Globe, value: '110+', label: 'Countries' },
  { icon: Award, value: '50+', label: 'Years' },
  { icon: TrendingUp, value: '#1', label: 'Trusted' },
];

export default function GlobalNetworkSection() {
  return (
    <section className="py-16 lg:py-20 bg-foreground relative overflow-hidden">
      <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-3">
            Global Network
          </h2>
          <p className="text-base text-gray-300 font-body max-w-2xl mx-auto">
            145K+ RE/MAX agents worldwide connecting international investors to premium Dubai properties.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(({ icon: Icon, value, label }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-center hover:border-accent/50 hover:bg-white/15 transition-all duration-300"
            >
              <Icon className="w-7 h-7 text-accent mx-auto mb-3" />
              <p className="text-3xl font-display font-black text-white">{value}</p>
              <p className="text-sm text-gray-300 font-body mt-2">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="bg-white/10 backdrop-blur-md border border-accent/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-black text-white text-base mb-1">Ready to leverage global expertise?</p>
            <p className="text-sm text-gray-300 font-body">Get a free investment strategy tailored to your goals.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white font-heading font-bold text-base shrink-0 border-0" asChild>
            <Link to="/contact">Get Advice <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}