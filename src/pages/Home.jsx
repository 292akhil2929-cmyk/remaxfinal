import { useAudience } from '@/lib/AudienceContext';
import AudienceSelector from '../components/AudienceSelector.jsx';
import usePageSEO from '@/lib/usePageSEO';
import HeroSection from '../components/HeroSection/index.jsx';
import InvestorHome from '../components/home/InvestorHome';
import SellerHome from '../components/home/SellerHome';
import AgentHome from '../components/home/AgentHome';

export default function Home() {
  usePageSEO({
    title: 'Dubai Property Investment | RE/MAX Zam Real Estate',
    description: 'Invest in Dubai off-plan, ready apartments and luxury villas with RE/MAX Zam. Backed by the RE/MAX global network and senior advisors. Explore high-ROI opportunities.',
    canonical: 'https://remaxzam.ae/',
  });

  const { audience } = useAudience();

  return (
    <div>
      <HeroSection />
      {audience === 'investor' && <InvestorHome />}
      {audience === 'seller' && <SellerHome />}
      {audience === 'agent' && <AgentHome />}
      {!audience && <InvestorHome />}
    </div>
  );
}