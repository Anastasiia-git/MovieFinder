import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
  },
});

const checkToken = () => {
  if (!API_TOKEN) {
    throw new Error("Missing VITE_TMDB_TOKEN in environment variables");
  }
};

export const getTrendingMovies = async () => {
  try {
    checkToken();
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.response || error);
    throw error;
  }
};

export const getMovies = async ({ page = 1, genre, year, search } = {}) => {
  try {
    checkToken();
    const endpoint = search ? "/search/movie" : "/discover/movie";
    const response = await api.get(endpoint, {
      params: {
        query: search || undefined,
        include_adult: false,
        language: "en-US",
        page,
        sort_by: search ? undefined : "popularity.desc",
        with_genres: genre || undefined,
        primary_release_year: year || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response || error);
    throw error;
  }
};

export const getMovieGenres = async () => {
  try {
    checkToken();
    const response = await api.get("/genre/movie/list", {
      params: {
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error.response || error);
    throw error;
  }
};

export const getDetail = async (movieId) => {
  try {
    checkToken();
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error details movies:", error.response || error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    checkToken();
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    console.error("Error movie videos:", error.response || error);
    throw error;
  }
};

export const getCast = async (movieId) => {
  try {
    checkToken();
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error cast movies:", error.response || error);
    throw error;
  }
};

export const getReviews = async (movieId) => {
  try {
    checkToken();
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error reviews movies:", error.response || error);
    throw error;
  }
};

export { IMG_BASE_URL };
