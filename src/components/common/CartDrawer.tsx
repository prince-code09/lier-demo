import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    items,
    addItem,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalItems,
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

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Cross-sell candidate: find a product not currently in the cart
  const crossSellProduct = PRODUCTS.find(
    (p) => !items.some((item) => item.product.id === p.id)
  ) || PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-cream border-l border-taupe shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-taupe flex items-center justify-between bg-porcelain">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-burgundy" />
              <h2 className="text-sm sm:text-base uppercase tracking-widest font-serif text-espresso font-normal">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors rounded hover:bg-sand-light"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-sand-light border-b border-taupe/60 px-6 py-3.5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-charcoal flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>
                  {freeShippingRemaining > 0 ? (
                    <>
                      Add <strong className="text-burgundy font-mono font-semibold">₹{freeShippingRemaining}</strong> more for complimentary delivery
                    </>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      Unlocked: Complimentary White Glove Delivery
                    </span>
                  )}
                </span>
              </span>
              <span className="text-charcoal-muted font-mono text-[11px] font-medium">{progressPercent}%</span>
            </div>
            <div className="w-full bg-taupe/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-burgundy h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-sand-light border border-taupe flex items-center justify-center text-charcoal-muted mb-4">
                  <ShoppingBag className="w-8 h-8 text-burgundy/60" />
                </div>
                <h3 className="font-serif text-lg text-espresso mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-charcoal-muted max-w-xs mb-6 font-light">
                  Explore our signature automotive fragrances crafted with noble natural oils and sustainable beech wood.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-gold text-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex space-x-4 pb-4 border-b border-taupe/60 last:border-0 last:pb-0"
                    >
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 bg-porcelain border border-taupe rounded-sm overflow-hidden flex-shrink-0 relative group"
                      >
                        <img
                          src={product.heroImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <Link
                              to={`/product/${product.slug}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-sm text-espresso hover:text-burgundy transition-colors font-normal"
                            >
                              {product.name}
                            </Link>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal-muted hover:text-red-600 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-charcoal-muted mt-0.5">{product.volume}</div>
                          <div className="text-xs text-burgundy font-mono font-semibold mt-1">₹{product.price}</div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-taupe rounded-sm bg-porcelain shadow-sm">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono text-espresso font-semibold min-w-[1.5rem] text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-charcoal hover:text-burgundy transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs font-mono text-espresso font-semibold">
                            ₹{product.price * quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Complementary Add-on suggestion */}
                {crossSellProduct && freeShippingRemaining > 0 && (
                  <div className="p-3.5 bg-porcelain border border-taupe rounded-sm shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={crossSellProduct.heroImage}
                          alt={crossSellProduct.name}
                          className="w-10 h-12 object-cover rounded-sm border border-taupe bg-cream"
                        />
                        <div>
                          <div className="text-xs font-serif text-espresso font-normal">{crossSellProduct.name}</div>
                          <div className="text-[10px] text-burgundy font-mono font-semibold">₹{crossSellProduct.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addItem(crossSellProduct, 1)}
                        className="px-2.5 py-1 bg-burgundy hover:bg-burgundy-hover text-cream font-semibold text-[10px] uppercase tracking-wider rounded-sm transition-colors shadow-sm"
                      >
                        + Add & Free Ship
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && (
            <div className="p-6 bg-porcelain border-t border-taupe space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-burgundy/10 border border-burgundy/30 rounded px-3 py-2 text-xs">
                    <span className="text-burgundy flex items-center space-x-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-champagne" />
                      <span>Privilege Code <strong>{appliedPromo}</strong> applied</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-charcoal-muted hover:text-burgundy text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (LIER10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-cream border border-taupe rounded-sm px-3 py-2 text-xs text-espresso uppercase placeholder-charcoal-light focus:outline-none focus:border-burgundy"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-sand-light border border-taupe text-espresso hover:bg-burgundy hover:text-cream transition-colors rounded-sm"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p className={`text-[11px] mt-1.5 ${promoFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-espresso font-mono font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-burgundy">
                    <span>Privilege Discount</span>
                    <span className="font-mono font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-espresso font-mono">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-semibold">Complimentary</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-espresso pt-2 border-t border-taupe/60">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl text-burgundy font-semibold">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-burgundy-glow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 text-center text-xs tracking-wider uppercase text-charcoal hover:text-burgundy transition-colors font-medium"
                >
                  View Full Cart Details
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-charcoal-light pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>Simulated Secure Demo Checkout &bull; IFRA Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
