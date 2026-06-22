import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', label: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', label: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', label: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'SAR', label: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'RUB', label: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'CNY', label: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'PKR', label: 'Pakistani Rupee', flag: '🇵🇰' },
  { code: 'EGP', label: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'CHF', label: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CAD', label: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', label: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'JPY', label: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'KWD', label: 'Kuwaiti Dinar', flag: '🇰🇼' },
  { code: 'QAR', label: 'Qatari Riyal', flag: '🇶🇦' },
  { code: 'BHD', label: 'Bahraini Dinar', flag: '🇧🇭' },
  { code: 'OMR', label: 'Omani Rial', flag: '🇴🇲' },
  { code: 'TRY', label: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'ZAR', label: 'South African Rand', flag: '🇿🇦' },
  { code: 'SGD', label: 'Singapore Dollar', flag: '🇸🇬' },
];

export default function CurrencyConverter({ priceAED }) {
  const [currency, setCurrency] = useState('USD');

  const { data: rates, isLoading, isError } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async () => {
      const res = await fetch('https://open.er-api.com/v6/latest/AED');
      const data = await res.json();
      return data.rates;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });

  const selectedCurrency = CURRENCIES.find(c => c.code === currency);
  const convertedPrice = rates && priceAED ? priceAED * rates[currency] : null;

  const formatPrice = (amount, code) => {
    if (!amount) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card border border-border/50 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-4 h-4 text-primary" />
        <h3 className="font-heading font-semibold text-foreground text-sm">Currency Converter</h3>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground font-body mb-1">Price in AED</p>
        <p className="text-xl font-heading font-bold text-foreground">AED {(priceAED || 0).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Convert to</label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {CURRENCIES.map(c => (
              <SelectItem key={c.code} value={c.code}>
                <span className="flex items-center gap-2">{c.flag} {c.code} — {c.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm font-body">Fetching live rates…</span>
          </div>
        ) : isError ? (
          <p className="text-sm text-muted-foreground font-body">Unable to fetch rates. Please try again.</p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground font-body mb-1">Approximate value in {selectedCurrency?.label}</p>
            <p className="text-2xl font-heading font-bold text-primary">{formatPrice(convertedPrice, currency)}</p>
            <p className="text-xs text-muted-foreground font-body mt-2">
              1 AED ≈ {rates?.[currency]?.toFixed(4)} {currency} · Live rates
            </p>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground font-body mt-3 text-center">
        Rates are indicative. Consult your bank for exact figures.
      </p>
    </div>
  );
}