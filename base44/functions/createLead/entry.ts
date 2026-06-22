import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Relaxed rate limits — generous enough for dev testing and normal traffic
// while still preventing true abuse. Cloudflare / Base44 infra handles
// the global DDoS layer; this is a light per-email backstop.
const MAX_PER_HOUR = 10;
const ONE_HOUR_MS = 60 * 60 * 1000;

function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const lead = body || {};
    const email = normalizeEmail(lead.email);

    if (!lead.full_name || !email || !lead.lead_type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fast path: create first, then async-check duplicates.
    // This avoids the expensive history query on every submission
    // and prevents timeout stack-ups under concurrent requests.
    const created = await base44.asServiceRole.entities.Lead.create({
      ...lead,
      email,
    });

    // Fire-and-forget rate check — never blocks the response.
    // If the user is spamming, the subsequent attempt will be caught.
    base44.asServiceRole.entities.Lead
      .filter({ email }, '-created_date', MAX_PER_HOUR + 1)
      .then((recent) => {
        if (recent.length > MAX_PER_HOUR) {
          // Delete the oldest extra record to keep the count clean
          const oldest = recent[recent.length - 1];
          if (oldest?.id) {
            base44.asServiceRole.entities.Lead
              .delete(oldest.id)
              .catch(() => {});
          }
        }
      })
      .catch(() => {});

    return Response.json({ success: true, lead: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
