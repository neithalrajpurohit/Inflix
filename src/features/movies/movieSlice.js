import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES } from "../../data/movies";
import { MOVIE_GENRES } from "../../data/movieGenres";
import { MOVIE_ANALYTICS } from "../../data/movieAnalytics";
import axios from "axios";

export const fetchMoviesDetails = createAsyncThunk(
    "movies/details",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${data.movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
            );
            const videos = await axios.get(
                `https://api.themoviedb.org/3/movie/${data.movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
            );
            const movieData = {
                ...response.data,
                ...videos.data.results.find(
                    (v) => v.site?.toLowerCase() === "YouTube".toLowerCase()
                ),
            };
            return movieData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    isFetching: false,
    movies: [],
    genres: [],
    movieAnalytics: null,
    movieDetails: null,
    isLoading: false,
    error: null,
};

const movieSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // CUSTOMER
        getPopularMovies: (state, action) => {
            let movies = localStorage.getItem("movie");
            if (movies) {
                movies = JSON.parse(movies);
                state.movies = movies;
            } else {
                state.movies = MOVIES;
            }
        },
        getGenres: (state, action) => {
            state.genres = MOVIE_GENRES;
        },
        filterMoviesByGenres: (state, action) => {
            const { genreId } = action.payload;
            if (genreId === "all") {
                state.movies = MOVIES;
                return;
            }

            let prevMovies = localStorage.getItem("movie");
            if (prevMovies) {
                prevMovies = JSON.parse(prevMovies);
                state.movies = prevMovies;
                const movies = state.movies.filter((movie) =>
                    movie.genre_ids.includes(genreId)
                );
                state.movies = movies;
            } else {
                state.movies = MOVIES;
                const movies = state.movies.filter((movie) =>
                    movie.genre_ids.includes(genreId)
                );
                state.movies = movies;
            }
        },

        //manager
        editGenre: (state, action) => {
            const { genresId, movieId } = action.payload;
            const updatedMovies = state.movies.map((movie) => {
                if (movie.id === movieId) {
                    movie.genre_ids = genresId.map((genre) => genre.value);
                }
                return movie;
            });
            localStorage.setItem("movie", JSON.stringify(updatedMovies));
            state.movies = updatedMovies;
        },

        //admin
        getAllMovieAnalytics: (state, action) => {
            const movies = MOVIES.map((movie) => {
                return {
                    ...movie,
                    analytics: MOVIE_ANALYTICS.find(
                        (analytics) => analytics.movieId === movie.id
                    ),
                };
            });
            state.movies = movies;
        },

        getMovieAnalytics: (state, action) => {
            const { movieId } = action.payload;
            const findMovie = MOVIES.find(
                (movie) => movie.id === Number(movieId)
            );
            const analytics = MOVIE_ANALYTICS.find(
                (analytics) => analytics.movieId === findMovie.id
            );
            state.movieAnalytics = {
                ...findMovie,
                analytics,
            };
        },
    },
    extraReducers: {
        [fetchMoviesDetails.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchMoviesDetails.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.movieDetails = action.payload;
        },
        [fetchMoviesDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getGenres,
    getPopularMovies,
    filterMoviesByGenres,
    editGenre,
    getAllMovieAnalytics,
    getMovieAnalytics,
} = movieSlice.actions;
export default movieSlice.reducer;
