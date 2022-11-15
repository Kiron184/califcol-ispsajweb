import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import trash from "../../utils/delete.png";
import edit from "../../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { borrarUsuario, cargarUsuarios } from "../../actions";
import { useSelector } from "react-redux/es/exports";

export default function TablaUsuarios({ name }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const usuarios = useSelector((state) => state.usuarios);
  const [order, setOrder] = useState("ASC");

  async function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/usuarios/traerusuarios.php?busqueda=por_nombre&nombre=" +
          name
      )
      .then((response) => {
        document.querySelector(".tr-loader").classList.add("d-none");
        return dispatch(cargarUsuarios(response.data));
      });
  }

  useEffect(() => {
    dispatch(cargarUsuarios([]));
    cargarTabla();
  }, [name]);

  async function eliminarUsuario(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/usuarios/grabardatosusuarios.php?oper=" +
          "B" +
          "&idusuario=" +
          id +
          "&nivel=0" +
          "&nombres=" +
          "&apellido=" +
          "&documento=" +
          "&email=" +
          "&password="
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarUsuario(id));
  }

  function orden(e, col) {
    e.preventDefault();

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Nombre ↓`;
      } else if (col === "nivel") {
        document.querySelector(`.${col}`).innerHTML = `Perfil ↓`;
      } else if (col === "email") {
        document.querySelector(`.${col}`).innerHTML = `Email ↓`;
      } else if (col === "docnro") {
        document.querySelector(`.${col}`).innerHTML = `Documento ↓`;
      }
    } else {
      if (col === "nombre") {
        document.querySelector(`.${col}`).innerHTML = `Nombre ↑`;
      } else if (col === "nivel") {
        document.querySelector(`.${col}`).innerHTML = `Perfil ↑`;
      } else if (col === "email") {
        document.querySelector(`.${col}`).innerHTML = `Email ↑`;
      } else if (col === "docnro") {
        document.querySelector(`.${col}`).innerHTML = `Documento ↑`;
      }
    }

    if (order === "ASC") {
      const sorted = [...usuarios].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      dispatch(cargarUsuarios(sorted));
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...usuarios].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      dispatch(cargarUsuarios(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div
      style={{ height: "900px", fontSize: "13px" }}
      className="table-responsive"
    >
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              onClick={(e) => orden(e, "nombre")}
              className="col-2 text-nowrap nombre"
            >
              Nombre ↑
            </th>
            <th
              onClick={(e) => orden(e, "email")}
              className="col-4 text-nowrap email"
            >
              Email ↑
            </th>
            <th
              onClick={(e) => orden(e, "nivel")}
              className="col-2 text-nowrap nivel"
            >
              Perfil ↑
            </th>
            <th
              onClick={(e) => orden(e, "docnro")}
              className="col-2 text-nowrap docnro"
            >
              Documento ↑
            </th>
            <th className="col-1 text-nowrap">Editar</th>
            <th className="col-1 text-nowrap">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios &&
            usuarios.map((u) => (
              <tr
                style={{ cursor: "pointer" }}
                key={u.id}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/usuarios/${u.id}`);
                }}
              >
                <td className="text-left align-middle m-0 py-0">
                  <p className="fw-bold text-nowrap m-0">{u.nombre}</p>
                </td>
                <td className="text-left align-middle m-0 py-0">
                  <p className="fw-bold text-nowrap m-0">{u.email}</p>
                </td>
                <td className="text-left align-middle m-0 py-0">
                  <p className="fw-bold text-nowrap m-0">{u.nivel}</p>
                </td>
                <td className="text-center align-middle m-0 py-0">
                  <p className="fw-bold text-nowrap m-0">{u.docnro}</p>
                </td>

                <td className="align-middle align-middle m-0 py-0">
                  <NavLink
                    to={"/usuarios/" + u.id}
                    type="button"
                    className="p-0 btn"
                    id={u.id}
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
                <td className="align-middle m-0 py-0">
                  <button
                    className="btn"
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea eliminar el Codificador " +
                          u.nombre +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarUsuario(u.id);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/usuarios");
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
                {usuarios === [] || !usuarios ? (
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
