import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AbmDocente from "./components/Docente";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import AbmMaterias from "./components/abm_materias";
import MateriasVinculadas from "./components/MateriasVinculadas";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/docente/:id" element={<AbmDocente />} />
          <Route path="/materias" element={<AbmMaterias />} />
          <Route
            path="/materiasvinculadas/:id"
            element={<MateriasVinculadas />}
          />
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
