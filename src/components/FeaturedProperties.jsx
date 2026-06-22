import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PropertyCard from './PropertyCard';
import { motion } from 'framer-motion';

export default function FeaturedProperties() {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => base44.entities.Property.filter({ featured: true }, '-created_date', 6),
  });

  // Exclude pocket listings from public featured section
  const visibleProperties = properties.filter((p) => !p.isPocketListing);

  if (isLoading) {
    return (
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B87333]" />
              <span className="text-xs font-heading font-bold text-[#B87333] tracking-widest uppercase">Featured</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white">Premium Listings</h2>
          </div>
          <Button variant="ghost" className="text-white hover:text-[#B87333] font-heading font-bold text-sm shrink-0" asChild>
            <Link to="/properties">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </motion.div>

        {/* Properties Grid */}
        {visibleProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {visibleProperties.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-300 font-body text-sm mb-3">Premium properties coming soon.</p>
            <Button className="bg-[#B87333] hover:bg-[#A86228] text-white font-heading font-bold text-sm" asChild>
              <Link to="/contact">Get Early Access</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}