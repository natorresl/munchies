# Munchies

A Next.js 16 web application for browsing food delivery restaurants. Users can filter restaurants by category, delivery time, and price range, with all filter state managed through URL search parameters for shareable links.

## Tech Stack

- **Next.js 16** — App Router with Turbopack
- **React 19** — Server and Client Components
- **TypeScript** — Type-safe codebase
- **Tailwind CSS 4** — Utility-first styling with dark mode support

## Features

- Fetches restaurant data from an external API
- Open/Closed status per restaurant (live from API)
- Filtering by:
  - Food category (Pizza, Vegan, Burrito, etc.)
  - Delivery time (0–10 min, 10–30 min, 30–60 min, 1 hour+)
  - Price range ($, $$, $$$, $$$$)
- URL-based filters (shareable links)
- Server-side filtering for performance
- Responsive design (mobile and desktop)

## Project Structure

```
src/app/
├── page.tsx                          # Main page (server component)
├── layout.tsx                        # Root layout (fonts, metadata, header)
├── loading.tsx                       # Loading skeleton (Suspense fallback)
├── globals.css                       # Global styles and Tailwind config
├── types.ts                          # TypeScript interfaces (Restaurant, Filter, PriceRange)
├── lib/
│   └── api.ts                        # API fetch functions with caching
├── hooks/
│   └── useFilterParam.ts             # Reusable hook for URL filter toggling
└── components/
    ├── FilterNavBar.tsx              # Sidebar filters (client component)
    ├── FilterFoodCategory.tsx        # Category filter bar (client component)
    ├── FilterSection.tsx             # Reusable filter button group
    └── restaurant/
        ├── RestaurantCard.tsx        # Individual restaurant card
        └── RestaurantLayout.tsx      # Restaurant grid wrapper
```

```
public/
├── fonts/
│   └── SF-Pro.ttf                    # Custom font
└── images/
    ├── munchies-logo.png             # App logo
    └── button-arrow-green.png        # Card action icon
```

## Next.js File Conventions

This project follows the Next.js App Router file conventions:

| File | Role |
|------|------|
| `layout.tsx` | Root layout that wraps all pages. Defines fonts (Geist, SF-Pro), metadata, header, and imports global CSS. Rendered once and shared across navigations. |
| `page.tsx` | The route entry point for `/`. This is a **server component** that fetches restaurant data, applies filters from URL search params, and passes results to child components. |
| `loading.tsx` | Automatic loading UI displayed via React Suspense while `page.tsx` is fetching data. Shows animated skeleton cards. |
| `globals.css` | Global stylesheet imported in `layout.tsx`. Contains Tailwind directives and custom component classes. |

## Architecture

### Server vs Client Components

| Component | Type | Why |
|-----------|------|-----|
| `page.tsx` | Server | Fetches data and filters on the server — no client JS needed |
| `layout.tsx` | Server | Static layout with header, no interactivity |
| `RestaurantLayout.tsx` | Server | Restaurant grid wrapper, receives data as props |
| `RestaurantCard.tsx` | Server | Individual card presentation, receives data as props |
| `FilterSection.tsx` | Server | Reusable filter button group, receives data as props |
| `FilterNavBar.tsx` | Client | Uses `useFilterParam` hook for URL-based filter toggling |
| `FilterFoodCategory.tsx` | Client | Uses `useFilterParam` hook for category selection |

### Filtering Flow

1. User selects a filter in `FilterNavBar` or `FilterFoodCategory` (client components)
2. The component updates URL search params (e.g. `?category=pizza&delivery=0-10+min`)
3. Next.js re-renders `page.tsx` on the server with the new params
4. `page.tsx` fetches all restaurants and filters them server-side
5. Filtered results are passed to `RestaurantLayout` → `RestaurantCard` for display

### API Integration

All API calls live in `lib/api.ts` with functions: `fetchRestaurants`, `fetchAllFilters`, `fetchOpenStatus`, and `fetchPriceRange`. Static data (`restaurants`, `filters`, `price-ranges`) is cached using Next.js `'use cache'` directive. The main page uses `Promise.all()` to fetch restaurants, filters, open statuses, and price ranges in parallel.

## Getting Started

```bash
npm install
npm run dev       # Start dev server with Turbopack
```

Other available scripts:

```bash
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```
