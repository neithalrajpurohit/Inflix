import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
    getGenres,
    getPopularMovies,
    filterMoviesByGenres,
    editGenre,
} from "../features/movies/movieSlice";
import Header from "./Header";
import MovieCard from "./MovieCard";
import Sidebar from "./Sidebar";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getLoggedInUser } from "../features/auth/authSlice";

const Manager = () => {
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [showEditGenreModal, setShowEditGenreModal] = useState(false);
    const [genres, setGenres] = useState({
        prev: [],
        new: [],
        movieId: "",
    });
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moviesData = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getPopularMovies());
        dispatch(getGenres());
        dispatch(getLoggedInUser());
    }, []);

    // checking if user is manager
    useEffect(() => {
        if (auth.loggedInUser?.role !== "MANAGER") {
            navigate("/", { replace: true });
        }
    }, [auth]);

    const onEditGenre = (genreIds, movieId) => {
        setShowEditGenreModal(true);
        setGenres({ ...genres, prev: genreIds, movieId });
    };

    const onSaveGenre = () => {
        dispatch(editGenre({ genresId: genres.new, movieId: genres.movieId }));
        setShowEditGenreModal(false);
    };

    return (
        <div className="bg-[#4f6d7a]">
            <Header setShowGenreModal={setShowGenreModal} />

            <div className="flex">
                <div className="min-w-[220px] hidden sm:block  broder border-r border-gray-200">
                    <div className="fixed">
                        <Sidebar />
                    </div>
                </div>
                <div>
                    {showEditGenreModal && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.8)] z-50">
                            <AiOutlineCloseCircle
                                className="ml-auto text-white text-4xl absolute top-4 right-4 cursor-pointer"
                                onClick={() => {
                                    document.body.style.overflow = "auto";
                                    setShowEditGenreModal(false);
                                }}
                            />
                            <div className="w-[400px] mx-auto mt-[100px]">
                                {moviesData.genres.length >= 1 && (
                                    <div className="flex items-center gap-5">
                                        <div>
                                            <Select
                                                closeMenuOnSelect={false}
                                                isMulti
                                                onChange={(value) => {
                                                    setGenres({
                                                        ...genres,
                                                        new: value,
                                                    });
                                                }}
                                                defaultValue={moviesData.genres
                                                    .filter((genre) =>
                                                        genres.prev.includes(
                                                            genre.id
                                                        )
                                                    )
                                                    .map((genre) => {
                                                        return {
                                                            value: genre.id,
                                                            label: genre.name,
                                                        };
                                                    })}
                                                options={moviesData.genres.map(
                                                    (genre) => {
                                                        return {
                                                            value: genre.id,
                                                            label: genre.name,
                                                        };
                                                    }
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <button
                                                onClick={onSaveGenre}
                                                className="btn btn-sm bg-primary text-black hover:text-white">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-[100px] mb-4">
                        <div className="flex items-center gap-2 mb-8">
                            <h1 className="ml-5 text-4xl ">
                                Manage Movie Genres
                            </h1>
                        </div>

                        <div className="flex items-center flex-wrap gap-4 justify-center">
                            {moviesData.movies.map((movie) => {
                                return (
                                    <MovieCard
                                        {...movie}
                                        key={movie.id}
                                        edit
                                        onEditGenre={onEditGenre}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;
