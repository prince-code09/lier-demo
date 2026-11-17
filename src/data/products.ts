export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: 'alpine' | 'musk' | 'combo';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  volume: string;
  duration: string;
  inStock: boolean;
  badge?: string;
  heroImage: string;
  secondaryImage: string;
  galleryImages: {
    url: string;
    caption: string;
    type: 'lifestyle' | 'packshot' | 'infographic' | 'in-car' | 'in-hand';
  }[];
  scentFamily: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  longDescription: string;
  features: string[];
  howToUseSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'lier-alpine-mist',
    slug: 'alpine-mist',
    name: 'Alpine Mist',
    subtitle: 'Crisp Glacial Air • Chilled Citrus • Mountain Pine',
    tagline: 'Invigorating freshness engineered for high-altitude clarity and daily commuting focus.',
    category: 'alpine',
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviewCount: 142,
    volume: '7.5 ml / 0.25 fl oz',
    duration: 'Up to 30 Days Continuous Diffusion',
    inStock: true,
    badge: 'Signature Freshness',
    heroImage: '/assets/alpine/1 (2).webp',
    secondaryImage: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_21 PM.webp',
    galleryImages: [
      {
        url: '/assets/alpine/1 (2).webp',
        caption: 'Alpine Mist flacon on slate rock overlooking mountain lake',
        type: 'lifestyle',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_12 PM (7).webp',
        caption: 'In-hand scale demonstration with alpine peak backdrop',
        type: 'in-hand',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_21 PM.webp',
        caption: 'Compact & stylish rearview mirror hanging integration',
        type: 'in-car',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_10 PM (3).webp',
        caption: 'Alpine-inspired aroma concept with mountain breeze',
        type: 'infographic',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_09 PM (2).webp',
        caption: '30-day active longevity performance badge',
        type: 'infographic',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_11 PM (5).webp',
        caption: 'Illustrated 4-step usage guide',
        type: 'infographic',
      },
      {
        url: '/assets/alpine/ChatGPT Image Sep 3, 2026, 12_49_12 PM (6).webp',
        caption: 'Cockpit view on open mountain highway',
        type: 'in-car',
      },
    ],
    scentFamily: 'Fresh • Aquatic • Woody',
    topNotes: ['Crisp Mountain Air', 'Chilled Bergamot', 'Frosted Lemon Zest'],
    heartNotes: ['Blue Alpine Pine', 'Wild Cyclamen', 'Cool Glacial Accord'],
    baseNotes: ['White Cedarwood', 'Clean Ambergris', 'Mineral Slate'],
    description: 'A pure, crystalline automotive fragrance that captures the exhilarating rush of alpine peaks and pine-bordered lake highways.',
    longDescription: 'Engineered specifically for the automotive microclimate, Alpine Mist transforms your car cabin into a pristine mountain sanctuary. Handcrafted in India using natural essential fragrance oils, its breathable beech wood cap gently regulates diffusion without synthetic chemical propellants.',
    features: [
      'Up to 30 Days of continuous artisanal diffusion',
      'Porous natural beech wood cap for passive, gentle aroma release',
      'Thick faceted crystal glass flacon with embossed LIER insignia',
      'Leak-proof inner silicone travel seal',
      '100% non-toxic, IFRA-compliant fragrance oils',
      'Premium black woven suspension strap for universal rearview mirror fit',
    ],
    howToUseSteps: [
      {
        step: 1,
        title: 'Unscrew the Beech Wood Cap',
        description: 'Twist the porous wooden cap counter-clockwise to access the internal seal.',
      },
      {
        step: 2,
        title: 'Remove the Inner Stopper',
        description: 'Carefully take out the translucent silicone travel plug and store it for transport.',
      },
      {
        step: 3,
        title: 'Fasten the Cap Securely',
        description: 'Screw the wooden cap back tightly, then invert the bottle for 2–3 seconds to saturate the wood.',
      },
      {
        step: 4,
        title: 'Hang on Rearview Mirror',
        description: 'Adjust the wooden sliding bead to secure the bottle firmly below the rearview mirror.',
      },
    ],
    specifications: [
      { label: 'Fragrance Profile', value: 'Fresh, Aquatic, Crisp Pine' },
      { label: 'Bottle Volume', value: '7.5 ml / 0.25 fl oz' },
      { label: 'Longevity', value: '30 to 45 Days' },
      { label: 'Cap Material', value: 'FSC-Certified Beech Wood' },
      { label: 'Vessel Material', value: 'Faceted Borosilicate Crystal Glass' },
      { label: 'Country of Origin', value: 'Handcrafted in India' },
    ],
  },
  {
    id: 'lier-crist-ash-musk',
    slug: 'crist-ash-musk',
    name: 'Crist Ash Musk',
    subtitle: 'Velvet Florals • Golden Amber • Warm Cashmere Wood',
    tagline: 'An opulent, sensual aroma that envelops your car cockpit in quiet luxury and refined comfort.',
    category: 'musk',
    price: 699,
    originalPrice: 899,
    rating: 4.95,
    reviewCount: 188,
    volume: '7.5 ml / 0.25 fl oz',
    duration: 'Up to 30 Days Continuous Diffusion',
    inStock: true,
    badge: 'Bestseller',
    heroImage: '/assets/marketing/1.webp',
    secondaryImage: '/assets/musk/1 (2).webp',
    galleryImages: [
      {
        url: '/assets/marketing/1.webp',
        caption: 'Studio e-commerce packshot of Crist Ash Musk flacon & presentation box',
        type: 'packshot',
      },
      {
        url: '/assets/musk/1 (2).webp',
        caption: 'Luxury lifestyle presentation on wooden tray with baby\'s breath blossoms',
        type: 'lifestyle',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_30 PM (6).webp',
        caption: 'In-hand scale preview inside luxury vehicle cabin',
        type: 'in-hand',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_29 PM (4).webp',
        caption: 'Cockpit mirror hanging view with instrument display',
        type: 'in-car',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_28 PM (2).webp',
        caption: 'Floral, woody & musk ingredient olfactory spotlight',
        type: 'infographic',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_28 PM (1).webp',
        caption: '30-Day freshness and odour control benefit overview',
        type: 'infographic',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_29 PM (3).webp',
        caption: 'Safe, non-toxic 4-step instructional guide',
        type: 'infographic',
      },
      {
        url: '/assets/musk/ChatGPT Image Sep 3, 2026, 01_31_30 PM (5).webp',
        caption: 'First-person highway cruise companion during golden hour',
        type: 'in-car',
      },
    ],
    scentFamily: 'Floral • Woody • Musk',
    topNotes: ['Sunlit Bergamot', 'White Magnolia Petals', 'Soft Violet'],
    heartNotes: ['Golden Amber Resin', 'Creamy Sandalwood', 'Orris Root'],
    baseNotes: ['Crist Ash Musk', 'Aged Cedar Logs', 'Warm Madagascar Tonka'],
    description: 'A deeply sophisticated automotive perfume crafted for nocturnal drives, tailored leather interiors, and connoisseurs of timeless olfactory poise.',
    longDescription: 'Crist Ash Musk blends warm woody amber accords with the gentle sweetness of fresh white florals and noble musk. It effectively neutralizes stubborn vehicle odors while creating an aura of effortless elegance reminiscent of bespoke private lounge interiors.',
    features: [
      'Up to 30 Days of enduring olfactory presence',
      'Advanced odour-neutralizing natural essential oil blend',
      'Porous beech wood cap designed for even, non-intrusive evaporation',
      'Rich espresso-toned luxury presentation box with gold botanical embossing',
      'Safe, spill-resistant glass architecture',
      'Universal suspension ribbon with secure locking bead',
    ],
    howToUseSteps: [
      {
        step: 1,
        title: 'Open the Wooden Cap',
        description: 'Gently unscrew the grooved beech wood cap from the crystal bottle.',
      },
      {
        step: 2,
        title: 'Remove the Inner Stopper',
        description: 'Extract the clear inner silicone stopper to expose the scented oil.',
      },
      {
        step: 3,
        title: 'Re-tighten and Saturate',
        description: 'Screw the cap on firmly. Invert for 3 seconds so the wood absorbs the fragrance.',
      },
      {
        step: 4,
        title: 'Hang in Your Cockpit',
        description: 'Suspend from your rearview mirror and slide the wooden bead to set preferred drop length.',
      },
    ],
    specifications: [
      { label: 'Fragrance Profile', value: 'Sensual Floral, Warm Woody Amber, Musk' },
      { label: 'Bottle Volume', value: '7.5 ml / 0.25 fl oz' },
      { label: 'Longevity', value: '30 to 45 Days' },
      { label: 'Cap Material', value: 'Acoustic-Grade Beech Wood' },
      { label: 'Vessel Material', value: 'Faceted Borosilicate Crystal Glass' },
      { label: 'Country of Origin', value: 'Handcrafted in India' },
    ],
  },
  {
    id: 'lier-duo-combo-pack',
    slug: 'duo-combo',
    name: 'The Connoisseur Duo Pack',
    subtitle: 'Alpine Mist (7.5ml) + Crist Ash Musk (7.5ml) • Curated Suite',
    tagline: 'Experience the complete LIER olfactory spectrum. Day & night duality for every journey.',
    category: 'combo',
    price: 1199,
    originalPrice: 1798,
    rating: 5.0,
    reviewCount: 96,
    volume: '2 × 7.5 ml (15 ml total)',
    duration: 'Up to 60 Days Total Driving Freshness',
    inStock: true,
    badge: 'Curated Suite • 33% Off',
    heroImage: '/assets/combo/1.webp',
    secondaryImage: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_03 PM (2).webp',
    galleryImages: [
      {
        url: '/assets/combo/1.webp',
        caption: 'The Connoisseur Duo Pack on polished white marble tabletop',
        type: 'lifestyle',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_03 PM (2).webp',
        caption: 'Scent comparison guide: Crist Ash Musk vs Alpine Mist',
        type: 'infographic',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_03 PM (1).webp',
        caption: 'Twin pack cockpit dashboard arrangement',
        type: 'in-car',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_04 PM (4).webp',
        caption: 'Dual bottle cockpit showcase overlooking lakeside highway',
        type: 'in-car',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 02_30_09 PM.webp',
        caption: 'Universal driving and luxury gifting presentation',
        type: 'infographic',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_04 PM (3).webp',
        caption: 'Universal 4-step usage guide for both fragrance diffusers',
        type: 'infographic',
      },
      {
        url: '/assets/combo/ChatGPT Image Sep 3, 2026, 01_50_05 PM (6).webp',
        caption: 'Outdoor stone table presentation with vehicle inset vignette',
        type: 'lifestyle',
      },
    ],
    scentFamily: 'Dual Spectrum (Aquatic Fresh & Woody Amber)',
    topNotes: ['Alpine Glacial Breeze', 'Sun-drenched Bergamot', 'Crisp Citrus'],
    heartNotes: ['Cool Pine Needles', 'White Magnolia Blossom', 'Amber Resin'],
    baseNotes: ['White Cedarwood', 'Crist Ash Musk', 'Aged Driftwood'],
    description: 'The definitive automotive fragrance collection. Switch between the revitalizing mountain freshness of Alpine Mist for morning commutes and the warm elegance of Crist Ash Musk for evening journeys.',
    longDescription: 'Presented in a collectible twin set, The Connoisseur Duo Pack offers the ultimate automotive scenting experience. Enjoy two individually distinct 7.5ml flacons, each equipped with its own hand-finished beech wood cap and suspension ribbon. An ideal gift for automotive purists and luxury car owners.',
    features: [
      'Two complete signature fragrances in one cohesive luxury bundle',
      'Save 33% compared to individual single bottle purchases',
      'Provides up to 60 combined days of premium in-car aroma',
      'Complimentary express shipping included',
      'Includes dual FSC-certified beech wood diffusion caps',
      'Presented in bespoke gift-ready packaging',
    ],
    howToUseSteps: [
      {
        step: 1,
        title: 'Choose Your Journey Fragrance',
        description: 'Select Alpine Mist for morning daylight drives, or Crist Ash Musk for evening elegance.',
      },
      {
        step: 2,
        title: 'Uncap & Remove Travel Stopper',
        description: 'Unscrew the wooden cap and remove the silicone plug to activate the bottle.',
      },
      {
        step: 3,
        title: 'Invert Briefly to Prime Wood',
        description: 'Secure cap tightly and invert for 2–3 seconds to saturate the porous wood fibers.',
      },
      {
        step: 4,
        title: 'Switch Whenever Mood Changes',
        description: 'Re-insert the silicone plug on the idle bottle to preserve it for future rotation.',
      },
    ],
    specifications: [
      { label: 'Bundle Contents', value: '1× Alpine Mist (7.5ml) + 1× Crist Ash Musk (7.5ml)' },
      { label: 'Total Volume', value: '15 ml / 0.50 fl oz' },
      { label: 'Combined Longevity', value: 'Up to 60–90 Days' },
      { label: 'Cap Material', value: 'Natural Porous Beech Wood' },
      { label: 'Packaging', value: 'Twin Presentation Gift Box' },
      { label: 'Complimentary Delivery', value: 'Free Express White Glove Shipping' },
    ],
  },
];

