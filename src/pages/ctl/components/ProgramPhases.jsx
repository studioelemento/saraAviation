import React from "react";

const phases = [
  {
    phase: "1",
    color: "bg-blue-500",
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
    phase: "2",
    color: "bg-green-500",
    title: "Flight Training Abroad",
    duration: "Months 5 – 12",
    location: "Florida, USA",
    points: [
      "Private Pilot License (PPL)",
      "Instrument Rating (IR)",
      "Commercial Pilot License (CPL)",
      "Multi-Engine Endorsement",
      "Dual Logbook Management (FAA + DGCA)",
    ],
  },
  {
    phase: "3",
    color: "bg-orange-400",
    title: "Return & Convert",
    duration: "Months 13 – 15",
    location: "India",
    points: [
      "DGCA Licence Conversion",
      "Conversion Flying (10–25 hrs at DGCA FTO)",
      "Skill Tests + CPL Application on eGCA",
      "Airline Preparation Seminars",
    ],
  },
  {
    phase: "4",
    color: "bg-purple-500",
    title: "Type Rating & Advanced Training",
    duration: "Months 16 – 18",
    location: "Global Training Centers",
    points: [
      "Airbus/Boeing Type Rating",
      "Simulator Training",
      "Advanced SOP Training",
      "Airline Interview Preparation",
    ],
  },
  {
    phase: "5",
    color: "bg-red-500",
    title: "Airline Placement",
    duration: "Post Training",
    location: "India / International",
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
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-wide mb-2">
            THE PROGRAMME
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Five Phases. Every Step Covered.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our integrated training path takes you from DGCA ground school in
            Bangalore to flight training in the USA, Spain, and Greece —
            ensuring you return airline-ready with comprehensive mentorship
            every step of the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Vertical Line */}
          <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-gray-300"></div>

          <div className="space-y-12">
            {phases.map((item, index) => (
              <div key={index} className="relative flex items-start gap-8">
                
                {/* Phase Circle */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full text-center p-10 flex items-center justify-center text-white font-bold ${item.color}`}>

                      Phase <br />

                    {item.phase}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md">
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {item.duration}
                    </span>
                    <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <ul className="space-y-2 text-gray-600 text-sm">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">✔</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProgramPhases;