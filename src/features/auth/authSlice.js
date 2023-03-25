import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLE } from "../../data/userRole";
import { USERS } from "../../data/users";

const initialState = {
    users: USERS,
    error: null,
    isLoggedIn: false,
    isAccountCreated: false,
    loggedInUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(
                (user) =>
                    user.email.toLocaleLowerCase() ===
                    email?.toLocaleLowerCase()
            );
            if (!user) {
                state.error = "Invalid Email address!";
                return;
            }
            if (user.password !== password) {
                state.error = "Invalid Password!";
                return;
            }
            state.isLoggedIn = true;
            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, isLoggedIn: true })
            );

            //make isAccountCreate to false so that user will be able to signup again
            state.isAccountCreated = false;
        },

        signup: (state, action) => {
            const { name, email, password } = action.payload;
            const user = state.users.find((user) => user.email === email);
            if (user) {
                state.error = "User already exists!";
                return;
            }
            // bydefault every new user will be assigned a role of customer
            state.users.push({
                name,
                email,
                password,
                role: USER_ROLE.CUSTOMER,
            });
            state.isAccountCreated = true;
        },

        getLoggedInUser: (state, action) => {
            let user = localStorage.getItem("user");
            state.isAccountCreated = false;
            if (user) {
                user = JSON.parse(user);
                state.loggedInUser = user;
            } else {
                state.loggedInUser = null;
            }
        },

        logout: (state, action) => {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.loggedInUser = null;
        },

        clearError: (state, action) => {
            state.error = "";
        },
    },
});

export const { login, signup, getLoggedInUser, clearError, logout } =
    authSlice.actions;
export default authSlice.reducer;
