import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Parses a property listing URL from PropertyFinder, Bayut, or Dubizzle
// and creates a Property record in the database using AI extraction.

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

    const { url, transaction_type, listing_status } = await req.json();
    if (!url) return Response.json({ error: 'URL is required' }, { status: 400 });

    // Fetch the page content
    const pageRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await pageRes.text();

    // For remaxzam.ae — extract JSON-LD structured data if present (more accurate)
    let structuredData = '';
    const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    for (const match of jsonLdMatches) {
      const inner = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      structuredData += inner + '\n';
    }

    // Strip tags to get text content
    const text = (structuredData + '\n\n' + html)
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .substring(0, 10000);

    // Use AI to extract structured data
    const extracted = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Extract property listing data from this real estate page text. Return ONLY valid JSON matching the schema exactly.

Page text:
${text}

Source URL: ${url}

Determine transaction_type based on context:
- "Residential Sale" = apartments, villas, townhouses, penthouses for SALE
- "Residential Rental" = apartments, villas, townhouses for RENT/LEASE
- "Commercial Sale" = offices, retail, land, warehouses for SALE
- "Commercial Lease" = offices, retail, warehouses for RENT/LEASE

Return JSON with these exact fields (use null for missing values):
{
  "title": "property title/headline",
  "location": "area/district in Dubai",
  "community": "specific community/building name",
  "transaction_type": one of ["Residential Sale","Residential Rental","Commercial Sale","Commercial Lease"],
  "property_type": one of ["Apartment","Villa","Penthouse","Townhouse","Land","Office","Retail","Warehouse","Shop"],
  "listing_status": one of ["Off-Plan","Ready","Resale"] or null (null for rentals),
  "bedrooms": number or null (0 for studio),
  "bathrooms": number or null,
  "area_sqft": number or null,
  "price_aed": number or null (annual rent in AED for rentals, sale price for sales),
  "developer": "developer name or null",
  "completion_date": "completion date string or null",
  "description": "full property description text",
  "image_url": null,
  "featured": false,
  "status": "Available"
}`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          location: { type: 'string' },
          community: { type: 'string' },
          transaction_type: { type: 'string' },
          property_type: { type: 'string' },
          listing_status: { type: 'string' },
          bedrooms: { type: 'number' },
          bathrooms: { type: 'number' },
          area_sqft: { type: 'number' },
          price_aed: { type: 'number' },
          developer: { type: 'string' },
          completion_date: { type: 'string' },
          description: { type: 'string' },
          image_url: { type: 'string' },
          featured: { type: 'boolean' },
          status: { type: 'string' },
        }
      }
    });

    // Validate and clean
    if (!extracted.title || !extracted.price_aed) {
      return Response.json({ error: 'Could not extract listing data from this URL. Please check the URL and try again.' }, { status: 422 });
    }

    // Enforce enum values
    const validTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Land', 'Office', 'Retail', 'Warehouse', 'Shop'];
    const validTransactions = ['Residential Sale', 'Residential Rental', 'Commercial Sale', 'Commercial Lease'];
    const validStatuses = ['Off-Plan', 'Ready', 'Resale'];
    if (!validTypes.includes(extracted.property_type)) extracted.property_type = 'Apartment';
    
    // Override with category selection if provided
    if (transaction_type && validTransactions.includes(transaction_type)) {
      extracted.transaction_type = transaction_type;
    } else if (!validTransactions.includes(extracted.transaction_type)) {
      extracted.transaction_type = 'Residential Sale';
    }
    
    if (listing_status && validStatuses.includes(listing_status)) {
      extracted.listing_status = listing_status;
    } else if (!validStatuses.includes(extracted.listing_status)) {
      extracted.listing_status = null;
    }

    // Create the property record
    const property = await base44.asServiceRole.entities.Property.create(extracted);

    return Response.json({ success: true, property });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});