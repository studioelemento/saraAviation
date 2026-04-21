export function MediaShowcaseFooter() {
  return (
    <footer className="w-full bg-black text-white py-16 px-6">
      <div className=" mx-auto">
        {/* Title */}
        <h1 className="text-2xl md:text-6xl font-semibold mb-8">Media Showcase</h1>

        {/* Media Cards */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {media.map((item, index) => (
            <div
              key={index}
              className="w-65 h-90 rounded-2xl overflow-hidden relative group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                <p className="text-xs text-gray-300">Kite Aviation</p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Center Branding */}
        <div className="text-center mt-16">
          <div className="text-xl font-semibold">
            India’s <span className="font-bold">Most Trusted</span>
          </div>
          <p className="text-gray-400 mt-2">
            Aviation Training Institute
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-8">
          {navLinks.map((link, i) => (
            <a key={i} href="#" className="hover:text-white">
              {link}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-8">
          {socials.map((icon, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

const media = [
  { title: "Campus", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1" },
  { title: "Training", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" },
  { title: "Promo Reel", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd" },
  { title: "Anju", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
  { title: "Celebration", image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf" },
  { title: "Welcome to Kite", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
];

const navLinks = [
  "Home",
  "About Kite",
  "Courses",
  "Placement",
  "Our Team",
  "Media Gallery",
  "News & Updates",
  "Student Hub",
  "Careers",
  "Contact",
];

const socials = ["f", "ig", "yt", "wa", "x"];
