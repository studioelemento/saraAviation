import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Users size={24} />,
    title: "Cabin Crew",
    description: "Master the art of in-flight hospitality and safety with our world-class cabin crew certification courses.",
    link: "/courses",
    color: "bg-accent"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Ground Staff",
    description: "Expert training in airport management, ground handling, and technical support services.",
    link: "/courses"
  },
  {
    icon: <Plane size={24} />,
    title: "Pilot Training",
    description: "Launch your career in the skies with our comprehensive Commercial Pilot License (CPL) training programs.",
    link: "/courses"
  }
];

const Features = () => {
  return (
    <section className="bg-[#082B4D] -mt-px relative z-30">
      <div className="container mx-auto px-0 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative group overflow-hidden"
            >
              <div className="bg-[#0c1228] p-10 md:p-12 h-full border-l border-white/5 transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </span>
                    <h4 className="text-white text-lg font-bold uppercase tracking-wider">
                      {feature.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white/70 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <a 
                      href={feature.link}
                      className="inline-block text-white text-sm font-bold uppercase tracking-wide border-b-2 border-white pb-1 hover:pb-2 transition-all"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
