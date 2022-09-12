import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import trash from "../../utils/delete.png";
import edit from "../../utils/edit.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { borrarBeca, cargarBecas } from "../../actions";
import { useSelector } from "react-redux/es/exports";

export default function TablaBecas({ name, filter }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const becas = useSelector((state) => state.becas);
  const [order, setOrder] = useState("ASC");

  async function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    if (name.length > 3 || !name) {
      await axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerbecas.php?&nombre=" +
            name
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.add("d-none");
          return dispatch(cargarBecas(response.data));
        });
    }
  }
  useEffect(() => {
    dispatch(cargarBecas([]));
    cargarTabla();
  }, [name, filter]);

  async function eliminarBeca(id) {
    await axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosbecas.php?oper=" +
          "B" +
          "&idbeca=" +
          id +
          "&nombre= " +
          "&tipo=0" +
          "&valor=0"
      )
      .then((response) => {
        console.log(response.data);
      });
    dispatch(borrarBeca(id));
  }

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
      const sorted = [...becas].sort((a, b) => (a[i] > b[i] ? 1 : -1));
      dispatch(cargarBecas(sorted));
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...becas].sort((a, b) => (a[i] < b[i] ? 1 : -1));
      dispatch(cargarBecas(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div style={{ height: "900px" }} className="table-responsive">
      <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
        <thead className="py-5 header">
          <tr className="bg-light" style={{ cursor: "pointer" }}>
            <th
              onClick={(e) => orden(e, "codigo")}
              className="col-1 text-nowrap codigo"
            >
              Código
            </th>
            <th
              onClick={(e) => orden(e, "nombre")}
              className="col-5 text-nowrap nombre"
            >
              Nombre
            </th>
            <th className="col-1 text-nowrap">Editar</th>
            <th className="col-1 text-nowrap">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {becas &&
            becas.map((b) => (
              <tr
                style={{ cursor: "pointer" }}
                key={b[1]}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(`/becas/${b[1]}`);
                }}
              >
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {b[1]}
                    </p>
                  </div>
                </td>
                <td className="text-left">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {b[0]}
                    </p>
                  </div>
                </td>

                <td className="align-middle">
                  <NavLink
                    to={"/becas/" + b[1]}
                    type="button"
                    className="p-0 btn"
                    id={b[1]}
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
                <td className="">
                  <button
                    className="btn"
                    onClick={(e) => {
                      Swal.fire({
                        title:
                          "Está seguro que desea eliminar la beca " +
                          b[0] +
                          "?",
                        icon: "question",
                        html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                        showCloseButton: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          eliminarBeca(b[1]);
                          Swal.fire("Eliminado!", "", "success");
                        }
                        navigation("/becas");
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
                {becas === [] || !becas ? (
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
