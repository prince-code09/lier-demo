import React, { useState } from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { BrandStory } from '../components/home/BrandStory';
import { ScentSelector } from '../components/home/ScentSelector';
import { WhyChooseLier } from '../components/home/WhyChooseLier';
import { TransformDrive } from '../components/home/TransformDrive';
import { Craftsmanship } from '../components/home/Craftsmanship';
import { ScentFinderQuiz } from '../components/home/ScentFinderQuiz';
import { TrustBanner } from '../components/home/TrustBanner';
import { LifestyleFeed } from '../components/home/LifestyleFeed';
import { FAQSection } from '../components/home/FAQSection';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { PRODUCTS, Product } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const primaryCollections = PRODUCTS.filter((p) => p.category === 'alpine' || p.category === 'musk');
  const duoSuite = PRODUCTS.find((p) => p.category === 'combo');

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Multi-slide Hero Carousel */}
      <HeroCarousel />

      {/* 2. Primary Fragrance Collections Showcase (Alpine Mist & Crist Ash Musk) */}
      <section className="py-20 bg-ivory border-b border-taupe/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
                Two Signature Olfactory Houses
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal mt-1">
                The Primary Collections
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl font-light">
                Handcrafted botanical car perfumes engineered for luxury automotive microclimates. Choose your signature driving atmosphere.
              </p>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-burgundy hover:text-burgundy-hover font-semibold transition-colors"
            >
              <span>View Complete Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Balanced Two-Column Desktop Layout (Stacked on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-10">
            {primaryCollections.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                imageContainerClassName="h-48 sm:h-56 md:h-64 lg:h-[420px] xl:h-[450px] p-3 sm:p-5"
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* Featured Duo Suite Curation Privilege */}
          {duoSuite && (
            <div className="bg-porcelain border border-taupe rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-burgundy/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <Link
                  to={`/product/${duoSuite.slug}`}
                  className="w-20 h-24 sm:w-24 sm:h-28 bg-cream rounded-sm border border-taupe/60 overflow-hidden shrink-0 flex items-center justify-center p-2"
                >
                  <img src={duoSuite.heroImage} alt={duoSuite.name} className="w-full h-full object-contain" />
                </Link>
                <div>
                  <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-wider text-burgundy font-mono font-semibold bg-burgundy/10 px-2 py-0.5 rounded-sm mb-1">
                    <span>Curated Connoisseur Suite</span>
                    <span>•</span>
                    <span>Save 33%</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-espresso font-normal">
                    {duoSuite.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 max-w-lg leading-relaxed font-light">
                    Acquire both signature flacons in luxury dual presentation packaging. Includes complimentary White Glove Delivery.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
                <div className="text-center sm:text-right">
                  <div className="font-serif text-xl sm:text-2xl text-espresso font-semibold">₹{duoSuite.price}</div>
                  <div className="text-xs text-charcoal-light line-through font-light">₹{duoSuite.originalPrice}</div>
                </div>
                <Link
                  to={`/product/${duoSuite.slug}`}
                  className="btn-gold text-xs tracking-widest uppercase py-3.5 px-6 w-full sm:w-auto text-center shadow-burgundy-glow"
                >
                  Acquire Duo Suite
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Brand Story & Olfactory Architecture */}
      <BrandStory />

      {/* 4. Scent Comparison & Selector (featuring CMB-03) */}
      <ScentSelector />

      {/* 5. 6-Benefit Pedestal Feature (featuring MKT-08) */}
      <WhyChooseLier />

      {/* 6. Interactive Scent Finder Quiz */}
      <ScentFinderQuiz />

      {/* 7. Cabin Transformation Before / After (featuring MKT-09) */}
      <TransformDrive />

      {/* 8. Cap & Bottle Craftsmanship Spotlight (featuring MKT-05 & MKT-06) */}
      <Craftsmanship />

      {/* 9. Heritage & Trust Banner (featuring MKT-04) */}
      <TrustBanner />

      {/* 10. Driver Lifestyle Gallery & Reviews */}
      <LifestyleFeed />

      {/* 11. FAQ Accordion */}
      <FAQSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
