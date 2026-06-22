import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import usePageSEO from '@/lib/usePageSEO';
import { base44 } from '@/api/base44Client';
import { Phone, Mail, MessageCircle, Star, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { trackLeadEvent } from '@/lib/analytics';

const FALLBACK = 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/12/man.jpg';

const perks = [
  { icon: TrendingUp, title: 'Uncapped Commission', desc: 'You pick your commission — 50, 65, or 80 percent — your business, your way. No desk fees for your first months.' },
  { icon: Users, title: 'Ready-Made Lead Pipeline', desc: 'Access to RE/MAX Zam\'s international marketing funnel, CRM database of qualified leads, and developer co-marketing budgets.' },
  { icon: Award, title: 'RERA & Training Support', desc: 'We cover your training, provide hands-on mentorship, and guide you through your first transactions — regardless of your background.' },
  { icon: Star, title: 'RE/MAX Global Network', desc: <>Join the world&apos;s most recognised real estate brand with access to <span className="text-[#C9A84C] font-bold">146,000+</span> agents across <span className="text-[#C9A84C] font-bold">110+</span> countries and <span className="text-[#C9A84C] font-bold">8,700+</span> offices globally.</> },
];

const FOUNDER_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Faisal Contractor',
  jobTitle: 'Owner & Principal Advisor, RE/MAX Zam',
  url: 'https://remaxzam.ae/about',
  worksFor: { '@type': 'RealEstateAgent', name: 'RE/MAX ZAM' },
};

export default function Team() {
  usePageSEO({
    title: 'Our Advisory Team | RERA Licensed Dubai Property Agents | RE/MAX Zam',
    description: 'Meet the RE/MAX Zam advisory team — RERA licensed, multilingual agents specialising in Dubai investment property, off-plan, and Golden Visa.',
    canonical: 'https://remaxzam.ae/team',
    additionalSchema: FOUNDER_SCHEMA,
  });

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => base44.entities.Agent.list('sort_order'),
    select: (data) => Array.isArray(data) ? data : [],
  });

  const activeAgents = agents.filter(a => a.active !== false);
  const ceo = activeAgents[0];
  const rest = activeAgents.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-heading font-bold text-[#C9A84C] tracking-widest mb-3 uppercase">Our People</p>
          <h1 className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4 max-w-2xl">
            Meet the RE/MAX Zam Team
          </h1>
          <p className="text-base text-gray-500 font-body max-w-2xl leading-relaxed mb-8">
            A team of specialist advisors built on a consultant-first growth model. We combine global RE/MAX expertise with deep Dubai market knowledge to deliver results for investors and buyers alike.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border-0" asChild>
            <Link to="/apply">Join Our Team <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-xl" />)}
            </div>
          ) : (
            <>
              {ceo && (
                <div className="mb-12">
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all flex flex-col md:flex-row">
                    <div className="relative md:w-80 shrink-0">
                      <img
                        src={ceo.photo || FALLBACK}
                        alt={ceo.name}
                        className="w-full h-72 md:h-full object-cover object-top"
                        onError={e => { e.target.src = FALLBACK; }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-heading font-bold px-2.5 py-1 rounded text-black bg-[#C9A84C]">
                        {ceo.role}
                      </span>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-heading font-bold text-gray-900 text-2xl mb-1">{ceo.name}</h3>
                      <p className="text-sm font-heading font-bold text-gray-700 mb-4">{ceo.role}</p>
                      <p className="text-sm text-gray-500 font-body leading-relaxed mb-6 max-w-xl">{ceo.about}</p>
                      <div className="flex gap-3">
                        {ceo.phone && (
                          <a href={`tel:${ceo.phone}`} onClick={() => trackLeadEvent('phone', { source: 'Team' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <Phone className="w-4 h-4" /> Call
                          </a>
                        )}
                        {ceo.whatsapp && (
                          <a href={`https://wa.me/${ceo.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent('whatsapp', { source: 'Team' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                          </a>
                        )}
                        {ceo.email && (
                          <a href={`mailto:${ceo.email}`} onClick={() => trackLeadEvent('email', { source: 'Team' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors text-sm font-body text-gray-500 hover:text-black">
                            <Mail className="w-4 h-4" /> Email
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {rest.map(agent => (
                  <div key={agent.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
                    <div className="relative">
                      <img
                        src={agent.photo || FALLBACK}
                        alt={agent.name}
                        className="w-full h-64 object-cover object-top"
                        onError={e => { e.target.src = FALLBACK; }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-heading font-bold px-2.5 py-1 rounded text-black bg-[#C9A84C]">
                        {agent.role}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-gray-900 text-lg mb-0.5">{agent.name}</h3>
                      <p className="text-xs font-heading font-bold text-gray-700 mb-3">{agent.role}</p>
                      <p className="text-xs text-gray-500 font-body leading-relaxed mb-5">{agent.about}</p>
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                        {agent.phone && (
                          <a href={`tel:${agent.phone}`} onClick={() => trackLeadEvent('phone', { source: 'Team' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <Phone className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">Call</span>
                          </a>
                        )}
                        {agent.whatsapp && (
                          <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => trackLeadEvent('whatsapp', { source: 'Team' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <MessageCircle className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">WhatsApp</span>
                          </a>
                        )}
                        {agent.email && (
                          <a href={`mailto:${agent.email}`} onClick={() => trackLeadEvent('email', { source: 'Team' })} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-100 transition-colors group">
                            <Mail className="w-4 h-4 text-[#C9A84C] group-hover:text-black" />
                            <span className="text-[9px] font-body text-gray-500">Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Recruitment Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-heading font-semibold text-[#C9A84C] tracking-widest mb-3 uppercase">Join the Team</p>
            <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Why Top Agents Choose RE/MAX Zam</h2>
            <p className="text-sm text-gray-500 font-body max-w-xl mx-auto">
              We are actively recruiting experienced and ambitious real estate professionals. Build your business with the world's #1 real estate brand.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 border-l-4 border-l-[#C9A84C] rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h4 className="font-heading font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-xs text-gray-500 font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-black rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-display font-bold mb-3">Ready to Build Your Career in Dubai Real Estate?</h3>
            <p className="text-white/75 font-body text-sm max-w-lg mx-auto mb-6">
              Whether you are an experienced agent looking to move to a stronger platform or a high-achiever from another industry, we want to hear from you. Applications open year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-heading font-bold border border-white/30" asChild>
                <Link to="/apply">Apply to Join the Team</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-heading" asChild>
                <Link to="/contact">Ask Us a Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
