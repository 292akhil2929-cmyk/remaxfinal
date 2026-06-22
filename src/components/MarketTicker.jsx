import { TrendingUp } from 'lucide-react';

const markets = [
  { area: 'Dubai Marina', price: 'AED 1,650/sqft', change: '+4.2%' },
  { area: 'Downtown Dubai', price: 'AED 2,200/sqft', change: '+3.8%' },
  { area: 'Business Bay', price: 'AED 1,480/sqft', change: '+5.1%' },
  { area: 'Palm Jumeirah', price: 'AED 2,800/sqft', change: '+2.9%' },
  { area: 'JVC', price: 'AED 950/sqft', change: '+6.3%' },
  { area: 'Dubai Hills', price: 'AED 1,750/sqft', change: '+4.5%' },
  { area: 'DIFC', price: 'AED 2,400/sqft', change: '+3.1%' },
  { area: 'Creek Harbour', price: 'AED 1,900/sqft', change: '+7.2%' },
];

export default function MarketTicker() {
  const items = [...markets, ...markets, ...markets];

  return (
    <div className="bg-white border-b border-gray-100 py-3 overflow-hidden">
      <div className="flex items-center">
        {/* Live indicator + source label */}
        <div className="flex items-center gap-2 pl-4 pr-5 border-r border-gray-100 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <span className="text-gray-800 font-heading font-bold text-[10px] tracking-[0.15em] uppercase whitespace-nowrap block">Dubai Price Index</span>
            <span className="text-gray-400 font-body text-[9px] whitespace-nowrap block">Source: RERA / DLD</span>
          </div>
        </div>

        {/* Scrolling content */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex gap-8 pl-4"
            style={{ animation: 'scroll 15s linear infinite', whiteSpace: 'nowrap' }}
          >
            {items.map((m, i) => (
              <div key={i} className="inline-flex items-center gap-3 shrink-0">
                <span className="text-gray-700 font-body font-medium text-xs">{m.area}</span>
                <span className="text-gray-300 font-body text-xs">·</span>
                <span className="text-gray-500 font-body text-xs">{m.price}</span>
                <span className="text-emerald-600 font-heading font-bold text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />{m.change}
                </span>
                <span className="text-gray-200 font-body text-xs mx-2">|</span>
              </div>
            ))}
          </div>
          {/* Fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}