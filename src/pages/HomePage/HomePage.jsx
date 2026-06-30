import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

const features = [
  {
    icon: "⚡",
    title: "Fast Search",
    text: "Find movies in seconds",
  },
  {
    icon: "🎞️",
    title: "Movie Details",
    text: "Cast, reviews, and genres",
  },
  {
    icon: "▶",
    title: "Watch Trailers",
    text: "Preview before watching",
  },
];

function HomePage() {
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTrendingData = async () => {
      setLoading(true);
      try {
        const trendingData = await getTrendingMovies();
        setHits(trendingData);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load trending movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getTrendingData();
  }, []);

  return (
    <main className={s.page}>
      <section className={s.hero}>
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>
            Find movies.
            <br />
            Save time.
            <br />
            <span>Watch trailers.</span>
          </h1>
          <p className={s.heroText}>
            Discover trending titles, filter the catalog by genre or year, and
            preview trailers before choosing what to watch.
          </p>
          <Link className={s.primaryBtn} to="/movies">
            ✦ Find Your Next Movie
          </Link>
        </div>

        <section className={s.features} aria-label="MovieFinder features">
          {features.map((feature) => (
            <article className={s.feature} key={feature.title}>
              <span className={s.featureIcon}>{feature.icon}</span>
              <div>
                <h2 className={s.featureTitle}>{feature.title}</h2>
                <p className={s.featureText}>{feature.text}</p>
              </div>
            </article>
          ))}
        </section>
      </section>

      <section className={s.trending} id="trending">
        <div className={s.heading}>
          <div className={s.titleRow}>
            <h1 className={s.title}>Trending Today</h1>
            <span className={s.dot} aria-hidden="true" />
            <p className={s.updated}>Updated daily</p>
          </div>
          <Link className={s.viewAll} to="/movies">
            View all →
          </Link>
        </div>

        {loading && <Loader loading={loading} />}
        {!loading && error && <p className={s.message}>{error}</p>}
        {!loading && !error && <MovieList movies={hits.slice(0, 8)} />}
      </section>
    </main>
  );
}

export default HomePage;
