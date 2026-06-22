/**
 * Landing page: /dubai-property-investment
 * Campaign: Dubai Wealth Engine — Pillar/Hub Page
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  DollarSign,
  Building2,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from "@/components/PhoneInput";
import { useMutation } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { trackLeadEvent } from "@/lib/analytics";
import {
  WhatsAppFloat,
  TrustStrip,
  FounderStrip,
  RedCTABand,
  FaqAccordion,
  getUTMParams,
} from "@/components/campaign/CampaignShared";
import usePageSEO from "@/lib/usePageSEO";

const PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://remaxzam.ae/dubai-property-investment",
      url: "https://remaxzam.ae/dubai-property-investment",
      name: "Dubai Property Investment | Passive Income, Golden Visa & Growth | RE/MAX Zam",
      description:
        "Build tax-free passive income, capital growth and 10-year residency with Dubai property. Download the free investor guide from RE/MAX Zam — advisors who invest themselves.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://remaxzam.ae",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dubai Property Investment",
            item: "https://remaxzam.ae/dubai-property-investment",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "I'm overseas — can I invest remotely?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most of our investors buy from abroad. We handle everything and you can sign digitally.",
          },
        },
        {
          "@type": "Question",
          name: "How much do I need to start investing in Dubai property?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "From AED 350,000, with flexible payment plans.",
          },
        },
        {
          "@type": "Question",
          name: "Is my money safe investing in Dubai property?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dubai has a digitised land registry, freehold foreign ownership and escrow-protected off-plan payments.",
          },
        },
        {
          "@type": "Question",
          name: "What returns can I expect from Dubai property?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Average Dubai yields are 6–9%; select projects offer up to 10% net. We model your exact numbers before you commit.",
          },
        },
      ],
    },
  ],
};

// ─── EMAIL CAPTURE ────────────────────────────────────────────────────────────

function GuideCapture({ dark = false, source = "Guide Download" }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    phone_country_code: "+971",
    country: "",
  });
  const utms = getUTMParams();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return base44.functions.invoke("createLead", {
        ...data,
        ...utms,
        lead_type: "Investor",
        source,
        phone: `${data.phone_country_code}${data.phone}`,
        investment_goal: "Passive Income",
        notes: "Guide download request",
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      trackLeadEvent("guide_download", {
        source,
        form_id: "guide-download-form",
      });
    },
  });

  const base = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11";

  if (submitted) {
    return (
      <div
        className={`text-center py-8 ${dark ? "text-white" : "text-gray-900"}`}
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <p className="font-heading font-bold text-lg mb-1">Guide on its way!</p>
        <p
          className={`font-body text-sm ${dark ? "text-white/50" : "text-gray-500"}`}
        >
          Check your inbox — an advisor will also reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id="guide-download-form"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className="space-y-3"
    >
      <Input
        placeholder="Full Name *"
        required
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        className={base}
      />
      <Input
        placeholder="Email Address *"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={base}
      />
      <PhoneInput
        value={form.phone}
        countryCode={form.phone_country_code}
        onChange={(v) => setForm({ ...form, phone: v })}
        onCountryChange={(v) => setForm({ ...form, phone_country_code: v })}
        dark={dark}
      />
      <Select
        value={form.country}
        onValueChange={(v) => setForm({ ...form, country: v })}
      >
        <SelectTrigger className={base}>
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {["UAE", "India", "UK", "Saudi Arabia", "Qatar", "Other"].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        disabled={mutation.isPending}
        className={`w-full h-12 font-heading font-bold text-sm rounded-xl transition-colors ${dark ? "bg-white text-black hover:bg-gray-100" : "bg-black hover:bg-gray-900 text-white"}`}
      >
        {mutation.isPending ? "Sending…" : "Download the Free Guide"}{" "}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
      <p
        className={`text-[10px] font-body text-center ${dark ? "text-white/30" : "text-gray-400"}`}
      >
        No spam. Guide delivered instantly by email.
      </p>
    </form>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const OUTCOMES = [
  {
    icon: DollarSign,
    title: "Passive Income",
    desc: "Up to 10% net rental ROI, tax-free.",
  },
  {
    icon: TrendingUp,
    title: "Wealth Creation",
    desc: "Capital growth in a market up 20–30% a year.",
  },
  {
    icon: Star,
    title: "Golden Visa",
    desc: "10-year UAE residency from AED 2M.",
  },
  {
    icon: Shield,
    title: "Capital Preservation",
    desc: "A USD-pegged, tax-free safe-haven asset.",
  },
  {
    icon: Building2,
    title: "Long-Term Asset Growth",
    desc: "A hard asset that compounds over time.",
  },
];

const STATS = [
  {
    stat: "AED 917bn",
    label: "Record Dubai real estate transactions in 2025.",
  },
  { stat: "6–9%", label: "Average tax-free rental yields." },
  { stat: "193,000+", label: "Active property investors (up 24% YoY)." },
  { stat: "0%", label: "Income, capital gains and property tax." },
];

const SMART_MONEY = [
  {
    title: "High-yield communities",
    desc: "Affordable, high-demand areas delivering 8–10% net.",
  },
  {
    title: "Off-plan with flexible plans",
    desc: "Pay in stages, build wealth without locking up cash.",
  },
  {
    title: "Developer-direct access",
    desc: "We transact across the market, including direct-from-developer inventory like Dugasta.",
  },
];

const GUIDE_BULLETS = [
  "How to earn up to 10% net, tax-free — and how the returns are protected.",
  "The AED 2M Golden Visa, explained simply.",
  "Dubai vs London, Singapore & New York — the real yield comparison.",
  "The 5 mistakes first-time Dubai investors make.",
  "How to start from AED 350,000 with a flexible payment plan.",
];

const FAQS = [
  {
    q: "I'm overseas — can I invest remotely?",
    a: "Yes. Most of our investors buy from abroad. We handle everything and you can sign digitally.",
  },
  {
    q: "How much do I need to start?",
    a: "From AED 350,000, with flexible payment plans.",
  },
  {
    q: "Is my money safe?",
    a: "Dubai has a digitised land registry, freehold foreign ownership and escrow-protected off-plan payments.",
  },
  {
    q: "What returns can I expect?",
    a: "Average Dubai yields are 6–9%; select projects offer up to 10% net. We model your exact numbers before you commit.",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DubaiPropertyInvestment() {
  usePageSEO({
    title:
      "Dubai Property Investment | Passive Income, Golden Visa & Growth | RE/MAX Zam",
    description:
      "Build tax-free passive income, capital growth and 10-year residency with Dubai property. Download the free investor guide from RE/MAX Zam — advisors who invest themselves.",
    canonical: "https://remaxzam.ae/dubai-property-investment",
    keywords:
      "dubai property investment, invest in dubai real estate, passive income dubai property, dubai property for foreigners, buy property dubai 2025, dubai investment guide",
    schema: PAGE_SCHEMA,
  });

  return (
    <div className="min-h-screen bg-white font-body">
      <WhatsAppFloat />

      {/* ── HERO ── */}
      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-body tracking-[0.25em] uppercase text-gray-400 mb-4">
              THE DUBAI WEALTH ENGINE
            </p>
            <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl leading-tight mb-5">
              Build passive income and lasting wealth with Dubai property.
            </h1>
            <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
              Tax-free income up to 10% net, 10-year residency, and capital
              growth in the world's fastest-growing property market. Download
              our free investor guide to see how.
            </p>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-900 font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
            >
              Book a Free Consultation
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="bg-black text-white rounded-xl p-5 mb-5 text-center">
                <p className="font-heading font-bold text-xs tracking-[0.2em] uppercase text-white/60 mb-1">
                  FREE DOWNLOAD
                </p>
                <p className="font-display font-black text-xl">
                  The Dubai Investor's Playbook
                </p>
                <p className="text-white/50 font-body text-xs mt-1">
                  PDF Guide — Everything you need to know
                </p>
              </div>
              <GuideCapture source="Hero Guide Download — /dubai-property-investment" />
            </div>
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      {/* ── OUTCOMES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">
              What investors are really buying
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {OUTCOMES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-5 h-5 text-gray-900" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">
                  {title}
                </h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">
              Why Dubai, why now
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div
                key={s.stat}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 text-center"
              >
                <p className="font-display font-black text-gray-900 text-4xl mb-2">
                  {s.stat}
                </p>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SMART MONEY ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-3">
              Where the smart money goes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SMART_MONEY.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <h3 className="font-heading font-bold text-gray-900 text-base mb-3">
                  {c.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <blockquote className="font-body text-white/70 text-lg leading-relaxed italic mb-6">
            "I don't just advise on Dubai property — I live off the passive
            income mine generates. RE/MAX Zam invests in what it recommends."
          </blockquote>
          <p className="font-heading font-bold text-white/50 text-sm mb-8">
            — Faisal Contractor, Owner, RE/MAX Zam
          </p>
          <Link
            to="/my-dubai-passive-income"
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-heading font-bold text-sm px-7 py-3 rounded-xl transition-colors"
          >
            See how the founder invests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── GUIDE CONTENTS ── */}
      <section id="lead-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-black text-gray-900 text-3xl sm:text-4xl mb-6">
              What's inside the guide
            </h2>
            <ul className="space-y-3 mb-8">
              {GUIDE_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span className="font-body text-gray-600 text-sm leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm p-8">
            <p className="font-heading font-bold text-gray-900 text-lg mb-5">
              Download the Free Guide
            </p>
            <GuideCapture source="Mid-Page Guide Download — /dubai-property-investment" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <h2 className="font-display font-black text-gray-900 text-3xl mb-8 text-center">
            Frequently Asked Questions
          </h2>
          {FAQS.map((f) => (
            <FaqAccordion key={f.q} {...f} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <RedCTABand heading="Get the free guide — then let's build your Dubai Wealth Engine.">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-7 shadow-xl mb-4">
            <GuideCapture
              dark={false}
              source="Bottom Guide Download — /dubai-property-investment"
            />
          </div>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-heading font-semibold text-sm px-7 py-3 rounded-xl transition-colors"
          >
            Book a Free Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </RedCTABand>

    </div>
  );
}
