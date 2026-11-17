import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AnnouncementBarProps {
  isScrolled?: boolean;
}

const ANNOUNCEMENTS = [
  {
    id: 'shipping',
    icon: Sparkles,
    text: 'Complimentary White Glove Delivery on orders over ₹999',
    mobileText: 'Complimentary Delivery on orders over ₹999',
    link: '/shop',
    linkText: 'Explore',
  },
  {
    id: 'craftsmanship',
    icon: ShieldCheck,
    text: 'Handcrafted in India • Non-Toxic IFRA Certified Organic Oils',
    mobileText: 'Handcrafted in India • IFRA Certified Oils',
    link: '/about',
    linkText: 'Craftsmanship',
  },
  {
    id: 'privilege',
    icon: Tag,
    text: 'Welcome Privilege: Enjoy 10% Off With Code',
    mobileText: '10% Off With Code',
    code: 'LIER10',
    link: '/product/duo-combo',
    linkText: 'Claim',
  },
];

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ isScrolled = false }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div
      className={`w-full bg-burgundy border-b border-burgundy-wine/30 text-xs text-cream transition-all duration-300 z-50 ${
        isScrolled
          ? 'max-h-0 py-0 opacity-0 overflow-hidden pointer-events-none md:max-h-8 md:py-1.5 md:opacity-100 md:pointer-events-auto'
          : 'max-h-10 py-2 opacity-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          {/* Centered Single Announcement Message */}
          <div className="flex items-center justify-center space-x-2 text-center truncate px-6 transition-opacity duration-500">
            <Icon className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span className="tracking-wider uppercase font-medium text-[11px] sm:text-xs text-cream truncate">
              <span className="hidden sm:inline">{current.text}</span>
              <span className="sm:hidden">{current.mobileText}</span>
            </span>

            {current.code && (
              <span className="font-mono text-champagne-light font-bold px-1.5 py-0.2 bg-cream/15 border border-champagne/40 rounded text-[10px] tracking-wider shrink-0">
                {current.code}
              </span>
            )}

            <Link
              to={current.link}
              className="text-champagne underline underline-offset-4 hover:text-white font-semibold transition-colors text-[11px] shrink-0 ml-1.5"
            >
              {current.linkText} &rarr;
            </Link>
          </div>

          {/* Discreet Dismiss Button on Far Right */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-cream/70 hover:text-white transition-colors rounded hover:bg-white/10"
            aria-label="Dismiss announcement bar"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
