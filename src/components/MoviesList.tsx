import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import Filter from "./Filter";
import useMovies from "../hooks/useMovies";


import { data } from "../api/testJson"

export default function MoviesList() {

  const {
    movies,
    page,
    setPage,
    query,
    setQuery,
    totalPages,
    loading,
    error,
    markWatched,
    isWatched,
  } = useMovies();

  if (error) {
    return (
      <p>
        Something went wrong. Please try again.
        <br />
        {error}
      </p>
    )
  }

  if (loading) {
    return (
      <div id="fullHeightLoader" className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }


  return (
    <main className="bg-light ptb100">
      <div className="container">
        <Filter query={query} setQuery={setQuery} />
        <div className="row">
          {movies.slice(0, 6).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              watched={isWatched(movie.id)}
              onMarkWatched={() => markWatched(movie.id)}
            />
          ))
          }
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </main>
  )
}
