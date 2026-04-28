import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "18–20", label: "Months to DGCA CPL" },
  { value: "6–8", label: "Months Saved vs Unguided" },
  { value: "Curated", label: "Designed by Airline Pilots" },
  { value: "60–65L", label: "All-Inclusive CPL Cost" },
];

const CTLHero = () => {
  return (
    <section className="relative pt-10 w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/1200x/04/8f/9a/048f9afca33461c376c8d8981ffb024f.jpg"
        alt="Pilot Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6 pt-40 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-black uppercase tracking-widest"
        >
          ✈ Become a Pilot
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 uppercase tracking-tight"
        >
          Integrated Pilot{" "}
          <span className="text-accent">Mentorship</span>{" "}
          Program
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A structured, end-to-end CPL programme — DGCA ground school in
          Bangalore, flying training abroad, and licence conversion on return —
          guided by licensed pilots who have done it themselves.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300 rounded-sm shadow-xl shadow-accent/30"
          >
            Apply Now
          </button>
          <button
            onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white/30 text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-300 rounded-sm"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 w-full bg-primary/80 backdrop-blur-md border-t border-white/10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`py-8 px-6 text-center border-r border-white/10 last:border-r-0 ${
                idx % 2 === 0 ? "border-b md:border-b-0" : "border-b md:border-b-0"
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-black text-accent mb-1">{stat.value}</h2>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CTLHero;