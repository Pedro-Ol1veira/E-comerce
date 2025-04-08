import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Basics/Header";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";
import Register from "./components/Pages/Register/Register";
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const authState = useAppSelector((state) => state.auth);

  return (
    <div className="h-screen ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={authState.user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={authState.user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
