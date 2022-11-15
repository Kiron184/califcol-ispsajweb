import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TablaAsignacionBecas from "./TablaAsignacionBecas";
import axios from "axios";
import "../../style/styles.css";

export default function AsignacionBecas() {
  const [search, setSearch] = useState("");
  const [comboCiclos, setComboCiclos] = useState([]);
  const [ciclo, setCiclo] = useState("2022");

  async function CargarComboCiclos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  async function ActualizarCiclo(e) {
    e.preventDefault();
    setCiclo(e.target.value);
  }

  useEffect(() => {
    CargarComboCiclos();
  }, []);

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Asignación de Becas</h4>
          <p className="text-secondary">
            Crear y gestionar los datos de las Becas Asignadas.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-column">
            <select
              className="form-control col-3 col-sm-1 col-lg-1 col-xl-2 mr-1"
              onChange={(e) => {
                ActualizarCiclo(e);
              }}
            >
              {comboCiclos &&
                comboCiclos?.map((ciclo) => {
                  if (ciclo[0] === `${new Date().getFullYear()}`) {
                    return (
                      <option selected key={ciclo[0]}>
                        {ciclo[0]}
                      </option>
                    );
                  }
                  return <option key={ciclo[0]}>{ciclo[0]}</option>;
                })}
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
              to="/asignacionbecas/0/0"
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
      <TablaAsignacionBecas name={search} ciclo={ciclo} />
    </div>
  );
}
