import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Users, Landmark, Star, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CommunityMap from '../components/CommunityMap';
import usePageSEO from '@/lib/usePageSEO';

const areas = [
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    tagline: "Dubai's Iconic Island — Global Prestige Meets Exceptional Returns",
    image: 'https://images.unsplash.com/photo-1677508397947-b477be938a9b?w=900&q=80&auto=format&fit=crop',
    tags: ['Luxury', 'Villas', 'Apartments', 'Ultra-Premium'],
    priceRange: 'AED 1.5M – AED 200M+',
    avgYield: '5–7%',
    investorProfile: 'Capital Appreciation & Trophy Asset',
    overview: `Palm Jumeirah is Dubai's most recognised landmark — a palm-shaped artificial archipelago stretching into the Arabian Gulf. Home to some of the world's most prestigious residences, five-star hotels, and Michelin-starred restaurants, Palm Jumeirah attracts high-net-worth investors from over 100 countries seeking both lifestyle and long-term capital appreciation.

The Palm offers a unique combination of beachfront living, world-class amenities, and scarcity value. With no new large-scale land reclamation planned, supply is inherently limited — driving sustained price growth even as broader markets fluctuate.`,
    highlights: [
      'Frond villas with private beach access and sea views',
      'Signature residences by Nakheel, DAMAC, and Omniyat',
      'Home to Atlantis The Palm, One&Only, and Waldorf Astoria',
      'Direct monorail connectivity to Sheikh Zayed Road',
      'Consistent 10–15% annual price appreciation since 2020',
      'Strong short-term rental demand via Airbnb and holiday homes',
    ],
    bestFor: 'Investors seeking a globally recognised trophy asset with premium rental income from high-net-worth tenants, tourists, and corporate relocations.',
    propertyTypes: ['Signature Villas', 'Beachfront Apartments', 'Sky-high Penthouses', 'Garden Homes'],
    seoNote: "Properties on Palm Jumeirah represent the top 5% of Dubai's luxury market. Historically, well-positioned frond villas and Atlantis-facing apartments have delivered 12–18% total return over 3-year hold periods.",
    mapCenter: [25.1088, 55.1360],
    radiusM: 1400,
    propertyPins: [
      { coords: [25.1088, 55.1360], label: 'Palm Jumeirah Frond Villas', note: 'Private beach access, AED 10M+' },
      { coords: [25.1214, 55.1185], label: 'Atlantis The Royal Residences', note: 'Ultra-luxury, AED 25M+' },
      { coords: [25.1034, 55.1560], label: 'Nakheel Signature Apartments', note: 'Waterfront, AED 2M+' },
    ],
    landmarks: [
      { coords: [25.1302, 55.1172], label: 'Atlantis The Palm', note: '5-star resort & waterpark' },
      { coords: [25.0895, 55.1551], label: 'Palm Monorail Station', note: 'Links to Dubai Metro' },
      { coords: [25.1203, 55.1845], label: 'Nakheel Mall', note: 'Retail & dining hub' },
      { coords: [25.0970, 55.1698], label: 'The Pointe', note: 'Waterfront dining & leisure' },
    ],
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    tagline: 'The Centre of Now — Unrivalled Skyline, Proven Investment Track Record',
    image: 'https://images.unsplash.com/photo-1642874836561-b76b1c6478fe?w=900&q=80&auto=format&fit=crop',
    tags: ['Central', 'Apartments', 'Off-Plan', 'Capital Growth'],
    priceRange: 'AED 1.2M – AED 50M+',
    avgYield: '5–7%',
    investorProfile: 'Capital Growth & Premium Rental Income',
    overview: `Downtown Dubai is the heartbeat of modern Dubai — home to the Burj Khalifa, the Dubai Mall, and the Dubai Fountain. Developed by EMAAR Properties, Downtown has consistently been among the world's top-performing luxury real estate markets, with demand driven by an unmatched combination of iconic status, central location, and global recognition.

For international investors, Downtown offers the security of buying within a master-planned community by one of the world's most trusted developers, with a transparent resale market, strong occupancy rates, and continued infrastructure investment by the Dubai government.`,
    highlights: [
      "Direct views of Burj Khalifa, the world's tallest building",
      'Developed exclusively by EMAAR — DFM-listed blue-chip developer',
      "Walking distance to Dubai Mall — world's most visited shopping centre",
      'Operated by Dubai Metro Red Line for seamless city connectivity',
      '90%+ occupancy rates driven by year-round tourism and corporate tenants',
      "Strong off-plan pipeline with EMAAR's signature post-handover payment plans",
    ],
    bestFor: 'First-time international investors seeking a recognised address, reliable rental income from corporate and tourist tenants, and strong liquidity on exit.',
    propertyTypes: ['High-Rise Apartments', 'Serviced Residences', 'Duplex Penthouses', 'Podium Townhouses'],
    seoNote: "Downtown Dubai has delivered consistent capital appreciation, with prices rising approximately 40% between 2020 and 2024. EMAAR's brand premium provides strong resale liquidity for investors looking to exit within 3–5 years.",
    mapCenter: [25.19408, 55.2781],
    radiusM: 900,
    propertyPins: [
      { coords: [25.19408, 55.2781], label: 'Burj Khalifa Residences', note: 'Iconic address, AED 3M+' },
      { coords: [25.1940, 55.2820], label: 'Address Boulevard', note: 'Serviced residences, AED 2M+' },
      { coords: [25.2010, 55.2670], label: 'Opera District Apartments', note: 'EMAAR, AED 1.5M+' },
    ],
    landmarks: [
      { coords: [25.1972, 55.2796], label: 'Burj Khalifa', note: "World's tallest building" },
      { coords: [25.1985, 55.2796], label: 'Dubai Mall', note: "World's most visited mall" },
      { coords: [25.1954, 55.2760], label: 'Dubai Fountain', note: 'World-record fountain show' },
      { coords: [25.2025, 55.2640], label: 'Dubai Opera', note: 'Arts & culture landmark' },
      { coords: [25.2040, 55.2730], label: 'Dubai Metro — Burj Khalifa Station', note: 'Red Line' },
    ],
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    tagline: "Waterfront Living, World-Class Yields — The Investor's Favourite",
    image: 'https://images.unsplash.com/photo-1722502831583-b4e93ecc6027?w=900&q=80&auto=format&fit=crop',
    tags: ['High Yield', 'Waterfront', 'Expat Demand', 'Rental Income'],
    priceRange: 'AED 700K – AED 20M',
    avgYield: '6–8%',
    investorProfile: 'Rental Yield & Long-Term Appreciation',
    overview: `Dubai Marina is the city's premier waterfront community — a 3.5km canal development lined with world-class towers, restaurants, and the famous Marina Walk promenade. It consistently ranks as one of Dubai's most searched and transacted residential areas, with a diverse international community of residents from over 150 nationalities.

For yield-focused investors, Dubai Marina is arguably the most reliable sub-market in Dubai. The combination of high tourist footfall, a large expat professional population, and proximity to JBR Beach and Media City creates consistent 12-month rental demand across all bedroom configurations.`,
    highlights: [
      'Over 200 residential towers with direct marina or sea views',
      'Tram connectivity linking to Dubai Metro and Palm Monorail',
      'JBR Beach and The Walk directly adjacent',
      'Highest transaction volumes of any Dubai community',
      'Robust short-term rental market through holiday homes',
      'Strong corporate tenant demand from Media City and JLT professionals',
    ],
    bestFor: 'Yield-first investors targeting consistent rental income from a large, established tenant pool. Ideal for holiday home operators and corporate rental strategies.',
    propertyTypes: ['Marina-View Apartments', 'Waterfront Penthouses', 'JBR Beachfront Residences', 'Studio & 1BHK Units'],
    seoNote: 'Dubai Marina studios and one-bedroom apartments consistently achieve occupancy rates above 88%, with short-term rentals via platforms like Airbnb generating up to 30% premium over long-term leases.',
    mapCenter: [25.08525, 55.14646],
    radiusM: 900,
    propertyPins: [
      { coords: [25.08525, 55.14646], label: 'Marina Walk Apartments', note: 'Waterfront views, AED 800K+' },
      { coords: [25.0860, 55.1480], label: 'Princess Tower', note: 'High-rise, AED 900K+' },
      { coords: [25.0740, 55.1330], label: 'JBR Beachfront Residences', note: 'Beach access, AED 1.5M+' },
    ],
    landmarks: [
      { coords: [25.0758, 55.1305], label: 'JBR Beach', note: 'Dubai\'s most popular public beach' },
      { coords: [25.0830, 55.1473], label: 'Dubai Marina Mall', note: 'Retail & cinema' },
      { coords: [25.0712, 55.1270], label: 'The Walk at JBR', note: 'Promenade dining & retail' },
      { coords: [25.0868, 55.1501], label: 'Dubai Marina Metro Station', note: 'Red Line + Tram' },
    ],
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    tagline: "Dubai's Central Business Hub — Corporate Demand, Exceptional Value",
    image: 'https://images.unsplash.com/photo-1721804222969-e15023a77eef?w=900&q=80&auto=format&fit=crop',
    tags: ['Business Hub', 'Growth Zone', 'Mixed-Use', 'Affordable Entry'],
    priceRange: 'AED 600K – AED 15M',
    avgYield: '6–8%',
    investorProfile: 'Balanced Yield & Capital Growth',
    overview: `Business Bay is Dubai's fastest-evolving mixed-use district, sitting directly adjacent to Downtown Dubai along the Dubai Canal. Originally conceived as a commercial centre, Business Bay has rapidly transformed into one of Dubai's most vibrant residential communities, with new restaurants, canal-facing promenades, and luxury hotels reshaping the area's identity.

For investors, Business Bay offers a compelling value proposition — near-Downtown access and comparable rental yields, at a 20–30% price discount to Downtown addresses. With the Dubai Canal masterplan still unfolding, Business Bay represents one of the best capital appreciation plays in the current market.`,
    highlights: [
      'Adjacent to Downtown Dubai, sharing the same metro line',
      'Dubai Canal promenade — 3km waterfront walkway completed in 2021',
      'Office market driving consistent demand from professional tenants',
      'New hospitality openings including Paramount Hotel and SLS Dubai',
      'Strong off-plan supply from DAMAC, Ellington, and EMAAR',
      '20–30% price discount vs. Downtown for comparable specs',
    ],
    bestFor: 'Value investors seeking near-Downtown yields at a price discount, or investors building a portfolio of 2–3 units across different price points.',
    propertyTypes: ['Canal-View Apartments', 'Studio & 1BHK Investments', 'Hotel Apartments', 'Penthouse Units'],
    seoNote: 'Business Bay has outperformed the broader Dubai market on price growth since 2022, supported by the completion of the Dubai Canal, new hotel openings, and growing demand from young professionals priced out of Downtown.',
    mapCenter: [25.184242, 55.272430],
    radiusM: 850,
    propertyPins: [
      { coords: [25.184242, 55.272430], label: 'Canal-View Apartments', note: 'AED 700K+' },
      { coords: [25.1920, 55.2650], label: 'Damac Towers by Paramount', note: 'Branded residences, AED 1M+' },
      { coords: [25.1820, 55.2570], label: 'Ellington Properties — Business Bay', note: 'Boutique, AED 1.2M+' },
    ],
    landmarks: [
      { coords: [25.1895, 55.2556], label: 'Dubai Canal Promenade', note: '3km waterfront walkway' },
      { coords: [25.1850, 55.2690], label: 'Business Bay Metro Station', note: 'Red Line' },
      { coords: [25.1760, 55.2600], label: 'SLS Dubai Hotel', note: 'Luxury hotel & residences' },
      { coords: [25.1950, 55.2720], label: 'Bay Square', note: 'Dining & retail plaza' },
    ],
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    tagline: "Green Living, Exceptional Schools — Dubai's Premium Family Investment",
    image: 'https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?w=900&q=80&auto=format&fit=crop',
    tags: ['Family Living', 'Villas', 'Green Community', 'Premium'],
    priceRange: 'AED 1.5M – AED 40M',
    avgYield: '5–6%',
    investorProfile: 'Long-Term Family Residence & Capital Appreciation',
    overview: `Dubai Hills Estate is EMAAR's flagship master-planned community — an 11 million sqm green city within a city, designed around an 18-hole championship golf course with stunning Burj Khalifa skyline views. Home to top-tier international schools, Dubai Hills Mall, and over 45km of cycling and jogging tracks, it is the preferred address for families relocating to Dubai from Europe, North America, and Asia.

The community's long-term appeal is underpinned by scarcity of land in central Dubai and EMAAR's track record of value creation. Dubai Hills villas have appreciated 60–80% since 2020, and demand consistently outpaces supply for ready properties.`,
    highlights: [
      '18-hole championship golf course with Burj Khalifa views',
      "GEMS, Kings College, and Horizon International School within the community",
      "Dubai Hills Mall — EMAAR's 2M sqft flagship retail destination",
      'Direct MRT access via upcoming Dubai Metro Blue Line extension',
      'Over 45km of cycling tracks and green parks',
      '60–80% villa price appreciation since 2020',
    ],
    bestFor: 'Families relocating to Dubai seeking a long-term home purchase, or investors targeting the premium family villa rental market from multinational corporate tenants.',
    propertyTypes: ['Golf-View Villas', 'Park-Facing Townhouses', 'Luxury Apartments', 'Estate Mansions'],
    seoNote: 'Dubai Hills Estate villas are among the most sought-after assets for families relocating under the UAE Golden Visa programme, with 3–4 bedroom units commanding AED 180,000–300,000 per annum in rental income.',
    mapCenter: [25.069872, 55.17251],
    radiusM: 1600,
    propertyPins: [
      { coords: [25.069872, 55.17251], label: 'Golf Course Villas', note: 'EMAAR, AED 4M+' },
      { coords: [25.1070, 55.2470], label: 'Dubai Hills Apartments', note: 'Park-view, AED 1.2M+' },
      { coords: [25.1200, 55.2310], label: 'Sidra Villas', note: 'Family villas, AED 3.5M+' },
    ],
    landmarks: [
      { coords: [25.1150, 55.2480], label: 'Dubai Hills Mall', note: "EMAAR's flagship retail" },
      { coords: [25.1085, 55.2360], label: 'Dubai Hills Golf Club', note: '18-hole championship course' },
      { coords: [25.1020, 55.2280], label: 'GEMS World Academy', note: 'International school' },
      { coords: [25.1240, 55.2440], label: 'Dubai Hills Park', note: '180-acre community park' },
    ],
  },
  {
    id: 'jumeirah-village-circle',
    name: 'Jumeirah Village Circle (JVC)',
    tagline: "Dubai's Best-Value Investment — 8–10% Yields, High Capital Upside",
    image: 'https://images.unsplash.com/photo-1642715350691-7ffde05661c4?w=900&q=80&auto=format&fit=crop',
    tags: ['Best Value', 'High Yield', 'Affordable Entry', 'Capital Upside'],
    priceRange: 'AED 350K – AED 5M',
    avgYield: '8–10%',
    investorProfile: 'Yield Maximisation & Portfolio Building',
    overview: `Jumeirah Village Circle (JVC) has emerged as Dubai's most popular investment community for yield-focused investors. With accessible entry prices, a rapidly improving community infrastructure, and rental yields of 8–10%, JVC consistently ranks as one of the top-transacted communities in Dubai — particularly among first-time investors and those building a multi-unit rental portfolio.

Developed by Nakheel, JVC benefits from a central location between Sheikh Mohammed Bin Zayed Road and Al Khail Road, providing quick access to Dubai Marina, Downtown, and Dubai Sports City. Over 60 residential projects have launched in JVC since 2022, reflecting developer confidence in the area's growth trajectory.`,
    highlights: [
      'Highest rental yields in Dubai — consistently 8–10% per annum',
      'Entry-level pricing from AED 350K for studios and 1BHK units',
      'Centrally located with quick access to key employment hubs',
      'Over 25 parks and green spaces within the community',
      'Strong tenant demand from young professionals and couples',
      'Significant capital appreciation potential as community matures',
    ],
    bestFor: 'Investors seeking maximum rental yield, entry-level price points, and the ability to build a diversified portfolio of 2–5 units within a single community.',
    propertyTypes: ['Studio Apartments', '1 & 2 BHK Apartments', 'Townhouses', 'Off-Plan Units'],
    seoNote: 'JVC is the single most transacted community in Dubai by volume, making it the most liquid investment option for buy-and-hold investors who want the flexibility to exit within a 3–5 year window at strong returns.',
    mapCenter: [25.06374091435815, 55.207477096634754],
    radiusM: 1200,
    propertyPins: [
      { coords: [25.06374091435815, 55.207477096634754], label: 'Neva Residences', note: 'JVC District 16, AED 800K+' },
      { coords: [25.0640, 55.2010], label: 'Binghatti Venus', note: 'Studio & 1BHK, AED 450K+' },
      { coords: [25.0530, 55.2140], label: 'Sobha Realty JVC', note: '1-2 bed, AED 900K+' },
    ],
    landmarks: [
      { coords: [25.0660, 55.2160], label: 'Circle Mall JVC', note: 'Community retail hub' },
      { coords: [25.0500, 55.1980], label: 'JSS International School', note: 'CBSE curriculum' },
      { coords: [25.0710, 55.2060], label: 'Al Khail Road', note: 'Major highway access' },
      { coords: [25.0580, 55.2260], label: 'Dubai Sports City', note: '5 min drive' },
    ],
  },
];

