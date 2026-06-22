import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import { isValidEmail, isValidPhone, isValidName } from '@/lib/validation';
import PhoneInput from '@/components/PhoneInput';
import { trackEvent, trackLeadEvent } from '@/lib/analytics';

export default function PropertyViewingForm({ property, agentName }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    phone_country_code: '+971',
    request_type: '',
    preferred_date: '',
  });

  const validate = () => {
    const errs = {};
    if (!isValidName(form.full_name)) errs.full_name = 'Name must be at least 2 characters';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
    if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid phone number';
    if (!form.request_type) errs.request_type = 'Please select an option';
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
      trackEvent('generate_lead', { lead_type: variables.lead_type, source: variables.source, form_id: 'property-viewing-form' });
      trackLeadEvent('form_submission', { lead_type: variables.lead_type, source: variables.source, form_id: 'property-viewing-form' });
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
    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: `${form.phone_country_code}${form.phone}`,
      lead_type: 'Investor',
      source: 'Property Viewing Request',
      property_interest: `${property.title} (${property.location})`,
      notes: `Request Type: ${form.request_type}${form.preferred_date ? ` | Preferred Date: ${form.preferred_date}` : ''}`,
      // Bitrix property-viewing fields
      property_title: property.title,
      property_id: property.id,
      assigned_agent_name: agentName,
    };
    createLead.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="font-heading font-semibold text-foreground text-lg mb-1">Request Submitted!</h3>
        <p className="text-xs text-muted-foreground font-body mb-4">Our team will confirm your viewing within 2 hours.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ full_name: '', email: '', phone: '', phone_country_code: '+971', request_type: '', preferred_date: '' });
          }}
          className="text-xs text-primary hover:underline font-medium"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form id="property-viewing-form" onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="space-y-3">
        <div>
          <Input
            placeholder="Full Name *"
            value={form.full_name}
            onChange={(e) => { setForm({ ...form, full_name: e.target.value }); clearError('full_name'); }}
            className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground text-sm ${errors.full_name ? 'border-red-500' : ''}`}
          />
          {errors.full_name && <p className="text-[11px] text-red-500 font-body mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <Input
            placeholder="Email *"
            type="email"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); clearError('email'); }}
            className={`bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground text-sm ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-[11px] text-red-500 font-body mt-1">{errors.email}</p>}
        </div>
        <PhoneInput
          value={form.phone}
          countryCode={form.phone_country_code}
          onChange={v => { setForm({ ...form, phone: v }); clearError('phone'); }}
          onCountryChange={v => setForm({ ...form, phone_country_code: v })}
          error={errors.phone}
        />
      </div>

      <div>
        <Select value={form.request_type} onValueChange={(v) => { setForm({ ...form, request_type: v }); clearError('request_type'); }}>
          <SelectTrigger className={`bg-secondary border-border/50 text-foreground text-sm ${errors.request_type ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="What would you like? *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Schedule Viewing">📅 Schedule a Viewing</SelectItem>
            <SelectItem value="Investment Consultation">💼 Investment Consultation</SelectItem>
            <SelectItem value="Mortgage Discussion">🏦 Mortgage Discussion</SelectItem>
            <SelectItem value="General Inquiry">❓ General Inquiry</SelectItem>
          </SelectContent>
        </Select>
        {errors.request_type && <p className="text-[11px] text-red-500 font-body mt-1">{errors.request_type}</p>}
      </div>

      <Input
        placeholder="Preferred Date (optional)"
        type="date"
        value={form.preferred_date}
        onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
        className="bg-secondary border-border/50 text-foreground text-sm"
      />

      <Button
        type="submit"
        className="w-full font-heading font-semibold bg-primary hover:bg-primary/90"
        disabled={createLead.isPending}
      >
        {createLead.isPending ? 'Submitting...' : 'Request Now'}
        <MessageSquare className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-[10px] text-muted-foreground text-center font-body">We'll contact you within 2 hours to confirm</p>
    </form>
  );
}