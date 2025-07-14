import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setUser(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("loggedIn", "true");
    setUser(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    setUser(false);
  };

  const handleSignup = () => {
    sessionStorage.setItem("loggedIn", "true");
    setUser(true);
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout onLogout={handleLogout} />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/singleProduct/:id", element: <SingleProduct /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
