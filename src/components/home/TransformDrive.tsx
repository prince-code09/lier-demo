import React from 'react';
import { XCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransformDrive: React.FC = () => {
  return (
    <section className="py-24 bg-obsidian-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Authentic Client Graphic MKT-09 */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square rounded-sm overflow-hidden border border-white/10 shadow-luxury group">
              <img
                src="/assets/marketing/9.webp"
                alt="Transform Your Drive with LIER"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-obsidian-950/85 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-wider text-gold-300 font-mono border border-gold-400/30">
                Before vs After Contrast
              </div>
            </div>
          </div>

          {/* Right: Comparative Architecture Breakdown */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
                Cabin Transformation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
                Freshness You Can Feel Every Kilometer
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mt-4 mb-6" />
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Your vehicle cabin is an enclosed micro-environment where stale odors, conditioning mildew, and traffic exhaust accumulate. LIER gently cleanses the sensory space with noble botanical distillations.
              </p>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Before Card */}
              <div className="p-5 bg-obsidian-900 border border-red-500/20 rounded-sm">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-red-400 font-mono font-semibold mb-3">
                  <XCircle className="w-4 h-4" />
                  <span>The Ordinary Drive</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Stale air and persistent food/pet odors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Aggressive synthetic chemicals causing headaches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Cheap, rattling plastic vent clips that break</span>
                  </li>
                </ul>
              </div>

              {/* After Card */}
              <div className="p-5 bg-obsidian-900 border border-gold-400/30 rounded-sm bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-900">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 font-mono font-semibold mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>The LIER Experience</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>Pure, calming mountain and amber aromas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>100% Non-toxic IFRA-compliant natural essential oils</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold-400 font-bold">•</span>
                    <span>Tactile beech wood cap and crystal glass sculpture</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to="/shop"
                className="btn-gold text-xs tracking-widest uppercase py-3.5 px-6 inline-flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Elevate Your Drive Today</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
