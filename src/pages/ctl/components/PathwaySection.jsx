import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const pathways = [
  {
    tag: "End-to-End",
    title: "Integrated Pilot Mentorship",
    desc: "A comprehensive end-to-end commercial pilot training program encompassing DGCA ground subjects, flying training, and full visa and documentation support.",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "International",
    title: "Flying Training Abroad",
    desc: "Structured pathways to USA, New Zealand, Spain and Greece. FAA/EASA/CAA aligned training programs ensuring global standards and efficient timeline management.",
    img: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "DGCA Compliant",
    title: "Licence Conversion",
    desc: "Specialized support for international licence holders to convert their foreign licences to Indian DGCA requirements smoothly and compliantly.",
    img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
  },
];

const PathwaysSection = () => {
  return (
    <section className="bg-[#f8fafc] py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-black uppercase tracking-widest mb-3 block"
          >
            Choose Your Path
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tight mb-4"
          >
            Structured Pathways <br className="hidden md:block" />
            for Every Aspirant
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed"
          >
            Choose the program that aligns with your current stage in the aviation
            journey. Designed for clarity, efficiency, and compliance.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pathways.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl hover:border-accent/20 transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest bg-accent text-white px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-black uppercase text-primary mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PathwaysSection;