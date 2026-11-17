import React, { useState } from 'react';
import { Compass, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

export const ScentFinderQuiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const questions = [
    {
      id: 1,
      title: 'When do you do most of your driving?',
      options: [
        { label: 'Morning Commutes & Daylight Highways', points: { alpine: 2, musk: 0, combo: 1 } },
        { label: 'Sunset & Nocturnal City Cruising', points: { alpine: 0, musk: 2, combo: 1 } },
        { label: 'Endless Long Road Trips Day & Night', points: { alpine: 1, musk: 1, combo: 3 } },
      ],
    },
    {
      id: 2,
      title: 'Which sensory atmosphere energizes you?',
      options: [
        { label: 'Crisp Glacial Air, Mountain Pine & Chilled Citrus', points: { alpine: 3, musk: 0, combo: 1 } },
        { label: 'Velvet Magnolia, Warm Golden Amber & Woody Musk', points: { alpine: 0, musk: 3, combo: 1 } },
        { label: 'I appreciate rotating between fresh day and warm evening notes', points: { alpine: 1, musk: 1, combo: 3 } },
      ],
    },
    {
      id: 3,
      title: 'What best describes your vehicle cabin interior?',
      options: [
        { label: 'Clean, airy, minimalist with panoramic views', points: { alpine: 2, musk: 0, combo: 1 } },
        { label: 'Rich dark leather, wood trim & ambient LED lighting', points: { alpine: 0, musk: 2, combo: 1 } },
        { label: 'A bespoke sanctuary crafted for all driving conditions', points: { alpine: 1, musk: 1, combo: 3 } },
      ],
    },
  ];

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = { ...answers, [step]: optionIndex };
    setAnswers(newAnswers);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      let alpineScore = 0;
      let muskScore = 0;
      let comboScore = 0;

      Object.entries(newAnswers).forEach(([qIdx, optIdx]) => {
        const question = questions[Number(qIdx) - 1];
        const pts = question.options[optIdx].points;
        alpineScore += pts.alpine;
        muskScore += pts.musk;
        comboScore += pts.combo;
      });

      let winner: Product;
      if (comboScore >= 5) {
        winner = PRODUCTS.find((p) => p.slug === 'duo-combo')!;
      } else if (alpineScore > muskScore) {
        winner = PRODUCTS.find((p) => p.slug === 'alpine-mist')!;
      } else {
        winner = PRODUCTS.find((p) => p.slug === 'crist-ash-musk')!;
      }

      setRecommendedProduct(winner);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
    setRecommendedProduct(null);
  };

  const handleAddRecommended = () => {
    if (!recommendedProduct) return;
    addItem(recommendedProduct, 1);
    showToast(`Added to Bag`, `${recommendedProduct.name} recommended for your drive`, 'success');
  };

  return (
    <section className="py-24 bg-obsidian-950 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-obsidian-900 border border-gold-400/30 rounded-sm p-8 sm:p-12 shadow-luxury text-center relative overflow-hidden">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-gold-300 text-xs tracking-widest uppercase font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Interactive Fragrance Concierge</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
            Find Your Drive's Signature Scent
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed font-light">
            Answer 3 brief questions about your driving rituals to receive a bespoke olfactory recommendation tailored to your cabin atmosphere.
          </p>

          {/* Progress Bar */}
          {step <= 3 && (
            <div className="flex items-center justify-center space-x-2 mb-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    num === step
                      ? 'w-12 bg-gold-400 shadow-gold-glow'
                      : num < step
                      ? 'w-8 bg-gold-600/50'
                      : 'w-6 bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Question View */}
          {step <= 3 ? (
            <div className="space-y-6 animate-fade-in text-left max-w-xl mx-auto">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white text-center mb-6">
                Step {step} of 3: {questions[step - 1].title}
              </h3>

              <div className="space-y-3">
                {questions[step - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 bg-obsidian-950/80 hover:bg-obsidian-850 hover:border-gold-400/40 border border-white/10 rounded-sm text-xs sm:text-sm text-zinc-200 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>{option.label}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result View */
            recommendedProduct && (
              <div className="animate-fade-in space-y-6 max-w-md mx-auto">
                <div className="p-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-sm inline-block shadow-gold-glow">
                  <span className="bg-obsidian-950 px-4 py-1 text-[11px] font-mono uppercase tracking-widest text-gold-300 block">
                    Bespoke Scent Match
                  </span>
                </div>

                <div className="bg-obsidian-950 border border-gold-400/30 p-6 rounded-sm shadow-luxury">
                  <div className="w-36 h-44 mx-auto rounded overflow-hidden border border-white/10 mb-4 bg-obsidian-900">
                    <img
                      src={recommendedProduct.heroImage}
                      alt={recommendedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-serif text-2xl text-white mb-1">
                    {recommendedProduct.name}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-gold-400 font-mono mb-3">
                    {recommendedProduct.scentFamily}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-light">
                    {recommendedProduct.tagline}
                  </p>

                  <div className="space-y-2.5">
                    <button
                      onClick={handleAddRecommended}
                      className="w-full btn-gold py-3.5 text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-gold-glow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquire Recommended Match &bull; ₹{recommendedProduct.price}</span>
                    </button>
                    <Link
                      to={`/product/${recommendedProduct.slug}`}
                      className="w-full btn-outline-gold py-3 text-xs tracking-widest uppercase block text-center"
                    >
                      View Full Specifications
                    </Link>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-2 text-xs text-zinc-400 hover:text-white transition-colors pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Scent Quiz</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
