import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Bed, Bath, Maximize, TrendingUp, MapPin, Calendar, Building2, ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyViewingForm from '../components/PropertyViewingForm';
import CurrencyConverter from '../components/CurrencyConverter';
import MortgageCalculator from '../components/MortgageCalculator';
import ROICalculator from '../components/ROICalculator';
import PropertyInsightsPanel from '../components/PropertyInsightsPanel';
import PropertyImageGallery from '../components/PropertyImageGallery';
import { trackLeadEvent } from '@/lib/analytics';

const AGENT_FALLBACK = {
  name: 'Faisal Contractor',
  role: 'CEO & Founder — RE/MAX Zam',
  photo: 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/10/Rectangle-284.jpg',
  phone: '+97145828158',
  whatsapp: '97145828158',
  email: 'info@remaxzam.ae',
};

function useAgent(agentId) {
  return useQuery({
    queryKey: ['agent', agentId],
    queryFn: () => base44.entities.Agent.get(agentId),
    enabled: !!agentId,
  });
}

function resolveAgent(property, agentRecord) {
  if (agentRecord) {
    return {
      name: agentRecord.name || AGENT_FALLBACK.name,
      role: agentRecord.role || AGENT_FALLBACK.role,
      photo: agentRecord.photo || AGENT_FALLBACK.photo,
      phone: AGENT_FALLBACK.phone,
      whatsapp: AGENT_FALLBACK.whatsapp,
      email: agentRecord.email || AGENT_FALLBACK.email,
    };
  }
  return AGENT_FALLBACK;
}

function AgentCard({ agent, propertyTitle }) {
  return (
    <div className="bg-card border border-border/50 rounded-lg p-5 border-l-4 border-l-accent">
      <p className="text-[10px] font-heading font-bold tracking-widest uppercase text-muted-foreground mb-3">Your Agent</p>
      <div className="flex items-center gap-3 mb-4">
        <img src={agent.photo} alt={agent.name} className="w-12 h-12 rounded-full object-cover object-top" />
        <div>
          <p className="font-heading font-semibold text-foreground text-sm">{agent.name}</p>
          <p className="text-xs text-accent font-heading">{agent.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <a href={`tel:${agent.phone}`} onClick={() => trackLeadEvent('phone', { source: 'PropertyDetail' })} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group">
          <Phone className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          <span className="text-[9px] font-body text-muted-foreground">Call</span>
        </a>
        <a href={`https://wa.me/${agent.whatsapp}?text=Hi, I'm interested in ${encodeURIComponent(propertyTitle)} — can you assist me?`} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent('whatsapp', { source: 'PropertyDetail' })} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-muted/50 hover:bg-emerald-50 transition-colors group">
          <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600" />
          <span className="text-[9px] font-body text-muted-foreground">WhatsApp</span>
        </a>
        <a href={`mailto:${agent.email}`} onClick={() => trackLeadEvent('email', { source: 'PropertyDetail' })} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group">
          <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          <span className="text-[9px] font-body text-muted-foreground">Email</span>
        </a>
      </div>
    </div>
  );
}

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => base44.entities.Property.get(propertyId),
  });

  const { data: agentRecord } = useAgent(property?.assigned_agent);
  const agent = resolveAgent(property, agentRecord);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Property not found</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Property Details + Calculators */}
          <div className="lg:col-span-2 space-y-6">
            <PropertyImageGallery
              images={property.gallery_images || (property.image_url ? [property.image_url] : [])}
              title={property.title}
              videoId={property.youtubeVideoId || null}
            />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{property.category}</Badge>
                <Badge variant="outline">{property.property_type}</Badge>
                {property.status && <Badge className={property.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}>{property.status}</Badge>}
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-2">{property.title}</h1>
              <p className="flex items-center gap-1 text-muted-foreground font-body text-sm"><MapPin className="w-4 h-4" /> {property.location}</p>
            </div>

            <div className="text-3xl font-heading font-bold text-primary">AED {(property.price_aed || 0).toLocaleString()}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                property.bedrooms != null && { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                property.bathrooms != null && { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                property.area_sqft != null && { icon: Maximize, label: 'Area', value: `${property.area_sqft} sqft` },
                property.expected_roi != null && { icon: TrendingUp, label: 'Expected ROI', value: `${property.expected_roi}%` },
              ].filter(Boolean).map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card border border-border/50 rounded-lg p-4 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-body">{label}</p>
                  <p className="font-heading font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {property.description && (
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">About This Property</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{property.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {property.developer && (
                <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /><span className="text-sm font-body"><span className="text-muted-foreground">Developer:</span> <Link to={`/developers?developer=${encodeURIComponent(property.developer)}`} className="text-foreground hover:text-primary font-medium transition-colors">{property.developer}</Link></span></div>
              )}

              {/* if propert is rental, say "Available for Rent" else say "Completion"*/}
              {property.transaction_type && property.transaction_type.toLowerCase().includes('rental') ? (
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span className="text-sm font-body"><span className="text-muted-foreground">Availabile since:</span> <span className="text-foreground">{property.completion_date}</span></span></div>
              ) : (
                property.completion_date && (
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span className="text-sm font-body"><span className="text-muted-foreground">Completion:</span> <span className="text-foreground">{property.completion_date}</span></span></div>
                )
              )}
            </div>

            {/* Agent Card — mobile only */}
            <div className="lg:hidden">
              <AgentCard agent={agent} propertyTitle={property.title} />
            </div>

            {/* Investment Intelligence */}
            <PropertyInsightsPanel
              location={property.location}
              developer={property.developer}
              community={property.community}
            />

            {/* Calculators — hide for rental/lease properties */}
            {property.transaction_type && !property.transaction_type.toLowerCase().includes('rental') && !property.transaction_type.toLowerCase().includes('lease') && (
              <div className="space-y-6 pt-2">
                <ROICalculator
                  propertyPrice={property.price_aed}
                  rentalYield={property.rental_yield}
                  expectedRoi={property.expected_roi}
                />
                <MortgageCalculator propertyPrice={property.price_aed} />
              </div>
            )}
          </div>

          {/* Right: Viewing form + Currency Converter */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Agent Card */}
              <AgentCard agent={agent} propertyTitle={property.title} />

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Book a Viewing
                </h3>
                <PropertyViewingForm property={property} agentName={agent.name} />
              </div>
              <CurrencyConverter priceAED={property.price_aed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}