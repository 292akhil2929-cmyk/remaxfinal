import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Upload, Loader2, AlertCircle, Star, X, Image } from 'lucide-react';

export default function ImageUploadSection({ propertyId, currentImages = [], currentHero = '', onImagesUpdated }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(currentImages);
  const [hero, setHero] = useState(currentHero || currentImages[0] || '');

  useEffect(() => {
    setImages(currentImages);
    setHero(currentHero || currentImages[0] || '');
  }, [propertyId]);

  const save = async (newImages, newHero) => {
    await base44.entities.Property.update(propertyId, {
      gallery_images: newImages,
      image_url: newHero || newImages[0] || '',
    });
    if (onImagesUpdated) onImagesUpdated();
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remaining = 10 - images.length;
    if (remaining <= 0) { setError('Maximum 10 images per listing.'); return; }
    const filesToUpload = files.slice(0, remaining);
    setUploading(true);
    setError(null);
    try {
      const newUrls = [];
      for (const file of filesToUpload) {
        const res = await base44.integrations.Core.UploadFile({ file });
        newUrls.push(res.file_url);
      }
      const updated = [...images, ...newUrls];
      const newHero = hero || newUrls[0];
      setImages(updated);
      setHero(newHero);
      await save(updated, newHero);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const setAsHero = async (url) => {
    setHero(url);
    await base44.entities.Property.update(propertyId, { image_url: url });
  };

  const removeImage = async (url) => {
    const updated = images.filter(i => i !== url);
    const newHero = url === hero ? (updated[0] || '') : hero;
    setImages(updated);
    setHero(newHero);
    await save(updated, newHero);
  };

  return (
    <div className="mt-4 p-4 bg-white/50 rounded-lg border border-emerald-100 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-heading font-semibold text-foreground">
          Property Images <span className="text-muted-foreground font-normal">({images.length}/10)</span>
        </p>
        {images.length < 10 && (
          <label className="cursor-pointer">
            <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} className="hidden" />
            <Button asChild disabled={uploading} variant="outline" size="sm" className="text-xs cursor-pointer">
              <span>
                {uploading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Upload className="w-3 h-3 mr-1" />}
                {uploading ? 'Uploading...' : 'Add Images'}
              </span>
            </Button>
          </label>
        )}
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.map((url, idx) => (
            <div key={url} className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${url === hero ? 'border-amber-400' : 'border-border/50'}`}>
              <img src={url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {url !== hero && (
                  <button onClick={() => setAsHero(url)} title="Set as hero" className="p-1 bg-amber-400 rounded-full text-black hover:bg-amber-300">
                    <Star className="w-3 h-3" />
                  </button>
                )}
                <button onClick={() => removeImage(url)} title="Remove" className="p-1 bg-red-500 rounded-full text-white hover:bg-red-400">
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
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground border border-dashed border-border rounded-lg">
          <Image className="w-6 h-6 mb-1 opacity-40" />
          <p className="text-xs">No images yet — add up to 10</p>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground font-body">
        ★ Hover an image and click the star to set it as the hero (main) image. Up to 10 images per listing.
      </p>

      {error && (
        <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
          <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}