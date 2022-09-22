import React, { useEffect } from "react";
import axios from "axios";
import "../../style/styles.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  cargarTablaLiquidacionesCurso,
  cargarTablaListaAlumnos,
  cargarAlumnosMarcados,
  cargarCursosMarcados,
  agregarAlumnoMarcado,
  agregarCursoMarcado,
} from "../../actions";
import printer from "../../utils/printer.png";
import mail from "../../utils/mail.png";
import { useState } from "react";

export default function TablaLiquidacion({
  ciclo,
  idCuota,
  nombreCuota,
  cargarTablas,
}) {
  const dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.liquidacionesCurso);
  const listaAlumnos = useSelector((state) => state.listaAlumnos);
  const listaCursosMarcados = useSelector((state) => state.listaCursosMarcados);
  const listaAlumnosMarcados = useSelector(
    (state) => state.listaAlumnosMarcados
  );
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
  }, [ciclo, idCuota, cargarTablas]);

  function handleClick(e, l) {
    e.preventDefault();
    document
      .getElementById(`btn-accion ${l.idcurso}`)
      .classList.remove("d-none");

    if (l.traspaso === "1") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/revertirliquidacion.php?ciclo=" +
            ciclo +
            "&idcuota=" +
            idCuota +
            "&idcurso=" +
            l.idcurso +
            "&idnivel=" +
            l.idnivel
        )
        .then((response) => {
          console.log(response.data);
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
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/liquidarcuota.php?" +
          "idcuota=" +
          idCuota +
          "&idcurso=" +
          l.idcurso +
          "&userid=1"
      );
      cargarTabla();
    }
    setTimeout(() => {
      document
        .getElementById(`btn-accion ${l.idcurso}`)
        .classList.add("d-none");
      cargarTabla();
    }, 800);
  }

  function listaImprimir(e, l) {
    e.preventDefault();
    listaAlumnos.map((a) => {
      document.getElementById(`checkImprimir${a.id}`).checked = true;
    });
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/traerlistaalumnos.php?ciclo=" +
          ciclo +
          "&idcuota=" +
          idCuota +
          "&idcurso=" +
          l.idcurso
      )
      .then((response) => {
        if (response.data) {
          dispatch(cargarAlumnosMarcados(response.data));
          return dispatch(cargarTablaListaAlumnos(response.data));
        } else {
          return dispatch(cargarTablaListaAlumnos([]));
        }
      });
  }

  function listaMail(e, l) {
    e.preventDefault();
    listaAlumnos.map((a) => {
      document.getElementById(`checkMail${a.id}`).checked = true;
    });
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacioncurso/traerlistaalumnosmail.php?ciclo=" +
          ciclo +
          "&idcuota=" +
          idCuota +
          "&idcurso=" +
          l.idcurso
      )
      .then((response) => {
        if (response.data) {
          dispatch(cargarAlumnosMarcados(response.data));
          return dispatch(cargarTablaListaAlumnos(response.data));
        } else {
          return dispatch(cargarTablaListaAlumnos([]));
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

  function marcarTodosImprimirEnviar(e, accion) {
    e.preventDefault();

    if (accion === "imprimir") {
      if (listaAlumnosMarcados.length !== 0) {
        dispatch(cargarAlumnosMarcados([]));
        listaAlumnos.map((a) => {
          document.getElementById(`checkImprimir${a.id}`).checked = false;
        });
        document.getElementById("marcaImprimir").innerHTML = `MARCAR TODOS`;
      }

      if (listaAlumnosMarcados.length === 0) {
        dispatch(cargarAlumnosMarcados(listaAlumnos));
        listaAlumnos.map((a) => {
          document.getElementById(`checkImprimir${a.id}`).checked = true;
        });
        document.getElementById("marcaImprimir").innerHTML = `DESM. TODOS`;
      }
    }

    if (accion === "mail") {
      if (listaAlumnosMarcados.length !== 0) {
        dispatch(cargarAlumnosMarcados([]));
        listaAlumnos.map((a) => {
          document.getElementById(`checkMail${a.id}`).checked = false;
        });
        document.getElementById("marcaEnviar").innerHTML = `MARCAR TODOS`;
      }

      if (listaAlumnosMarcados.length === 0) {
        dispatch(cargarAlumnosMarcados(listaAlumnos));
        listaAlumnos.map((a) => {
          document.getElementById(`checkMail${a.id}`).checked = true;
        });
        document.getElementById("marcaEnviar").innerHTML = `DESM. TODOS`;
      }
    }
  }

  function marcarDesmarcarAlumno(alumno, accion) {
    if (accion === "imprimir") {
      if (!document.getElementById(`checkImprimir${alumno.id}`).checked) {
        document.getElementById(`checkImprimir${alumno.id}`).checked = false;
        dispatch(
          cargarAlumnosMarcados(
            listaAlumnosMarcados.filter((a) => a.id !== alumno.id)
          )
        );
      } else {
        dispatch(agregarAlumnoMarcado(alumno));
      }
    } else {
      if (!document.getElementById(`checkMail${alumno.id}`).checked) {
        document.getElementById(`checkMail${alumno.id}`).checked = false;
        dispatch(
          cargarAlumnosMarcados(
            listaAlumnosMarcados.filter((a) => a.id !== alumno.id)
          )
        );
      } else {
        dispatch(agregarAlumnoMarcado(alumno));
      }
    }
  }

  function marcarTodosLiqRev(e) {
    e.preventDefault();

    if (listaCursosMarcados.length !== 0) {
      document.querySelector(".marca").innerHTML = "Marcar Todo";
      dispatch(cargarCursosMarcados([]));
      liquidaciones.map((l) => {
        document.getElementById(`checkLiq${l.idcurso}`).checked = false;
      });
    }

    if (listaCursosMarcados.length === 0) {
      document.querySelector(".marca").innerHTML = "Desm. Todo";
      dispatch(cargarCursosMarcados(liquidaciones));
      liquidaciones.map((l) => {
        if (l.traspaso === "0") {
          document.getElementById(`checkLiq${l.idcurso}`).checked = true;
        }
      });
    }
  }

  function marcarDesmarcarLiq(curso) {
    if (!document.getElementById(`checkLiq${curso.idcurso}`).checked) {
      dispatch(
        cargarCursosMarcados(
          listaCursosMarcados.filter((c) => c.idcurso !== curso.idcurso)
        )
      );
    } else {
      dispatch(agregarCursoMarcado(curso));
    }
  }

  function imprimirTodos(e) {
    e.preventDefault();
    let idsAlumnos = [];
    listaAlumnosMarcados.map((alumnos) => {
      idsAlumnos.push(alumnos.id);
    });
    idsAlumnos = idsAlumnos.join();
    window.open(
      "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/imprimir_boletapago.php?" +
        "idcuota=" +
        idCuota +
        "&idalum=" +
        idsAlumnos
    );
  }

  function enviarTodos(e) {
    e.preventDefault();
    listaAlumnosMarcados.map((l) => {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/enviar_boletapagoweb.php?idcuota=" +
            idCuota +
            "&idalum=" +
            l.id +
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
    });
  }

  console.log(listaAlumnosMarcados);
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
            <th
              onClick={(e) => marcarTodosLiqRev(e)}
              className="w-100 col-1 col-xl-1 text-nowrap traspaso marca"
            >
              Marcar Todo
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
                        id={`btn-accion ${l.idcurso}`}
                        className="spinner-border spinner-border-sm ml-2 d-none"
                      ></span>
                    </button>
                  </div>
                </td>

                <td className="align-middle">
                  <input
                    onChange={() => marcarDesmarcarLiq(l)}
                    id={`checkLiq${l.idcurso}`}
                    type={"checkbox"}
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap mb-0"
                    disabled={l.traspaso === "0" ? false : true}
                  />
                </td>

                <td className="align-middle">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#imprimir"
                    className={
                      l.traspaso === "0" ? "d-none" : "border-0 bg-transparent"
                    }
                    onClick={(e) => {
                      listaAlumnos.map((a) => {
                        document.getElementById(
                          `checkImprimir${a.id}`
                        ).checked = true;
                      });
                      listaImprimir(e, l);
                    }}
                  >
                    <img width={25} src={printer} alt=""></img>
                  </button>
                </td>

                <td className="align-middle">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#correo"
                    className={
                      l.traspaso === "0"
                        ? "d-none mx-4"
                        : "border-0 bg-transparent"
                    }
                    onClick={(e) => {
                      listaAlumnos.map((a) => {
                        document.getElementById(
                          `checkMail${a.id}`
                        ).checked = true;
                      });
                      listaMail(e, l);
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
      <div>
        <div
          class="modal fade"
          id="imprimir"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Impresión de Boletas
                </h5>
                <button
                  type="button"
                  class="btn-close btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  X
                </button>
              </div>
              <div class="modal-body">
                <div className="table-responsive">
                  <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
                    <thead className="py-5 header">
                      <tr className="bg-light" style={{ cursor: "pointer" }}>
                        <th className="text-nowrap">ORD.</th>
                        <th className="text-nowrap">Apellido y Nombre</th>
                        <th
                          className="text-nowrap col-1"
                          id="marcaImprimir"
                          onClick={(e) => {
                            marcarTodosImprimirEnviar(e, "imprimir");
                          }}
                        >
                          DESM. TODO
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaAlumnos &&
                        listaAlumnos.map((a) => (
                          <tr>
                            <td className="text-center">
                              <p
                                style={{ fontSize: "13px" }}
                                className="fw-bold text-nowrap mb-0"
                              >
                                {a.pos}
                              </p>
                            </td>
                            <td className="align-middle">
                              <p
                                style={{ fontSize: "13px" }}
                                className="fw-bold text-left mb-0"
                              >
                                {a.nombre}
                              </p>
                            </td>
                            <td className="text-center">
                              <input
                                onChange={() =>
                                  marcarDesmarcarAlumno(a, "imprimir")
                                }
                                id={`checkImprimir${a.id}`}
                                type="checkbox"
                                defaultChecked={true}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => imprimirTodos(e)}
                  type="button"
                  class="btn btn-primary"
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="correo"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  ENVIO DE BOLETAS
                </h5>
                <button
                  type="button"
                  class="btn-close btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  X
                </button>
              </div>
              <div class="modal-body">
                <div className="table-responsive">
                  <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
                    <thead className="py-5 header">
                      <tr className="bg-light" style={{ cursor: "pointer" }}>
                        <th className="text-nowrap">ORD.</th>
                        <th className="text-nowrap">Apellido y Nombre</th>
                        <th className="text-nowrap ">Mail</th>
                        <th
                          id="marcaEnviar"
                          className="text-nowrap col-1"
                          onClick={(e) => {
                            marcarTodosImprimirEnviar(e, "mail");
                          }}
                        >
                          DESM. TODO
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaAlumnos &&
                        listaAlumnos.map((a) => (
                          <tr>
                            <td className="text-center">
                              <p
                                style={{ fontSize: "13px" }}
                                className="fw-bold text-nowrap mb-0"
                              >
                                {a.pos}
                              </p>
                            </td>
                            <td className="text-left">
                              <p
                                style={{ fontSize: "13px" }}
                                className="fw-bold mb-0"
                              >
                                {a.nombre}
                              </p>
                            </td>
                            <td className="align-middle">
                              <p
                                style={{ fontSize: "13px" }}
                                className="fw-bold text-nowrap text-left mb-0"
                              >
                                {a.email}
                              </p>
                            </td>
                            <td className="text-center">
                              <input
                                onClick={() => marcarDesmarcarAlumno(a, mail)}
                                id={`checkMail${a.id}`}
                                type="checkbox"
                                defaultChecked={true}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => enviarTodos(e)}
                  type="button"
                  class="btn btn-primary"
                >
                  Enviar Correo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
