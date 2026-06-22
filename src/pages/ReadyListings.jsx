import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import usePageSEO from '@/lib/usePageSEO';
import PropertyCard from '../components/PropertyCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

const BEDROOM_OPTIONS = ['Any', 'Studio', '1', '2', '3', '4', '5+'];

export default function ReadyListings() {
  usePageSEO({
    title: 'Ready Properties for Sale in Dubai | RE/MAX Zam',
    description: 'Move-in-ready apartments and villas in Dubai with rental income from day one. Explore handover-ready homes with RE/MAX Zam\'s investment advisors.',
    canonical: 'https://remaxzam.ae/ready-listings',
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [bedrooms, setBedrooms] = useState('Any');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch ONLY pocket listings — isolated from public data
  useEffect(() => {
    base44.entities.Property.list('-created_date', 200)
      .then((data) => {
        // Only show properties where isPocketListing is true
        const pocketListings = (Array.isArray(data) ? data : []).filter((p) => p.isPocketListing);
        setProperties(pocketListings);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  let filtered = [...properties];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.community?.toLowerCase().includes(q),
    );
  }

  if (bedrooms !== 'Any') {
    filtered = filtered.filter((p) => {
      if (bedrooms === 'Studio') return p.bedrooms === 0;
      if (bedrooms === '5+') return p.bedrooms >= 5;
      return p.bedrooms === parseInt(bedrooms);
    });
  }

  if (sortBy === 'price-asc')
    filtered = [...filtered].sort((a, b) => a.price_aed - b.price_aed);
  if (sortBy === 'price-desc')
    filtered = [...filtered].sort((a, b) => b.price_aed - a.price_aed);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 lg:pt-0">
      {/* Header */}
      <div className="bg-[#141E30] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-2">
            Ready Listings
          </h1>
          <p className="text-white/60 font-body">
            Exclusive off-market properties — available for immediate viewing
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search location, community..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-32 h-9 text-sm">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {BEDROOM_OPTIONS.map((b) => (
                <SelectItem key={b} value={b}>
                  {b === 'Any'
                    ? 'Any beds'
                    : b === 'Studio'
                      ? 'Studio'
                      : `${b} bed${b === '1' ? '' : 's'}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-sm text-muted-foreground ml-auto">
            {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No ready listings available</p>
            <p className="text-sm mt-1">Check back soon for new off-market properties</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
