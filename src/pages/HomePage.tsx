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

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Multi-slide Hero Carousel */}
      <HeroCarousel />

      {/* 2. Featured Fragrances Showcase */}
      <section className="py-20 bg-ivory border-b border-taupe/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-ultra text-burgundy font-semibold">
                The Master Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal mt-1">
                Signature Automotive Perfumes
              </h2>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-burgundy hover:text-burgundy-hover font-semibold transition-colors"
            >
              <span>View Complete Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
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