export default function AreaGuides() {
  usePageSEO({
    title: 'Dubai Area Guides for Property Investors | RE/MAX Zam',
    description: "Compare Dubai's best investment communities — prices, rental yields and lifestyle. In-depth area guides from RE/MAX Zam to help you choose where to buy.",
    canonical: 'https://remaxzam.ae/area-guides',
  });

  const [selected, setSelected] = useState(areas[0].id);
  const area = areas.find(a => a.id === selected);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Location Intelligence</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Dubai Area Investment Guides</h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            In-depth analysis of Dubai's top residential communities — comparing rental yields, price appreciation, tenant demand, and lifestyle credentials to help international investors choose the right location for their strategy.
          </p>
        </div>
      </section>

      {/* Area Selector + Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <p className="text-xs font-heading font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Select Area</p>
              <div className="space-y-1">
                {areas.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(a.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-body transition-colors ${
                      selected === a.id
                        ? 'bg-black text-white font-bold'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img src={area.image} alt={area.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {area.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>

              <h2 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-1">{area.name}</h2>
              <p className="text-base text-gray-500 font-body mb-6">{area.tagline}</p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Landmark, label: 'Price Range', value: area.priceRange },
                  { icon: TrendingUp, label: 'Avg. Rental Yield', value: area.avgYield },
                  { icon: Users, label: 'Investor Profile', value: area.investorProfile },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-lg p-4">
                    <Icon className="w-4 h-4 text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500 font-body mb-1">{label}</p>
                    <p className="text-sm font-heading font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-gray-900 mb-3">Community Overview</h3>
                {area.overview.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-gray-500 font-body leading-relaxed mb-3">{para}</p>
                ))}
              </div>

              {/* Map */}
              <CommunityMap area={area} />

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-gray-900 mb-4">Investment Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {area.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm font-body text-gray-500">
                      <Star className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Property Types */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-gray-900 mb-3">Available Property Types</h3>
                <div className="flex flex-wrap gap-2">
                  {area.propertyTypes.map(t => (
                    <span key={t} className="px-3 py-1.5 text-xs font-heading font-medium bg-gray-100 text-gray-700 border border-gray-200 rounded-full">{t}</span>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-gray-50 border border-gray-200 border-l-4 border-l-[#C9A84C] rounded-lg p-5 mb-8">
                <h3 className="font-heading font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" /> Best For
                </h3>
                <p className="text-sm text-gray-500 font-body">{area.bestFor}</p>
              </div>

              {/* Expert Note */}
              <div className="bg-gray-50 border-l-4 border-black rounded-r-lg p-5 mb-8">
                <p className="text-xs font-heading font-semibold text-[#C9A84C] uppercase tracking-widest mb-2">RE/MAX Zam Expert Insight</p>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{area.seoNote}</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-black hover:bg-gray-900 text-white font-heading font-bold" asChild>
                  <Link to="/properties">
                    View {area.name} Properties <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="font-heading border-[#C9A84C] text-[#C9A84C] hover:bg-gray-50" asChild>
                  <Link to="/contact">Get Investment Advice</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare All Areas Table */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Compare Dubai Investment Areas at a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 pr-4 font-heading font-bold text-gray-900">Area</th>
                  <th className="text-left py-3 pr-4 font-heading font-bold text-gray-900">Entry Price</th>
                  <th className="text-left py-3 pr-4 font-heading font-bold text-gray-900">Rental Yield</th>
                  <th className="text-left py-3 font-heading font-bold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody>
                {areas.map(a => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-100 hover:bg-white cursor-pointer transition-colors"
                    onClick={() => { setSelected(a.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    <td className="py-3 pr-4 font-medium text-gray-900">{a.name}</td>
                    <td className="py-3 pr-4 text-gray-500">{a.priceRange.split('\u2013')[0].trim()}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">{a.avgYield}</span>
                    </td>
                    <td className="py-3 text-gray-500">{a.investorProfile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <MapPin className="w-8 h-8 mx-auto text-white/60 mb-4" />
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Not Sure Which Area is Right For You?</h2>
          <p className="text-white/75 font-body mb-7 text-sm leading-relaxed">
            Our investment advisors specialise in matching international buyers with the Dubai community that aligns with their budget, lifestyle, and ROI goals. Book a free 30-minute strategy call.
          </p>
          <Button size="lg" className="bg-white hover:bg-gray-100 text-black font-heading font-bold border-0" asChild>
            <Link to="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}