import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ConceptosGenerales from "./components/Conceptos/ConceptosGenerales";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import Concepto from "./components/Conceptos/Concepto";
import Becas from "./components/becas/Becas";
import Beca from "./components/becas/Beca";
import LiquidacionIndividual from "./components/Liquidacion_Individual/LiquidacionIndividual";
import LiquidacionCurso from "./components/Liquidacion_Curso/LiquidacionCurso";
import Aranceles from "./components/Aranceles/Aranceles";
import Cuota from "./components/Aranceles/Cuota";
import Codificadores from "./components/Codificadores/Codificadores";
import Codificador from "./components/Codificadores/Codificador";
import Usuarios from "./components/Usuarios/Usuarios";
import Usuario from "./components/Usuarios/Usuario";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/conceptosgenerales" element={<ConceptosGenerales />} />
          <Route path="/conceptosgenerales/:id" element={<Concepto />} />
          <Route path="/becas" element={<Becas />} />
          <Route path="/becas/:id" element={<Beca />} />
          <Route
            path="/liquidacionindividual"
            element={<LiquidacionIndividual />}
          />
          <Route path="/liquidacioncurso" element={<LiquidacionCurso />} />
          <Route path="/aranceles" element={<Aranceles />} />
          <Route
            path="/aranceles/:id/:descripcion/:ciclo"
            element={<Cuota />}
          />
          <Route path="/codificadores" element={<Codificadores />} />
          <Route
            path="/codificadores/:id/:idcodificador"
            element={<Codificador />}
          />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/:id" element={<Usuario />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
