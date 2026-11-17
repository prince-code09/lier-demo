import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', '', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the LIER Circle', 'Check your inbox for exclusive VIP privileges.', 'gold');
    setEmail('');
  };

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 text-alabaster pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/5 text-center">
          <div className="flex flex-col items-center p-4">
            <span className="text-xl font-serif text-gold-400 mb-1">30+ Days</span>
            <span className="text-xs uppercase tracking-widest text-zinc-400">Continuous Diffusion</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-xl font-serif text-gold-400 mb-1">Natural Oils</span>
            <span className="text-xs uppercase tracking-widest text-zinc-400">Non-Toxic & IFRA Compliant</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-xl font-serif text-gold-400 mb-1">Beech Wood</span>
            <span className="text-xs uppercase tracking-widest text-zinc-400">Porous Passive Cap</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-xl font-serif text-gold-400 mb-1">Made in India</span>
            <span className="text-xs uppercase tracking-widest text-zinc-400">Artisanal Craftsmanship</span>
          </div>
        </div>

        {/* Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-widest text-white">LIER</span>
              <span className="block text-[9px] tracking-ultra uppercase text-gold-400 font-light -mt-1">
                Haute Parfum Automobile
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Crafted at the crossroads of French perfumery elegance and precision automotive aesthetics. LIER replaces synthetic vehicle fresheners with noble essential oils and porous beech wood diffusion.
            </p>
            <div className="pt-2 text-xs text-zinc-500">
              Handcrafted in India • Designed for discerning drivers
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-gold-400 font-semibold mb-5">
              The Collections
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 uppercase">
              <li>
                <Link to="/product/alpine-mist" className="hover:text-gold-300 transition-colors">
                  Alpine Mist (7.5ml)
                </Link>
              </li>
              <li>
                <Link to="/product/crist-ash-musk" className="hover:text-gold-300 transition-colors">
                  Crist Ash Musk (7.5ml)
                </Link>
              </li>
              <li>
                <Link to="/product/duo-combo" className="hover:text-gold-300 transition-colors flex items-center space-x-1.5">
                  <span>Connoisseur Duo</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-gold-500/20 text-gold-300 rounded border border-gold-400/30">
                    Bundle
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold-300 transition-colors">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* The House & Support */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-gold-400 font-semibold mb-5">
              The House
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 uppercase">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Client Concierge
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="hover:text-gold-300 transition-colors">
                  How It Diffuses (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  B2B & Corporate Gifting
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Circle */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-gold-400 font-semibold mb-5">
              The LIER Circle
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Receive private invites to limited seasonal distillations and automotive lifestyle stories.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-gold-300 py-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Privilege confirmed. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 p-1 text-gold-400 hover:text-gold-200 transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="block text-[10px] text-zinc-500">
                  Enjoy 10% privilege discount on your initial acquisition with code <span className="text-gold-400 font-mono">LIER10</span>.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} LIER Haute Parfum Automobile. All rights reserved. Handcrafted in India.
          </p>
          <div className="flex items-center space-x-4 text-[11px] text-zinc-400">
            <span>Client Presentation Demo</span>
            <span>•</span>
            <span>Simulated Frontend Commerce</span>
            <span>•</span>
            <span>IFRA Standard Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
