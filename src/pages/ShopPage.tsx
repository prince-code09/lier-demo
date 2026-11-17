import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SlidersHorizontal, Sparkles, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Fragrances', count: PRODUCTS.length },
    { id: 'alpine', label: 'Alpine Mist Line', count: PRODUCTS.filter((p) => p.category === 'alpine').length },
    { id: 'musk', label: 'Crist Ash Musk Line', count: PRODUCTS.filter((p) => p.category === 'musk').length },
    { id: 'combo', label: 'Duo Suites & Gifting', count: PRODUCTS.filter((p) => p.category === 'combo').length },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.scentFamily.toLowerCase().includes(q) ||
          p.topNotes.some((n) => n.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="py-12 bg-obsidian-950 min-h-screen text-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Boutique Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal mt-2 leading-tight">
            The Complete LIER Collection
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Engineered exclusively for luxury automotive cabins. Explore individual single flacons or acquire our flagship Connoisseur Duo Suite.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-obsidian-900 border border-white/10 rounded-sm p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-luxury">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-gold-500 text-obsidian-950 font-semibold shadow-gold-glow'
                    : 'text-zinc-400 hover:text-white bg-obsidian-850 hover:bg-obsidian-800 border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-obsidian-950/30 text-obsidian-950'
                      : 'bg-obsidian-800 text-zinc-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Controls: Search & Sort */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter notes or bottles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-obsidian-850 border border-white/10 rounded-sm pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-obsidian-850 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-gold-400"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center space-x-2 mb-6 text-xs text-zinc-400">
            <span className="uppercase text-[11px] tracking-wider text-zinc-500">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-obsidian-850 border border-gold-400/30 rounded-sm text-gold-300 text-xs">
                <span>Category: {categories.find((c) => c.id === selectedCategory)?.label}</span>
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-obsidian-850 border border-gold-400/30 rounded-sm text-gold-300 text-xs">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-zinc-500 hover:text-gold-300 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-obsidian-900 border border-white/10 rounded-sm">
            <h3 className="font-serif text-xl text-white mb-2">No Matching Fragrances</h3>
            <p className="text-xs text-zinc-400 mb-6 font-light">
              Try adjusting your category filter or clearing the search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-gold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Promo Suite Banner inside Shop */}
        <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-400/20 rounded-sm p-8 sm:p-10 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Concierge Privileges</span>
            </div>
            <h3 className="font-serif text-2xl text-white">Looking for Bespoke Automobile Fleet Gifting?</h3>
            <p className="text-xs text-zinc-400 max-w-xl font-light">
              We collaborate with luxury car clubs, bespoke dealerships, and private collectors. Contact our concierge team for custom engraved packaging and curated fleet assortments.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-gold text-xs tracking-widest uppercase py-3 px-6 whitespace-nowrap shadow-gold-glow"
          >
            Inquire with Concierge
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
