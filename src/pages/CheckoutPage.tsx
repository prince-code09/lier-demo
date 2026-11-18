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
  const { items, subtotal, discount, appliedPromo, shippingFee, total, clearCart } = useCart();

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
  const [purchasedSubtotal, setPurchasedSubtotal] = useState(0);
  const [purchasedDiscount, setPurchasedDiscount] = useState(0);
  const [purchasedAppliedPromo, setPurchasedAppliedPromo] = useState<string | null>(null);
  const [purchasedShippingFee, setPurchasedShippingFee] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState('');
  const [purchasedShippingDetails, setPurchasedShippingDetails] = useState({ ...shippingDetails });
  const [purchasedShippingMethod, setPurchasedShippingMethod] = useState<'express' | 'standard'>('express');
  const [purchasedPaymentMethod, setPurchasedPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `LIER-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeFormatted = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setOrderId(generatedId);
    setPurchasedDate(`${dateFormatted} at ${timeFormatted}`);
    setPurchasedItems([...items]);
    setPurchasedSubtotal(subtotal);
    setPurchasedDiscount(discount);
    setPurchasedAppliedPromo(appliedPromo);
    setPurchasedShippingFee(shippingFee);
    setPurchasedTotal(total);
    setPurchasedShippingDetails({ ...shippingDetails });
    setPurchasedShippingMethod(shippingMethod);
    setPurchasedPaymentMethod(paymentMethod);
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

  // Order Confirmation & Premium Luxury Receipt Screen
  if (orderConfirmed) {
    return (
      <div className="py-12 sm:py-16 bg-ivory min-h-screen text-charcoal print:py-0 print:bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in print:max-w-full print:px-0">
          {/* Success Banner & Confirmation Header (Screen Only) */}
          <div className="text-center mb-8 sm:mb-10 no-print">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-burgundy/10 border-2 border-burgundy flex items-center justify-center text-burgundy mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy" />
            </div>

            <span className="text-[11px] sm:text-xs uppercase tracking-ultra text-burgundy font-mono font-semibold">
              Acquisition Confirmed &bull; Atelier Dispatch Queued
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl text-espresso font-normal mt-2 mb-2">
              Thank You For Choosing LIER
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto font-light leading-relaxed">
              Your bespoke automotive fragrance flacons are being hand-inspected and sealed for White Glove delivery from our Mumbai atelier.
            </p>
          </div>

          {/* Premium Luxury Invoice & Receipt Document */}
          <div className="print-receipt-container bg-porcelain border border-taupe rounded-sm p-6 sm:p-10 text-left shadow-luxury mb-8 print:shadow-none print:border-none print:p-4 print:mb-0">
            {/* 1. Header: Brand Wordmark & Official Document Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-taupe/80 gap-4">
              <div>
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-espresso uppercase font-normal block">
                  LIER
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-burgundy font-mono font-semibold block mt-1">
                  Haute Parfum Automobile
                </span>
                <span className="text-[11px] text-charcoal-muted font-light block mt-0.5">
                  Artisanal Dispatch Atelier &bull; Mumbai, India
                </span>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="inline-block text-[10px] uppercase tracking-wider font-mono font-semibold px-2.5 py-1 bg-burgundy/10 text-burgundy border border-burgundy/20 rounded-sm mb-1.5">
                  Official Acquisition Receipt
                </span>
                <div className="text-xs text-charcoal-muted">
                  Order ID: <span className="font-mono font-bold text-espresso tracking-wide text-xs sm:text-sm">{orderId}</span>
                </div>
                <div className="text-[11px] text-charcoal-muted font-light mt-0.5">
                  Acquisition Date: {purchasedDate}
                </div>
              </div>
            </div>

            {/* 2. Customer, Logistics & Payment Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-taupe/80 text-xs">
              {/* Left Column: Client & Destination Details */}
              <div className="space-y-2 bg-cream/50 p-4 rounded-sm border border-taupe/40">
                <span className="text-[10px] uppercase tracking-wider text-burgundy font-mono font-semibold block">
                  Client & Shipping Destination
                </span>
                <p className="text-sm font-serif font-medium text-espresso">
                  {purchasedShippingDetails.firstName} {purchasedShippingDetails.lastName}
                </p>
                <p className="text-charcoal leading-relaxed font-light">
                  {purchasedShippingDetails.address}<br />
                  {purchasedShippingDetails.city}, {purchasedShippingDetails.state} &mdash; <span className="font-mono font-medium">{purchasedShippingDetails.postalCode}</span>
                </p>
                <div className="pt-1.5 text-[11px] text-charcoal-muted space-y-0.5 border-t border-taupe/40 font-mono">
                  <div>Contact: {purchasedShippingDetails.phone}</div>
                  <div>Email: {purchasedShippingDetails.email}</div>
                </div>
              </div>

              {/* Right Column: Dispatch Protocol & Settlement Status */}
              <div className="space-y-2 bg-cream/50 p-4 rounded-sm border border-taupe/40">
                <span className="text-[10px] uppercase tracking-wider text-burgundy font-mono font-semibold block">
                  Dispatch & Settlement Protocol
                </span>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-[10px] uppercase text-charcoal-muted block">Logistics Tier:</span>
                    <span className="text-xs text-espresso font-medium">
                      {purchasedShippingMethod === 'express'
                        ? 'Express White Glove (Insured 48–72h Transit)'
                        : 'Standard Ground Courier (4–5 Business Days)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-charcoal-muted block">Payment Method:</span>
                    <span className="text-xs text-espresso font-medium">
                      {purchasedPaymentMethod === 'upi'
                        ? 'Instant UPI / QR Settlement'
                        : purchasedPaymentMethod === 'card'
                        ? 'Luxury Credit / Debit Card'
                        : 'Cash / Handover on White Glove Delivery'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-charcoal-muted block">Payment Status:</span>
                    <span className="inline-flex items-center text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {purchasedPaymentMethod === 'cod' ? 'Payable Upon Delivery' : 'Authorized & Confirmed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Acquired Items Breakdown Table */}
            <div className="py-6 border-b border-taupe/80">
              <span className="text-[10px] uppercase tracking-wider text-burgundy font-mono font-semibold block mb-4">
                Acquired Olfactory Curations
              </span>

              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-taupe/50 text-[10px] uppercase tracking-wider text-charcoal-muted font-mono font-semibold">
                <div className="col-span-6">Flacon / Fragrance</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Investment</div>
              </div>

              {/* Item Rows */}
              <div className="divide-y divide-taupe/40">
                {purchasedItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3.5 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 items-start sm:items-center text-xs">
                    <div className="col-span-6 flex items-center space-x-3 w-full mb-2 sm:mb-0">
                      <img
                        src={product.heroImage}
                        alt={product.name}
                        className="w-12 h-14 object-contain rounded-sm border border-taupe/60 bg-cream p-1 shrink-0"
                      />
                      <div>
                        <div className="font-serif text-sm text-espresso font-medium">{product.name}</div>
                        <div className="text-[11px] text-charcoal-muted font-light">{product.subtitle}</div>
                        <div className="text-[10px] text-burgundy font-mono font-semibold sm:hidden mt-0.5">
                          {quantity} &times; ₹{product.price}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block col-span-2 text-center font-serif text-charcoal">
                      ₹{product.price}
                    </div>
                    <div className="hidden sm:block col-span-2 text-center font-mono text-charcoal-muted">
                      {quantity}
                    </div>
                    <div className="col-span-2 text-right font-serif text-espresso font-semibold w-full sm:w-auto">
                      ₹{product.price * quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Financial Calculations Summary */}
            <div className="pt-6 pb-6 border-b border-taupe/80">
              <div className="max-w-xs ml-auto space-y-2 text-xs">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Subtotal:</span>
                  <span className="font-serif text-espresso font-medium">₹{purchasedSubtotal}</span>
                </div>

                {purchasedDiscount > 0 && (
                  <div className="flex justify-between text-burgundy font-medium">
                    <span className="font-mono text-[11px]">
                      Privilege Discount ({purchasedAppliedPromo || 'LIER10'}):
                    </span>
                    <span className="font-serif">-₹{purchasedDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal-muted">
                  <span>White Glove Delivery:</span>
                  <span className="font-serif text-espresso font-medium">
                    {purchasedShippingFee === 0 ? (
                      <span className="text-emerald-700 font-sans font-medium">Complimentary</span>
                    ) : (
                      `₹${purchasedShippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-taupe/80">
                  <div>
                    <span className="font-serif text-sm font-semibold text-espresso block">
                      Total Authorized:
                    </span>
                    <span className="text-[10px] text-charcoal-muted font-light block">
                      Inclusive of all taxes & luxury handling
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-burgundy font-bold">
                    ₹{purchasedTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Brand Authenticity Statement & Atelier Warranty */}
            <div className="pt-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3.5 bg-cream/70 border border-taupe/60 rounded-sm p-4 mt-6 text-xs text-charcoal-muted leading-relaxed font-light">
              <ShieldCheck className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
              <div>
                <strong className="text-espresso font-medium block mb-0.5">
                  Seal of Provenance &bull; 30-Day Ambient Scenting Guarantee
                </strong>
                Every LIER flacon is individually batch-tested at our Mumbai atelier. Crafted with sustainably harvested beech wood diffusion caps and pure botanical fragrance oils. For concierge support, inquiries, or seasonal flacon refills, contact{' '}
                <span className="text-burgundy font-medium">concierge@lierperfumes.com</span>.
              </div>
            </div>
          </div>

          {/* 6. Action Controls (Screen Only) */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 no-print mb-12">
            <button
              onClick={handlePrint}
              className="btn-outline-gold text-xs tracking-widest uppercase py-3.5 px-6 flex items-center space-x-2 w-full sm:w-auto justify-center shadow-sm"
              aria-label="Print or Save Order Receipt as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Receipt</span>
            </button>
            <Link
              to="/shop"
              className="btn-dark text-xs tracking-widest uppercase py-3.5 px-6 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Exploring Boutique</span>
            </Link>
            <Link
              to="/"
              className="btn-gold text-xs tracking-widest uppercase py-3.5 px-8 w-full sm:w-auto text-center"
            >
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
