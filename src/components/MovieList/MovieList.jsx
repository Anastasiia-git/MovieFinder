import s from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import { IMG_BASE_URL } from "../../services/api";

function MovieList({ movies }) {
  const location = useLocation();

  if (!movies?.length) return null;

  return (
    <ul className={s.grid}>
      {movies.map((movie) => {
        const poster = movie.poster_path
          ? `${IMG_BASE_URL}${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Poster";

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

              <h3 className={s.title} title={movie.title}>
                {movie.title}
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
