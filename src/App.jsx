import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { AudienceProvider } from '@/lib/AudienceContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';
import OutboundLinkTracker from '@/components/OutboundLinkTracker';
import CookieConsent from '@/components/CookieConsent';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetail from './pages/PropertyDetail';
import JoinUs from './pages/JoinUs';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import AboutUs from './pages/AboutUs';
import GoldenVisa from './pages/GoldenVisa';
import Services from './pages/Services';
import OffPlan from './pages/OffPlan';
import Team from './pages/Team';
import AreaGuides from './pages/AreaGuides';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Landlords from './pages/Landlords';
import Dashboard from './pages/Dashboard';
import AdminContent from './pages/AdminContent';
import ThemePreview from './pages/ThemePreview';
import ReadyListings from './pages/ReadyListings';
import Dugasta from './pages/Dugasta';
import HighROI from './pages/HighROI';
import Developers from './pages/Developers';
import DeveloperProfile from './pages/DeveloperProfile';
import DubaiUnfiltered from './pages/DubaiUnfiltered';
import WhyREMAXZAM from './pages/WhyREMAXZAM';
import RemaxDubai from './pages/RemaxDubai';
import DubaiGuide from './pages/DubaiGuide';
import DugastaTR from './pages/DugastaTR';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import AdminTeam from './pages/AdminTeam';
import Apply from './pages/Apply';
import ROIDubaiProperty from './pages/ROIDubaiProperty';
import GoldenVisaProperty from './pages/GoldenVisaProperty';
import DubaiPropertyInvestment from './pages/DubaiPropertyInvestment';
import FounderPassiveIncome from './pages/FounderPassiveIncome';
import DugastaFAQ from './pages/DugastaFAQ';

/** Redirects unknown old paths to the homepage via window.location.replace */
function HomeRedirect() {
  useEffect(() => {
    window.location.replace('/');
  }, []);
  return null;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();

  // SPA route tracking — fire page_view on every navigation
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (authError?.type === 'auth_required' && location.pathname !== '/login') {
      navigateToLogin('/login');
    }
  }, [authError, location.pathname, navigateToLogin]);

  // ── Legacy redirects: 301-style client-side redirects for old URLs ──────────
  useEffect(() => {
    const path = location.pathname;

    // /property-listing/* → /off-plan
    if (path.startsWith('/property-listing')) {
      window.location.replace('/off-plan');
      return;
    }

    // /properties/batumi/ and /properties/dubai-sports-city/ → /properties
    if (path === '/properties/batumi/' || path === '/properties/batumi' ||
        path === '/properties/dubai-sports-city/' || path === '/properties/dubai-sports-city') {
      window.location.replace('/properties');
      return;
    }

    // /properties/*-archive → /properties
    if (/^\/properties\/.*-archive/.test(path)) {
      window.location.replace('/properties');
      return;
    }

    // /uae-properties/* → /properties
    if (path.startsWith('/uae-properties')) {
      window.location.replace('/properties');
      return;
    }

    // /investor-guides/, /insights-blog/, /news/ → /insights
    if (path.startsWith('/investor-guides') ||
        path.startsWith('/insights-blog') ||
        path.startsWith('/news')) {
      window.location.replace('/insights');
      return;
    }
  }, [location.pathname]);

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      if (location.pathname === '/login') {
        return null;
      }
      return <Navigate to="/login" replace />;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:propertyId" element={<PropertyDetail />} />
        <Route path="/ready-listings" element={<ReadyListings />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/area-guides" element={<AreaGuides />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/golden-visa" element={<GoldenVisa />} />
        <Route path="/services" element={<Services />} />
        <Route path="/off-plan" element={<OffPlan />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogDetail />} />
        <Route path="/landlords" element={<Landlords />} />
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              requiredRole="admin"
              unauthenticatedElement={<Navigate to="/login" replace />}
              unauthorizedElement={<Navigate to="/access-denied" replace />}
            />
          }
        >
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/team" element={<AdminTeam />} />
        </Route>
        <Route path="/theme-preview" element={<ThemePreview />} />
        <Route path="/dugasta" element={<Dugasta />} />
        <Route path="/high-roi" element={<HighROI />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/developers/:developerSlug" element={<DeveloperProfile />} />
        <Route path="/dubai-real-estate-unfiltered" element={<DubaiUnfiltered />} />
        <Route path="/why-remax-zam" element={<WhyREMAXZAM />} />
        <Route path="/remax-dubai" element={<RemaxDubai />} />
        <Route path="/dubai-property-guide" element={<DubaiGuide />} />
        <Route path="/dugasta-tr" element={<DugastaTR />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/10-net-roi-dubai-property" element={<ROIDubaiProperty />} />
        <Route path="/dubai-golden-visa-property" element={<GoldenVisaProperty />} />
        <Route path="/dubai-property-investment" element={<DubaiPropertyInvestment />} />
        <Route path="/my-dubai-passive-income" element={<FounderPassiveIncome />} />
        <Route path="/dugasta-faq" element={<DugastaFAQ />} />
        {/* Legacy 404 — /property/test/ deleted, returns 404 */}
        <Route path="/property/test" element={<PageNotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      {/* /property/test/ deleted → explicit 404 */}
      <Route path="/property/test" element={<PageNotFound />} />
      {/* Catch-all: unknown old paths fall back to home */}
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <AudienceProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <OutboundLinkTracker />
            <AuthenticatedApp />
            <CookieConsent />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AudienceProvider>
    </AuthProvider>
  )
}

export default App