import React, { useState, useEffect } from 'react';
import { Sparkles, X, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  {
    icon: Sparkles,
    text: 'Complimentary White Glove Delivery on orders over ₹999',
    link: '/shop',
    linkText: 'Explore Collection →',
  },
  {
    icon: Tag,
    text: 'Privilege Welcome: Enjoy 10% Off With Code',
    code: 'LIER10',
    link: '/product/duo-combo',
    linkText: 'Claim on Duo Suite →',
  },
  {
    icon: ShieldCheck,
    text: 'Handcrafted in India • Non-Toxic IFRA Certified Organic Oils',
    link: '/about',
    linkText: 'Our Craftsmanship →',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="relative bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border-b border-gold-400/20 text-xs text-gold-200 py-2 px-4 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Trust Indicator (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2 text-zinc-400 text-[11px] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Atelier Dispatch Active</span>
        </div>

        {/* Center Rotating Message */}
        <div className="flex-1 text-center flex items-center justify-center space-x-2 transition-all duration-500">
          <Icon className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 animate-pulse" />
          <span className="tracking-widest uppercase font-medium text-[11px] sm:text-xs text-zinc-200">
            {current.text}
          </span>
          {current.code && (
            <span className="font-mono text-gold-400 font-bold px-1.5 py-0.5 bg-gold-500/10 border border-gold-400/30 rounded text-[10px]">
              {current.code}
            </span>
          )}
          <Link
            to={current.link}
            className="hidden sm:inline-block text-gold-400 underline underline-offset-4 hover:text-gold-300 font-semibold transition-colors ml-1.5 text-[11px]"
          >
            {current.linkText}
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1">
            {ANNOUNCEMENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-4 bg-gold-400' : 'w-1 bg-white/20'
                }`}
                aria-label={`Announcement slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-500 hover:text-gold-300 transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
