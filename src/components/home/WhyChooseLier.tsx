import React from 'react';
import { Clock, Shield, Sparkles, Feather, Gem, Droplet } from 'lucide-react';

export const WhyChooseLier: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Up to 30 Days Diffusion',
      desc: 'Formulated with dense essential oil concentrations for enduring sillage throughout every journey.',
    },
    {
      icon: Feather,
      title: 'Easy Rearview Mirror Hang',
      desc: 'Equipped with a sliding wooden cinch bead and durable black suspension strap for universal placement.',
    },
    {
      icon: Gem,
      title: 'Faceted Borosilicate Glass',
      desc: 'Handcrafted clear crystal flacon that reflects cabin light beautifully without risk of plastic degradation.',
    },
    {
      icon: Droplet,
      title: 'Porous Beech Wood Cap',
      desc: 'Natural capillary diffusion mechanism that evenly disperses fragrance without aerosol propellant sprays.',
    },
    {
      icon: Shield,
      title: '100% Non-Toxic & Leak-Proof',
      desc: 'Includes an airtight silicone travel stopper and complies with IFRA international safety standards.',
    },
    {
      icon: Sparkles,
      title: 'Artisanal Luxury Accessory',
      desc: 'Designed as an exquisite design object that complements luxury leather and automotive craftsmanship.',
    },
  ];

  return (
    <section className="py-24 bg-obsidian-900 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Brand Distinction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Why Discerning Drivers Choose LIER
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Every element—from our faceted borosilicate glass to our breathable beech wood caps—is engineered to create an uncompromising automotive fragrance experience.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 3 Benefits */}
          <div className="lg:col-span-4 space-y-6">
            {benefits.slice(0, 3).map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-obsidian-950/80 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-obsidian-850 rounded border border-gold-400/20 text-gold-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base text-white">{b.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-11">{b.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Center: Authentic Client Pedestal Graphic (MKT-08) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-sm overflow-hidden border border-gold-400/30 shadow-luxury group">
              <img
                src="/assets/marketing/8.webp"
                alt="Why Choose LIER 6-Benefit Pedestal"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 inset-x-4 p-2.5 bg-obsidian-950/85 backdrop-blur-md rounded border border-white/10 text-center">
                <span className="text-[11px] uppercase tracking-widest text-gold-300 font-mono">
                  Official LIER Value Proposition
                </span>
              </div>
            </div>
          </div>

          {/* Right 3 Benefits */}
          <div className="lg:col-span-4 space-y-6">
            {benefits.slice(3, 6).map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-obsidian-950/80 border border-white/10 rounded-sm hover:border-gold-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-obsidian-850 rounded border border-gold-400/20 text-gold-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base text-white">{b.title}</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-11">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
