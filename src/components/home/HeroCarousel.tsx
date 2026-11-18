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
    id: 'alpine-mist',
    badge: 'Alpine Inspired Freshness',
    title: 'Alpine Mist',
    subtitle: 'Crisp Glacial Air • Chilled Citrus • Mountain Pine',
    description: 'An invigorating rush of high-altitude mountain lake clarity. Engineered to elevate mental focus and refresh the vehicle cabin naturally throughout your drive.',
    ctaText: 'Discover Alpine Mist',
    ctaLink: '/product/alpine-mist',
    secondaryCtaText: 'View Collection',
    secondaryCtaLink: '/product/alpine-mist',
    image: '/assets/alpine/1 (2).webp',
    tagline: 'Fresh Mountain Aroma For Your Car Interior',
    thumbLabel: 'Alpine Mist',
  },
  {
    id: 'crist-ash-musk',
    badge: 'Velvet Nocturne & Luxury',
    title: 'Crist Ash Musk',
    subtitle: 'Warm Golden Amber • Smoked Cedar • Rare Florals',
    description: 'An opulent, sensual fragrance crafted for nocturnal drives and tailored leather interiors. Neutralizes cabin odors while radiating warm sophistication.',
    ctaText: 'Discover Crist Ash Musk',
    ctaLink: '/product/crist-ash-musk',
    secondaryCtaText: 'View Collection',
    secondaryCtaLink: '/product/crist-ash-musk',
    image: '/assets/musk/1 (2).webp',
    tagline: 'Rich Amber Warmth For Tailored Cabin Interiors',
    thumbLabel: 'Crist Ash Musk',
  },
  {
    id: 'duo-suite',
    badge: 'Flagship Curated Suite',
    title: 'The Art of Automotive Scenting',
    subtitle: 'Haute Parfum Automobile • Connoisseur Duo Suite',
    description: 'Artisanal car perfume crafted with organic fragrance oils and porous beech wood caps. Enjoy both signature scents with 60 days of continuous diffusion.',
    ctaText: 'Acquire The Duo Suite',
    ctaLink: '/product/duo-combo',
    secondaryCtaText: 'Explore All Fragrances',
    secondaryCtaLink: '/shop',
    image: '/assets/combo/1.webp',
    tagline: 'Faceted Borosilicate Glass • Hand-Finished Beech Wood',
    thumbLabel: 'Duo Suite',
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
      className="relative min-h-[85vh] min-h-[85dvh] lg:min-h-[88vh] lg:min-h-[88dvh] flex items-center bg-ivory overflow-hidden border-b border-taupe/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience Warm Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(184,149,80,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_75%,rgba(87,38,52,0.06),transparent_60%)] pointer-events-none" />

      {/* Slide Images Container */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Mobile Image Overlay Background */}
          <div className="lg:hidden absolute inset-0 z-0 opacity-15">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/85 to-transparent" />
          </div>
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 animate-fade-in text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-cream border border-taupe rounded-full text-burgundy text-xs tracking-widest uppercase font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal tracking-tight leading-[1.12]">
              {slide.title}
            </h1>

            {/* Scent Subtitle */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-burgundy-wine font-mono">
              {slide.subtitle}
            </p>

            {/* Mobile Product Image Showcase (Visible on Mobile & Tablet < 1024px) */}
            <div className="lg:hidden flex justify-center my-4">
              <div className="relative w-full max-w-[270px] sm:max-w-xs aspect-[4/5] rounded-sm overflow-hidden border border-taupe shadow-luxury group bg-cream">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={current === 0 ? 'eager' : 'lazy'}
                  fetchPriority={current === 0 ? 'high' : 'auto'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-3 p-2 bg-cream/95 backdrop-blur-md border border-taupe rounded text-center shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-burgundy font-mono font-semibold">
                    {slide.thumbLabel} • Handcrafted Passive Diffusion
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <p className="text-charcoal text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              {slide.description}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to={slide.ctaLink}
                className="btn-gold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 py-3.5 px-8 shadow-burgundy-glow"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.secondaryCtaLink}
                className="btn-outline-gold text-xs tracking-widest uppercase py-3.5 px-6 text-center font-semibold"
              >
                {slide.secondaryCtaText}
              </Link>
            </div>

            {/* Technical Hardware Footnote */}
            <div className="pt-4 border-t border-taupe/60 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-xs text-charcoal-muted">
              <span className="flex items-center space-x-1.5 text-burgundy">
                <ShieldCheck className="w-4 h-4 shrink-0 text-champagne" />
                <span className="text-[11px] uppercase tracking-wider text-charcoal font-mono font-medium">
                  Up to 30 Days Continuous Diffusion
                </span>
              </span>
              <span className="hidden sm:inline text-taupe-dark">•</span>
              <span className="tracking-wider uppercase text-[11px] text-charcoal-muted font-light">
                {slide.tagline}
              </span>
            </div>
          </div>

          {/* Right Product Image Showcase (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center relative">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden border border-taupe shadow-luxury group bg-cream">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading={current === 0 ? 'eager' : 'lazy'}
                fetchPriority={current === 0 ? 'high' : 'auto'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-cream/95 backdrop-blur-md border border-taupe rounded text-center shadow-md">
                <span className="text-xs uppercase tracking-widest text-burgundy font-mono font-semibold">
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
                  ? 'bg-burgundy text-cream border border-burgundy shadow-sm'
                  : 'text-charcoal-muted hover:text-burgundy bg-cream/90 border border-taupe'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${i === current ? 'bg-cream animate-pulse' : 'bg-taupe-dark'}`} />
              <span className="hidden sm:inline">{s.thumbLabel}</span>
              <span className="sm:hidden">0{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
            className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-sm bg-cream/90 hover:bg-burgundy hover:text-cream border border-taupe text-charcoal transition-colors shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
            className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-sm bg-cream/90 hover:bg-burgundy hover:text-cream border border-taupe text-charcoal transition-colors shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
