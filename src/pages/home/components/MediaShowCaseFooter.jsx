import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


  
import campusImg from '../../../../public/assets/mediaShowcase/Campus.jpeg';
import trainingImg from '../../../../public/assets/mediaShowcase/Training.png';
import ActivitiesImg from '../../../../public/assets/mediaShowcase/activity.jpeg';
import sportsImg from '../../../../public/assets/mediaShowcase/sports.jpeg';

const promoReel = '/assets/mediaShowcase/promoReel.mp4';

const media = [
  { title: "Promo Reel", video: promoReel },
  { title: "Activities", image: ActivitiesImg },
  { title: "Training", image: trainingImg },
  { title: "Campus", image: campusImg },
  { title: "Sports", image: sportsImg },
];

export function MediaShowcaseFooter() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <footer className="w-full bg-black text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black mb-12 tracking-tight"
        >
          Media Showcase
        </motion.h2>
      </div>

      {/* Swiper Slider */}
      <div className="px-6 md:px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          loop={true}
          centeredSlides={false}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.5,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 4.5,
              centeredSlides: false,
            }
          }}
          className="showcase-swiper !pb-14 !px-6 md:!px-12"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20"
                onClick={() => setSelectedMedia(item)}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 opacity-80">Sara Aviation</p>
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .showcase-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.3;
        }
        .showcase-swiper .swiper-pagination-bullet-active {
          background: #f5a425;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transition: all 0.3s;
        }
      `}} />

      {/* Media Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                selectedMedia.video ? 'h-full max-h-[85vh] aspect-[9/16] bg-black border border-white/10' : 'w-auto h-auto max-w-[95vw] max-h-[95vh]'
              }`}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-accent text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              
              {selectedMedia.video ? (
                <video
                  src={selectedMedia.video}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-[95vh] block"
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}


