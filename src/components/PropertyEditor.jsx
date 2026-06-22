import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { X, Loader2, AlertCircle } from 'lucide-react';
import PropertyImageUpload from './PropertyImageUpload';
import AgentSelector from './AgentSelector';
import { extractYoutubeVideoId } from '@/lib/utils';

export default function PropertyEditor({ property, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    title: property.title || '',
    location: property.location || '',
    community: property.community || '',
    property_type: property.property_type || 'Apartment',
    transaction_type: property.transaction_type || 'Residential Sale',
    listing_status: property.listing_status || '',
    bedrooms: property.bedrooms || '',
    bathrooms: property.bathrooms || '',
    area_sqft: property.area_sqft || '',
    price_aed: property.price_aed || '',
    description: property.description || '',
    isPocketListing: property.isPocketListing || false,
    featured: property.featured || false,
    youtubeVideoId: property.youtubeVideoId || '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // YouTube field: store raw text — extraction happens at save time
    if (name === 'youtubeVideoId') {
      setFormData(prev => ({ ...prev, youtubeVideoId: value }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (value === '' ? null : (isNaN(value) ? value : Number(value))) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = { ...formData };
      // Extract clean YouTube video ID from whatever the user typed (URL or raw ID)
      const raw = formData.youtubeVideoId?.trim();
      if (raw) {
        const cleanId = extractYoutubeVideoId(raw);
        payload.youtubeVideoId = cleanId || raw;
      } else {
        payload.youtubeVideoId = null;
      }
      await base44.entities.Property.update(property.id, payload);
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 bg-card border-b border-border/50">
          <div className="min-w-0 flex-1">
            <h2 className="font-heading font-bold text-foreground">Edit Property</h2>
            <a
              href={`/properties/${property.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-body mt-0.5 hover:underline"
            >
              View live listing →
            </a>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0 ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-heading font-medium text-foreground mb-1 block">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Community</label>
              <input type="text" name="community" value={formData.community} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Property Type</label>
              <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                {['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Land', 'Office', 'Retail', 'Warehouse', 'Shop'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Transaction Type</label>
              <select name="transaction_type" value={formData.transaction_type} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                {['Residential Sale', 'Residential Rental', 'Commercial Sale', 'Commercial Lease'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Listing Status</label>
              <select name="listing_status" value={formData.listing_status || ''} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">—</option>
                {['Off-Plan', 'Ready', 'Resale'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Price (AED)</label>
              <input type="number" name="price_aed" value={formData.price_aed} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1 block">Area (sqft)</label>
              <input type="number" name="area_sqft" value={formData.area_sqft} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="text-sm font-heading font-medium text-foreground mb-1 block">YouTube Video URL</label>
            <input
              type="text"
              name="youtubeVideoId"
              value={formData.youtubeVideoId}
              onChange={handleChange}
              placeholder="e.g. https://www.youtube.com/watch?v=XXXXXX"
              className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-[10px] text-muted-foreground font-body mt-1">
              Paste a YouTube URL (watch, shorts, youtu.be, or embed). The video ID will be auto-extracted.
            </p>
          </div>

          <div>
            <label className="text-sm font-heading font-medium text-foreground mb-1 block">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          {/* Pocket Listing Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-800 text-xs font-bold">P</span>
              </div>
              <div>
                <label htmlFor="isPocketListing" className="text-sm font-heading font-semibold text-amber-900 cursor-pointer">
                  Mark as Pocket Listing
                </label>
                <p className="text-xs text-amber-700 font-body mt-0.5">
                  Hidden from public search &amp; portal feeds. Only accessible via direct link.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isPocketListing"
                name="isPocketListing"
                checked={formData.isPocketListing}
                onChange={(e) => {
                  handleChange(e);
                  // If pocket listing is turned on, also turn off featured
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, featured: false }));
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-sky-50 border border-sky-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded bg-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-sky-800" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <div>
                <label htmlFor="featured" className="text-sm font-heading font-semibold text-sky-900 cursor-pointer">
                  Feature on Landing Page
                </label>
                <p className="text-xs text-sky-700 font-body mt-0.5">
                  Show this property in the featured listings section on the homepage.
                </p>
                {formData.isPocketListing && (
                  <p className="text-xs text-amber-600 font-body mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Pocket listings cannot be featured on the public homepage.
                  </p>
                )}
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                disabled={formData.isPocketListing}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-300 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                formData.isPocketListing
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-gray-200 peer-checked:bg-sky-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white cursor-pointer'
              }`}></div>
            </label>
          </div>

          <PropertyImageUpload
            propertyId={property.id}
            currentImages={property.gallery_images || (property.image_url ? [property.image_url] : [])}
            currentHero={property.image_url || ''}
            onImagesUpdated={onSaved}
          />

          <AgentSelector
            propertyId={property.id}
            currentAgentId={property.assigned_agent}
            onAgentSelected={() => {}}
          />

          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-body">{error}</span>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={onClose} disabled={saving} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}