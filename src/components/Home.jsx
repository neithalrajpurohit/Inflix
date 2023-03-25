import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
    getGenres,
    getPopularMovies,
    filterMoviesByGenres,
} from "../features/movies/movieSlice";
import Header from "./Header";
import MovieCard from "./MovieCard";
import Sidebar from "./Sidebar";
import { getLoggedInUser } from "../features/auth/authSlice";

const Home = () => {
    const [featuredMovie, setfeaturedMovie] = useState(null);
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moviesData = useSelector((state) => state.movies);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getPopularMovies());
        dispatch(getGenres());
        dispatch(getLoggedInUser());
    }, []);

    useEffect(() => {
        if (showGenreModal) {
            document.body.style.overflow = "hidden";
        }
    }, [showGenreModal]);

    useEffect(() => {
        if (moviesData.movies.length >= 1) {
            let randomIndex = Math.floor(
                Math.random() * moviesData.movies.length
            );
            setfeaturedMovie(moviesData.movies[randomIndex]);
        }
    }, [moviesData.movies]);

    const moviesByGenres = (genreId, name) => {
        dispatch(filterMoviesByGenres({ genreId }));
        document.body.style.overflow = "auto";
        setShowGenreModal(false);
        setSelectedGenre(name);
    };

    return (
        <div className="bg-[#4f6d7a]">
            <Header setShowGenreModal={setShowGenreModal} />

            <div className="flex">
                {(auth.loggedInUser?.role === "ADMIN" ||
                    auth.loggedInUser?.role === "MANAGER") && (
                    <div className="min-w-[220px] hidden sm:block broder border-r border-gray-200">
                        <div className="fixed">
                            <Sidebar />
                        </div>
                    </div>
                )}
                <div>
                    {featuredMovie && (
                        <div
                            className="h-[700px] relative cursor-pointer"
                            onClick={() =>
                                navigate(`/movie/stream/${featuredMovie.id}`)
                            }>
                            <div className="bg-[rgba(0,0,0,.6)] absolute top-0 right-0 left-0 bottom-0" />
                            <img
                                src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                                alt="photo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-[50%] mx-[100px] z-20 text-white">
                                <h2 className="text-2xl">
                                    {featuredMovie.title}
                                </h2>
                                <p className="max-w-[500px] text-sm text-gray-400 mt-2">
                                    {featuredMovie.overview}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="rating rating-md">
                                        <input
                                            type="radio"
                                            name="rating-6"
                                            className="mask mask-star bg-yellow-400"
                                        />
                                    </div>
                                    <span className="mt-1">
                                        {featuredMovie.vote_average}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 mb-4">
                        <div className="flex items-center gap-2 mb-8">
                            <h1 className="ml-5 text-4xl ">Popular Movies</h1>

                            <p className="text-sm capitalize">
                                {selectedGenre}
                            </p>
                        </div>

                        <div className="flex items-center flex-wrap gap-4 justify-center">
                            {moviesData.movies.map((movie) => {
                                return <MovieCard {...movie} key={movie.id} />;
                            })}
                        </div>
                        {showGenreModal && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="bg-[rgba(0,0,0,.89)] fixed top-0 left-0 right-0 bottom-0 z-50">
                                <AiOutlineCloseCircle
                                    className="ml-auto text-white text-4xl absolute top-4 right-4 cursor-pointer"
                                    onClick={() => {
                                        document.body.style.overflow = "auto";
                                        setShowGenreModal(false);
                                    }}
                                />
                                <h1 className="text-4xl text-white text-center mt-6">
                                    Genres
                                </h1>
                                <div className="text-center text-white flex flex-col gap-2 mt-9">
                                    <motion.p
                                        onClick={() =>
                                            moviesByGenres("all", "all")
                                        }
                                        whileHover={{ scale: 1.2, x: 5 }}
                                        className="text-xl cursor-pointer">
                                        All
                                    </motion.p>
                                    {moviesData.genres.map((genre, i) => {
                                        return (
                                            <motion.p
                                                whileHover={{
                                                    scale: 1.2,
                                                    x: 5,
                                                }}
                                                className="text-xl cursor-pointer"
                                                key={genre.id}
                                                onClick={() =>
                                                    moviesByGenres(
                                                        genre.id,
                                                        genre.name
                                                    )
                                                }>
                                                {genre.name}
                                            </motion.p>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
