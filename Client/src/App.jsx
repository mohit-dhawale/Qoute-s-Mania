import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import NavBar from "./Component/Navbar";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Register from "./Component/Register";
import ScrollToTopButton from "./Component/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./Component/ErrorPage";
import MyQuotes from "./Component/MyQuotes";
import FavQuotes from "./Component/FavQuotes";
import { useEffect } from "react";
import Footer from "./Component/Footer";
import ProtectedRoutes from "./ProtectedRoutes";
import About from "./Component/About";
import Profile from "./Component/Profile";

function App() {
  return (
    <>
        <NavBar />
        <div
          className="container-fluid inner-content"
          style={{
            transition: "margin-top 0.3s ease",
            zIndex: -5,
          }}
        >

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/home"
              element={<ProtectedRoutes Component={Home} />}
            />
            <Route
              path="/my-quotes"
              element={<ProtectedRoutes Component={MyQuotes} />}
            />
            <Route
              path="/fav-quotes"
              element={<ProtectedRoutes Component={FavQuotes} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoutes Component={About} />}
            />
            <Route
              path="/user-profile"
              element={<ProtectedRoutes Component={Profile} />}
            />
          </Routes>
          <ToastContainer />
          <ScrollToTopButton />
        <Footer />
        </div>
    </>
  );
}

export default App;
