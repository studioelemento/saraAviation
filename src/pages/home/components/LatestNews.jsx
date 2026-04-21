

import { Link } from 'react-router-dom';
import { newsArticles } from '../../../data/newsData';

export function LatestNews() {
  // Show the latest 3 news items
  const homeNews = newsArticles.slice(0, 3);

  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Updates & Highlights</p>
            <h2 className="text-3xl font-black text-primary">Latest News</h2>
          </div>

          <Link 
            to="/news"
            className="border-2 border-primary/10 px-6 py-2 rounded-full text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All News
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {homeNews.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-50 flex flex-col">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={item.image} 
                  alt="news" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded">
                     {item.category}
                   </span>
                   <p className="text-[10px] text-gray-400 font-semibold uppercase">{item.date}</p>
                </div>

                <h3 className="font-bold text-lg text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-6">
                  {item.excerpt}
                </p>

                <Link 
                  to="/news" 
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors"
                >
                  Read Story
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}