import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import chooseImage01 from '../assets/images/choose-us-image-01.png';
import chooseImage02 from '../assets/images/choose-us-image-02.png';
import chooseImage03 from '../assets/images/choose-us-image-03.png';
import bgImage from '../assets/images/choosing-bg.jpg';

const tabs = [
  {
    id: 'best-education',
    label: 'Best Education',
    title: 'Best Education',
    image: chooseImage01,
    content: 'Sara Aviation is a premier educational platform for aviation management and training. Feel free to use it for educational or commercial purposes.'
  },
  {
    id: 'top-management',
    label: 'Top Management',
    title: 'Top Level',
    image: chooseImage02,
    content: 'You can modify this HTML layout by editing contents and adding more pages as you needed. Since this template has options to add dropdown menus, you can put many HTML pages. Suspendisse tincidunt, magna ut finibus rutrum, libero dolor euismod odio, nec interdum quam felis non ante.'
  },
  {
    id: 'quality-meeting',
    label: 'Quality Meeting',
    title: 'Quality Meeting',
    image: chooseImage03,
    content: 'You are NOT allowed to redistribute this template ZIP file on any template collection website. However, you can use this template to convert into a specific theme for any kind of CMS platform such as WordPress. For more information, you shall contact TemplateMo now.'
  }
];

const WhyUs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section 
      id="section2" 
      className="relative py-24 bg-primary bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-primary/90 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border-2 border-white/10 px-6 py-4"
          >
            <h2 className="text-white text-xl font-bold uppercase tracking-wider">
              Why choose Sara Aviation?
            </h2>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-10 border-b border-white/10 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-8 text-sm font-black uppercase tracking-widest transition-colors duration-300 w-full md:w-auto ${
                  activeTab.id === tab.id ? 'text-accent' : 'text-white'
                }`}
              >
                {tab.label}
                {activeTab.id === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 md:w-16 h-1 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={activeTab.image} 
                    alt={activeTab.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-left space-y-6">
                  <h4 className="text-3xl font-black text-white italic uppercase tracking-tight">
                    {activeTab.title}
                  </h4>
                  <p className="text-white/80 text-base leading-relaxed font-medium">
                    {activeTab.content}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
