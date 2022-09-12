import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import trash from "../../utils/delete.png";
import axios from "axios";
import { cargarConceptosVinculados } from "../../actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";

export default function Conceptos({ id }) {
  const dispatch = useDispatch();
  const conceptos = useSelector((state) => state.conceptosVinculados);
  const [comboConcepto, setComboConcepto] = useState();
  const [order, setOrder] = useState("ASC");

  function CargarConceptos() {
    document.querySelector(".tr-loader").classList.remove("d-none");
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerconceptovinc.php?idbeca=" +
          id
      )
      .then((response) => {
        document.querySelector(".tr-loader").classList.add("d-none");
        if (response?.data === null) {
          dispatch(cargarConceptosVinculados([]));
        } else {
          dispatch(cargarConceptosVinculados(response?.data));
        }
      });
  }
  useEffect(() => {
    dispatch(cargarConceptosVinculados([]));
    CargarConceptos();
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/comboconcepto.php"
      )
      .then((response) => {
        setComboConcepto(response?.data);
      });
  }, []);

  function eliminarConcepto(idconcepto) {
    axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabar_conceptosvinculados.php?idbeca=" +
          id +
          "&oper=B" +
          "&idconcepto=" +
          idconcepto
      )
      .then((response) => {
        console.log(response.data);
        const nuevosConceptos = conceptos.filter((m) => m[2] !== idconcepto);
        dispatch(cargarConceptosVinculados(nuevosConceptos));
      });
  }

  function agregarConcepto(e) {
    e.preventDefault();
    const idconcepto = document.getElementById("i_concepto");
    const idcon = idconcepto?.options[idconcepto?.selectedIndex]?.id;
    const nombremat = idconcepto.options[idconcepto.selectedIndex].value;
    console.log(nombremat);
    axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabar_conceptosvinculados.php?idbeca=" +
          id +
          "&oper=A" +
          "&idconcepto=" +
          idcon
      )
      .then((response) => {
        console.log(response.data);
        CargarConceptos();
      });
  }

  function orden(e, col) {
    e.preventDefault();

    let i = col === "orden" ? 0 : 1;

    if (document.querySelector(`.${col}`).innerHTML.slice(-1) === "↑") {
      if (col === "orden") {
        document.querySelector(`.${col}`).innerHTML = `Orden ↓`;
      } else if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↓`;
      }
    } else {
      if (col === "orden") {
        document.querySelector(`.${col}`).innerHTML = `Orden ↑`;
      } else if (col === "descripcion") {
        document.querySelector(`.${col}`).innerHTML = `Descripción ↑`;
      }
    }

    if (order === "ASC") {
      const sorted = [...conceptos].sort((a, b) => (a[i] > b[i] ? 1 : -1));
      dispatch(cargarConceptosVinculados(sorted));
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...conceptos].sort((a, b) => (a[i] < b[i] ? 1 : -1));
      dispatch(cargarConceptosVinculados(sorted));
      setOrder("ASC");
    }
  }

  return (
    <div>
      <div className="my-3 d-flex flex-direction-row">
        <div>{parse(`${comboConcepto}`)}</div>
        <button
          className="btn btn-primary mx-4"
          onClick={(e) => agregarConcepto(e)}
        >
          AGREGAR
        </button>
      </div>
      <div className="tablaDocenteContainer table-responsive">
        <table className="w-50 table-condensed table-hover table-bordered text-center table border-top border-secondary">
          <thead className="py-5 header">
            <tr className="bg-light" style={{ cursor: "pointer" }}>
              <th
                onClick={(e) => orden(e, "orden")}
                className="col-1 orden text-nowrap"
              >
                Orden
              </th>
              <th
                onClick={(e) => orden(e, "descripcion")}
                className="col descripcion text-nowrap"
              >
                Descripción
              </th>
              <th className="col-1">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {conceptos &&
              conceptos?.map((m) => (
                <tr key={m[0]}>
                  <td>
                    <div className="text-center">
                      <p className="fw-bold my-auto align-middle">{m[0]}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-left">
                      <p className="fw-bold my-auto ml-3 align-middle text-nowrap">
                        {m[1].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-link btn-sm btn-rounded"
                      onClick={(e) => {
                        Swal.fire({
                          title:
                            "Está seguro que desea eliminar el concepto " +
                            m[1] +
                            " con codigo: " +
                            m[2] +
                            "?",
                          icon: "question",
                          html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                          showCloseButton: true,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            eliminarConcepto(m[2]);
                            Swal.fire("Eliminado!", "", "success");
                          }
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
      </div>
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
