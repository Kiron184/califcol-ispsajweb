import React, { useState } from "react";
import TablaLiquidacion from "../Liquidacion_Individual/TablaLiquidacion";
import "../../style/styles.css";
import { useEffect } from "react";
import axios from "axios";

export default function LiquidacionIndividual() {
  const [comboAlumnos, setComboAlumnos] = useState([]);
  const [comboCiclos, setComboCiclos] = useState([]);
  const [comboCuotas, setComboCuotas] = useState([]);

  const [ciclo, setCiclo] = useState(2022);
  const [cuota, setCuota] = useState([0, ""]);
  const [idAlumno, setIdAlumno] = useState(0);

  async function CargarComboCiclos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  async function CargarComboCuotas() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/combocuotas.php?ciclo=" +
          ciclo
      )
      .then((response) => {
        setComboCuotas(response?.data);
      });
  }

  async function CargarComboAlumnos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/comboalumnos.php"
      )
      .then((response) => {
        setComboAlumnos(response?.data);
      });
  }

  async function ActualizarComboCuotas(e) {
    e.preventDefault();
    setCiclo(e.target.value);
    setCuota(["", 0]);
    setIdAlumno(0);
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/combocuotas.php?ciclo=" +
          e.target.value
      )
      .then((response) => {
        setComboCuotas(response?.data);
      });
  }

  useEffect(() => {
    CargarComboCuotas();
    CargarComboCiclos();
    CargarComboAlumnos();
  }, [ciclo]);

  return (
    <div className="px-3 pt-2 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Liquidación Individual</h4>
          <p className="text-secondary">
            Crear y gestionar las Liquidaciones de los Alumnos.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="">
          <div className="d-flex flex-xl-row flex-column">
            <select
              className="form-control col-3 col-sm-2 col-lg-2 col-xl-1 mr-3"
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
              className="form-control col-12 col-sm-7 col-xl-4 mr-3 my-1 my-xl-0"
              onChange={(e) => {
                let info = e.target.value.split(",", 2);
                setCuota(info);
              }}
            >
              <option selected value={0}>
                Seleccionar un Arancel
              </option>
              {comboCuotas &&
                comboCuotas?.map((cuotas) => {
                  return (
                    <option key={cuotas[0]} value={[cuotas[0], cuotas[1]]}>
                      {cuotas[1]}
                    </option>
                  );
                })}
            </select>
            <select
              className="form-control col-12 col-sm-7 col-xl-4"
              onChange={(e) => {
                setIdAlumno(e.target.value);
              }}
            >
              <option selected value={0}>
                Seleccional un Alumno
              </option>
              {comboAlumnos &&
                comboAlumnos?.map((alumno) => {
                  return (
                    <option key={alumno[0]} value={alumno[0]}>
                      {alumno[1]}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <TablaLiquidacion
        ciclo={ciclo}
        idCuota={cuota[0]}
        nombreCuota={cuota[1]}
        idAlumno={idAlumno}
      />
    </div>
  );
}
