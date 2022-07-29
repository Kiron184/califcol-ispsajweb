import React from "react";
import Table from "./Table";

export default function Home() {
  return (
    <div className="all-content">
      <div className="d-flex justify-content-center pt-5">
        <div className="d-flex justify-content-center w-50">
          <h4 className="align-self-center">DOCENTES</h4>
          <input
            placeholder="Buscar por Nombre"
            type="search"
            className="form-control align-self-center mx-5"
          ></input>
          <a
            className="align-self-center btn btn-close rounded border border-dark"
            href="/"
          >
            X
          </a>
        </div>
      </div>
      <hr className="w-50" />
      <Table />
    </div>
  );
}
