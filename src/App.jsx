import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Analytics from "./components/Analytics";
import Home from "./components/Home";
import Login from "./components/Login";
import Manager from "./components/Manager";
import Signup from "./components/Signup";
import Stream from "./components/Stream";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/manager"
                element={
                    <ProtectedRoute>
                        <Manager />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/movie/analytics/:movieId"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/movie/stream/:movieId"
                element={
                    <ProtectedRoute>
                        <Stream />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default App;
