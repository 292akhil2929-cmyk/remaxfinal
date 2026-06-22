import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import LeadCaptureForm from '../components/LeadCaptureForm';
import usePageSEO from '@/lib/usePageSEO';

const contactInfo = [
  { icon: MapPin, label: 'Office', value: 'Bay View Tower, Office No. 1102, Dubai, UAE' },
  { icon: Phone, label: 'Phone', value: '+97145828158' },
  { icon: Mail, label: 'Email', value: 'info@remaxzam.ae' },
  { icon: Clock, label: 'Hours', value: 'Sun - Thu: 9AM - 6PM' },
];

export default function Contact() {
  usePageSEO({
    title: 'Contact RE/MAX Zam | Dubai Real Estate',
    description: 'Talk to a RE/MAX Zam advisor about buying, selling or investing in Dubai property. Get in touch by phone, WhatsApp or email today.',
    canonical: 'https://remaxzam.ae/contact',
  });

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Get in Touch</p>
            <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4">
              Let's Talk About Your Dubai Investment
            </h1>
            <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
              Book a free consultation with our team. We respond within 24 hours.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1637747022660-12ce5ce4e420?w=900&q=80&auto=format&fit=crop"
              alt="Luxury Dubai property interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white text-xs font-heading font-bold">Luxury Residences</p>
              <p className="text-[#C9A84C] text-[10px] font-body">Dubai's finest properties</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-bold text-gray-900">{label}</p>
                    <p className="text-sm text-gray-500 font-body">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3 bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-lg p-6 lg:p-8">
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-6">Request a Consultation</h3>
              <LeadCaptureForm source="Contact Page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
