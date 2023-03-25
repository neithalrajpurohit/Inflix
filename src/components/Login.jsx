import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login, getLoggedInUser, clearError } from "../features/auth/authSlice";
import Poster2 from "../assets/charle.jpeg";

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(`/`, { replace: true });
        }

        dispatch(getLoggedInUser());
    }, [auth.isLoggedIn]);

    const handleLogin = () => {
        dispatch(login(loginDetails));
    };

    let user = localStorage.getItem("user");

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${Poster2})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100vw",
                    position: "relative",
                }}
            >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,.9)]" />

                <div className="bg-[rgba(0,0,0,.5)] w-[400px] top-[150px] mx-auto relative z-10 text-white rounded-lg p-8">
                    <h2 className="text-3xl mb-7">Sign in</h2>
                    {auth.error && (
                        <div className="alert alert-error shadow-lg mt-2 mb-2">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{auth.error}</span>
                            </div>
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-[#353535]"
                            onChange={(e) => {
                                setLoginDetails({
                                    ...loginDetails,
                                    email: e.target.value,
                                });

                                if (auth.error) {
                                    dispatch(clearError());
                                }
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input input-bordered w-full bg-[#353535]"
                            onChange={(e) => {
                                setLoginDetails({
                                    ...loginDetails,
                                    password: e.target.value,
                                });

                                if (auth.error) {
                                    dispatch(clearError());
                                }
                            }}
                        />
                    </div>

                    <div className="mt-8" onClick={handleLogin}>
                        <button className="bg-primary text-black w-full p-3 rounded-md">
                            Sign in
                        </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className="checkbox checkbox-xs"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-400"
                            >
                                Remember me
                            </label>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Need Help?</p>
                        </div>
                    </div>

                    <div className="mt-[60px]">
                        <span>
                            <span className="text-gray-400 font-light text-[18px]">
                                New to inflix?
                            </span>{" "}
                            <Link to="/signup">Signup Now</Link>{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
