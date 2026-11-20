import course01 from '../assets/CourseImage/Diploma.png';
import coursePGDiploma from '../assets/CourseImage/course2.jpg';
import courseFoundation from '../assets/CourseImage/Foundation in Travel & Tourism with Amadeus.png';
import coursePassenger from '../assets/CourseImage/Passenger Ground Services Course.png';
import courseCargo from '../assets/CourseImage/Cargo Introductory Course.png';
import courseAirport from '../assets/CourseImage/aiportOperation5.jpg';

export const coursesData = [
  {
    id: 1,
    title: "Sara Diploma Course in Aviation, Hospitality and Travel Management",
    image: course01,
    duration: "12 Months, 5 days/week (Mon- Fri) 2 hours",
    eligibility: ["12th Pass or Pursuing & Graduates", "Age: 18 - 25 Years"],
    accreditation: ["SARA"],
    // isGovt: true,
    description: "Our flagship 1-year program is meticulously crafted to transform passionate students into elite aviation, cabin crew, and luxury hospitality professionals. this course guarantees hands-on experience and professional-grade grooming.",
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
    eligibility: ["Graduates / Final Year Graduate", "Age: 19 - 27 Years"],
    accreditation: ["SARA"],
    // isGovt: true,
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
