import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/home/Home';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import NewsPage from './pages/NewsPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import PlacementPage from './pages/PlacementPage';
import GalleryPage from './pages/GalleryPage';
import StudentHub from './pages/StudentHub';
import CareersPage from './pages/CareersPage';
import CTL from './pages/ctl/CTL';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Maintenance from './pages/Maintenance';
import AdminRoutes from './admin/AdminRoutes';
import { trackPageView } from './lib/trackPageView';
import { prefetchPublishedContent } from './hooks/usePublishedContent';

// Scroll to top on route change + count public page views
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

// Warm Supabase + cache courses/news/gallery/team/jobs in the background
function PrefetchCms() {
  useEffect(() => {
    prefetchPublishedContent();
  }, []);
  return null;
}

function App() {
  const location = useLocation();
  const isMaintenanceMode = false; // Set this to false to disable maintenance mode
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  // Admin uses its own layout — no public Navbar/Footer
  if (isAdminRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <PrefetchCms />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ctl" element={<CTL />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/student-hub" element={<StudentHub />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
