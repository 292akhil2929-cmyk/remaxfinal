import { Link } from 'react-router-dom';
import PropertySearchFilter from '@/components/PropertySearchFilter';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function InvestorHero() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <PropertySearchFilter />
      </div>
    </div>
  );
}