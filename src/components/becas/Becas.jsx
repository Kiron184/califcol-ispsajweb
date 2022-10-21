import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TablaBecas from "./TablaBecas";
import "../../style/styles.css";

export default function Becas() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Becas</h4>
          <p className="text-secondary">
            Crear y gestionar los datos de las Becas.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-column">
            <select
              className="form-control w-md-25"
              onChange={(e) => {
                return setFilter(e.target.value);
              }}
            >
              <option value="0">Filtrar por</option>
              <option value="1">Activos</option>
              <option value="2">Inactivos</option>
            </select>
            <input
              placeholder="Buscar por Nombre"
              type="search"
              className="form-control w-md-25 mx-md-2 my-1 my-md-0"
              onChange={(e) => {
                return setSearch(e.target.value);
              }}
            ></input>

            <NavLink
              className="align-self-start btn btn-primary rounded"
              to="/becas/0"
              onClick={(e) => {
                document
                  .querySelector(".navbar")
                  .classList.remove("active-nav");
                document
                  .querySelector(".contenedor")
                  .classList.remove("active-contenedor");
              }}
            >
              Nuevo
            </NavLink>
          </div>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <TablaBecas name={search} filter={filter} />
    </div>
  );
}
