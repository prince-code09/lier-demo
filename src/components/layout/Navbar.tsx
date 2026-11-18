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
      const scrollY = window.scrollY;
      if (scrollY > 35) {
        setInternalScrolled(true);
      } else if (scrollY < 12) {
        setInternalScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propIsScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    if (path === '/product/alpine-mist') {
      return location.pathname === '/product/alpine-mist' || location.pathname === '/collection/alpine';
    }
    if (path === '/product/crist-ash-musk') {
      return location.pathname === '/product/crist-ash-musk' || location.pathname === '/collection/musk';
    }
    if (path === '/about') return location.pathname === '/about';
    if (path === '/contact') return location.pathname === '/contact';
    if (path === '/product/duo-combo') {
      return location.pathname === '/product/duo-combo' || location.pathname === '/collection/combo';
    }
    return false;
  };

  return (
    <nav
      className={`w-full transition-all duration-300 z-40 ${
        isScrolled
          ? 'bg-cream/98 backdrop-blur-2xl border-b border-taupe shadow-luxury py-2.5 sm:py-3'
          : 'bg-ivory/95 backdrop-blur-md border-b border-taupe/80 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout: Symmetrical 12-Column Grid (Left 5 - Center 2 - Right 5) */}
        <div className="hidden lg:grid lg:grid-cols-12 items-center">
          {/* LEFT: 3 Navigation Links */}
          <div className="col-span-5 flex items-center space-x-7 text-xs uppercase tracking-widest font-medium justify-start min-w-0">
            <Link
              to="/shop"
              className={`transition-colors duration-200 hover:text-burgundy relative py-1.5 group ${
                isCurrent('/shop') ? 'text-burgundy font-semibold' : 'text-charcoal'
              }`}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">Shop All</span>
              {isCurrent('/shop') && (
                <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-burgundy rounded-full shadow-burgundy-glow animate-fade-in pointer-events-none" />
              )}
            </Link>

            <Link
              to="/product/alpine-mist"
              className={`transition-colors duration-200 hover:text-burgundy relative py-1.5 group ${
                isCurrent('/product/alpine-mist') ? 'text-burgundy font-semibold' : 'text-charcoal'
              }`}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">Alpine Mist</span>
              {isCurrent('/product/alpine-mist') && (
                <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-burgundy rounded-full shadow-burgundy-glow animate-fade-in pointer-events-none" />
              )}
            </Link>

            <Link
              to="/product/crist-ash-musk"
              className={`transition-colors duration-200 hover:text-burgundy relative py-1.5 group ${
                isCurrent('/product/crist-ash-musk') ? 'text-burgundy font-semibold' : 'text-charcoal'
              }`}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">Crist Ash Musk</span>
              {isCurrent('/product/crist-ash-musk') && (
                <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-burgundy rounded-full shadow-burgundy-glow animate-fade-in pointer-events-none" />
              )}
            </Link>
          </div>

          {/* CENTER: LIER Logo & Tagline (Visually Protected Center with Stabilized Container) */}
          <div className="col-span-2 text-center flex flex-col items-center justify-center min-w-0 overflow-visible">
            <Link to="/" className="inline-block group focus:outline-none py-0.5 transition-transform duration-300 ease-out hover:-translate-y-0.5 select-none">
              <span className="font-serif text-2xl sm:text-3xl tracking-widest font-normal text-espresso group-hover:text-burgundy transition-colors duration-300 block">
                LIER
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-widest uppercase text-champagne font-medium -mt-0.5 opacity-90 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
                Haute Parfum Automobile
              </span>
            </Link>
          </div>

          {/* RIGHT: The House, Concierge, Search, Wishlist, Bag */}
          <div className="col-span-5 flex items-center space-x-6 text-xs uppercase tracking-widest font-medium justify-end min-w-0">
            <Link
              to="/about"
              className={`transition-colors duration-200 hover:text-burgundy relative py-1.5 group ${
                isCurrent('/about') ? 'text-burgundy font-semibold' : 'text-charcoal'
              }`}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">The House</span>
              {isCurrent('/about') && (
                <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-burgundy rounded-full shadow-burgundy-glow animate-fade-in pointer-events-none" />
              )}
            </Link>

            <Link
              to="/contact"
              className={`transition-colors duration-200 hover:text-burgundy relative py-1.5 group ${
                isCurrent('/contact') ? 'text-burgundy font-semibold' : 'text-charcoal'
              }`}
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">Concierge</span>
              {isCurrent('/contact') && (
                <span className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-burgundy rounded-full shadow-burgundy-glow animate-fade-in pointer-events-none" />
              )}
            </Link>

            {/* Icon Trio: Search, Wishlist, Bag with Divider */}
            <div className="flex items-center space-x-2 pl-3 border-l border-taupe">
              <button
                onClick={onOpenSearch}
                className="w-9 h-9 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
                aria-label="Search fragrances"
                title="Search (⌘K)"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
                aria-label="Open wishlist"
              >
                <Heart className="w-4 h-4 transition-transform duration-200 active:scale-90" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-3.5 h-3.5 text-[8px] font-bold text-cream bg-burgundy rounded-full shadow-burgundy-glow animate-pulse">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
                aria-label="Open shopping bag"
              >
                <ShoppingBag className="w-4 h-4 transition-transform duration-200 active:scale-90" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-3.5 h-3.5 text-[8px] font-bold text-cream bg-burgundy rounded-full shadow-burgundy-glow animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout (< 1024px): Balanced 3-Column */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Mobile Left: Menu Toggle + Search */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors focus:outline-none rounded hover:bg-sand/40"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Center: Brand Logo */}
          <div className="text-center">
            <Link to="/" className="inline-block group focus:outline-none py-0.5">
              <span className="font-serif text-xl sm:text-2xl tracking-widest font-normal text-espresso group-hover:text-burgundy transition-colors block">
                LIER
              </span>
              <span className="block text-[7px] sm:text-[8px] tracking-ultra uppercase text-champagne font-medium -mt-0.5 opacity-90 whitespace-nowrap">
                Haute Parfum Automobile
              </span>
            </Link>
          </div>

          {/* Mobile Right: Wishlist + Bag */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
              aria-label="Open wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-cream bg-burgundy rounded-full ring-2 ring-cream shadow-burgundy-glow">
                  {wishlistIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-cream bg-burgundy rounded-full ring-2 ring-cream shadow-burgundy-glow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[56px] sm:top-[60px] bg-cream/98 backdrop-blur-2xl z-50 border-t border-taupe px-6 py-6 flex flex-col justify-between animate-fade-in overflow-y-auto">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-taupe pb-3">
              <span className="text-[10px] uppercase tracking-ultra text-burgundy font-semibold font-mono">
                The Curated Collection
              </span>
              <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-mono">
                Atelier Mumbai
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-sm uppercase tracking-widest py-3 px-3 rounded-sm border-b border-taupe/40 transition-colors ${
                    isCurrent(link.path)
                      ? 'text-burgundy font-semibold bg-burgundy/10 border-l-2 border-l-burgundy pl-3.5'
                      : 'text-espresso hover:text-burgundy'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-burgundy/15 text-burgundy border border-burgundy/30 px-2 py-0.5 rounded-full font-mono">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isCurrent(link.path) ? 'text-burgundy' : 'text-charcoal-muted'}`} />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-porcelain border border-taupe hover:border-burgundy/40 rounded-sm text-xs uppercase tracking-widest text-charcoal shadow-sm"
              >
                <Search className="w-4 h-4 text-burgundy" />
                <span>Search Scent Notes & Bottles</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-taupe text-center space-y-1.5 pb-safe">
            <div className="flex items-center justify-center space-x-2 text-xs text-burgundy">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest text-[10px] font-mono">
                IFRA Certified • Organic Fragrance Oils
              </span>
            </div>
            <p className="text-[11px] text-charcoal-muted font-light">
              Concierge: care@lierfragrance.com &bull; +91 98765 43210
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};
