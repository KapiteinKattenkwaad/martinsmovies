import type { Movie } from "../types/Types";
import { extractGenres } from "../utils/genres";
import useMovie from "../hooks/useMovie";

const getImageUrl = (posterPath: string | null) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500/${posterPath}` 
    : 'https://dummyjson.com/image/150?text=No+image+found';
};

const truncateDescription = (overview: string, maxLength: number = 150) => {
  return overview.length > maxLength 
    ? overview.slice(0, maxLength) + '...' 
    : overview;
};

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

  const imagePoster = getImageUrl(poster_path);
  const genres = extractGenres(genre_ids).join(", ");
  const descriptionEllipse = truncateDescription(overview);
  const imdbLink = externalIds?.imdb_id;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div tabIndex={0} className="movie-box-3 mb30">
        <div className="listing-container">
          <div className="listing-image">
            <img src={imagePoster} alt={title} />
          </div>
          <div
            onClick={onMarkWatched}
            className={`listing-watched ${watched ? 'watched' : 'unwatched'}`}
            role="button"
            aria-label={watched ? "Mark as unwatched" : "Mark as watched"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onMarkWatched();
              }
            }}
          >
            <i className="fa fa-check"></i>
          </div>
          <div className="listing-content">
            <div className="inner">
              {/* Play Button */}
               {/* <div className="play-btn">
                 <a
                    href={trailerUrl}
                    className="play-video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-play"></i>
                  </a> 
              </div>  */}
              <h2 className="title">{title}</h2>
              <div className="stars">
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <span>{vote_average.toFixed(1)}/10</span>
                  <span className="category">{genres}</span>
                </div>
              </div>
              <p>{descriptionEllipse}</p>
              {imdbLink && !loading && (
                <a 
                  tabIndex={0} 
                  target="_blank" 
                  href={`https://www.imdb.com/title/${imdbLink}/`} 
                  className="btn btn-main btn-effect"
                  aria-label={`Visit IMDB page for ${title}`}
                >
                  Visit IMDB
                </a>
              )}
              <br />
              <button
                tabIndex={0}
                className={`btn mt-2 ${watched ? "btn btn-effect" : "btn-secondary "}`}
                onClick={onMarkWatched}
                aria-label={watched ? `Mark ${title} as unwatched` : `Mark ${title} as watched`}
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