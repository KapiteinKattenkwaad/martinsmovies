import { useState, useEffect } from "react";
import fetchExternalIds from '../api/fetchExternalIds'
import type { ExternalIds } from "../types/Types";

export default function useMovie(movieId: number) {
    const [externalIds, setExternalIds] = useState<ExternalIds | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => { 
        if (!movieId) return;
        
        const fetchMovieExternalIds = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const data = await fetchExternalIds({ movieId })
                setExternalIds(data)
            } catch (err) {
                console.error(`Error fetching external IDs for movie ${movieId}:`, err)
                setError(err instanceof Error ? err.message : 'Unknown error occurred')
            } finally {
                setLoading(false)
            }
        }
        
        fetchMovieExternalIds()
    }, [movieId])

    return {
        externalIds,
        loading,
        error
    };
}
