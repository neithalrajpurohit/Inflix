import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    signup,
    getLoggedInUser,
    clearError,
} from "../features/auth/authSlice";
import Poster2 from "../assets/charle.jpeg";

const Signup = () => {
    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: "",
        name: "",
    });
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAccountCreated) {
            navigate(`/login`, { replace: true });
        }
    }, [auth.isAccountCreated]);

    const handleSignup = () => {
        dispatch(signup(signupDetails));
    };

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
                            id="name"
                            placeholder="Name"
                            className="input input-bordered w-full bg-[#353535]"
                            onChange={(e) => {
                                setSignupDetails({
                                    ...signupDetails,
                                    name: e.target.value,
                                });

                                dispatch(clearError());
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-[#353535]"
                            onChange={(e) => {
                                setSignupDetails({
                                    ...signupDetails,
                                    email: e.target.value,
                                });

                                dispatch(clearError());
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input input-bordered w-full bg-[#353535]"
                            onChange={(e) =>
                                setSignupDetails({
                                    ...signupDetails,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mt-8" onClick={handleSignup}>
                        <button className="bg-primary text-black w-full p-3 rounded-md">
                            Sign up
                        </button>
                    </div>

                    <div className="mt-[60px]">
                        <span>
                            <span className="text-gray-400 font-light text-[18px]">
                                Already have an accout ?
                            </span>{" "}
                            <Link to="/login">Login</Link>{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
