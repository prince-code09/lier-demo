import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export interface NavbarProps {
  onOpenSearch: () => void;
  isScrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, isScrolled: propIsScrolled }) => {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistIds, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;

  useEffect(() => {
    if (propIsScrolled !== undefined) return;
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Alpine Mist', path: '/product/alpine-mist' },
    { label: 'Crist Ash Musk', path: '/product/crist-ash-musk' },
    { label: 'Duo Suite', path: '/product/duo-combo', badge: 'Save 33%' },
    { label: 'The House', path: '/about' },
    { label: 'Concierge', path: '/contact' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/shop') return location.pathname === '/shop';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`w-full transition-all duration-300 z-40 ${
        isScrolled
          ? 'bg-obsidian-950/98 backdrop-blur-2xl border-b border-gold-400/20 shadow-luxury py-2.5 sm:py-3'
          : 'bg-obsidian-950/90 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Mobile Menu & Search Button */}
          <div className="flex items-center lg:hidden space-x-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-gold-300 transition-colors focus:outline-none rounded hover:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-gold-300 transition-colors rounded hover:bg-white/5"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Left Nav Links (Layer 2) */}
          <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium flex-1 justify-start">
            <Link
              to="/shop"
              className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 ${
                isCurrent('/shop') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>Shop All</span>
              {isCurrent('/shop') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
              )}
            </Link>

            <Link
              to="/product/alpine-mist"
              className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 ${
                isCurrent('/product/alpine-mist') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>Alpine Mist</span>
              {isCurrent('/product/alpine-mist') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
              )}
            </Link>

            <Link
              to="/product/crist-ash-musk"
              className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 ${
                isCurrent('/product/crist-ash-musk') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
              }`}
            >
              <span>Crist Ash Musk</span>
              {isCurrent('/product/crist-ash-musk') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
              )}
            </Link>
          </div>

          {/* Center Brand Identity (True Mathematical Centering) */}
          <div className="text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10">
            <Link to="/" className="inline-block group focus:outline-none py-0.5">
              <div className="flex items-center justify-center space-x-2">
                <span className="font-serif text-2xl sm:text-3xl tracking-widest font-normal text-white group-hover:text-gold-300 transition-colors duration-300">
                  LIER
                </span>
              </div>
              <span className="block text-[8px] sm:text-[9px] tracking-ultra uppercase text-gold-400 font-light -mt-1 opacity-90 group-hover:opacity-100">
                Haute Parfum Automobile
              </span>
            </Link>
          </div>

          {/* Desktop Right Nav Links & Actions (Layer 2) */}
          <div className="flex items-center space-x-4 sm:space-x-5 flex-1 justify-end">
            <div className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium mr-2">
              <Link
                to="/product/duo-combo"
                className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 flex items-center space-x-1.5 ${
                  isCurrent('/product/duo-combo') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                <span>Duo Suite</span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-gold-500/20 text-gold-300 border border-gold-400/30 rounded-full font-mono">
                  -33%
                </span>
                {isCurrent('/product/duo-combo') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
                )}
              </Link>

              <Link
                to="/about"
                className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 ${
                  isCurrent('/about') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                <span>The House</span>
                {isCurrent('/about') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
                )}
              </Link>

              <Link
                to="/contact"
                className={`transition-colors duration-200 hover:text-gold-300 relative py-1.5 ${
                  isCurrent('/contact') ? 'text-gold-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                <span>Concierge</span>
                {isCurrent('/contact') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow" />
                )}
              </Link>
            </div>

            {/* Desktop Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center space-x-2 bg-obsidian-900 hover:bg-obsidian-850 border border-white/10 hover:border-gold-400/40 rounded-full px-3 py-1.5 text-xs text-zinc-300 hover:text-gold-300 transition-all shadow-sm group"
              aria-label="Open search modal"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-gold-400 transition-colors" />
              <span className="text-[11px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200">Search</span>
              <kbd className="hidden xl:inline-block text-[9px] font-mono px-1.5 py-0.5 bg-obsidian-800 border border-white/10 rounded text-zinc-500">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-gold-300 transition-colors rounded hover:bg-white/5"
              aria-label="Open wishlist"
            >
              <Heart className="w-5 h-5 transition-transform duration-200 active:scale-90" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-obsidian-950 bg-gold-400 rounded-full ring-2 ring-obsidian-950 shadow-gold-glow animate-pulse">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-gold-300 transition-colors group rounded hover:bg-white/5"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-300 group-hover:text-gold-300 transition-colors active:scale-90" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-obsidian-950 bg-gold-400 rounded-full ring-2 ring-obsidian-950 shadow-gold-glow animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-obsidian-950/98 backdrop-blur-2xl z-50 border-t border-white/10 px-6 py-8 flex flex-col justify-between animate-fade-in overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase tracking-ultra text-gold-400 font-semibold font-mono">
                The Curated Collection
              </span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                Atelier Mumbai
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-sm uppercase tracking-widest py-3 px-2 rounded-sm border-b border-white/5 transition-colors ${
                    isCurrent(link.path)
                      ? 'text-gold-400 font-semibold bg-gold-500/10 border-gold-400/20'
                      : 'text-zinc-200 hover:text-gold-300'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-gold-500/20 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full font-mono">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-obsidian-900 border border-white/10 hover:border-gold-400/40 rounded-sm text-xs uppercase tracking-widest text-zinc-300"
              >
                <Search className="w-4 h-4 text-gold-400" />
                <span>Search Scent Notes & Bottles</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[10px] font-mono">
                IFRA Certified • Organic Fragrance Oils
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-light">
              Concierge: care@lierfragrance.com &bull; +91 98765 43210
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};
