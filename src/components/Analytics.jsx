import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getMovieAnalytics } from "../features/movies/movieSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const movieData = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovieAnalytics({ movieId: params.movieId }));
    }, []);

    function getVal(val) {
        if (typeof val === "string") {
            let multiplier = val.substr(-1).toLowerCase();
            if (multiplier == "k") return parseFloat(val) * 1000;
            else if (multiplier == "m") return parseFloat(val) * 1000000;
        }
        return Number(val);
    }

    const data = {
        labels: [
            `Likes ${movieData.movieAnalytics?.analytics?.likes}`,
            `Views  ${movieData.movieAnalytics?.analytics?.views}`,
            `Watching Now  ${movieData.movieAnalytics?.analytics?.watching}`,
        ],
        datasets: [
            {
                label: "Inflix Data",
                data: [12, 19, 3],
                backgroundColor: ["#001d3d", "#1b4965", "#ffc300"],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-[#a4133c]  h-screen ">
            <Header setShowGenreModal={() => {}} />

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

                        {movieData.movieAnalytics && (
                            <div className="flex flex-wrap items-center 1287:flex-row flex-col justify-between w-[70vw]">
                                <div>
                                    <div className="flex items-center flex-wrap gap-4 justify-center mx-[50px]">
                                        <div className="w-[400px] 1287:w-[500px] overflow-hidden rounded-xl shadow-lg">
                                            <img
                                                className="w-full h-full"
                                                src={`https://image.tmdb.org/t/p/w500${movieData.movieAnalytics.backdrop_path}`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-[70px] mt-4 max-w-[450px]">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-2xl font-[600] text-black">
                                                {movieData.movieAnalytics.title}
                                            </h2>
                                            <div className="flex items-center gap-2">
                                                <div className="rating rating-md">
                                                    <input
                                                        type="radio"
                                                        name="rating-6"
                                                        className="mask mask-star bg-yellow-400"
                                                    />
                                                </div>
                                                <span className="text-black">
                                                    {
                                                        movieData.movieAnalytics
                                                            .vote_average
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <p className="max-w-[470px] mt-3 text-white">
                                            {movieData.movieAnalytics.overview}
                                        </p>
                                    </div>
                                </div>
                                {/* {pie chart} */}

                                <div className="w-[300px] text-white 1460:w-[400px] 1287:mt-0 mt-12">
                                    <Pie
                                        data={data}
                                        options={{ color: "white" }}
                                    />
                                    ;
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
