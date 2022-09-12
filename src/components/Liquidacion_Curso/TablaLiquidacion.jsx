import React, { useEffect } from "react";
import axios from "axios";
import "../../style/styles.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cargarTablaLiquidacionesCurso } from "../../actions";
import printer from "../../utils/printer.png";
import mail from "../../utils/mail.png";
import { useState } from "react";

export default function TablaLiquidacion({ ciclo, idCuota, nombreCuota }) {
  const dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.liquidacionesCurso);
  const [order, setOrder] = useState("ASC");

  function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/traerliquidacionescurso.php?ciclo=" +
          ciclo +
          "&idcuota=" +
          (idCuota ? idCuota : 0)
      )
      .then((response) => {
        document.querySelector(".tr-loader").classList.add("d-none");
        if (response.data) {
          return dispatch(cargarTablaLiquidacionesCurso(response.data));
        } else {
          return dispatch(cargarTablaLiquidacionesCurso([]));
        }
      });
  }

  useEffect(() => {
    dispatch(cargarTablaLiquidacionesCurso([]));
    cargarTabla();
  }, [ciclo, idCuota]);

  function handleClick(e, l) {
    e.preventDefault();
    document
      .getElementById(`btn-accion ${l.idalumno}`)
      .classList.remove("d-none");
    if (l.traspaso === "1") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/revertircuota.php?ciclo=" +
            ciclo +
            "&idcuota=" +
            idCuota +
            "&idcurso=" +
            l.idcurso +
            "&idnivel=" +
            l.idnivel +
            "&idalumno=" +
            l.idalumno
        )
        .then((response) => {
          if (response.data !== "") {
            Swal.fire({
              title: "Error al Revertir Liquidación!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            });
          }
        });
    } else {
      axios.post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/liquidarcuota.php?" +
          "idcuota=" +
          idCuota +
          "&idcurso=" +
          l.idcurso +
          "&userid=1" +
          "&idalumno=" +
          l.idalumno
      );
      cargarTabla();
    }
    setTimeout(() => {
      document
        .getElementById(`btn-accion ${l.idalumno}`)
        .classList.add("d-none");
      cargarTabla();
    }, 800);
  }

  function imprimirLiquidaciones(e, l) {
    e.preventDefault();
    window.open(
      "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/imprimir_boletapago.php?" +
        "idcuota=" +
        idCuota +
        "&idalum=" +
        l.idalumno
    );
  }

  function enviarLiquidaciones(e, l) {
    e.preventDefault();
    axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/enviar_boletapagoweb.php?idcuota=" +
          idCuota +
          "&idalum=" +
          l.idalumno +
          "&cuota=" +
          nombreCuota
      )
      .then((response) => {
        console.log(response?.data);

        if (response?.data?.toString() === "") {
          Swal.fire({
            title: "El Correo ha sido enviado con EXITO",
            icon: "success",
            html: `${response.data}`,
            showCloseButton: true,
          });
        } else {
          Swal.fire({
            title: "Error al Enviar el Correo!",
            icon: "error",
            html: `${response.data}`,
            showCloseButton: true,
          });
        }
      });
  }

  function orden(e, c) {
    e.preventDefault();

    let col = c.toLowerCase();

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "fhliq") {
        document.querySelector(`.${col}`).innerHTML = `Fecha Liq. ↓`;
      } else if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Curso ↓`;
      } else if (col === "traspaso") {
        document.querySelector(`.${col}`).innerHTML = `Acción ↓`;
      } else {
        document.querySelector(`.${col}`).innerHTML = `${c} ↓`;
      }
    } else {
      if (col === "fhliq") {
        document.querySelector(`.${col}`).innerHTML = `Fecha Liq. ↑`;
      } else if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Curso ↑`;
      } else if (col === "traspaso") {
        document.querySelector(`.${col}`).innerHTML = `Acción ↑`;
      } else {
        document.querySelector(`.${col}`).innerHTML = `${c} ↑`;
      }
    }

    if (order === "ASC" && col === "fhliq") {
      const sorted = [...liquidaciones].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      dispatch(cargarTablaLiquidacionesCurso(sorted));
      setOrder("DESC");
    } else if (order === "ASC") {
      const sorted = [...liquidaciones].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      dispatch(cargarTablaLiquidacionesCurso(sorted));
      setOrder("DESC");
    }

    if (order === "DESC" && col === "fhliq") {
      const sorted = [...liquidaciones].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      dispatch(cargarTablaLiquidacionesCurso(sorted));
      setOrder("ASC");
    } else if (order === "DESC") {
      const sorted = [...liquidaciones].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      dispatch(cargarTablaLiquidacionesCurso(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div style={{ height: "900px" }} class="table-responsive">
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              className="col-3 nivel text-nowrap"
              onClick={(e) => orden(e, "Nivel")}
            >
              Nivel ↑
            </th>
            <th
              className="col-1 nombre text-nowrap"
              onClick={(e) => orden(e, "nombre")}
            >
              Curso ↑
            </th>
            <th
              className="col-1 fhliq text-nowrap"
              onClick={(e) => orden(e, "fhliq")}
            >
              Fecha Liq. ↑
            </th>
            <th
              className="col-1 traspaso text-nowrap"
              onClick={(e) => orden(e, "traspaso")}
            >
              Acción ↑
            </th>
            <th className="w-100 col-1 col-xl-1 text-nowrap traspaso">
              Desm. Todo
              {/* marcacheck */}
            </th>
            <th className="col-1 text-nowrap">Imprimir</th>
            <th className="col-1 text-nowrap">Enviar Correo</th>
          </tr>
        </thead>

        <tbody>
          {liquidaciones &&
            liquidaciones.map((l) => (
              <tr key={l[2]}>
                <td className="align-middle">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap text-left mb-0"
                  >
                    {l.nivel}
                  </p>
                </td>
                <td className="align-middle">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap mb-0"
                  >
                    {l.nombre}
                  </p>
                </td>
                <td className="align-middle">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap mb-0"
                  >
                    {l.fhliq}
                  </p>
                </td>

                <td className="px-5 align-middle">
                  <div className="d-block align-middle">
                    <button
                      style={{
                        height: "25px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                      className={
                        l.traspaso === "0"
                          ? "btn rounded btn-success btn-sm text-nowrap py-0 px-1"
                          : "btn rounded btn-danger btn-sm text-nowrap py-0 px-1"
                      }
                      onClick={(e) => {
                        handleClick(e, l);
                      }}
                    >
                      {l.traspaso === "0" ? "Liquidar" : "Revertir"}
                      <span
                        id={`btn-accion ${l.idalumno}`}
                        className="spinner-border spinner-border-sm ml-2 d-none"
                      ></span>
                    </button>
                  </div>
                </td>

                <td className="align-middle">
                  <input
                    type={"checkbox"}
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap mb-0"
                  >
                    {}
                  </input>
                </td>

                <td className="align-middle">
                  <button
                    className={
                      l.traspaso === "0" ? "d-none" : "border-0 bg-transparent"
                    }
                    onClick={(e) => imprimirLiquidaciones(e, l)}
                  >
                    <img width={25} src={printer} alt=""></img>
                  </button>
                </td>

                <td className="align-middle">
                  <button
                    className={
                      l.traspaso === "0"
                        ? "d-none mx-4"
                        : "border-0 bg-transparent"
                    }
                    onClick={(e) => {
                      enviarLiquidaciones(e, l);
                    }}
                  >
                    <img width={25} src={mail} alt=""></img>
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="7">
              <div>
                {liquidaciones.length === 0 ? (
                  <div className="footer text-center">
                    No se registra información
                  </div>
                ) : (
                  ""
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="tr-loader" className="d-none tr-loader">
        <div colSpan="7">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </div>
  );
}
