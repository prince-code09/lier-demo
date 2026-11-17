import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const { wishlistProducts, isWishlistOpen, setIsWishlistOpen, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const handleAddToCart = (product: typeof wishlistProducts[0]) => {
    addItem(product, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
              <h2 className="text-sm sm:text-base uppercase tracking-widest font-serif text-white">
                Saved Fragrances ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white transition-colors rounded"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-obsidian-850 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <Heart className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">No Saved Fragrances</h3>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  Save your desired automotive colognes to curate your personal luxury driving collection.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-gold text-xs"
                >
                  Discover Fragrances
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex space-x-4 pb-6 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="w-20 h-24 bg-obsidian-850 border border-white/10 rounded-sm overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-serif text-sm text-white hover:text-gold-300 transition-colors"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-zinc-400">{product.subtitle}</div>
                      <div className="text-xs text-gold-400 font-medium mt-1">₹{product.price}</div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-3 flex items-center justify-center space-x-1.5 py-2 px-3 bg-obsidian-800 hover:bg-gold-500 text-zinc-200 hover:text-obsidian-950 border border-white/10 rounded-sm text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-obsidian-900 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={clearWishlist}
                className="text-xs uppercase tracking-wider text-zinc-500 hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addItem(p, 1));
                }}
                className="btn-gold text-xs py-2.5 px-4"
              >
                Add All to Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
