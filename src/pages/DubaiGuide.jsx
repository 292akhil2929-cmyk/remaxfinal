import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle, AlertCircle, Home, Key, FileText, DollarSign, Shield, HelpCircle, Building, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Data ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'buying', label: 'Buying Process', icon: Home },
  { id: 'renting', label: 'Renting Process', icon: Key },
  { id: 'fees', label: 'Fees & Costs', icon: DollarSign },
  { id: 'tenant-rights', label: 'Tenant Rights', icon: Shield },
  { id: 'landlord-rights', label: 'Landlord Rights', icon: Building },
  { id: 'mortgage', label: 'Mortgage Guide', icon: FileText },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
];

const BUYING_STEPS = [
  {
    step: '01',
    title: 'Define Your Budget & Goals',
    desc: 'Before viewing a single property, know your numbers. Determine your total budget including all purchase costs (not just the property price — see Fees section). Decide whether you want rental income, capital appreciation, or the Golden Visa pathway. This shapes every decision that follows.',
    tips: ['Include 7–9% on top of property price for total purchase costs', 'Golden Visa requires minimum AED 2M property value', 'Off-plan typically requires 20–30% down, ready property 25–40%'],
  },
  {
    step: '02',
    title: 'Choose Freehold or Leasehold — Know the Difference',
    desc: "Only UAE nationals can buy in leasehold areas. As an expat or foreign investor, you must buy in designated freehold zones — the good news is Dubai's most desirable areas (Downtown, Marina, Palm, JVC, Business Bay, Dubai Hills) are all freehold.",
    tips: ['Freehold = full ownership of property and land', 'Key freehold areas: Downtown, Marina, Palm Jumeirah, JVC, Business Bay, Dubai Hills', 'DLD maintains the official freehold zone registry'],
  },
  {
    step: '03',
    title: 'Engage a RERA-Licensed Agent',
    desc: 'Only agents holding a valid RERA broker card are legally authorised to facilitate property transactions in Dubai. Always verify your agent\'s RERA number on the Dubai Land Department (DLD) official portal before signing anything. Unregistered brokers operating in Dubai face fines and legal action.',
    tips: ['Verify RERA broker card on DLD portal (dubailand.gov.ae)', 'Agent\'s RERA card must be current and valid', 'RE/MAX Zam — all advisors hold active RERA certification'],
  },
  {
    step: '04',
    title: 'Sign the Memorandum of Understanding (MOU)',
    desc: 'Once you agree on a price, a Memorandum of Understanding (Form F) is signed by buyer, seller, and both agents. At this stage, the buyer typically pays a 10% security deposit to the seller, held until transfer. The MOU sets out all agreed terms and is a legally binding document.',
    tips: ['Standard deposit is 10% of purchase price', 'MOU (Form F) is the official DLD contract template', 'Ensure all property details, payment terms, and handover dates are clearly stated'],
  },
  {
    step: '05',
    title: 'Obtain a No Objection Certificate (NOC)',
    desc: "The seller must obtain a No Objection Certificate (NOC) from the developer, confirming there are no outstanding service charges or mortgage on the property. This typically takes 5–15 working days and costs AED 500–5,000 depending on the developer.",
    tips: ['Buyer or seller can arrange the NOC — typically the seller', 'NOC fee varies by developer: AED 500–5,000', 'NOC is valid for 30 days from issue date'],
  },
  {
    step: '06',
    title: 'Transfer at the Dubai Land Department (DLD)',
    desc: "The final transfer happens at a DLD Trustee Office (not the DLD headquarters). Buyer, seller, and agents attend together. The buyer pays the purchase price (via manager's cheque made out to the seller) and all DLD fees on the day. A new Title Deed is issued in the buyer's name immediately.",
    tips: ['Manager\'s cheque required — not cash or bank transfer', 'Transfer typically takes 1–3 hours at the Trustee Office', 'Title Deed issued same day — you are the registered owner'],
  },
];

