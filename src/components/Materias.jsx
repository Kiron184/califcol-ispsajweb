import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import trash from "../utils/delete.png";
import axios from "axios";
import { cargarMateriasVinculadas } from "../actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";

export default function Materias({ id }) {
  const dispatch = useDispatch();
  const materias = useSelector((state) => state.materiasVinculadas);
  const [comboMaterias, setComboMaterias] = useState();

  function CargarMaterias() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/app/traermatvinc.php?iddocente=" +
          id
      )
      .then((response) => {
        if (response.data === null) {
          dispatch(cargarMateriasVinculadas([]));
        } else {
          dispatch(cargarMateriasVinculadas(response.data));
        }
      });
  }
  useEffect(() => {
    CargarMaterias();
    axios
      .get("https://www.califcolegios.wnpower.host/app/combomaterias.php")
      .then((response) => {
        setComboMaterias(response?.data);
      });
  }, []);

  function eliminarMateria(idmateria) {
    axios
      .post(
        "https://www.califcolegios.wnpower.host/app/grabar_matvinc.php?iddocente=" +
          id +
          "&oper=B" +
          "&idmateria=" +
          idmateria
      )
      .then((response) => {
        console.log(response.data);
        const nuevasMaterias = materias.filter((m) => m[0] !== idmateria);
        dispatch(cargarMateriasVinculadas(nuevasMaterias));
      });
  }

  function agregarMateria(e) {
    e.preventDefault();
    const idmateria = document.getElementById("i_materia");
    const idmat = idmateria?.options[idmateria?.selectedIndex]?.id;
    const nombremat = idmateria.options[idmateria.selectedIndex].value;
    console.log(nombremat);
    axios
      .post(
        "https://www.califcolegios.wnpower.host/app/grabar_matvinc.php?iddocente=" +
          id +
          "&oper=A" +
          "&idmateria=" +
          idmat
      )
      .then((response) => {
        console.log(response.data);
        CargarMaterias();
      });
  }

  return (
    <div>
      <div className="my-3 d-flex flex-direction-row">
        <div>{parse(`${comboMaterias}`)}</div>
        <button
          className="btn btn-primary mx-4"
          onClick={(e) => agregarMateria(e)}
        >
          AGREGAR
        </button>
      </div>
      <div className="tablaDocenteContainer table-responsive">
        <table className="w-75 table-striped table-hover table-condensed">
          <thead className="bg-transparent">
            <tr>
              <th className="col-1">Código</th>
              <th className="col">Nombre</th>
              <th className="col-1">Año</th>
              <th className="col-1">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {materias &&
              materias?.map((m) => (
                <tr key={m[0]}>
                  <td>
                    <div className="text-center">
                      <p className="fw-bold my-auto align-middle">
                        {m[0].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <p className="fw-bold my-auto ml-3 align-middle text-nowrap">
                        {m[1].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <p className="fw-bold my-auto align-middle">
                        {m[2].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-link btn-sm btn-rounded"
                      onClick={(e) => {
                        Swal.fire({
                          title:
                            "Está seguro que desea eliminar la materia " +
                            m[1] +
                            " con codigo: " +
                            m[0] +
                            "?",
                          icon: "question",
                          html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                          showCloseButton: true,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            eliminarMateria(m[0]);
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
