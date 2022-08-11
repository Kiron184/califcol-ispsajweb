import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AbmDocente from "./components/Docente";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/docente/:id" element={<AbmDocente />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
