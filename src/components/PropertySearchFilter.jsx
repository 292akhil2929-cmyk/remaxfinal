import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const communities = [
  'Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay',
  'Dubai Hills Estate', 'Arabian Ranches', 'Jumeirah Village Circle',
  'Dubai Creek Harbour', 'Emaar Beachfront', 'Mohammed Bin Rashid City',
  'Jumeirah Lake Towers', 'Al Barsha', 'DIFC', 'Meydan',
];

const budgets = [
  { label: 'Under AED 1M', value: 'under-1m' },
  { label: 'AED 1M – 3M', value: '1m-3m' },
  { label: 'AED 3M – 5M', value: '3m-5m' },
  { label: 'AED 5M – 10M', value: '5m-10m' },
  { label: 'Above AED 10M', value: 'above-10m' },
];

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Office'];

export default function PropertySearchFilter() {
  const navigate = useNavigate();
  const [community, setCommunity] = useState('');
  const [budget, setBudget] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (community) params.set('community', community);
    if (budget) params.set('priceRange', budget);
    if (propertyType) params.set('type', propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-4 sm:p-6">
         <p className="text-xs font-heading font-semibold text-accent tracking-widest uppercase mb-4">Find Your Ideal Property</p>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
           <div>
             <label className="block text-xs font-medium text-gray-300 mb-1.5">Community</label>
             <Select value={community} onValueChange={setCommunity}>
               <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                 <SelectValue placeholder="Any Community" />
               </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Community</SelectItem>
                {communities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Budget</label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Any Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Budget</SelectItem>
                {budgets.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSearch} className="w-full h-11 text-sm font-semibold gap-2 bg-accent hover:bg-accent/90">
          <Search className="w-4 h-4" />
          Search Properties
        </Button>
      </div>
    </div>
  );
}