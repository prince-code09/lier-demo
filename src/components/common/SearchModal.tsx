import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.scentFamily.toLowerCase().includes(q) ||
          p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.baseNotes.some((n) => n.toLowerCase().includes(q))
        );
      });

  const popularSearches = ['Alpine Pine', 'Musk Amber', 'Duo Pack', 'Beech Wood', '30 Days'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-espresso/70 backdrop-blur-md transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-12">
        <div className="w-full max-w-2xl bg-cream border border-taupe rounded-sm shadow-2xl text-left overflow-hidden relative z-10 animate-fade-in">
          {/* Search Header Input */}
          <div className="p-5 border-b border-taupe/60 flex items-center space-x-3 bg-porcelain">
            <Search className="w-5 h-5 text-burgundy flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scent note, fragrance family, or bottle..."
              className="w-full bg-transparent text-base sm:text-lg text-espresso placeholder-charcoal-muted/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-charcoal-muted hover:text-espresso p-1"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-charcoal-muted hover:text-espresso px-2 py-1 rounded bg-ivory border border-taupe/60"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-5 py-3 bg-ivory border-b border-taupe/40 flex items-center space-x-2 overflow-x-auto text-xs text-charcoal-muted">
            <span className="text-burgundy flex items-center space-x-1 flex-shrink-0 text-[11px] uppercase tracking-wider font-medium">
              <Sparkles className="w-3 h-3 text-burgundy" />
              <span>Suggested:</span>
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded bg-porcelain hover:bg-burgundy hover:text-cream text-charcoal border border-taupe/60 transition-colors whitespace-nowrap text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="p-5 max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-charcoal-muted">
                <p className="text-xs tracking-wider uppercase mb-3 text-charcoal-muted font-medium">Featured Inquiries</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={onClose}
                      className="p-3 bg-porcelain border border-taupe/60 hover:border-burgundy/60 rounded text-left group transition-all"
                    >
                      <div className="text-xs font-serif text-espresso group-hover:text-burgundy mb-1">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-charcoal-muted">{p.scentFamily}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-charcoal-muted">
                <p className="font-serif text-base text-espresso mb-1">No Fragrances Found</p>
                <p className="text-xs text-charcoal-muted">
                  No matching olfactory notes for "{query}". Try "Aquatic", "Musk", or "Alpine".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-charcoal-muted mb-2 font-medium">
                  Matching Fragrances ({filtered.length})
                </div>
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-3 bg-porcelain hover:bg-ivory border border-taupe/60 hover:border-burgundy/40 rounded-sm transition-all group"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-sm border border-taupe/60"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif text-sm text-espresso group-hover:text-burgundy transition-colors">
                          {product.name}
                        </h4>
                        {product.badge && (
                          <span className="text-[9px] bg-burgundy/10 text-burgundy border border-burgundy/20 px-1.5 py-0.5 rounded-full font-medium">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-muted mt-0.5 line-clamp-1">{product.subtitle}</p>
                      <div className="flex items-center space-x-3 text-[11px] text-charcoal-muted mt-1">
                        <span className="text-burgundy font-serif font-medium">₹{product.price}</span>
                        <span>•</span>
                        <span>{product.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-muted group-hover:text-burgundy group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
