import { Phone, Mail, MessageCircle } from 'lucide-react';
import { trackLeadEvent } from '@/lib/analytics';

const WHATSAPP_NUMBER = '97145828158';
const WHATSAPP_MSG = encodeURIComponent("Hi, I'd like to get more information about Dubai real estate.");
const EMAIL = 'info@remaxzam.ae';
const PHONE = '+97145828158';

export default function ContactStrip() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading font-semibold text-sm text-white/80 text-center sm:text-left">
            Ready to invest in Dubai? Talk to a specialist — no cost, no pressure!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLeadEvent('whatsapp', { source: 'ContactStrip' })}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              onClick={() => trackLeadEvent('phone', { source: 'ContactStrip' })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors border border-white/20"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => trackLeadEvent('email', { source: 'ContactStrip' })}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors border border-white/20"
            >
              <Mail className="w-4 h-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}