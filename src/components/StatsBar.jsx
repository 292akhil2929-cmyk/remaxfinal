import { motion } from 'framer-motion';

const stats = [
  { value: '2,400+', label: 'Properties Managed' },
  { value: 'AED 1.2B', label: 'Transaction Volume' },
  { value: '40+', label: 'Countries Served' },
  { value: '8.5%', label: 'Avg. Rental Yield' },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl lg:text-4xl font-display font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}