import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ChevronsRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import bgImage from '../assets/images/choosing-bg.jpg';
import course01 from '../assets/images/courses-01.jpg';
import course02 from '../assets/images/courses-02.jpg';
import course03 from '../assets/images/courses-03.jpg';
import course04 from '../assets/images/courses-04.jpg';
import course05 from '../assets/images/courses-05.jpg';
import author01 from '../assets/images/author-01.png';
import author02 from '../assets/images/author-02.png';
import author03 from '../assets/images/author-03.png';
import author04 from '../assets/images/author-04.png';
import author05 from '../assets/images/author-05.png';

const courses = [
  { id: 1, title: 'Commercial Pilot License', image: course01, author: author01, price: 'CPL', description: 'Comprehensive flight training including ground school and actual flight hours for aspiring commercial pilots.' },
  { id: 2, title: 'Airline Management', image: course02, author: author02, price: 'BBA', description: 'Specialized business administration degree focused on the complex operations of global airline networks.' },
  { id: 3, title: 'Cabin Crew Professional', image: course03, author: author03, price: 'Cert.', description: 'Intensive diploma in in-flight safety, emergency procedures, and premium hospitality services.' },
  { id: 4, title: 'Airport Operations', image: course04, author: author04, price: 'Diploma', description: 'Technical training for ground handling, security, and airport management infrastructure.' },
  { id: 5, title: 'Flight Dispatcher', image: course05, author: author05, price: 'Advanced', description: 'Advanced certification in flight planning, meteorology, and operational control center management.' },
];

const TripleArrow = () => (
    <span className="inline-flex ml-1">
        <span className="opacity-40">›</span>
        <span className="opacity-70">›</span>
        <span>›</span>
    </span>
);

const Courses = () => {
  return (
    <section 
      id="section4" 
      className="relative py-24 bg-primary bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border-2 border-white/10 px-8 py-4"
          >
            <h2 className="text-white text-xl font-bold uppercase tracking-widest">
              Choose Your Specialization
            </h2>
          </motion.div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-2xl h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-8 flex-1 flex flex-col gap-4 relative">
                  <div className="absolute -top-10 right-8 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-xl">
                    <img src={course.author} alt="Author" className="w-full h-full object-cover bg-white" />
                  </div>
                  
                  <h4 className="text-lg font-black uppercase text-secondary tracking-tight mt-2">
                    {course.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto border-t border-gray-100 pt-6 flex justify-between items-center">
                    <span className="text-accent font-bold uppercase text-xs">
                      {course.price}
                    </span>
                    <a href="/courses" className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#121b2f] group">
                      Full Details <TripleArrow />
                    </a>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #f5a425 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Courses;
