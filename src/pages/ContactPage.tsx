import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all mandatory fields.', '', 'info');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry Transmitted', 'Our private concierge will respond within 24 hours.', 'gold');
  };

  return (
    <div className="py-16 bg-obsidian-950 text-alabaster min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Private Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal mt-2 leading-tight">
            Connect With Our House
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Whether inquiring about personalized scent recommendations, corporate gifting suites, or dealership collaborations, our concierge team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-obsidian-900 border border-white/10 rounded-sm p-8 sm:p-10 shadow-luxury">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white">Thank You, {formData.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Your message has been assigned to our senior olfactory concierge. A representative will contact you via email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                  }}
                  className="btn-outline-gold text-xs tracking-wider uppercase mt-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-white mb-1">Direct Inquiries</h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Fields marked with an asterisk (<span className="text-gold-400">*</span>) are mandatory.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. vikram@example.com"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-gold-400"
                    >
                      <option value="general">Product Inquiry & Advice</option>
                      <option value="b2b">Corporate / Luxury Gifting</option>
                      <option value="dealership">Automobile Dealership Partnership</option>
                      <option value="order">Order Status & Tracking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Message <span className="text-gold-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements, vehicle models, or fragrance queries..."
                    className="w-full bg-obsidian-850 border border-white/10 rounded-sm p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct House Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-obsidian-900 border border-white/10 rounded-sm p-8 shadow-luxury space-y-6">
              <h3 className="font-serif text-xl text-white">Atelier Details</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 text-zinc-300">
                  <Mail className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Direct Email</span>
                    <a href="mailto:care@lierfragrance.com" className="hover:text-gold-300 transition-colors">
                      care@lierfragrance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-zinc-300">
                  <Phone className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Concierge Telephone</span>
                    <a href="tel:+919876543210" className="hover:text-gold-300 transition-colors font-mono">
                      +91 (022) 4890-LIER
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-zinc-300">
                  <Clock className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Operating Hours</span>
                    <span>Monday &ndash; Saturday &bull; 10:00 AM &ndash; 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-zinc-300">
                  <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Dispatch Atelier</span>
                    <span>Andheri East, Mumbai, Maharashtra &mdash; 400069, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-obsidian-900/60 border border-gold-400/20 rounded-sm p-6 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-gold-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Bespoke Dealership & Fleet Inquiries</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Are you an authorized automotive dealership, luxury detailing studio, or club looking to offer custom branded car perfume diffusers? Inquire above with subject "Dealership Partnership".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
