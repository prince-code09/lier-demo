import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
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

  // ESC key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      label: 'Shop All',
      subtitle: 'Complete Fragrance Boutique',
      path: '/shop'
    },
    {
      label: 'Alpine Mist',
      subtitle: 'Crisp Glacial Mountain Air',
      path: '/product/alpine-mist'
    },
    {
      label: 'Crist Ash Musk',
      subtitle: 'Velvety Amber Cashmere Wood',
      path: '/product/crist-ash-musk'
    },
    {
      label: 'The House',
      subtitle: 'Heritage & Diffuser Craftsmanship',
      path: '/about'
    },
    {
      label: 'Concierge / Contact Us',
      subtitle: 'Bespoke Client Services & Inquiries',
      path: '/contact'
    },
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

        {/* Mobile Header (< 1024px): Balanced 3-Column Arrangement */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Mobile Left: Menu Toggle */}
          <div className="flex items-center justify-start w-24 sm:w-28">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors focus:outline-none rounded hover:bg-sand/40 active:scale-95"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-burgundy transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Center: Brand Logo (Dead-Centered) */}
          <div className="text-center flex-1 flex flex-col items-center justify-center min-w-0">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block group focus:outline-none py-0.5 select-none"
            >
              <span className="font-serif text-xl sm:text-2xl tracking-widest font-normal text-espresso group-hover:text-burgundy transition-colors block">
                LIER
              </span>
              <span className="block text-[7px] sm:text-[8px] tracking-ultra uppercase text-champagne font-medium -mt-0.5 opacity-90 whitespace-nowrap">
                Haute Parfum Automobile
              </span>
            </Link>
          </div>

          {/* Mobile Right: Search, Wishlist, Shopping Bag */}
          <div className="flex items-center justify-end space-x-0.5 sm:space-x-1 w-24 sm:w-28">
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40 active:scale-95"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40 active:scale-95"
              aria-label="Open wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 text-[8px] sm:text-[9px] font-bold text-cream bg-burgundy rounded-full ring-2 ring-cream shadow-burgundy-glow">
                  {wishlistIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand/40 active:scale-95"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {totalItems > 0 && (
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 text-[8px] sm:text-[9px] font-bold text-cream bg-burgundy rounded-full ring-2 ring-cream shadow-burgundy-glow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer rendered via Portal directly to body to bypass header containing block trap */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-fade-in" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
            {/* Darkened Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity duration-300"
              aria-hidden="true"
            />

            {/* Slide-out Drawer Panel */}
            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <div className="w-screen max-w-sm sm:max-w-md bg-cream border-r border-taupe shadow-2xl flex flex-col justify-between animate-slide-right overflow-y-auto">
                {/* Drawer Header */}
                <div className="p-4 sm:p-5 border-b border-taupe flex items-center justify-between bg-porcelain sticky top-0 z-10">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col select-none"
                  >
                    <span className="font-serif text-xl tracking-widest font-normal text-espresso">
                      LIER
                    </span>
                    <span className="text-[7px] tracking-ultra uppercase text-champagne font-medium -mt-0.5">
                      Haute Parfum Automobile
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded-sm hover:bg-sand-light active:scale-95 border border-taupe/60"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Navigation Links */}
                <div className="p-5 sm:p-6 space-y-5 flex-1">
                  {/* Primary Navigation Destinations */}
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-taupe/60">
                      <span className="text-[10px] uppercase tracking-ultra text-burgundy font-semibold font-mono">
                        Olfactory Navigation
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-mono">
                        Atelier Direct
                      </span>
                    </div>

                    <nav className="flex flex-col space-y-2">
                      {navLinks.map((link) => {
                        const active = isCurrent(link.path);
                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between p-3.5 rounded-sm border transition-all duration-200 group ${
                              active
                                ? 'bg-burgundy/10 border-burgundy/40 text-burgundy font-semibold shadow-sm'
                                : 'bg-porcelain border-taupe/70 hover:border-burgundy/40 hover:bg-white text-espresso'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm uppercase tracking-widest flex items-center space-x-2">
                                <span>{link.label}</span>
                                {active && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                                )}
                              </span>
                              {link.subtitle && (
                                <span className="text-[10px] sm:text-[11px] font-light text-charcoal-muted font-sans mt-0.5">
                                  {link.subtitle}
                                </span>
                              )}
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
                                active ? 'text-burgundy' : 'text-charcoal-muted group-hover:text-burgundy'
                              }`}
                            />
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Curated Duo Privilege Card */}
                  <Link
                    to="/product/duo-combo"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-3.5 bg-sand-light/70 hover:bg-sand-light border border-taupe rounded-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-burgundy font-mono font-semibold flex items-center space-x-1.5">
                        <Sparkles className="w-3 h-3 text-champagne" />
                        <span>Curated Duo Privilege</span>
                      </span>
                      <span className="text-[9px] bg-burgundy text-cream px-1.5 py-0.5 rounded font-mono font-bold">
                        Save 33%
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal font-medium">
                      Alpine Mist & Crist Ash Musk Duo Flacon Suite
                    </p>
                  </Link>

                  {/* Search Shortcut */}
                  <div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenSearch();
                      }}
                      className="w-full flex items-center justify-between p-3 bg-porcelain hover:bg-white border border-taupe rounded-sm text-xs uppercase tracking-widest text-charcoal hover:text-burgundy transition-all group shadow-sm"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Search className="w-4 h-4 text-burgundy" />
                        <span>Search Scent Notes & Bottles</span>
                      </div>
                      <span className="text-[10px] font-mono text-charcoal-muted border border-taupe px-1.5 py-0.5 rounded bg-cream">
                        ⌘K
                      </span>
                    </button>
                  </div>

                  {/* Bag & Wishlist Direct Shortcuts */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="flex items-center justify-center space-x-2 p-3 bg-porcelain border border-taupe hover:border-burgundy/40 rounded-sm text-xs uppercase tracking-wider text-espresso transition-colors shadow-sm active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4 text-burgundy" />
                      <span>Bag ({totalItems})</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsWishlistOpen(true);
                      }}
                      className="flex items-center justify-center space-x-2 p-3 bg-porcelain border border-taupe hover:border-burgundy/40 rounded-sm text-xs uppercase tracking-wider text-espresso transition-colors shadow-sm active:scale-95"
                    >
                      <Heart className="w-4 h-4 text-burgundy" />
                      <span>Wishlist ({wishlistIds.length})</span>
                    </button>
                  </div>
                </div>

                {/* Drawer Footer: Certification & Concierge Hotline */}
                <div className="p-4 sm:p-5 border-t border-taupe bg-porcelain/60 space-y-2 pb-safe">
                  <div className="flex items-center justify-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-burgundy">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>IFRA Certified • Organic Fragrance Oils</span>
                  </div>
                  <div className="text-center text-[11px] text-charcoal-muted font-light">
                    <span>Atelier Concierge: </span>
                    <a href="tel:+919876543210" className="hover:text-burgundy font-medium text-espresso underline underline-offset-2">
                      +91 98765 43210
                    </a>
                    <span className="mx-1.5">•</span>
                    <a href="mailto:care@lierfragrance.com" className="hover:text-burgundy font-medium text-espresso underline underline-offset-2">
                      care@lierfragrance.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
};
