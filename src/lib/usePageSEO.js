/**
 * usePageSEO — injects unique SEO tags into <head> on every page.
 *
 * Sets:
 *   <title>
 *   <meta name="description">
 *   <meta name="keywords">
 *   <meta name="robots">
 *   <link rel="canonical">
 *   og:title, og:description, og:url, og:type, og:image, og:image:alt,
 *   og:image:width, og:image:height, og:site_name, og:locale
 *   twitter:card, twitter:title, twitter:description, twitter:image, twitter:image:alt
 *   JSON-LD schema block (optional)
 *
 * Usage:
 *   usePageSEO({
 *     title:       'Page Title | RE/MAX Zam',
 *     description: 'Meta description (≤160 chars)',
 *     canonical:   'https://remaxzam.ae/page-slug',
 *     ogImage:     'https://…/image.jpg',   // optional — falls back to default
 *     ogImageAlt:  'Descriptive alt text',  // optional
 *     keywords:    'keyword, keyword',       // optional
 *     robots:      'index, follow',          // optional — defaults to 'index, follow'; use 'noindex, nofollow' for private pages
 *     schema:      { '@context': '…', … },  // optional extra LD+JSON
 *   });
 */
import { useEffect, useRef } from 'react';

const DEFAULT_OG_IMAGE = 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/e55db5afd_generated_image.png';
const DEFAULT_OG_IMAGE_ALT = 'RE/MAX Zam Dubai — Dubai Real Estate Investment';
const SITE_NAME = 'RE/MAX ZAM Dubai';
const DEFAULT_TITLE = 'Dubai Property Investment | RE/MAX Zam Real Estate';
const DEFAULT_DESCRIPTION = 'Invest in Dubai off-plan, ready apartments and luxury villas with RE/MAX Zam. Backed by the RE/MAX global network and senior advisors. Explore high-ROI opportunities.';
const DEFAULT_ROBOTS = 'index, follow';

/** Upsert a <meta> element by attribute selector */
function setMeta(attrName, attrValue, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Upsert a <link> element by rel */
function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Inject / replace a <script type="application/ld+json"> block by id */
function injectSchema(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function usePageSEO({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  keywords,
  robots,
  schema,
} = {}) {
  const schemaRef = useRef(schema);
  schemaRef.current = schema;

  useEffect(() => {
    const image = ogImage || DEFAULT_OG_IMAGE;
    const imageAlt = ogImageAlt || DEFAULT_OG_IMAGE_ALT;

    // ── <title> ──────────────────────────────────────────────────────────────
    if (title) document.title = title;

    // ── Primary meta ─────────────────────────────────────────────────────────
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', robots || DEFAULT_ROBOTS);

    // ── Canonical ────────────────────────────────────────────────────────────
    setLink('canonical', canonical);

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta('property', 'og:type',        'website');
    setMeta('property', 'og:site_name',   SITE_NAME);
    setMeta('property', 'og:locale',      'en_AE');
    setMeta('property', 'og:title',       title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url',         canonical);
    setMeta('property', 'og:image',       image);
    setMeta('property', 'og:image:alt',   imageAlt);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height','630');

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:site',        '@remaxzam');
    setMeta('name', 'twitter:title',       title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image',       image);
    setMeta('name', 'twitter:image:alt',   imageAlt);

    // ── JSON-LD schema ───────────────────────────────────────────────────────
    if (schemaRef.current) {
      injectSchema('page-schema', schemaRef.current);
    }

    // ── Cleanup: restore defaults on unmount ─────────────────────────────────
    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('name', 'description', DEFAULT_DESCRIPTION);
      setMeta('name', 'robots', DEFAULT_ROBOTS);
      const el = document.getElementById('page-schema');
      if (el) el.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, ogImage, ogImageAlt, keywords, robots]);
}