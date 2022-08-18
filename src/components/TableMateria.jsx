import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";
import trash from "../utils/delete.png";
import edit from "../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarMaterias, borrarMateria } from "../actions";
import { useSelector } from "react-redux/es/exports";

export default function TableMateria({ name, filter }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materias);

  function cargarTabla() {
    if (name.length > 3 || !name) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/app/traermaterias.php?nombre=" +
            name
        )
        .then((response) => {
          return dispatch(cargarMaterias(response.data));
        });
    }
  }

  useEffect(() => {
    cargarTabla();
  }, [filter, name]);

  async function eliminarMateria(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/app/grabardatosmaterias.php?oper=" +
          "B" +
          "&idmateria=" +
          id +
          "&nombre= " +
          "&abrev= " +
          "&anio=0" +
          "&tipo=0" +
          "&tiponota=0" +
          "&agrup=0"
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarMateria(id));
  }

  return (
    <div
      style={{ height: "900px" }}
      className="overflow-scroll table-responsive"
    >
      <table className="w-100 table-striped table-hover table-condensed">
        <thead className="bg-transparent">
          <tr>
            <th className="col-2">Código</th>
            <th className="col">Nombre</th>
            <th className="col-2">Año</th>
            <th className="col">Tipo</th>
            <th className="col">Editar</th>
            <th className="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {materias &&
            materias.map((m) => (
              <tr
                style={{ cursor: "pointer" }}
                key={m[0]}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/materiasvinculadas/${m[0]}`);
                }}
              >
                <td>
                  <div className="ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {m[0].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {m[1].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {m[2].toUpperCase()}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {m[3]}
                    </p>
                  </div>
                </td>
                <td className="">
                  <NavLink
                    to={"/materia/" + m[0]}
                    type="button"
                    className="ml-3 btn"
                    id={m[4]}
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
                          "Está seguro que desea eliminar la materia " +
                          m[1] +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarMateria(m[0]);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/materias");
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
