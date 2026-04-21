import React from "react";
import { motion } from "framer-motion";
import AirlinePartners from "./home/components/AirlinePartners";

const placeholderImg = "https://i.pinimg.com/736x/5d/c5/ff/5dc5ffbad0d623c3196bf4b55291992d.jpg";

const students = [
  { id: 1, name: "Sneha Kapoor", airline: "Air India", img: placeholderImg },
  { id: 2, name: "Rahul Malhotra", airline: "Indigo", img: placeholderImg },
  { id: 3, name: "Ananya Iyer", airline: "SpiceJet", img: placeholderImg },
  { id: 4, name: "Vikram Singh", airline: "Vistara", img: placeholderImg },
  { id: 5, name: "Priya Sharma", airline: "Air India Express", img: placeholderImg },
  { id: 6, name: "Arjun Reddy", airline: "Akasa Air", img: placeholderImg },
  { id: 7, name: "Meera Das", airline: "Star Air", img: placeholderImg },
  { id: 8, name: "Karan Johar", airline: "AirAsia India", img: placeholderImg },
  { id: 9, name: "Tanya Verma", airline: "IndiGo", img: placeholderImg },
  { id: 10, name: "Siddharth Jain", airline: "Vistara", img: placeholderImg },
  { id: 11, name: "Ishita Bose", airline: "Air India", img: placeholderImg },
  { id: 12, name: "Rohan Gupta", airline: "Qatar Airways", img: placeholderImg },
  { id: 13, name: "Aarti Singh", airline: "Emirates", img: placeholderImg },
  { id: 14, name: "Sameer Khan", airline: "Ethihad Airways", img: placeholderImg },
  { id: 15, name: "Riya Chawla", airline: "FlyDubai", img: placeholderImg },
  { id: 16, name: "Aditya Nair", airline: "Air India Express", img: placeholderImg },
  { id: 17, name: "Zara Sheikh", airline: "SpiceJet", img: placeholderImg },
  { id: 18, name: "Nikhil Pandey", airline: "IndiGo", img: placeholderImg },
  { id: 19, name: "Kriti Sen", airline: "Air India", img: placeholderImg },
  { id: 20, name: "Varun Dhawan", airline: "Akasa Air", img: placeholderImg },
  { id: 21, name: "Simran Kaur", airline: "IndiGo", img: placeholderImg },
  { id: 22, name: "Deepak Mehra", airline: "Qatar Airways", img: placeholderImg },
  { id: 23, name: "Sakshi Goel", airline: "Vistara", img: placeholderImg },
  { id: 24, name: "Abhishek Roy", airline: "Air India", img: placeholderImg },
  { id: 25, name: "Mona Rawat", airline: "IndiGo", img: placeholderImg },
  { id: 26, name: "Yash Soni", airline: "Emirates", img: placeholderImg },
  { id: 27, name: "Preeti Negi", airline: "Etihad Airways", img: placeholderImg },
  { id: 28, name: "Manish Gill", airline: "Vistara", img: placeholderImg },
];

const PlacementPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="pt-48 pb-20 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Placement Success Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg md:text-xl"
          >
            Empowering dreams, one flight at a time. Meet our alumni flying high with leading global airlines.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={student.img}
                  alt={student.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info Container */}
              <div className="p-4 sm:p-5 text-center">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-accent transition-colors">
                  {student.name}
                </h3>
                <p className="text-accent font-medium text-xs sm:text-sm uppercase tracking-wider mt-1">
                  Placed at {student.airline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Call to Action */}
      <section className="py-20 bg-white text-center px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              You Could Be Next!
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Start your journey with Sara Aviation Academy today and join the elite league of aviation professionals.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-accent/90 transition shadow-xl shadow-accent/30"
          >
            Join Now
          </motion.button>
        </div>
      </section>
      <AirlinePartners title="Our Placement partners" />
    </div>
  );
};

export default PlacementPage;
