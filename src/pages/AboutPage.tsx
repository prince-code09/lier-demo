import React from 'react';
import { Sparkles, Shield, Droplets, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-ivory text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
            The House of LIER
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-normal mt-3 leading-tight">
            Haute Parfumerie Meets Precision Automobilia
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Founded on the conviction that a luxury automobile deserves more than petrochemical air fresheners and disposable plastic clips, LIER engineers bespoke fragrance diffusers using artisanal natural essential oils and sustainable beech wood wicks.
          </p>
        </div>

        {/* Story Section 1: The Vision & MKT-04 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-ultra text-burgundy font-serif font-semibold">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl text-espresso font-normal leading-snug">
              Reclaiming the Vehicle Cockpit as a Sacred Personal Space
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
              We spend hundreds of hours every year navigating dense morning traffic, highway commutes, and evening escapes. Yet vehicle cabins are historically dominated by harsh aerosol sprays and synthetic fragrances that induce fatigue and headaches.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
              LIER was conceived to harmonize olfactory luxury with automotive interior design. Hand-blended in India using IFRA-certified botanical notes, our perfumes gently permeate the vehicle cabin through passive capillary evaporation.
            </p>
            <div className="pt-2 flex items-center space-x-6 text-xs text-burgundy font-medium">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-burgundy" />
                <span>Zero Synthetic Propellants</span>
              </span>
              <span className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-burgundy" />
                <span>100% Natural Fragrance Oils</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden border border-taupe/60 shadow-md group bg-cream">
              <img
                src="/assets/marketing/4.webp"
                srcSet="/assets/marketing/4-800w.webp 800w, /assets/marketing/4-1200w.webp 1200w, /assets/marketing/4.webp 2000w"
                sizes="(max-width: 768px) 100vw, 450px"
                alt="LIER Brand Heritage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 inset-x-4 p-2 bg-porcelain/90 backdrop-blur-md rounded text-center border border-taupe/40">
                <span className="text-[10px] uppercase tracking-widest text-burgundy font-serif font-medium">
                  Made in India &bull; Pure Botanical Distillations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section 2: Craftsmanship & Materials */}
        <div className="py-16 border-y border-taupe/40 mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
              The Materials
            </span>
            <h2 className="font-serif text-3xl text-espresso font-normal mt-2">
              Engineered with Organic Tactility
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Beech Wood Feature */}
            <div className="p-8 bg-porcelain border border-taupe/60 rounded-sm space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-cream border border-taupe/60 flex items-center justify-center text-burgundy mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-espresso">Acoustic-Grade Beech Wood</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                Our wooden diffusion caps are lathed from FSC-certified European beech wood. The wood's natural grain pores serve as microscopic capillary conduits that draw the fragrant oil upward and disperse it evenly into the circulating air stream without synthetic evaporation catalysts.
              </p>
            </div>

            {/* Crystal Flacon Feature */}
            <div className="p-8 bg-porcelain border border-taupe/60 rounded-sm space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-cream border border-taupe/60 flex items-center justify-center text-burgundy mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-espresso">Borosilicate Crystal Flacon</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                Each flacon is cast from thick, heat-resistant borosilicate glass with diamond-faceted bevels. It withstands elevated car interior temperatures under direct sun, while its faceted geometry casts gentle reflections without obstructing visibility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-cream border border-taupe/60 rounded-sm p-12 shadow-sm max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-espresso font-normal mb-3">
            Experience the LIER Difference
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-light">
            Elevate your vehicle interior with our signature Alpine Mist or Crist Ash Musk diffusers today.
          </p>
          <Link
            to="/shop"
            className="btn-gold text-xs tracking-widest uppercase py-3.5 px-8 inline-flex items-center space-x-2"
          >
            <span>Explore The Boutique</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
