import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroVideo from '../assets/images/aviationVideo.mp4';
import posterImage from '../assets/images/video-bg.jpg';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary">
      {/* Background Video with Poster and Fade-in */}
      <motion.video 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
        poster={posterImage}
        onLoadedData={() => setIsVideoLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </motion.video>

      {/* Static Poster Fallback (Visible while video loads if poster attribute is slow) */}
      {!isVideoLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-[1]" 
          style={{ backgroundImage: `url(${posterImage})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/75 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h6 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white text-base md:text-lg font-semibold uppercase tracking-[4px] mb-6"
          >
            Sara Aviation Academy
          </motion.h6>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white text-4xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.9] mb-10"
          >
            <span className="text-accent italic font-black">Your</span> Classroom <br/>
            <span className="text-3xl md:text-5xl opacity-80">In The Sky</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a 
              href="/courses" 
              className="bg-accent text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300 shadow-2xl shadow-accent/20 rounded-sm"
            >
              Start Your Career
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        <span className="text-white/30 text-[10px] uppercase font-bold tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
