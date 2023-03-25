import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    let user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
};

export default ProtectedRoute;
