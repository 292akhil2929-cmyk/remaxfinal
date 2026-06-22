import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight } from 'lucide-react';
import { isValidEmail, isValidPhone, isValidName, isValidPrice } from '@/lib/validation';
import PhoneInput from '@/components/PhoneInput';
import { trackLeadEvent } from '@/lib/analytics';

export default function SellerLeadForm({ source = "Website", compact = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    phone_country_code: '+971',
    property_type: '',
    property_location: '',
    asking_price: '',
    property_description: '',
    reason_to_sell: '',
  });

  const validate = () => {
    const errs = {};
    if (!isValidName(form.full_name)) errs.full_name = 'Name must be at least 2 characters';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
    if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid phone number';
    if (!form.property_type) errs.property_type = 'Please select a property type';
    if (!form.property_location || !form.property_location.trim()) errs.property_location = 'Community / Area is required';
    if (!isValidPrice(form.asking_price)) errs.asking_price = 'Please enter a valid asking price';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const createLead = useMutation({
    mutationFn: (data) => base44.functions.invoke('createLead', data),
    onSuccess: async (_response, variables) => {
      setSubmitted(true);
      trackLeadEvent('form_submission', { lead_type: variables.lead_type || 'Seller', source: variables.source, form_id: 'seller-lead-form' });
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
    const notes = [
      form.asking_price ? `Asking Price: AED ${Number(form.asking_price).toLocaleString()}` : '',
      form.reason_to_sell ? `Reason: ${form.reason_to_sell}` : '',
      form.property_description ? `Description: ${form.property_description}` : '',
    ].filter(Boolean).join('\n');
    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: `${form.phone_country_code}${form.phone}`,
      lead_type: 'Seller',
      source,
      property_interest: form.property_type && form.property_location ? `${form.property_type} in ${form.property_location}` : '',
      notes,
      // Bitrix fields
      title: form.property_type ? `Website Seller Inquiry: ${form.property_type}` : 'Website Seller Inquiry',
      is_seller: true,
      opportunity: form.asking_price ? Number(form.asking_price) : 0,
    };
    createLead.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Thank You!</h3>
        <p className="text-sm text-muted-foreground font-body">Our property consultant will reach out within 24 hours to discuss your free valuation.</p>
      </div>
    );
  }

  return (
    <form id="seller-lead-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={compact ? "space-y-3" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <Input placeholder="Full Name *" value={form.full_name} onChange={(e) => { setForm({...form, full_name: e.target.value}); clearError('full_name'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.full_name ? 'border-red-500' : ''}`} />
          {errors.full_name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <Input placeholder="Email Address *" type="email" value={form.email} onChange={(e) => { setForm({...form, email: e.target.value}); clearError('email'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-red-500' : ''}`} />
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
        <div>
          <Select value={form.property_type} onValueChange={(v) => { setForm({...form, property_type: v}); clearError('property_type'); }}>
            <SelectTrigger className={`bg-secondary border-border/50 text-foreground ${errors.property_type ? 'border-red-500' : ''}`}><SelectValue placeholder="Property Type *" /></SelectTrigger>
            <SelectContent>
              {["Apartment", "Villa", "Penthouse", "Townhouse", "Land", "Office", "Retail", "Shop"].map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.property_type && <p className="text-[11px] text-red-500 font-body mt-1">{errors.property_type}</p>}
        </div>
      </div>
      <div>
        <Input placeholder="Community / Area *" value={form.property_location} onChange={(e) => { setForm({...form, property_location: e.target.value}); clearError('property_location'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.property_location ? 'border-red-500' : ''}`} />
        {errors.property_location && <p className="text-[11px] text-red-500 font-body mt-1">{errors.property_location}</p>}
      </div>
      <div>
        <Input placeholder="Asking Price (AED) *" type="number" value={form.asking_price} onChange={(e) => { setForm({...form, asking_price: e.target.value}); clearError('asking_price'); }} className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground ${errors.asking_price ? 'border-red-500' : ''}`} />
        {errors.asking_price && <p className="text-[11px] text-red-500 font-body mt-1">{errors.asking_price}</p>}
      </div>
      <Textarea placeholder="Property Description" value={form.property_description} onChange={(e) => setForm({...form, property_description: e.target.value})} className="bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground" rows={3} />
      <Select value={form.reason_to_sell} onValueChange={(v) => setForm({...form, reason_to_sell: v})}>
        <SelectTrigger className="bg-secondary border-border/50 text-foreground"><SelectValue placeholder="Why are you selling?" /></SelectTrigger>
        <SelectContent>
          {["Relocating", "Portfolio Adjustment", "Need Capital", "Property Upgrade", "End of Investment Cycle", "Other"].map(r => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full font-heading font-semibold" disabled={createLead.isPending}>
        {createLead.isPending ? 'Submitting...' : 'Get Free Valuation'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}