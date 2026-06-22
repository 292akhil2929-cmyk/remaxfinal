import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";

export default function MortgageCalculator({ propertyPrice = 0 }) {
  const [price, setPrice] = useState(propertyPrice || 1000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const { monthly, loanAmount, totalPaid, totalInterest } = useMemo(() => {
    const loanAmount = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly = monthlyRate === 0 ? loanAmount / n
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - loanAmount;
    return { monthly, loanAmount, totalPaid, totalInterest };
  }, [price, downPct, rate, years]);

  const fmt = (n) => Math.round(n).toLocaleString();

  return (
    <div className="bg-card border border-border/50 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-heading font-bold text-foreground text-lg mb-1">Mortgage Calculator</h3>
        <p className="text-xs text-muted-foreground font-body">Estimate your monthly mortgage payments in Dubai</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Property Price</label>
            <span className="text-xs font-heading font-semibold text-foreground">AED {fmt(price)}</span>
          </div>
          <Slider min={500000} max={20000000} step={50000} value={[price]} onValueChange={([v]) => setPrice(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Down Payment</label>
            <span className="text-xs font-heading font-semibold text-foreground">{downPct}% — AED {fmt(price * downPct / 100)}</span>
          </div>
          <Slider min={20} max={80} step={5} value={[downPct]} onValueChange={([v]) => setDownPct(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Interest Rate (per annum)</label>
            <span className="text-xs font-heading font-semibold text-foreground">{rate}%</span>
          </div>
          <Slider min={2} max={10} step={0.1} value={[rate]} onValueChange={([v]) => setRate(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Loan Tenure</label>
            <span className="text-xs font-heading font-semibold text-foreground">{years} years</span>
          </div>
          <Slider min={5} max={25} step={1} value={[years]} onValueChange={([v]) => setYears(v)} className="w-full" />
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-body text-muted-foreground">Monthly Payment</span>
          <span className="text-xl font-heading font-bold text-primary">AED {fmt(monthly)}</span>
        </div>
        <div className="border-t border-border/50 pt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground font-body">Loan Amount</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(loanAmount)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Total Interest</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(totalInterest)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Total Paid</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(totalPaid)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Down Payment</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(price * downPct / 100)}</p>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground font-body">* Indicative estimate only. Actual rates subject to bank approval and market conditions.</p>
    </div>
  );
}