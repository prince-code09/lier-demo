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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please share your message or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters in your message.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      showToast('Please correct highlighted fields.', '', 'info');
      return;
    }

    setIsSubmitting(true);
    // Simulate smooth processing while preventing double submissions
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Inquiry Logged', 'Our private concierge will review your message shortly.', 'gold');
    }, 600);
  };

  return (
    <div className="py-16 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
            Private Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-normal mt-2 leading-tight">
            Connect With Our House
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
            Whether inquiring about personalized scent recommendations, corporate gifting suites, or dealership collaborations, our concierge team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-porcelain border border-taupe/60 rounded-sm p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-burgundy/10 border border-burgundy flex items-center justify-center text-burgundy mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-espresso">Thank You, {formData.name}</h3>
                <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                  Your message has been assigned to our senior olfactory concierge team. A representative will contact you via email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                    setFormErrors({});
                  }}
                  className="btn-outline-gold text-xs tracking-wider uppercase mt-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-espresso mb-1">Direct Inquiries</h3>
                  <p className="text-xs text-charcoal-muted font-light">
                    Fields marked with an asterisk (<span className="text-burgundy">*</span>) are mandatory.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-charcoal-muted mb-1.5 font-medium">
                      Full Name <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="e.g. Vikramaditya Singhania"
                      className={`w-full bg-cream border rounded-sm px-4 py-2.5 text-base sm:text-xs text-espresso placeholder-charcoal-muted/60 focus:outline-none transition-colors ${
                        formErrors.name ? 'border-burgundy focus:border-burgundy' : 'border-taupe/60 focus:border-burgundy'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-burgundy font-medium mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-charcoal-muted mb-1.5 font-medium">
                      Email Address <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="e.g. vikram@example.com"
                      className={`w-full bg-cream border rounded-sm px-4 py-2.5 text-base sm:text-xs text-espresso placeholder-charcoal-muted/60 focus:outline-none transition-colors ${
                        formErrors.email ? 'border-burgundy focus:border-burgundy' : 'border-taupe/60 focus:border-burgundy'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-burgundy font-medium mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs uppercase tracking-wider text-charcoal-muted mb-1.5 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-4 py-2.5 text-base sm:text-xs text-espresso placeholder-charcoal-muted/60 focus:outline-none focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-charcoal-muted mb-1.5 font-medium">
                      Inquiry Nature
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-cream border border-taupe/60 rounded-sm px-4 py-2.5 text-base sm:text-xs text-espresso focus:outline-none focus:border-burgundy"
                    >
                      <option value="general">Product Inquiry & Advice</option>
                      <option value="b2b">Corporate / Luxury Gifting</option>
                      <option value="dealership">Automobile Dealership Partnership</option>
                      <option value="order">Order Status & Tracking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-charcoal-muted mb-1.5 font-medium">
                    Your Message <span className="text-burgundy">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={!!formErrors.message}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    placeholder="Tell us about your requirements, vehicle models, or fragrance queries..."
                    className={`w-full bg-cream border rounded-sm p-4 text-base sm:text-xs text-espresso placeholder-charcoal-muted/60 focus:outline-none leading-relaxed transition-colors ${
                      formErrors.message ? 'border-burgundy focus:border-burgundy' : 'border-taupe/60 focus:border-burgundy'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-burgundy font-medium mt-1">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting to Concierge...' : 'Transmit Inquiry to Concierge'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct House Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-porcelain border border-taupe/60 rounded-sm p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-xl text-espresso">Atelier Details</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 text-charcoal">
                  <Mail className="w-4 h-4 text-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-medium">Direct Email</span>
                    <a href="mailto:care@lierfragrance.com" className="hover:text-burgundy transition-colors">
                      care@lierfragrance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-charcoal">
                  <Phone className="w-4 h-4 text-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-medium">Concierge Telephone</span>
                    <a href="tel:+919876543210" className="hover:text-burgundy transition-colors font-serif">
                      +91 (022) 4890-LIER
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-charcoal">
                  <Clock className="w-4 h-4 text-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-medium">Operating Hours</span>
                    <span>Monday &ndash; Saturday &bull; 10:00 AM &ndash; 7:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-charcoal">
                  <MapPin className="w-4 h-4 text-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block font-medium">Dispatch Atelier</span>
                    <span>Andheri East, Mumbai, Maharashtra &mdash; 400069, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cream border border-taupe/60 rounded-sm p-6 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-burgundy font-medium">
                <ShieldCheck className="w-4 h-4 text-burgundy" />
                <span>Bespoke Dealership & Fleet Inquiries</span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                Are you an authorized automotive dealership, luxury detailing studio, or club looking to offer custom branded car perfume diffusers? Inquire above with subject "Dealership Partnership".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
