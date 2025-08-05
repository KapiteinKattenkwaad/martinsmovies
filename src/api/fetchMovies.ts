const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_MOVIES_TMDB_API_KEY;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

export default async function fetchMovies({
    page = 1,
    keywordId,
}: { page?: number; keywordId?: number }) {

    try {
        const url = keywordId
            ? `${BASE_URL}/discover/movie?api_key=${apiKey}&with_keywords=${keywordId}&page=${page}`
            : `${BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}`;

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error(error);
        return error;
    }
}

export async function searchKeywords(query: string) {
    try {
        const url = `${BASE_URL}/search/keyword?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch keywords");
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error(error);
        return error;
    }
}