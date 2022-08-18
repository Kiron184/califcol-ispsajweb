import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import trash from "../utils/delete.png";
import axios from "axios";
import { cargarDocentesVinculados } from "../actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";

export default function DocentesVinc({ id }) {
  const dispatch = useDispatch();
  const docentes = useSelector((state) => state.docentesVinculados);
  const [comboDocentes, setComboDocentes] = useState();

  function CargarDocentes() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/app/traerdocvinc.php?idmateria=" +
          id
      )
      .then((response) => {
        if (response.data === null) {
          dispatch(cargarDocentesVinculados([]));
        } else {
          dispatch(cargarDocentesVinculados(response.data));
        }
      });
  }
  useEffect(() => {
    CargarDocentes();
    axios
      .get("https://www.califcolegios.wnpower.host/app/combodocentes.php")
      .then((response) => {
        setComboDocentes(response?.data);
      });
  }, []);

  function eliminarDocente(iddocente) {
    console.log(iddocente);
    axios
      .post(
        "https://www.califcolegios.wnpower.host/app/grabar_docvinc.php?idmateria=" +
          id +
          "&oper=B" +
          "&iddocente=" +
          iddocente
      )
      .then((response) => {
        console.log(response.data);
        const nuevosDocentes = docentes.filter((m) => m[0] !== iddocente);
        dispatch(cargarDocentesVinculados(nuevosDocentes));
      });
  }

  function agregarDocente(e) {
    e.preventDefault();
    const iddoctor = document.getElementById("i_docente");
    const iddoc = iddoctor?.options[iddoctor?.selectedIndex]?.id;
    const nombredoc = iddoctor.options[iddoctor.selectedIndex].value;
    console.log(nombredoc);
    axios
      .post(
        "https://www.califcolegios.wnpower.host/app/grabar_matvinc.php?idmateria=" +
          id +
          "&oper=A" +
          "&iddocente=" +
          iddoc
      )
      .then((response) => {
        console.log(response.data);
        CargarDocentes();
      });
  }

  return (
    <div>
      <div className="my-3 d-flex flex-direction-row">
        <div>{parse(`${comboDocentes}`)}</div>
        <button
          className="btn btn-primary mx-4"
          onClick={(e) => agregarDocente(e)}
        >
          AGREGAR
        </button>
      </div>
      <div className="tablaDocenteContainer table-responsive">
        <table className="w-75 table-striped table-hover table-condensed">
          <thead className="bg-transparent">
            <tr>
              <th className="col-6">Nombre y Apellido</th>
              <th className="col">Documento</th>
              <th className="col-1">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {docentes &&
              docentes?.map((d) => (
                <tr key={d[0]}>
                  <td>
                    <div className="text-left">
                      <p className="fw-bold my-auto align-middle">
                        {d[1].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <p className="fw-bold my-auto ml-3 align-middle text-nowrap">
                        {d[2].toUpperCase()}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-link btn-sm btn-rounded"
                      onClick={(e) => {
                        Swal.fire({
                          title:
                            "Está seguro que desea eliminar al docente " +
                            d[1] +
                            " con documento: " +
                            d[2] +
                            "?",
                          icon: "question",
                          html: "Si se confirma se dejará de visualizar en todas las opciones que se encuentre vinculado.",
                          showCloseButton: true,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            eliminarDocente(d[0]);
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
