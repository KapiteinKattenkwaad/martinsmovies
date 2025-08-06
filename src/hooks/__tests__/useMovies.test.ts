import { renderHook, waitFor, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import useMovies from '../useMovies'

vi.mock('../../api/fetchMovies', () => ({
  default: vi.fn(),
  searchKeywords: vi.fn()
}))

vi.mock('../useDebouncer', () => ({
  useDebounce: vi.fn((value) => value) // Return value immediately for testing
}))

vi.mock('../../utils/watchedMovies', () => ({
  getWatched: vi.fn(() => []),
  markWatched: vi.fn()
}))

// Import mocked functions for type safety
import fetchMovies, { searchKeywords } from '../../api/fetchMovies'
import { useDebounce } from '../useDebouncer'
import { getWatched, markWatched } from '../../utils/watchedMovies'

const mockFetchMovies = vi.mocked(fetchMovies)
const mockSearchKeywords = vi.mocked(searchKeywords)
const mockUseDebounce = vi.mocked(useDebounce)
const mockGetWatched = vi.mocked(getWatched)
const mockMarkWatched = vi.mocked(markWatched)

describe('useMovies', () => {
  const mockMoviesResponse = {
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
    total_pages: 5,
    page: 1
  }

  const mockKeywordsResponse = [
    { id: 123, name: 'action' },
    { id: 456, name: 'adventure' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default mock implementations
    mockFetchMovies.mockResolvedValue(mockMoviesResponse)
    mockSearchKeywords.mockResolvedValue(mockKeywordsResponse)
    mockGetWatched.mockReturnValue([])
    mockUseDebounce.mockImplementation((value) => value)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('initializes with default values', async () => {
    const { result } = renderHook(() => useMovies())

    expect(result.current.movies).toEqual([])
    expect(result.current.page).toBe(1)
    expect(result.current.query).toBe('')
    expect(result.current.totalPages).toBe(1)
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(false)

    // Wait for initial fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.movies).toEqual(mockMoviesResponse.results)
    expect(result.current.totalPages).toBe(5)
  })

  it('fetches movies on mount', async () => {
    renderHook(() => useMovies())

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({ page: 1, keywordId: undefined })
    })
  })

  it('updates page and fetches new movies', async () => {
    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.page).toBe(2)

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({ page: 2, keywordId: undefined })
    })
  })

  it('searches keywords when query changes', async () => {
    // Mock debounce to return the query immediately
    mockUseDebounce.mockImplementation((value) => value)
    
    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setQuery('action')
    })

    expect(result.current.query).toBe('action')

    await waitFor(() => {
      expect(mockSearchKeywords).toHaveBeenCalledWith('action')
    })

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({ page: 1, keywordId: 123 })
    })
  })

  it('handles empty keyword search results', async () => {
    mockSearchKeywords.mockResolvedValue([])
    
    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setQuery('nonexistent')
    })

    await waitFor(() => {
      expect(mockSearchKeywords).toHaveBeenCalledWith('nonexistent')
    })

    // Should clear movies and reset pages when no keywords found
    await waitFor(() => {
      expect(result.current.movies).toEqual([])
      expect(result.current.totalPages).toBe(1)
    })
  })

  it('handles fetch movies error', async () => {
    const errorMessage = 'Failed to fetch movies'
    mockFetchMovies.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useMovies())

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
      expect(result.current.loading).toBe(false)
    })
  })

  it('handles search keywords error', async () => {
    const errorMessage = 'Failed to search keywords'
    mockSearchKeywords.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setQuery('test')
    })

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })
  })

  it('manages watched movies correctly', async () => {
    mockGetWatched.mockReturnValue([1, 3])

    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.isWatched(1)).toBe(true)
    expect(result.current.isWatched(2)).toBe(false)
    expect(result.current.isWatched(3)).toBe(true)

    act(() => {
      result.current.markWatched(2)
    })

    expect(mockMarkWatched).toHaveBeenCalledWith(2)
    expect(mockGetWatched).toHaveBeenCalled()
  })

  it('updates watched list after marking a movie', async () => {
    mockGetWatched.mockReturnValueOnce([])
    
    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.isWatched(1)).toBe(false)

    mockGetWatched.mockReturnValueOnce([1])

    act(() => {
      result.current.markWatched(1)
    })

    expect(mockMarkWatched).toHaveBeenCalledWith(1)
    
    await waitFor(() => {
      expect(result.current.isWatched(1)).toBe(true)
    })
  })

  it('clears keyword when query is empty', async () => {
    const { result } = renderHook(() => useMovies())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Set a query first
    act(() => {
      result.current.setQuery('action')
    })

    await waitFor(() => {
      expect(mockSearchKeywords).toHaveBeenCalledWith('action')
    })

    act(() => {
      result.current.setQuery('')
    })

    await waitFor(() => {
      expect(mockFetchMovies).toHaveBeenCalledWith({ page: 1, keywordId: undefined })
    })
  })
})
