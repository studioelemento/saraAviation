import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageMetadata from './components/PageMetadata';
import NotFoundPage from './pages/NotFoundPage';

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
import { contentPreviewFrame } from './lib/contentPreview';
import { trackPageView } from './lib/trackPageView';
import { prefetchPublishedContent } from './hooks/usePublishedContent';

// Scroll to top on route change + count public page views
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!['seo-page-preview', contentPreviewFrame].includes(window.frameElement?.id)) trackPageView(pathname);
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
  const isAdminRoute = /^\/admin(?:\/|$)/i.test(location.pathname);

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  // Admin uses its own layout — no public Navbar/Footer
  if (isAdminRoute) {
    return (
      <>
        <PageMetadata />
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
          <Route path="/news/:articleId" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/student-hub" element={<StudentHub />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
