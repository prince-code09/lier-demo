import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export const LifestyleFeed: React.FC = () => {
  const feedImages = [
    {
      src: '/assets/marketing/2.webp',
      title: 'Minimalist Cockpit Suspension',
      caption: 'Seamless rearview mirror hang in modern cockpit',
    },
    {
      src: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_12 PM (6).webp',
      title: 'Alpine Lake Highway',
      caption: 'Revitalizing morning drive through mountain passes',
    },
    {
      src: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_30 PM (5).webp',
      title: 'Golden Hour Cruise',
      caption: 'Warm woody amber ambiance for sunset touring',
    },
    {
      src: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_05 PM (6).webp',
      title: 'Natural Outdoor Harmony',
      caption: 'Collectible duo suite for luxury travelers',
    },
  ];

  return (
    <section className="py-24 bg-obsidian-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            The Driver\'s Perspective
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Curated Cockpit Aesthetics
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Witness how LIER diffusers integrate seamlessly into luxury automobile interiors around the country.
          </p>
        </div>

        {/* 4-Image Lifestyle Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {feedImages.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden bg-obsidian-950 border border-white/10 shadow-lg"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-serif text-white">{img.title}</span>
                <span className="text-[10px] text-zinc-300 mt-0.5">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-6 bg-obsidian-950/90 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-gold-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                  ))}
                </div>
                <h4 className="font-serif text-base text-white mb-2 leading-snug">
                  "{review.title}"
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {review.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <div className="text-white font-medium flex items-center space-x-1.5">
                    <span>{review.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div className="text-[11px] text-zinc-500">{review.vehicle} &bull; {review.location}</div>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
