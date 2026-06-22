import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COUNTRY_CODES = [
  { code: '+971', label: '+971 UAE' },
  { code: '+44',  label: '+44 UK' },
  { code: '+1',   label: '+1 USA' },
  { code: '+91',  label: '+91 India' },
  { code: '+49',  label: '+49 Germany' },
  { code: '+33',  label: '+33 France' },
  { code: '+65',  label: '+65 Singapore' },
  { code: '+61',  label: '+61 Australia' },
  { code: '+7',   label: '+7 Russia' },
  { code: '+86',  label: '+86 China' },
  { code: '+966', label: '+966 KSA' },
  { code: '+974', label: '+974 Qatar' },
];

/**
 * PhoneInput — inline country code selector + number field.
 *
 * Props:
 *   value           – phone number string (without country code)
 *   countryCode     – selected country code string (e.g. '+971')
 *   onChange(value) – called with the number portion
 *   onCountryChange(code) – called with the country code
 *   error           – error message string
 *   inputClassName  – extra classes for the input
 *   dark            – if true, uses dark/transparent styling
 */
export default function PhoneInput({ value, countryCode = '+971', onChange, onCountryChange, error, inputClassName = '', dark = false }) {
  const selectBase = dark
    ? 'bg-white/10 border-white/20 text-white h-11 w-28 shrink-0 rounded-r-none border-r-0'
    : 'bg-white border-gray-200 text-[#0E1B3A] h-11 w-28 shrink-0 rounded-r-none border-r-0';

  const inputBase = dark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 h-11 rounded-l-none flex-1 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-white/30'
    : 'bg-white border-gray-200 text-[#0E1B3A] placeholder:text-gray-400 h-11 rounded-l-none flex-1 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0E1B3A]/20';

  return (
    <div>
      <div className={`flex rounded-xl overflow-hidden border ${dark ? 'border-white/20' : 'border-gray-200'} ${error ? 'border-red-500' : ''}`}>
        <Select value={countryCode} onValueChange={onCountryChange}>
          <SelectTrigger className={`${selectBase} border-0 rounded-none border-r ${dark ? 'border-r-white/20' : 'border-r-gray-200'} focus:ring-0`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_CODES.map(c => (
              <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="tel"
          placeholder="50 123 4567 *"
          required
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${inputBase} ${inputClassName} border-0`}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 font-body mt-1">{error}</p>}
    </div>
  );
}