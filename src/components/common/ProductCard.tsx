import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  isRecommendation?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, isRecommendation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    showToast(`Added to Bag`, `${product.name} (7.5ml)`, 'success');
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(
      added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      product.name,
      'gold'
    );
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-porcelain border border-taupe rounded-sm overflow-hidden transition-all duration-500 hover:border-burgundy/40 hover:shadow-luxury-hover hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Dual Image Transition */}
      <Link
        to={`/product/${product.slug}`}
        className={`relative overflow-hidden bg-cream flex items-center justify-center block ${
          isRecommendation
            ? 'h-44 sm:h-56 md:h-64 lg:h-[280px] xl:h-[300px] p-2.5 sm:p-4'
            : 'h-44 sm:h-56 md:h-64 lg:h-auto lg:aspect-[3/4] p-2 sm:p-3'
        }`}
      >
        {/* Primary Image - Strictly object-contain to protect bottle, cap, and ribbon integrity */}
        <img
          src={product.heroImage}
          alt={product.name}
          className={`w-full h-full object-contain transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image (In-Car / Lifestyle view) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} in cockpit view`}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Subtle Ambient Warm Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/10 via-transparent to-transparent pointer-events-none" />

        {/* Badge Pill */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="bg-burgundy text-cream border border-burgundy-wine/40 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm shadow-sm font-mono">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorited
              ? 'bg-burgundy text-cream shadow-burgundy-glow scale-110'
              : 'bg-porcelain/90 text-charcoal hover:text-burgundy hover:bg-cream border border-taupe'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-cream' : ''}`} />
        </button>

        {/* Quick View Hover Trigger (Desktop) */}
        {onQuickView && (
          <div className="absolute inset-x-0 bottom-3 px-4 z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2.5 bg-porcelain/95 hover:bg-burgundy hover:text-cream text-espresso border border-taupe hover:border-burgundy rounded-sm text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-md flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick Preview</span>
            </button>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-porcelain">
        <div>
          {/* Scent Family & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1 sm:mb-1.5">
            <span className="uppercase tracking-wider sm:tracking-widest text-burgundy-wine font-mono text-[9px] sm:text-[10px] font-semibold truncate max-w-[65%]">
              {product.scentFamily}
            </span>
            <div className="flex items-center space-x-0.5 sm:space-x-1 text-champagne shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-champagne" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold text-espresso">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-burgundy transition-colors">
            <h3 className="font-serif text-sm sm:text-base md:text-lg text-espresso font-normal leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Notes - Hidden on mobile for compactness, displayed on desktop/tablet */}
          <p className="hidden sm:block text-xs text-charcoal-muted mt-1 line-clamp-1 leading-relaxed font-light">
            {product.subtitle}
          </p>

          {/* Key Feature Badge - Hidden on mobile view, shown on tablet/desktop */}
          <div className="hidden sm:flex items-center space-x-1.5 mt-2.5 text-[11px] text-charcoal-muted">
            <Sparkles className="w-3 h-3 text-champagne flex-shrink-0" />
            <span className="truncate">{product.duration}</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-taupe/60 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline space-x-1 sm:space-x-2">
              <span className="font-serif text-sm sm:text-base md:text-lg text-espresso font-semibold">₹{product.price}</span>
              <span className="text-[10px] sm:text-xs text-charcoal-light line-through">₹{product.originalPrice}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-burgundy font-medium font-mono hidden sm:block">
              Save ₹{product.originalPrice - product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn-gold py-1.5 px-2.5 sm:py-2 sm:px-3.5 text-[11px] sm:text-xs tracking-wider flex items-center space-x-1 sm:space-x-1.5 transition-all duration-300 ${
              isAdded ? 'bg-emerald-600 text-white' : ''
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
