import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser } from "../features/auth/authSlice";
import { fetchMoviesDetails } from "../features/movies/movieSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Stream = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moviesData = useSelector((state) => state.movies);
    const auth = useSelector((state) => state.auth);
    const params = useParams();

    useEffect(() => {
        dispatch(fetchMoviesDetails({ movieId: params.movieId }));
        dispatch(getLoggedInUser());
    }, []);

    console.log(moviesData);

    return (
        <div className="bg-[#4f6d7a]">
            <Header setShowGenreModal={() => {}} />

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
                    {/* {featuredMovie && (
                        <div className="h-[700px] relative">
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
                    )} */}

                    {moviesData.movieDetails && (
                        <div>
                            <iframe
                                className="w-screen h-[80vh]"
                                src={`https://www.youtube.com/embed/${moviesData.movieDetails.key}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen></iframe>
                            <div className="mt-12 mb-4">
                                <div className="flex  flex-wrap gap-4 pl-4">
                                    <div className="w-[240px] h-[300px] overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            className="w-full h-full"
                                            src={`https://image.tmdb.org/t/p/w500${moviesData.movieDetails.poster_path}`}
                                            alt="poster"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h2 className="text-2xl text-black">
                                            {moviesData.movieDetails.title}
                                        </h2>
                                        <p className="text-sm  text-black">
                                            {
                                                moviesData.movieDetails
                                                    .release_date
                                            }
                                        </p>
                                        <p className="text-md  mt-5 text-black  max-w-[800px]">
                                            {moviesData.movieDetails.overview}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="rating rating-md">
                                                <input
                                                    type="radio"
                                                    name="rating-6"
                                                    className="mask mask-star bg-yellow-400"
                                                />
                                            </div>
                                            <span className="mt-1 text-black">
                                                {
                                                    moviesData.movieDetails
                                                        .vote_average
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stream;
