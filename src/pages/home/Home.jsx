import React from 'react';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import WhyUs from '../../components/WhyUs';
import Courses from '../../components/Courses';
import ComingSoon from '../../components/ComingSoon';
import Contact from '../../components/Contact';
import PilotHero from './components/PilotHero';
import AviationCourses from './components/AviationCourse';
import AirlinePartners from './components/AirlinePartners';
import { LatestNews } from './components/LatestNews';
import Footer from '../../components/Footer';
import { MediaShowcaseFooter } from './components/MediaShowCaseFooter.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <AviationCourses/>
      <PilotHero/>
      <AirlinePartners/>
      <LatestNews/>
      <MediaShowcaseFooter/>
      {/* <Contact /> */}
    </>
  );
};

export default Home;
