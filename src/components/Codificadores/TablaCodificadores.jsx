import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import trash from "../../utils/delete.png";
import edit from "../../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { borrarCodificador, cargarCodificadores } from "../../actions";
import { useSelector } from "react-redux/es/exports";

export default function TablaCodificadores({ filter }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const codificadores = useSelector((state) => state.codificadores);
  const [order, setOrder] = useState("ASC");

  async function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/codificadores/div_lista_filtro.php?busqueda=por_filtro&codificador=" +
          filter
      )
      .then((response) => {
        document.querySelector(".tr-loader").classList.add("d-none");
        return dispatch(cargarCodificadores(response.data));
      });
  }

  useEffect(() => {
    dispatch(cargarCodificadores([]));
    cargarTabla();
  }, [filter]);

  async function eliminarCodificador(id, idcodificador) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/codificadores/grabardatoscodificadores.php?oper=" +
          "B" +
          "&id=" +
          id +
          "&idcodificador= " +
          idcodificador +
          "&descripcion=" +
          "&codigo1=" +
          "&habilitado="
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarCodificador(id));
  }

  function orden(e, col) {
    e.preventDefault();

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "codigonum") {
        document.querySelector(`.${col}`).innerHTML = `Código ↓`;
      } else if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↓`;
      } else if (col === "codigoalfa1") {
        document.querySelector(`.${col}`).innerHTML = `Código 1 ↓`;
      }
    } else {
      if (col === "codigonum") {
        document.querySelector(`.${col}`).innerHTML = `Código ↑`;
      } else if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↑`;
      } else if (col === "codigoalfa1") {
        document.querySelector(`.${col}`).innerHTML = `Código 1 ↑`;
      }
    }

    if (order === "ASC") {
      const sorted = [...codificadores].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      dispatch(cargarCodificadores(sorted));
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...codificadores].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      dispatch(cargarCodificadores(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div style={{ height: "900px" }} className="table-responsive">
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              onClick={(e) => orden(e, "codigonum")}
              className="col-1 text-nowrap codigonum"
            >
              Código ↑
            </th>
            <th
              onClick={(e) => orden(e, "descripcion")}
              className="col-3 text-nowrap descripcion"
            >
              Descripción ↑
            </th>
            <th
              onClick={(e) => orden(e, "codigoalfa1")}
              className="col-1 text-nowrap codigoalfa1"
            >
              Código 1 ↑
            </th>
            <th className="col-1 text-nowrap">Editar</th>
            <th className="col-1 text-nowrap">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {codificadores &&
            codificadores.map((c) => (
              <tr
                style={{ cursor: "pointer" }}
                key={c.codigonum}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/codificadores/${c.id}/${c.codigonum}`);
                }}
              >
                <td className="align-middle">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap m-0"
                  >
                    {c.codigonum}
                  </p>
                </td>
                <td className="text-left align-middle py-0">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap m-0"
                  >
                    {c.descripcion}
                  </p>
                </td>
                <td className="text-center align-middle py-0">
                  <p
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-nowrap m-0"
                  >
                    {c.codigoalfa1}
                  </p>
                </td>

                <td className="align-middle py-0">
                  <NavLink
                    to={"/codificadores/" + c.id + "/" + c.codigonum}
                    type="button"
                    className="p-0 btn"
                    id={c.codigonum}
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
                <td className="align-middle py-0">
                  <button
                    className="btn"
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea eliminar el Codificador " +
                          c.descripcion +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarCodificador(c.id, c.codigonum);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/codificadores");
                      });
                    }}
                  >
                    <img width="20px" alt="edit" src={trash} />
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="5">
              <div>
                {codificadores === [] || !codificadores ? (
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
