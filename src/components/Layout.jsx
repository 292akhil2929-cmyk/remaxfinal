import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget.jsx';
import ScrollToTop from './ScrollToTop';
import ContactStrip from './ContactStrip';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background font-body">
      <ScrollToTop />
      <Navbar />
      <main className="pt-16 lg:pt-[70px]">
        <Outlet />
      </main>
      <ContactStrip />
      <Footer />
      <ChatWidget />
    </div>
  );
}