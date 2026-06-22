import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import usePageSEO from '@/lib/usePageSEO';
import PropertyCard from "../components/PropertyCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const GROUPS = [
  {
    label: "Sales",
    tabs: [
      {
        key: "off-plan",
        label: "Off-Plan",
        sub: "New developments",
        filter: (p) => p.listing_status === "Off-Plan",
      },
      {
        key: "ready-residential",
        label: "Ready Residential",
        sub: "Apartments, townhouses, villas",
        filter: (p) =>
          (p.listing_status === "Ready" || p.listing_status === "Resale") &&
          p.transaction_type === "Residential Sale",
      },
      {
        key: "ready-commercial",
        label: "Ready Commercial",
        sub: "Offices & retail",
        filter: (p) =>
          (p.listing_status === "Ready" || p.listing_status === "Resale") &&
          p.transaction_type === "Commercial Sale",
      },
    ],
  },
  {
    label: "Rentals",
    tabs: [
      {
        key: "rental-residential",
        label: "Residential",
        sub: "Apartments & villas",
        filter: (p) => p.transaction_type === "Residential Rental",
      },
      {
        key: "rental-commercial",
        label: "Commercial",
        sub: "Offices & retail",
        filter: (p) => p.transaction_type === "Commercial Lease",
      },
    ],
  },
];

const TABS = GROUPS.flatMap((g) => g.tabs);

const BEDROOM_OPTIONS = ["Any", "Studio", "1", "2", "3", "4", "5+"];

export default function Properties() {
  usePageSEO({
    title: 'Properties for Sale in Dubai | RE/MAX Zam',
    description: 'Find apartments, villas and townhouses for sale across Dubai. Verified listings and expert RE/MAX Zam advisors guide your investment from search to handover.',
    canonical: 'https://remaxzam.ae/properties',
  });

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "off-plan";
  const initialCommunity = searchParams.get("community") || "";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialCommunity);
  const [bedrooms, setBedrooms] = useState("Any");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    Promise.all([
      base44.entities.Property.list("-created_date", 200),
      base44.functions.invoke("fetchPropertyFinderListings", {}),
    ])
      .then(([dbProperties, pfResponse]) => {
        const pfListings = pfResponse.data?.listings || [];
        const publicDbProperties = (Array.isArray(dbProperties) ? dbProperties : []).filter((p) => !p.isPocketListing);
        setProperties([...publicDbProperties, ...pfListings]);
        setLoading(false);
      })
      .catch(() => {
        base44.entities.Property.list("-created_date", 200).then((data) => {
          const publicData = (Array.isArray(data) ? data : []).filter((p) => !p.isPocketListing);
          setProperties(publicData);
          setLoading(false);
        });
      });
  }, []);

  const tab = TABS.find((t) => t.key === activeTab);
  const isRental =
    activeTab === "rental-residential" || activeTab === "rental-commercial";
  const isCommercial =
    activeTab === "ready-commercial" || activeTab === "rental-commercial";

  let filtered = properties.filter(tab.filter);

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.community?.toLowerCase().includes(q),
    );
  }

  if (!isCommercial && bedrooms !== "Any") {
    filtered = filtered.filter((p) => {
      if (bedrooms === "Studio") return p.bedrooms === 0;
      if (bedrooms === "5+") return p.bedrooms >= 5;
      return p.bedrooms === parseInt(bedrooms);
    });
  }

  if (sortBy === "price-asc")
    filtered = [...filtered].sort((a, b) => a.price_aed - b.price_aed);
  if (sortBy === "price-desc")
    filtered = [...filtered].sort((a, b) => b.price_aed - a.price_aed);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-0">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl lg:text-4xl font-black mb-1">
            Properties
          </h1>
          <p className="text-white/50 font-body text-sm">
            Browse our curated Dubai real estate portfolio
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-6">
            {GROUPS.map((group) => (
              <div key={group.label} className="flex-1">
                <p className="text-[10px] font-heading font-bold tracking-[0.15em] uppercase text-gray-400 mb-3 pl-1">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.tabs.map((t) => {
                    const isActive = activeTab === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => {
                          setActiveTab(t.key);
                          setBedrooms("Any");
                          setSearch("");
                        }}
                        className={`flex flex-col items-start px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 min-w-[130px] ${
                          isActive
                            ? "border-black bg-black text-white shadow-md"
                            : "border-gray-200 bg-gray-50 text-gray-900 hover:border-black/30 hover:bg-gray-100"
                        }`}
                      >
                        <span className={`text-sm font-heading font-bold leading-tight ${isActive ? "text-white" : "text-gray-900"}`}>
                          {t.label}
                        </span>
                        <span className={`text-[11px] font-body mt-0.5 ${isActive ? "text-white/60" : "text-gray-400"}`}>
                          {t.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search location, community..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {!isCommercial && (
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-32 h-9 text-sm">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {BEDROOM_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b === "Any"
                      ? "Any beds"
                      : b === "Studio"
                        ? "Studio"
                        : `${b} bed${b === "1" ? "" : "s"}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-sm text-gray-400 font-body ml-auto">
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-body">
            <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-display font-black text-gray-900">No listings found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} isRental={isRental} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
