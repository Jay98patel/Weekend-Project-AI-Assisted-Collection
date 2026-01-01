# AI-Assisted Collection Builder

## Setup

npm install
npm run dev

## Scripts

npm run dev
npm run build
npm run preview
npm run test:e2e

## Architecture decisions

- Vite + React + TypeScript for fast local development and a simple build pipeline
- React Router with URL-driven steps using query params
- Feature-based structure under `src/features` for scalability and separation of concerns
- Wizard state handled via a reducer and Context with sessionStorage persistence
- Mock API implemented as Vite middleware for both dev and preview

## Tradeoffs and known limitations

- Template thumbnail art in the Group Gifts page uses styled gradients instead of exact image assets
- Fonts load from local system if available; drop in font files to swap to the official brand fonts
- Only one template is rendered in the AI result view even though the API returns an array

## Assets

- Hero images are sourced from Unsplash and stored locally in `public/assets`
