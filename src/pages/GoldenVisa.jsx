import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Star, Clock, FileText, Home, Globe, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import usePageSEO from '@/lib/usePageSEO';

const steps = [
  { step: '01', title: 'Choose a Qualifying Property', desc: 'Purchase a residential property worth AED 2 million or more from an approved developer or on the secondary market. Off-plan properties from DLD-registered developers also qualify.' },
  { step: '02', title: 'Register with Dubai Land Department', desc: 'Complete the property transfer and receive your official Title Deed from the Dubai Land Department (DLD). Your agent handles all paperwork and DLD fees (4% of property value).' },
  { step: '03', title: 'Apply for UAE Residence Visa', desc: 'Submit your Golden Visa application through the UAE Federal Authority for Identity and Citizenship (ICA) or the General Directorate of Residency and Foreigners Affairs (GDRFA). Our team handles the entire application on your behalf.' },
  { step: '04', title: 'Medical Check and Emirates ID', desc: 'You will complete a straightforward medical fitness test at an approved UAE health centre and provide biometric data for your Emirates ID, which is the national identity card for UAE residents.' },
  { step: '05', title: 'Receive Your 10-Year Visa', desc: 'Your UAE 10-year Golden Visa is issued. You can now sponsor your spouse, children under 25, and household staff. The visa is renewable as long as you maintain the qualifying investment.' },
];

const faqs = [
  { q: 'Who is eligible for the UAE Golden Visa through real estate?', a: 'Any foreign national who purchases a completed or off-plan residential property in Dubai (or the wider UAE) with a minimum value of AED 2 million is eligible to apply. The property can be purchased with a mortgage, provided the investor has already paid at least AED 2 million towards the purchase price.' },
  { q: 'Can I sponsor my family on the Golden Visa?', a: 'Yes. The UAE Golden Visa allows you to sponsor your spouse, children (up to 25 years old, or any age if disabled), and domestic helpers regardless of nationality. There is no minimum salary requirement for Golden Visa holders to sponsor family members.' },
  { q: 'Do I need to actually live in Dubai to keep the Golden Visa?', a: 'No. Regular UAE residence visas lapse after 180 days outside the country, but the Golden Visa is different. You can live anywhere in the world and your visa remains valid, as long as you renew it on time.' },
  { q: 'Can I buy multiple properties to reach the AED 2M threshold?', a: 'Yes. Multiple properties can be combined to reach the AED 2 million minimum, provided they are all completed and title deeds are issued. Off-plan units under construction require a letter from the developer confirming the purchase value.' },
  { q: 'What are the total costs involved beyond the property price?', a: 'You should budget for a 4% DLD transfer fee, an AED 580 title deed issuance fee, and roughly AED 5,000 to 10,000 in visa processing fees. When you purchase through RE/MAX Zam, we handle the full visa application as part of our service at no extra cost.' },
  { q: 'Does the Golden Visa allow me to work in the UAE?', a: 'Yes. The UAE 10-year Golden Visa grants full residency rights including the right to work in the UAE without requiring a separate work permit or local employer sponsorship. You can also open a UAE bank account, register a business, and access UAE government services.' },
];

export default function GoldenVisa() {
  usePageSEO({
    title: 'Dubai Golden Visa Through Property | RE/MAX Zam',
    description: 'Qualify for the UAE Golden Visa via property investment from AED 2M. RE/MAX Zam guides you through eligible properties and the full application process.',
    canonical: 'https://remaxzam.ae/golden-visa',
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400"
          alt="UAE Golden Visa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-5xl font-display font-bold text-white mb-5 max-w-2xl">
            UAE 10-Year Golden Visa Through Real Estate Investment
          </h1>
          <p className="text-base text-white/80 font-body max-w-xl leading-relaxed mb-8">
            Invest AED 2 million or more in Dubai property and you and your whole family can call the UAE home. No income tax. No sponsor. Full property ownership. A 10-year visa that renews as long as you hold the investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-heading font-bold px-6 py-3 rounded-xl transition-colors">
              Start My Application <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/properties" className="inline-flex items-center gap-2 border border-white/50 text-white hover:bg-white/10 font-heading font-bold px-6 py-3 rounded-xl transition-colors">
              View Qualifying Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-bold text-gray-400 tracking-widest mb-3 uppercase">Golden Visa Benefits</p>
            <h2 className="text-3xl font-display font-black text-gray-900 mb-3">What the UAE Golden Visa Gives You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: '10-Year Renewable Residency', desc: 'Long-term security for you and your family without depending on an employer or local sponsor. Renew every 10 years as long as you maintain the qualifying investment.' },
              { icon: Globe, title: 'Live, Work & Study Freely', desc: 'Full UAE residency rights. Work for any company, register your own business, access UAE education and healthcare, and open UAE bank accounts without restrictions.' },
              { icon: Home, title: 'Sponsor Your Entire Family', desc: 'Bring your spouse, children (up to age 25), and domestic helpers to the UAE on your Golden Visa. No minimum salary threshold applies to Golden Visa holders.' },
              { icon: Shield, title: 'No Mandatory UAE Stay', desc: 'Unlike standard UAE visas that expire after 180 days outside the country, the Golden Visa has no stay requirements. Live globally while maintaining UAE residency.' },
              { icon: CheckCircle2, title: '0% Income Tax', desc: "Continue to benefit from the UAE's zero income tax environment on your rental income, salary, and business profits while living in or outside the UAE." },
              { icon: FileText, title: 'Emirates ID & Healthcare', desc: 'Receive a UAE Emirates ID — the national identity document — and access world-class UAE healthcare facilities and government services.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-gray-100 rounded-xl hover:border-black transition-colors">
                <Icon className="w-6 h-6 text-gray-900 mb-3" />
                <h3 className="font-heading font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-bold text-gray-400 tracking-widest mb-3 uppercase">The Process</p>
            <h2 className="text-3xl font-display font-black text-gray-900 mb-3">How to Get Your UAE Golden Visa — Step by Step</h2>
            <p className="text-sm text-gray-500 font-body">RE/MAX Zam manages every step of this process on your behalf. From start to finish it typically takes 4 to 8 weeks after your property purchase completes.</p>
          </div>
          <div className="space-y-6">
            {steps.map(s => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white font-heading font-bold text-sm flex items-center justify-center">{s.step}</div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 font-body leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold mb-3">Properties That Qualify for the Golden Visa</h2>
          <p className="text-white/75 font-body text-sm max-w-2xl mx-auto mb-6">
            Any completed or off-plan Dubai property worth AED 2 million or more from a DLD-registered developer qualifies. Take a look at what we currently have available.
          </p>
          <Link to="/properties" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-heading font-bold px-6 py-3 rounded-xl transition-colors">
            Browse Qualifying Properties <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-heading font-bold text-gray-400 tracking-widest mb-3 uppercase">FAQs</p>
            <h2 className="text-3xl font-display font-black text-gray-900 mb-3">Your Golden Visa Questions Answered</h2>
          </div>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-100 pb-6">
                <h3 className="font-heading font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-display font-bold mb-3">Ready to Secure Your UAE Golden Visa?</h2>
          <p className="text-white/75 font-body mb-7 text-sm">Our Golden Visa team handles everything from finding the right property through to your visa being issued. There is no extra charge for this service.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-heading font-bold px-6 py-3 rounded-xl transition-colors">
            Speak to a Golden Visa Specialist
          </Link>
        </div>
      </section>
    </div>
  );
}
