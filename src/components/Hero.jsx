import React from 'react';
import { motion } from 'framer-motion';
import heroVideo from '../assets/images/aviationVideo.mp4';

const Hero = () => {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/85 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h6 className="text-white text-base md:text-lg font-semibold uppercase tracking-[2px] mb-6">
            Sara Aviation Academy
          </h6>
          <h2 className="text-white text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.9] mb-10">
            <span className="text-accent italic font-black">Your</span> Classroom
          </h2>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a 
              href="#section2" 
              className="bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-accent transition-all duration-300 shadow-xl shadow-accent/20"
            >
              Discover more
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
