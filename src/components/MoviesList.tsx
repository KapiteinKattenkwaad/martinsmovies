import fetchMovies from "../api/fetchMovies"

import { useState, useEffect } from "react"

import Filter from "./Filter"
import MovieCard from "./MovieCard"
import Pagination from "./Pagination"

import type { Movies } from "../types/Movies"


import { data } from "../api/testJson"

export default function MoviesList() {
  const [movies, setMovies] = useState<Movies>([])

  const getMovies = async () => {
    // const fetchedMovies = await fetchMovies()
    const fetchedMovies = data?.results

    console.log(data)
    //@ts-ignore
    setMovies(fetchedMovies)
  }

  useEffect(() => {
    getMovies()
    console.log({ movies })
  }, [])

  return (
    <main className="bg-light ptb100">
      <div className="container">
        <Filter />

      <div className="row">

      {movies.length && (
        <>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        </>
      )}
      </div>
      </div>
      <Pagination />
    </main>
  )
}
