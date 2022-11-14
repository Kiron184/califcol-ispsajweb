import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TablaUsuarios from "./TablaUsuarios";
import "../../style/styles.css";

export default function Usuarios() {
  const [search, setSearch] = useState("");

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Usuarios</h4>
          <p className="text-secondary">
            Crear y gestionar los datos de los Usuarios.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-row">
            <input
              placeholder="Buscar por Nombre"
              type="search"
              className="form-control w-md-25 mx-0 my-1 my-md-0"
              onChange={(e) => {
                return setSearch(e.target.value);
              }}
            ></input>
            <NavLink
              className="align-self-start btn btn-primary rounded ml-2"
              to="/usuarios/0"
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
      <TablaUsuarios name={search} />
    </div>
  );
}
