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

  function CargarConceptos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerconceptovinc.php?idbeca=" +
          id
      )
      .then((response) => {
        if (response?.data === null) {
          dispatch(cargarConceptosVinculados([]));
        } else {
          dispatch(cargarConceptosVinculados(response?.data));
        }
      });
  }
  useEffect(() => {
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
        <table className="w-50 table-striped table-hover table-condensed">
          <thead className="bg-transparent">
            <tr>
              <th className="col-1">Orden</th>
              <th className="col">Descripción</th>
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
                    <div className="">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
