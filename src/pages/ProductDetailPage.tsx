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
    <div className="py-10 pb-28 lg:pb-10 bg-obsidian-950 min-h-screen text-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-500 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gold-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-gold-400 transition-colors">
            Boutique
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold-300 font-medium">{product.name}</span>
        </nav>

        {/* Top Product View: Gallery + Sticky Buy Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 lg:mb-24">
          {/* Left Gallery (6 Columns on Desktop) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative h-[280px] sm:h-[350px] lg:h-[420px] xl:h-[430px] aspect-[4/5] mx-auto bg-obsidian-900/80 border border-white/15 rounded-sm overflow-hidden shadow-luxury flex items-center justify-center p-3.5 sm:p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-obsidian-950/90 backdrop-blur-md text-gold-300 border border-gold-400/30 text-xs font-medium uppercase tracking-wider px-3 py-0.5 rounded-sm shadow-md font-mono">
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
                  className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-sm overflow-hidden border flex-shrink-0 transition-all p-0.5 bg-obsidian-900 ${
                    selectedImage === img.url
                      ? 'border-gold-400 shadow-gold-glow scale-95 opacity-100'
                      : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
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
              <div className="flex items-center space-x-2 text-xs text-gold-400 mb-2 font-mono">
                <span className="uppercase tracking-widest">{product.scentFamily}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewCount} connoisseurs)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs uppercase tracking-wider text-zinc-400 mt-1 font-light">
                {product.subtitle}
              </p>

              {/* Price Block */}
              <div className="flex items-baseline space-x-3 mt-4">
                <span className="text-3xl font-serif text-white font-medium">₹{product.price}</span>
                <span className="text-base text-zinc-500 line-through">₹{product.originalPrice}</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-medium font-mono">
                  Save ₹{product.originalPrice - product.price} (22% Off)
                </span>
              </div>

              <div className="text-xs text-zinc-400 mt-1.5 flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-gold-400" />
                <span>Complimentary White Glove Delivery on orders over ₹999</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light border-t border-white/5 pt-4">
              {product.longDescription}
            </p>

            {/* Hardware Key Highlights */}
            <div className="space-y-2.5 py-4 border-y border-white/5 text-xs text-zinc-300">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{product.duration}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Layers className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>FSC-Certified Porous Beech Wood Cap & Sliding Suspension Bead</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Droplets className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Faceted Borosilicate Crystal Flacon & Silicone Seal</span>
              </div>
            </div>

            {/* Quantity Selector & Add Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/15 rounded-sm bg-obsidian-900">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-mono text-white min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-gold-glow transition-all ${
                    isAdded ? 'bg-emerald-500 text-white' : ''
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
                      ? 'border-gold-400 bg-gold-500/10 text-gold-400'
                      : 'border-white/15 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-gold-400' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-dark py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
              >
                <span>Instant White Glove Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Assurance Grid */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3 text-[11px] text-zinc-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>100% Leak-Proof Travel Plug</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>30-Day Freshness Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Olfactory Notes, How To Use, Specifications, Reviews */}
        <div className="mb-24 bg-obsidian-900/60 border border-white/10 rounded-sm p-6 sm:p-10 shadow-luxury">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 space-x-8 mb-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('notes')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'notes' ? 'text-gold-400 font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Olfactory Notes</span>
              {activeTab === 'notes' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'howToUse' ? 'text-gold-400 font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>How To Use Guide</span>
              {activeTab === 'howToUse' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'specs' ? 'text-gold-400 font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Specifications</span>
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-xs uppercase tracking-widest font-medium pb-3 transition-all relative ${
                activeTab === 'reviews' ? 'text-gold-400 font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Reviews ({productReviews.length || product.reviewCount})</span>
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-400" />
              )}
            </button>
          </div>

          {/* Tab Content: Scent Notes Pyramid */}
          {activeTab === 'notes' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-obsidian-950 border border-white/5 rounded-sm hover:border-gold-400/30 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-gold-400 block font-semibold mb-2 font-mono">
                    Top Notes • Initial Aura (0–15 Mins)
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {product.topNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-obsidian-950 border border-white/5 rounded-sm hover:border-gold-400/30 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-gold-400 block font-semibold mb-2 font-mono">
                    Heart Notes • Core Sillage (15 Mins–4 Hours)
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {product.heartNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-obsidian-950 border border-white/5 rounded-sm hover:border-gold-400/30 transition-all">
                  <span className="text-[10px] uppercase tracking-ultra text-gold-400 block font-semibold mb-2 font-mono">
                    Base Notes • Enduring Drydown (Up to 30 Days)
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {product.baseNotes.map((n, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-obsidian-950/80 border border-gold-400/20 rounded-sm">
                <h4 className="font-serif text-base text-white mb-2">Fragrance Architecture Rationale</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
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
                  <div key={s.step} className="p-6 bg-obsidian-950 border border-white/5 rounded-sm hover:border-gold-400/30 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-xs font-mono font-bold text-gold-300 mb-4">
                      0{s.step}
                    </div>
                    <h4 className="font-serif text-base text-white mb-2">{s.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-obsidian-950 border border-white/10 rounded-sm text-xs text-zinc-400 text-center font-light">
                <strong className="text-gold-300">Pro Tip:</strong> Re-invert the bottle for 2 seconds every 10–14 days to reactivate optimal scent bloom across the wooden fibers.
              </div>
            </div>
          )}

          {/* Tab Content: Specifications */}
          {activeTab === 'specs' && (
            <div className="animate-fade-in">
              <div className="divide-y divide-white/5 max-w-2xl">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="py-3.5 flex justify-between text-xs">
                    <span className="text-zinc-400 uppercase tracking-wider">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              {productReviews.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  Be the first connoisseur to review {product.name}.
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-obsidian-950 border border-white/5 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-gold-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-zinc-500 font-mono">{rev.date}</span>
                    </div>
                    <h4 className="font-serif text-base text-white">{rev.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{rev.content}</p>
                    <div className="pt-2 text-[11px] text-zinc-500">
                      {rev.author} &bull; Verified Owner &bull; {rev.vehicle}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Related Fragrances */}
        <div className="border-t border-white/5 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl text-white font-normal mt-1">
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/95 backdrop-blur-md border-t border-white/10 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3 min-w-0 pr-3">
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-sm border border-white/10 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-serif text-xs text-white truncate">{product.name}</h4>
            <span className="text-xs text-gold-400 font-mono font-semibold">₹{product.price}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`btn-gold py-2.5 px-4 text-xs tracking-wider uppercase shrink-0 flex items-center space-x-1.5 shadow-gold-glow transition-all ${
            isAdded ? 'bg-emerald-500 text-white' : ''
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
