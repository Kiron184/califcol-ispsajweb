import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { cargarAranceles } from "../../actions";
import edit from "../../utils/edit.png";
import trash from "../../utils/delete.png";

export default function TablaBecas({ ciclo, mes }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const aranceles = useSelector((state) => state.aranceles);
  const [order, setOrder] = useState("ASC");

  async function cargarTabla() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traercuotas.php?&ciclo=" +
          ciclo
      )
      .then((response) => {
        document.querySelector(".tr-loader").classList.add("d-none");
        console.log(mes);
        if (mes === "0" || !mes) {
          return dispatch(cargarAranceles(response.data));
        } else {
          let filtrado = response.data.filter(
            (c) => c.fecha1.split("/")[1] === mes
          );
          return dispatch(cargarAranceles(filtrado));
        }
      });
  }

  useEffect(() => {
    dispatch(cargarAranceles([]));
    cargarTabla();
  }, [ciclo, mes]);

  function orden(e, col) {
    e.preventDefault();

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↓`;
      } else if (col === "tipo") {
        document.querySelector(`.${col}`).innerHTML = `Tipo ↓`;
      } else if (col === "fecha1") {
        document.querySelector(`.${col}`).innerHTML = `Fecha 1er Vto. ↓`;
      } else if (col === "importe1") {
        document.querySelector(`.${col}`).innerHTML = `Imp. 1er Vto. ↓`;
      } else if (col === "fecha2") {
        document.querySelector(`.${col}`).innerHTML = `Fecha 2do Vto. ↓`;
      } else if (col === "importe2") {
        document.querySelector(`.${col}`).innerHTML = `Imp. 2do Vto. ↓`;
      } else if (col === "arancel") {
        document.querySelector(`.${col}`).innerHTML = `Arancel ↓`;
      }
    } else {
      if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↑`;
      } else if (col === "tipo") {
        document.querySelector(`.${col}`).innerHTML = `Tipo ↑`;
      } else if (col === "fecha1") {
        document.querySelector(`.${col}`).innerHTML = `Fecha 1er Vto. ↑`;
      } else if (col === "importe1") {
        document.querySelector(`.${col}`).innerHTML = `Imp. 1er Vto. ↑`;
      } else if (col === "fecha2") {
        document.querySelector(`.${col}`).innerHTML = `Fecha 2do Vto. ↑`;
      } else if (col === "importe2") {
        document.querySelector(`.${col}`).innerHTML = `Imp. 2do Vto. ↑`;
      } else if (col === "arancel") {
        document.querySelector(`.${col}`).innerHTML = `Arancel ↑`;
      }
    }

    if (order === "ASC") {
      if (col === "importe1" || col === "importe2" || col === "arancel") {
        const sorted = [...aranceles].sort((a, b) =>
          parseFloat(a.col) > parseFloat(b.col) ? 1 : -1
        );
        dispatch(cargarAranceles(sorted));
      } else {
        const sorted = [...aranceles].sort((a, b) => (a.col > b.col ? 1 : -1));
        dispatch(cargarAranceles(sorted));
      }
      setOrder("DESC");
    }

    if (order === "DESC") {
      if (col === "importe1" || col === "importe2" || col === "arancel") {
        const sorted = [...aranceles].sort((a, b) =>
          parseFloat(a.col) < parseFloat(b.col) ? 1 : -1
        );
        dispatch(cargarAranceles(sorted));
      } else {
        const sorted = [...aranceles].sort((a, b) => (a.col < b.col ? 1 : -1));
        dispatch(cargarAranceles(sorted));
      }
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
              className="col-3 descripcion"
            >
              Descripción ↑
            </th>
            <th onClick={(e) => orden(e, "tipo")} className="col-1 tipo">
              Tipo ↑
            </th>
            <th onClick={(e) => orden(e, "fecha1")} className="col-1 fecha1">
              F. 1er Vto. ↑
            </th>
            <th
              onClick={(e) => orden(e, "importe1")}
              className="col-1 importe1"
            >
              Imp. 1er Vto. ↑
            </th>
            <th onClick={(e) => orden(e, "fecha2")} className="col-1 fecha2">
              F. 2do Vto. ↑
            </th>
            <th
              onClick={(e) => orden(e, "importe2")}
              className="col-1 importe2"
            >
              Imp. 2do Vto. ↑
            </th>
            <th onClick={(e) => orden(e, "arancel")} className="col-1 arancel">
              Arancel ↑
            </th>
            <th className="col-1">Editar</th>
            <th className="col-1">Clonar</th>
            <th className="col-1">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {aranceles &&
            aranceles.map((a) => (
              <tr
                style={{ cursor: "pointer" }}
                key={a.idcuota}
                onClick={(e) => {
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                  navigation(
                    `/aranceles/${a.idcuota}/${a.descripcion.split("/")}`
                  );
                }}
              >
                <td className="text-left">
                  <div className="">
                    <p style={{ fontSize: "13px" }} className="fw-bold ">
                      {a.descripcion}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.tipo}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.fecha1}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.importe1}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.fecha2}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.importe2}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <div className="">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold text-nowrap "
                    >
                      {a.arancel}
                    </p>
                  </div>
                </td>
                <td className="align-middle">
                  <NavLink
                    to={`/aranceles/${a.idcuota}/${a.descripcion.split("/")}`}
                    type="button"
                    className="p-0 btn"
                    id={a.idcuota}
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
                <td className="align-middle">
                  <button
                    style={{
                      height: "25px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                    className="btn rounded btn-success btn-sm text-nowrap py-0 px-1"
                    onClick={(e) => {
                      document
                        .querySelector(".navbar")
                        .classList.remove("active-nav");
                      document
                        .querySelector(".contenedor")
                        .classList.remove("active-contenedor");
                      navigation(`/aranceles/${a.idcuota}/${a.descripcion}`);
                    }}
                  >
                    Clonar
                  </button>
                </td>
                <td className="align-middle">
                  <NavLink
                    to={`/aranceles/${a.idcuota}/${a.descripcion}`}
                    type="button"
                    className="p-0 btn"
                    id={a.idcuota}
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
                    <img width="20px" alt="edit" src={trash} />
                  </NavLink>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="10">
              <div>
                {aranceles === [] || !aranceles || aranceles.length === 0 ? (
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
