import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getDetail, getMovieVideos, IMG_BASE_URL } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";

const getTrailer = (videos) => {
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");

  return (
    youtubeVideos.find(
      (video) => video.type === "Trailer" && video.official,
    ) ??
    youtubeVideos.find((video) => video.type === "Trailer") ??
    youtubeVideos[0] ??
    null
  );
};

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [posterLoading, setPosterLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const [movieData, videosData] = await Promise.all([
          getDetail(movieId),
          getMovieVideos(movieId),
        ]);
        setMovie(movieData);
        setTrailer(getTrailer(videosData ?? []));
        setPosterLoading(Boolean(movieData.backdrop_path));
      } catch (error) {
        console.error(error);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    setTrailerLoading(Boolean(trailer));
  }, [trailer]);

  if (loading) return <Loader />;

  if (error) {
    return <p className={s.message}>{error}</p>;
  }

  if (!movie) {
    return <p className={s.message}>Movie was not found.</p>;
  }

  const poster = movie.backdrop_path && `${IMG_BASE_URL}${movie.backdrop_path}`;
  const trailerUrl = trailer && `https://www.youtube.com/embed/${trailer.key}`;

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
          <div className={s.media} aria-busy={posterLoading}>
            {posterLoading && <Loader variant="overlay" />}
            <img
              className={clsx(s.img, posterLoading && s.imgLoading)}
              src={poster}
              alt={movie.title}
              onLoad={() => setPosterLoading(false)}
              onError={() => setPosterLoading(false)}
            />
          </div>
        )}
      </section>

      <section className={s.trailerCard}>
        <div className={s.trailerHeader}>
          <div>
            <p className={s.sectionEyebrow}>Preview</p>
            <h2 className={s.trailerTitle}>Watch trailer</h2>
          </div>

          {trailer && (
            <a
              className={s.youtubeLink}
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
            >
              Open YouTube
            </a>
          )}
        </div>

        {trailerUrl ? (
          <div className={s.trailerPlayer} aria-busy={trailerLoading}>
            {trailerLoading && <Loader variant="overlay" />}
            <iframe
              className={clsx(
                s.trailerFrame,
                trailerLoading && s.trailerFrameLoading,
              )}
              src={trailerUrl}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setTrailerLoading(false)}
            />
          </div>
        ) : (
          <p className={s.trailerEmpty}>
            Trailer is not available for this movie.
          </p>
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
