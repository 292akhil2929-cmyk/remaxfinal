import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2, TrendingUp, Award, CheckCircle2, Users, Calendar } from 'lucide-react';

const DEVELOPERS = [
  {
    name: 'Emaar Properties',
    slug: 'emaar-properties',
    tier: 'Tier 1',
    tierLabel: 'Most Trusted',
    founded: '1997',
    projects: '200+',
    units: '85,000+',
    yield: '6–8%',
    paymentPlan: 'Flexible Post-Handover',
    tagline: 'They built Burj Khalifa, Downtown Dubai and Dubai Hills. The benchmark every other developer is measured against.',
    description: 'Emaar is the most trusted name in Dubai real estate. 25+ years of consistent delivery, a public listing on the DFM, and communities that consistently outperform on resale. If you want certainty, start here.',
    highlights: ['Listed on Dubai Financial Market (DFM)', '25+ years of on-time delivery', 'Best-in-class resale values'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/cc981df5d_generated_image.png',
    specializations: ['Residential Communities', 'Luxury Development', 'Mixed-Use Developments', 'Waterfront Projects'],
    yearsInBusiness: '25+',
    keyFacts: [
      'Built the Burj Khalifa, the world\'s tallest building',
      'Developed Downtown Dubai, home to the world\'s largest shopping mall',
      'Dubai Hills Estate is consistently ranked as a top investment community',
      'Over 85,000 residential units delivered globally',
      'Listed on Dubai Financial Market for institutional credibility',
      'Operates in 12 countries across Middle East, North Africa, and Asia',
      'Committed to sustainable building practices and LEED certifications',
      'Own and operate 100+ retail, hospitality and entertainment venues'
    ],
    whyChoseEmaar: [
      'Proven track record with iconic landmark projects',
      'Consistent on-time and on-budget delivery',
      'Strong secondary market demand and resale premiums',
      'DFM listing provides institutional credibility',
      'Communities built to last decades, not years',
      'World-class amenities in every community'
    ],
    locations: ['Downtown Dubai', 'Dubai Hills Estate', 'Dubai Marina', 'Business Bay', 'Creek Harbour', 'The Oasis'],
    propertyTypes: ['Apartments', 'Villas', 'Penthouses', 'Mixed-Use'],
    currentProjects: [
      { name: 'The Oasis by Emaar', status: 'Selling', bedrooms: '1-4', location: 'Downtown Dubai' },
      { name: 'Emaar Beachfront', status: 'Selling', bedrooms: '2-4', location: 'Dubai Harbour' },
      { name: 'Dubai Hills Estate', status: 'Selling', bedrooms: 'Villas & Apartments', location: 'Dubai Hills' },
      { name: 'Creek Harbour', status: 'Selling', bedrooms: '1-4', location: 'Dubai Creek' },
      { name: 'The Valley', status: 'Upcoming', bedrooms: 'Mixed', location: 'Dubai South' },
    ],
  },
  {
    name: 'DAMAC Properties',
    slug: 'damac-properties',
    tier: 'Tier 1',
    tierLabel: 'Highly Trusted',
    founded: '2002',
    projects: '100+',
    units: '40,000+',
    yield: '7–9%',
    paymentPlan: '70/30',
    tagline: 'Dubai\'s luxury off-plan leader. Versace, Cavalli, Lamborghini — branded residences with strong resale value.',
    description: "DAMAC dominates the branded luxury segment. Their communities like DAMAC Hills and DAMAC Lagoons consistently attract international investors who want a premium address with genuine yield.",
    highlights: ['Versace, Cavalli, Pagani branded residences', 'Strong secondary market demand', 'Full community infrastructure from day one'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/eca310001_generated_image.png',
    specializations: ['Luxury Branded Residences', 'Lagoon Communities', 'Golf-Integrated Developments', 'Fine Art Collaborations'],
    yearsInBusiness: '20+',
    keyFacts: [
      'First developer to introduce branded luxury residences to Dubai',
      'Partnerships with Versace, Cavalli, Pagani, and other global luxury brands',
      'DAMAC Hills is one of the most popular residential communities in Dubai',
      'Over 40,000 residential units delivered across Middle East and North Africa',
      'DAMAC Lagoons features 70 acres of lagoons and beaches',
      'Strong international investor base with 60% foreign ownership',
      'Consistent delivery of premium finishes and amenities',
      'Award-winning architecture and design'
    ],
    whyChooseDamac: [
      'Branded luxury guarantees distinctive positioning',
      'Strong international brand recognition drives resale demand',
      'Full communities from day one with complete amenities',
      'Attractive payment plans (70/30) for off-plan purchases',
      'Premium finishes and high rental yields',
      'Strategic locations near beaches and retail hubs'
    ],
    locations: ['DAMAC Hills', 'DAMAC Lagoons', 'Business Bay', 'Downtown Dubai', 'Dubai Marina', 'Akoya Oxygen'],
    propertyTypes: ['Apartments', 'Villas', 'Penthouses', 'Townhouses'],
    currentProjects: [
      { name: 'DAMAC Lagoons', status: 'Selling', bedrooms: '2-4', location: 'South of Dubai' },
      { name: 'DAMAC Hills 2', status: 'Selling', bedrooms: '1-4', location: 'Dubai Hills' },
      { name: 'Cavalli Couture', status: 'Selling', bedrooms: '2-3', location: 'Business Bay' },
      { name: 'Akoya Oxygen', status: 'Selling', bedrooms: 'Mixed', location: 'Dubai South' },
      { name: 'Riverside by DAMAC', status: 'Upcoming', bedrooms: 'Mixed', location: 'TBA' },
    ],
  },
  {
    name: 'Sobha Realty',
    slug: 'sobha-realty',
    tier: 'Tier 1',
    tierLabel: 'Highly Trusted',
    founded: '1976',
    projects: '40+',
    units: '20,000+',
    yield: '6–8%',
    paymentPlan: '60/40',
    tagline: 'The only developer in Dubai that manufactures its own building materials. End-to-end quality control.',
    description: 'Sobha is genuinely different. They control everything — from raw materials to finishing — which means quality is never compromised. Sobha Hartland and SeaHaven are two of the most respected luxury addresses in Dubai.',
    highlights: ['No third-party contractors — complete quality control', 'Ultra-luxury finishes as standard', 'Strong demand from Indian and Asian investors'],
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/a73fc8e63_generated_image.png',
    specializations: ['Ultra-Luxury Residential', 'Vertical Manufacturing', 'Sustainable Construction', 'Premium Communities'],
    yearsInBusiness: '45+',
    keyFacts: [
      'The only developer that manufactures its own building materials',
      'Operates its own concrete and steel production facilities',
      'Sobha Hartland and SeaHaven are among Dubai\'s most prestigious addresses',
      'Over 20,000 residential units delivered in Dubai',
      '100% quality control from raw materials to final handover',
      'Strong institutional backing with significant capital',
      'Targets ultra-high-net-worth individuals globally',
      'Premium finishes and high-end furnishings included in most units'
    ],
    whyChooseSobha: [
      'Unparalleled quality control through vertical integration',
      'Ultra-luxury finishes as standard, not premium add-on',
      'Strong resale value in premium market segments',
      'Established track record in India (50+ years globally)',
      'Institutional backing ensures project completion',
      'Handpicked communities with limited supply'
    ],
    locations: ['Sobha Hartland', 'SeaHaven', 'Dubai Harbour', 'Dubai Marina', 'Palm Jumeirah', 'Arabian Ranches'],
    propertyTypes: ['Apartments', 'Villas', 'Penthouses', 'Townhouses'],
    currentProjects: [
      { name: 'Sobha Hartland II', status: 'Selling', bedrooms: '2-4', location: 'Dubai Hills' },
      { name: 'Sobha SeaHaven', status: 'Selling', bedrooms: '2-4', location: 'Dubai Harbour' },
      { name: 'Sobha One', status: 'Selling', bedrooms: '1-3', location: 'Downtown Dubai' },
      { name: 'Sobha Reserve', status: 'Upcoming', bedrooms: 'Mixed', location: 'Arabian Ranches' },
    ],
  },
];

export default function DeveloperProfile() {
  const { developerSlug } = useParams();
  const developer = DEVELOPERS.find(d => d.slug === developerSlug);

  if (!developer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Developer Not Found</h1>
          <Link to="/developers" className="text-primary hover:underline">Back to Developers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="inline-block mb-4 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-heading font-semibold">
                {developer.tier} — {developer.tierLabel}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black mb-3 text-foreground">{developer.name}</h1>
              <Link to="/developers" className="inline-block mb-4 text-sm text-primary hover:underline font-body">← Back to All Developers</Link>
              <p className="text-lg text-muted-foreground font-body mb-6">{developer.tagline}</p>
              <div className="flex flex-wrap gap-6">
                <div><p className="text-xs font-heading text-muted-foreground uppercase tracking-wider">Founded</p><p className="text-2xl font-display font-bold text-foreground">{developer.founded}</p></div>
                <div><p className="text-xs font-heading text-muted-foreground uppercase tracking-wider">Years in Business</p><p className="text-2xl font-display font-bold text-foreground">{developer.yearsInBusiness}</p></div>
                <div><p className="text-xs font-heading text-muted-foreground uppercase tracking-wider">Projects</p><p className="text-2xl font-display font-bold text-foreground">{developer.projects}</p></div>
                <div><p className="text-xs font-heading text-muted-foreground uppercase tracking-wider">Units Delivered</p><p className="text-2xl font-display font-bold text-foreground">{developer.units}</p></div>
              </div>
            </div>
            <img src={developer.image} alt={developer.name} className="hidden lg:block w-48 h-48 rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Overview */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">About {developer.name}</h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">{developer.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> Why Choose {developer.name.split(' ')[0]}?</h3>
              <ul className="space-y-3">
                {developer.whyChooseDamac ? developer.whyChooseDamac.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">{item}</span>
                  </li>
                )) : developer.whyChoseEmaar.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Key Specializations</h3>
              <div className="space-y-2">
                {developer.specializations.map((spec, i) => (
                  <div key={i} className="inline-block px-3 py-2 bg-secondary rounded-lg text-sm font-body text-foreground mr-2 mb-2">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-6 text-foreground flex items-center gap-2"><Building2 className="w-8 h-8 text-primary" /> Key Facts & Track Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developer.keyFacts.map((fact, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="font-body text-sm text-foreground leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Investment Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Avg. Rental Yield', value: developer.yield },
              { label: 'Payment Plan', value: developer.paymentPlan },
              { label: 'Total Projects', value: developer.projects },
              { label: 'Total Units', value: developer.units },
            ].map((metric, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                <p className="text-xs font-heading text-muted-foreground uppercase tracking-wider mb-2">{metric.label}</p>
                <p className="text-3xl font-display font-bold text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specializations & Locations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-foreground flex items-center gap-2"><MapPin className="w-6 h-6 text-primary" /> Key Locations</h2>
            <div className="space-y-2">
              {developer.locations.map((loc, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-foreground">{loc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-foreground flex items-center gap-2"><Building2 className="w-6 h-6 text-primary" /> Property Types</h2>
            <div className="space-y-2">
              {developer.propertyTypes.map((type, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-foreground">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Projects */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-6 text-foreground flex items-center gap-2"><Calendar className="w-8 h-8 text-primary" /> Current & Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developer.currentProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold text-foreground flex-1">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap font-heading font-semibold ${
                    project.status === 'Selling' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground font-body"><span className="font-heading">Bedrooms:</span> {project.bedrooms}</p>
                  <p className="text-muted-foreground font-body flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Browse Other Developers */}
        <section>
          <h2 className="text-3xl font-display font-bold mb-8 text-foreground">Explore Other Top Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEVELOPERS.filter(d => d.slug !== developerSlug).slice(0, 6).map(dev => (
              <motion.div
                key={dev.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  to={`/developers/${dev.slug}`}
                  className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all h-full"
                >
                  <div className="aspect-video overflow-hidden bg-secondary">
                    <img src={dev.image} alt={dev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <div className="inline-block mb-2 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-heading font-semibold">
                      {dev.tier}
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{dev.name}</h3>
                    <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">{dev.tagline}</p>
                    <div className="flex items-center gap-1 text-primary font-heading font-semibold text-xs">
                      View Profile <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/developers" className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-heading font-semibold px-8 py-3 rounded-xl transition-colors">
              View All Developers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Invest with {developer.name}?</h2>
          <p className="text-primary-foreground/80 font-body text-lg mb-8 max-w-2xl mx-auto">
            Our advisors work directly with {developer.name.split(' ')[0]}. Tell us your budget and we'll connect you with the right project.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-heading font-bold px-8 py-3 rounded-xl transition-colors">
            Speak to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}