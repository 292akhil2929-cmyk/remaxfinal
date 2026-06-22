import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { TrendingUp } from 'lucide-react';

export default function ROICalculator({ propertyPrice = 0, rentalYield = 0, expectedRoi = 0 }) {
  const [price, setPrice] = useState(propertyPrice || 1000000);
  const [yield_, setYield] = useState(rentalYield || 7);
  const [appreciation, setAppreciation] = useState(expectedRoi || 8);
  const [holdYears, setHoldYears] = useState(5);
  const [vacancy, setVacancy] = useState(5);

  const results = useMemo(() => {
    const annualRent = price * (yield_ / 100) * (1 - vacancy / 100);
    const totalRental = annualRent * holdYears;
    const futureValue = price * Math.pow(1 + appreciation / 100, holdYears);
    const capitalGain = futureValue - price;
    const totalReturn = totalRental + capitalGain;
    const totalROI = (totalReturn / price) * 100;
    const annualisedROI = (Math.pow(1 + totalROI / 100, 1 / holdYears) - 1) * 100;

    return { annualRent, totalRental, futureValue, capitalGain, totalReturn, totalROI, annualisedROI };
  }, [price, yield_, appreciation, holdYears, vacancy]);

  const fmt = (n) => Math.round(n).toLocaleString();

  return (
    <div className="bg-card border border-border/50 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-heading font-bold text-foreground text-lg mb-1">Investment ROI Calculator</h3>
        <p className="text-xs text-muted-foreground font-body">Project your total returns over your investment horizon</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Purchase Price</label>
            <span className="text-xs font-heading font-semibold text-foreground">AED {fmt(price)}</span>
          </div>
          <Slider min={500000} max={20000000} step={50000} value={[price]} onValueChange={([v]) => setPrice(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Annual Rental Yield</label>
            <span className="text-xs font-heading font-semibold text-foreground">{yield_}%</span>
          </div>
          <Slider min={3} max={15} step={0.5} value={[yield_]} onValueChange={([v]) => setYield(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Annual Capital Appreciation</label>
            <span className="text-xs font-heading font-semibold text-foreground">{appreciation}%</span>
          </div>
          <Slider min={0} max={20} step={0.5} value={[appreciation]} onValueChange={([v]) => setAppreciation(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Holding Period</label>
            <span className="text-xs font-heading font-semibold text-foreground">{holdYears} years</span>
          </div>
          <Slider min={1} max={15} step={1} value={[holdYears]} onValueChange={([v]) => setHoldYears(v)} className="w-full" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-body text-muted-foreground">Vacancy Rate</label>
            <span className="text-xs font-heading font-semibold text-foreground">{vacancy}%</span>
          </div>
          <Slider min={0} max={20} step={1} value={[vacancy]} onValueChange={([v]) => setVacancy(v)} className="w-full" />
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-body text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent" /> Total ROI over {holdYears} yrs
          </span>
          <span className="text-2xl font-heading font-black text-accent">{results.totalROI.toFixed(1)}%</span>
        </div>
        <div className="border-t border-border/50 pt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground font-body">Annual Rental Income</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(results.annualRent)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Total Rental Income</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(results.totalRental)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Capital Gain</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(results.capitalGain)}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-body">Future Property Value</p>
            <p className="font-heading font-semibold text-foreground">AED {fmt(results.futureValue)}</p>
          </div>
          <div className="col-span-2 pt-2 border-t border-border/50">
            <p className="text-muted-foreground font-body">Annualised Return (IRR approx.)</p>
            <p className="font-heading font-bold text-primary">{results.annualisedROI.toFixed(2)}% per year</p>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground font-body">* Projections are illustrative. Past performance does not guarantee future results. Consult a financial advisor before investing.</p>
    </div>
  );
}