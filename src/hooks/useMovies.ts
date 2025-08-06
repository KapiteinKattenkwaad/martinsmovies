import { useState, useEffect } from "react";
import fetchMovies from '../api/fetchMovies'
import { searchKeywords } from '../api/fetchMovies';
import { useDebounce } from "./useDebouncer";
import { getWatched, markWatched } from "../utils/watchedMovies";
import type { Movie, Keyword } from "../types/Types"

export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [watchedIds, setWatchedIds] = useState<number[]>(getWatched())
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>("")
    const debouncedQuery = useDebounce(query, 400)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean | string>(false)
    const [keywordId, setKeywordId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (debouncedQuery) {
            setLoading(true);
            searchKeywords(debouncedQuery)
                .then((results: Keyword[]) => {
                    if (results.length > 0) {
                        setKeywordId(results[0].id);
                    } else {
                        setKeywordId(undefined);
                        setMovies([]);
                        setTotalPages(1);
                    }
                })
                .catch((error: string | boolean | ((prevState: string | boolean) => string | boolean)) => setError(error))
                .finally(() => setLoading(false));
        } else {
            setKeywordId(undefined);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        setLoading(true);
        fetchMovies({ page, keywordId })
            .then(data => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [page, keywordId]);

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
