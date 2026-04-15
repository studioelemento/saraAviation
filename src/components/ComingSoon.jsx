import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/images/coming-soon-bg.jpg';

const UpcomingBatch = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date 30 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section 
      id="section3" 
      className="relative py-32 bg-primary bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/80" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content: Countdown */}
          <div className="lg:col-span-7 space-y-12">
            <motion.h4 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight"
            >
              Join Our Next <span className="text-accent italic">Commercial Pilot</span> Training Batch
            </motion.h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-6 md:p-8 text-center flex flex-col justify-center border border-white/5"
                >
                  <span className="text-4xl md:text-5xl font-black text-white mb-2">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-accent">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Content: Registration Form */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 border border-white/10 shadow-2xl"
            >
              <div className="mb-8 text-center bg-white/10 py-8 px-4 -mx-12 -mt-12 mb-10">
                <h6 className="text-white text-sm font-bold uppercase tracking-wide leading-relaxed">
                  Register for the <span className="italic text-accent">Entrance Examination</span> and secure your seat in the academy.
                </h6>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/10 border-0 focus:ring-2 focus:ring-accent text-white placeholder-white/60 p-4 text-sm font-medium transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/10 border-0 focus:ring-2 focus:ring-accent text-white placeholder-white/60 p-4 text-sm font-medium transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Your Phone Number" 
                  className="w-full bg-white/10 border-0 focus:ring-2 focus:ring-accent text-white placeholder-white/60 p-4 text-sm font-medium transition-all"
                />
                <button 
                  type="submit" 
                  className="w-full bg-accent text-white py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-accent transition-all duration-300"
                >
                  Inquire Now
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UpcomingBatch;
