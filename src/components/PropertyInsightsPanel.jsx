import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { MapPin, Building2, Users, TrendingUp, CheckCircle2, Tag, Landmark, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const outlookColors = {
  'Strong': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Moderate': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Stable': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'Emerging': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

const demandColors = {
  'Very High': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'High': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Moderate': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'Low': 'bg-red-500/10 text-red-600 border-red-500/20',
};

const ratingColors = {
  'Tier 1 — Highly Trusted': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Tier 2 — Established': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  'Tier 3 — Emerging': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
};

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-heading font-bold text-foreground text-base">{label}</h3>
    </div>
  );
}

function FactList({ facts }) {
  if (!facts?.length) return null;
  return (
    <ul className="space-y-1.5 mt-3">
      {facts.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  );
}

export default function PropertyInsightsPanel({ location, developer, community }) {
  const { data: locationInsights = [] } = useQuery({
    queryKey: ['locationInsight', location],
    queryFn: () => location ? base44.entities.LocationInsight.filter({ location_key: location }) : [],
    enabled: !!location,
  });

  const { data: developerInsights = [] } = useQuery({
    queryKey: ['developerInsight', developer],
    queryFn: () => developer ? base44.entities.DeveloperInsight.filter({ developer_key: developer }) : [],
    enabled: !!developer,
  });

  const { data: communityInsights = [] } = useQuery({
    queryKey: ['communityInsight', community],
    queryFn: () => community ? base44.entities.CommunityInsight.filter({ community_key: community }) : [],
    enabled: !!community,
  });

  const loc = locationInsights[0];
  const dev = developerInsights[0];
  const com = communityInsights[0];

  if (!loc && !dev && !com) return null;

  return (
    <div className="space-y-6 pt-4 border-t border-border/50">
      <h2 className="text-lg font-heading font-bold text-foreground">Investment Intelligence</h2>

      {/* Location Insight */}
      {loc && (
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <SectionHeader icon={MapPin} label="About the Location" />
          {loc.headline && <p className="font-heading font-semibold text-primary text-sm mb-2">{loc.headline}</p>}
          {loc.overview && <p className="text-sm text-muted-foreground font-body leading-relaxed">{loc.overview}</p>}

          {(loc.avg_roi || loc.avg_price_psf || loc.rental_demand) && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {loc.avg_roi && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">Avg ROI</p>
                  <p className="font-heading font-bold text-foreground text-sm">{loc.avg_roi}</p>
                </div>
              )}
              {loc.avg_price_psf && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">Avg Price/sqft</p>
                  <p className="font-heading font-bold text-foreground text-sm">{loc.avg_price_psf}</p>
                </div>
              )}
              {loc.rental_demand && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">Rental Demand</p>
                  <Badge className={`text-xs ${demandColors[loc.rental_demand]}`}>{loc.rental_demand}</Badge>
                </div>
              )}
            </div>
          )}
          <FactList facts={loc.investor_facts} />
        </div>
      )}

      {/* Community Insight */}
      {com && (
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <SectionHeader icon={Users} label="About the Community" />
          {com.headline && <p className="font-heading font-semibold text-primary text-sm mb-2">{com.headline}</p>}
          {com.overview && <p className="text-sm text-muted-foreground font-body leading-relaxed">{com.overview}</p>}

          {com.lifestyle_tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {com.lifestyle_tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-body">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          {com.nearby_landmarks?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">Nearby</p>
              <div className="space-y-1.5">
                {com.nearby_landmarks.map((lm, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <Landmark className="w-3.5 h-3.5 text-accent shrink-0" />
                    {lm}
                  </div>
                ))}
              </div>
            </div>
          )}

          {com.capital_growth_outlook && (
            <div className="mt-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-body">Capital Growth Outlook:</span>
              <Badge className={`text-xs ${outlookColors[com.capital_growth_outlook]}`}>{com.capital_growth_outlook}</Badge>
            </div>
          )}

          <FactList facts={com.community_facts} />
        </div>
      )}

      {/* Developer Insight */}
      {dev && (
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <SectionHeader icon={Building2} label="About the Developer" />
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {dev.tagline && <p className="font-heading font-semibold text-primary text-sm mb-1">{dev.tagline}</p>}
              {dev.rating && <Badge className={`text-xs ${ratingColors[dev.rating]}`}>{dev.rating}</Badge>}
            </div>
            {dev.logo_url && (
              <img src={dev.logo_url} alt="Developer logo" className="h-10 w-auto object-contain rounded" />
            )}
          </div>

          {dev.overview && <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">{dev.overview}</p>}

          {(dev.projects_delivered || dev.years_active) && (
            <div className="flex gap-4">
              {dev.projects_delivered && (
                <div className="bg-muted/50 rounded-lg px-4 py-2 text-center">
                  <p className="text-xs text-muted-foreground font-body">Projects Delivered</p>
                  <p className="font-heading font-bold text-foreground">{dev.projects_delivered}</p>
                </div>
              )}
              {dev.years_active && (
                <div className="bg-muted/50 rounded-lg px-4 py-2 text-center">
                  <p className="text-xs text-muted-foreground font-body">Years Active</p>
                  <p className="font-heading font-bold text-foreground">{dev.years_active}</p>
                </div>
              )}
            </div>
          )}
          <FactList facts={dev.key_facts} />
        </div>
      )}
    </div>
  );
}