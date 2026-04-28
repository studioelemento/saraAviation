import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    src: "https://i.pinimg.com/736x/5d/c5/ff/5dc5ffbad0d623c3196bf4b55291992d.jpg",
    alt: "Pilot in cockpit",
    caption: "Professional Cockpit Training",
  },
  {
    src: "https://i.pinimg.com/736x/e5/5e/fc/e55efc389309d24b77cbf5a4fb0cb62b.jpg",
    alt: "Aviation pilot",
    caption: "Become a Commercial Pilot",
  },
  {
    src: "https://i.pinimg.com/736x/c6/19/ab/c619ab2f2a240aaf631150612a4af1be.jpg",
    alt: "Cockpit view",
    caption: "Dual Pilot Cockpit Simulation",
  },
  {
    src: "https://i.pinimg.com/1200x/1c/54/39/1c5439838273b9e8870e977f0146fd89.jpg",
    alt: "Aviation training",
    caption: "Advanced Avionics & Navigation",
  },
  {
    src: "https://i.pinimg.com/1200x/f8/34/9b/f8349b99d0558a213dedd89f0b9bf581.jpg",
    alt: "Airplane at night",
    caption: "DGCA Licence Conversion Program",
  },
];

export default function PilotHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 2000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 pt-2   md:py-0">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-1">
          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Your <br className="hidden md:block" />
            <span className="text-blue-600">Commercial Pilot</span>{" "}
            <br className="hidden md:block" />
            Journey Starts <br className="hidden md:block" />
            Here
          </h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Commercial Pilot Training in India &amp; Abroad{" "}
            <br className="hidden md:inline" />
            Integrated Pilot Mentorship Program{" "}
            <br className="hidden md:inline" />
            Flying Training in USA, New Zealand, Spain &amp; Greece{" "}
            <br className="hidden md:inline" />
            DGCA Licence Conversion
          </p>

          <Link
            to="/ctl"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Start Your CPL Journey
          </Link>
        </div>

        {/* Right — Image Slider */}
        <div
          className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl select-none order-1 md:order-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === current ? 1 : 0,
                zIndex: i === current ? 1 : 0,
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Dot Indicators */}
          <div className="absolute bottom-4 right-5 z-10 flex gap-2 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
