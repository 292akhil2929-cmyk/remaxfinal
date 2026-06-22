import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PropertyRecommender() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await base44.functions.invoke('recommendProperties', {});
        setRecommendations(response.data.recommendations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          <h2 className="text-xl font-heading font-bold text-foreground">AI Recommendations</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100 text-center">
        <Sparkles className="w-8 h-8 text-blue-600/30 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground font-body">
          Complete more searches to get personalized property recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-heading font-bold text-foreground">Recommended for You</h2>
          <span className="text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">AI-Powered</span>
        </div>
        <p className="text-xs text-muted-foreground font-body mt-1">Based on your search history and investment preferences</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6">
        {recommendations.map(property => (
          <Link key={property.id} to={`/properties/${property.id}`} className="group">
            <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:border-blue-300 transition-all h-full flex flex-col">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {property.image_url ? (
                  <img 
                    src={property.image_url} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-xs text-muted-foreground">No image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col flex-grow">
                <p className="text-xs text-primary font-heading font-medium mb-1 truncate">{property.location}</p>
                <h3 className="font-heading font-semibold text-foreground text-xs mb-2 line-clamp-2 flex-grow">{property.title}</h3>
                
                {/* Price */}
                <p className="text-sm font-heading font-bold text-foreground mb-2">
                  AED {(property.price_aed || 0).toLocaleString()}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {property.bedrooms && <Badge variant="secondary" className="text-xs">{property.bedrooms} Bed</Badge>}
                  {property.expected_roi && <Badge variant="secondary" className="text-xs">{property.expected_roi}% ROI</Badge>}
                </div>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs mt-auto border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  <ArrowRight className="w-3 h-3 mr-1" /> View
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-6 pb-6">
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/properties">Explore All Properties <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    </div>
  );
}