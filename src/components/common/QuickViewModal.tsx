import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Heart, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`Added ${quantity}× ${product.name} to your bag`, '', 'success');
    onClose();
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    showToast(
      added ? `Added to Wishlist` : `Removed from Wishlist`,
      product.name,
      'gold'
    );
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-espresso/70 backdrop-blur-md transition-opacity"
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-porcelain border border-taupe rounded-sm shadow-2xl text-left overflow-hidden relative z-10 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-charcoal-muted hover:text-espresso p-2 rounded-full bg-cream/90 border border-taupe/60 transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Preview */}
            <div className="relative bg-cream h-60 sm:h-72 md:h-full md:aspect-auto flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-taupe/40">
              <img
                src={product.heroImage}
                alt={product.name}
                className="w-full h-full object-contain md:object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-burgundy text-cream font-medium text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-porcelain">
              <div>
                <div className="flex items-center space-x-2 text-xs text-champagne mb-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                    ))}
                  </div>
                  <span className="font-serif text-espresso font-medium">{product.rating}</span>
                  <span className="text-charcoal-muted">({product.reviewCount} connoisseurs)</span>
                </div>

                <h3 className="font-serif text-2xl text-espresso font-normal">{product.name}</h3>
                <p className="text-xs uppercase tracking-widest text-burgundy mt-1 font-medium">
                  {product.scentFamily}
                </p>

                <div className="flex items-baseline space-x-3 mt-3">
                  <span className="text-2xl font-serif text-espresso font-medium">₹{product.price}</span>
                  <span className="text-sm text-charcoal-muted line-through">₹{product.originalPrice}</span>
                  <span className="text-xs text-burgundy font-medium bg-burgundy/10 px-2 py-0.5 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>

                <p className="text-xs text-charcoal-muted mt-4 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Scent Notes Preview */}
                <div className="mt-4 pt-4 border-t border-taupe/40 space-y-1.5 text-xs">
                  <div className="text-charcoal-muted">
                    <strong className="text-charcoal font-medium">Top Notes:</strong> {product.topNotes.join(', ')}
                  </div>
                  <div className="text-charcoal-muted">
                    <strong className="text-charcoal font-medium">Heart Notes:</strong> {product.heartNotes.join(', ')}
                  </div>
                  <div className="text-charcoal-muted">
                    <strong className="text-charcoal font-medium">Base Notes:</strong> {product.baseNotes.join(', ')}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4 border-t border-taupe/40">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-taupe/60 rounded-sm bg-cream">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-charcoal-muted hover:text-espresso"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-serif text-espresso font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-charcoal-muted hover:text-espresso"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-gold py-3 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag &bull; ₹{product.price * quantity}</span>
                  </button>

                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 border rounded-sm transition-colors ${
                      isFavorited
                        ? 'border-burgundy bg-burgundy/10 text-burgundy'
                        : 'border-taupe/60 text-charcoal-muted hover:text-espresso hover:border-burgundy/40'
                    }`}
                    title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-burgundy' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal-muted pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-burgundy" />
                    <span>30 Days Continuous Diffusion</span>
                  </span>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="text-burgundy hover:text-wine underline underline-offset-4 flex items-center space-x-1 font-medium"
                  >
                    <span>Full Product Specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