const RENTING_STEPS = [
  {
    step: '01',
    title: 'Search & Shortlist Properties',
    desc: "Dubai's rental market moves fast — particularly in premium communities. Properties in Dubai Marina, Business Bay, and Downtown regularly receive multiple applications within 48 hours of listing. Engage a RERA-licensed agent and define your must-haves before you start viewing.",
    tips: ['Define: budget, location, size, cheque preference', 'Peak rental season: Sept–Nov and Jan–Mar', 'Be ready to move quickly — good units rent within days'],
  },
  {
    step: '02',
    title: 'Negotiate Terms & Number of Cheques',
    desc: "Dubai rent is typically paid upfront in post-dated cheques — from 1 to 12 cheques depending on negotiation. Fewer cheques (1–2) gives the landlord more security and often gets you a lower rent. More cheques (4–6) gives you more cash flow flexibility but may cost more.",
    tips: ['1 cheque = lowest rent (landlord prefers)', '4 cheques = common middle ground', '12 cheques = highest rent, most flexibility for tenant', 'Always negotiate — number of cheques is negotiable'],
  },
  {
    step: '03',
    title: 'Sign the Tenancy Contract (Ejari)',
    desc: "All Dubai tenancy contracts must be registered with RERA through the Ejari system. An unregistered tenancy has no legal standing in Dubai — you cannot access DEWA utilities, schools, or the RERA Dispute Centre without an active Ejari registration.",
    tips: ['Ejari registration costs approximately AED 220', 'Can be registered online at ejari.ae or at authorised centres', 'Required documents: passport, visa, Emirates ID, signed tenancy contract'],
  },
  {
    step: '04',
    title: 'Pay DEWA Deposit & Security Deposit',
    desc: "Beyond the rent cheques, budget for a refundable DEWA (Dubai Electricity & Water Authority) security deposit (AED 2,000 for apartments, AED 4,000 for villas) and a security deposit to the landlord — typically 5% of annual rent for unfurnished, 10% for furnished properties.",
    tips: ['DEWA deposit: AED 2,000 (apt) / AED 4,000 (villa)', 'Landlord security deposit: 5% (unfurnished) / 10% (furnished)', 'Both are refundable at end of tenancy (subject to condition)'],
  },
  {
    step: '05',
    title: 'Move In & Register DEWA',
    desc: "Once the tenancy contract and Ejari are in place, register your DEWA account (electricity and water). This can be done online. Internet and TV (du or Etisalat) are set up separately. Keep a record of the property\'s condition on move-in day — photos and a written inventory protect you at checkout.",
    tips: ['DEWA registration: dewa.gov.ae or the app', 'Take a full video walkthrough on move-in day', 'Report any pre-existing damage to landlord in writing within 7 days'],
  },
];

const FEES_DATA = [
  {
    category: 'Buying Costs',
    color: 'red',
    items: [
      { name: 'DLD Transfer Fee', amount: '4% of purchase price', notes: 'Paid by buyer to Dubai Land Department — mandatory' },
      { name: 'DLD Registration Fee', amount: 'AED 2,000–4,000', notes: 'Title Deed admin fee, varies by property value' },
      { name: 'Agent Commission', amount: '2% of purchase price', notes: 'Standard market rate, negotiable — paid to buyer\'s agent' },
      { name: 'Mortgage Arrangement Fee', amount: '0.5–1% of loan', notes: 'If financing — paid to the bank' },
      { name: 'Mortgage Registration Fee (DLD)', amount: '0.25% of loan', notes: 'Mandatory if using a mortgage' },
      { name: 'Property Valuation', amount: 'AED 2,500–3,500', notes: 'Required by bank for mortgage approval' },
      { name: 'NOC Fee', amount: 'AED 500–5,000', notes: 'Paid to developer — typically seller\'s cost' },
      { name: 'Trustee Office Fee', amount: 'AED 4,000 (non-mortgage) / AED 5,000 (mortgage)', notes: 'Transfer processing fee' },
      { name: 'Total Estimated Buying Cost', amount: '7–9% of property price', notes: 'Budget this on top of your purchase price' },
    ],
  },
  {
    category: 'Renting Costs',
    color: 'blue',
    items: [
      { name: 'Annual Rent', amount: 'Market rate', notes: 'Paid upfront in cheques — 1 to 12 post-dated' },
      { name: 'Agent Commission', amount: '5% of annual rent', notes: 'Standard market rate, paid once at signing' },
      { name: 'Ejari Registration', amount: 'AED 220', notes: 'Mandatory RERA registration of tenancy' },
      { name: 'Security Deposit', amount: '5% (unfurnished) / 10% (furnished)', notes: 'Refundable at end of tenancy' },
      { name: 'DEWA Deposit', amount: 'AED 2,000 (apt) / AED 4,000 (villa)', notes: 'Refundable utility deposit' },
      { name: 'Municipality Fee', amount: '5% of annual rent', notes: 'Added to DEWA bill monthly — not paid upfront' },
    ],
  },
  {
    category: 'Ongoing Ownership Costs',
    color: 'amber',
    items: [
      { name: 'Service Charges', amount: 'AED 10–30 per sqft/year', notes: 'Varies by building — covers maintenance, security, facilities' },
      { name: 'DEWA (Owner)', amount: 'AED 500–2,000/month', notes: 'Electricity and water — varies by usage' },
      { name: 'Property Management', amount: '5–8% of annual rent', notes: 'If using a property management company' },
      { name: 'Home Insurance', amount: 'AED 1,000–3,000/year', notes: 'Recommended, required by some mortgage lenders' },
      { name: 'Capital Gains Tax', amount: '0%', notes: 'Dubai has zero capital gains tax on property' },
      { name: 'Property Income Tax', amount: '0%', notes: 'Zero tax on rental income in Dubai' },
    ],
  },
];

