import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import trash from "../../utils/delete.png";
import edit from "../../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { borrarConcepto, cargarConceptosGenerales } from "../../actions";
import { useSelector } from "react-redux";

export default function TablaConceptos({ name, filter }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const conceptos = useSelector((state) => state.conceptosGenerales);
  const [order, setOrder] = useState("ASC");

  function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    let busqueda = "";
    if (name.length > 3) {
      busqueda = "por_nombre";
    }

    if (name.length > 3 || !name) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerconceptos.php?busqueda=" +
            busqueda +
            "&nombre=" +
            name
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.add("d-none");
          return dispatch(cargarConceptosGenerales(response.data));
        });
    }
  }

  useEffect(() => {
    dispatch(cargarConceptosGenerales([]));
    cargarTabla();
  }, [filter, name]);

  async function eliminarConcepto(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosconceptos.php?oper=" +
          "B" +
          "&idconcepto=" +
          id +
          "&descripcion= " +
          "&monto=0" +
          "&rbhabil=0" +
          "&idnivel=0" +
          "&rboblig=0" +
          "&idtipo=0"
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarConcepto(id));
  }

  function orden(e, col) {
    e.preventDefault();

    let i = col === "descripcion" ? 0 : 1;

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↓`;
      } else if (col === "tipo") {
        document.querySelector(`.${col}`).innerHTML = `Tipo ↓`;
      }
    } else {
      if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↑`;
      } else if (col === "tipo") {
        document.querySelector(`.${col}`).innerHTML = `Tipo ↑`;
      }
    }

    if (order === "ASC") {
      const sorted = [...conceptos].sort((a, b) => (a[i] > b[i] ? 1 : -1));
      dispatch(cargarConceptosGenerales(sorted));
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...conceptos].sort((a, b) => (a[i] < b[i] ? 1 : -1));
      dispatch(cargarConceptosGenerales(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div style={{ height: "900px" }} className="table-responsive">
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              onClick={(e) => orden(e, "descripcion")}
              className="col-5 text-nowrap descripcion"
            >
              Descripcion
            </th>
            <th
              onClick={(e) => orden(e, "tipo")}
              className="col-3 text-nowrap tipo"
            >
              Tipo
            </th>
            <th className="col-1 text-nowrap">Editar</th>
            <th className="col-1 text-nowrap">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {conceptos &&
            conceptos.map((u) => (
              <tr
                style={{ cursor: "pointer" }}
                key={u[2]}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/conceptosgenerales/${u[2]}`);
                }}
              >
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap text-left"
                    >
                      {u[0].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-0 text-nowrap "
                    >
                      {u[1].toUpperCase()}
                    </p>
                  </div>
                </td>

                <td className="align-middle">
                  <NavLink
                    to={"/conceptosgenerales/" + u[2]}
                    type="button"
                    className="btn p-0"
                    id={u[2]}
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
                <td className="d-flex justify-content-center align-middle">
                  <button
                    className="btn mt-2 mt-lg-0 p-0"
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea eliminar el docente " +
                          u[0] +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarConcepto(u[2]);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/conceptosgenerales");
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
                {conceptos === [] || !conceptos ? (
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
