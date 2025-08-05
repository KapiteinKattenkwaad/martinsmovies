import type { Movie } from "../types/Types";
import { extractGenres } from "../utils/genres";
import useMovie from "../hooks/useMovie";

export default function MovieCard({ movie, watched, onMarkWatched }: { movie: Movie, watched: boolean, onMarkWatched: () => void }) {

  const {
    id,
    title,
    vote_average,
    overview,
    poster_path,
    genre_ids
  } = movie;


  const {
    loading,
    externalIds
  } = useMovie(id);

  const imagePoster = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://dummyjson.com/image/150?text=No+image+found'
  const genres = extractGenres(genre_ids).join(", ");
  const descriptionEllipse = overview.length > 150 ? overview.slice(0, 150) + '...' : overview
  const imdbLink = externalIds ? externalIds?.imdb_id : null;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div tabIndex={0} className="movie-box-3 mb30">
        <div className="listing-container">
          <div className="listing-image">
            <img src={imagePoster} alt={title} />
          </div>
          <div
            onClick={onMarkWatched}
            className={`listing-watched ${watched ? 'watched' : 'unwatched'}`}>
            <i className="fa fa-check"></i>
          </div>
          <div className="listing-content">
            <div className="inner">
              {id}
              {/* Play Button */}
              <div className="play-btn">
                {/* <a
                    href={trailerUrl}
                    className="play-video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-play"></i>
                  </a> */}
              </div>
              <h2 className="title">{title}</h2>
              {/* Rating */}
              <div className="stars">
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <span>{vote_average.toFixed(1)}/10</span>
                  <span className="category">{genres}</span>
                </div>
              </div>
              <p>{descriptionEllipse}</p>
              {imdbLink && !loading && (
                <a  tabIndex={0} target="_blank" href={`https://www.imdb.com/title/${imdbLink}/`} className="btn btn-main btn-effect">
                  Visit IMDB
                </a>
              )}
              <br />
              <button
               tabIndex={0}
                className={`btn mt-2 ${watched ? "btn btn-effect" : "btn-secondary "}`}
                onClick={onMarkWatched}
              >
                {watched ? "Mark as unwatched" : "Mark as Watched"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}