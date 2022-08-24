import React, { useEffect } from "react";
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

  async function cargarTabla() {
    if (name.length > 3 || !name) {
      await axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerbecas.php?&nombre=" +
            name
        )
        .then((response) => {
          console.log(response);
          return dispatch(cargarBecas(response.data));
        });
    }
  }
  useEffect(() => {
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

  return (
    <div
      style={{ height: "900px" }}
      className="overflow-scroll table-responsive"
    >
      <table className="w-100 table-striped table-hover table-condensed">
        <thead className="bg-transparent">
          <tr>
            <th className="col-6">Código</th>
            <th className="col-4">Nombre</th>
            <th className="col">Editar</th>
            <th className="col">Eliminar</th>
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
                <td>
                  <div className="ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {b[1]}
                    </p>
                  </div>
                </td>
                <td>
                  <div className=" ml-3">
                    <p
                      style={{ fontSize: "13px" }}
                      className="fw-bold mb-1 text-nowrap "
                    >
                      {b[0]}
                    </p>
                  </div>
                </td>

                <td className="">
                  <NavLink
                    to={"/becas/" + b[1]}
                    type="button"
                    className="ml-3 btn"
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
                <td className="d-flex justify-content-center">
                  <button
                    className="btn mt-2 mt-lg-0"
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
        </tbody>
      </table>
    </div>
  );
}
