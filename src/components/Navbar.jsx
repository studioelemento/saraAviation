import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plane } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

// Links grouped by the exact 3-column layout in the reference
const navGroups = [
  [
     { name: 'HOME', href: '/' },
    { name: 'ABOUT SARA', href: '/about' },
  
  ],
  [
      { name: 'COURSES', href: '/courses' },
    { name: 'PLACEMENT', href: '/placement' },
    
  ],
  [
     { name: 'NEWS & UPDATES', href: '/news' },
    { name: 'MEDIA GALLERY', href: '/gallery' }
    // { name: 'OUR TEAM', href: '/team' },
  ],
  [
    { name: 'CAREERS', href: '/careers' },
    { name: 'CONTACT', href: '/contact' },
  ]
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8 font-sans bg-navbar/95">
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-start">
        
        {/* Official Logo + Text */}
        <Link to="/" className="flex items-center gap-1 md:gap-6 group ">
          <img 
            src="/assets/logo/Sara Aviation Logo White Orange.png" 
            alt="Logo" 
            className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col border-white/20 pl-1">
            <h1 className="text-xs md:text-2xl font-black text-white leading-[1.1] tracking-normal max-w-[250px] ">
              SARA <span className="text-white/70">INSTITUTE OF</span> AVIATION & HOSPITALITY
            </h1>
            <span className="text-[10px] font-bold text-accent tracking-[2px] uppercase mt-1">BANGALORE</span>
          </div>
        </Link>

        {/* Desktop Grid Menu */}
        <nav className="hidden lg:flex gap-8 xl:gap-12 pt-1">
          {navGroups.map((group, gIndex) => (
            <div key={gIndex} className="flex flex-col gap-3">
              {group.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href}
                  className={cn(
                    "text-[13px] font-bold tracking-wider uppercase transition-all duration-300 hover:text-accent",
                    location.pathname === item.href ? "text-accent" : "text-white/90"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button 
          className="lg:hidden text-white mt-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="absolute top-full left-0 w-full bg-navbar origin-top lg:hidden shadow-3xl border-t border-white/5"
          >
            <div className="container mx-auto px-8 py-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {navGroups.flat().map((item) => (
                <Link 
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-[14px] font-black tracking-widest uppercase",
                    location.pathname === item.href ? "text-accent" : "text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
