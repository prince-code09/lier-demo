import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  tagline: string;
  thumbLabel: string;
}

const SLIDES: Slide[] = [
  {
    id: 'duo-suite',
    badge: 'Flagship Curated Suite',
    title: 'The Art of Automotive Scenting',
    subtitle: 'Haute Parfum Automobile • Connoisseur Duo Pack',
    description: 'Artisanal car perfume crafted with organic fragrance oils and porous beech wood caps. Continuous passive diffusion for up to 60 days.',
    ctaText: 'Acquire The Duo Suite',
    ctaLink: '/product/duo-combo',
    secondaryCtaText: 'Explore All Fragrances',
    secondaryCtaLink: '/shop',
    image: '/assets/combo/1.webp',
    tagline: 'Faceted Borosilicate Glass • Hand-Finished Beech Wood',
    thumbLabel: 'The Duo Suite',
  },
  {
    id: 'alpine-mist',
    badge: 'Alpine Inspired Freshness',
    title: 'Alpine Mist',
    subtitle: 'Crisp Glacial Air • Chilled Citrus • Mountain Pine',
    description: 'An invigorating rush of high-altitude mountain lake clarity. Engineered to elevate mental focus and refresh the cabin throughout your commute.',
    ctaText: 'Discover Alpine Mist',
    ctaLink: '/product/alpine-mist',
    secondaryCtaText: 'View Alpine Collection',
    secondaryCtaLink: '/product/alpine-mist',
    image: '/assets/alpine/1 (2).webp',
    tagline: 'Fresh Mountain Aroma For Your Car Interior',
    thumbLabel: 'Alpine Mist',
  },
  {
    id: 'crist-ash-musk',
    badge: 'Velvet Nocturne & Luxury',
    title: 'Crist Ash Musk',
    subtitle: 'Floral • Woody • Warm Golden Amber',
    description: 'An opulent, sensual fragrance crafted for nocturnal drives and tailored leather interiors. Neutralizes stubborn vehicle odors naturally.',
    ctaText: 'Discover Crist Ash Musk',
    ctaLink: '/product/crist-ash-musk',
    secondaryCtaText: 'View Musk Collection',
    secondaryCtaLink: '/product/crist-ash-musk',
    image: '/assets/musk/1 (2).webp',
    tagline: 'A Rich Fragrance That Keeps Your Car Fresh & Inviting',
    thumbLabel: 'Crist Ash Musk',
  },
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center bg-obsidian-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(212,175,55,0.09),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(2,132,199,0.06),transparent_60%)] pointer-events-none" />

      {/* Slide Images Container */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Mobile Image Overlay Background */}
          <div className="lg:hidden absolute inset-0 z-0 opacity-20">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/85 to-transparent" />
          </div>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-gold-500/10 border border-gold-400/30 rounded-full text-gold-300 text-xs tracking-widest uppercase font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.12]">
              {slide.title}
            </h1>

            {/* Scent Subtitle */}
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase text-gold-400 font-mono">
              {slide.subtitle}
            </p>

            {/* Narrative Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to={slide.ctaLink}
                className="btn-gold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 py-3.5 px-8 shadow-gold-glow"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.secondaryCtaLink}
                className="btn-outline-gold text-xs tracking-widest uppercase py-3.5 px-6 text-center"
              >
                {slide.secondaryCtaText}
              </Link>
            </div>

            {/* Technical Hardware Footnote */}
            <div className="pt-4 border-t border-white/10 flex items-center space-x-4 text-xs text-zinc-400">
              <span className="flex items-center space-x-1.5 text-gold-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-wider text-zinc-300 font-mono">
                  Up to 30 Days Continuous Diffusion
                </span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="tracking-wider uppercase text-[11px] text-zinc-400">
                {slide.tagline}
              </span>
            </div>
          </div>

          {/* Right Product Image Showcase (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center relative">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-luxury group bg-obsidian-900/50">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading={current === 0 ? 'eager' : 'lazy'}
                fetchPriority={current === 0 ? 'high' : 'auto'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-obsidian-950/85 backdrop-blur-md border border-white/10 rounded text-center">
                <span className="text-xs uppercase tracking-widest text-gold-300 font-mono">
                  {slide.thumbLabel} • Handcrafted Passive Diffusion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls & Slide Thumbnails */}
      <div className="absolute bottom-6 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Slide Indicator Selector */}
        <div className="flex items-center space-x-3">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`text-xs uppercase tracking-wider font-mono py-1 px-2.5 rounded-sm transition-all duration-300 flex items-center space-x-2 ${
                i === current
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300 bg-obsidian-900/60 border border-white/5'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${i === current ? 'bg-gold-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span className="hidden sm:inline">{s.thumbLabel}</span>
              <span className="sm:hidden">0{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            className="p-2.5 rounded-sm bg-obsidian-900/80 hover:bg-gold-500 hover:text-obsidian-950 border border-white/10 text-zinc-300 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
            className="p-2.5 rounded-sm bg-obsidian-900/80 hover:bg-gold-500 hover:text-obsidian-950 border border-white/10 text-zinc-300 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
