import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

function HomePages() {
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
    <div>
      <h1 className={s.title}>Trending Today</h1>
      {loading && <Loader loading={loading} />}
      {!loading && error && <p className={s.message}>{error}</p>}
      {!loading && !error && <MovieList movies={hits} />}
    </div>
  );
}

export default HomePages;
