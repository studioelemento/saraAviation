import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, ArrowLeft, ArrowUpRight } from 'lucide-react';
import EnrollmentModal from '../components/EnrollmentModal';

import course01 from '../assets/CourseImage/Diploma.png';
import coursePGDiploma from '../assets/CourseImage/course2.jpg';
import courseFoundation from '../assets/CourseImage/Foundation in Travel & Tourism with Amadeus.png';
import coursePassenger from '../assets/CourseImage/Passenger Ground Services Course.png';
import courseCargo from '../assets/CourseImage/Cargo Introductory Course.png';
import courseAirport from '../assets/CourseImage/aiportOperation5.jpg';

const coursesData = [
  {
    id: 1,
    title: "Sara Diploma Course in Aviation, Hospitality and Travel Management",
    image: course01,
    duration: "12 Months, 5 days/week (Mon- Fri) 2 hours",
    eligibility: ["12th Pass or Pursuing & Graduates", "Age: 18 - 25 Years", "Skill India Certification"],
    accreditation: ["SARA"],
    isGovt: true,
    description: "Our flagship 1-year program is meticulously crafted to transform passionate students into elite aviation, cabin crew, and luxury hospitality professionals. Accredited by AASSC, this course guarantees hands-on experience and professional-grade grooming.",
    whatYouCanLearn: [
      {
        title: "1. English Enhancer",
        desc: "As the name suggests, this course is designed to enhance students' pronunciation, intonation, and fluency in English. It is highly interactive, focusing on developing essential skills such as public speaking and group discussions — crucial for succeeding in interviews."
      },
      {
        title: "2. Grooming",
        desc: "Equips students with essential grooming skills tailored for the aviation & hospitality industries. Key topics include skin and hair care, mastering both western and traditional attire, dental hygiene, and professional makeup techniques."
      },
      {
        title: "3. Personality Development",
        desc: "This interactive course is designed to develop key personality traits essential for success in a professional environment. It covers areas such as fostering a positive attitude, managing anger, enhancing empathy, boosting motivation, and stress management."
      },
      {
        title: "4. Aviation",
        desc: "This comprehensive course is meticulously designed to prepare students for a dynamic career as cabin crew members. The program delves into every facet of aviation hospitality, encompassing in-depth training on flight safety protocols, emergency procedures, and passenger management."
      },
      {
        title: "5. Hospitality Management",
        desc: "This module equips students with the essential skills needed in the hospitality industry. Topics covered include managing guest arrivals, check-ins and check-outs, and handling various payment methods."
      },
      {
        title: "6. Customer Relationship Management",
        desc: "This essential course focuses on developing customer handling skills. Students are introduced to various customer types and their specific needs, while learning the key elements that make customer service exceptional."
      },
      {
        title: "7. Interviewing Skills",
        desc: "As the name suggests, this course prepares students for various types of interviews. It covers impromptu speaking, mock interviews, group discussions, and the importance of positive body language."
      },
      {
        title: "8. Swimming",
        desc: "Swimming is a vital skill, particularly for those aspiring to join an international airline. All international airlines, as well as some domestic ones, require their crew members to be proficient swimmers."
      },
      {
        title: "9. Placement assistance",
        desc: "Our course offers comprehensive placement assistance to help students secure rewarding career opportunities. With guidance from industry experts and access to a vast network of employers, students are supported throughout their job search."
      }
    ]
  },
  {
    id: 2,
    title: "PG Diploma Course in Aviation, Hospitality and Travel Management",
    image: coursePGDiploma,
    duration: "6 Months, 5 days/week (Mon-Fri) 2 hours",
    eligibility: ["Graduates / Final Year Graduate", "Age: 19 - 27 Years", "Executive AASSC accreditation"],
    accreditation: ["SARA"],
    isGovt: true,
    description: "An advanced, fast-track postgraduate program designed for graduates seeking leadership roles in airlines and airport management. Focuses on advanced operations, airport terminal logistics, and hospitality service standards.",
    whatYouCanLearn: [
      {
        title: "1. Advanced Airport Terminal Operations",
        desc: "An in-depth study of landside safety regulations, cargo logistics hubs, and airside coordinate parameters at top-tier global airport hubs."
      },
      {
        title: "2. Airline Route Management",
        desc: "Examines complex schedule coordination models, flight path layouts, crew dispatch laws, and international flight mechanics."
      },
      {
        title: "3. Executive Presence & Grooming",
        desc: "Specialized focus on corporate leadership grooming, international etiquette, elite body posture, and global business aesthetics."
      },
      {
        title: "4. Hospitality Brand CRM Operations",
        desc: "Understand service delivery parameters for 5-star international hotel networks and premium airline executive lounges."
      },
      {
        title: "5. Global Distribution Systems (Amadeus)",
        desc: "Deep hands-on expertise with Amadeus PNR management, air fare calculation methods, tax applications, and flight ticketing."
      },
      {
        title: "6. Crisis Logistics & Delay Management",
        desc: "Crucial strategies to mitigate terminal overbooking, emergency landing arrangements, weather delays, and customer dispute resolution."
      },
      {
        title: "7. Mock Interview Bootcamp & Placement",
        desc: "Direct interview runs with HR experts from global airlines, advanced resume customization, and placement bootcamp drills."
      }
    ]
  },
  {
    id: 3,
    title: "Foundation in Travel & Tourism with Amadeus",
    image: courseFoundation,
    duration: "8 Months, 5 days/week (Mon-Fri) 2 hours",
    eligibility: ["12th Pass & Graduate", "Age: 18 - 27 Years", "Amadeus Reservation Systems"],
    accreditation: ["SARA"],
    isGovt: false,
    description: "Master the global travel industry with a specialized focus on travel agency management, flight ticketing, and the industry-standard Amadeus reservation software.",
    whatYouCanLearn: [
      {
        title: "1. Amadeus GDS Air Booking System",
        desc: "Interactive hands-on training for real-time seat availability searches, flight schedules lookup, and PNR entry creations."
      },
      {
        title: "2. World Geography & Route Mapping",
        desc: "Detailed studies of IATA traffic conference zones, GMT calculation methods, coordinate maps, and global flight routes."
      },
      {
        title: "3. Air Fares & Automated E-Ticketing",
        desc: "Calculate complex travel routing costs, mileage principles, child/infant discounts, and issue digital passenger tickets."
      },
      {
        title: "4. Tourism Industry Regulations",
        desc: "Understand regulatory standards (IATA codes), visa filing procedures, immigration requirements, and passport systems."
      },
      {
        title: "5. Holiday Tour Package Structuring",
        desc: "Designing domestic and worldwide holiday itineraries, hotel and transit costing, and customized travel packages."
      },
      {
        title: "6. Customer Travel Consulting",
        desc: "Handling detailed corporate and leisure customer travel requests, client feedback, and building agency customer retention."
      }
    ]
  },
  {
    id: 4,
    title: "Airport Operations Fundamentals",
    image: courseAirport,
    duration: "6 Months, 5 days/week (Mon-Fri) 2 hours",
    eligibility: ["Graduate preferred", "Age: 18 - 27 Years", "Airport Security & AVSEC Compliance"],
    accreditation: ["SARA"],
    isGovt: false,
    description: "Get comprehensive knowledge of how modern international airports function day-to-day. Learn about airside safety, terminal management, security compliance, and flight logistics coordination.",
    whatYouCanLearn: [
      {
        title: "1. Terminal Customer Service Operations",
        desc: "Understand flow dynamics at flight check-in desks, security counters, boarding gates, and transit passenger desks."
      },
      {
        title: "2. Aviation Security (AVSEC) Guidelines",
        desc: "Study international terminal security structures, passenger scanning protocols, dangerous substances, and aircraft safety."
      },
      {
        title: "3. Baggage Logistics & Baggage Handling Systems (BHS)",
        desc: "Master automated baggage transit sorting, international baggage tags (LIR), lost bag search (WorldTracer), and baggage claim rules."
      },
      {
        title: "4. Ramp Safety & Marshalling Fundamentals",
        desc: "Airside ground handling rules, airplane marshalling signals, pushback coordinate guidelines, and support equipment safety."
      },
      {
        title: "5. Ground Services Emergency Response",
        desc: "Detailed strategies to manage runway emergencies, terminal fire response plans, bomb threat drills, and natural calamity logistics."
      },
      {
        title: "6. High-Precision Phonetic Communications",
        desc: "Mastering professional aviation terminology, standard ground-to-cockpit radio signals, and flight delay updates."
      }
    ]
  },
  {
    id: 5,
    title: "Cargo Introductory Course",
    image: courseCargo,
    duration: "6 Months, 5 days/week (Mon-Fri) 2 hours",
    eligibility: ["12th Pass or Above", "Age: 18 - 27 Years", "IATA Cargo & Dangerous Goods compliance"],
    accreditation: ["SARA"],
    isGovt: false,
    description: "A highly specialized program teaching the essentials of international air cargo operations, supply chain logistics, dangerous goods handling, and freight management.",
    whatYouCanLearn: [
      {
        title: "1. Air Cargo Principles & Operations",
        desc: "Detailed structure of the global air cargo supply chain, cargo terminal roles, and air freighter loading operations."
      },
      {
        title: "2. Airway Bill (AWB) Management",
        desc: "Master standard Airway Bill creations, weight/volume calculations, chargeable weight parameters, and billing codes."
      },
      {
        title: "3. Dangerous Goods Regulations (DGR) Intro",
        desc: "Comprehensive guidelines on hazardous items classification, proper packing parameters, DGR labels, and safety declarations."
      },
      {
        title: "4. Aircraft Hold Planning & Unit Load Devices (ULD)",
        desc: "Understand cargo container types (ULDs), aircraft loading bounds, weight/balance factors, and tie-down strap safety rules."
      },
      {
        title: "5. Freight Forwarding Logistics",
        desc: "Coordinate operations between worldwide exporters, custom clearing officers, airport terminals, and final delivery logistics."
      },
      {
        title: "6. Cargo Security & Cold-Chain Management",
        desc: "Learn storage protocols for temperature-sensitive medicine/food cargo, high-security vault cargos, and cargo screening."
      }
    ]
  },
  {
    id: 6,
    title: "Passenger Ground Services Course",
    image: coursePassenger,
    duration: "6 Months, 5 days/week (Mon-Fri) 2 hours",
    eligibility: ["12th Pass or Above", "Age: 18 - 27 Years", "Airline Ground Handling Systems"],
    accreditation: ["SARA"],
    isGovt: false,
    description: "Become the face of global airlines by mastering passenger ground services, check-in logistics, boarding procedures, and executive lounge hospitality.",
    whatYouCanLearn: [
      {
        title: "1. Airlines Check-in Desk Procedures",
        desc: "Greeting passengers, verifying travel visas, weighing checked bags, and issuing seat reservations and boarding passes."
      },
      {
        title: "2. Boarding Gate Logistics & Coordination",
        desc: "Announcing boarding groups, coordinate with flight purser, scanning boarding passes, and managing standby passengers."
      },
      {
        title: "3. Premium Passenger Hospitality",
        desc: "Receive VIP guests, lounge entry verifications, executive food and beverage services, and high-value customer care."
      },
      {
        title: "4. Airport Departure Control Systems (DCS)",
        desc: "Learn airline check-in software layouts, seat re-assignments, flight passenger manifest outputs, and cargo calculations."
      },
      {
        title: "5. Special Assistance Guest Handling",
        desc: "Handling details for passengers with limited mobility (wheelchair operations), unaccompanied minors (UM), and VIP passengers."
      },
      {
        title: "6. Professional Announcement Diction",
        desc: "Master public speaking, clear phonetic announcements during boarding, flight delays, gates changes, and security calls."
      }
    ]
  }
];

