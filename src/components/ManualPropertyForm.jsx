import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Star,
  Image,
  ArrowLeft,
  User,
  Youtube,
} from 'lucide-react';
import { extractYoutubeVideoId } from '@/lib/utils';

const FALLBACK_AGENT_PHOTO = 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/12/man.jpg';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial'];
const TRANSACTION_TYPES = ['Residential Sale', 'Residential Rental', 'Commercial Sale', 'Commercial Lease'];
const LISTING_STATUS_OPTIONS = ['Off-Plan', 'Ready', 'Resale'];
const FURNISHED_OPTIONS = ['Furnished', 'Unfurnished', 'Partly Furnished'];
const BEDROOM_OPTIONS = ['Studio', '1', '2', '3', '4', '5', '6', '7+'];
const BATHROOM_OPTIONS = ['1', '2', '3', '4', '5', '6+'];

const INITIAL_FORM = {
  title: '',
  description: '',
  property_type: 'Apartment',
  transaction_type: 'Residential Sale',
  listing_status: 'Ready',
  isPocketListing: false,
  featured: false,
  price_aed: '',
  area_sqft: '',
  community: '',
  location: '',
  bedrooms: '',
  bathrooms: '',
  furnished: '',
  assigned_agent: '',
  youtubeVideoId: '',
};

