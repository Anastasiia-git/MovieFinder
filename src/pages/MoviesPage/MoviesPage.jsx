import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Film,
  Search,
  X,
} from "lucide-react";
import { getMovieGenres, getMovies } from "../../services/api";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import FilterDropdown from "./FilterDropdown";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { getPaginationItems } from "./pagination";

const currentYear = new Date().getFullYear();
const years = [
  "",
  ...Array.from({ length: currentYear - 1898 }, (_, index) =>
    String(currentYear + 1 - index),
  ),
];

const getPage = (value) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGenrePickerOpen, setIsGenrePickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") ?? "";
  const genreParam = searchParams.get("genre") ?? "";
  const yearParam = searchParams.get("year") ?? "";
  const pageParam = getPage(searchParams.get("page"));

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedGenreId, setSelectedGenreId] = useState(genreParam);
  const [selectedYear, setSelectedYear] = useState(yearParam);
  const debouncedSearchQuery = useDebouncedValue(searchQuery.trim(), 500);
  const selectedGenre =
    genres.find((genre) => String(genre.id) === selectedGenreId)?.name ??
    "All genres";
  const paginationItems = useMemo(
    () => getPaginationItems(pageParam, totalPages),
    [pageParam, totalPages],
  );

  const updateParams = useCallback(
    (nextValues, { replace = false } = {}) => {
      const nextParams = new URLSearchParams(searchParams);
      let hasChanges = false;

      Object.entries(nextValues).forEach(([key, value]) => {
        const nextValue = value || "";
        const currentValue = nextParams.get(key) ?? "";

        if (currentValue === nextValue) {
          return;
        }

        hasChanges = true;

        if (nextValue) {
          nextParams.set(key, nextValue);
        } else {
          nextParams.delete(key);
        }
      });

      if (!hasChanges) {
        return;
      }

      nextParams.set("page", "1");
      setSearchParams(nextParams, { replace });
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    setSelectedGenreId(genreParam);
  }, [genreParam]);

  useEffect(() => {
    setSelectedYear(yearParam);
  }, [yearParam]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreData = await getMovieGenres();
        setGenres(genreData);
      } catch (err) {
        console.error(err);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    updateParams(
      {
        search: debouncedSearchQuery,
        genre: debouncedSearchQuery ? "" : selectedGenreId,
        year: selectedYear,
      },
      { replace: true },
    );
  }, [debouncedSearchQuery, selectedGenreId, selectedYear, updateParams]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMovies({
          page: pageParam,
          search: searchParam,
          genre: searchParam ? "" : genreParam,
          year: yearParam,
        });
        setMovies(data.results ?? []);
        setTotalPages(Math.max(1, Math.min(data.total_pages ?? 1, 500)));
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [genreParam, pageParam, searchParam, yearParam]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsGenrePickerOpen(false);
    setIsYearPickerOpen(false);
    const nextSearch = searchQuery.trim();
    updateParams({
      search: nextSearch,
      genre: nextSearch ? "" : selectedGenreId,
      year: selectedYear,
    });
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenreId(genre ? String(genre.id) : "");
    setSearchQuery("");
    setIsGenrePickerOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearPickerOpen(false);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedGenreId("");
    setSelectedYear("");
    setIsGenrePickerOpen(false);
    setIsYearPickerOpen(false);
    setSearchParams({ page: "1" });
  };

  const goToPage = (page) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams);
  };

  const hasFilters = Boolean(searchParam || genreParam || yearParam);

  return (
    <main className={s.page}>
      <section className={s.panel}>
        <div className={s.head}>
          <h1 className={s.title}>Movies</h1>
          <p className={s.subtitle}>
            Browse popular movies, search by title, or filter by genre and
            release year.
          </p>
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.fieldGroup}>
            <span className={s.label}>Search title</span>
            <span className={s.fieldWrap}>
              <Search className={s.fieldIcon} size={18} aria-hidden="true" />
              <input
                className={s.field}
                type="search"
                placeholder="e.g. Interstellar"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </span>
          </label>

          <FilterDropdown
            label="Genre"
            value={selectedGenre}
            Icon={Film}
            isOpen={isGenrePickerOpen && !searchQuery.trim()}
            isDisabled={Boolean(searchQuery.trim())}
            onToggle={() => {
              setIsYearPickerOpen(false);
              setIsGenrePickerOpen((isOpen) => !isOpen);
            }}
          >
            <button
              className={`${s.optionButton} ${
                !selectedGenreId ? s.optionButtonActive : ""
              }`}
              type="button"
              onClick={() => handleGenreSelect(null)}
            >
              All genres
            </button>
            {genres.map((genre) => (
              <button
                className={`${s.optionButton} ${
                  String(genre.id) === selectedGenreId
                    ? s.optionButtonActive
                    : ""
                }`}
                type="button"
                key={genre.id}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre.name}
              </button>
            ))}
          </FilterDropdown>

          <FilterDropdown
            label="Year"
            value={selectedYear || "Any year"}
            Icon={CalendarDays}
            isOpen={isYearPickerOpen}
            onToggle={() => {
              setIsGenrePickerOpen(false);
              setIsYearPickerOpen((isOpen) => !isOpen);
            }}
          >
            {years.map((year) => (
              <button
                className={`${s.optionButton} ${
                  selectedYear === year ? s.optionButtonActive : ""
                }`}
                type="button"
                key={year || "any-year"}
                onClick={() => handleYearSelect(year)}
              >
                {year || "Any year"}
              </button>
            ))}
          </FilterDropdown>

          <button className={s.btn} type="submit">
            <span>Search</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          {hasFilters && (
            <button className={s.clearBtn} type="button" onClick={handleClear}>
              <X size={17} aria-hidden="true" />
              <span>Clear</span>
            </button>
          )}
        </form>
      </section>

      <section className={s.results}>
        <div className={s.resultsHead}>
          <h2 className={s.resultsTitle}>
            {searchParam ? `Results for "${searchParam}"` : "All movies"}
          </h2>
          <p className={s.pageInfo}>
            Page {pageParam} of {totalPages}
          </p>
        </div>

        {loading && <Loader />}
        {!loading && error && <p className={s.message}>{error}</p>}
        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
        {!loading && !error && movies.length === 0 && (
          <p className={s.message}>No movies found.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className={s.pagination}>
            <button
              className={s.pageBtn}
              type="button"
              onClick={() => goToPage(pageParam - 1)}
              disabled={pageParam <= 1}
            >
              Previous
            </button>
            <div className={s.pageNumbers} aria-label="Pagination pages">
              {paginationItems.map((item) =>
                typeof item === "string" ? (
                  <span className={s.pageGap} key={item}>
                    ...
                  </span>
                ) : (
                  <button
                    className={`${s.pageNumber} ${
                      item === pageParam ? s.pageNumberActive : ""
                    }`}
                    type="button"
                    key={item}
                    onClick={() => goToPage(item)}
                    aria-current={item === pageParam ? "page" : undefined}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <button
              className={s.pageBtn}
              type="button"
              onClick={() => goToPage(pageParam + 1)}
              disabled={pageParam >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default MoviesPage;
