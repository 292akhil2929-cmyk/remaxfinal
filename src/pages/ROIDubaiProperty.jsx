/**
 * Landing page: /10-net-roi-dubai-property
 * Campaign: Dubai Wealth Engine — 10% Net ROI
 */
import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, Percent, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  WhatsAppFloat, TrustStrip,
  FounderStrip, RedCTABand, CampaignLeadForm, FaqAccordion
} from '@/components/campaign/CampaignShared';
import usePageSEO from '@/lib/usePageSEO';

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://remaxzam.ae/10-net-roi-dubai-property',
      url: 'https://remaxzam.ae/10-net-roi-dubai-property',
      name: '10% Net ROI Dubai Property | Tax-Free Rental Returns | RE/MAX Zam',
      description: 'Earn up to 10% net rental ROI from Dubai property — tax-free, with 0% service charges and flexible payment plans. Calculate your returns and get a personalised plan.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://remaxzam.ae' },
          { '@type': 'ListItem', position: 2, name: 'Invest', item: 'https://remaxzam.ae/dubai-property-investment' },
          { '@type': 'ListItem', position: 3, name: '10% Net ROI Dubai Property', item: 'https://remaxzam.ae/10-net-roi-dubai-property' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is the 10% ROI guaranteed?', acceptedAnswer: { '@type': 'Answer', text: "It's a contractual, projected net return on select projects for a defined period. We show you the exact terms per project — nothing is left vague." } },
        { '@type': 'Question', name: 'Is rental income really tax-free in Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Dubai has no personal income tax, no capital gains tax and no tax on rental income.' } },
        { '@type': 'Question', name: "What's the minimum to start?", acceptedAnswer: { '@type': 'Answer', text: 'Select units start from AED 350,000, with flexible payment plans.' } },
        { '@type': 'Question', name: 'Can I get a Golden Visa too?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — from AED 2M in property you qualify for a renewable 10-year Golden Visa. Ask us how to structure it.' } },
      ],
    },
  ],
};

// ─── AREA DATA — 100 Dubai communities ────────────────────────────────────────

