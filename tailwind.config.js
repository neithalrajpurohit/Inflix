/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ffd400",
            },
            screens: {
                985: "985px",
                1460: "1460px",
                1287: "1287px",
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
};
