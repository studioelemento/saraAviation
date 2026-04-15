import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="section6" className="py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block border-2 border-white/10 px-8 py-4"
          >
            <h2 className="text-white text-xl font-bold uppercase tracking-widest">
              Let’s Keep In Touch
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 md:p-12 border border-white/10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
              <textarea 
                placeholder="Your message..." 
                rows="6"
                className="w-full bg-white/10 border-0 focus:ring-2 focus:ring-accent text-white placeholder-white/60 p-4 text-sm font-medium transition-all resize-none"
              />
              <button 
                type="submit" 
                className="w-full bg-accent text-white py-4 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-accent transition-all duration-300 shadow-lg shadow-accent/20"
              >
                Send Message Now
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-[400px] lg:h-full min-h-[400px] rounded-sm overflow-hidden border border-white/10 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Bengaluru,+Karnataka,+India&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              allowFullScreen
              title="Sara Aviation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
