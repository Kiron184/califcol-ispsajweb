import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ConceptosGenerales from "./components/ConceptosGenerales";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import Concepto from "./components/Concepto";
import Becas from "./components/becas/Becas";
import Beca from "./components/becas/Beca";
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
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
