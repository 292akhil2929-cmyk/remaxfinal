import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import usePageSEO from '@/lib/usePageSEO';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, ArrowRight, Upload, User, Briefcase, Building2, FileText, Loader2 } from 'lucide-react';
import { isValidEmail, isValidPhone, isValidName } from '@/lib/validation';
import { trackLeadEvent } from '@/lib/analytics';

const EMPTY_FORM = {
  // Section A — Personal & Contact
  full_name: '',
  preferred_name: '',
  phone: '',
  phone_country_code: '+971',
  email: '',
  dob: '',
  gender: '',
  nationality: '',
  area_of_residency: '',
  full_address: '',
  linkedin_url: '',
  photo_url: '',

  // Section B — Professional Status & Timeline
  job_title: '',
  joining_status: '',
  target_joining_date: '',
  cv_url: '',

  // Section C — Real Estate Experience
  has_real_estate_experience: '',
  years_in_real_estate: '',
  current_role_dubai: '',
  current_brokerage: '',
  graduation_year: '',
  work_experience: '',
};

const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain',
  'India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal',
  'United Kingdom', 'Ireland', 'France', 'Germany', 'Italy', 'Spain',
  'United States', 'Canada', 'Australia', 'New Zealand',
  'Egypt', 'Jordan', 'Lebanon', 'Syria', 'Iraq', 'Morocco', 'Algeria',
  'South Africa', 'Nigeria', 'Kenya',
  'Russia', 'Ukraine', 'Turkey', 'Iran',
  'China', 'Japan', 'South Korea', 'Philippines', 'Malaysia', 'Indonesia',
  'Other',
];

const JOINING_STATUSES = [
  'Immediate',
  '1 Month Notice',
  '2 Months Notice',
  '3 Months Notice',
  'Currently Employed — Open to Discuss',
];

const GENDERS = ['Male', 'Female', 'Prefer not to say'];

const FILE_UPLOAD_BASE_URL = 'https://remax-zam.b-cdn.net';

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="border-b border-gray-100 pb-3 mb-5">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#C9A84C]" />
        </div>
        <h2 className="text-lg font-heading font-bold text-gray-900">{title}</h2>
      </div>
      {description && <p className="text-xs text-gray-500 font-body ml-[42px]">{description}</p>}
    </div>
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return <p className="text-[11px] text-gray-700 font-body mt-1">{error}</p>;
}

function FieldGroup({ label, children, required, error }) {
  return (
    <div>
      <label className="text-xs font-heading font-medium text-gray-900 mb-1.5 block">
        {label}{required && <span className="text-gray-500 ml-0.5">*</span>}
      </label>
      {children}
      <FieldError error={error} />
    </div>
  );
}

