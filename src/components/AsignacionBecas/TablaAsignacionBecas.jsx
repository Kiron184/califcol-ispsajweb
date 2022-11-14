import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import trash from "../../utils/x.png";
import edit from "../../utils/edit.png";
import Swal from "sweetalert2";

export default function TablaAsignacionBecas({ name, ciclo }) {
  const navigation = useNavigate();
  const [tabla, setTabla] = useState([]);
  const [order, setOrder] = useState("ASC");

  async function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    if (name.length > 3 || !name) {
      await axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/traerlistaasigbecas.php?anio_busq=" +
            ciclo +
            "&text_busq=" +
            name
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.add("d-none");
          return setTabla(response.data);
        });
    }
  }

  useEffect(() => {
    cargarTabla();
  }, [name, ciclo]);

  function orden(e, col) {
    e.preventDefault();

    let i = col === "codigo" ? 1 : 0;

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "codigo") {
        document.querySelector(`.${col}`).innerHTML = `Código ↓`;
      } else if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Nombre ↓`;
      }
    } else {
      if (col === "codigo") {
        document.querySelector(`.${col}`).innerHTML = `Código ↑`;
      } else if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Nombre ↑`;
      }
    }

    if (order === "ASC") {
      const sorted = [...tabla].sort((a, b) => (a[i] > b[i] ? 1 : -1));
      setTabla(sorted);
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...tabla].sort((a, b) => (a[i] < b[i] ? 1 : -1));
      setTabla(sorted);
      setOrder("ASC");
    }
  }

  async function anularBeca(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/grabardatosasigbecas.php?oper=" +
          "B" +
          "&idasigbeca=" +
          id +
          "&idbeca=0" +
          "&idalumno=0" +
          "&fdesde=" +
          "&fhasta=" +
          "&idusuario=83"
      )
      .then((response) => {
        console.log(response.data);
      });
  }
  return (
    <div style={{ height: "900px" }} className="table-responsive">
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              onClick={(e) => orden(e, "id")}
              className="col-1 text-nowrap id"
            >
              N° ↑
            </th>
            <th
              onClick={(e) => orden(e, "alumno")}
              className="col-1 text-nowrap alumno"
            >
              Alumno ↑
            </th>
            <th
              onClick={(e) => orden(e, "docnro")}
              className="col-1 text-nowrap docnro"
            >
              Documento ↑
            </th>
            <th
              onClick={(e) => orden(e, "nivel")}
              className="col-1 text-nowrap nivel"
            >
              Nivel ↑
            </th>
            <th
              onClick={(e) => orden(e, "curso")}
              className="col-1 text-nowrap curso"
            >
              Curso ↑
            </th>
            <th
              onClick={(e) => orden(e, "beca")}
              className="col-1 text-nowrap beca"
            >
              Beca ↑
            </th>
            <th
              onClick={(e) => orden(e, "txvalor")}
              className="col-1 text-nowrap txvalor"
            >
              Valor ↑
            </th>
            <th className="col-1 text-nowrap">Editar</th>
            <th className="col-1 text-nowrap">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {tabla &&
            tabla.map((b) => (
              <tr
                style={{ cursor: "pointer" }}
                className={b.anulado === "S" ? "bg-danger" : ""}
                key={b.id}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/asignacionbecas/${b.id}`);
                }}
              >
                <td className="align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.id}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.alumno}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.docnro}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.nivel}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.curso}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.beca}
                    </p>
                  </div>
                </td>
                <td className="text-left align-middle py-0">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {b.txvalor}
                    </p>
                  </div>
                </td>
                <td className="align-middle mb-0 py-0">
                  <NavLink
                    to={"/asignacionbecas/" + b.id}
                    type="button"
                    className="p-1 btn"
                    id={b.id}
                    edit="true"
                    onClick={(e) => {
                      document
                        .querySelector(".navbar")
                        .classList.remove("active-nav");
                      document
                        .querySelector(".contenedor")
                        .classList.remove("active-contenedor");
                    }}
                  >
                    <img width="20px" alt="edit" src={edit} />
                  </NavLink>
                </td>
                <td className="align-middle mb-0 py-0">
                  <button
                    className={b.anulado === "S" ? "d-none" : "btn"}
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea anular la beca de " +
                          b.alumno +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          anularBeca(b.id);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/asignacionbecas");
                      });
                    }}
                  >
                    <img width="20px" alt="edit" src={trash} />
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="4">
              <div>
                {tabla === [] || !tabla ? (
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
