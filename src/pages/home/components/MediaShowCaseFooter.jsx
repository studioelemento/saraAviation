import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const placeholderImg = "https://i.pinimg.com/1200x/15/70/49/1570493b8ce940b9e53a90ec44bb3d71.jpg";

const media = [
  { title: "Campus", image: placeholderImg },
  { title: "Training", image: placeholderImg },
  { title: "Promo Reel", image: placeholderImg },
  { title: "Anju", image: placeholderImg },
  { title: "Celebration", image: placeholderImg },
  { title: "Welcome to Sara", image: placeholderImg },
];

export function MediaShowcaseFooter() {
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
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

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

      <style dangerouslySetInnerHTML={{ __html: `
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
    </footer>
  );
}


