import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movieSlice";
import authReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        movies: movieReducer,
        auth: authReducer,
    },
});

export default store;