export default function Apply() {
  usePageSEO({
    title: 'Join RE/MAX Zam | Property Agent Careers in Dubai',
    description: 'Looking to build a real estate career in Dubai? Join RE/MAX Zam and access best-in-class training, leads, and the world\'s most trusted property brand.',
    canonical: 'https://remaxzam.ae/join',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState({});

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => { const next = { ...prev }; delete next[k]; return next; });
  };

  const uploadFile = async (file, field) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [field]: true }));
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      set(field, file_url);
    } catch {
      // silently fail — user can try again
    } finally {
      setUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!isValidName(form.full_name)) errs.full_name = 'Name must be at least 2 characters';
    if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
    if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid phone number';
    if (!form.gender) errs.gender = 'Please select your gender';
    if (!form.nationality) errs.nationality = 'Please select your nationality';
    if (!form.job_title) errs.job_title = 'Please enter the position you are applying for';
    if (!form.joining_status) errs.joining_status = 'Please select your availability';
    if (form.linkedin_url && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin_url.trim())) {
      errs.linkedin_url = 'Please enter a valid LinkedIn URL';
    }
    if (form.years_in_real_estate && (isNaN(Number(form.years_in_real_estate)) || Number(form.years_in_real_estate) < 0)) {
      errs.years_in_real_estate = 'Please enter a valid number of years';
    }
    if (form.graduation_year && (isNaN(Number(form.graduation_year)) || Number(form.graduation_year) < 1950 || Number(form.graduation_year) > new Date().getFullYear())) {
      errs.graduation_year = 'Please enter a valid year';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const createLead = useMutation({
    mutationFn: (data) => base44.functions.invoke('createLead', data),
    onSuccess: async (_response, variables) => {
      setSubmitted(true);
      trackLeadEvent('form_submission', { lead_type: 'Agent', source: 'Apply Page', form_id: 'career-application-form' });
      try {
        const bitrixRes = await base44.functions.invoke('sendRecruitmentToBitrix', variables);
        console.log('[Bitrix Recruitment] Success:', bitrixRes?.data);
      } catch (err) {
        console.error('[Bitrix Recruitment] Failed to forward to Bitrix:', err?.message || err);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createLead.isPending) return;
    if (!validate()) return;
    const notes = [
      form.work_experience ? `Work Experience:\n${form.work_experience}` : '',
    ].filter(Boolean).join('\n\n');
    const payload = {
      ...form,
      lead_type: 'Agent',
      source: 'Apply Page',
      notes,
      // Map form field names → bitrix.js expected names
      address: form.full_address,
      joining_date: form.target_joining_date,
      has_re_experience: form.has_real_estate_experience,
      linkedin: form.linkedin_url,
      current_dubai_role: form.current_role_dubai,
      re_years_exp: form.years_in_real_estate,
    };
    createLead.mutate(payload);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-gray-900 mb-3">Application Submitted!</h1>
          <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">
            Thank you for your interest in joining RE/MAX Zam Dubai. Our recruitment team will review your
            profile and reach out within 48 hours.
          </p>
          <Button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }} variant="outline">
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  const inputClass = 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 text-sm focus:ring-2 focus:ring-gray-200';
  const errorClass = 'border-gray-400';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Careers at RE/MAX Zam</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">
            Build Your Career With Dubai's Most Trusted Brand
          </h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            Complete the application below. Our recruitment team reviews every submission personally and responds within 48 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form id="career-application-form" onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* ── SECTION A: Personal & Contact ── */}
            <div className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-xl p-6 lg:p-8 shadow-sm">
              <SectionHeader
                icon={User}
                title="Personal & Contact Information"
                description="Tell us who you are and how to reach you."
              />
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Full Name" required error={errors.full_name}>
                    <Input placeholder="As per passport / visa" value={form.full_name}
                      onChange={e => set('full_name', e.target.value)}
                      className={`${inputClass} ${errors.full_name ? errorClass : ''}`} />
                  </FieldGroup>
                  <FieldGroup label="Preferred Name">
                    <Input placeholder="What should we call you?" value={form.preferred_name}
                      onChange={e => set('preferred_name', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Phone" required error={errors.phone}>
                    <div className="flex gap-2">
                      <Select value={form.phone_country_code} onValueChange={v => set('phone_country_code', v)}>
                        <SelectTrigger className={`w-[100px] shrink-0 ${inputClass}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['+1', '+44', '+61', '+91', '+92', '+963', '+966', '+971'].map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Phone number *" type="tel" value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        className={`flex-1 ${inputClass} ${errors.phone ? errorClass : ''}`} />
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Email" required error={errors.email}>
                    <Input placeholder="you@example.com" type="email" value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className={`${inputClass} ${errors.email ? errorClass : ''}`} />
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FieldGroup label="Date of Birth">
                    <Input type="date" value={form.dob} onChange={e => set('dob', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                  <FieldGroup label="Gender" required error={errors.gender}>
                    <Select value={form.gender} onValueChange={v => set('gender', v)}>
                      <SelectTrigger className={`${inputClass} ${errors.gender ? errorClass : ''}`}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Nationality" required error={errors.nationality}>
                    <Select value={form.nationality} onValueChange={v => set('nationality', v)}>
                      <SelectTrigger className={`${inputClass} ${errors.nationality ? errorClass : ''}`}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Area of Residency">
                    <Input placeholder="e.g. Dubai Marina, JLT" value={form.area_of_residency}
                      onChange={e => set('area_of_residency', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                  <FieldGroup label="Full Address">
                    <Input placeholder="Building / Street / City" value={form.full_address}
                      onChange={e => set('full_address', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                </div>

                <FieldGroup label="LinkedIn Profile URL" error={errors.linkedin_url}>
                  <Input placeholder="https://linkedin.com/in/yourprofile" value={form.linkedin_url}
                    onChange={e => set('linkedin_url', e.target.value)}
                    className={`${inputClass} ${errors.linkedin_url ? errorClass : ''}`} />
                </FieldGroup>

                <FieldGroup label="Photo">
                  <div className="flex items-center gap-4">
                    {form.photo_url && (
                      <img src={form.photo_url} alt="avatar" className="w-14 h-14 rounded-full object-cover object-top border"
                        onError={e => { e.target.style.display = 'none'; }} />
                    )}
                    <div className="flex-1">
                      <Input placeholder="Paste photo URL..." value={form.photo_url}
                        onChange={e => set('photo_url', e.target.value)}
                        className={inputClass} />
                      <label className="inline-flex items-center gap-1.5 text-xs text-gray-900 mt-1.5 cursor-pointer hover:underline font-medium">
                        {uploading.photo ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                        {uploading.photo ? 'Uploading...' : 'Or upload file'}
                        <input type="file" accept="image/*" className="hidden"
                          onChange={e => uploadFile(e.target.files?.[0], 'photo')} />
                      </label>
                    </div>
                  </div>
                </FieldGroup>
              </div>
            </div>

            {/* ── SECTION B: Professional Status & Timeline ── */}
            <div className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-xl p-6 lg:p-8 shadow-sm">
              <SectionHeader
                icon={Briefcase}
                title="Professional Status & Timeline"
                description="Tell us about your current situation and availability."
              />
              <div className="space-y-4">
                <FieldGroup label="Job Title / Position Applied For" required error={errors.job_title}>
                  <Input placeholder="e.g. Property Consultant, Senior Agent, Leasing Specialist" value={form.job_title}
                    onChange={e => set('job_title', e.target.value)}
                    className={`${inputClass} ${errors.job_title ? errorClass : ''}`} />
                </FieldGroup>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Joining Status" required error={errors.joining_status}>
                    <Select value={form.joining_status} onValueChange={v => set('joining_status', v)}>
                      <SelectTrigger className={`${inputClass} ${errors.joining_status ? errorClass : ''}`}>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        {JOINING_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                  <FieldGroup label="Target Joining Date">
                    <Input type="date" value={form.target_joining_date}
                      onChange={e => set('target_joining_date', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                </div>

                <FieldGroup label="CV / Resume">
                  <div className="flex items-center gap-3">
                    <Input placeholder="Paste CV file URL..." value={form.cv_url}
                      onChange={e => set('cv_url', e.target.value)}
                      className={`flex-1 ${inputClass}`} />
                    <span className="text-xs text-gray-500 whitespace-nowrap">or</span>
                    <label className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold cursor-pointer rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors ${uploading.cv ? 'pointer-events-none opacity-50' : ''}`}>
                      {uploading.cv ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                      {uploading.cv ? 'Uploading...' : 'Upload CV'}
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={e => uploadFile(e.target.files?.[0], 'cv')} />
                    </label>
                  </div>
                </FieldGroup>
              </div>
            </div>

            {/* ── SECTION C: Real Estate Experience ── */}
            <div className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-xl p-6 lg:p-8 shadow-sm">
              <SectionHeader
                icon={Building2}
                title="Real Estate Experience Profile"
                description="Help us understand your background in the industry."
              />
              <div className="space-y-4">
                <FieldGroup label="Do you have any Real Estate experience?">
                  <div className="flex gap-3">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 text-sm font-body cursor-pointer transition-all ${
                        form.has_real_estate_experience === opt
                          ? 'border-black bg-gray-50 text-gray-900 font-bold'
                          : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                      }`}>
                        <input type="radio" name="experience" value={opt} checked={form.has_real_estate_experience === opt}
                          onChange={e => set('has_real_estate_experience', e.target.value)}
                          className="sr-only" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </FieldGroup>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Years in Real Estate" error={errors.years_in_real_estate}>
                    <Input type="number" min="0" step="0.5" placeholder="e.g. 3" value={form.years_in_real_estate}
                      onChange={e => set('years_in_real_estate', e.target.value)}
                      className={`${inputClass} ${errors.years_in_real_estate ? errorClass : ''}`} />
                  </FieldGroup>
                  <FieldGroup label="Graduation Year" error={errors.graduation_year}>
                    <Input type="number" min="1950" max={new Date().getFullYear()} placeholder="e.g. 2018" value={form.graduation_year}
                      onChange={e => set('graduation_year', e.target.value)}
                      className={`${inputClass} ${errors.graduation_year ? errorClass : ''}`} />
                  </FieldGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldGroup label="Current Role in Dubai Real Estate">
                    <Input placeholder="e.g. Property Consultant, Leasing Agent" value={form.current_role_dubai}
                      onChange={e => set('current_role_dubai', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                  <FieldGroup label="Current Brokerage or Affiliation">
                    <Input placeholder="e.g. Emaar, DAMAC, independent" value={form.current_brokerage}
                      onChange={e => set('current_brokerage', e.target.value)}
                      className={inputClass} />
                  </FieldGroup>
                </div>

                <FieldGroup label="Detailed Work Experience">
                  <Textarea placeholder="Tell us about your professional background, previous roles, and key achievements in real estate or related fields..."
                    value={form.work_experience} onChange={e => set('work_experience', e.target.value)}
                    className={inputClass} rows={5} />
                </FieldGroup>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <p className="text-xs text-gray-500 font-body">
                By submitting, you agree to our privacy policy and consent to RE/MAX Zam contacting you regarding this application.
              </p>
              <Button type="submit" disabled={createLead.isPending}
                className="bg-black hover:bg-gray-900 text-white font-heading font-bold text-sm px-8 py-2.5 border-0 whitespace-nowrap">
                {createLead.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...</>
                ) : (
                  <>Submit Application <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
