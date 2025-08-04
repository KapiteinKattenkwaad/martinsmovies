import type { Movie } from "../types/Movies";

const testMovie: Movie = {
  image: "https://gnodesign.com/templates/movify/assets/images/posters/poster-1.jpg",
  title: "Star Wars",
  rating: 7.5,
  category: "Action, Fantasy",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam...",
  detailsUrl: "/movie-detail",
  trailerUrl: "https://www.youtube.com/watch?v=Q0CbN8sfihY",
  id: 1,
  overview: "",
  poster_path: "",
  release_date: "",
  vote_average: 7.5,
};

export default function MovieCard({ movie = testMovie }: { movie?: Movie }) {
  const {
    image,
    title,
    rating,
    category,
    description,
    detailsUrl,
    trailerUrl,
  } = movie;

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <a href="#">
        <div className="movie-box-3 mb30">
          <div className="listing-container">
            <div className="listing-image">
              <img src={image} alt={title} />
            </div>
            <div className="listing-content">
              <div className="inner">
                {/* Play Button */}
                <div className="play-btn">
                  <a
                    href={trailerUrl}
                    className="play-video"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-play"></i>
                  </a>
                </div>
                <h2 className="title">{title}</h2>
                {/* Rating */}
                <div className="stars">
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <span>{rating}/10</span>
                    <span className="category">{category}</span>
                  </div>
                </div>
                <p>{description}</p>
                <a href={detailsUrl} className="btn btn-main btn-effect">
                  details
                </a>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}