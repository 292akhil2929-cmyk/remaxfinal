import { useAudience } from '@/lib/AudienceContext';
import { motion } from 'framer-motion';

const OPTIONS = [
  { id: 'investor', label: 'Invest', sublabel: 'Buy or off-plan' },
  { id: 'seller', label: 'Sell', sublabel: 'Get a valuation' },
  { id: 'agent', label: 'Join as an Agent', sublabel: 'Join the network' },
];

export default function AudienceSelector() {
  const { audience, selectAudience } = useAudience();

  return (
    /* ── OUTER CONTAINER: Closed top padding completely to remove top gap ── */
    <div className="bg-white px-4 lg:px-5 pt-0 pb-0 box-border">
      
      {/* ── INTERNAL CANVAS: Complete frame border on all sides ── */}
      <div className="bg-zinc-950 rounded-2xl border border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center h-14 gap-1">
            
            <span className="text-white/40 text-[10px] font-body tracking-[0.25em] uppercase mr-6 hidden sm:block font-medium">
              I want to
            </span>

            <div className="flex h-full items-center">
              {OPTIONS.map(opt => {
                const isActive = audience === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectAudience(opt.id)}
                    className={`relative h-full px-5 text-xs font-heading font-bold tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    <span className="relative z-10">{opt.label}</span>
                    
                    {/* Minimalist selection pill */}
                    {isActive && (
                      <motion.div
                        layoutId="audience-pill"
                        className="absolute inset-y-2.5 left-1 right-1 rounded-md bg-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}