import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import About from "./features/auth/pages/About";
import Careers from "./features/auth/pages/Careers";
import RootLayout from "./features/layout/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Protected><Home /></Protected>
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "careers",
                element: <Careers />
            },
            {
                path: "interview/:interviewId",
                element: <Protected><Interview /></Protected>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);