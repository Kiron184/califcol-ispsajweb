import React, { useEffect } from "react";
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

  function cargarTabla() {
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
          return dispatch(cargarConceptosGenerales(response.data));
        });
    }
  }

  useEffect(() => {
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

  return (
    <div
      style={{ height: "900px" }}
      className="overflow-scroll table-responsive"
    >
      <table className="w-100 table-striped table-hover table-condensed">
        <thead className="bg-transparent">
          <tr>
            <th className="col-6">Descripcion</th>
            <th className="col-4">Tipo</th>
            <th className="col">Editar</th>
            <th className="col">Eliminar</th>
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

                <td className="">
                  <NavLink
                    to={"/conceptosgenerales/" + u[2]}
                    type="button"
                    className="ml-3 btn"
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
                <td className="d-flex justify-content-center">
                  <button
                    className="btn mt-2 mt-lg-0"
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
        </tbody>
      </table>
    </div>
  );
}
