# LIER &bull; Haute Parfum Automobile
### Luxury Automotive Fragrance Storefront &bull; Client Frontend Implementation

---

## 1. Project Overview

**LIER** is a premium automotive fragrance house that elevates the driving experience through noble essential oils, porous beech wood capillary diffusion, and faceted borosilicate crystal flacons. 

This repository contains the complete frontend e-commerce storefront for LIER, built with the discipline of a senior multidisciplinary product design and engineering team. It integrates all 30 authentic client-provided product photographs and marketing creatives into a cohesive luxury digital experience.

---

## 2. Technology Architecture

- **Core Framework:** React 18 &bull; Vite 6.0 &bull; TypeScript 5.7
- **Styling & Design System:** Tailwind CSS 3.4 (Custom Obsidian Luxury tokens)
- **Routing:** React Router DOM 6.28
- **Iconography:** Lucide React
- **Celebration Feedback:** Canvas Confetti
- **State Management:** React Context API with LocalStorage Persistence (Cart, Wishlist, Notifications)
- **Deployment & Server:** Vite Development Server on `http://localhost:5173/`

---

## 3. Verified Client Assets & Media Integration

All original client media files from `Lier Images.zip` and `NEW PERFUME POST (1) new.zip` have been strictly preserved with zero alterations, renames, or deletions. They are cataloged in `LIER_ASSET_AUDIT/` and served through `public/assets/`:

- **Alpine Collection (7 PNGs):** `public/assets/alpine/` (Lifestyle hero `1 (2).png`, In-car view, Scent concept, Longevity badge, 4-step usage guide).
- **Musk Collection (7 PNGs):** `public/assets/musk/` (Lifestyle hero `1 (2).png`, Sunset highway cruise, Floral/Woody/Musk notes, Longevity badge, 4-step usage guide).
- **Combo Collection (7 PNGs):** `public/assets/combo/` (Twin hero on marble `1.png`, Scent comparison guide, Dashboard display, 4-step usage guide, Gifting showcase).
- **Marketing Creatives (9 JPEGs):** `public/assets/marketing/` (E-commerce studio packshot `1.jpg`, Minimalist cockpit hang `2.jpg`, 30-Day vapor ribbons `3.jpg`, Dark luxury trust banner `4.jpg`, Wooden cap macro `5.jpg`, Faceted glass flacon `6.jpg`, 4-benefit infographic `7.jpg`, "Why Choose LIER" 6-benefit pedestal `8.jpg`, "Transform Your Drive" before/after split `9.jpg`).

---

## 4. Page Routes & Navigation Hierarchy

| Route | Page | Key Features & Modules |
| :--- | :--- | :--- |
| `/` | **Homepage** | Cinematic multi-slide hero carousel, featured products, brand story, interactive scent comparison (`CMB-03`), 6-benefit pedestal (`MKT-08`), interactive Scent Finder Quiz, before/after split (`MKT-09`), cap & bottle craftsmanship (`MKT-05` & `MKT-06`), trust banner (`MKT-04`), driver lifestyle gallery, and FAQ accordion. |
| `/shop` | **Boutique Catalog** | Live category filtering (All, Alpine, Musk, Duo Combo), sorting (Price, Rating, Featured), live keyword filtering, and Quick View modals. |
| `/product/:slug` | **Product Detail Page (PDP)** | Multi-image gallery with click-to-enlarge zoom lightbox, olfactory pyramid breakdown (Top / Heart / Base notes), interactive 4-step "How to Use" tabs, hardware specifications, customer reviews, and related pairings. |
| `/collection/alpine` | **Alpine Collection** | Dedicated Alpine Mist showcase highlighting crisp mountain freshness. |
| `/collection/musk` | **Musk Collection** | Dedicated Crist Ash Musk showcase highlighting warm amber luxury. |
| `/collection/combo` | **Duo Suite Collection** | Dedicated Connoisseur Duo twin pack showcase with bundle savings. |
| `/about` | **The House of LIER** | Brand philosophy, sustainable beech wood capillary diffusion, borosilicate crystal flacon architecture, and Made in India heritage. |
| `/contact` | **Client Concierge** | Inquiry form with validation, corporate & fleet gifting inquiries, dealership partnership options, direct telephone and dispatch atelier details. |
| `/cart` | **Shopping Bag** | Full-page shopping cart with dynamic subtotal, complimentary delivery progress meter (threshold: ₹999), promo code engine (`LIER10` / `FIRSTDRIVE`), and order summary. |
| `/checkout` | **Checkout UI Demo** | 3-step simulated checkout (Shipping details &rarr; Delivery option &rarr; Payment method) with confetti celebration and generated order reference receipt. |

---

## 5. Global Enhancements & Interactivity

- **Global Instant Search (`Ctrl+K` / `Cmd+K`):** Live keyword matching across fragrance names, olfactory notes, and driving benefits.
- **Interactive Scent Finder Quiz:** 3-question advisor dynamically calculating driver preference and presenting a customized product recommendation with direct add-to-bag.
- **Slide-Over Cart Drawer:** Quick access from any page with real-time free shipping threshold calculation.
- **Persistent Wishlist:** Toggle favorite fragrances across sessions with dedicated slide-over drawer.
- **Glass Toast Notifications:** Elegant floating toast feedback for bag additions, wishlist updates, and concierge submissions.
- **Dual-Image Card Transitions:** Smooth cross-fade between lifestyle photography and in-car cockpit hanging previews on hover.
- **Fullscreen Image Lightbox:** Zoom into high-resolution details of client flacons and packaging.

---

## 6. Setup & Execution Commands

### Prerequisites
- Node.js &ge; 18.x (Installed: v24.19.0)
- npm &ge; 9.x (Installed: 11.17.0)

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
# Server accessible at: http://localhost:5173/
```

### Production Build & Type Checking
```bash
npm run build
```

---

## 7. Future Backend Integration Boundaries

The application is architected with clean separation of concerns for frictionless backend integration:
- **Product Data (`src/data/products.ts`):** Ready to be replaced by REST API endpoints (`GET /api/v1/products`, `GET /api/v1/products/:slug`).
- **Cart & Wishlist Contexts (`src/context/`):** Clean hooks ready to sync with backend user sessions or cart APIs.
- **Checkout Flow (`src/pages/CheckoutPage.tsx`):** Clearly marked with demo banners; ready to integrate Razorpay, Stripe, or Cashfree payment gateways.
- **Contact Concierge (`src/pages/ContactPage.tsx`):** Ready to connect to CRM or email dispatch microservices (`POST /api/v1/inquiries`).

---

&copy; 2026 LIER Haute Parfum Automobile. Handcrafted in India.
