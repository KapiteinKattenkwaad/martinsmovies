# Martin's Movies

A React-based movie discovery app that lets you search for movies and track which ones you've watched. Built with TypeScript, Vite, and The Movie Database (TMDB) API.

Check it out at [martinsmovies](https://martinmovies.netlify.app/)

## Features

- 🔍 **Search Movies**: Search for movies by keywords
- 📋 **Browse Popular**: View popular movies when no search is active
- ✅ **Track Watched**: Mark movies as watched and keep track locally
- 📄 **Pagination**: Navigate through multiple pages of results
- 🎨 **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── api/                 # API calls to TMDB
│   ├── fetchMovies.ts   # Main movie fetching logic
│   └── fetchExternalIds.ts
├── components/          # React components
│   ├── MoviesList.tsx   # Main movies display
│   ├── MovieCard.tsx    # Individual movie card
│   ├── Filter.tsx       # Search input
│   ├── Pagination.tsx   # Page navigation
│   ├── Header.tsx       # Site header
│   ├── Navbar.tsx       # Navigation bar
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   ├── useMovies.ts     # Main movies state management
│   ├── useMovie.ts      # Single movie logic
│   └── useDebouncer.ts  # Search debouncing
├── types/               # TypeScript type definitions
│   └── Types.ts         # Movie and API types
├── utils/               # Utility functions
│   └── watchedMovies.ts # Local storage for watched movies
└── styles/              # CSS styling files
```

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KapiteinKattenkwaad/martinsmovies.git
   cd martinsmovies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your TMDB API key:
   ```
   VITE_MOVIES_TMDB_API_KEY="your_api_key_here"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run Tests

## How It Works

1. **Search**: Type in the search box to find movies by keywords
2. **Browse**: Without a search term, the app shows popular movies
3. **Watch Status**: Click the watch button on any movie card to mark it as watched
4. **Pagination**: Use the pagination controls to browse through results
5. **Local Storage**: Your watched movies are saved locally in your browser

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TMDB API** - Movie data source
- **Bootstrap** - CSS framework for styling
- **Local Storage** - Persistent watched movies tracking

## API Integration

The app uses The Movie Database (TMDB) API to:
- Search for movies by keywords
- Fetch popular movies
- Get detailed movie information
- Retrieve movie posters and metadata

## TODOS

- Make sorting work
- Make grid layout change work
- Add movie details page
- Add YouTube trailer player
- Add in missing links (e.g.: Homepage)