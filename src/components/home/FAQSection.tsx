import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does passive wooden cap diffusion work?',
      answer: 'Our porous beech wood cap functions as an organic capillary membrane. When you invert the bottle for 2–3 seconds upon initial opening, the wood fibers absorb the natural essential oils. As air circulates naturally through your car cabin, the saturated wood releases a delicate, continuous aroma without artificial chemical propellant sprays or noisy battery diffusers.',
    },
    {
      question: 'How long does a single 7.5ml bottle last?',
      answer: 'Under normal ambient conditions, a single bottle provides between 30 and 45 days of continuous passive aroma. High direct sunlight or hot summer parking may accelerate evaporation slightly. If you desire a stronger scent burst after a few weeks, simply re-invert the flacon for 2 seconds to saturate the wooden cap again.',
    },
    {
      question: 'Will the perfume oil leak or spill during spirited driving?',
      answer: 'No. The flacon features tight precision threading and an included airtight silicone transport stopper. When secured according to instructions, the oil is fully contained inside the heavy faceted crystal glass flacon, with only the porous wood fibers transmitting scent.',
    },
    {
      question: 'Are LIER fragrances safe for pets and luxury leather interiors?',
      answer: 'Yes. All LIER distillations are formulated in compliance with the International Fragrance Association (IFRA) safety standards. They are free from hazardous petrochemical phthalates, artificial formaldehyde, and aerosol propellants. The suspension strap is designed to keep the flacon clear of direct contact with leather dashboards.',
    },
    {
      question: 'How should I choose between Alpine Mist and Crist Ash Musk?',
      answer: 'Alpine Mist is cool, aquatic, and invigorating—featuring crisp mountain air, bergamot, and blue pine needles, ideal for morning commutes and hot summer drives. Crist Ash Musk is warm, sensual, and comforting—featuring white florals, amber resin, and noble musk, ideal for evening cruises and luxury leather interiors. Many connoisseurs choose the Duo Pack to alternate between both.',
    },
    {
      question: 'Can I purchase LIER car perfumes for corporate gifting or wedding favors?',
      answer: 'Yes. We offer bespoke corporate gifting suites and bulk connoisseur packages for automobile dealerships, luxury clubs, and corporate events. Please reach out via our Concierge Contact page for personalized volume arrangements.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-obsidian-950 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-ultra text-gold-400 font-semibold">
            Inquiries & Understanding
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-2 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="gold-divider mx-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Everything you need to know about caring for your LIER diffuser, diffusion longevity, and cabin safety.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-obsidian-900 border border-white/10 rounded-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base text-white font-medium">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1 rounded text-gold-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-gold-500/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 animate-fade-in font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
