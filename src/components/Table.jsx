import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";
import trash from "../utils/delete.png";
import edit from "../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarDocentes, borrarDocente } from "../actions";
import { useSelector } from "react-redux/es/exports";

export default function Table({ name, filter }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const docentes = useSelector((state) => state.users);

  function cargarTabla() {
    if (name.length > 3 || !name) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/ipsajweb/app/traerdocentes.php?txnombre=" +
            name +
            "&filtro=" +
            filter
        )
        .then((response) => {
          return dispatch(cargarDocentes(response.data));
        });
    }
  }

  useEffect(() => {
    cargarTabla();
  }, [filter, name]);

  async function eliminarDocente(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/ipsajweb/app/grabardatosdocentes.php?oper=" +
          "B" +
          "&iddocente=" +
          id +
          "&apellido= " +
          "&nombres= " +
          "&docnro= " +
          "&email= " +
          "&fechasalida= " +
          "&domicilio= " +
          "&telefono= "
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarDocente(id));
  }

  return (
    <div
      style={{ height: "900px" }}
      className="overflow-scroll table-responsive"
    >
      <table className="w-100 table-striped table-hover table-condensed">
        <thead className="bg-transparent">
          <tr>
            <th className="col-6">Apellido</th>
            <th className="col-4">Nombre</th>
            <th className="col">Documento</th>
            <th className="col">Email</th>
            <th className="col">Editar</th>
            <th className="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {docentes &&
            docentes.map((u) => (
              <tr
                style={{ cursor: "pointer" }}
                key={u[4]}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/docente/${u[4]}`);
                }}
              >
                <td>
                  <div className="ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {u[0].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {u[1].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {u[2].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {u[3]}
                    </p>
                  </div>
                </td>
                <td className="">
                  <NavLink
                    to={"/docente/" + u[4]}
                    type="button"
                    className="ml-3 btn"
                    id={u[4]}
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
                <td className="d-flex justify-content-center">
                  <button
                    className="btn mt-2 mt-lg-0"
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea eliminar el docente " +
                          u[0] +
                          " " +
                          u[1] +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarDocente(u[4]);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/home");
                      });
                    }}
                  >
                    <img width="20px" alt="edit" src={trash} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
