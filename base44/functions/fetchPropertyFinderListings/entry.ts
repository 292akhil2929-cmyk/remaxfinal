import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const brokerUrl = 'https://www.propertyfinder.ae/en/broker/remax-zam-12689';
    const response = await fetch(brokerUrl);
    const html = await response.text();

    const listings = [];

    // Try multiple JSON extraction patterns
    let jsonMatch = html.match(/<script[^>]*>\s*window\.__INITIAL_STATE__\s*=\s*({[\s\S]*?});\s*<\/script>/);
    
    if (!jsonMatch) {
      jsonMatch = html.match(/<script[^>]*>\s*({[\s\S]*?"items"[\s\S]*?})[\s\S]*?<\/script>/);
    }
    
    if (!jsonMatch) {
      // Try finding any JSON object with listings structure
      jsonMatch = html.match(/({[\s\S]*?"items"\s*:\s*\[[\s\S]*?\][\s\S]*?})/);
    }

    if (!jsonMatch) {
      return Response.json({ 
        error: 'No JSON data found', 
        debug: 'Could not extract listings JSON from page',
        listings: [] 
      }, { status: 200 });
    }

    try {
      const initialState = JSON.parse(jsonMatch[1]);
      
      // Try multiple paths to find listings
      let listings_data = initialState?.results?.data?.items || 
                          initialState?.items || 
                          initialState?.data?.items ||
                          [];

      if (!Array.isArray(listings_data)) {
        listings_data = [];
      }

      for (const item of listings_data.slice(0, 20)) {
        if (!item || typeof item !== 'object') continue;

        const price = item.price || 0;
        const bedrooms = item.bedroomCount || item.bedrooms || 0;
        const bathrooms = item.bathroomCount || item.bathrooms || 1;
        const area = item.unitArea || item.area || null;
        const title = item.title || item.name || 'Property';
        const location = item.community?.name || item.community || item.suburb?.name || item.suburb || 'Dubai';

        // Extract images from various possible keys
        let images = [];
        if (item.photos && Array.isArray(item.photos)) {
          images = item.photos.map(p => p.url || p.urlSmall || p).filter(Boolean);
        } else if (item.images && Array.isArray(item.images)) {
          images = item.images.map(i => i.url || i).filter(Boolean);
        }

        if (price > 0) {  // Only add if has valid price
          listings.push({
            title: `${bedrooms > 0 ? bedrooms + ' BR' : 'Studio'} - ${title}`,
            price_aed: price,
            bedrooms: bedrooms > 0 ? bedrooms : 0,
            bathrooms,
            area_sqft: area,
            location,
            transaction_type: 'Residential Sale',
            property_type: item.category || item.property_type || 'Apartment',
            source: 'PropertyFinder',
            featured: false,
            image_url: images[0] || null,
            gallery_images: images.slice(0, 20),
          });
        }
      }
    } catch (parseError) {
      return Response.json({ 
        error: 'Parse error: ' + parseError.message, 
        listings: [] 
      }, { status: 200 });
    }

    return Response.json({ listings, count: listings.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});