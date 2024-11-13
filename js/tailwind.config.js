/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["*"],
    theme: {
        extend: {
            keyframes: {
                loading: {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
            },
            animation: {
                loading: "loading 3s ease-in-out forwards",
            },
        },
    },
    plugins: [],
};
