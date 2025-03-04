import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Basics/Header";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";


function App() {
  return (
    <div className="h-screen ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