export const MARKETING_CREATIVES = [
  {
    id: 'mkt-01',
    title: 'Studio E-Commerce Packshot',
    image: '/assets/marketing/1.webp',
    tag: 'Product Focus',
    description: 'Pure studio packshot on seamless white background showing Crist Ash Musk bottle & presentation box.',
  },
  {
    id: 'mkt-02',
    title: 'Minimalist Cockpit Suspension',
    image: '/assets/marketing/2.webp',
    tag: 'Cockpit Interior',
    description: 'LIER diffuser hanging from rearview mirror: "Perfect For Every Car - Adds Style & Fresh Aroma".',
  },
  {
    id: 'mkt-03',
    title: '30-Day Vapor Diffusion',
    image: '/assets/marketing/3.webp',
    tag: 'Diffusion Tech',
    description: 'Swirling smoke and scent diffusion ribbons highlighting long-lasting freshness.',
  },
  {
    id: 'mkt-04',
    title: 'Made in India with Natural Oils',
    image: '/assets/marketing/4.webp',
    tag: 'Brand Heritage',
    description: 'Dark moody luxury composition on leather and slate: "Natural Oils • Made in India • Up to 30 Days".',
  },
  {
    id: 'mkt-05',
    title: 'Natural Wooden Cap Technology',
    image: '/assets/marketing/5.webp',
    tag: 'Craftsmanship',
    description: 'Macro isolation of the grooved porous beech wood cap illustrating continuous passive aroma diffusion.',
  },
  {
    id: 'mkt-06',
    title: 'Faceted Glass Flacon Design',
    image: '/assets/marketing/6.webp',
    tag: 'Bottle Design',
    description: 'High-key reflection of the crystal flacon and floral accents for elegant automotive interiors.',
  },
  {
    id: 'mkt-07',
    title: 'Four-Benefit Cockpit Infographic',
    image: '/assets/marketing/7.webp',
    tag: 'Benefits',
    description: 'Feature callout highlighting Stylish Look, Long Lasting Fragrance, Refreshes Every Drive, and Premium Experience.',
  },
  {
    id: 'mkt-08',
    title: 'Why Choose LIER Pedestal',
    image: '/assets/marketing/8.webp',
    tag: 'Flagship Pedestal',
    description: 'Symmetrical 6-benefit brand pedestal: Long Lasting, Easy to Hang, Modern Car Accessory, Glass Flacon, Compact & Stylish.',
  },
  {
    id: 'mkt-09',
    title: 'Transform Your Drive (Before / After)',
    image: '/assets/marketing/9.webp',
    tag: 'Problem & Solution',
    description: 'Comparative split between stale odors in traffic and clean, mood-elevating luxury fragrance on open roads.',
  },
];
