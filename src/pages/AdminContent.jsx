import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import usePageSEO from '@/lib/usePageSEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import {
  Link as LinkIcon,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";
import moment from "moment";
import ImageUploadSection from "@/components/PropertyImageUpload";
import AgentSelector from "@/components/AgentSelector";
import PropertyEditor from "@/components/PropertyEditor";
import PropertyManagementDashboard from "@/components/PropertyManagementDashboard";
import ManualPropertyForm from "@/components/ManualPropertyForm";
import ManagePodcast from "@/components/ManagePodcast";

/* ── Import Listing from URL ─────────────────────────── */
function ImportListingPanel() {
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    {
      value: "off-plan",
      label: "Off-Plan Residential",
      transaction: "Residential Sale",
      status: "Off-Plan",
    },
    {
      value: "ready-residential",
      label: "Ready Residential",
      transaction: "Residential Sale",
      status: "Ready",
    },
    {
      value: "ready-commercial",
      label: "Ready Commercial",
      transaction: "Commercial Sale",
      status: "Ready",
    },
    {
      value: "rental-residential",
      label: "Rental Residential",
      transaction: "Residential Rental",
      status: null,
    },
    {
      value: "rental-commercial",
      label: "Rental Commercial",
      transaction: "Commercial Lease",
      status: null,
    },
  ];

  const handleImport = async () => {
    if (!url.trim() || !category) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const selectedCat = categories.find((c) => c.value === category);
      const res = await base44.functions.invoke("importListing", {
        url: url.trim(),
        transaction_type: selectedCat.transaction,
        listing_status: selectedCat.status,
      });
      setResult(res.data.property);
    } catch (e) {
      setError(
        e?.response?.data?.error || e.message || "Failed to import listing",
      );
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    {
      name: "PropertyFinder",
      color: "bg-red-50 text-red-700",
      pattern: "propertyfinder.ae",
    },
    { name: "Bayut", color: "bg-blue-50 text-blue-700", pattern: "bayut.com" },
    {
      name: "Dubizzle",
      color: "bg-orange-50 text-orange-700",
      pattern: "dubizzle.com",
    },
    {
      name: "remaxzam.ae",
      color: "bg-emerald-50 text-emerald-700",
      pattern: "remaxzam.ae",
    },
  ];

  const detectedPlatform = platforms.find((p) => url.includes(p.pattern));

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <LinkIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-foreground">
            Import Listing from URL
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            Paste a link from remaxzam.ae, PropertyFinder, Bayut, or Dubizzle
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        {platforms.map((p) => (
          <span
            key={p.name}
            className={`text-xs px-2 py-0.5 rounded font-body ${p.color}`}
          >
            {p.name}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-2 block">
            Select Listing Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Choose a category...</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.remaxzam.ae/listing/... or propertyfinder.ae, bayut.com..."
            className="flex-1 px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={handleImport}
            disabled={loading || !url.trim() || !category}
            className="font-heading shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Import"}
          </Button>
        </div>
      </div>

      {detectedPlatform && !result && !error && (
        <p className="text-xs text-muted-foreground mt-2 font-body">
          ✓ Detected:{" "}
          <span
            className={`font-medium ${detectedPlatform.color.split(" ")[1]}`}
          >
            {detectedPlatform.name}
          </span>
        </p>
      )}

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Loader2 className="w-4 h-4 animate-spin" />
          Reading listing page and extracting data with AI...
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="font-body">{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-heading font-semibold text-emerald-800">
              Listing imported successfully!
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
            <div>
              <p className="text-xs text-emerald-600 font-body">Title</p>
              <p className="font-heading font-medium text-foreground text-xs line-clamp-2">
                {result.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-body">Price</p>
              <p className="font-heading font-medium text-foreground">
                AED {(result.price_aed || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-body">Location</p>
              <p className="font-heading font-medium text-foreground">
                {result.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-body">Type</p>
              <p className="font-heading font-medium text-foreground">
                {result.property_type}
              </p>
            </div>
          </div>
          <ImageUploadSection
            propertyId={result.id}
            currentImages={
              result.gallery_images ||
              (result.image_url ? [result.image_url] : [])
            }
            currentHero={result.image_url || ""}
            onImagesUpdated={() => {}}
          />
          <AgentSelector
            propertyId={result.id}
            onAgentSelected={() => {
              setUrl("");
              setResult(null);
              setCategory("");
            }}
          />
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => {
                setUrl("");
                setResult(null);
                setCategory("");
              }}
            >
              Import Another
            </Button>
            <Button size="sm" className="text-xs" asChild>
              <Link to="/properties">
                View All Listings <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── AI Blog Post Generator ──────────────────────────── */
function BlogGeneratorPanel({ onGenerated }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const suggestedTopics = [
    "Dubai rental yields Q2 2025 — which areas are beating the market",
    "New off-plan launches in JVC and Business Bay this month",
    "UAE Golden Visa 2025 — latest updates for property investors",
    "Why Dubai property prices are rising faster than expected in 2025",
    "Best studios and 1BHK investments under AED 800K in Dubai right now",
  ];

  const handleGenerate = async (topicText) => {
    const t = topicText || topic;
    if (!t.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await base44.functions.invoke("autoPublishBlogPost", {});
      setResult(res.data.post);
      if (onGenerated) onGenerated();
    } catch (e) {
      setError(e?.response?.data?.error || e.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-foreground">
            AI Blog Post Generator
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            Generate and publish a market insight post instantly
          </p>
        </div>
        <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
          Auto-publishes
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground font-body mb-3">
        Suggested topics — click to generate, or type your own:
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestedTopics.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTopic(t);
            }}
            className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-muted hover:bg-primary/5 hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors font-body text-left"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Or type a custom topic..."
          className="flex-1 px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button
          onClick={() => handleGenerate(topic)}
          disabled={loading}
          className="bg-accent hover:bg-accent/90 font-heading shrink-0 border-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-1" /> Generate
            </>
          )}
        </Button>
      </div>

      {loading && (
        <div className="mt-4 text-sm text-muted-foreground font-body flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          AI is writing your market insight post... (~15 seconds)
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="font-body">{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-heading font-semibold text-emerald-800">
              Post published to Insights!
            </span>
          </div>
          <p className="text-sm font-heading font-medium text-foreground mb-1">
            {result.title}
          </p>
          <p className="text-xs text-muted-foreground font-body mb-3 line-clamp-2">
            {result.excerpt}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => {
                setResult(null);
                setTopic("");
              }}
            >
              Generate Another
            </Button>
            <Button size="sm" className="text-xs" asChild>
              <Link to="/insights">
                View on Site <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Recent Posts ────────────────────────────────────── */
function RecentPostsPanel({ refresh }) {
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-posts", refresh],
    queryFn: () => base44.entities.BlogPost.list("-created_date", 8),
  });

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> Recent Blog Posts
        </h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => refetch()}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
        </Button>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body text-center py-6">
          No posts yet. Use the generator above!
        </p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-3 bg-muted/40 rounded-lg"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-heading font-medium text-foreground line-clamp-1">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {moment(post.created_date).fromNow()}
                  </span>
                  {post.published && (
                    <span className="text-xs text-emerald-600 font-medium">
                      ● Live
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Property Management Dashboard (replaces old RecentPropertiesPanel) ── */
/* PropertyManagementDashboard is imported and used below */

/* ── Main Page ───────────────────────────────────────── */
export default function AdminContent() {
  usePageSEO({ robots: 'noindex, nofollow' });

  const [refreshPosts, setRefreshPosts] = useState(0);
  const [entryMode, setEntryMode] = useState('import'); // 'import' | 'manual'
  const [adminTab, setAdminTab] = useState('content'); // 'content' | 'podcast'
  const navigate = useNavigate();

  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  useEffect(() => {
    if (userLoading) return;
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }
    if (currentUser.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [currentUser, userLoading, navigate]);

  if (userLoading || !currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-[#0d1b3e] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#c9a84c] font-heading font-semibold text-xs tracking-widest uppercase mb-2">
            RE/MAX ZAM — Admin
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-display font-black text-white mb-2">
                Content Command Centre
              </h1>
              <p className="text-white/60 font-body text-sm">
                Import listings, generate blog posts, and manage your website
                content — all in one place.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-heading shrink-0"
            >
              <Link to="/admin/team">
                <Users className="w-4 h-4 mr-2" /> Team Management
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-border/50 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'content', label: 'Content & Listings' },
              { id: 'podcast', label: 'Manage Podcast' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`px-5 py-3.5 text-sm font-heading font-semibold border-b-2 transition-colors ${
                  adminTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {adminTab === 'podcast' ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ManagePodcast />
        </div>
      ) : (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Full Property Management Dashboard */}
        <PropertyManagementDashboard />

        {/* Add New Property — Toggle between Auto-Import and Manual Entry */}
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          {/* Toggle Header */}
          <div className="flex border-b border-border/50">
            <button
              onClick={() => setEntryMode('import')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-heading font-semibold transition-colors ${
                entryMode === 'import'
                  ? 'bg-primary/5 text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Auto-Import (Dubizzle Scraper)
            </button>
            <button
              onClick={() => setEntryMode('manual')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-heading font-semibold transition-colors ${
                entryMode === 'manual'
                  ? 'bg-primary/5 text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Manual Entry
            </button>
          </div>

          {/* Panel Content */}
          {entryMode === 'import' ? <ImportListingPanel /> : <ManualPropertyForm onBack={() => setEntryMode('import')} />}
        </div>

        {/* Automation notice */}
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-heading font-semibold text-emerald-800">
              Daily Auto-Publishing is Active
            </p>
            <p className="text-xs text-emerald-700 font-body mt-0.5">
              A new AI-generated market insight blog post is automatically
              published every day at 8:00 AM Dubai time. You can also generate
              posts manually below at any time.
            </p>
          </div>
        </div>

        {/* Blog Generator */}
        <BlogGeneratorPanel onGenerated={() => setRefreshPosts((r) => r + 1)} />

        {/* Recent Posts */}
        <RecentPostsPanel refresh={refreshPosts} />
      </div>
      )}
    </div>
  );
}