const AASSCLogoCard = ({ size = "md" }) => {
  const isSm = size === "sm";
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`bg-white border border-gray-100 shadow-md flex flex-col items-center justify-center p-2 select-none hover:shadow-lg transition-all duration-300 ${isSm ? "w-20 h-14 rounded-xl" : "w-28 h-20 rounded-2xl"
      }`}>
      {!imgError ? (
        <img
          src="/assets/certificatesLogo/aasscLogo.png"
          alt="AASSC Logo"
          loading="lazy"
          onError={() => setImgError(true)}
          className={`${isSm ? "h-10" : "h-14"} w-auto object-contain`}
        />
      ) : (
        <>
          <div className={`${isSm ? "w-6 h-6 text-xs" : "w-8 h-8 text-base"} rounded-full bg-[#002b5b] text-white flex items-center justify-center font-bold shadow-inner`}>
            🏛️
          </div>
          <span className={`font-black text-[#0d2149] uppercase tracking-wider ${isSm ? "text-[6px] mt-0.5" : "text-[8px] mt-1.5"}`}>
            AASSC
          </span>
        </>
      )}
    </div>
  );
};

const IATALogoCard = ({ size = "md" }) => {
  const isSm = size === "sm";
  return (
    <div className={`bg-white border border-gray-100 shadow-md flex flex-col items-center justify-center p-2 select-none hover:shadow-lg transition-all duration-300 ${isSm ? "w-20 h-14 rounded-xl" : "w-28 h-20 rounded-2xl"
      }`}>
      <svg className={`${isSm ? "w-14 h-10" : "w-20 h-14"} text-[#002b5b]`} viewBox="0 0 120 60" fill="currentColor">
        <circle cx="60" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="60" cy="20" rx="5" ry="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="1" />
        <path d="M44 20 L20 14 L42 22 Z" fill="currentColor" />
        <path d="M46 22 L24 25 L45 26 Z" fill="currentColor" />
        <path d="M47 24 L29 30 L45 29 Z" fill="currentColor" />
        <path d="M76 20 L100 14 L78 22 Z" fill="currentColor" />
        <path d="M74 22 L96 25 L75 26 Z" fill="currentColor" />
        <path d="M73 24 L91 30 L75 29 Z" fill="currentColor" />
        <text x="60" y="48" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="1" fill="currentColor">IATA</text>
      </svg>
    </div>
  );
};

