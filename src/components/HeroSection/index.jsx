import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Play, X } from "lucide-react";
// Assumes you have this context in your project
import { useAudience } from "@/lib/AudienceContext"; 

const communities = [
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "Dubai Hills Estate",
];

const HERO_CONTENT = {
  investor: {
    headline: ["Own a Piece of", "The World's Most", "Investable City"],
    sub: "Tax-free returns. Golden Visa eligibility. World-class infrastructure.",
    tabs: [
      { id: "buy", label: "Buy" },
      { id: "off-plan", label: "Off-Plan" },
      { id: "rent", label: "Rent" },
    ],
    searchPlaceholder: "Search by community, area or property type...",
  },
  seller: {
    headline: ["Get the Best Price", "For Your", "Dubai Property"],
    sub: "1,200+ active buyers. 145,000 global RE/MAX agents. Zero guesswork.",
    tabs: null,
    searchPlaceholder: null,
  },
  agent: {
    headline: ["Build the Real Estate", "Career You", "Deserve"],
    sub: "Global brand. Proven systems. Competitive splits. Start selling from day one.",
    tabs: null,
    searchPlaceholder: null,
  },
};

const DEFAULT = HERO_CONTENT.investor;

// Audience-specific KPI data for the bottom stats strip
const AUDIENCE_KPIS = {
  investor: [
    { label: "Tax-Free Yield", value: "6-9%" },
    { label: "Capital Gains Tax", value: "0%" },
    { label: "Global RE/MAX Agents", value: "150k+" },
    { label: "Transactions 2025", value: "AED 917B+" },
  ],
  seller: [
    { value: '145K+', label: 'RE/MAX agents' },
    { value: '1,200+', label: 'Active buyers in our database' },
    { value: '94%', label: 'Listings sold' },
    { value: '4.9★', label: 'Average seller satisfaction' },
  ],
  agent: [
    { value: '110+', label: 'Countries' },
    { value: '145K+', label: 'Global agents' },
    { value: '#1', label: 'Global RE brand' },
    { value: '50+', label: 'Years operating' },
  ],
};

