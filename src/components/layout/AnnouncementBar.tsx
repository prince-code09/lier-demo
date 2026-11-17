import React, { useState, useEffect } from 'react';
import { Sparkles, X, ShieldCheck, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AnnouncementBarProps {
  isScrolled?: boolean;
}

const ANNOUNCEMENTS = [
  {
    id: 'shipping',
    icon: Sparkles,
    badge: 'Complimentary Delivery',
    text: 'Complimentary White Glove Delivery on orders over ₹999',
    mobileText: 'Complimentary Delivery over ₹999',
    link: '/shop',
    linkText: 'Explore Collection →',
    mobileLinkText: 'Explore →',
  },
  {
    id: 'welcome-code',
    icon: Tag,
    badge: 'Privilege Welcome',
    text: 'Enjoy 10% Off Your Curated Order With Code',
    mobileText: 'Enjoy 10% Off With Code',
    code: 'LIER10',
    link: '/product/duo-combo',
    linkText: 'Claim on Duo Suite →',
    mobileLinkText: 'Claim →',
  },
  {
    id: 'craftsmanship',
    icon: ShieldCheck,
    badge: 'Artisanal Purity',
    text: 'Handcrafted in India • Non-Toxic IFRA Certified Organic Oils',
    mobileText: 'Handcrafted in India • Non-Toxic IFRA Oils',
    link: '/about',
    linkText: 'Our Craftsmanship →',
    mobileLinkText: 'Craftsmanship →',
  },
];

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ isScrolled = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-full bg-obsidian-950 border-b border-gold-400/20 text-xs text-gold-200 transition-all duration-300 z-50 ${
        isScrolled
          ? 'max-h-0 py-0 opacity-0 overflow-hidden pointer-events-none md:max-h-9 md:py-1.5 md:opacity-100 md:pointer-events-auto'
          : 'max-h-12 py-2 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Left Column: Atelier Status (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2.5 text-zinc-400 text-[11px] uppercase tracking-wider font-mono flex-1 justify-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-300 font-medium">Atelier Dispatch Active</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 font-light">Complimentary Pan-India</span>
          </div>

          {/* Center Column: Rotating Announcement */}
          <div className="flex-1 flex items-center justify-center space-x-2 min-w-0 py-0.5">
            {/* Previous Arrow (Mobile & Desktop) */}
            <button
              onClick={handlePrev}
              className="p-1 text-zinc-400 hover:text-gold-300 transition-colors shrink-0"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center space-x-2 truncate transition-all duration-300">
              <Icon className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              
              {/* Badge on Desktop */}
              <span className="hidden xl:inline-block text-[9px] uppercase tracking-widest text-gold-300 font-semibold px-2 py-0.5 bg-gold-500/10 border border-gold-400/25 rounded-full shrink-0">
                {current.badge}
              </span>

              {/* Headline: Responsive Text */}
              <span className="tracking-wider uppercase font-medium text-[11px] sm:text-xs text-zinc-200 truncate">
                <span className="hidden sm:inline">{current.text}</span>
                <span className="sm:hidden">{current.mobileText}</span>
              </span>

              {/* Promo Code Pill (if applicable) */}
              {current.code && (
                <span className="font-mono text-gold-300 font-bold px-1.5 py-0.2 bg-gold-500/15 border border-gold-400/40 rounded text-[10px] tracking-wider shrink-0 shadow-sm">
                  {current.code}
                </span>
              )}

              {/* Action Link */}
              <Link
                to={current.link}
                className="text-gold-400 underline underline-offset-4 hover:text-gold-200 font-semibold transition-colors text-[11px] shrink-0 ml-1"
              >
                <span className="hidden sm:inline">{current.linkText}</span>
                <span className="sm:hidden">{current.mobileLinkText}</span>
              </Link>
            </div>

            {/* Next Arrow (Mobile & Desktop) */}
            <button
              onClick={handleNext}
              className="p-1 text-zinc-400 hover:text-gold-300 transition-colors shrink-0"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Slide Dots & Dismiss Button */}
          <div className="flex items-center justify-end space-x-3 shrink-0 flex-1 lg:flex-initial">
            {/* Slide Dots Indicator */}
            <div className="hidden sm:flex items-center space-x-1.5">
              {ANNOUNCEMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-4 bg-gold-400 shadow-gold-glow' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Announcement slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-gold-300 transition-colors rounded hover:bg-white/5"
              aria-label="Dismiss announcement bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
