import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import WhyUs from '../components/WhyUs';
import Courses from '../components/Courses';
import ComingSoon from '../components/ComingSoon';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <WhyUs />
      <ComingSoon />
      <Courses />
      <Contact />
    </>
  );
};

export default Home;
