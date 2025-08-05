const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_MOVIES_TMDB_API_KEY;

async function apiFetch(endpoint: string, params: Record<string, string | number> = {}) {
  const stringParams: Record<string, string> = {};
  Object.keys(params).forEach(key => {
    stringParams[key] = params[key].toString();
  });

  const urlParams = new URLSearchParams({
    api_key: apiKey,
    ...stringParams
  });

  const url = `${BASE_URL}${endpoint}?${urlParams}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpoint}: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
}

export default async function fetchMovies({
  page = 1,
  keywordId,
}: { page?: number; keywordId?: number }) {
  try {
    if (keywordId) {
      return await apiFetch('/discover/movie', {
        with_keywords: keywordId,
        page: page
      });
    } else {
      return await apiFetch('/movie/popular', {
        page: page
      });
    }
  } catch (error) {
    throw new Error(`Failed to fetch movies: ${error}`);
  }
}

export async function searchKeywords(query: string) {
  try {
    const data = await apiFetch('/search/keyword', {
      query: query
    });
    return data.results;
  } catch (error) {
    throw new Error(`Failed to search keywords: ${error}`);
  }
}