import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Sparkles,
  ArrowRight,
  PackageCheck,
  ShoppingBag,
  Printer,
  ChevronRight,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, shippingFee, total, clearCart } = useCart();

  const [step, setStep] = useState<number>(1);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: 'Vikram',
    lastName: 'Singhania',
    email: 'vikram.singhania@example.com',
    phone: '+91 98200 12345',
    address: 'Flat 14B, Altamount Luxury Towers, Altamount Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400026',
  });
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [purchasedItems, setPurchasedItems] = useState<typeof items>([]);
  const [purchasedTotal, setPurchasedTotal] = useState(0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `LIER-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setPurchasedItems([...items]);
    setPurchasedTotal(total);
    setOrderConfirmed(true);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5C07B', '#FCF9F2', '#2A2A35'],
      });
    } catch {
      // safe fallback
    }

    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="py-24 bg-obsidian-950 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-obsidian-900 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="font-serif text-2xl text-white mb-2">No Active Order</h2>
          <p className="text-xs text-zinc-400 mb-6 font-light">
            Your shopping bag is empty. Select your desired car perfume to proceed to checkout.
          </p>
          <Link to="/shop" className="btn-gold text-xs tracking-widest uppercase py-3 px-6 shadow-gold-glow">
            Return to Boutique
          </Link>
        </div>
      </div>
    );
  }

  // Order Confirmation Screen
  if (orderConfirmed) {
    return (
      <div className="py-16 bg-obsidian-950 min-h-screen text-alabaster">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-400 mx-auto mb-6 shadow-gold-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-ultra text-gold-400 font-mono font-semibold">
            Acquisition Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 mb-3">
            Thank You For Choosing LIER
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mb-8 font-light leading-relaxed">
            Your bespoke automotive fragrance order has been received at our dispatch atelier in Mumbai.
          </p>

          {/* Order Details Receipt Box */}
          <div className="bg-obsidian-900 border border-gold-400/30 rounded-sm p-6 sm:p-8 text-left space-y-6 shadow-luxury mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">Order Reference Code</span>
                <span className="font-mono text-lg text-gold-300 font-bold tracking-wider">{orderId}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">Delivery Mode</span>
                <span className="text-xs text-white font-medium">
                  {shippingMethod === 'express' ? 'Express White Glove (48-72h)' : 'Standard Ground Courier'}
                </span>
              </div>
            </div>

            {/* Purchased Items Breakdown */}
            <div className="space-y-3 pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">Acquired Items</span>
              <div className="divide-y divide-white/5">
                {purchasedItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={product.heroImage} alt={product.name} className="w-10 h-12 object-cover rounded-sm border border-white/10" />
                      <div>
                        <div className="font-serif text-white">{product.name}</div>
                        <div className="text-[10px] text-zinc-400">Qty: {quantity} &times; ₹{product.price}</div>
                      </div>
                    </div>
                    <span className="font-mono text-gold-300 font-semibold">₹{product.price * quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">Destination Address</span>
              <p className="text-zinc-200 font-medium">{shippingDetails.firstName} {shippingDetails.lastName}</p>
              <p className="text-zinc-400">{shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state} &mdash; {shippingDetails.postalCode}</p>
              <p className="text-zinc-500">Contact: {shippingDetails.email} &bull; {shippingDetails.phone}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-zinc-400">Total Investment Authorized:</span>
              <span className="font-serif text-xl text-gold-400 font-bold">₹{purchasedTotal}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handlePrint}
              className="btn-outline-gold text-xs tracking-widest uppercase py-3.5 px-6 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
            <Link to="/" className="btn-gold text-xs tracking-widest uppercase py-3.5 px-8 w-full sm:w-auto shadow-gold-glow">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-obsidian-950 min-h-screen text-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-500 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/cart" className="hover:text-gold-400 transition-colors">Bag</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold-300 font-medium">Checkout Simulation</span>
        </nav>

        {/* Demo Simulation Warning Pill */}
        <div className="mb-8 p-3.5 bg-gold-500/10 border border-gold-400/30 rounded-sm text-center flex items-center justify-center space-x-2 text-xs text-gold-300">
          <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span>
            <strong>Client Demo Presentation Mode:</strong> This checkout process simulates the end-to-end luxury e-commerce journey. Zero real financial charges will occur.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Multi-Step Checkout Form (7 Columns) */}
          <div className="lg:col-span-7 bg-obsidian-900 border border-white/10 rounded-sm p-6 sm:p-10 shadow-luxury space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center space-x-2 font-medium uppercase tracking-wider transition-colors ${
                  step === 1 ? 'text-gold-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
                  step === 1 ? 'border-gold-400 bg-gold-500/20 text-gold-300' : 'border-white/20'
                }`}>
                  1
                </span>
                <span>Shipping Address</span>
              </button>
              <div className="w-8 h-[1px] bg-white/10" />
              <button
                onClick={() => setStep(2)}
                className={`flex items-center space-x-2 font-medium uppercase tracking-wider transition-colors ${
                  step === 2 ? 'text-gold-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
                  step === 2 ? 'border-gold-400 bg-gold-500/20 text-gold-300' : 'border-white/20'
                }`}>
                  2
                </span>
                <span>Delivery Option</span>
              </button>
              <div className="w-8 h-[1px] bg-white/10" />
              <button
                onClick={() => setStep(3)}
                className={`flex items-center space-x-2 font-medium uppercase tracking-wider transition-colors ${
                  step === 3 ? 'text-gold-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
                  step === 3 ? 'border-gold-400 bg-gold-500/20 text-gold-300' : 'border-white/20'
                }`}>
                  3
                </span>
                <span>Payment Preview</span>
              </button>
            </div>

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif text-xl text-white">Client Delivery Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">First Name</label>
                    <input
                      type="text"
                      value={shippingDetails.firstName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, firstName: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={shippingDetails.lastName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, lastName: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">City</label>
                    <input
                      type="text"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">State</label>
                    <input
                      type="text"
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase mt-4 flex items-center justify-center space-x-2 shadow-gold-glow"
                >
                  <span>Continue to Delivery Option</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Delivery Options */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif text-xl text-white">Select Delivery Mode</h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-white/10 bg-obsidian-850 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-gold-400" />
                        <div>
                          <div className="text-xs font-medium text-white">Express White Glove Delivery</div>
                          <div className="text-[11px] text-zinc-400">Insured express transit within 48&ndash;72 hours</div>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono font-medium">
                        {subtotal >= 999 ? 'COMPLIMENTARY' : '₹99'}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-white/10 bg-obsidian-850 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <PackageCheck className="w-5 h-5 text-zinc-400" />
                        <div>
                          <div className="text-xs font-medium text-white">Standard Courier Delivery</div>
                          <div className="text-[11px] text-zinc-400">Regular ground courier within 4&ndash;5 business days</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">
                        {subtotal >= 999 ? 'COMPLIMENTARY' : '₹49'}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-dark py-3 px-6 text-xs uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 btn-gold py-3 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-gold-glow"
                  >
                    <span>Proceed to Payment Simulation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Simulation */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-fade-in">
                <h3 className="font-serif text-xl text-white">Select Simulated Payment Method</h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-white/10 bg-obsidian-850 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Instant UPI / QR Code (Simulated)</div>
                        <div className="text-[11px] text-zinc-400">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-white/10 bg-obsidian-850 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-zinc-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Luxury Credit / Debit Card (Simulated)</div>
                        <div className="text-[11px] text-zinc-400">Visa, Mastercard, American Express, RuPay</div>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold-400 bg-gold-500/10'
                        : 'border-white/10 bg-obsidian-850 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-zinc-400" />
                      <div>
                        <div className="text-xs font-medium text-white">Cash / Pay on White Glove Delivery</div>
                        <div className="text-[11px] text-zinc-400">Pay via UPI or Cash upon physical arrival</div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-obsidian-950 border border-white/5 rounded-sm text-xs text-zinc-400 leading-relaxed font-light">
                  <ShieldCheck className="w-4 h-4 text-gold-400 inline mr-1.5" />
                  By confirming, you complete this demo simulation order. No real payment gateway will be charged.
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-dark py-3 px-6 text-xs uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-gold py-4 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-gold-glow"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Place Order &bull; ₹{total}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary (5 Columns) */}
          <div className="lg:col-span-5 bg-obsidian-900 border border-white/10 rounded-sm p-6 sm:p-8 space-y-6 shadow-luxury">
            <h3 className="font-serif text-xl text-white">Order Summary ({items.length} items)</h3>

            <div className="divide-y divide-white/5 max-h-80 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center space-x-4">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-sm border border-white/10"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-xs text-white leading-snug">{product.name}</h4>
                    <span className="text-[10px] text-zinc-400 block font-light">{product.volume}</span>
                    <span className="text-xs text-gold-400 font-mono">Qty: {quantity} &times; ₹{product.price}</span>
                  </div>
                  <div className="text-xs font-mono text-white font-medium">
                    ₹{product.price * quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-zinc-400 border-t border-white/10 pt-4">
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
                <span>White Glove Shipping</span>
                <span className="text-white font-mono">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-medium">Complimentary</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-white/5">
                <span>Grand Total</span>
                <span className="font-serif text-xl text-gold-400">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
