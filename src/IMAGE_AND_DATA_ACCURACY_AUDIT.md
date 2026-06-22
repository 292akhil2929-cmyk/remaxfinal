# Image & Data Accuracy Audit Checklist

## Current Status & Action Items

### 1. PROPERTY IMAGES
**Issue**: Stock/generic images used across website do not match actual properties listed

**Pages Affected**:
- `/properties` - Property cards using unsplash placeholders
- `/property/:id` - Individual property detail pages
- `AreaGuides` - Community showcase images
- `Home` - Featured properties section

**Required Actions**:
- [ ] Replace ALL property images with actual photos of listed properties
- [ ] For off-plan properties, use developer-provided renderings (verified)
- [ ] Ensure images match property location/community tags
- [ ] Add property photography process to admin workflow
- [ ] Create image quality standards (min 1200x800px, jpg/webp)

**Recommendation**: 
- Implement `PropertyImageUpload` component in property creation flow
- Connect to `importListing` function to auto-fetch developer photos
- Store images in Base44 private storage with signed URLs

---

### 2. COMMUNITY PROFILE IMAGES (AreaGuides)
**Issue**: Current community images are generic unsplash photos

**Current Mismatches**:
- Palm Jumeirah: Using luxury resort photo (not actual Palm)
- Dubai Marina: Using generic waterfront photo
- Downtown Dubai: Using generic city skyline
- Business Bay: Using office building photo
- Dubai Hills: Using generic villa estate
- JVC: Using generic apartment complex

**Required Actions**:
- [ ] Replace with actual community photos (Google Street View or licensed)
- [ ] Source from community developer websites with permission
- [ ] Ensure consistency in photo style/quality
- [ ] Create photo library for each area (min 5 diverse shots each)

**Recommended Sources**:
- Nakheel official galleries (JVC, Palm)
- EMAAR official photos (Downtown, Hills)
- Dubai Tourism & Commerce Marketing
- Licensed aerial/drone footage of communities

---

### 3. LISTING DATA ACCURACY
**Issue**: Property details may not align with actual available inventory

**Data Fields to Verify**:
- [ ] Price (AED) - must match current market rates
- [ ] Bedrooms/Bathrooms - verify against floor plans
- [ ] Area (sqft) - cross-check with developer specs
- [ ] Developer name - ensure exact match
- [ ] Completion date - verify with RERA/developer
- [ ] Status (Available/Sold/Reserved) - update weekly
- [ ] Expected ROI - recalculate based on market data
- [ ] Rental yield - verify with recent rental data

**Process**:
- [ ] Create weekly data sync process (manual or automated)
- [ ] Use `importListing` function to pull fresh data from PropertyFinder/Bayut
- [ ] Validate all ROI/yield calculations against market benchmarks
- [ ] Flag and remove sold/leased properties promptly
- [ ] Add data quality score to each listing (for internal use)

---

### 4. CONTEXT-SPECIFIC IMAGES

**Hero Section Images**:
- [ ] Home page: Replace generic luxury apt photo with actual Dubai Marina/Downtown shot
- [ ] Landlords page: Replace generic luxury photo with landlord/portfolio image
- [ ] Services page: Use actual office/team environment photos
- [ ] About page: Use actual company office or team photos

**Section-Specific**:
- [ ] Featured Properties: Use ACTUAL properties from current inventory
- [ ] Investment calculator hero: Use real Dubai skyline photo
- [ ] Why Invest section: Use actual Dubai landmarks/communities

---

### 5. DEVELOPER LOGOS & BRANDING
**Issue**: Some developer logos may be outdated or incorrect

**Check & Update**:
- [ ] Emaar Properties logo - verify current version
- [ ] Nakheel logo - confirm correct variant
- [ ] DAMAC logo - check latest brand guidelines
- [ ] Omniyat logo - verify if recent rebrand
- [ ] Ellington Properties - correct logo version

**Location**: `DeveloperInsight` entity logo_url fields

---

### 6. COMMUNITY INSIGHT DATA

**Verify All CommunityInsight Records**:
- [ ] avg_roi: Cross-check against recent market reports
- [ ] avg_price_psf: Validate with current listings
- [ ] rental_demand: Update based on current market
- [ ] investor_facts: Ensure all factual, not speculative
- [ ] nearby_landmarks: Verify accuracy and distances

**Recommended**: Pull data from:
- RERA Dubai market reports
- Knight Frank / Savills Dubai market analysis
- DMCC trade reports
- Official RERA transaction data

---

### 7. FORM CONTEXT ALIGNMENT

**Current Issue**: All forms using same "Investment Budget" questions for all user types

**Forms to Segment**:

1. **Investor Forms** (Current LeadCaptureForm):
   - Investment budget AED range
   - Investment goal (ROI, rental income, visa)
   - Contact info
   - ✅ Use on: Properties, Area Guides, Insights, Home

2. **Seller/Landlord Forms** (NEW SellerLeadForm):
   - Property type (apartment, villa, etc.)
   - Property location
   - Reason for sale/rent
   - Contact info
   - ✅ Use on: Landlords page, For Landlords CTA sections

3. **Agent Recruitment Forms** (Already contextual):
   - Currently specific to Join Us page
   - ✅ Keep as is (already correct)

**Pages Needing Form Updates**:
- [ ] `/landlords` - Change to SellerLeadForm ✅ DONE
- [ ] Property Detail page - Keep PropertyViewingForm (correct)
- [ ] Home page CTAs - Define which lead type per section
- [ ] Contact page - Add dropdown to select lead type

---

## Implementation Priority

### Phase 1 (Critical - Week 1):
- [ ] Segment lead capture forms by context (investor vs seller)
- [ ] Create actual property listing workflow (import real data)
- [ ] Replace hero images with real Dubai photos

### Phase 2 (Important - Week 2-3):
- [ ] Replace all community profile images
- [ ] Verify and update all listing data accuracy
- [ ] Add weekly data sync process

### Phase 3 (Ongoing):
- [ ] Monitor data quality scores
- [ ] Update market metrics monthly
- [ ] Refresh property images quarterly

---

## Success Metrics

✅ Every image on website matches its content context  
✅ All property data updated weekly (status, price, availability)  
✅ Forms ask relevant questions for user type (no "investment budget" for sellers)  
✅ No generic stock photos remain on property/community pages  
✅ All ROI/yield data verified against market benchmarks  

---

## Notes

- **Image sources**: Always verify licensing for commercial use
- **Data updates**: Automate where possible via `importListing` function
- **Forms**: Use conditional logic to show/hide fields based on lead_type
- **Accuracy**: Consider adding "Last Updated" dates to listings/insights for transparency