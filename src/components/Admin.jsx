import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../features/auth/authSlice";
import {
    getAllMovieAnalytics,
    getGenres,
    getMovieAnalytics,
} from "../features/movies/movieSlice";
import Header from "./Header";
import MovieCard from "./MovieCard";
import Sidebar from "./Sidebar";

const Admin = () => {
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [showEditGenreModal, setShowEditGenreModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moviesData = useSelector((state) => state.movies);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllMovieAnalytics());
        dispatch(getGenres());
        dispatch(getLoggedInUser());
    }, []);

    // checking if user is ADMIN
    useEffect(() => {
        if (auth.loggedInUser?.role !== "ADMIN") {
            navigate("/", { replace: true });
        }
    }, [auth]);
    return (
        <div className="bg-[#ff9f1c]">
            <Header setShowGenreModal={setShowGenreModal} />

            <div className="flex">
                <div className="min-w-[220px] hidden sm:block  broder border-r border-gray-200">
                    <div className="fixed">
                        <Sidebar />
                    </div>
                </div>
                <div>
                    <div className="mt-[100px] mb-4">
                        <div className="flex items-center gap-2 mb-8">
                            <h1 className="ml-14 text-4xl text-black ">
                                Movie Analytics
                            </h1>
                        </div>

                        <div className="flex items-center flex-wrap gap-4 justify-center">
                            {moviesData.movies.map((movie) => {
                                return (
                                    <MovieCard
                                        {...movie}
                                        key={movie.id}
                                        stats
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

export default Admin;
