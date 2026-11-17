import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="py-24 bg-ivory min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-cream border border-taupe/60 flex items-center justify-center text-charcoal-muted mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-charcoal-muted" />
          </div>
          <h1 className="font-serif text-3xl text-espresso font-normal mb-3">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mb-8 leading-relaxed font-light">
            Indulge your driving senses with our handcrafted botanical car perfumes. Explore the collection to begin your olfactory journey.
          </p>
          <Link to="/shop" className="btn-gold text-xs tracking-widest uppercase py-3.5 px-8">
            Explore The Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-ivory min-h-screen text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
            Review Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal mt-1">
            Your Selected Fragrances
          </h1>
        </div>

        {/* Free Shipping Meter Banner */}
        <div className="bg-porcelain border border-taupe/60 rounded-sm p-4 mb-8">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-charcoal flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-burgundy" />
              <span>
                {freeShippingRemaining > 0 ? (
                  <>
                    Add <strong className="text-burgundy font-serif font-medium">₹{freeShippingRemaining}</strong> more for complimentary delivery
                  </>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    Unlocked: Complimentary White Glove Delivery
                  </span>
                )}
              </span>
            </span>
            <span className="text-charcoal-muted font-serif text-xs font-medium">{progressPercent}%</span>
          </div>
          <div className="w-full bg-beige h-2 rounded-full overflow-hidden">
            <div
              className="bg-burgundy h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Cart Items Table (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="divide-y divide-taupe/40 bg-porcelain border border-taupe/60 rounded-sm">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Image */}
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-24 h-28 bg-cream rounded-sm overflow-hidden flex-shrink-0 border border-taupe/40"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-serif text-lg text-espresso hover:text-burgundy transition-colors"
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs text-charcoal-muted mt-0.5">{product.subtitle}</div>
                    <div className="text-xs text-burgundy font-serif font-medium mt-1">₹{product.price} each</div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-taupe/60 rounded-sm bg-cream">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 text-charcoal-muted hover:text-espresso"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-serif text-espresso font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 text-charcoal-muted hover:text-espresso"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="text-right sm:min-w-24 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                    <div className="font-serif text-base text-espresso font-medium">
                      ₹{product.price * quantity}
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-charcoal-muted hover:text-burgundy transition-colors p-1.5 mt-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link
                to="/shop"
                className="text-xs uppercase tracking-widest text-charcoal-muted hover:text-burgundy transition-colors font-medium"
              >
                &larr; Continue Exploring Fragrances
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Box (4 Columns) */}
          <div className="lg:col-span-4 bg-porcelain border border-taupe/60 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl text-espresso">Order Summary</h3>

            {/* Promo Input */}
            <div className="space-y-2">
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-burgundy/10 border border-burgundy/20 rounded px-3 py-2 text-xs">
                  <span className="text-burgundy flex items-center space-x-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-burgundy" />
                    <span>Privilege Code <strong>{appliedPromo}</strong></span>
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-charcoal-muted hover:text-espresso underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code (LIER10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-xs text-espresso uppercase placeholder-charcoal-muted/60 focus:outline-none focus:border-burgundy"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-burgundy hover:bg-wine text-cream border border-burgundy/20 text-xs uppercase tracking-wider font-medium transition-colors rounded-sm"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoFeedback && (
                <p className={`text-[11px] ${promoFeedback.success ? 'text-emerald-700' : 'text-burgundy font-medium'}`}>
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Calculation Lines */}
            <div className="space-y-2.5 text-xs text-charcoal-muted border-t border-taupe/40 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-espresso font-serif font-medium">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-burgundy font-medium">
                  <span>Privilege Discount</span>
                  <span className="font-serif">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-espresso font-serif font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-medium font-sans">Complimentary</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-espresso pt-3 border-t border-taupe/60">
                <span>Grand Total</span>
                <span className="font-serif text-xl text-burgundy font-medium">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-gold py-4 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal-muted/80 text-center pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-burgundy" />
              <span>Simulated Demo Transaction &bull; IFRA Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
