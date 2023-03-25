import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../features/auth/authSlice";

const Sidebar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    return (
        <div className="w-full text-center min-w-[220px]">
            <p className="mt-[80px] text-center text-black text-2xl">
                Dashboard
            </p>
            {auth.loggedInUser && (
                <p className="text-sm text-black text-center">
                    {auth.loggedInUser.role}
                </p>
            )}
            {auth.loggedInUser?.role === "ADMIN" ? (
                <Link
                    className="mt-4 mx-5 block p-3 text-black   btn btn-outline"
                    to="/admin">
                    View Movie Analytics
                </Link>
            ) : (
                <Link
                    className="mt-4 mx-5 block p-3 text-black   btn btn-outline"
                    to="/manager">
                    Manage Movies
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
