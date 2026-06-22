import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Export property feed for external portals (Bayut, PropertyFinder, Dubizzle, etc.)
 * 
 * Pocket listings (isPocketListing: true) are STRICTLY excluded from this feed.
 * 
 * GET  → returns JSON feed
 * POST → returns JSON feed (admin-only for full data)
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    let user = null;
    try {
      user = await base44.auth.me();
    } catch {
      // Public access — limited feed
    }

    const isAdmin = user?.role === 'admin';

    // Fetch all properties, exclude pocket listings
    const allProperties = await base44.entities.Property.list('-created_date', 200);
    const feedProperties = allProperties.filter((p) => !p.isPocketListing);

    // Map to a standardized feed format suitable for portal ingestion
    const feed = feedProperties.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      price_aed: p.price_aed,
      price_label: p.price_label || null,
      transaction_type: p.transaction_type,
      property_type: p.property_type,
      listing_status: p.listing_status,
      status: p.status,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area_sqft: p.area_sqft,
      location: p.location,
      community: p.community,
      developer: p.developer,
      completion_date: p.completion_date,
      expected_roi: p.expected_roi,
      rental_yield: p.rental_yield,
      featured: p.featured || false,
      image_url: p.image_url,
      gallery_images: p.gallery_images || [],
      assigned_agent: isAdmin ? p.assigned_agent : undefined,
      created_date: p.created_date,
      updated_date: p.updated_date,
      // Portal-specific flags
      available_for_portal: !p.isPocketListing, // Always true here since we filtered
    }));

    return Response.json({
      success: true,
      count: feed.length,
      generated_at: new Date().toISOString(),
      feed: feed,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});
