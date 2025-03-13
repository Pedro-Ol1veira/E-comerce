import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Basics/Header";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";
import Register from "./components/Pages/Register/Register";


function App() {
  return (
    <div className="h-screen ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