const TENANT_RIGHTS = [
  {
    icon: Scale,
    title: 'Rent Increase Is Capped — Know Your RERA Index',
    body: "Under Dubai Law No. 33 of 2008, landlords cannot increase rent above the RERA Rental Index cap. The cap depends on how much your current rent is below market rate: if your rent is within 10% of market rate, the landlord cannot increase it at all. If 11–20% below market, maximum increase is 5%. If 21–30% below, max 10%. If 31–40% below, max 15%. Over 40% below market, max 20%.",
    important: "Check the RERA Rental Index at smartservices.rera.gov.ae before renewing — knowing the exact market rate is your strongest negotiating tool.",
  },
  {
    icon: AlertCircle,
    title: '90-Day Notice Required for Any Change',
    body: "Landlords must give tenants a minimum of 90 days written notice before the lease expiry date for any of the following: rent increase, non-renewal of tenancy, eviction for personal use, or major renovation requiring vacancy. A notice given less than 90 days before expiry is not legally enforceable.",
    important: "If your landlord gives you less than 90 days notice, you are legally entitled to remain in the property for the duration of your lease.",
  },
  {
    icon: Shield,
    title: 'Eviction Grounds Are Strictly Limited',
    body: "A landlord can only evict a tenant for specific reasons defined by Dubai law: non-payment of rent, causing damage to the property, using the property for illegal purposes, subletting without permission, or a court-validated need to use the property for their own personal use (which requires 12 months notice).",
    important: "Simply wanting to sell the property is NOT valid grounds for eviction. You have the right to remain until your lease expires.",
  },
  {
    icon: FileText,
    title: 'Right to Renew — Tenancy Auto-Renews',
    body: "In Dubai, a tenancy contract automatically renews on the same terms if the landlord does not give valid 90-day notice of non-renewal. If neither party gives notice, the lease continues for the same period under the same conditions. This gives tenants significant protection against sudden displacement.",
    important: "Keep a record of your Ejari registration and all communications with your landlord — these are your legal evidence if a dispute arises.",
  },
  {
    icon: Home,
    title: 'Maintenance — Who Pays What',
    body: "Major structural maintenance (AC systems, plumbing, electrical infrastructure) is the landlord's responsibility unless the damage was caused by tenant misuse. Minor repairs under AED 500 are typically the tenant's responsibility. If the landlord refuses to carry out essential maintenance, you can file a case with the RERA Rental Dispute Centre.",
    important: "Report all maintenance requests to your landlord in writing (WhatsApp is acceptable as written evidence in Dubai courts).",
  },
  {
    icon: Building,
    title: 'Rental Dispute Centre (RDC) — Your Legal Recourse',
    body: "If you have a dispute with your landlord, the RERA Rental Dispute Centre (RDC) is the dedicated court for rental matters in Dubai. Cases are resolved relatively quickly (typically 30–90 days) and fees are proportionate to the dispute value. The RDC is accessible to both tenants and landlords.",
    important: "Filing at the RDC costs approximately AED 3–5% of the annual rent (min AED 500, max AED 20,000). Most tenants find it significantly cheaper than engaging a lawyer for a landlord dispute.",
  },
];

