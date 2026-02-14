import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTY3YTQ3M2JlNDg2ZGM0N2YzODc3MDdiZTY3OTUzYiIsIm5iZiI6MTc0NTMzMjQwNy44NzUsInN1YiI6IjY4MDdhOGI3MTVhMWQ1YTYxNGFhN2FhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dQ0g2wOzNnhSXcthdBjp2fHCHr7HdUOP9rwA-MIMutU",
  },
});

export const getTrendingMovies = async () => {
  try {
    // console.log("Fetching trending movies...");
    const response = await api.get("/trending/movie/day");
    // console.log("Trending movies response:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.response || error);
    throw error;
  }
};

export const searchMovies = async (search) => {
  try {
    // console.log("Searching movies with search:", search);
    const response = await api.get("/search/movie", {
      params: {
        query: search,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    // console.log("Search movies response:", response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error.response || error);
    throw error;
  }
};

export const getDetail = async (movieId) => {
   try {
    //  console.log("Searching movies detail with:", movieId);
     const response = await api.get(`/movie/${movieId}`); 
    //  console.log("Movies detail response:", response.data);
     return response.data;
   } catch (error) {
    console.error("Error details movies:", error.response || error);
    throw error;
  }
};

export const getCast = async (movieId) => {
  try {
    // console.log("Searching cast detail with:", movieId);
    const response = await api.get(`/movie/${movieId}//credits`);
    // console.log("Movies cast response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error cast movies:", error.response || error);
    throw error;
  }
};

export const getReviews = async (movieId) => {
  try {
    // console.log("Searching reviews detail with:", movieId);
    const response = await api.get(`/movie/${movieId}//reviews`);
    // console.log("Movies reviews response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error reviews movies:", error.response || error);
    throw error;
  }
};

export { IMG_BASE_URL };