import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TablaLiquidacion from "./TablaLiquidacion";
import "../../style/styles.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function LiquidacionCurso() {
  const listaCursosMarcados = useSelector((state) => state.listaCursosMarcados);
  const [comboCiclos, setComboCiclos] = useState([]);
  const [comboCuotas, setComboCuotas] = useState([]);

  const [ciclo, setCiclo] = useState(2022);
  const [cuota, setCuota] = useState([0, ""]);
  const [cargar, setCargar] = useState(Math.random());

  async function CargarComboCiclos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  async function CargarComboCuotas() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/combocuotas.php?ciclo=" +
          ciclo
      )
      .then((response) => {
        setComboCuotas(response?.data);
      });
  }

  async function ActualizarComboCuotas(e) {
    e.preventDefault();
    setCiclo(e.target.value);
    setCuota(["", 0]);
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/combocuotas.php?ciclo=" +
          e.target.value
      )
      .then((response) => {
        setComboCuotas(response?.data);
      });
  }

  function liquidarTodos(e) {
    e.preventDefault();
    let querycreate =
      "CREATE TEMPORARY TABLE t_datos (idcurso INT, idnivel INT) ";
    let querylista = "INSERT INTO t_datos (idcurso, idnivel)VALUES";

    if (listaCursosMarcados.length === 0) {
      Swal.fire({
        title: "Se debe seleccionar algún curso a liquidar",
        icon: "error",
        showCloseButton: true,
      });
    } else {
      listaCursosMarcados.map((c) => {
        let idnivel = c.idnivel;
        let idcurso = c.idcurso;

        if (idcurso > 0) {
          if (querylista !== "INSERT INTO t_datos (idcurso, idnivel)VALUES") {
            querylista = querylista + ",";
          }
          querylista = querylista + "(" + idcurso + "," + idnivel + ")";
        }
      });

      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/liquidarcuotaall.php?" +
            "ciclo=" +
            ciclo +
            "&idcuota=" +
            cuota[0] +
            "&userid=1" +
            "&querycreate=" +
            querycreate +
            "&querylista=" +
            querylista
        )
        .then((response) => {
          if (response.data === "") {
            Swal.fire({
              title: "Se han liquidado todas las cuotas con EXITO",
              icon: "success",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setCargar(Math.random());
              }
            });
          } else {
            Swal.fire({
              title: "Error al Liquidar!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setCargar(Math.random());
              }
            });
          }
        });
    }
  }

  useEffect(() => {
    CargarComboCuotas();
    CargarComboCiclos();
  }, [ciclo]);

  return (
    <div className="px-3 pt-2 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Liquidación por Curso</h4>
          <p className="text-secondary">
            Crear y gestionar las Liquidaciones por Curso.
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
            <button
              className="align-self-start btn btn-primary rounded"
              onClick={(e) => liquidarTodos(e)}
            >
              Liquidar Todos
            </button>
          </div>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <TablaLiquidacion
        ciclo={ciclo}
        idCuota={cuota[0]}
        nombreCuota={cuota[1]}
        cargarTablas={cargar}
      />
    </div>
  );
}