const LANDLORD_RIGHTS = [
  {
    title: 'Right to Timely Rent Payment',
    body: 'A landlord has the right to receive rent on the agreed dates. If a tenant\'s cheque bounces or rent is not paid, the landlord can issue a 30-day written notice to vacate. If the tenant fails to pay within 30 days, the landlord can apply to the RDC for eviction. Repeated or deliberate non-payment is a criminal offence in the UAE.',
  },
  {
    title: 'Right to Increase Rent — Within RERA Limits',
    body: 'Landlords may increase rent at renewal if the current rent is below the RERA Rental Index benchmark. The maximum permissible increase depends on the gap: 5% if 11–20% below market, 10% if 21–30% below, 15% if 31–40% below, 20% if more than 40% below market. No increase is permitted if the rent is within 10% of market rate.',
  },
  {
    title: 'Right to Inspect the Property',
    body: 'A landlord has the right to inspect the property with reasonable notice (typically 24–48 hours). The tenant cannot unreasonably withhold access. Inspections should be agreed upon in the tenancy contract to avoid disputes.',
  },
  {
    title: 'Right to Evict for Valid Reasons',
    body: 'Dubai law provides landlords with the right to evict tenants for: non-payment of rent (after 30-day notice), property damage, illegal use, subletting without consent, or the landlord\'s personal use of the property (12 months notice required for personal use, supported by documentation).',
  },
  {
    title: 'Right to Deduct from Security Deposit',
    body: 'At the end of tenancy, a landlord may deduct reasonable costs from the security deposit for: damage beyond normal wear and tear, outstanding utility bills, or outstanding rent. Deductions must be documented with evidence. The balance must be returned within a reasonable period after the tenant vacates.',
  },
  {
    title: 'Right to Register Disputes at the RDC',
    body: 'Landlords have full access to the Rental Dispute Centre for resolution of any tenancy dispute — non-payment, illegal subletting, property damage, or tenant refusal to vacate. The RDC is designed to protect both parties fairly and efficiently.',
  },
];

const MORTGAGE_DATA = [
  { label: 'Expat LTV (Max)', value: '75%', note: 'First property under AED 5M — you put 25% down' },
  { label: 'UAE National LTV (Max)', value: '80%', note: 'First property under AED 5M' },
  { label: 'Minimum Income', value: 'AED 15,000/month', note: 'Varies by bank — some require AED 25,000+' },
  { label: 'Minimum Employment', value: '6 months in UAE', note: 'Or 2 years self-employed with audited accounts' },
  { label: 'Max Loan Tenure', value: '25 years', note: 'Or until age 65 (salaried) / 70 (self-employed)' },
  { label: 'Mortgage Approval Time', value: '7–21 days', note: 'Pre-approval typically 5–7 working days' },
];

