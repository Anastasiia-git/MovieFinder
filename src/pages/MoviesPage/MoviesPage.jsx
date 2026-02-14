import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";

  const [searchQuery, setSearchQuery] = useState(searchParam);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    const getMovies = async () => {
      if (!searchParam) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await searchMovies(searchParam);
        setMovies(searchResults);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchParam]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = searchQuery.trim();
    if (!value) {
      toast.error("Please enter a search query.");
      return;
    }

    setSearchParams({ search: value });
  };

  return (
    <>
      <header className={s.box}>
        <Toaster position="top-left" reverseOrder={false} />

        <div className={s.head}>
          <h2 className={s.title}>Search movies</h2>
          <p className={s.subtitle}>Type a title and hit search.</p>
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.inputWrap}>
            <span className={s.icon} aria-hidden="true">
              🔎
            </span>

            <input
              className={s.field}
              type="text"
              placeholder="e.g. Interstellar, Dune, Parasite..."
              value={searchQuery}
              onChange={handleChange}
            />
          </div>

          <button className={s.btn} type="submit">
            Search
          </button>
        </form>
      </header>

      <main>
        {loading ? (
          <Loader loading={loading} />
        ) : movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          searchParam && <p>Sorry, we didn't find anything 😢</p>
        )}
      </main>
    </>
  );
}

export default MoviesPage;
