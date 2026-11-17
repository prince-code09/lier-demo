import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Flame, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const ScentSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'musk' | 'alpine'>('musk');
  const { addItem } = useCart();
  const { showToast } = useToast();

  const muskProduct = PRODUCTS.find((p) => p.slug === 'crist-ash-musk')!;
  const alpineProduct = PRODUCTS.find((p) => p.slug === 'alpine-mist')!;

  const currentProduct = activeTab === 'musk' ? muskProduct : alpineProduct;

  const handleAddCurrent = () => {
    addItem(currentProduct, 1);
    showToast(`Added to Bag`, `${currentProduct.name} (7.5ml)`, 'success');
  };

  return (
    <section className="py-24 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Olfactory Duet
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Two Masterpiece Fragrances
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Compare our two signature olfactory expressions. Select the profile that best resonates with your driving aesthetic, or bundle both in our curated twin suite.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 sm:p-1.5 bg-obsidian-900 border border-white/10 rounded-sm shadow-luxury max-w-full">
            <button
              onClick={() => setActiveTab('musk')}
              className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-4 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium rounded-sm transition-all ${
                activeTab === 'musk'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-obsidian-950 shadow-gold-glow font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 shrink-0" />
              <span>Crist Ash Musk</span>
            </button>
            <button
              onClick={() => setActiveTab('alpine')}
              className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-4 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium rounded-sm transition-all ${
                activeTab === 'alpine'
                  ? 'bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Mountain className="w-4 h-4 shrink-0" />
              <span>Alpine Mist</span>
            </button>
          </div>
        </div>

        {/* Tab Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-obsidian-900/60 border border-white/10 rounded-sm p-5 sm:p-8 lg:p-12 shadow-luxury">
          {/* Left: Authentic Comparison Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-lg group bg-obsidian-950">
              <img
                src={
                  activeTab === 'musk'
                    ? '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_28 PM (2).webp'
                    : '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_10 PM (3).webp'
                }
                alt={`${currentProduct.name} Scent profile`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-obsidian-950/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-wider text-gold-300 font-mono border border-gold-400/30">
                Official Scent Inspiration
              </div>
            </div>
          </div>

          {/* Right: Scent Breakdown & Sensory Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-400 font-mono mb-1">
                {currentProduct.scentFamily}
              </div>
              <h3 className="font-serif text-3xl text-white font-normal">{currentProduct.name}</h3>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed font-light">
                {currentProduct.tagline}
              </p>
            </div>

            {/* Olfactory Notes Grid */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold font-mono">
                  Top Notes
                </span>
                <span className="text-xs text-white leading-snug block font-medium">
                  {currentProduct.topNotes.slice(0, 2).join(' • ')}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold font-mono">
                  Heart Notes
                </span>
                <span className="text-xs text-white leading-snug block font-medium">
                  {currentProduct.heartNotes.slice(0, 2).join(' • ')}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-semibold font-mono">
                  Base Notes
                </span>
                <span className="text-xs text-white leading-snug block font-medium">
                  {currentProduct.baseNotes.slice(0, 2).join(' • ')}
                </span>
              </div>
            </div>

            {/* Driving Atmosphere Matrix */}
            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Ideal Drive:</strong>{' '}
                  {activeTab === 'musk'
                    ? 'Evening cruises, nighttime cityscapes, executive comfort'
                    : 'Morning commutes, alpine highway tours, hot summer road trips'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Interior Synergy:</strong>{' '}
                  {activeTab === 'musk'
                    ? 'Pairs sublimely with rich leather, alcantara, and walnut burl'
                    : 'Complements brushed aluminum, carbon fiber, and airy panoramic sunroofs'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Longevity:</strong> Up to 30 to 45 Days of continuous passive diffusion
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddCurrent}
                className="btn-gold text-xs tracking-widest uppercase py-3.5 px-7 shadow-gold-glow"
              >
                Acquire {currentProduct.name} &bull; ₹{currentProduct.price}
              </button>
              <Link
                to={`/product/${currentProduct.slug}`}
                className="btn-outline-gold text-xs tracking-widest uppercase py-3.5 px-6 text-center"
              >
                Explore Specifications &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner Linking to Duo Pack */}
        <div className="mt-12 p-6 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-400/20 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <Sparkles className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="font-serif text-base text-white">Can't decide between Crisp Freshness and Velvet Warmth?</h4>
              <p className="text-xs text-zinc-400 mt-0.5 font-light">
                Acquire The Connoisseur Duo Pack: includes both 7.5ml flacons and save 33%.
              </p>
            </div>
          </div>
          <Link
            to="/product/duo-combo"
            className="btn-gold text-xs tracking-widest uppercase py-2.5 px-6 whitespace-nowrap shadow-gold-glow"
          >
            Acquire Duo Suite (₹1,199)
          </Link>
        </div>
      </div>
    </section>
  );
};
