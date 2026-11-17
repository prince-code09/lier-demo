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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-12">
        <div className="w-full max-w-2xl bg-obsidian-900 border border-white/10 rounded-sm shadow-2xl text-left overflow-hidden relative z-10 animate-fade-in">
          {/* Search Header Input */}
          <div className="p-5 border-b border-white/10 flex items-center space-x-3 bg-obsidian-950">
            <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scent note, fragrance family, or bottle..."
              className="w-full bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-zinc-500 hover:text-white p-1"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white px-2 py-1 rounded bg-obsidian-800 border border-white/10"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="px-5 py-3 bg-obsidian-850/60 border-b border-white/5 flex items-center space-x-2 overflow-x-auto text-xs text-zinc-400">
            <span className="text-gold-400 flex items-center space-x-1 flex-shrink-0 text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Suggested:</span>
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded bg-obsidian-800 hover:bg-gold-500/20 hover:text-gold-300 border border-white/5 transition-colors whitespace-nowrap text-[11px]"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="p-5 max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-zinc-500">
                <p className="text-xs tracking-wider uppercase mb-3 text-zinc-400">Featured Inquiries</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={onClose}
                      className="p-3 bg-obsidian-850 border border-white/5 hover:border-gold-400/40 rounded text-left group transition-all"
                    >
                      <div className="text-xs font-serif text-white group-hover:text-gold-300 mb-1">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-zinc-400">{p.scentFamily}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-zinc-400">
                <p className="font-serif text-base text-white mb-1">No Fragrances Found</p>
                <p className="text-xs text-zinc-500">
                  No matching olfactory notes for "{query}". Try "Aquatic", "Musk", or "Alpine".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-2">
                  Matching Fragrances ({filtered.length})
                </div>
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-3 bg-obsidian-850 hover:bg-obsidian-800 border border-white/5 hover:border-gold-400/30 rounded-sm transition-all group"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded-sm border border-white/10"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif text-sm text-white group-hover:text-gold-300 transition-colors">
                          {product.name}
                        </h4>
                        {product.badge && (
                          <span className="text-[9px] bg-gold-500/20 text-gold-300 border border-gold-400/30 px-1.5 py-0.2 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{product.subtitle}</p>
                      <div className="flex items-center space-x-3 text-[11px] text-zinc-500 mt-1">
                        <span className="text-gold-400 font-mono">₹{product.price}</span>
                        <span>•</span>
                        <span>{product.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
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
