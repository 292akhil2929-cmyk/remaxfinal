import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, MapPin, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const communities = [
  { id: 'dubai-marina', name: 'Dubai Marina', image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&q=80', yield: '6–8%', entry: 'AED 700K', avgPsf: 'AED 1,650' },
  { id: 'downtown-dubai', name: 'Downtown', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', yield: '5–7%', entry: 'AED 1.2M', avgPsf: 'AED 2,200' },
  { id: 'palm-jumeirah', name: 'Palm Jumeirah', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', yield: '5–7%', entry: 'AED 1.5M', avgPsf: 'AED 2,800' },
  { id: 'business-bay', name: 'Business Bay', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80', yield: '6–8%', entry: 'AED 600K', avgPsf: 'AED 1,480' },
];

function CommunityCard({ area, isSelected, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg cursor-pointer group border-2 transition-all ${isSelected ? 'border-accent' : 'border-border'}`}
      whileHover={{ scale: 1.02 }}
    >
      <img src={area.image} alt={area.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
        <div>
          <h3 className="text-white font-display font-black text-base">{area.name}</h3>
          <p className="text-accent font-heading font-bold text-xs mt-0.5">{area.yield} yield</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CommunityGuidesSection() {
  const [selected, setSelected] = useState(communities[0].id);
  const area = communities.find(c => c.id === selected);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
         <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-2">Top Communities</h2>
          <p className="text-base text-gray-300 font-body">Click to explore investment metrics</p>
         </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {communities.map(c => (
            <CommunityCard key={c.id} area={c} isSelected={selected === c.id} onClick={() => setSelected(c.id)} />
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={selected} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-slate-800 border border-slate-700 rounded-lg p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Stats */}
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-300 font-body leading-relaxed">{area.name} combines premium ROI potential with proven infrastructure and strong rental demand.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Yield', value: area.yield, icon: TrendingUp },
                { label: 'From', value: area.entry, icon: MapPin },
                { label: '/sqft', value: area.avgPsf, icon: Home },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-4 h-4 text-accent mx-auto mb-2" />
                  <p className="text-xs text-gray-400 font-body mb-1">{label}</p>
                  <p className="text-base font-heading font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}