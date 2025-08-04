const BASE_URL = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_MOVIES_TMDB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};


export default async function fetchMovies() {
    try {

            const response = await fetch(
                `${BASE_URL}/movie/changes?page=1'`,
                options
            );
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            return data.results;
        }
    
     catch (error) {
        console.error(error);
        return error;
    }
}