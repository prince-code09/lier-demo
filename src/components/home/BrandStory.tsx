import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Droplets, Compass, ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-obsidian-900 border-y border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Olfactory Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Elevating the Driving Sensation
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Conventional car air fresheners rely on synthetic aerosols and garish plastic clips that overpower the senses. LIER reclaims the vehicle cabin as a tranquil private sanctuary through passive diffusion.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 bg-obsidian-950/70 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-obsidian-850 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Natural Essential Oils</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Formulated with organic botanicals, non-toxic carrier oils, and IFRA-certified extracts. Zero synthetic propellants or aggressive petrochemical phthalates.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-obsidian-950/70 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-obsidian-850 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 transition-transform">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Porous Beech Wood Diffusion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our sustainably harvested beech wood cap functions as an acoustic-grade capillary wick, ensuring continuous, subtle evaporation lasting 30 to 45 days.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-obsidian-950/70 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-obsidian-850 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Faceted Crystal Flacon</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Heavy borosilicate glass with tactile geometric faceting, laser-engraved typography, and an adjustable satin suspension cord for universal rearview mirror hanging.
            </p>
          </div>
        </div>

        {/* Story Link */}
        <div className="text-center mt-12">
          <Link
            to="/about"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 font-medium transition-colors"
          >
            <span>Read The Full LIER Craftsmanship Manifesto</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
