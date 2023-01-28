import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Layout = () => {
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  );
};

export default Layout;
