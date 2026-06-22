import { Link } from 'react-router-dom';
import { ShieldX, LogOut, Home } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import usePageSEO from '@/lib/usePageSEO';
import { Button } from '@/components/ui/button';

export default function AccessDenied() {
  usePageSEO({ robots: 'noindex, nofollow' });

  const handleLogout = () => {
    base44.auth.logout('/login');
  };

  return (
    <div className="min-h-screen bg-[#0d1b3e] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
          <ShieldX className="w-10 h-10 text-red-400" />
        </div>

        <p className="text-[#c9a84c] font-heading font-semibold text-xs tracking-widest uppercase mb-3">
          RE/MAX ZAM — Admin Portal
        </p>
        <h1 className="text-3xl font-display font-black text-white mb-3">Access Denied</h1>
        <p className="text-white/50 font-body text-sm leading-relaxed mb-8">
          Your account does not have the required Admin privileges to access this area.
          Please contact your system administrator if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={handleLogout}
            className="w-full sm:w-auto h-11 bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-[#0d1b3e] font-heading font-semibold border-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-11 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}