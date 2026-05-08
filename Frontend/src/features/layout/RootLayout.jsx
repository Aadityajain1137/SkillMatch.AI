import { Outlet } from "react-router";
import Navbar from "../auth/pages/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;