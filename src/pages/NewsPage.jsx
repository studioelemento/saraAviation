import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { newsArticles } from "../data/newsData";
import { mapNewsRow } from "../lib/contentApi";
import { usePublishedContent } from "../hooks/usePublishedContent";

const placeholderImg = "https://i.pinimg.com/1200x/c8/d9/c8/c8d9c805c637845b37f69ad1291df5a2.jpg";


const categories = ["All", "Industry", "Academy", "Careers"];

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { articleId } = useParams();
  const { items: articles, loading, fromCms } = usePublishedContent('news', mapNewsRow, newsArticles);

  if (articleId) {
    const article = articles.find((item) => String(item.id) === articleId);
    return (
      <article className="mx-auto max-w-4xl px-5 pb-20 pt-32">
        <Link to="/news" className="text-sm font-semibold text-primary underline">Back to news</Link>
        {article ? (
          <>
            {article.image && <img src={article.image} alt={article.title} className="mt-5 w-full rounded-2xl object-cover sm:max-h-96" />}
            <p className="mt-6 text-sm font-medium text-slate-600">{article.category} {article.date && ' / ' + article.date}</p>
            <h1 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{article.title}</h1>
            <p className="mt-5 whitespace-pre-wrap text-slate-700">{article.excerpt}</p>
          </>
        ) : (
          <p className="mt-5" role="status">{loading || !fromCms ? 'News post unavailable or still loading.' : 'This news post is unavailable.'}</p>
        )}
      </article>
    );
  }

  const filteredNews = activeCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="pt-48 pb-20 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            News & Updates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Stay informed with the latest insights, academy highlights, and career opportunities in the dynamic world of aviation.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-10  container mx-auto px-1 max-w-7xl">
        {/* Category Filters */}
        <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:justify-center justify-start gap-2 md:gap-5 mb-8 pb-1 scrollbar-hide px-2 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-accent text-white shadow-lg shadow-accent/30" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <p className="text-gray-400 text-xs font-medium mb-3 tracking-wide">
                    {item.date}
                  </p>
                  <h3 className="text-xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={'/news/' + encodeURIComponent(item.id)}
                      className="text-primary font-bold text-sm inline-flex items-center gap-2 group/btn hover:text-accent transition-colors"
                    >
                      Read Story
                      <svg 
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
};

export default NewsPage;
