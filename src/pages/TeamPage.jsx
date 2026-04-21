import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const placeholderImg = "https://i.pinimg.com/736x/85/8d/89/858d89f456e8e303619bbc3811f311eb.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Capt. Rajesh Khanna",
    role: "Managing Director",
    experience: "25+ Years",
    image: placeholderImg,
    bio: "A veteran pilot with over 15,000 flying hours, leading the vision of Sara Aviation Academy."
  },
  {
    id: 2,
    name: "Sunita Deshmukh",
    role: "Founder & Director",
    experience: "20+ Years",
    image: placeholderImg,
    bio: "Instrumental in establishing international partnerships and academy growth strategies."
  },
  {
    id: 3,
    name: "Capt. Vikram Singh",
    role: "Chief Flight Instructor",
    experience: "18+ Years",
    image: placeholderImg,
    bio: "Specializes in advanced cockpit simulation and multi-engine rating training."
  },
  {
    id: 4,
    name: "Capt. Arjun Mehta",
    role: "Senior Flight Instructor",
    experience: "12+ Years",
    image: placeholderImg,
    bio: "Focuses on delivering high-precision pilot training for commercial license aspirants."
  },
  {
    id: 5,
    name: "Dr. Anita Nair",
    role: "Chief Ground Instructor",
    experience: "15+ Years",
    image: placeholderImg,
    bio: "Expert in Aviation Meteorology and Air Navigation theories."
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Lead Cabin Crew Trainer",
    experience: "10+ Years",
    image: placeholderImg,
    bio: "Former international crew member, now shaping the next generation of hospitality stars."
  },
  {
    id: 7,
    name: "Capt. Sameer Qureshi",
    role: "Check Pilot",
    experience: "14+ Years",
    image: placeholderImg,
    bio: "Ensures the highest standards of safety and proficiency for all student pilots."
  },
  {
    id: 8,
    name: "Rohan Varma",
    role: "Head of Operations",
    experience: "12+ Years",
    image: placeholderImg,
    bio: "Oversees the day-to-day coordination between training wings and administration."
  },
  {
    id: 9,
    name: "Elena Rodriguez",
    role: "International Relations",
    experience: "8+ Years",
    image: placeholderImg,
    bio: "Managing cadet programs in USA, Spain, and Greece for our global students."
  },
  {
    id: 10,
    name: "Manoj Kumar",
    role: "Technical Ground Instructor",
    experience: "11+ Years",
    image: placeholderImg,
    bio: "Deep expertise in Aircraft General Knowledge and technical performance systems."
  },
  {
    id: 11,
    name: "Capt. Neha Gupta",
    role: "Junior Flight Instructor",
    experience: "6+ Years",
    image: placeholderImg,
    bio: "Dedicated to building strong foundational flying skills for new student pilots."
  },
  {
    id: 12,
    name: "Suresh Menon",
    role: "Placement Head",
    experience: "15+ Years",
    image: placeholderImg,
    bio: "Leading the bridge between our graduates and the world's most prestigious airlines."
  }
];

const TeamPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-48 pb-20 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Meet the Experts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Learn from the finest aviation professionals who bring thousands of flying hours and industry expertise to your training.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
                      {member.experience}
                    </span>
                  </div>

                  {/* Hover Social Overlay */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 text-center sm:text-left">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-black text-primary mb-3">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic">
                    "{member.bio}"
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Career CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Interested in joining our faculty?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              "We are always looking for passionate aviation leaders to mentor the next generation of industry professionals."
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/careers"
              className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition shadow-xl shadow-primary/20 text-center"
            >
              View Openings
            </Link>
            <Link 
              to="/contact"
              className="bg-white text-primary border-2 border-primary/10 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition text-center"
            >
              Contact Human Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
