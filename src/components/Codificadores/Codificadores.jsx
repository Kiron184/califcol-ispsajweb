import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TablaCodifcadores from "./TablaCodificadores";
import "../../style/styles.css";

export default function Codificadores() {
  const [filter, setFilter] = useState(1);

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Codificadores</h4>
          <p className="text-secondary">
            Crear y gestionar los datos de los Codificadores.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-row">
            <select
              className="form-control w-75 w-md-25"
              onChange={(e) => {
                return setFilter(e.target.value);
              }}
            >
              <option value="1">Localidades</option>
              <option value="2">Provincias</option>
              <option value="3">Nacionalidad</option>
              <option value="4">Paises</option>
              <option value="7">Niveles</option>
              <option value="6">Formas de Pago</option>
              <option value="8">Caja Ingresos</option>
              <option value="9">Caja Egresos</option>
              <option value="20">Tipo Documentación</option>
            </select>

            <NavLink
              className="align-self-start btn btn-primary rounded ml-2"
              to="/codificadores/0/0"
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
      <TablaCodifcadores filter={filter} />
    </div>
  );
}
