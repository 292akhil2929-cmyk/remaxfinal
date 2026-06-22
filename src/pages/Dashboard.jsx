import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import usePageSEO from '@/lib/usePageSEO';
import { Link } from 'react-router-dom';
import { Heart, Clock, Trash2, Search, ArrowRight, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyRecommender from '@/components/PropertyRecommender';
import { getSavedIds, removeSaved } from '@/lib/favorites';

export default function Dashboard() {
  usePageSEO({ robots: 'noindex, nofollow' });

  const queryClient = useQueryClient();
  const [tab, setTab] = useState('saved');
  const [savedIds, setSavedIds] = useState(() => getSavedIds());

  const { data: savedProperties = [], isLoading: loadingSaved } = useQuery({
    queryKey: ['savedProperties', savedIds],
    queryFn: () => savedIds.length > 0
      ? base44.entities.Property.filter({ id: { $in: savedIds } })
      : Promise.resolve([]),
    enabled: true,
    select: (data) => data.filter((p) => !p.isPocketListing),
  });

  const { data: history = [], isLoading: loadingHistory } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: () => base44.entities.SearchHistory.list('-created_date', 20),
  });

  const handleRemoveSaved = (propertyId) => {
    removeSaved(propertyId);
    const next = getSavedIds();
    setSavedIds(next);
    queryClient.invalidateQueries({ queryKey: ['savedProperties'] });
  };

  const clearHistory = useMutation({
    mutationFn: async () => {
      await Promise.all(history.map(h => base44.entities.SearchHistory.delete(h.id)));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['searchHistory'] }),
  });

  const buildSearchUrl = (item) => {
    const params = new URLSearchParams();
    if (item.community) params.set('community', item.community);
    if (item.price_range) params.set('priceRange', item.price_range);
    if (item.property_type) params.set('type', item.property_type);
    if (item.bedrooms) params.set('bedrooms', item.bedrooms);
    return `/properties?${params.toString()}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-semibold tracking-widest uppercase text-white/60 mb-2">My Account</p>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">My Property Dashboard</h1>
          <p className="text-white/70 font-body text-sm">Track your saved listings and recent searches in one place.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-foreground">{savedIds.length}</p>
              <p className="text-xs text-muted-foreground font-body">Saved Properties</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xl font-heading font-bold text-foreground">{history.length}</p>
              <p className="text-xs text-muted-foreground font-body">Recent Searches</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommender */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertyRecommender />
      </section>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-8">
          <button
            onClick={() => setTab('saved')}
            className={`px-5 py-2 rounded-md text-sm font-heading font-semibold transition-all ${tab === 'saved' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Saved Properties</span>
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-5 py-2 rounded-md text-sm font-heading font-semibold transition-all ${tab === 'history' ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Search History</span>
          </button>
        </div>

        {/* Saved Properties Tab */}
        {tab === 'saved' && (
          <div>
            {loadingSaved ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />)}
              </div>
            ) : savedIds.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-xl">
                <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-heading font-semibold text-foreground mb-1">No saved properties yet</p>
                <p className="text-sm text-muted-foreground mb-6">Browse listings and tap the heart icon to save properties you love.</p>
                <Button asChild>
                  <Link to="/properties">Browse Properties <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProperties.map(item => (
                  <div key={item.id} className="bg-card border border-border/50 rounded-lg overflow-hidden group hover:border-primary/30 transition-all">
                    <Link to={`/properties/${item.id}`} className="block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-primary font-heading font-medium tracking-wide mb-1">{item.community || item.location}</p>
                        <h3 className="font-heading font-semibold text-foreground text-sm mb-2 line-clamp-1">{item.title}</h3>
                        <p className="text-lg font-heading font-bold text-foreground">
                          AED {(item.price_aed || 0).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleRemoveSaved(item.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search History Tab */}
        {tab === 'history' && (
          <div>
            {loadingHistory ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-xl">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-heading font-semibold text-foreground mb-1">No search history yet</p>
                <p className="text-sm text-muted-foreground mb-6">Your recent property searches will appear here.</p>
                <Button asChild>
                  <Link to="/properties">Start Searching <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground font-body">{history.length} recent searches</p>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500" onClick={() => clearHistory.mutate()}>
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear All
                  </Button>
                </div>
                <div className="space-y-3">
                  {history.map(item => (
                    <Link key={item.id} to={buildSearchUrl(item)} className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <Search className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-1">
                            {item.community && <Badge variant="secondary" className="text-xs">{item.community}</Badge>}
                            {item.property_type && <Badge variant="secondary" className="text-xs">{item.property_type}</Badge>}
                            {item.price_range && <Badge variant="secondary" className="text-xs">{item.price_range}</Badge>}
                            {item.bedrooms && item.bedrooms !== 'all' && <Badge variant="secondary" className="text-xs">{item.bedrooms === '0' ? 'Studio' : `${item.bedrooms} Bed`}</Badge>}
                            {!item.community && !item.property_type && !item.price_range && (
                              <span className="text-sm font-body text-foreground">All Properties</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-body">{formatDate(item.created_date)} · {item.results_count ?? '—'} results</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}