// Audience Options integrated from AudienceSelector
const AUDIENCE_OPTIONS = [
  { id: 'investor', label: 'Invest' },
  { id: 'seller', label: 'Sell' },
  { id: 'agent', label: 'Join as an Agent' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
};

function AnimatedCounter({ value, duration = 2, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/(\d+)/g);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const start = 0;
    const end = parseInt(match[match.length - 1], 10);
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);

      if (value.includes("–")) {
        const lowerBound = Math.min(currentCount, parseInt(match[0], 10));
        setDisplayValue(`${lowerBound}–${currentCount}%`);
      } else {
        setDisplayValue(value.replace(match[match.length - 1], currentCount));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [value, isInView, duration, delay]);

  return (
    <span
      ref={ref}
      className="relative inline-block whitespace-nowrap text-zinc-900"
    >
      <span className="invisible block" aria-hidden="true">
        {value}
      </span>
      <span className="absolute left-0 top-0 tabular-nums w-full text-left">
        {displayValue || value}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  // Pulled in selectAudience from the context
  const { audience, selectAudience } = useAudience();
  const [activeTab, setActiveTab] = useState("buy");
  const [query, setQuery] = useState("");
  
  // Video & Device State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const content = HERO_CONTENT[audience] || DEFAULT;

  useEffect(() => {
    const handleResize = () => {
      // Calculate true viewport height
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
      // Check if mobile for YouTube Short vs Standard Video
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("community", query);
    const tabMap = {
      buy: "ready-residential",
      rent: "rental-residential",
      "off-plan": "off-plan",
    };
    params.set("tab", tabMap[activeTab] || "ready-residential");
    navigate(`/properties?${params.toString()}`);
  };

  const handleSellerCTA = () =>
    document.getElementById("seller-valuation")?.scrollIntoView({ behavior: "smooth" });
  const handleAgentCTA = () =>
    document.getElementById("agent-apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{ minHeight: "calc(var(--vh, 1vh) * 93)" }}
      className="bg-white p-3 sm:p-4 lg:p-5 flex flex-col box-border relative"
    >
      <section className="relative w-full flex-1 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-zinc-900">
        
        {/* Top Right Watch Video Toggle Button */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-40">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="group flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-2.5 sm:px-5 sm:py-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white transition-all shadow-xl"
            aria-label={isVideoPlaying ? 'Close video' : 'Watch video'}
          >
            {isVideoPlaying ? (
              <>
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline font-heading text-[10px] sm:text-xs font-bold uppercase tracking-widest">Close Video</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline font-heading text-[10px] sm:text-xs font-bold uppercase tracking-widest">Watch Video</span>
              </>
            )}
          </button>
        </div>

        {/* Background Image Layer */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90&fit=crop` }}
        />

        {/* Video Player Overlay */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-30 bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${isMobile ? 'CWQyNkSb5Z0' : 'xOqgW9LZR44'}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                title="Dubai Real Estate"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Gradients - Fades out when video plays */}
        <motion.div 
          animate={{ opacity: isVideoPlaying ? 0 : 1 }} 
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Centered Content Container - Fades out and disables clicks when video plays */}
        <motion.div 
          animate={{ opacity: isVideoPlaying ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className={`relative z-20 w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${isVideoPlaying ? 'pointer-events-none' : ''}`}
        >
          {/* ── SEAMLESS AUDIENCE SELECTOR PILL ── */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex justify-center w-full"
          >
            <div className="inline-flex items-center p-1.5 backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-2xl max-w-full overflow-x-auto no-scrollbar">
              <span className="text-white/50 text-[10px] font-body tracking-[0.2em] uppercase pl-5 pr-3 hidden sm:block font-medium">
                I want to
              </span>
              <div className="flex items-center gap-1">
                {AUDIENCE_OPTIONS.map(opt => {
                  const isActive = audience === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectAudience(opt.id)}
                      className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-xs font-heading font-bold tracking-wider uppercase rounded-full transition-colors duration-300 whitespace-nowrap ${
                        isActive ? 'text-zinc-900' : 'text-white hover:text-white/70'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="audience-hero-pill"
                          className="absolute inset-0 bg-white rounded-full shadow-sm"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Dynamic Hero Content below the selector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={audience || "default"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              className="w-full max-w-5xl mx-auto flex flex-col items-center text-center min-h-[340px] sm:min-h-[380px] md:min-h-[420px]"
            >
              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-display font-black leading-[1.1] mb-4 tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md max-w-3xl mx-auto"
              >
                {content.headline.join(" ")}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-white/90 font-body text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl drop-shadow-sm font-medium"
              >
                {content.sub}
              </motion.p>

              {/* Search Bar & Tabs (Investor Audience) */}
              {content.tabs && (
                <motion.div variants={itemVariants} className="w-full max-w-3xl">
                  {/* Attached Tabs */}
                  <div className="flex justify-center relative z-10 -mb-[1px]">
                    <div className="flex bg-zinc-900/90 backdrop-blur-md rounded-t-xl overflow-hidden shadow-lg border-b-0">
                      {content.tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-6 sm:px-8 py-3 text-xs sm:text-sm font-heading font-semibold transition-all ${
                            activeTab === tab.id
                              ? "bg-white text-zinc-900"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Form */}
                  <form
                    onSubmit={handleSearch}
                    className="relative z-20 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2"
                  >
                    <div className="flex-1 flex items-center gap-3 px-4 w-full">
                      <Search className="w-5 h-5 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={content.searchPlaceholder}
                        className="w-full text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none font-body py-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-heading font-bold text-xs sm:text-sm tracking-wide px-8 py-3.5 rounded-xl transition-colors shrink-0 shadow-md"
                    >
                      Search
                    </button>
                  </form>

                  {/* Popular Tags */}
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6">
                    <span className="text-white/70 text-[11px] sm:text-xs font-body font-medium">
                      Popular:
                    </span>
                    {communities.map((c) => {
                      const tabMap = {
                        buy: "ready-residential",
                        rent: "rental-residential",
                        "off-plan": "off-plan",
                      };
                      return (
                        <button
                          key={c}
                          onClick={() =>
                            navigate(
                              `/properties?tab=${tabMap[activeTab] || "ready-residential"}&community=${c}`
                            )
                          }
                          className="text-[11px] sm:text-xs text-white/90 hover:text-white transition-colors font-body hover:underline underline-offset-4 drop-shadow-sm font-medium"
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Seller CTAs */}
              {audience === "seller" && (
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                  <button
                    onClick={handleSellerCTA}
                    className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 font-heading font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-xl"
                  >
                    Get Free Valuation <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/landlords")}
                    className="inline-flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md text-white border border-white/20 font-heading font-semibold text-sm px-8 py-4 rounded-xl hover:bg-black/60 transition-all"
                  >
                    How It Works
                  </button>
                </motion.div>
              )}

              {/* Agent CTAs */}
              {audience === "agent" && (
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                  <button
                    onClick={handleAgentCTA}
                    className="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 font-heading font-bold text-sm px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-xl"
                  >
                    Apply to Join <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/join")}
                    className="inline-flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md text-white border border-white/20 font-heading font-semibold text-sm px-8 py-4 rounded-xl hover:bg-black/60 transition-all"
                  >
                    View Partner Tiers
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </section>

      {/* ── KPI STATS — below hero on mobile, overlaid on desktop ── */}
      <motion.div
        animate={{ opacity: isVideoPlaying ? 0 : 1, y: isVideoPlaying ? 20 : 0 }}
        transition={{ duration: 0.5 }}
        className={`relative md:absolute md:bottom-3 lg:bottom-4 right-0 w-full lg:w-[85%] xl:w-[75%] bg-white rounded-t-2xl md:rounded-none lg:rounded-tl-[3rem] z-20 ${isVideoPlaying ? 'pointer-events-none' : ''}`}
      >

        {/* SVG Seamless Reverse Curve — md+ only */}
        <svg
          className="hidden md:block lg:hidden absolute bottom-0 right-full w-10 h-10 text-white pointer-events-none translate-x-[1px]"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M 100 100 L 0 100 A 100 100 0 0 0 100 0 Z" />
        </svg>
        <svg
          className="hidden lg:block absolute bottom-0 right-full w-12 h-12 text-white pointer-events-none translate-x-[1px]"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M 100 100 L 0 100 A 100 100 0 0 0 100 0 Z" />
        </svg>

        <svg
          className="hidden md:block absolute bottom-full right-0 w-10 h-10 lg:w-12 lg:h-12 text-white pointer-events-none translate-y-[1px]"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M 100 100 L 0 100 A 100 100 0 0 0 100 0 Z" />
        </svg>

        <div className="px-6 py-6 sm:px-10 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
            {(AUDIENCE_KPIS[audience] || AUDIENCE_KPIS.investor).map((s, idx) => (
              <div key={s.label} className="flex flex-col justify-center">
                <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-1">
                  <AnimatedCounter value={s.value} />
                </span>
                <span className="text-gray-500 font-body text-[11px] sm:text-xs font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}