import React from "react";
import { motion } from "framer-motion";
import { Globe, Shield, Star } from "lucide-react";

const highlights = [
  {
    icon: <Shield size={20} />,
    title: "DGCA Ground School",
    desc: "Intensive theory classes in Bangalore before you ever step into a cockpit.",
  },
  {
    icon: <Globe size={20} />,
    title: "Global Flight Training",
    desc: "Partner facilities in USA, Spain, Greece & New Zealand for world-class flying.",
  },
  {
    icon: <Star size={20} />,
    title: "Expert Mentorship",
    desc: "Guided by accomplished Airline Pilots & IAF veterans throughout your journey.",
  },
];

const FoundationSection = () => {
  return (
    <section className="w-full bg-primary py-24 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent text-xs font-black uppercase tracking-widest mb-4 block">
            Why Sara Aviation CTL
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 uppercase">
            Build the{" "}
            <span className="text-accent">Foundation</span>{" "}
            Every Airline Pilot Needs
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-6">
            At Sara Aviation Academy, we bridge the gap between basic flight
            training and true airline readiness. Our commercial pilot
            training curriculum begins with a rigorous{" "}
            <span className="text-accent font-bold">DGCA ground school</span>{" "}
            in Bangalore, ensuring a profound understanding of aviation theory
            before you ever step into a cockpit.
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            Transition seamlessly to our partner facilities in the{" "}
            <span className="text-accent font-bold">
              USA, Spain, Greece & New Zealand
            </span>{" "}
            for world-class flight training. Under the direct mentorship of
            accomplished Airline Pilots & IAF veterans, you will develop the
            precision, critical decision-making skills, and advanced airmanship
            required to excel in the modern flight deck.
          </p>
        </motion.div>

        {/* Right: Highlight Cards */}
        <div className="space-y-5">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-sm tracking-wide mb-1">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FoundationSection;