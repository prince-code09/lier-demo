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
    <div className="py-12 bg-ivory min-h-screen text-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
            Boutique Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-normal mt-2 leading-tight">
            The Complete LIER Collection
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
            Engineered exclusively for luxury automotive cabins. Explore individual single flacons or acquire our flagship Connoisseur Duo Suite.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-porcelain border border-taupe rounded-sm p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-luxury">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-burgundy text-cream font-semibold shadow-burgundy-glow border border-burgundy'
                    : 'text-charcoal hover:text-burgundy bg-cream hover:bg-sand-light border border-taupe/60'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-cream/20 text-cream'
                      : 'bg-sand-light text-charcoal-muted'
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
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter notes or bottles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream border border-taupe rounded-sm pl-8 pr-3 py-1.5 text-xs text-espresso placeholder-charcoal-light focus:outline-none focus:border-burgundy"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-charcoal-muted hover:text-burgundy"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-muted hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cream border border-taupe rounded-sm px-3 py-1.5 text-xs text-espresso focus:outline-none focus:border-burgundy"
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
          <div className="flex items-center space-x-2 mb-6 text-xs text-charcoal-muted">
            <span className="uppercase text-[11px] tracking-wider text-charcoal-muted">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-cream border border-taupe rounded-sm text-burgundy text-xs">
                <span>Category: {categories.find((c) => c.id === selectedCategory)?.label}</span>
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 hover:text-burgundy" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-cream border border-taupe rounded-sm text-burgundy text-xs">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-burgundy" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-charcoal-muted hover:text-burgundy underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-porcelain border border-taupe rounded-sm shadow-sm">
            <h3 className="font-serif text-xl text-espresso mb-2">No Matching Fragrances</h3>
            <p className="text-xs text-charcoal-muted mb-6 font-light">
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16">
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
        <div className="bg-gradient-to-r from-cream via-porcelain to-cream border border-taupe rounded-sm p-8 sm:p-10 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-burgundy font-mono font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Concierge Privileges</span>
            </div>
            <h3 className="font-serif text-2xl text-espresso font-normal">Looking for Bespoke Automobile Fleet Gifting?</h3>
            <p className="text-xs text-charcoal-muted max-w-xl font-light">
              We collaborate with luxury car clubs, bespoke dealerships, and private collectors. Contact our concierge team for custom engraved packaging and curated fleet assortments.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-gold text-xs tracking-widest uppercase py-3 px-6 whitespace-nowrap shadow-burgundy-glow"
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
