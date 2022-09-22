import React, { useState, useEffect } from "react";
import TablaAranceles from "./TablaAranceles";
import "../../style/styles.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function LiquidacionIndividual() {
  const [comboCiclos, setComboCiclos] = useState([]);
  const [ciclo, setCiclo] = useState(2022);
  const [mes, setMes] = useState(0);

  async function CargarComboCiclos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  async function ActualizarComboCuotas(e) {
    e.preventDefault();
    setCiclo(e.target.value);
  }

  function actualizarMes(e) {
    e.preventDefault();
    setMes(e.target.value);
  }

  useEffect(() => {
    CargarComboCiclos();
  }, [ciclo, mes]);

  return (
    <div className="px-3 pt-2 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Aranceles</h4>
          <p className="text-secondary">Crear y gestionar los Aranceles.</p>
        </div>
        <hr className="w-100 mx-0" />

        <div className="d-flex flex-md-row flex-column">
          <select
            className="form-control mb-2 mb-sm-0 col-3 col-sm-2 col-lg-2 col-xl-1 mr-3"
            onChange={(e) => {
              ActualizarComboCuotas(e);
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
          <select
            className="form-control mb-2 mb-sm-0 col-6 col-sm-3 col-lg-3 col-xl-2 mr-3"
            onChange={(e) => actualizarMes(e)}
          >
            <option value="0">Seleccionar Mes</option>
            <option value="01">ENERO</option>
            <option value="02">FEBRERO</option>
            <option value="03">MARZO</option>
            <option value="04">ABRIL</option>
            <option value="05">MAYO</option>
            <option value="06">JUNIO</option>
            <option value="07">JULIO</option>
            <option value="08">AGOSTO</option>
            <option value="09">SEPTIEMBRE</option>
            <option value="10">OCTUBRE</option>
            <option value="11">NOVIEMBRE</option>
            <option value="12">DICIEMBRE</option>
          </select>
          <NavLink
            className="align-self-start btn btn-primary rounded"
            to="/aranceles/0/0"
            onClick={(e) => {
              document.querySelector(".navbar").classList.remove("active-nav");
              document
                .querySelector(".contenedor")
                .classList.remove("active-contenedor");
            }}
          >
            Nuevo
          </NavLink>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <TablaAranceles ciclo={ciclo} mes={mes} />
    </div>
  );
}
