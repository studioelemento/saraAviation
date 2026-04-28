import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, BookOpen } from "lucide-react";

const CareerFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <section className="bg-[#f8fafc] py-1 md:py-5 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: Image + Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
              alt="Pilot training"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">
                Sara Aviation Academy
              </span>
              <h3 className="text-white text-2xl font-black uppercase leading-tight">
                Your Cockpit Awaits.
              </h3>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                Join hundreds of pilots who took the first step right here.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent text-xs font-black uppercase tracking-widest mb-4 block">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase leading-tight mb-3">
            Begin Your{" "}
            <span className="text-accent">Aviation Career</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Fill out the form below and one of our licensed pilot mentors will
            get in touch with you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name *"
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                required
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Row 3: Phone */}
            <div className="relative">
              <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 Phone Number *"
                required
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Row 4: Interest */}
            <div className="relative">
              <BookOpen size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none"
              >
                <option value="">Select Your Interest</option>
                <option value="integrated">Integrated Pilot Mentorship</option>
                <option value="flying-abroad">Flying Training Abroad</option>
                <option value="conversion">Licence Conversion</option>
                <option value="type-rating">Type Rating</option>
              </select>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-accent text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/30"
            >
              Send My Enquiry <Send size={15} />
            </motion.button>

            <p className="text-center text-xs text-gray-400 mt-2">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default CareerFormSection;