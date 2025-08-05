import { useState, useEffect } from "react";
import fetchMovies from '../api/fetchMovies'
import { getWatched, markWatched } from "../utils/watchedMovies";
import type { Movie } from "../types/Types"

export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [watchedIds, setWatchedIds] = useState<number[]>(getWatched())
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>("")
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean | string>(false)


    useEffect(() => {
        setLoading(true)
        fetchMovies({ page, query })
            .then(data => {
                setMovies(data.results)
                setTotalPages(data.total_pages)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [page, query])

    const handleMarkWatched = (id: number) => {
        markWatched(id);
        setWatchedIds(getWatched());
    };

    return {
        movies,
        page,
        setPage,
        query,
        setQuery,
        totalPages,
        loading,
        error,
        markWatched: handleMarkWatched,
        isWatched: (id: number) => watchedIds.includes(id)
    };

}