const FAQS = [
  { q: 'Can foreigners buy property in Dubai?', a: 'Yes. Foreign nationals can buy freehold property in designated freehold zones across Dubai. These include Downtown Dubai, Dubai Marina, Palm Jumeirah, Business Bay, JVC, Dubai Hills Estate, and many more. There is no restriction on nationality.' },
  { q: 'What is the minimum property price for a Golden Visa?', a: 'The UAE Golden Visa through property requires a minimum purchase price of AED 2,000,000 (approximately USD 545,000). The property must be completed (not off-plan) and purchased outright (no mortgage against it). The visa is valid for 10 years and renewable.' },
  { q: 'How long does a property purchase take in Dubai?', a: 'A cash purchase can complete in as little as 2–4 weeks. A mortgage purchase typically takes 4–8 weeks due to bank approval timelines. Off-plan purchases are longer — governed by the developer\'s payment plan and completion date.' },
  { q: 'Is there property tax in Dubai?', a: 'No. Dubai has zero property tax, zero capital gains tax, and zero income tax on rental income. The only recurring ownership cost (beyond service charges and utilities) is the one-time 4% DLD transfer fee paid at purchase.' },
  { q: 'What is Ejari and is it mandatory?', a: 'Ejari is the RERA online tenancy registration system. All residential and commercial tenancy contracts in Dubai must be registered through Ejari. Without an Ejari registration, you cannot get DEWA utilities, register your children in school, or access the Rental Dispute Centre. It costs approximately AED 220 and can be done online.' },
  { q: 'Can a landlord evict me to sell the property?', a: 'No. A landlord cannot evict a tenant simply because they want to sell the property. The buyer of the property assumes the tenancy and must honour the existing lease. Eviction is only permitted for specific legal reasons — non-payment, property damage, illegal use, or the landlord\'s documented personal use (which requires 12 months notice).' },
  { q: 'How much notice must a landlord give to increase rent?', a: 'A minimum of 90 days written notice before the lease expiry date. Without 90 days notice, the landlord cannot legally enforce a rent increase at renewal. Additionally, the increase is capped by the RERA Rental Index — check the current market rate at smartservices.rera.gov.ae.' },
  { q: 'What happens if my landlord refuses to return my deposit?', a: 'File a case at the Rental Dispute Centre (RDC). The RDC will adjudicate and can order the landlord to return the deposit plus penalties if the withholding is unjustified. Keep all evidence of the property\'s condition at both move-in and move-out (photos, inventory, written communications).' },
  { q: 'Can I rent out my Dubai property on Airbnb?', a: 'Yes, but you need a short-term rental permit from DTCM (Dubai Tourism and Commerce Marketing). Without the permit, operating as an unlicensed short-term rental is a violation and can result in fines. RE/MAX Zam can advise on the permit process and connect you with DTCM-licensed property managers.' },
  { q: 'What is the difference between off-plan and ready property?', a: 'Off-plan is purchased before construction completes — typically lower entry price, flexible payment plans (often 50–60% post-handover), and higher potential capital gain. Ready property is completed and available for immediate occupancy or rental. Off-plan carries developer delivery risk; ready property has immediate income potential.' },
  { q: 'Do I need a UAE bank account to buy property?', a: 'Not necessarily, but it is strongly recommended. Manager\'s cheques (required for the DLD transfer) must be issued by a UAE bank. Opening a UAE bank account typically requires a valid UAE visa — for investors without a visa, some developers accept overseas bank transfers for off-plan deposits.' },
  { q: 'What is a Trustee Office?', a: 'A Trustee Office is a DLD-authorised private office that processes property registrations and title transfers on behalf of the Dubai Land Department. Property transfers happen at Trustee Offices (not DLD headquarters). There are multiple Trustee Offices across Dubai for convenience.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-heading font-bold text-gray-900 text-sm pr-4">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-500 font-body text-sm leading-relaxed border-t border-gray-50 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeesTable({ data }) {
  const colorMap = {
    red: 'bg-gray-100 text-gray-700 border-gray-200',
    blue: 'bg-gray-100 text-gray-700 border-gray-200',
    amber: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <div className="mb-10">
      <h3 className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-heading font-bold mb-4 ${colorMap[data.color]}`}>
        {data.category}
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">Fee</th>
              <th className="text-left px-5 py-3 text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-heading font-bold text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.name} className={`border-b border-gray-50 ${i === data.items.length - 1 ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50/50'} transition-colors`}>
                <td className="px-5 py-4 text-sm font-body text-gray-800 font-medium">{item.name}</td>
                <td className="px-5 py-4 text-sm font-heading font-bold text-gray-900 whitespace-nowrap">{item.amount}</td>
                <td className="px-5 py-4 text-xs font-body text-gray-500">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DubaiGuide() {
  const [activeTab, setActiveTab] = useState('buying');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">The Definitive Resource</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">Dubai Real Estate Complete Guide 2026</h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            Everything you need to know — buying process, renting process, all fees, tenant rights, landlord rights, mortgages, and 12 of the most important FAQs. Straight facts, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 font-heading font-bold border-0" asChild>
              <Link to="/contact">Speak to an Expert <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-[#C9A84C] text-[#C9A84C] hover:bg-gray-50 font-heading" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 lg:top-[70px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-1 py-2 min-w-max">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#C9A84C] text-black'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Panels */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">

        {/* BUYING */}
        {activeTab === 'buying' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">How to Buy Property in Dubai</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">A step-by-step walkthrough of the complete property buying process in Dubai — from budget setting to receiving your Title Deed. This applies to both cash and mortgage purchases.</p>
            </div>
            <div className="space-y-8">
              {BUYING_STEPS.map((s, i) => (
                <motion.div key={s.step} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-black text-sm">{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      {s.tips.map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                          <p className="text-xs font-body text-gray-600">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 bg-black rounded-2xl p-8 text-center">
              <p className="text-white font-display font-bold text-xl mb-2">Ready to Buy? Talk to a RE/MAX Zam Advisor</p>
              <p className="text-white/50 font-body text-sm mb-6">We guide you through every step above — from property selection to Title Deed in your name.</p>
              <Button className="bg-white text-black hover:bg-gray-100 font-heading font-bold border-0" asChild>
                <Link to="/contact">Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* RENTING */}
        {activeTab === 'renting' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">How to Rent Property in Dubai</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">The complete renting process in Dubai from search to move-in, including what to pay, what to sign, and how to protect yourself legally.</p>
            </div>
            <div className="space-y-8">
              {RENTING_STEPS.map((s, i) => (
                <motion.div key={s.step} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A84C] flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-black text-sm">{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      {s.tips.map(tip => (
                        <div key={tip} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                          <p className="text-xs font-body text-gray-600">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FEES */}
        {activeTab === 'fees' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">All Dubai Property Fees & Costs</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">A complete breakdown of every cost involved in buying, renting, and owning property in Dubai. No hidden surprises — this is the full picture.</p>
            </div>
            {FEES_DATA.map(d => <FeesTable key={d.category} data={d} />)}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-gray-900 text-sm mb-1">Rule of Thumb for Buyers</p>
                  <p className="text-gray-700 font-body text-sm leading-relaxed">Always budget an additional <strong>7–9% of the property price</strong> for total purchase transaction costs. For a AED 2,000,000 property, that means approximately AED 140,000–180,000 in additional costs on top of your purchase price.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TENANT RIGHTS */}
        {activeTab === 'tenant-rights' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Dubai Tenant Rights — Know Your Protections</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">Dubai has robust tenant protection laws under RERA (Real Estate Regulatory Agency). Here are the six most important rights every Dubai tenant must know — and how to enforce them.</p>
            </div>
            <div className="space-y-6">
              {TENANT_RIGHTS.map((r, i) => (
                <motion.div key={r.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <r.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-gray-900 mb-2">{r.title}</h3>
                      <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">{r.body}</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                        <p className="text-gray-700 font-body text-xs leading-relaxed"><span className="font-bold">Key takeaway: </span>{r.important}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-center">
              <p className="font-heading font-bold text-gray-900 mb-1">Useful Official Resources</p>
              <div className="flex flex-wrap gap-3 justify-center mt-3">
                {[
                  { label: 'RERA Rental Index', url: 'https://smartservices.rera.gov.ae' },
                  { label: 'Rental Dispute Centre', url: 'https://rdc.gov.ae' },
                  { label: 'Ejari Registration', url: 'https://ejari.ae' },
                  { label: 'DLD Portal', url: 'https://dubailand.gov.ae' },
                ].map(l => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-heading font-bold text-gray-700 hover:border-black hover:text-black transition-colors">
                    {l.label} <ArrowRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LANDLORD RIGHTS */}
        {activeTab === 'landlord-rights' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Dubai Landlord Rights — What Property Owners Can Do</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">Dubai law provides landlords with clearly defined rights to protect their investment. Here is what you are entitled to as a property owner renting in Dubai.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {LANDLORD_RIGHTS.map((r, i) => (
                <motion.div key={r.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-2xl p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{r.title}</h3>
                  <p className="text-gray-500 font-body text-xs leading-relaxed">{r.body}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 bg-black rounded-2xl p-8">
              <h3 className="font-display font-bold text-white text-xl mb-2">Investing in Dubai Property?</h3>
              <p className="text-white/50 font-body text-sm mb-6">RE/MAX Zam offers full landlord advisory — from tenant screening to rent collection and dispute resolution. Let us manage your Dubai investment.</p>
              <Button className="bg-white text-black hover:bg-gray-100 font-heading font-bold border-0" asChild>
                <Link to="/contact">Get Landlord Advisory <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* MORTGAGE */}
        {activeTab === 'mortgage' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Dubai Mortgage Guide for Expats & International Investors</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">Yes, foreigners can get mortgages in Dubai. Here are the key parameters, the process, and what banks typically look for in 2026.</p>
            </div>
            {/* Key Numbers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {MORTGAGE_DATA.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 border-l-4 border-l-[#C9A84C]">
                  <p className="font-display font-black text-[#C9A84C] text-2xl">{m.value}</p>
                  <p className="text-gray-700 font-heading font-bold text-sm mt-1">{m.label}</p>
                  <p className="text-gray-400 font-body text-xs mt-1">{m.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Process */}
            <h3 className="font-heading font-bold text-gray-900 text-lg mb-5">The Mortgage Application Process</h3>
            <div className="space-y-4 mb-10">
              {[
                { step: '01', title: 'Pre-Approval', desc: 'Approach 2–3 banks to get a mortgage pre-approval letter. This takes 5–7 working days and confirms how much you can borrow. Pre-approval does not commit you to a specific property.' },
                { step: '02', title: 'Property Valuation', desc: 'Once you have found a property and signed the MOU, the bank conducts an independent valuation (AED 2,500–3,500). The bank will lend against the lower of the purchase price or the valuation.' },
                { step: '03', title: 'Final Approval & Offer Letter', desc: 'The bank issues a formal offer letter with the approved loan amount, interest rate, and terms. Review carefully before signing.' },
                { step: '04', title: 'Mortgage Registration at DLD', desc: 'The mortgage is registered with the Dubai Land Department before the transfer. The DLD mortgage registration fee is 0.25% of the loan amount.' },
                { step: '05', title: 'Transfer with Mortgage', desc: "The bank issues a manager's cheque for the loan amount, which is combined with your equity cheque at the Trustee Office for the full purchase price to the seller." },
              ].map(s => (
                <div key={s.step} className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-black text-xs">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900 text-sm">{s.title}</p>
                    <p className="text-gray-500 font-body text-xs leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Notes */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-gray-900 text-sm mb-3">Important Notes for Expat Mortgages</h3>
              <div className="space-y-2">
                {[
                  'Fixed-rate periods in Dubai are typically 1–5 years; after that the rate becomes variable',
                  'Islamic mortgages (Ijarah, Murabaha) are widely available and have no interest — they work on a profit-rate system',
                  'You cannot use a mortgage to buy off-plan directly from a developer — off-plan uses the developer payment plan. Mortgages apply to ready properties or near-completion off-plan',
                  'Dubai Central Bank regulations cap total debt obligations at 50% of monthly income',
                  'Life insurance equal to the loan amount is typically required by UAE lenders',
                ].map(n => (
                  <div key={n} className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-gray-600 font-body text-xs leading-relaxed">{n}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
              <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">Dubai Real Estate — Frequently Asked Questions</h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed max-w-2xl">The 12 questions our advisors are asked most often by international investors and residents. Clear, direct answers — no jargon.</p>
            </div>
            <div className="space-y-3">
              {FAQS.map(faq => <FAQItem key={faq.q} faq={faq} />)}
            </div>
            <div className="mt-12 bg-black rounded-2xl p-8 text-center">
              <p className="font-display font-bold text-white text-xl mb-2">Still Have Questions?</p>
              <p className="text-white/70 font-body text-sm mb-6">Our team answers every inquiry within 24 hours. No sales pitch — just honest answers.</p>
              <Button className="bg-white text-black hover:bg-gray-100 font-heading font-bold border-0" asChild>
                <Link to="/contact">Ask a RE/MAX Zam Advisor <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}