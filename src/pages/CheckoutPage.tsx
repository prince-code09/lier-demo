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
        colors: ['#572634', '#713B4A', '#B89550', '#F5F0E9', '#FAF7F2'],
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
      <div className="py-24 bg-ivory min-h-[70vh] min-h-[70dvh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-cream border border-taupe/60 flex items-center justify-center text-charcoal-muted mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-charcoal-muted" />
          </div>
          <h2 className="font-serif text-2xl text-espresso mb-2">No Active Order</h2>
          <p className="text-xs text-charcoal-muted mb-6 font-light">
            Your shopping bag is empty. Select your desired car perfume to proceed to checkout.
          </p>
          <Link to="/shop" className="btn-gold text-xs tracking-widest uppercase py-3 px-6">
            Return to Boutique
          </Link>
        </div>
      </div>
    );
  }

  // Order Confirmation Screen
  if (orderConfirmed) {
    return (
      <div className="py-16 bg-ivory min-h-screen text-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-burgundy/10 border-2 border-burgundy flex items-center justify-center text-burgundy mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-ultra text-burgundy font-serif font-semibold">
            Acquisition Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso font-normal mt-2 mb-3">
            Thank You For Choosing LIER
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-light leading-relaxed">
            Your bespoke automotive fragrance order has been received at our dispatch atelier in Mumbai.
          </p>

          {/* Order Details Receipt Box */}
          <div className="bg-porcelain border border-taupe/60 rounded-sm p-6 sm:p-8 text-left space-y-6 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-taupe/40 gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Order Reference Code</span>
                <span className="font-serif text-lg text-burgundy font-bold tracking-wider">{orderId}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Delivery Mode</span>
                <span className="text-xs text-espresso font-medium">
                  {shippingMethod === 'express' ? 'Express White Glove (48-72h)' : 'Standard Ground Courier'}
                </span>
              </div>
            </div>

            {/* Purchased Items Breakdown */}
            <div className="space-y-3 pb-4 border-b border-taupe/40">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Acquired Items</span>
              <div className="divide-y divide-taupe/40">
                {purchasedItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={product.heroImage} alt={product.name} className="w-10 h-12 object-cover rounded-sm border border-taupe/40" />
                      <div>
                        <div className="font-serif text-espresso">{product.name}</div>
                        <div className="text-[10px] text-charcoal-muted">Qty: {quantity} &times; ₹{product.price}</div>
                      </div>
                    </div>
                    <span className="font-serif text-burgundy font-semibold">₹{product.price * quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">Destination Address</span>
              <p className="text-espresso font-medium">{shippingDetails.firstName} {shippingDetails.lastName}</p>
              <p className="text-charcoal-muted">{shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state} &mdash; {shippingDetails.postalCode}</p>
              <p className="text-charcoal-muted/80">Contact: {shippingDetails.email} &bull; {shippingDetails.phone}</p>
            </div>

            <div className="pt-4 border-t border-taupe/40 flex justify-between items-center text-xs">
              <span className="text-charcoal-muted">Total Investment Authorized:</span>
              <span className="font-serif text-xl text-burgundy font-bold">₹{purchasedTotal}</span>
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
            <Link to="/" className="btn-gold text-xs tracking-widest uppercase py-3.5 px-8 w-full sm:w-auto">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-ivory min-h-screen text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-charcoal-muted uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-burgundy transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/cart" className="hover:text-burgundy transition-colors">Bag</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-medium">Checkout Simulation</span>
        </nav>

        {/* Demo Simulation Warning Pill */}
        <div className="mb-8 p-3.5 bg-burgundy/10 border border-burgundy/20 rounded-sm text-center flex items-center justify-center space-x-2 text-xs text-burgundy">
          <Sparkles className="w-4 h-4 text-burgundy flex-shrink-0" />
          <span>
            <strong>Client Demo Presentation Mode:</strong> This checkout process simulates the end-to-end luxury e-commerce journey. Zero real financial charges will occur.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Multi-Step Checkout Form (7 Columns) */}
          <div className="lg:col-span-7 bg-porcelain border border-taupe/60 rounded-sm p-6 sm:p-10 shadow-sm space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-taupe/40 text-xs overflow-x-auto gap-2">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center space-x-1.5 sm:space-x-2 font-medium uppercase tracking-wider transition-colors shrink-0 ${
                  step === 1 ? 'text-burgundy' : 'text-charcoal-muted hover:text-espresso'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] shrink-0 ${
                  step === 1 ? 'border-burgundy bg-burgundy/10 text-burgundy font-semibold' : 'border-taupe/60 text-charcoal-muted'
                }`}>
                  1
                </span>
                <span><span className="hidden sm:inline">Shipping </span>Address</span>
              </button>
              <div className="w-4 sm:w-8 h-[1px] bg-taupe/40 shrink-0" />
              <button
                onClick={() => setStep(2)}
                className={`flex items-center space-x-1.5 sm:space-x-2 font-medium uppercase tracking-wider transition-colors shrink-0 ${
                  step === 2 ? 'text-burgundy' : 'text-charcoal-muted hover:text-espresso'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] shrink-0 ${
                  step === 2 ? 'border-burgundy bg-burgundy/10 text-burgundy font-semibold' : 'border-taupe/60 text-charcoal-muted'
                }`}>
                  2
                </span>
                <span>Delivery<span className="hidden sm:inline"> Option</span></span>
              </button>
              <div className="w-4 sm:w-8 h-[1px] bg-taupe/40 shrink-0" />
              <button
                onClick={() => setStep(3)}
                className={`flex items-center space-x-1.5 sm:space-x-2 font-medium uppercase tracking-wider transition-colors shrink-0 ${
                  step === 3 ? 'text-burgundy' : 'text-charcoal-muted hover:text-espresso'
                }`}
              >
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] shrink-0 ${
                  step === 3 ? 'border-burgundy bg-burgundy/10 text-burgundy font-semibold' : 'border-taupe/60 text-charcoal-muted'
                }`}>
                  3
                </span>
                <span>Payment<span className="hidden sm:inline"> Preview</span></span>
              </button>
            </div>

            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif text-xl text-espresso">Client Delivery Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">First Name</label>
                    <input
                      type="text"
                      value={shippingDetails.firstName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, firstName: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">Last Name</label>
                    <input
                      type="text"
                      value={shippingDetails.lastName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, lastName: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">Email Address</label>
                    <input
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">Mobile Contact</label>
                    <input
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">City</label>
                    <input
                      type="text"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">State</label>
                    <input
                      type="text"
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-charcoal-muted mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-3.5 py-2 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase mt-4 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Delivery Option</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Delivery Options */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif text-xl text-espresso">Select Delivery Mode</h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-taupe/60 bg-cream hover:border-taupe'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-burgundy" />
                        <div>
                          <div className="text-xs font-medium text-espresso">Express White Glove Delivery</div>
                          <div className="text-[11px] text-charcoal-muted">Insured express transit within 48&ndash;72 hours</div>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-700 font-serif font-medium">
                        {subtotal >= 999 ? 'COMPLIMENTARY' : '₹99'}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-taupe/60 bg-cream hover:border-taupe'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <PackageCheck className="w-5 h-5 text-charcoal-muted" />
                        <div>
                          <div className="text-xs font-medium text-espresso">Standard Courier Delivery</div>
                          <div className="text-[11px] text-charcoal-muted">Regular ground courier within 4&ndash;5 business days</div>
                        </div>
                      </div>
                      <span className="text-xs text-charcoal-muted font-serif">
                        {subtotal >= 999 ? 'COMPLIMENTARY' : '₹49'}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-taupe/60 text-charcoal-muted hover:text-espresso bg-cream py-3 px-6 text-xs uppercase tracking-wider rounded-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 btn-gold py-3 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
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
                <h3 className="font-serif text-xl text-espresso">Select Simulated Payment Method</h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-taupe/60 bg-cream hover:border-taupe'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-burgundy" />
                      <div>
                        <div className="text-xs font-medium text-espresso">Instant UPI / QR Code (Simulated)</div>
                        <div className="text-[11px] text-charcoal-muted">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-taupe/60 bg-cream hover:border-taupe'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-charcoal-muted" />
                      <div>
                        <div className="text-xs font-medium text-espresso">Luxury Credit / Debit Card (Simulated)</div>
                        <div className="text-[11px] text-charcoal-muted">Visa, Mastercard, American Express, RuPay</div>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-taupe/60 bg-cream hover:border-taupe'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-charcoal-muted" />
                      <div>
                        <div className="text-xs font-medium text-espresso">Cash / Pay on White Glove Delivery</div>
                        <div className="text-[11px] text-charcoal-muted">Pay via UPI or Cash upon physical arrival</div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-cream border border-taupe/40 rounded-sm text-xs text-charcoal-muted leading-relaxed font-light">
                  <ShieldCheck className="w-4 h-4 text-burgundy inline mr-1.5" />
                  By confirming, you complete this demo simulation order. No real payment gateway will be charged.
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-taupe/60 text-charcoal-muted hover:text-espresso bg-cream py-3 px-6 text-xs uppercase tracking-wider rounded-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-gold py-4 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Place Order &bull; ₹{total}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary (5 Columns) */}
          <div className="lg:col-span-5 bg-porcelain border border-taupe/60 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl text-espresso">Order Summary ({items.length} items)</h3>

            <div className="divide-y divide-taupe/40 max-h-80 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex items-center space-x-4">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-sm border border-taupe/40"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-xs text-espresso leading-snug">{product.name}</h4>
                    <span className="text-[10px] text-charcoal-muted block font-light">{product.volume}</span>
                    <span className="text-xs text-burgundy font-serif">Qty: {quantity} &times; ₹{product.price}</span>
                  </div>
                  <div className="text-xs font-serif text-espresso font-medium">
                    ₹{product.price * quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-charcoal-muted border-t border-taupe/40 pt-4">
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
                <span>White Glove Shipping</span>
                <span className="text-espresso font-serif font-medium">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-medium font-sans">Complimentary</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-espresso pt-2 border-t border-taupe/60">
                <span>Grand Total</span>
                <span className="font-serif text-xl text-burgundy font-medium">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
