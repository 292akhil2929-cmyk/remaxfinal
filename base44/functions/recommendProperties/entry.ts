import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch data
    const searchHistory = await base44.entities.SearchHistory.filter({ created_by: user.email }, '-created_date', 5);
    const allProperties = (await base44.entities.Property.list('-updated_date', 50))
      .filter((p) => !p.isPocketListing); // Exclude pocket listings from recommendations

    if (searchHistory.length === 0 || allProperties.length < 5) {
      return Response.json({ recommendations: [], count: 0 });
    }

    // Extract patterns
    const communities = [...new Set(searchHistory.filter(s => s.community).map(s => s.community))];
    const types = [...new Set(searchHistory.filter(s => s.property_type).map(s => s.property_type))];

    // Simple matching algorithm: prioritize matching communities/types and exclude already saved
    const savedIds = (await base44.entities.SavedProperty.filter({ created_by: user.email })).map(s => s.property_id);
    const unsavedProps = allProperties.filter(p => !savedIds.includes(p.id));

    // Score properties based on match
    const scored = unsavedProps.map(p => {
      let score = 0;
      if (communities.includes(p.community)) score += 10;
      if (types.includes(p.property_type)) score += 8;
      if (p.status === 'Available') score += 5;
      if (p.expected_roi > 5) score += 3;
      return { ...p, score };
    });

    const recommendations = scored.sort((a, b) => b.score - a.score).slice(0, 5);

    return Response.json({ 
      recommendations,
      count: recommendations.length
    });
  } catch (error) {
    return Response.json({ recommendations: [], error: error.message });
  }
});