export default function ManualPropertyForm({ onBack }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Image upload state
  const [images, setImages] = useState([]);
  const [hero, setHero] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  const { data: agents = [], isLoading: agentsLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => base44.entities.Agent.list('sort_order'),
  });
  const activeAgents = agents.filter(a => a.active !== false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 10 - images.length;
    if (remaining <= 0) { setError('Maximum 10 images per listing.'); return; }
    const filesToUpload = files.slice(0, remaining);
    setUploadingImages(true);
    try {
      const newUrls = [];
      for (const file of filesToUpload) {
        const res = await base44.integrations.Core.UploadFile({ file });
        newUrls.push(res.file_url);
      }
      const updated = [...images, ...newUrls];
      setImages(updated);
      if (!hero && newUrls.length > 0) setHero(newUrls[0]);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (url) => {
    const updated = images.filter(i => i !== url);
    setImages(updated);
    if (hero === url) setHero(updated[0] || '');
  };

  const setAsHero = (url) => {
    setHero(url);
  };

  const validate = () => {
    const missing = [];
    if (!formData.title.trim()) missing.push('Title');
    if (!formData.price_aed) missing.push('Price');
    if (!formData.location.trim()) missing.push('Address/Location');
    if (missing.length > 0) {
      setError(`Please fill in required fields: ${missing.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        property_type: formData.property_type,
        transaction_type: formData.transaction_type,
        listing_status: formData.listing_status,
        isPocketListing: formData.isPocketListing,
        featured: formData.featured,
        price_aed: Number(formData.price_aed),
        area_sqft: formData.area_sqft ? Number(formData.area_sqft) : null,
        community: formData.community.trim(),
        location: formData.location.trim(),
        bedrooms: formData.bedrooms ? (formData.bedrooms === '7+' ? 7 : formData.bedrooms === 'Studio' ? 0 : Number(formData.bedrooms)) : null,
        bathrooms: formData.bathrooms ? (formData.bathrooms === '6+' ? 6 : Number(formData.bathrooms)) : null,
        furnished: formData.furnished || null,
        youtubeVideoId: (() => {
          const raw = formData.youtubeVideoId?.trim();
          if (!raw) return null;
          const cleanId = extractYoutubeVideoId(raw);
          return cleanId || raw;
        })(),
        assigned_agent: formData.assigned_agent || null,
        status: 'Available',
        gallery_images: images,
        image_url: hero || images[0] || '',
      };

      const created = await base44.entities.Property.create(payload);
      setSuccess(created.id || created._id);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to create listing');
    } finally {
      setSaving(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">Listing Created!</h3>
          <p className="text-sm text-muted-foreground font-body mb-6">
            Your property has been added to the database.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => { setSuccess(null); setFormData(INITIAL_FORM); setImages([]); setHero(''); }}>
              Create Another
            </Button>
            <Button onClick={() => navigate('/properties')}>
              View All Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-heading font-bold text-foreground">Manual Property Entry</h3>
            <p className="text-xs text-muted-foreground font-body">Fill in the details to create a new listing from scratch</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
          Draft Mode
        </Badge>
      </div>

      <div className="p-6 space-y-8">
        {/* ═══ Section 1: Basic Info ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
            Basic Information
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">
                Property Title <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Luxurious 3BR Penthouse with Burj View"
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the property — location highlights, amenities, unique features..."
                rows={4}
                className="text-sm resize-y"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <Select value={formData.property_type} onValueChange={(v) => handleChange('property_type', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Transaction Type</label>
                <Select value={formData.transaction_type} onValueChange={(v) => handleChange('transaction_type', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_TYPES.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Section 2: Status Toggles ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
            Status & Visibility
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Listing Status</label>
                <Select value={formData.listing_status} onValueChange={(v) => handleChange('listing_status', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTING_STATUS_OPTIONS.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Furnished Status</label>
                <Select value={formData.furnished} onValueChange={(v) => handleChange('furnished', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNISHED_OPTIONS.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-800 text-xs font-bold">P</span>
                </div>
                <div>
                  <label className="text-sm font-heading font-semibold text-amber-900 cursor-pointer">
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
                  checked={formData.isPocketListing}
                  onChange={(e) => {
                    handleChange('isPocketListing', e.target.checked);
                    // If pocket listing is turned on, auto-uncheck featured
                    if (e.target.checked) {
                      handleChange('featured', false);
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
                  <label className="text-sm font-heading font-semibold text-sky-900 cursor-pointer">
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
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
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
          </div>
        </section>

        {/* ═══ Section 3: Pricing & Size ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
            Pricing &amp; Size
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">
                  Price (AED) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.price_aed}
                  onChange={(e) => handleChange('price_aed', e.target.value)}
                  placeholder="e.g. 2500000"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Area (Sq.Ft)</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.area_sqft}
                  onChange={(e) => handleChange('area_sqft', e.target.value)}
                  placeholder="e.g. 1850"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Section 4: Location ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
            Location
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">
                Address / Location <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g. Dubai Marina, Plot X, Street Y"
                className="text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Community / Area</label>
                <Input
                  value={formData.community}
                  onChange={(e) => handleChange('community', e.target.value)}
                  placeholder="e.g. Dubai Marina"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Building / Sub-community</label>
                <Input
                  value={formData.building}
                  onChange={(e) => handleChange('building', e.target.value)}
                  placeholder="e.g. Marina Gate 1"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Section 5: Specifications ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">5</span>
            Specifications
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Bedrooms</label>
                <Select value={formData.bedrooms} onValueChange={(v) => handleChange('bedrooms', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BEDROOM_OPTIONS.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Bathrooms</label>
                <Select value={formData.bathrooms} onValueChange={(v) => handleChange('bathrooms', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BATHROOM_OPTIONS.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">Furnished</label>
                <Select value={formData.furnished} onValueChange={(v) => handleChange('furnished', v)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNISHED_OPTIONS.map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Section 6: Agent Assignment ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">6</span>
            Agent Assignment
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            {agentsLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading agents...
              </div>
            ) : activeAgents.length === 0 ? (
              <p className="text-sm text-muted-foreground font-body">No agents found. Add agents in Team Management first.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {activeAgents.map(agent => {
                  const isSelected = formData.assigned_agent === agent.id;
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => handleChange('assigned_agent', isSelected ? '' : agent.id)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border-2 transition-all text-center ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-border/50 bg-white hover:border-primary/40 hover:bg-slate-50'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={agent.photo || FALLBACK_AGENT_PHOTO}
                          alt={agent.name}
                          className="w-10 h-10 rounded-full object-cover object-top"
                          onError={(e) => { e.target.src = FALLBACK_AGENT_PHOTO; }}
                        />
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -bottom-1 -right-1 bg-white rounded-full" />
                        )}
                      </div>
                      <p className="text-[10px] font-heading font-semibold text-foreground leading-tight">{agent.name}</p>
                      <p className="text-[9px] font-body text-muted-foreground leading-tight">{agent.role || 'Agent'}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ═══ Section 7: Media Upload ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">7</span>
            Media — Property Images
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                uploadingImages
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border hover:border-primary/40 hover:bg-muted/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImages}
              />
              {uploadingImages ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground font-body">Uploading images...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-heading font-medium text-foreground">
                    Drop images here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    PNG, JPG, WebP — up to 10 images
                  </p>
                </div>
              )}
            </div>

            {/* Image grid */}
            {images.length > 0 && (
              <div>
                <p className="text-xs font-heading font-semibold text-foreground mb-2">
                  Uploaded Images ({images.length}/10)
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {images.map((url, idx) => (
                    <div
                      key={url}
                      className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        url === hero ? 'border-amber-400' : 'border-border/50'
                      }`}
                    >
                      <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                        {url !== hero && (
                          <button
                            type="button"
                            onClick={() => setAsHero(url)}
                            title="Set as hero"
                            className="p-1 bg-amber-400 rounded-full text-black hover:bg-amber-300"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          title="Remove"
                          className="p-1 bg-red-500 rounded-full text-white hover:bg-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      {url === hero && (
                        <span className="absolute bottom-1 left-1 bg-amber-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                          <Star className="w-2 h-2 fill-black" /> Hero
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══ Section 8: YouTube Video ═══ */}
        <section>
          <h4 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">8</span>
            YouTube Video (Optional)
          </h4>
          <div className="space-y-4 pl-0 sm:pl-8">
            <div>
              <label className="text-sm font-heading font-medium text-foreground mb-1.5 block">
                YouTube Video URL
              </label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={formData.youtubeVideoId}
                  onChange={(e) => handleChange('youtubeVideoId', e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=XXXXXX"
                  className="text-sm pl-9"
                />
              </div>
              <p className="text-[10px] text-muted-foreground font-body mt-1">
                Paste a YouTube URL (watch, shorts, youtu.be, or embed link). The video ID will be auto-extracted and shown on the property detail page.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Error Banner ═══ */}
        {error && (
          <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="font-body">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
          </div>
        )}

        {/* ═══ Submit ═══ */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <Button variant="outline" onClick={onBack} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="min-w-[160px]">
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating...</>
            ) : (
              'Create Listing'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
