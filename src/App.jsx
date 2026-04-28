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

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
