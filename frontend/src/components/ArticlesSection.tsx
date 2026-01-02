"use client";

import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import { ARTICLES, MEDIUM_PROFILE_URL, type Article } from "@/lib/articles";
import { SiMedium } from "@icons-pack/react-simple-icons";

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Card Background */}
      <div className={`relative ${featured ? "aspect-[16/10]" : "aspect-[16/9]"} overflow-hidden bg-[var(--color-muted)]`}>
        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top - Category & Date */}
          <div className="flex items-start justify-between gap-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-accent)] text-white">
              {article.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/90 border border-white/20">
                {article.readTime}
              </span>
            </div>
          </div>
          
          {/* Bottom - Title & Meta */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <h3 className={`text-white font-bold leading-tight ${
              featured ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl"
            }`}>
              {article.title}
            </h3>
            {featured && (
              <p className="text-white/70 text-sm md:text-base line-clamp-2">
                {article.subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </a>
  );
}

export default function ArticlesSection() {
  const featuredArticle = ARTICLES[0];
  const otherArticles = ARTICLES.slice(1);

  return (
    <div className="space-y-8">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Article */}
        <ArticleCard article={featuredArticle} featured />
        
        {/* Other Articles */}
        <div className="flex flex-col gap-6">
          {otherArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      
      {/* View All on Medium */}
      <div className="flex justify-center pt-4">
        <a
          href={MEDIUM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-muted)] transition-all duration-300 group"
        >
          <SiMedium className="w-5 h-5" />
          <span className="font-medium">Read more on Medium</span>
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
}

