import s from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import { IMG_BASE_URL } from "../../services/api";

const genresById = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Sci-Fi",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "TV Movie",
};

const getGenres = (movie) => {
  const genreNames = movie.genres?.map((genre) => genre.name);
  const mappedNames = movie.genre_ids?.map((id) => genresById[id]);

  return (genreNames ?? mappedNames ?? []).filter(Boolean).slice(0, 2);
};

function MovieList({ movies }) {
  const location = useLocation();

  if (!movies?.length) return null;

  return (
    <ul className={s.grid}>
      {movies.map((movie) => {
        const genres = getGenres(movie);
        const rating = movie.vote_average?.toFixed(1);

        return (
          <li className={s.card} key={movie.id}>
            <Link
              className={s.link}
              state={location}
              to={`/movies/${movie.id}`}
            >
              <div className={s.posterWrap}>
                {movie.poster_path ? (
                  <img
                    className={s.poster}
                    src={`${IMG_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                ) : (
                  <div className={s.noPoster}>
                    <span>{movie.title?.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className={s.body}>
                <h3 className={s.title} title={movie.title}>
                  {movie.title}
                </h3>
                {genres.length > 0 && (
                  <p className={s.genres}>{genres.join(" · ")}</p>
                )}
                {rating && (
                  <p className={s.rating}>
                    <span>★</span> {rating}
                  </p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
