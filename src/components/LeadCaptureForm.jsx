import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, ArrowRight } from 'lucide-react';
import { isValidEmail, isValidPhone, isValidName } from '@/lib/validation';
import PhoneInput from '@/components/PhoneInput';
import { trackLeadEvent } from '@/lib/analytics'; // Only importing the required helper

export default function LeadCaptureForm({ leadType = "Investor", source = "Website", compact = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', phone_country_code: '+971', investment_budget: '', investment_goal: '', property_interest: '' });

  const validate = () => {
    const errs = {};
    if (!isValidName(form.full_name)) errs.full_name = 'Name must be at least 2 characters';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
    if (form.phone && !isValidPhone(form.phone)) errs.phone = 'Please enter a valid phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const createLead = useMutation({
    mutationFn: async (data) => {
      const response = await base44.functions.invoke('createLead', data);
      return response;
    },
    onSuccess: async (_response, variables) => {
      setSubmitted(true);
      
      // FIXED: Removed duplicate trackEvent line to prevent double lead counts.
      // This sends exactly one 'generate_lead' event with all tracking properties safely nested.
      trackLeadEvent('form_submission', { 
        lead_type: variables.lead_type, 
        source: variables.source, 
        form_id: 'investor-lead-form' 
      });

      try {
        const res = await base44.functions.invoke('sendLeadToBitrix', { ...variables, page_url: window.location.href });
        console.log('[Bitrix Lead] Success:', res?.data);
      } catch (err) {
        console.error('[Bitrix Lead] Failed:', err?.message || err);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createLead.isPending) return;
    if (!validate()) return;
    const payload = { ...form, phone: `${form.phone_country_code}${form.phone}`, lead_type: leadType, source };
    createLead.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Thank You!</h3>
        <p className="text-sm text-muted-foreground font-body">Our investment advisor will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form id="investor-lead-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={compact ? "space-y-3" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <Input placeholder="Full Name *" value={form.full_name} onChange={(e) => { setForm({...form, full_name: e.target.value}); clearError('full_name'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.full_name ? 'border-red-500' : ''}`} />
          {errors.full_name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <Input placeholder="Email *" type="email" value={form.email} onChange={(e) => { setForm({...form, email: e.target.value}); clearError('email'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-red-500' : ''}`} />
          {errors.email && <p className="text-[11px] text-red-500 font-body mt-1">{errors.email}</p>}
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <PhoneInput
            value={form.phone}
            countryCode={form.phone_country_code}
            onChange={v => { setForm({...form, phone: v}); clearError('phone'); }}
            onCountryChange={v => setForm({...form, phone_country_code: v})}
            error={errors.phone}
          />
        </div>
        <Select value={form.investment_budget} onValueChange={(v) => setForm({...form, investment_budget: v})}>
          <SelectTrigger className="bg-secondary border-border/50 text-foreground"><SelectValue placeholder="Investment Budget" /></SelectTrigger>
          <SelectContent>
            {["Under 500K AED", "500K - 1M AED", "1M - 3M AED", "3M - 5M AED", "5M+ AED"].map(b => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Select value={form.investment_goal} onValueChange={(v) => setForm({...form, investment_goal: v})}>
        <SelectTrigger className="bg-secondary border-border/50 text-foreground"><SelectValue placeholder="Investment Goal" /></SelectTrigger>
        <SelectContent>
          {["Capital Appreciation", "Rental Income", "Golden Visa", "Relocation", "Portfolio Diversification"].map(g => (
            <SelectItem key={g} value={g}>{g}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="What are you looking for? (e.g. 2BR in Marina, off-plan, villa...)" value={form.property_interest} onChange={(e) => setForm({...form, property_interest: e.target.value})} className="bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground" />
      <Button type="submit" className="w-full font-heading font-semibold" disabled={createLead.isPending}>
        {createLead.isPending ? 'Submitting...' : 'Get Free Investment Advice'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}