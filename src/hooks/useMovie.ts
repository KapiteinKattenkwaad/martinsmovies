import { useState, useEffect } from "react";
import fetchExternalIds from '../api/fetchExternalIds'
import type { ExternalIds } from "../types/Types";

export default function useMovie(movieId: number) {
    const [externalIds, setExternalIds] = useState<ExternalIds | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean | string>(false)


    useEffect(() => { 
          if (!movieId) return;
        setLoading(true)
        fetchExternalIds({ movieId })
            .then(data => {
                setExternalIds(data)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [])

    return {
        externalIds,
        loading,
        error,
    };

}
