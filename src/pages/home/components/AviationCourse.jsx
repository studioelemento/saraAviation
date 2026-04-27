import React from "react";

export default function AviationCourses() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Content */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-2/3 text-left">
            <p className="text-sm text-gray-600 mb-3">
              Sara Institute of Aviation & Hospitality
            </p>

            <h2 className="text-sm md:text-2xl font-medium text-gray-900 leading-relaxed font-outfit">
              Sara Institute of Aviation & Hospitality, Bangalore, is a premier training institute committed to shaping the next generation of aviation and hospitality professionals. With a strong focus on industry-relevant skills, practical training, and personality development, we equip students with the knowledge and confidence required to excel in airlines, airports, and global hospitality sectors. Our experienced faculty, modern training approach, and dedicated placement support ensure that every student is prepared to step into a successful and rewarding career.
            </h2>

            <a href="#" className="text-blue-600 mt-4 inline-block font-medium hover:underline transition-all">
              Know More
            </a>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-sm relative overflow-hidden group border border-gray-100 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
              {/* Decorative Quote Icon */}
              <svg className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-accent/5 w-16 h-16 sm:w-24 sm:h-24 transform group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H16.017C15.465 8 15.017 8.448 15.017 9V15L13.017 15V9C13.017 6.791 14.808 5 17.017 5H19.017C21.226 5 23.017 6.791 23.017 9V15C23.017 18.866 19.883 22 16.017 22H14.017V21ZM1.017 21L1.017 18C1.017 16.899 1.899 16 3.017 16H6.017C6.569 16 7.017 15.552 7.017 15V9C7.017 8.448 6.569 8 6.017 8H3.017C2.465 8 2.017 8.448 2.017 9V15L0.017 15V9C0.017 6.791 1.808 5 4.017 5H6.017C8.226 5 10.017 6.791 10.017 9V15C10.017 18.866 6.883 22 3.017 22H1.017V21Z"/>
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-6 sm:w-8 h-[2px] bg-accent/30"></span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">Vision</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed font-outfit">
                  "To inspire and shape confident individuals who are ready to succeed in the aviation and hospitality industry, creating professionals who not only build careers but also make a positive impact wherever they go."
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-sm relative overflow-hidden group border border-gray-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-500">
              {/* Decorative Quote Icon */}
              <svg className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-blue-600/5 w-16 h-16 sm:w-24 sm:h-24 transform group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H16.017C15.465 8 15.017 8.448 15.017 9V15L13.017 15V9C13.017 6.791 14.808 5 17.017 5H19.017C21.226 5 23.017 6.791 23.017 9V15C23.017 18.866 19.883 22 16.017 22H14.017V21ZM1.017 21L1.017 18C1.017 16.899 1.899 16 3.017 16H6.017C6.569 16 7.017 15.552 7.017 15V9C7.017 8.448 6.569 8 6.017 8H3.017C2.465 8 2.017 8.448 2.017 9V15L0.017 15V9C0.017 6.791 1.808 5 4.017 5H6.017C8.226 5 10.017 6.791 10.017 9V15C10.017 18.866 6.883 22 3.017 22H1.017V21Z"/>
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-6 sm:w-8 h-[2px] bg-blue-600/30"></span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600">Mission</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed font-outfit">
                  "To support every student with practical training, personal guidance, and real-world exposure, helping them grow in skills, confidence, and personality so they can achieve their career goals with clarity and success."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Courses We Offer
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✈️</div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {course.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const courses = [
  {
    title:
      "Sara Diploma Course in Aviation, Hospitality and Travel Management",
    duration: "Duration: 12 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Airport Operations Fundamentals",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Passenger Ground Services Course",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "PG Diploma Course in Aviation, Hospitality and Travel Management",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Foundation in Travel & Tourism with Amadeus",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
  {
    title: "Cargo Introductory Course",
    duration: "Duration: 6 Months, 5 days/week (Mon-Fri) 2 hours",
  },
];
