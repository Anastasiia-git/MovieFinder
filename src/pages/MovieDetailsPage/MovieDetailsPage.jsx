import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getDetail, IMG_BASE_URL } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await getDetail(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) return null;

  const poster = movie.backdrop_path && `${IMG_BASE_URL}${movie.backdrop_path}`;

  const setTabClass = ({ isActive }) => clsx(s.tab, isActive && s.tabActive);

  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <Link className={s.backBtn} to={goBackRef.current}>
          ← Back
        </Link>
      </div>

      <section className={s.card}>
        <div className={s.content}>
          <h1 className={s.title}>{movie.title}</h1>

          <div className={s.metaRow}>
            <span className={s.metaLabel}>Release date</span>
            <span className={s.metaValue}>{movie.release_date || "—"}</span>
          </div>

          <div className={s.block}>
            <h2 className={s.blockTitle}>Overview</h2>
            <p className={s.text}>
              {movie.overview || "No overview available."}
            </p>
          </div>

          <div className={s.block}>
            <h2 className={s.blockTitle}>Genres</h2>
            <ul className={s.genres}>
              {(movie.genres ?? []).map((g) => (
                <li key={g.id} className={s.genrePill}>
                  {g.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {poster && (
          <div className={s.media}>
            <img className={s.img} src={poster} alt={movie.title} />
          </div>
        )}
      </section>

      <section className={s.tabsCard}>
        <h2 className={s.tabsTitle}>Additional information</h2>

        <nav className={s.tabs}>
          <NavLink className={setTabClass} to="cast">
            Cast
          </NavLink>
          <NavLink className={setTabClass} to="reviews">
            Reviews
          </NavLink>
        </nav>

        <div className={s.outlet}>
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default MovieDetailsPage;
