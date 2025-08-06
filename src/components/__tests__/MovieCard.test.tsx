import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MovieCard from '../MovieCard'
import type { Movie } from '../../types/Types'

vi.mock('../../hooks/useMovie', () => ({
  default: vi.fn(() => ({
    loading: false,
    externalIds: { imdb_id: 'tt1234567' },
    error: null
  }))
}))

vi.mock('../../utils/genres', () => ({
  extractGenres: vi.fn(() => ['Action', 'Adventure'])
}))

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    vote_average: 8.5,
    overview: 'This is a test movie overview that should be displayed in the card.',
    poster_path: '/test-poster.jpg',
    genre_ids: [28, 12],
    adult: false,
    backdrop_path: '/test-backdrop.jpg',
    original_language: 'en',
    original_title: 'Test Movie',
    popularity: 100,
    release_date: '2024-01-01',
    video: false,
    vote_count: 1000
  }

  const mockOnMarkWatched = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays movie information correctly', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        watched={false} 
        onMarkWatched={mockOnMarkWatched} 
      />
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()

    expect(screen.getByText('8.5/10')).toBeInTheDocument()

    expect(screen.getByText('Action, Adventure')).toBeInTheDocument()

    expect(screen.getByText('This is a test movie overview that should be displayed in the card.')).toBeInTheDocument()

    const posterImage = screen.getByAltText('Test Movie')
    expect(posterImage).toBeInTheDocument()
    expect(posterImage).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500//test-poster.jpg')

    expect(screen.getByText('Visit IMDB')).toBeInTheDocument()
    expect(screen.getByText('Visit IMDB')).toHaveAttribute('href', 'https://www.imdb.com/title/tt1234567/')

    // Check if watch button is displayed with correct text for unwatched movie
    expect(screen.getByText('Mark as Watched')).toBeInTheDocument()
  })

  it('displays correct button text when movie is watched', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        watched={true} 
        onMarkWatched={mockOnMarkWatched} 
      />
    )

    expect(screen.getByText('Mark as unwatched')).toBeInTheDocument()
  })

  it('displays fallback image when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null }
    
    render(
      <MovieCard 
        movie={movieWithoutPoster} 
        watched={false} 
        onMarkWatched={mockOnMarkWatched} 
      />
    )

    const posterImage = screen.getByAltText('Test Movie')
    expect(posterImage).toHaveAttribute('src', 'https://dummyjson.com/image/150?text=No+image+found')
  })
})
