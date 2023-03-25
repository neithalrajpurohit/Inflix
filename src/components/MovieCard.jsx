import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../features/auth/authSlice";

const MovieCard = (props) => {
    const auth = useSelector((state) => state.auth);
    const {
        title,
        vote_average,
        release_date,
        poster_path,
        edit,
        onEditGenre,
        genre_ids,
        id,
        analytics,
        stats,
    } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    return (
        <div
            className="rounded-lg shadow-xl cursor-pointer"
            onClick={() => {
                if (edit && auth.loggedInUser?.role === "MANAGER") {
                    onEditGenre(genre_ids, id);
                }

                if (auth.loggedInUser?.role === "MANAGER") {
                    navigate("/manager");
                }

                if (auth.loggedInUser.role === "ADMIN") {
                    navigate(`/movie/analytics/${id}`);
                }

                if (auth.loggedInUser?.role === "CUSTOMER") {
                    navigate(`/movie/stream/${id}`);
                }
            }}>
            <div className="w-[250px] h-[350px] rounded-xl overflow-hidden relative">
                {edit && (
                    <div className="absolute group flex justify-center items-center top-0 bottom-0 left-0 right-0 h-full hover:bg-[rgba(0,0,0,.6)] z-20 duration-100">
                        <p className="invisible border border-gray-100 p-2 rounded-md  group-hover:visible text-white">
                            Edit Genre
                        </p>
                    </div>
                )}
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt="poster"
                    className="w-full h-full"
                />
                <div className="w-full absolute bottom-0 left-0 right-0 z-10 backdrop-blur-lg flex items-center justify-center px-4 border-t border-[rgba(255,255,255,.1)] h-[80px] bg-[rgba(144,93,108,0.4)]">
                    <p>{title}</p>
                </div>
            </div>
            {stats && (
                <div className="w-[250px] mt-4 mb-2">
                    {analytics ? (
                        <div className="flex justify-between px-4">
                            <div>
                                <p className="text-xl text-black">
                                    Likes: {analytics.likes}
                                </p>
                                <p className="text-sm text-black">
                                    Views: {analytics.views}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-black">
                                    Watching: {analytics.watching}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">No Data</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieCard;
