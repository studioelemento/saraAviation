


const news = [
  {
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    title: "India's Aviation Boom and Its Impact on Job Opportunities",
    date: "28 Jan 2025",
    desc: "India takes flight as one of the fastest-growing aviation markets globally...",
  },
  {
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    title: "India’s Aviation Industry: Charting New Heights",
    date: "20 Jan 2025",
    desc: "The aviation industry continues to evolve with innovation and growth...",
  },
  {
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    title: "Top 7 aviation careers taking off in 2025",
    date: "01 Jan 2025",
    desc: "Explore the most promising aviation career paths for the future...",
  },
];

export function LatestNews() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">Updates & Highlights</p>
            <h2 className="text-3xl font-bold text-blue-900">Latest News</h2>
          </div>

          <button className="border px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
            View All News
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={item.image} alt="news" className="w-full h-48 object-cover" />

              <div className="p-5">
                <h3 className="font-semibold text-lg text-blue-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mb-3">{item.date}</p>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.desc}
                </p>

                <button className="mt-4 text-sm text-gray-500 hover:text-black">
                  Read Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}