import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';

const IconInstagram = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconTwitter = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconFacebook = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
  </svg>
);

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    detail: "+91 98765 43210",
    sub: "Mon - Sat, 9:00 AM - 6:00 PM",
    link: "tel:+919876543210",
    color: "bg-blue-500"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "WhatsApp",
    detail: "Chat with Admissions",
    sub: "Instant response during office hours",
    link: "https://wa.me/919876543210",
    color: "bg-green-500"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    detail: "info@saraaviation.com",
    sub: "admissions@saraaviation.com",
    link: "mailto:info@saraaviation.com",
    color: "bg-accent"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admissions',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent to Sara Aviation Academy.");
    setFormData({ name: '', email: '', phone: '', subject: 'Admissions', message: '' });
  };

  return (
    <section className="bg-white">
      {/* Hero Header */}
      <div className="bg-primary pt-44 md:pt-60 pb-24 md:pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-5 py-2 bg-accent/20 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-accent/20">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
              Let's Keep <br className="hidden md:block" /> 
              <span className="text-accent underline md:underline decoration-white/10 underline-offset-[12px]">In Touch</span>
            </h1>
            <p className="text-sm md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Have questions about our pilot programs or placements? Our team of experts is ready to help you navigate your aviation journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 ${info.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{info.title}</h3>
              <p className="text-primary text-lg font-black mb-1">{info.detail}</p>
              <p className="text-gray-500 text-xs">{info.sub}</p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-[3rem] p-8 md:p-14"
            >
              <h2 className="text-3xl font-black text-primary mb-10">Send an Inquiry</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 00000 00000"
                      className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-2">Inquiry Type</label>
                    <select 
                      className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm appearance-none"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>Admissions</option>
                      <option>Careers</option>
                      <option>Media & Press</option>
                      <option>Corporate Partnership</option>
                      <option>General Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-2">Your Message</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="How can we help you today?"
                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-accent outline-none transition-all shadow-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-accent hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map & Social Side */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-black text-primary mb-4 flex items-center gap-3">
                  <MapPin className="text-accent" /> Our Headquarters
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Sara Institute of Aviation & Hospitality<br />
                  Central Business District, MG Road Area,<br />
                  Bengaluru, Karnataka 560001, India
                </p>
              </div>

              <div className="aspect-square w-full rounded-[3rem] overflow-hidden border-8 border-gray-50 shadow-inner group">
                <iframe 
                  src="https://maps.google.com/maps?q=Bengaluru,+Karnataka,+India&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  title="Sara Aviation Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Stay Connected</p>
                <div className="flex gap-4">
                  {[IconInstagram, IconTwitter, IconFacebook, IconLinkedin].map((IconComp, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 text-primary flex items-center justify-center hover:bg-accent hover:text-white hover:scale-110 transition-all duration-300">
                      <IconComp />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp Action (Mobile Only) */}
      <a 
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl"
      >
        <MessageSquare size={28} />
      </a>
    </section>
  );
};

export default Contact;
