import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Automatically generates and publishes a Dubai real estate blog post
// using AI. Called daily by an automation.

const TOPICS = [
  'Dubai rental yield trends and which communities are outperforming in 2025',
  'Off-plan property investment opportunities in Dubai — new project launches and payment plans',
  'UAE Golden Visa updates — latest rules and property eligibility for 2025',
  'Dubai property prices: monthly market update and area-by-area analysis',
  'Why international investors are choosing Dubai over London and Singapore in 2025',
  'Best communities for first-time property investors in Dubai under AED 1M',
  'Dubai off-plan vs ready property — which delivers better returns this quarter',
  'How to maximise rental yield in Dubai: property management tips from RE/MAX Zam',
  'Dubai real estate market news — top transactions and new project launches this week',
  'Dubai Hills Estate vs JVC vs Business Bay: investment comparison for 2025',
  'Sobha, DAMAC, Emaar — comparing Dubai\'s top developer payment plans right now',
  'Dubai property for expats: complete guide to buying, renting, and the Golden Visa',
  'Short-term rental strategy in Dubai — Airbnb yields vs long-term leases in 2025',
  'Al Furjan, Motor City, Dubai Land: hidden gem communities for yield investors',
  'Dubai property investment for UK buyers: tax, mortgage, and Golden Visa guide',
];

const CATEGORIES = ['Market Analysis', 'Investment Guide', 'Golden Visa', 'Area Spotlight', 'Developer News', 'Agent Tips'];

const SIGNING_SECRET = Deno.env.get('BASE44_FUNCTIONS_SIGNING_SECRET') || '';
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000;

function normalizeSignature(signature) {
  if (!signature || typeof signature !== 'string') return '';
  return signature.startsWith('sha256=') ? signature.slice(7) : signature;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifySignedRequest(req, bodyText) {
  if (!SIGNING_SECRET) return false;
  const signature = normalizeSignature(req.headers.get('x-base44-signature'));
  const timestamp = req.headers.get('x-base44-timestamp');
  if (!signature || !timestamp) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() - ts) > TIMESTAMP_TOLERANCE_MS) return false;

  const payload = `${timestamp}.${bodyText}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SIGNING_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const signatureHex = [...new Uint8Array(signatureBuffer)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return timingSafeEqual(signatureHex, signature);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const bodyText = await req.text();
    const base44 = createClientFromRequest(req);
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }

    const isAdmin = !!user && user.role === 'admin';
    const isSigned = !isAdmin && (await verifySignedRequest(req, bodyText));

    if (!isAdmin && !isSigned) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pick a topic that hasn't been recently covered
    const existing = await base44.asServiceRole.entities.BlogPost.list('-created_date', 20);
    const existingTitles = existing.map(p => p.title?.toLowerCase() || '');

    let topic = pickRandom(TOPICS);
    // Try to avoid repetition
    for (let i = 0; i < 5; i++) {
      const candidate = pickRandom(TOPICS);
      const alreadyCovered = existingTitles.some(t => t.includes(candidate.split(' ').slice(0, 3).join(' ').toLowerCase()));
      if (!alreadyCovered) { topic = candidate; break; }
    }

    const today = new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' });

    const post = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are a senior Dubai real estate investment analyst and content writer for RE/MAX Zam, a leading Dubai property brokerage.

Write a high-quality, SEO-optimised blog post on this topic: "${topic}"

Today's date: ${today}

Requirements:
- Tone: professional, authoritative, data-driven — NOT salesy
- Target audience: international property investors (UK, Europe, India, GCC)
- Include real data points, percentages, and specifics where relevant
- Write for Google and GEO (AI search engines) — use natural question phrases
- The post should be genuinely useful and informative
- Naturally mention RE/MAX Zam as the expert source 1-2 times maximum
- End with a clear call to action to contact RE/MAX Zam for personalised advice

Return JSON with:
{
  "title": "SEO-optimised headline (include year 2025 where natural)",
  "excerpt": "2-3 sentence meta description / excerpt (150-160 chars ideal)",
  "content": "Full article in plain text with clear paragraphs (800-1200 words)",
  "category": one of ["Market Analysis","Investment Guide","Golden Visa","Area Spotlight","Developer News","Agent Tips"],
  "seo_keywords": "5-8 comma-separated keywords",
  "image_url": null
}`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          excerpt: { type: 'string' },
          content: { type: 'string' },
          category: { type: 'string' },
          seo_keywords: { type: 'string' },
          image_url: { type: 'string' },
        }
      }
    });

    const validCategories = ['Market Analysis', 'Investment Guide', 'Golden Visa', 'Area Spotlight', 'Developer News', 'Agent Tips'];
    if (!validCategories.includes(post.category)) post.category = 'Market Analysis';

    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 80);

    const created = await base44.asServiceRole.entities.BlogPost.create({
      ...post,
      slug,
      published: true,
      image_url: post.image_url || null,
    });

    return Response.json({ success: true, post: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});