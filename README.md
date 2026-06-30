# MovieFinder

MovieFinder is a responsive React application for discovering movies, browsing the catalog, and viewing detailed movie information from The Movie Database API. The project focuses on clean routing, readable component structure, API-driven UI states, and a polished responsive interface.

## Live Demo

[View the deployed app](https://movie-finder-ebon-zeta.vercel.app/)

## Preview

### Home

![MovieFinder home page](screenshots/home.png)

### Search and Filters

![MovieFinder search page](screenshots/search.png)

### Movie Details

![MovieFinder details page](screenshots/details.png)

## Key Features

- Browse trending movies on the home page
- Search movies by title
- Filter the catalog by genre and release year
- Debounce search input updates to avoid unnecessary API requests while typing
- Keep search, filter, and pagination state in URL query params
- Open detailed movie pages with overview, release date, genres, cast, reviews, and trailer
- Navigate nested routes for cast and reviews
- Display loading, empty, and error states
- Use responsive layouts with consistent breakpoints for mobile, tablet, and desktop

## Tech Stack

- React 19
- React Router
- Vite
- Axios
- CSS Modules
- Lucide React
- React Spinners
- The Movie Database API
- Vercel

## Technical Highlights

- Route-based architecture with lazy-loaded pages
- Reusable movie list, loader, navigation, footer, cast, and reviews components
- Centralized API service layer for TMDB requests
- URL-driven filters and pagination for shareable search results
- Debounced search state for smoother catalog filtering
- CSS Modules with shared design tokens and consistent `768px` / `1024px` breakpoints
- Accessible loading indicators and semantic page structure
- Basic Vitest and Testing Library coverage for reusable UI and helper logic

## Project Structure

```text
src
|-- components
|   |-- Footer
|   |-- Loader
|   |-- MovieCast
|   |-- MovieList
|   |-- MovieReviews
|   `-- Navigation
|-- hooks
|-- pages
|   |-- HomePage
|   |-- MovieDetailsPage
|   |-- MoviesPage
|   `-- NotFoundPage
|-- services
|   `-- api.jsx
|-- test
|-- App.jsx
|-- App.css
|-- index.css
`-- main.jsx
```

## Getting Started

### Requirements

- Node.js 18 or later
- TMDB read access token

### Installation

```bash
git clone https://github.com/Anastasiia-git/MovieFinder.git
cd MovieFinder
npm install
```

Create a `.env` file in the project root. You can copy `.env.example` and replace the placeholder token:

```bash
VITE_TMDB_TOKEN=your_tmdb_read_access_token
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

## What This Project Demonstrates

- Building a production-style React SPA with client-side routing
- Fetching and normalizing REST API data
- Managing async loading, empty, and error states
- Preserving UI state through URL search params
- Creating a responsive interface with reusable CSS patterns
- Testing small pieces of UI and reusable logic
- Keeping code organized into small, readable modules

## Future Improvements

- Add a favorites or watchlist feature
- Add skeleton loaders for movie cards
- Add broader integration tests for the full search flow
- Add sorting by rating, popularity, and release date

## Author

Anastasiia Totska

[GitHub](https://github.com/Anastasiia-git)
