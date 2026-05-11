import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const galleryImages = [
  { id: 1, title: "Classroom Training", url: "/assets/mediaGallery/classroom 8.png" },
  { id: 2, title: "Sports Day", url: "/assets/mediaGallery/sports 1.jpeg" },
  { id: 3, title: "Student Activities", url: "/assets/mediaGallery/activity 1.jpeg" },
  { id: 4, title: "Grooming Session", url: "/assets/mediaGallery/Grooming 2.jpeg" },
  { id: 5, title: "Counselling", url: "/assets/mediaGallery/counselling.jpeg" },
  { id: 6, title: "Academy Lobby", url: "/assets/mediaGallery/lobby.jpeg" },
  { id: 7, title: "Campus Highlights", url: "/assets/mediaGallery/DSC00760.JPG.jpeg" },
  { id: 8, title: "Training Session", url: "/assets/mediaGallery/DSC00772.JPG.jpeg" },
  { id: 9, title: "Student Interaction", url: "/assets/mediaGallery/DSC00806.JPG.jpeg" },
  { id: 10, title: "Classroom", url: "/assets/mediaGallery/classroom 9.png" },
  { id: 11, title: "Aviation Training", url: "/assets/mediaGallery/DSC00854.JPG (1).jpeg" },
  { id: 12, title: "Practical Learning", url: "/assets/mediaGallery/DSC00884.JPG (1).jpeg" },
  { id: 13, title: "Campus Life", url: "/assets/mediaGallery/DSC00921.JPG (1).jpeg" },
  { id: 14, title: "Activity", url: "/assets/mediaGallery/activity day 1.jpeg" },
  { id: 15, title: "Sports Highlight", url: "/assets/mediaGallery/sport new 1.png" },
  { id: 16, title: "Sports Team", url: "/assets/mediaGallery/sport new 4.png" },
  { id: 17, title: "Academy Sports", url: "/assets/mediaGallery/sport new 6.png" },
  { id: 18, title: "Competition", url: "/assets/mediaGallery/sport new 9.png" },
  { id: 19, title: "Athletics", url: "/assets/mediaGallery/sport new 10.png" },
  { id: 20, title: "Field Events", url: "/assets/mediaGallery/sport new 11.webp" },
  { id: 21, title: "Academy View", url: "/assets/mediaGallery/image.jpeg" },
  { id: 22, title: "Student Portrait", url: "/assets/mediaGallery/pic17.webp" },
  { id: 23, title: "Moment of Success", url: "/assets/mediaGallery/WhatsApp Image 2026-05-02 at 3.20.04 PM.jpeg" },
  { id: 24, title: "Group Celebration", url: "/assets/mediaGallery/WhatsApp Image 2026-05-02 at 3.20.05 PM (1).jpeg" },
  { id: 25, title: "Event Highlight", url: "/assets/mediaGallery/WhatsApp Image 2026-05-02 at 3.20.05 PM.jpeg" },
  { id: 26, title: "Training Drill", url: "/assets/mediaGallery/pic 13.jfif" },
  { id: 27, title: "Student Drill", url: "/assets/mediaGallery/pic 14.jfif" },
  { id: 28, title: "Practical Session", url: "/assets/mediaGallery/pic 15.jfif" },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-48 pb-16 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Media Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl"
          >
            A visual journey through Sara Aviation Academy's world-class training and vibrant campus life.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 container mx-auto px-6">
        <div className="columns-3 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-5 gap-3 space-y-3">
          <AnimatePresence mode="popLayout">
            {galleryImages.map((img, index) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                className="relative break-inside-avoid rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => openLightbox(img)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-medium">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Section */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute inset-0 bg-primary/95 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button 
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-white p-2 sm:p-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-xl"
                />
                {/* <div className="w-full pt-4 sm:pt-6 px-4 text-center">
                  <h2 className="text-primary text-xl font-bold">
                    {selectedImage.title}
                  </h2>
                </div> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Section Preview */}
      <section className="py-20 bg-gray-50 text-center px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-primary italic">Capture Your Future With Us</h2>
          <p className="text-gray-600">
            Sara Aviation Academy is more than just a training center. It's a place where lifelong memories and professional excellence are built.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition shadow-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