const SARALogoCard = ({ size = "md" }) => {
  const isSm = size === "sm";
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`bg-white border border-gray-100 shadow-md flex flex-col items-center justify-center p-2 select-none hover:shadow-lg transition-all duration-300 ${isSm ? "w-20 h-14 rounded-xl" : "w-28 h-20 rounded-2xl"
      }`}>
      {!imgError ? (
        <img
          src="/assets/logo/Sara Aviation Logo Blue Orange.png"
          alt="SARA Logo"
          loading="lazy"
          onError={() => setImgError(true)}
          className={`${isSm ? "h-6" : "h-10"} w-auto object-contain`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <svg className={`${isSm ? "w-8 h-6" : "w-12 h-9"} text-primary`} viewBox="0 0 100 80" fill="currentColor">
            <path d="M10 70 L50 15 L90 70 L50 55 Z" fill="#002b5b" />
            <path d="M50 15 L90 70 L50 55 Z" fill="#f5a425" opacity="0.9" />
          </svg>
          <span className={`font-black text-[#0d2149] tracking-widest ${isSm ? "text-[6px]" : "text-[8px] mt-0.5"}`}>SARA</span>
        </div>
      )}
    </div>
  );
};

const CourseAccreditationLogos = ({ accreditations, size = "md" }) => {
  if (!accreditations || !Array.isArray(accreditations)) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {accreditations.some(acc => acc.toUpperCase() === "AASSC") && <AASSCLogoCard size={size} />}
      {accreditations.some(acc => acc.toUpperCase() === "IATA") && <IATALogoCard size={size} />}
      {accreditations.some(acc => acc.toUpperCase() === "SARA") && <SARALogoCard size={size} />}
    </div>
  );
};

const CoursesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const courseIdParam = searchParams.get('id');
  const selectedId = courseIdParam ? parseInt(courseIdParam) : null;

  // Automatically scroll to the top of the page when selected course changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedId]);

  // Filter courses based on query parameter
  const filteredCourses = selectedId
    ? coursesData.filter(c => c.id === selectedId)
    : coursesData;

  const currentCourse = selectedId && filteredCourses.length > 0 ? filteredCourses[0] : null;

  const handleEnroll = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setModalOpen(true);
  };

  const handleEnquire = () => {
    setSelectedCourse("");
    setModalOpen(true);
  };

  const handleClearFilter = () => {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="  bg-[#ffffffff] min-h-screen font-outfit">
      {/* Hero Section (Visible only when looking at all courses) */}
      {!selectedId && (
        <section className="bg-primary pt-48 pb-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-4xl md:text-6xl font-black  tracking-tight mb-6"
            >
              Don't Just Dream. <span className="text-accent italic">Fly High</span>
            </motion.h1>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-sm font-medium leading-relaxed">
              From ground handling to cabin crew, we provide the expert training you need to excel in the global travel industry.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnquire}
              className="bg-accent text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300 rounded-sm shadow-xl cursor-pointer"
            >
              Enquire Now
            </motion.button>
          </div>
        </section>
      )}

      {/* Main Content Container */}
      <div className={`container mx-auto px-6 pb-20 ${selectedId ? 'pt-28 md:pt-36' : 'pt-8'}`}>
        <div className="flex flex-col lg:flex-row gap-12 items-start text-left pt-8">

          {/* Main Left Column (2/3 Width) */}
          <div className="lg:w-2/3 w-full space-y-12">
            {selectedId && currentCourse ? (
              /* VIEW 1: DYNAMIC COURSE DETAILS VIEW */
              <div className="space-y-10">
                {/* Breadcrumbs */}
                <button
                  onClick={handleClearFilter}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-accent font-bold text-sm tracking-wide transition-colors cursor-pointer text-left"
                >
                  {"<  "}  {" "}Back to Programs & Courses
                </button>

                {/* Title Section */}
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-[#0d2149] leading-tight mb-4">
                    {currentCourse.title}
                  </h1>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Duration: <span className="text-gray-800">{currentCourse.duration}</span>
                  </p>
                </div>

                {/* Eligibility Box */}
                <div className="bg-[#002b5b] p-8 rounded-3xl text-white shadow-lg">
                  <h3 className="text-lg font-black tracking-widest mb-6">
                    Eligibility Criteria
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentCourse.eligibility.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 px-5 py-4 rounded-xl flex items-center justify-center text-center font-bold text-xs leading-normal border border-white/5 shadow-inner"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* What You Can Learn Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-[#0d2149] border-l-4 border-accent pl-4">
                    What you can learn
                  </h2>

                  <div className="space-y-6 divide-y divide-gray-100">
                    {currentCourse.whatYouCanLearn ? (
                      currentCourse.whatYouCanLearn.map((item, idx) => (
                        <div key={idx} className={`${idx > 0 ? 'pt-6' : ''} space-y-2`}>
                          <h4 className="text-[16px] font-black text-[#0d2149]">
                            {item.title}
                          </h4>
                          <p className="text-[15px] font-semibold text-gray-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">Detailed curriculum coming soon.</p>
                    )}
                  </div>
                </div>

                {/* Pink Warning Disclaimer Pill */}
                <div className="bg-red-50 text-red-500 px-6 py-4 rounded-full text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-red-100/50 shadow-sm">
                  Candidates will be selected based on merit and interview evaluation.
                </div>

                {/* Sara Strengths Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-[#0d2149]">
                    Sara Strengths
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { val: "4000+", label: "Placements" },
                      { val: "500+", label: "Hiring Partners Onboard" },
                      { val: "1 Lac+", label: "Highest Monthly CTC" }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center justify-center">
                        <span className="text-lg font-black text-accent mb-1">{stat.val}</span>
                        <span className="text-[9px] font-black uppercase text-primary/60 tracking-wider leading-tight">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Govt Recognized Certification Section */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-sm font-black text-[#0d2149] tracking-wide">
                    {currentCourse.isGovt ? "Govt Recognized Certificate (AASSC)" : "Accredited Partners"}
                  </h3>
                  <CourseAccreditationLogos accreditations={currentCourse.accreditation} size="md" />
                </div>

                {/* Action Buttons Row */}
                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleEnroll(currentCourse.title)}
                    className="bg-[#f5a425] hover:bg-primary text-white px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer text-center"
                  >
                    Enroll Now!
                  </button>
                  <button
                    onClick={handleClearFilter}
                    className="bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary/20 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer text-center"
                  >
                    View all courses
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW 2: GENERAL GRID VIEW (WHEN NO SPECIFIC COURSE IS SELECTED) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {coursesData.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-500 text-left"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={course.image} alt={course.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div
                        onClick={() => setSearchParams({ id: course.id })}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 cursor-pointer"
                      >
                        <span className="text-white text-[10px] font-black uppercase tracking-widest bg-accent px-3 py-1">View Details</span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <div className="min-h-[4rem]">
                        <h3
                          onClick={() => setSearchParams({ id: course.id })}
                          className="text-lg font-black uppercase text-primary leading-tight mb-2 hover:text-accent transition-colors cursor-pointer"
                        >
                          {course.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-6 text-gray-400">
                        <Star className="text-accent" size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Aviation Excellence</span>
                      </div>

                      <div className="flex-1 flex flex-col space-y-6">
                        <div>
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-primary/40 mb-2">Duration</h4>
                          <p className="text-sm font-bold text-gray-600 min-h-[2rem]">{course.duration}</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-[#121b2f] mb-4">Eligibility Criteria</h4>
                          <ul className="space-y-2">
                            {course.eligibility.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                                <CheckCircle size={14} className="text-accent shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-primary/40 mb-3">
                            {course.isGovt ? 'Govt Recognized Certificate (AASSC)' : 'Recognized Certificate'}
                          </h4>
                          <div className="mb-6">
                            <CourseAccreditationLogos accreditations={course.accreditation} size="sm" />
                          </div>

                          <div className="flex flex-col xl:flex-row gap-4">
                            <button
                              onClick={() => handleEnroll(course.title)}
                              className="flex-grow bg-accent text-white py-4 px-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-accent/20 cursor-pointer text-center whitespace-nowrap"
                            >
                              Enroll Now!
                            </button>
                            <button
                              onClick={() => setSearchParams({ id: course.id })}
                              className="flex-grow bg-primary/5 hover:bg-primary/10 text-primary py-4 px-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all cursor-pointer text-center whitespace-nowrap"
                            >
                              Explore Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Shared Sidebar Column (1/3 Width) - Always visible in both views */}
          <div className="lg:w-1/3 w-full space-y-12 lg:sticky lg:top-7 h-fit text-left">
            {/* Recommendation Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-white text-2xl font-black leading-tight ">Can I Suggest A Course For You?</h3>
                <p className="text-white/60 text-sm leading-relaxed">Answer a few quick questions and we'll recommend the perfect course based on your interests.</p>
                <button
                  onClick={handleEnquire}
                  className="bg-accent text-white px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-accent transition-all shadow-xl shadow-black/20 cursor-pointer w-full text-center"
                >
                  Get Course Recommendation
                </button>
              </div>
            </motion.div>

            {/* Recent Placements */}
            <div className="space-y-6">
              <h3 className="text-xl font-black  text-primary tracking-tight px-2 border-l-4 border-accent">Recent Placements</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { name: "Neha Kapoor", role: "Air India", img: "/assets/Sarah Aviation Placements/Neha Kapoor.png" },
                  { name: "Aarav Mehtha", role: "Indigo", img: "/assets/Sarah Aviation Placements/Aarav Mehtha.png" },
                  { name: "Aditi", role: "Vistara", img: "/assets/Sarah Aviation Placements/Aditi.png" },
                  { name: "Ananya", role: "Air India Express", img: "/assets/Sarah Aviation Placements/Ananya.png" },
                ].map((person, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md border border-gray-100 group hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={person.img}
                        alt={person.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black uppercase text-primary truncate group-hover:text-accent transition-colors">{person.name}</h4>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-widest font-bold">✈ {person.role}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <EnrollmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedCourse={selectedCourse}
        courses={coursesData}
      />
    </div>
  );
};

export default CoursesPage;
