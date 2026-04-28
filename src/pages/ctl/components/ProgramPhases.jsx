import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const phases = [
  {
    phase: "01",
    color: "bg-blue-500",
    accent: "text-blue-400",
    title: "Foundation in Bangalore",
    duration: "Months 1 – 4",
    location: "Bangalore, India",
    points: [
      "DGCA Ground School Classes",
      "Class 1 & 2 Medical Exams",
      "eGCA Registration + Computer Number",
      "Student Visa Processing",
      "Flying School Selection + Enrollment",
    ],
  },
  {
    phase: "02",
    color: "bg-green-500",
    accent: "text-green-400",
    title: "Flight Training Abroad",
    duration: "Months 5 – 12",
    points: [
      "Private Pilot License (PPL)",
      "Instrument Rating (IR)",
      "Commercial Pilot License (CPL)",
      "Multi-Engine Endorsement",
      "Dual Logbook Management (FAA + DGCA)",
    ],
  },
  {
    phase: "03",
    color: "bg-accent",
    accent: "text-accent",
    title: "Return & Convert",
    duration: "Months 13 – 15",
    points: [
      "DGCA Licence Conversion",
      "Conversion Flying (10–25 hrs at DGCA FTO)",
      "Skill Tests + CPL Application on eGCA",
      "Airline Preparation Seminars",
    ],
  },
  {
    phase: "04",
    color: "bg-purple-500",
    accent: "text-purple-400",
    title: "Type Rating & Advanced Training",
    duration: "Months 16 – 18",
     points: [
      "Airbus / Boeing Type Rating",
      "Simulator Training",
      "Advanced SOP Training",
      "Airline Interview Preparation",
    ],
  },
  {
    phase: "05",
    color: "bg-rose-500",
    accent: "text-rose-400",
    title: "Airline Placement",
    duration: "Post Training",
    points: [
      "Airline Applications",
      "HR + Technical Interviews",
      "Cadet Program Entry",
      "First Officer Placement",
    ],
  },
];

const ProgramPhases = () => {
  return (
    <section className="bg-primary py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-black uppercase tracking-widest mb-3 block"
          >
            The Programme
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4"
          >
            Five Phases.{" "}
            <span className="text-accent">Every Step</span> Covered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed"
          >
            From DGCA ground school in Bangalore to flight training in the USA,
            Spain & Greece — returning airline-ready with expert mentorship
            every step of the way.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-white/10" />

          <div className="space-y-8">
            {phases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Phase Badge */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-black shadow-lg ${item.color}`}>
                    <span className="text-[8px] uppercase tracking-widest opacity-80 leading-none">Phase</span>
                    <span className="text-lg leading-none">{item.phase}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white/5 border border-white/10 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 group">
                  <div className="flex flex-wrap gap-3 items-center mb-3">
                    <span className={`text-xs font-black uppercase tracking-widest ${item.accent}`}>
                      {item.duration}
                    </span>
                    
                  </div>

                  <h3 className="text-base md:text-lg font-black uppercase text-white mb-4 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white/50 font-semibold">
                        <CheckCircle size={13} className={`${item.accent} shrink-0`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProgramPhases;