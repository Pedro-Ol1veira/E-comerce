import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Basics/Header";
import Login from "./components/Pages/Login/Login";

function App() {
  return (
    <div className="h-screen ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
