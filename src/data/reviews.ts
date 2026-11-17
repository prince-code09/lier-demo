export interface Review {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  productSlug: string;
  verified: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Vikramaditya S.',
    location: 'Mumbai, MH',
    vehicle: 'BMW 5 Series',
    rating: 5,
    date: '3 weeks ago',
    title: 'Transforms the entire cockpit into a luxury lounge',
    content: 'Most car perfumes give me an immediate headache from chemical solvents. LIER is completely different—the beech wood cap diffuses a gentle, natural sillage that smells like a bespoke niche cologne rather than a taxi air freshener. Crist Ash Musk is phenomenal with leather upholstery.',
    productSlug: 'crist-ash-musk',
    verified: true,
  },
  {
    id: 'rev-02',
    author: 'Ananya R.',
    location: 'Bengaluru, KA',
    vehicle: 'Audi Q5',
    rating: 5,
    date: '1 month ago',
    title: 'Alpine Mist makes Bangalore traffic bearable',
    content: 'The crisp pine and glacial citrus notes feel so clean and revitalizing. It does not overpower the cabin, and the bottle itself looks like an artisanal sculpture hanging from the rearview mirror. Highly recommend!',
    productSlug: 'alpine-mist',
    verified: true,
  },
  {
    id: 'rev-03',
    author: 'Devendra K.',
    location: 'New Delhi, DL',
    vehicle: 'Mercedes E-Class',
    rating: 5,
    date: '2 weeks ago',
    title: 'The Duo Pack is the ultimate car enthusiast gift',
    content: 'Bought the Duo pack as a housewarming/car gift for my brother. The packaging is top-tier luxury, and having both variants means switching between fresh morning energy and sophisticated night ambience. Over 3 weeks in and the scent is still going strong.',
    productSlug: 'duo-combo',
    verified: true,
  },
  {
    id: 'rev-04',
    author: 'Rohan M.',
    location: 'Pune, MH',
    vehicle: 'Skoda Octavia vRS',
    rating: 5,
    date: '5 days ago',
    title: 'Pure crystal glass, zero plastic rattle',
    content: 'Love that there is zero plastic. The wooden cap soaked up the oil nicely after the first inversion and has been diffusing effortlessly ever since. Beautiful craftsmanship from an Indian brand.',
    productSlug: 'alpine-mist',
    verified: true,
  },
];
