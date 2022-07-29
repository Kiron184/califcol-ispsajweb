import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AbmDocente from "./components/Docente";
import Home from "./components/Home";
import NavBar2 from "./components/NavBar2";

function App() {
  return (
    <React.Fragment>
      <NavBar2 />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/docente/:id" element={<AbmDocente />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
