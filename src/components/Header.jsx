import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
    NavLink,
} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { getLoggedInUser, logout } from "../features/auth/authSlice";

const Header = (props) => {
    const { setShowGenreModal } = props;
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    let user = localStorage.getItem("user");
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="fixed w-[100vw] backdrop-blur-xl bg-[rgba(255,255,255,.4)] z-50">
            <div className="h-[60px] border-b border-gray-300">
                <div className="px-[10px] 985:px-[100px] flex justify-center items-center h-full">
                    <div className="flex-[.6] 985:flex-[.2]">
                        <div className="w-[50px]">
                            <h2 className="text-2xl font-semibold">Inflix</h2>
                        </div>
                    </div>
                    <ul className="flex items-center gap-3">
                        <li>
                            <NavLink to="/">Movies</NavLink>
                        </li>

                        {location.pathname !== "/admin" &&
                            location.pathname !== "/manager" && (
                                <li
                                    className="cursor-pointer"
                                    onClick={() => setShowGenreModal(true)}
                                >
                                    Genres
                                </li>
                            )}
                    </ul>

                    {/* {mobile hamburger menu} */}
                    {showHamburgerMenu && (
                        <div className="text-center pb-5 w-[220px] rounded-lg absolute top-[80px] right-8 bg-white">
                            <AiOutlineCloseCircle
                                className="ml-auto text-2xl absolute top-1 right-1 cursor-pointer"
                                onClick={() => {
                                    setShowHamburgerMenu(false);
                                }}
                            />
                            <p className="mt-[20px] text-center text-2xl">
                                Dashboard
                            </p>
                            {auth.loggedInUser && (
                                <p className="text-sm text-center">
                                    {auth.loggedInUser.role}
                                </p>
                            )}
                            {auth.loggedInUser?.role === "ADMIN" ? (
                                <Link className="mt-4 block" to="/admin">
                                    View Movie Analytics
                                </Link>
                            ) : (
                                <Link className="mt-4 block" to="/manager">
                                    Manage Movies
                                </Link>
                            )}
                        </div>
                    )}
                    <div className="ml-auto flex items-center gap-2 cursor-pointer">
                        {auth.loggedInUser ? (
                            <>
                                {(auth.loggedInUser?.role === "ADMIN" ||
                                    auth.loggedInUser?.role === "MANAGER") && (
                                    <div
                                        className="sm:hidden block"
                                        onClick={() =>
                                            setShowHamburgerMenu(
                                                !showHamburgerMenu
                                            )
                                        }
                                    >
                                        <GiHamburgerMenu className="text-black text-4xl" />
                                    </div>
                                )}

                                <div className="dropdown ">
                                    <label
                                        tabIndex={0}
                                        className=" m-1 flex items-center gap-2"
                                    >
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral-focus text-neutral-content rounded-full w-[50px]">
                                                <span className="text-xl uppercase">
                                                    {auth.loggedInUser.name.slice(
                                                        0,
                                                        2
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden 985:block cursor-pointer">
                                            <p className="text-gray-800 capitalize">
                                                {auth.loggedInUser.name}
                                            </p>
                                            <p className="text-gray-700 text-sm">
                                                {auth.loggedInUser.email}
                                            </p>
                                        </div>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        <li
                                            className="cursor-pointer"
                                            onClick={() => {
                                                dispatch(logout());
                                            }}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
