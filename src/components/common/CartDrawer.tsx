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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="text-sm sm:text-base uppercase tracking-widest font-serif text-white">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white transition-colors rounded"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-obsidian-900/90 border-b border-white/5 px-6 py-3.5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  {freeShippingRemaining > 0 ? (
                    <>
                      Add <strong className="text-gold-300 font-mono">₹{freeShippingRemaining}</strong> more for complimentary delivery
                    </>
                  ) : (
                    <span className="text-emerald-400 font-medium">
                      Unlocked: Complimentary White Glove Delivery
                    </span>
                  )}
                </span>
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold-500 to-gold-300 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-obsidian-850 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
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
                      className="flex space-x-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 bg-obsidian-850 border border-white/10 rounded-sm overflow-hidden flex-shrink-0 relative group"
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
                              className="font-serif text-sm text-white hover:text-gold-300 transition-colors"
                            >
                              {product.name}
                            </Link>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-red-400 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{product.volume}</div>
                          <div className="text-xs text-gold-400 font-mono font-medium mt-1">₹{product.price}</div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/15 rounded-sm bg-obsidian-900">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono text-white min-w-[1.5rem] text-center">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs font-mono text-zinc-300 font-semibold">
                            ₹{product.price * quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Complementary Add-on suggestion */}
                {crossSellProduct && freeShippingRemaining > 0 && (
                  <div className="p-3.5 bg-obsidian-900/80 border border-gold-400/20 rounded-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={crossSellProduct.heroImage}
                          alt={crossSellProduct.name}
                          className="w-10 h-12 object-cover rounded-sm border border-white/10"
                        />
                        <div>
                          <div className="text-xs font-serif text-white">{crossSellProduct.name}</div>
                          <div className="text-[10px] text-gold-400 font-mono">₹{crossSellProduct.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addItem(crossSellProduct, 1)}
                        className="px-2.5 py-1 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-[10px] uppercase tracking-wider rounded-sm transition-colors"
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
            <div className="p-6 bg-obsidian-900/95 border-t border-white/10 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-gold-500/10 border border-gold-400/30 rounded px-3 py-2 text-xs">
                    <span className="text-gold-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>Privilege Code <strong>{appliedPromo}</strong> applied</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-zinc-400 hover:text-white text-xs underline"
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
                      className="flex-1 bg-obsidian-850 border border-white/10 rounded-sm px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs uppercase tracking-wider font-medium bg-obsidian-800 border border-white/20 text-white hover:bg-gold-500 hover:text-obsidian-950 transition-colors rounded-sm"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p className={`text-[11px] mt-1.5 ${promoFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-mono">
                    {shippingFee === 0 ? <span className="text-emerald-400 font-medium">Complimentary</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/5">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl text-gold-400">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-gold-glow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 text-center text-xs tracking-wider uppercase text-zinc-400 hover:text-gold-300 transition-colors"
                >
                  View Full Cart Details
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Simulated Secure Demo Checkout &bull; IFRA Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
