import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import fetchMovies, { searchKeywords } from '../fetchMovies'

const mockPopularMoviesResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie 1',
      vote_average: 8.5,
      overview: 'Test overview 1',
      poster_path: '/test1.jpg',
      genre_ids: [28, 12],
      adult: false,
      backdrop_path: '/backdrop1.jpg',
      original_language: 'en',
      original_title: 'Test Movie 1',
      popularity: 100,
      release_date: '2024-01-01',
      video: false,
      vote_count: 1000
    },
    {
      id: 2,
      title: 'Test Movie 2',
      vote_average: 7.2,
      overview: 'Test overview 2',
      poster_path: '/test2.jpg',
      genre_ids: [35, 18],
      adult: false,
      backdrop_path: '/backdrop2.jpg',
      original_language: 'en',
      original_title: 'Test Movie 2',
      popularity: 85,
      release_date: '2024-02-01',
      video: false,
      vote_count: 800
    }
  ],
  total_pages: 10,
  total_results: 200
}

const mockKeywordMoviesResponse = {
  page: 1,
  results: [
    {
      id: 3,
      title: 'Keyword Movie',
      vote_average: 9.0,
      overview: 'Movie found by keyword',
      poster_path: '/keyword.jpg',
      genre_ids: [28],
      adult: false,
      backdrop_path: '/keyword-backdrop.jpg',
      original_language: 'en',
      original_title: 'Keyword Movie',
      popularity: 120,
      release_date: '2024-03-01',
      video: false,
      vote_count: 1500
    }
  ],
  total_pages: 5,
  total_results: 50
}

const mockKeywordsSearchResponse = {
  results: [
    { id: 1, name: 'action' },
    { id: 2, name: 'adventure' },
    { id: 3, name: 'superhero' }
  ]
}

const server = setupServer(
  http.get('https://api.themoviedb.org/3/movie/popular', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    
    if (page === '2') {
      return HttpResponse.json({
        ...mockPopularMoviesResponse,
        page: 2,
        results: []
      })
    }
    
    return HttpResponse.json(mockPopularMoviesResponse)
  }),

  // Discover movies with keywords endpoint
  http.get('https://api.themoviedb.org/3/discover/movie', ({ request }) => {
    const url = new URL(request.url)
    const keywordId = url.searchParams.get('with_keywords')
    
    if (keywordId === '123') {
      return HttpResponse.json(mockKeywordMoviesResponse)
    }
    
    return HttpResponse.json({ results: [], total_pages: 0, total_results: 0 })
  }),

  // Search keywords endpoint
  http.get('https://api.themoviedb.org/3/search/keyword', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    
    if (query === 'action') {
      return HttpResponse.json(mockKeywordsSearchResponse)
    }
    
    return HttpResponse.json({ results: [] })
  })
)

describe('fetchMovies API', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  describe('fetchMovies', () => {
    it('fetches popular movies by default', async () => {
      const result = await fetchMovies({})

      expect(result).toEqual(mockPopularMoviesResponse)
      expect(result.results).toHaveLength(2)
      expect(result.results[0].title).toBe('Test Movie 1')
      expect(result.results[1].title).toBe('Test Movie 2')
      expect(result.page).toBe(1)
      expect(result.total_pages).toBe(10)
    })

    it('fetches popular movies with specific page', async () => {
      const result = await fetchMovies({ page: 2 })

      expect(result.page).toBe(2)
      expect(result.results).toHaveLength(0)
    })

    it('fetches movies with keyword filter', async () => {
      const result = await fetchMovies({ keywordId: 123 })

      expect(result).toEqual(mockKeywordMoviesResponse)
      expect(result.results).toHaveLength(1)
      expect(result.results[0].title).toBe('Keyword Movie')
      expect(result.results[0].vote_average).toBe(9.0)
    })

    it('fetches movies with both page and keyword', async () => {
      const result = await fetchMovies({ page: 1, keywordId: 123 })

      expect(result).toEqual(mockKeywordMoviesResponse)
      expect(result.results[0].title).toBe('Keyword Movie')
    })

    it('handles API errors gracefully', async () => {
      // Override the handler to return an error
      server.use(
        http.get('https://api.themoviedb.org/3/movie/popular', () => {
          return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' })
        })
      )

      await expect(fetchMovies({})).rejects.toThrow('Failed to fetch movies')
    })

    it('handles network errors', async () => {
      // Override the handler to simulate network error
      server.use(
        http.get('https://api.themoviedb.org/3/movie/popular', () => {
          return HttpResponse.error()
        })
      )

      await expect(fetchMovies({})).rejects.toThrow('Failed to fetch movies')
    })
  })

  describe('searchKeywords', () => {
    it('searches for keywords successfully', async () => {
      const result = await searchKeywords('action')

      expect(result).toEqual(mockKeywordsSearchResponse.results)
      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('action')
      expect(result[1].name).toBe('adventure')
      expect(result[2].name).toBe('superhero')
    })

    it('returns empty array for no results', async () => {
      const result = await searchKeywords('nonexistent')

      expect(result).toEqual([])
    })

    it('handles search errors gracefully', async () => {
      // Override the handler to return an error
      server.use(
        http.get('https://api.themoviedb.org/3/search/keyword', () => {
          return new HttpResponse(null, { status: 404, statusText: 'Not Found' })
        })
      )

      await expect(searchKeywords('test')).rejects.toThrow('Failed to search keywords')
    })
  })
})
