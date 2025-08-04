export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  rating?: number;
  category?: string;
  description?: string;
  detailsUrl?: string;
  trailerUrl?: string;
  image?: string;
};

export type Movies = Movie[];