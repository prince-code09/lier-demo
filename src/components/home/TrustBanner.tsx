import React from 'react';
import { ShieldCheck, MapPin, Droplets } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  return (
    <section className="py-20 bg-cream border-t border-taupe/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-porcelain border border-taupe rounded-sm p-8 sm:p-12 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Client Trust Banner MKT-04 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-sm overflow-hidden border border-taupe shadow-lg group bg-cream">
              <img
                src="/assets/marketing/4.webp"
                alt="Made in India with Natural Oils"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 inset-x-3 p-2 bg-cream/95 backdrop-blur-md rounded text-center border border-taupe shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-burgundy font-mono font-medium">
                  Official Heritage & Trust Visual
                </span>
              </div>
            </div>
          </div>

          {/* Right: Heritage Text & Certified Quality */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
                Timeless Scents • Endless Drives
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal mt-2 leading-tight">
                Handcrafted in India, Formulated to Global Standards
              </h2>
              <div className="w-16 h-0.5 bg-burgundy mt-4 mb-4" />
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                LIER is proud to engineer luxury automotive fragrance right here in India. We source sustainable FSC-certified beech wood and distill certified natural fragrance extracts to ensure an uncompromising standard of purity, longevity, and olfactory beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-sand-light border border-taupe rounded-sm">
                <MapPin className="w-5 h-5 text-champagne mb-2" />
                <h4 className="font-serif text-sm text-espresso mb-1 font-normal">Made in India</h4>
                <p className="text-[11px] text-charcoal-muted font-light">
                  Artisanal bottling and wood finishing in certified domestic facilities.
                </p>
              </div>

              <div className="p-4 bg-sand-light border border-taupe rounded-sm">
                <Droplets className="w-5 h-5 text-champagne mb-2" />
                <h4 className="font-serif text-sm text-espresso mb-1 font-normal">Natural Oils</h4>
                <p className="text-[11px] text-charcoal-muted font-light">
                  Free from petrochemical phthalates, artificial parabens, and hazardous aerosols.
                </p>
              </div>

              <div className="p-4 bg-sand-light border border-taupe rounded-sm">
                <ShieldCheck className="w-5 h-5 text-champagne mb-2" />
                <h4 className="font-serif text-sm text-espresso mb-1 font-normal">IFRA Certified</h4>
                <p className="text-[11px] text-charcoal-muted font-light">
                  Compliant with International Fragrance Association consumer safety guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
