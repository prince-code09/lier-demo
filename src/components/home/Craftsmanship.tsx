import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  return (
    <section className="py-24 bg-obsidian-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Material Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Anatomy of an Artisanal Diffuser
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Every component is selected for sensory elegance, environmental sustainability, and acoustic harmony with luxury automotive interiors.
          </p>
        </div>

        {/* 2 Feature Modules: MKT-05 & MKT-06 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Wooden Cap Focus (MKT-05) */}
          <div className="bg-obsidian-950 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-gold-400/40 transition-all duration-300">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-white/5 mb-6">
              <img
                src="/assets/marketing/5.webp"
                alt="Natural Wooden Cap Continuous Diffusion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-obsidian-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-wider text-gold-300 font-mono border border-gold-400/20">
                Passive Capillary Technology
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 font-mono mb-2">
                <Layers className="w-4 h-4" />
                <span>Porous Beech Wood Diffusion</span>
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">Breathable Natural Beech Cap</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unlike synthetic air vents that blast volatile chemicals when the AC engages, our sustainably sourced beech wood cap functions as an organic capillary wick. It absorbs the essential oils and releases a continuous, gentle vapor cloud that naturally harmonizes with the cabin's ambient airflow.
              </p>
            </div>
          </div>

          {/* Faceted Glass Flacon Focus (MKT-06) */}
          <div className="bg-obsidian-950 border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-gold-400/40 transition-all duration-300">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-white/5 mb-6">
              <img
                src="/assets/marketing/6.webp"
                alt="Faceted Glass Flacon Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-obsidian-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase tracking-wider text-gold-300 font-mono border border-gold-400/20">
                Borosilicate Crystal Glass
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 font-mono mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Precision Flacon Aesthetics</span>
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">Faceted Crystal Architecture</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Cast from thick, heavy borosilicate crystal glass with diamond-cut facets. Designed to capture and refract daylight through the windshield without warming the oil excessively. Complete with an airtight silicone transport plug to ensure zero transit leakage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