const AREAS = [
  // ── Iconic / Ultra-Premium ──────────────────────────────────────────────────
  { id: 'palm-jumeirah',        name: 'Palm Jumeirah',                  tag: 'Luxury · Trophy Asset',          yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1500000,  priceMax: 200000000, priceDefault: 5000000,  appreciation: 12 },
  { id: 'downtown-dubai',       name: 'Downtown Dubai',                 tag: 'Central · Capital Growth',       yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1200000,  priceMax: 50000000,  priceDefault: 2000000,  appreciation: 10 },
  { id: 'emirates-hills',       name: 'Emirates Hills',                 tag: 'Ultra-Luxury · Villas',          yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 10000000, priceMax: 200000000, priceDefault: 25000000, appreciation: 13 },
  { id: 'difc',                 name: 'DIFC',                           tag: 'Financial Hub · Corporate',      yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 900000,   priceMax: 20000000,  priceDefault: 2500000,  appreciation: 9  },
  { id: 'city-walk',            name: 'City Walk',                      tag: 'Urban · Lifestyle',              yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1200000,  priceMax: 15000000,  priceDefault: 2200000,  appreciation: 9  },
  { id: 'bluewaters-island',    name: 'Bluewaters Island',              tag: 'Waterfront · Tourism',           yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 2000000,  priceMax: 30000000,  priceDefault: 4000000,  appreciation: 10 },
  // ── Marina & JBR ───────────────────────────────────────────────────────────
  { id: 'dubai-marina',         name: 'Dubai Marina',                   tag: 'Waterfront · Expat Demand',      yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 700000,   priceMax: 20000000,  priceDefault: 1500000,  appreciation: 8  },
  { id: 'jbr',                  name: 'Jumeirah Beach Residence (JBR)', tag: 'Beachfront · Tourism',           yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1000000,  priceMax: 15000000,  priceDefault: 2000000,  appreciation: 9  },
  { id: 'jlt',                  name: 'Jumeirah Lake Towers (JLT)',     tag: 'Affordable · Metro Access',      yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 8000000,   priceDefault: 900000,   appreciation: 7  },
  // ── Business Bay / Downtown adjacent ───────────────────────────────────────
  { id: 'business-bay',         name: 'Business Bay',                   tag: 'Business Hub · Growth Zone',     yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 600000,   priceMax: 15000000,  priceDefault: 1200000,  appreciation: 9  },
  { id: 'al-habtoor-city',      name: 'Al Habtoor City',                tag: 'Mixed-Use · Branded',            yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 800000,   priceMax: 10000000,  priceDefault: 1500000,  appreciation: 8  },
  // ── Palm & Waterfront ──────────────────────────────────────────────────────
  { id: 'palm-jebel-ali',       name: 'Palm Jebel Ali',                 tag: 'New Launch · Mega Project',      yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 2000000,  priceMax: 50000000,  priceDefault: 6000000,  appreciation: 15 },
  { id: 'dubai-harbour',        name: 'Dubai Harbour',                  tag: 'Marina · Superyacht',            yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 25000000,  priceDefault: 3000000,  appreciation: 11 },
  { id: 'maritime-city',        name: 'Dubai Maritime City',            tag: 'Waterfront · Emerging',          yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 800000,   priceMax: 10000000,  priceDefault: 1800000,  appreciation: 12 },
  // ── Jumeirah ───────────────────────────────────────────────────────────────
  { id: 'jumeirah-1',           name: 'Jumeirah 1',                     tag: 'Established · Villas',           yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 3000000,  priceMax: 30000000,  priceDefault: 7000000,  appreciation: 8  },
  { id: 'jumeirah-2',           name: 'Jumeirah 2',                     tag: 'Beachside · Villas',             yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 4000000,  priceMax: 40000000,  priceDefault: 9000000,  appreciation: 8  },
  { id: 'jumeirah-3',           name: 'Jumeirah 3',                     tag: 'Spacious · Family',              yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 3500000,  priceMax: 35000000,  priceDefault: 8000000,  appreciation: 8  },
  { id: 'la-mer',               name: 'La Mer',                         tag: 'Beach · Lifestyle',              yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1000000,  priceMax: 12000000,  priceDefault: 2500000,  appreciation: 9  },
  { id: 'pearl-jumeirah',       name: 'Pearl Jumeirah',                 tag: 'Exclusive · Waterfront',         yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 5000000,  priceMax: 80000000,  priceDefault: 15000000, appreciation: 11 },
  // ── Dubai Hills & MBR City ─────────────────────────────────────────────────
  { id: 'dubai-hills-estate',   name: 'Dubai Hills Estate',             tag: 'Family Living · Green',          yieldMin: 5,  yieldMax: 6,  yieldDefault: 5.5, priceMin: 1500000,  priceMax: 40000000,  priceDefault: 3500000,  appreciation: 14 },
  { id: 'mbr-city',             name: 'Mohammed Bin Rashid City',       tag: 'Master Plan · Capital Growth',   yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1000000,  priceMax: 30000000,  priceDefault: 2500000,  appreciation: 12 },
  { id: 'district-one',         name: 'District One (MBR City)',        tag: 'Crystal Lagoon · Villas',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 5000000,  priceMax: 80000000,  priceDefault: 12000000, appreciation: 13 },
  { id: 'sobha-hartland',       name: 'Sobha Hartland',                 tag: 'Green · Premium Apartments',     yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 800000,   priceMax: 15000000,  priceDefault: 1800000,  appreciation: 11 },
  { id: 'meydan',               name: 'Meydan',                         tag: 'Racecourse · Luxury',            yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 800000,   priceMax: 20000000,  priceDefault: 2000000,  appreciation: 10 },
  // ── Arabian Ranches & Golf Communities ─────────────────────────────────────
  { id: 'arabian-ranches',      name: 'Arabian Ranches',                tag: 'Villas · Golf · Family',         yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 2500000,  priceMax: 20000000,  priceDefault: 4500000,  appreciation: 10 },
  { id: 'arabian-ranches-2',    name: 'Arabian Ranches 2',              tag: 'Newer Villas · Community',       yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 2000000,  priceMax: 15000000,  priceDefault: 3500000,  appreciation: 11 },
  { id: 'arabian-ranches-3',    name: 'Arabian Ranches 3',              tag: 'Latest Phase · Off-Plan',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1800000,  priceMax: 12000000,  priceDefault: 3000000,  appreciation: 12 },
  { id: 'jumeirah-golf-estates',name: 'Jumeirah Golf Estates',          tag: 'Golf · Villas',                  yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 3000000,  priceMax: 30000000,  priceDefault: 6000000,  appreciation: 11 },
  { id: 'the-villa',            name: 'The Villa',                      tag: 'Spacious Villas · Value',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 2000000,  priceMax: 15000000,  priceDefault: 4000000,  appreciation: 9  },
  // ── High-Yield Communities ─────────────────────────────────────────────────
  { id: 'jvc',                  name: 'Jumeirah Village Circle (JVC)',   tag: 'Best Value · High Yield',        yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 350000,   priceMax: 5000000,   priceDefault: 900000,   appreciation: 7  },
  { id: 'jvt',                  name: 'Jumeirah Village Triangle (JVT)', tag: 'Affordable · Quiet',             yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 900000,   appreciation: 7  },
  { id: 'discovery-gardens',    name: 'Discovery Gardens',              tag: 'Budget · Metro Access',          yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 300000,   priceMax: 2000000,   priceDefault: 600000,   appreciation: 6  },
  { id: 'international-city',   name: 'International City',             tag: 'Ultra Budget · High Yield',      yieldMin: 9,  yieldMax: 12, yieldDefault: 10,  priceMin: 200000,   priceMax: 1500000,   priceDefault: 450000,   appreciation: 5  },
  { id: 'dso',                  name: 'Dubai Silicon Oasis (DSO)',       tag: 'Tech Hub · Affordable',          yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 350000,   priceMax: 3000000,   priceDefault: 700000,   appreciation: 7  },
  { id: 'dubai-south',          name: 'Dubai South / Expo City',        tag: 'New District · High Upside',     yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 5000000,   priceDefault: 900000,   appreciation: 14 },
  { id: 'arjan',                name: 'Arjan (Dubailand)',               tag: 'Up-and-Coming · Affordable',     yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 800000,   appreciation: 8  },
  { id: 'motor-city',           name: 'Motor City',                     tag: 'Established · Quiet',            yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 4000000,   priceDefault: 900000,   appreciation: 7  },
  { id: 'sport-city',           name: 'Dubai Sports City',              tag: 'Value · Sports Facilities',      yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 350000,   priceMax: 4000000,   priceDefault: 750000,   appreciation: 7  },
  { id: 'production-city',      name: 'Dubai Production City (IMPZ)',   tag: 'Affordable · Quiet',             yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 300000,   priceMax: 3000000,   priceDefault: 650000,   appreciation: 6  },
  { id: 'remraam',              name: 'Remraam',                        tag: 'Family · Affordable',            yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 2500000,   priceDefault: 800000,   appreciation: 6  },
  { id: 'green-community',      name: 'Green Community (DIP)',          tag: 'Villas · Greenery',              yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 10000000,  priceDefault: 3000000,  appreciation: 7  },
  // ── Al Barsha ──────────────────────────────────────────────────────────────
  { id: 'al-barsha-1',          name: 'Al Barsha 1',                    tag: 'Established · Mall of Emirates', yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 600000,   priceMax: 8000000,   priceDefault: 1200000,  appreciation: 7  },
  { id: 'al-barsha-south',      name: 'Al Barsha South',                tag: 'Affordable Villas',              yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 800000,   priceMax: 6000000,   priceDefault: 1500000,  appreciation: 7  },
  // ── Mirdif & Rashidiya ─────────────────────────────────────────────────────
  { id: 'mirdif',               name: 'Mirdif',                         tag: 'Family Villas · Old Dubai',      yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1000000,  priceMax: 8000000,   priceDefault: 2000000,  appreciation: 6  },
  { id: 'al-rashidiya',         name: 'Al Rashidiya',                   tag: 'Established · Affordable',       yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 800000,   priceMax: 5000000,   priceDefault: 1500000,  appreciation: 6  },
  // ── Creek & Festival City ──────────────────────────────────────────────────
  { id: 'festival-city',        name: 'Dubai Festival City',            tag: 'Waterfront · Mall Access',       yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 800000,   priceMax: 10000000,  priceDefault: 1800000,  appreciation: 8  },
  { id: 'dubai-creek-harbour',  name: 'Dubai Creek Harbour',            tag: 'Emerging Waterfront · EMAAR',    yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 800000,   priceMax: 15000000,  priceDefault: 2000000,  appreciation: 13 },
  { id: 'al-jaddaf',            name: 'Al Jaddaf',                      tag: 'Creek Views · Healthcare City',  yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 600000,   priceMax: 5000000,   priceDefault: 1200000,  appreciation: 9  },
  // ── Old Dubai ──────────────────────────────────────────────────────────────
  { id: 'deira',                name: 'Deira',                          tag: 'Traditional · High Rental',      yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 300000,   priceMax: 5000000,   priceDefault: 700000,   appreciation: 6  },
  { id: 'bur-dubai',            name: 'Bur Dubai',                      tag: 'Central · Commercial',           yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 5000000,   priceDefault: 900000,   appreciation: 7  },
  { id: 'al-mankhool',          name: 'Al Mankhool (Bur Dubai)',        tag: 'Apartments · High Demand',       yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 800000,   appreciation: 6  },
  { id: 'karama',               name: 'Al Karama',                      tag: 'Budget · Metro',                 yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 350000,   priceMax: 3000000,   priceDefault: 700000,   appreciation: 6  },
  { id: 'al-quoz',              name: 'Al Quoz',                        tag: 'Mixed Use · Value',              yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 5000000,   priceDefault: 900000,   appreciation: 7  },
  // ── Oud Metha / Healthcare ─────────────────────────────────────────────────
  { id: 'oud-metha',            name: 'Oud Metha',                      tag: 'Healthcare City · Central',      yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 5000000,   priceDefault: 1000000,  appreciation: 7  },
  { id: 'umm-hurair',           name: 'Umm Hurair',                     tag: 'Affordable · Central',           yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 800000,   appreciation: 6  },
  // ── Dubailand Mega Communities ─────────────────────────────────────────────
  { id: 'townsquare',           name: 'Town Square Dubai',              tag: 'Affordable · Master-Planned',    yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 5000000,   priceDefault: 1000000,  appreciation: 8  },
  { id: 'dubailand',            name: 'Dubailand',                      tag: 'Large Community · Value',        yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 6000000,   priceDefault: 900000,   appreciation: 8  },
  { id: 'living-legends',       name: 'Living Legends',                 tag: 'Villas · Golf Views',            yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1200000,  priceMax: 8000000,   priceDefault: 2200000,  appreciation: 7  },
  { id: 'global-village-area',  name: 'Global Village Area',            tag: 'Tourism · Retail',               yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 5000000,   priceDefault: 1000000,  appreciation: 8  },
  // ── Springs, Meadows, Lakes ────────────────────────────────────────────────
  { id: 'the-springs',          name: 'The Springs',                    tag: 'Villas · Lakes · Family',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 1500000,  priceMax: 8000000,   priceDefault: 2800000,  appreciation: 8  },
  { id: 'the-meadows',          name: 'The Meadows',                    tag: 'Villa Community · Premium',      yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 2500000,  priceMax: 15000000,  priceDefault: 5000000,  appreciation: 9  },
  { id: 'the-lakes',            name: 'The Lakes',                      tag: 'Waterfront Villas · EMAAR',      yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 3000000,  priceMax: 20000000,  priceDefault: 6000000,  appreciation: 9  },
  { id: 'the-views',            name: 'The Views',                      tag: 'Golf Views · Apartments',        yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 800000,   priceMax: 8000000,   priceDefault: 1800000,  appreciation: 8  },
  { id: 'the-greens',           name: 'The Greens',                     tag: 'Metro · Green · Mid-Market',     yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 600000,   priceMax: 5000000,   priceDefault: 1100000,  appreciation: 7  },
  // ── DAMAC Hills & Akoya ────────────────────────────────────────────────────
  { id: 'damac-hills',          name: 'DAMAC Hills',                    tag: 'Golf · Community · DAMAC',       yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 800000,   priceMax: 15000000,  priceDefault: 2500000,  appreciation: 9  },
  { id: 'damac-hills-2',        name: 'DAMAC Hills 2 (Akoya)',          tag: 'Affordable · Golf Community',    yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 500000,   priceMax: 6000000,   priceDefault: 1100000,  appreciation: 10 },
  { id: 'damac-lagoons',        name: 'DAMAC Lagoons',                  tag: 'Crystal Lagoons · New',          yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1200000,  priceMax: 10000000,  priceDefault: 2500000,  appreciation: 12 },
  // ── Silicon Oasis Surrounds ────────────────────────────────────────────────
  { id: 'nad-al-sheba',         name: 'Nad Al Sheba',                   tag: 'Villas · Emerging',              yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 2000000,  priceMax: 20000000,  priceDefault: 4500000,  appreciation: 11 },
  { id: 'al-warsan',            name: 'Al Warsan',                      tag: 'Budget · Near DSO',              yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 250000,   priceMax: 2000000,   priceDefault: 500000,   appreciation: 5  },
  // ── Jumeirah Beach Park Surrounds ──────────────────────────────────────────
  { id: 'umm-suqeim',           name: 'Umm Suqeim',                     tag: 'Beach · Villas · Lifestyle',     yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 4000000,  priceMax: 40000000,  priceDefault: 10000000, appreciation: 9  },
  { id: 'al-wasl',              name: 'Al Wasl',                        tag: 'Villas · Central Jumeirah',      yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 5000000,  priceMax: 50000000,  priceDefault: 12000000, appreciation: 9  },
  // ── Port Rashid / Dubai Island ─────────────────────────────────────────────
  { id: 'dubai-islands',        name: 'Dubai Islands',                  tag: 'Mega Waterfront · Future',       yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 30000000,  priceDefault: 4000000,  appreciation: 15 },
  // ── Tilal Al Ghaf & New Communities ───────────────────────────────────────
  { id: 'tilal-al-ghaf',        name: 'Tilal Al Ghaf',                  tag: 'Lagoon · New Community',         yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 2000000,  priceMax: 25000000,  priceDefault: 5000000,  appreciation: 13 },
  { id: 'mudon',                name: 'Mudon',                          tag: 'Family Villas · DAMAC',          yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 10000000,  priceDefault: 3000000,  appreciation: 9  },
  { id: 'villanova',            name: 'Villanova',                      tag: 'Townhouses · Dubai Properties',  yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1000000,  priceMax: 8000000,   priceDefault: 2200000,  appreciation: 9  },
  { id: 'serena',               name: 'Serena (Dubailand)',              tag: 'Townhouses · Value',             yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 900000,   priceMax: 6000000,   priceDefault: 1800000,  appreciation: 8  },
  { id: 'reem',                 name: 'Reem Community',                  tag: 'EMAAR · Affordable Villas',      yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1200000,  priceMax: 8000000,   priceDefault: 2500000,  appreciation: 8  },
  // ── Canal & Waterway ───────────────────────────────────────────────────────
  { id: 'al-furjan',            name: 'Al Furjan',                      tag: 'Metro · Affordable · Growing',   yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 600000,   priceMax: 6000000,   priceDefault: 1200000,  appreciation: 8  },
  { id: 'dubai-gate',           name: 'Dubai Gate (JLT)',               tag: 'High Yield · Metro',             yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 800000,   appreciation: 7  },
  // ── Silicon & Academic City ────────────────────────────────────────────────
  { id: 'academic-city',        name: 'Dubai Academic City',            tag: 'Education Hub · Niche',          yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 300000,   priceMax: 3000000,   priceDefault: 650000,   appreciation: 6  },
  { id: 'al-khail-heights',     name: 'Al Khail Heights',               tag: 'Affordable · Growth',            yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 350000,   priceMax: 3500000,   priceDefault: 750000,   appreciation: 7  },
  // ── Ras Al Khor & Nad Al Hamar ────────────────────────────────────────────
  { id: 'ras-al-khor',          name: 'Ras Al Khor Industrial',         tag: 'Industrial · Warehouse',         yieldMin: 7,  yieldMax: 10, yieldDefault: 8,   priceMin: 500000,   priceMax: 5000000,   priceDefault: 1200000,  appreciation: 6  },
  { id: 'nad-al-hamar',         name: 'Nad Al Hamar',                   tag: 'Villas · Emerging',              yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 12000000,  priceDefault: 3000000,  appreciation: 8  },
  // ── Sustainable City & Eco ─────────────────────────────────────────────────
  { id: 'sustainable-city',     name: 'The Sustainable City',           tag: 'Eco · Zero Energy · Unique',     yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 1000000,  priceMax: 7000000,   priceDefault: 2000000,  appreciation: 8  },
  // ── Expo City & South ──────────────────────────────────────────────────────
  { id: 'expo-valley',          name: 'Expo Valley',                    tag: 'Nature · Emaar · New',           yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 2500000,  priceMax: 15000000,  priceDefault: 4500000,  appreciation: 13 },
  { id: 'emaar-south',          name: 'Emaar South',                    tag: 'Airport Proximity · Golf',       yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 600000,   priceMax: 6000000,   priceDefault: 1200000,  appreciation: 11 },
  // ── Deira Islands ──────────────────────────────────────────────────────────
  { id: 'deira-islands',        name: 'Deira Islands',                  tag: 'Waterfront · Budget Entry',      yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 500000,   priceMax: 6000000,   priceDefault: 1100000,  appreciation: 10 },
  // ── Yas & Saadiyat (Abu Dhabi border) ─────────────────────────────────────
  { id: 'dubai-investment-park',name: 'Dubai Investment Park (DIP)',     tag: 'Industrial · Affordable',        yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 900000,   appreciation: 7  },
  // ── Jumeirah Park & Heights ────────────────────────────────────────────────
  { id: 'jumeirah-park',        name: 'Jumeirah Park',                  tag: 'Nakheel Villas · Family',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 3000000,  priceMax: 15000000,  priceDefault: 5500000,  appreciation: 9  },
  { id: 'jumeirah-heights',     name: 'Jumeirah Heights',               tag: 'Canal · Mid-Luxury',             yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1200000,  priceMax: 10000000,  priceDefault: 2500000,  appreciation: 8  },
  { id: 'jumeirah-islands',     name: 'Jumeirah Islands',               tag: 'Island Villas · Nakheel',        yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 4000000,  priceMax: 25000000,  priceDefault: 8000000,  appreciation: 10 },
  // ── Culture Village & Al Jadaf ─────────────────────────────────────────────
  { id: 'culture-village',      name: 'Culture Village (Al Jadaf)',     tag: 'Waterfront · Arts',              yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 600000,   priceMax: 6000000,   priceDefault: 1300000,  appreciation: 9  },
  // ── Jebel Ali ──────────────────────────────────────────────────────────────
  { id: 'jebel-ali',            name: 'Jebel Ali Village',              tag: 'Villas · Quiet · South Dubai',   yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1500000,  priceMax: 10000000,  priceDefault: 3000000,  appreciation: 8  },
  // ── Park Heights & Collective ──────────────────────────────────────────────
  { id: 'park-heights',         name: 'Park Heights (Dubai Hills)',      tag: 'EMAAR · Apartments · Views',     yieldMin: 5,  yieldMax: 7,  yieldDefault: 6,   priceMin: 800000,   priceMax: 10000000,  priceDefault: 1800000,  appreciation: 13 },
  { id: 'collective',           name: 'Collective (Dubai Hills)',        tag: 'Co-living · Young Professionals',yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 500000,   priceMax: 4000000,   priceDefault: 900000,   appreciation: 12 },
  // ── Wadi Al Safa / Falcon City ─────────────────────────────────────────────
  { id: 'falcon-city',          name: 'Falcon City of Wonders',         tag: 'Thematic · Budget Villas',       yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1000000,  priceMax: 7000000,   priceDefault: 2000000,  appreciation: 7  },
  // ── Sobha One ──────────────────────────────────────────────────────────────
  { id: 'sobha-one',            name: 'Sobha One (Ras Al Khor)',        tag: 'Creek Views · Premium',          yieldMin: 6,  yieldMax: 8,  yieldDefault: 7,   priceMin: 1000000,  priceMax: 12000000,  priceDefault: 2500000,  appreciation: 11 },
  // ── Binghatti & Ellington Pockets ─────────────────────────────────────────
  { id: 'science-park',         name: 'Dubai Science Park',             tag: 'Tech · Niche · Growing',         yieldMin: 8,  yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 850000,   appreciation: 8  },
  { id: 'trade-centre',         name: 'World Trade Centre Residences',  tag: 'Central · Corporate',            yieldMin: 7,  yieldMax: 9,  yieldDefault: 8,   priceMin: 700000,   priceMax: 8000000,   priceDefault: 1500000,  appreciation: 8  },
  { id: 'satwa',                name: 'Al Satwa',                       tag: 'Budget · Central · Redevelopment',yieldMin: 8, yieldMax: 10, yieldDefault: 9,   priceMin: 400000,   priceMax: 4000000,   priceDefault: 850000,   appreciation: 9  },
  { id: 'al-safa',              name: 'Al Safa',                        tag: 'Central Park · Villas',          yieldMin: 4,  yieldMax: 6,  yieldDefault: 5,   priceMin: 5000000,  priceMax: 40000000,  priceDefault: 12000000, appreciation: 9  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function shortAED(n) {
  if (n >= 1_000_000) return 'AED ' + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'M';
  if (n >= 1_000)     return 'AED ' + (n / 1_000).toFixed(0) + 'K';
  return 'AED ' + n;
}

// ─── SLIDER ───────────────────────────────────────────────────────────────────

function Slider({ label, value, min, max, step, onChange, displayValue, minLabel, maxLabel }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-heading font-bold text-gray-900">{displayValue}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full cursor-pointer appearance-none"
        style={{ background: `linear-gradient(to right, #C9A84C ${pct}%, #e5e7eb ${pct}%)`, accentColor: '#C9A84C' }}
      />
      <div className="flex justify-between text-[10px] text-gray-400 font-body">
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── SEARCHABLE AREA COMBOBOX ─────────────────────────────────────────────────

function AreaCombobox({ value, onChange }) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const ref                 = useRef(null);
  const inputRef            = useRef(null);
  const selected            = AREAS.find(a => a.id === value);

  // Close on outside click
  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = query.trim()
    ? AREAS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.tag.toLowerCase().includes(query.toLowerCase()))
    : AREAS;

  function select(id) {
    onChange(id);
    setQuery('');
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger / Search input */}
      <div
        className={`flex items-center gap-2 bg-gray-50 border rounded-xl px-4 py-3 cursor-text transition-all ${open ? 'border-[#C9A84C] ring-2 ring-[#C9A84C]/20' : 'border-gray-200 hover:border-gray-300'}`}
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 0); }}
      >
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Dubai areas…"
            className="flex-1 bg-transparent text-sm font-body text-gray-900 placeholder:text-gray-400 outline-none"
          />
        ) : (
          <span className="flex-1 text-sm font-heading font-bold text-gray-900 truncate">{selected?.name || 'Select area…'}</span>
        )}
        <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
          {/* Count */}
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <span className="text-[10px] font-body text-gray-400">{filtered.length} area{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400 font-body">No areas found</li>
            ) : filtered.map(a => (
              <li
                key={a.id}
                onClick={() => select(a.id)}
                className={`group flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors
                  ${a.id === value
                    ? 'bg-[#C9A84C] text-black'
                    : 'hover:bg-[#C9A84C]/10 hover:text-[#8a6f2e]'
                  }`}
              >
                <div className="min-w-0">
                  <p className={`text-sm font-heading font-semibold truncate ${a.id === value ? 'text-black' : 'text-gray-900 group-hover:text-[#7a6020]'}`}>
                    {a.name}
                  </p>
                  <p className={`text-[10px] font-body truncate ${a.id === value ? 'text-black/60' : 'text-gray-400 group-hover:text-[#9a7e35]'}`}>
                    {a.tag}
                  </p>
                </div>
                <span className={`ml-3 shrink-0 text-xs font-heading font-bold px-2 py-0.5 rounded-full
                  ${a.id === value ? 'bg-black/20 text-black' : 'bg-[#C9A84C]/15 text-[#C9A84C] group-hover:bg-[#C9A84C]/30'}`}>
                  {a.yieldMin}–{a.yieldMax}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────

function ROICalculator() {
  const [areaId, setAreaId]     = useState('jvc');
  const [price, setPrice]       = useState(900000);
  const [yieldPct, setYieldPct] = useState(9);
  const [holdYears, setHoldYears] = useState(5);
  const [showForm, setShowForm] = useState(false);

  const area = AREAS.find(a => a.id === areaId);

  // Auto-reset sliders when area changes
  useEffect(() => {
    setPrice(area.priceDefault);
    setYieldPct(area.yieldDefault);
  }, [areaId]);

  const results = useMemo(() => {
    const annualRent     = price * (yieldPct / 100);
    const totalRent      = annualRent * holdYears;
    const futureValue    = price * Math.pow(1 + area.appreciation / 100, holdYears);
    const capitalGain    = futureValue - price;
    const totalReturn    = totalRent + capitalGain;
    const totalROI       = (totalReturn / price) * 100;
    const annualisedROI  = (Math.pow(1 + totalROI / 100, 1 / holdYears) - 1) * 100;
    return { annualRent, totalRent, futureValue, capitalGain, totalReturn, totalROI, annualisedROI };
  }, [price, yieldPct, holdYears, area.appreciation]);

  const full = (n) => 'AED ' + Math.round(n).toLocaleString();

  return (
    <div id="calculator" className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="bg-[#141E30] px-6 py-5">
        <p className="font-heading font-bold text-white text-base tracking-tight">Investment Return Calculator</p>
        <p className="text-xs text-white/50 font-body mt-0.5">
          Select any of Dubai's {AREAS.length}+ communities — yields auto-fill from market data
        </p>
      </div>

      <div className="p-6 space-y-5">

        {/* ── Searchable Area Combobox ── */}
        <div className="space-y-2">
          <label className="text-xs font-heading font-semibold text-gray-400 uppercase tracking-widest">Dubai Area / Community</label>
          <AreaCombobox value={areaId} onChange={setAreaId} />
          {/* Area tag badges */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="text-[11px] font-semibold bg-[#C9A84C]/10 text-[#C9A84C] px-2.5 py-1 rounded-full font-body">
              Yield {area.yieldMin}–{area.yieldMax}%
            </span>
            <span className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-body">
              {area.appreciation}% appreciation p.a.
            </span>
            <span className="text-[11px] bg-gray-100 text-gray-400 px-2.5 py-1 rounded-full font-body">
              {area.tag}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* ── Sliders ── */}
        <Slider
          label="Purchase Price"
          value={price} min={area.priceMin} max={area.priceMax} step={5000}
          onChange={setPrice}
          displayValue={shortAED(price)}
          minLabel={shortAED(area.priceMin)}
          maxLabel={shortAED(area.priceMax)}
        />

        <Slider
          label="Rental Yield"
          value={yieldPct} min={area.yieldMin} max={area.yieldMax} step={0.1}
          onChange={setYieldPct}
          displayValue={yieldPct.toFixed(1) + '%'}
          minLabel={area.yieldMin + '%'}
          maxLabel={area.yieldMax + '%'}
        />

        <Slider
          label="Holding Period"
          value={holdYears} min={1} max={10} step={1}
          onChange={setHoldYears}
          displayValue={holdYears + ' yr' + (holdYears > 1 ? 's' : '')}
          minLabel="1 yr"
          maxLabel="10 yrs"
        />

        {/* ── Results ── */}
        <div className="bg-[#141E30] rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1">
                Total ROI · {holdYears} yr{holdYears > 1 ? 's' : ''}
              </p>
              <p className="text-5xl font-display font-black text-[#C9A84C] leading-none">
                {results.totalROI.toFixed(1)}<span className="text-2xl">%</span>
              </p>
              <p className="text-[11px] text-white/40 font-body mt-1">
                {results.annualisedROI.toFixed(1)}% annualised
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1">Total Return</p>
              <p className="text-lg font-heading font-black text-white">{full(results.totalReturn)}</p>
            </div>
          </div>
          <div className="border-t border-white/10 grid grid-cols-2 divide-x divide-white/10">
            {[
              { label: 'Annual Rent',   value: full(results.annualRent),   gold: false },
              { label: 'Total Rental',  value: full(results.totalRent),    gold: false },
              { label: 'Capital Gain',  value: full(results.capitalGain),  gold: true  },
              { label: 'Exit Value',    value: full(results.futureValue),   gold: false },
            ].map((item, i) => (
              <div key={item.label} className={`px-4 py-3 ${i >= 2 ? 'border-t border-white/10' : ''}`}>
                <p className="text-[10px] text-white/40 font-body mb-0.5">{item.label}</p>
                <p className={`text-xs font-heading font-bold ${item.gold ? 'text-[#C9A84C]' : 'text-white'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-gray-400 font-body leading-relaxed">
          Illustrative projections only. Appreciation based on {area.name} historical averages. Past performance is not a guarantee of future results.
        </p>

        {showForm ? (
          <CampaignLeadForm source="ROI Calculator — /10-net-roi-dubai-property" ctaLabel="Get My Personalised Plan" />
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-body text-gray-500">
              Want real units in {area.name} with exact payment plans?
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="w-full h-12 bg-[#C9A84C] hover:bg-[#b8963e] text-black font-heading font-bold text-sm rounded-xl transition-colors"
            >
              Get My Personalised Plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMPARISON BAR ───────────────────────────────────────────────────────────

const CITIES = [
  { city: 'Hong Kong', yieldPct: 2.3 },
  { city: 'Singapore', yieldPct: 2.8 },
  { city: 'London', yieldPct: 3.0 },
  { city: 'New York', yieldPct: 3.2 },
  { city: 'Dubai', yieldPct: 10, highlight: true },
];

function ComparisonBar() {
  const max = 10;
  return (
    <div className="space-y-3">
      {CITIES.map(c => (
        <div key={c.city} className="flex items-center gap-4">
          <span className={`text-sm font-body w-24 shrink-0 ${c.highlight ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{c.city}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
            <motion.div
              initial={{ width: 0 }} whileInView={{ width: `${(c.yieldPct / max) * 100}%` }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full flex items-center justify-end pr-3 ${c.highlight ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span className={`text-xs font-heading font-bold ${c.highlight ? 'text-white' : 'text-gray-600'}`}>{c.yieldPct}%</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: 'Is the 10% ROI guaranteed?', a: "It's a contractual, projected net return on select projects for a defined period. We show you the exact terms per project — nothing is left vague." },
  { q: 'Is rental income really tax-free in Dubai?', a: 'Yes. Dubai has no personal income tax, no capital gains tax and no tax on rental income.' },
  { q: "What's the minimum to start?", a: 'Select units start from AED 350,000, with flexible payment plans.' },
  { q: 'Can I get a Golden Visa too?', a: 'Yes — from AED 2M in property you qualify for a renewable 10-year Golden Visa. Ask us how to structure it.' },
];

const PROTECTION_CARDS = [
  { icon: Percent, title: 'Up to 10% net ROI', desc: 'Contractual returns on select projects, for up to 10 years.' },
  { icon: Shield, title: '0% service charges', desc: 'Your net yield is not eroded by annual fees.' },
  { icon: RefreshCw, title: 'Buy-back option', desc: 'Defined exit on selected projects de-risks your investment.' },
  { icon: TrendingUp, title: 'Flexible payment plans', desc: 'Build your position over time (e.g. 10/50/40) without locking up your cash.' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ROIDubaiProperty() {
  usePageSEO({
    title: '10% Net ROI Dubai Property | Tax-Free Rental Returns | RE/MAX Zam',
    description: 'Earn up to 10% net rental ROI from Dubai property — tax-free, with 0% service charges and flexible payment plans. Calculate your returns and get a personalised plan.',
    canonical: 'https://remaxzam.ae/10-net-roi-dubai-property',
    keywords: 'dubai property 10% roi, high rental yield dubai, dubai investment property returns, tax-free property dubai, dubai rental yield 2026, 10 percent roi dubai',
    schema: PAGE_SCHEMA,
  });

  return (
    <div className="min-h-screen bg-white font-body">
      <WhatsAppFloat message="Hi%20RE%2FMAX%20ZAM%2C%20I%20want%20to%20learn%20about%20the%2010%25%20ROI%20property%20investment." />

      {/* ── HERO ── */}
      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-body tracking-[0.25em] uppercase text-gray-400 mb-4">DUBAI WEALTH ENGINE</p>
            <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl leading-tight mb-5">
              Earn up to <span className="text-gray-900">10% net rental ROI</span> from <span className="text-gray-900">Dubai property</span> — tax-free.
            </h1>
            <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
              Your bank pays 2%. The right Dubai investment pays up to 10% net, contractually, for up to 10 years. See what your money could earn — in 30 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#calculator" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                Calculate My Returns <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#lead-form" className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-900 font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                Book a Free Consultation
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* ── WHY DUBAI PAYS MORE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Why Dubai pays more</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: '6–9%', sub: 'Average gross rental yield in Dubai', desc: '2–3x London, Singapore or New York.' },
              { stat: '0%', sub: 'Tax on rental income, capital gains and property', desc: 'You keep the full return.' },
              { stat: 'Up to 10%', sub: 'Net ROI on select projects', desc: 'With 0% service charges protecting your yield.' },
            ].map(c => (
              <div key={c.stat} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                <p className="font-display font-black text-gray-900 text-5xl mb-2">{c.stat}</p>
                <p className="font-heading font-bold text-gray-900 text-sm mb-2">{c.sub}</p>
                <p className="font-body text-gray-500 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY IMAGE BREAK ── */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80&auto=format&fit=crop"
          alt="Dubai skyline at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-white/70 font-body text-sm uppercase tracking-[0.2em] mb-2">Dubai</p>
            <p className="text-white font-display font-black text-2xl sm:text-4xl">The world's most investor-friendly city</p>
          </div>
        </div>
      </div>

      {/* ── COMPARISON ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Same money. Three times the yield. Zero tax.</h2>
          </div>
          <ComparisonBar />
          <p className="text-sm font-body text-gray-500 text-center mt-8">
            On a AED 1,000,000 investment, that is the difference between ~AED 30,000 and up to <strong className="font-bold text-gray-900">AED 100,000 a year</strong> — tax-free.
          </p>
        </div>
      </section>

      {/* ── PROTECTION ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">How the returns are protected</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROTECTION_CARDS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <FounderStrip />

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">What investors say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'James T.', location: 'London, UK', quote: 'My Dubai studio generates more net income per year than my London flat - and I pay zero tax on it. RE/MAX Zam walked me through every step.', stars: 5 },
              { name: 'Priya S.', location: 'Singapore', quote: 'I was sceptical about investing abroad, but the ROI calculator made it real. My first unit is contracted at 8.5% net for 5 years.', stars: 5 },
              { name: 'Marcus B.', location: 'Frankfurt, Germany', quote: 'I now earn passive income from three Dubai units. The team handled everything remotely - I have not visited once and the income arrives monthly.', stars: 5 },
            ].map(t => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-gray-300 text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-gray-600 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                <p className="font-heading font-bold text-gray-900 text-xs">{t.name}</p>
                <p className="font-body text-gray-400 text-xs">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <h2 className="font-display font-black text-gray-900 text-3xl mb-8 text-center">Frequently Asked Questions</h2>
          {FAQS.map(f => <FaqAccordion key={f.q} {...f} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <RedCTABand heading="See your exact returns — then we'll build your plan.">
        <div id="lead-form" className="max-w-md mx-auto bg-white rounded-2xl p-7 shadow-xl">
          <CampaignLeadForm dark={false} source="Bottom CTA — /10-net-roi-dubai-property" ctaLabel="Get My Personalised Plan" />
        </div>
      </RedCTABand>

    </div>
  );
}
