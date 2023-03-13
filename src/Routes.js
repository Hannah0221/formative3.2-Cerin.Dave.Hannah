import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

 import LandingPage from "./pages/LandingPage.js"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

const AppRoutes = () => {
  const location = useLocation();
  console.log(location.pathname);

//   if (location.pathname === "/home") {
//    <link to={"/login"}></link>;
//   }

  return (
    <Routes>
         <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
