import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Star,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Droplets,
  Layers,
  ArrowRight,
  ChevronRight,
  Truck,
  RotateCcw,
  Check,
} from 'lucide-react';

interface ProductDetailPageProps {
  defaultSlug?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ defaultSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const targetIdentifier = defaultSlug || slug;
  const product =
    PRODUCTS.find((p) => p.slug === targetIdentifier || p.category === targetIdentifier) ||
    PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.heroImage);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'howToUse' | 'specs' | 'reviews'>('notes');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setSelectedImage(product.heroImage);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    showToast(`Added to Bag`, `${quantity}× ${product.name}`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    showToast(
      added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      product.name,
      'gold'
    );
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id);
  const productReviews = REVIEWS.filter((r) => r.productSlug === product.slug);

  return (
    <div className="py-10 pb-28 lg:pb-10 bg-ivory min-h-screen text-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-burgundy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-dark" />
          <Link to="/shop" className="hover:text-burgundy transition-colors">
            Boutique
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-dark" />
          <span className="text-burgundy font-semibold">{product.name}</span>
        </nav>

        {/* Top Product View: Gallery + Sticky Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 lg:mb-24">
          {/* Left Gallery (6 Columns on Desktop) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative h-[280px] sm:h-[350px] lg:h-[420px] xl:h-[430px] aspect-[4/5] mx-auto bg-porcelain border border-taupe rounded-sm overflow-hidden shadow-luxury flex items-center justify-center p-3.5 sm:p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-burgundy text-cream border border-burgundy-wine/40 text-xs font-medium uppercase tracking-wider px-3 py-0.5 rounded-sm shadow-sm font-mono">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-2.5 overflow-x-auto pb-1 scrollbar-none justify-center mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-sm overflow-hidden border flex-shrink-0 transition-all p-0.5 bg-porcelain ${
                    selectedImage === img.url
                      ? 'border-burgundy shadow-burgundy-glow scale-95 opacity-100'
                      : 'border-taupe hover:border-burgundy/40 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${img.caption}`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Sticky Buy Box (6 Columns on Desktop) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
            <div>
              <div className="flex items-center space-x-2 text-xs text-burgundy-wine mb-2 font-mono">
                <span className="uppercase tracking-widest font-semibold">{product.scentFamily}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-champagne text-champagne" />
                  <span className="font-semibold text-espresso">{product.rating}</span>
                  <span className="text-charcoal-muted">({product.reviewCount} connoisseurs)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs uppercase tracking-wider text-charcoal-muted mt-1 font-light">
                {product.subtitle}
              </p>

              {/* Price Block */}
              <div className="flex items-baseline space-x-3 mt-4">
                <span className="text-3xl font-serif text-espresso font-semibold">₹{product.price}</span>
                <span className="text-base text-charcoal-light line-through">₹{product.originalPrice}</span>
                <span className="text-xs px-2.5 py-0.5 bg-burgundy/10 text-burgundy border border-burgundy/25 rounded font-medium font-mono">
                  Save ₹{product.originalPrice - product.price} (22% Off)
                </span>
              </div>

              <div className="text-xs text-charcoal-muted mt-2 flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-champagne" />
                <span>Complimentary White Glove Delivery on orders over ₹999</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-light border-t border-taupe/60 pt-4">
              {product.longDescription}
            </p>

            {/* Hardware Key Highlights */}
            <div className="space-y-2.5 py-4 border-y border-taupe/60 text-xs text-charcoal">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>{product.duration}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Layers className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>FSC-Certified Porous Beech Wood Cap & Sliding Suspension Bead</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Droplets className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>Faceted Borosilicate Crystal Flacon & Silicone Seal</span>
              </div>
            </div>

            {/* Quantity Selector & Add Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-taupe rounded-sm bg-porcelain shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-mono text-espresso font-semibold min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all ${
                    isAdded ? 'bg-emerald-600 text-white' : ''
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag &bull; ₹{product.price * quantity}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3.5 border rounded-sm transition-colors ${
                    isFavorited
                      ? 'border-burgundy bg-burgundy/10 text-burgundy'
                      : 'border-taupe text-charcoal hover:text-burgundy hover:border-burgundy bg-porcelain'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-burgundy' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-outline-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 font-semibold"
              >
                <span>Instant White Glove Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Assurance Grid */}
            <div className="pt-4 border-t border-taupe/60 grid grid-cols-2 gap-3 text-[11px] text-charcoal-muted">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>100% Leak-Proof Travel Plug</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>30-Day Freshness Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Olfactory Notes, How To Use, Specifications, Reviews */}
        <div className="mb-24 bg-porcelain border border-taupe rounded-sm p-6 sm:p-10 shadow-luxury">
          {/* Tab Navigation */}
          <div className="flex border-b border-taupe space-x-8 mb-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('notes')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'notes' ? 'text-burgundy font-semibold' : 'text-charcoal hover:text-burgundy'
              }`}
            >
              <span>Olfactory Notes</span>
              {activeTab === 'notes' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-burgundy rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'howToUse' ? 'text-burgundy font-semibold' : 'text-charcoal hover:text-burgundy'
              }`}
            >
              <span>How To Use Guide</span>
              {activeTab === 'howToUse' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-burgundy rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'specs' ? 'text-burgundy font-semibold' : 'text-charcoal hover:text-burgundy'
              }`}
            >
              <span>Specifications</span>
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-burgundy rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'reviews' ? 'text-burgundy font-semibold' : 'text-charcoal hover:text-burgundy'
              }`}
            >
              <span>Reviews ({productReviews.length || product.reviewCount})</span>
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-burgundy rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content: Scent Notes Pyramid */}
          {activeTab === 'notes' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-cream border border-taupe rounded-sm hover:border-burgundy/40 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-burgundy block font-semibold mb-2 font-mono">
                    Top Notes • Initial Aura (0–15 Mins)
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal">
                    {product.topNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-cream border border-taupe rounded-sm hover:border-burgundy/40 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-burgundy block font-semibold mb-2 font-mono">
                    Heart Notes • Core Sillage (15 Mins–4 Hours)
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal">
                    {product.heartNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-cream border border-taupe rounded-sm hover:border-burgundy/40 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-burgundy block font-semibold mb-2 font-mono">
                    Base Notes • Enduring Drydown (Up to 30 Days)
                  </span>
                  <ul className="space-y-2 text-xs text-charcoal">
                    {product.baseNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-sand-light border border-taupe rounded-sm">
                <h4 className="font-serif text-base text-espresso mb-2">Fragrance Architecture Rationale</h4>
                <p className="text-xs text-charcoal leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* Tab Content: How To Use Step-by-Step */}
          {activeTab === 'howToUse' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.howToUseSteps.map((s) => (
                  <div key={s.step} className="p-6 bg-cream border border-taupe rounded-sm hover:border-burgundy/40 transition-all">
                    <div className="w-8 h-8 rounded-full bg-burgundy text-cream flex items-center justify-center text-xs font-mono font-bold mb-4 shadow-sm">
                      0{s.step}
                    </div>
                    <h4 className="font-serif text-base text-espresso mb-2">{s.title}</h4>
                    <p className="text-xs text-charcoal leading-relaxed font-light">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-sand-light border border-taupe rounded-sm text-xs text-charcoal text-center font-light">
                <strong className="text-burgundy font-semibold">Pro Tip:</strong> Re-invert the bottle for 2 seconds every 10–14 days to reactivate optimal scent bloom across the wooden fibers.
              </div>
            </div>
          )}

          {/* Tab Content: Specifications */}
          {activeTab === 'specs' && (
            <div className="animate-fade-in">
              <div className="divide-y divide-taupe max-w-2xl">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="py-3.5 flex justify-between text-xs">
                    <span className="text-charcoal-muted uppercase tracking-wider">{spec.label}</span>
                    <span className="text-espresso font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              {productReviews.length === 0 ? (
                <div className="text-center py-8 text-charcoal-muted text-xs">
                  Be the first connoisseur to review {product.name}.
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-cream border border-taupe rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-champagne">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-champagne" />
                        ))}
                      </div>
                      <span className="text-[11px] text-charcoal-muted font-mono">{rev.date}</span>
                    </div>
                    <h4 className="font-serif text-base text-espresso">{rev.title}</h4>
                    <p className="text-xs text-charcoal leading-relaxed">{rev.content}</p>
                    <div className="pt-2 text-[11px] text-charcoal-muted">
                      {rev.author} &bull; Verified Owner &bull; {rev.vehicle}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Related Fragrances */}
        <div className="border-t border-taupe/60 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl text-espresso font-normal mt-1">
                You May Also Admire
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} isRecommendation />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Bag Bar (Shows on mobile viewports) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-taupe px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3 min-w-0 pr-3">
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-sm border border-taupe shrink-0 bg-porcelain"
          />
          <div className="min-w-0">
            <h4 className="font-serif text-xs text-espresso truncate">{product.name}</h4>
            <span className="text-xs text-burgundy font-mono font-semibold">₹{product.price}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`btn-gold py-2.5 px-4 text-xs tracking-wider uppercase shrink-0 flex items-center space-x-1.5 shadow-burgundy-glow transition-all ${
            isAdded ? 'bg-emerald-600 text-white' : ''
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
