import React, { useEffect, useState } from "react";
import "../../style/styles.css";

export default function TablaInformes({ tabla, indicador }) {
  //const [order, setOrder] = useState("ASC");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (indicador === "11") {
      let total1 = 0;
      tabla.map((i) => {
        total1 = total1 + parseFloat(i.importe);
      });
      setTotal(total1);
    }
  }, [tabla]);

  function orden(e, col) {
    // e.preventDefault();
    // if (document.querySelector(`.${col}`).innerHTML.slice(-1) === " ") {
    //   if (col === "id") {
    //     document.querySelector(`.${col}`).innerHTML = `Código ↓`;
    //   } else if (col === "nombres") {
    //     document.querySelector(`.${col}`).innerHTML = `Nombre ↓`;
    //   } else if (col === "curso") {
    //     document.querySelector(`.${col}`).innerHTML = `Curso ↓`;
    //   }
    // } else {
    //   if (col === "id") {
    //     document.querySelector(`.${col}`).innerHTML = `Código  `;
    //   } else if (col === "nombres") {
    //     document.querySelector(`.${col}`).innerHTML = `Nombre  `;
    //   } else if (col === "curso") {
    //     document.querySelector(`.${col}`).innerHTML = `Curso  `;
    //   }
    // }
    // if (order === "ASC") {
    //   const sorted = [...informes].sort((a, b) => (a.col > b.col ? 1 : -1));
    //   dispatch(cargarInformes(sorted));
    //   setOrder("DESC");
    // }
    // if (order === "DESC") {
    //   const sorted = [...informes].sort((a, b) => (a.col < b.col ? 1 : -1));
    //   dispatch(cargarInformes(sorted));
    //   setOrder("ASC");
    // }
  }

  function seleccionarTodos(e) {
    if (indicador === "10") {
      if (document.getElementById("checkTodos10").checked) {
        tabla.map((i) => {
          document.getElementById(`check${i.codfamilia}`).checked = true;
        });
      }

      if (!document.getElementById("checkTodos10").checked) {
        tabla.map((i) => {
          document.getElementById(`check${i.codfamilia}`).checked = false;
        });
      }
    } else if (indicador === "9") {
      if (document.getElementById("checkTodos9").checked) {
        tabla.map((i) => {
          document.getElementById(`check${i.idalumno}`).checked = true;
        });
      }

      if (!document.getElementById("checkTodos9").checked) {
        tabla.map((i) => {
          document.getElementById(`check${i.idalumno}`).checked = false;
        });
      }
    }
  }

  return (
    <div>
      {indicador === "1" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Nivel
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-5 text-nowrap nombres"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col-1 text-nowrap docnro"
                >
                  Fecha Desde
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col-5 text-nowrap sexo"
                >
                  Fecha Hasta
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col-1 text-nowrap nacionalidad"
                >
                  Beca
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.alumno}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.docnro}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.nivel}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.curso}</p>
                    </td>
                    <td className="align-middle">
                      <p className="fw-bold text-center mb-0 text-nowrap ">
                        {i.txfdesde}
                      </p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.txfhasta}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.beca}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="7">
                  <div>
                    {tabla === [] || !tabla ? (
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
      ) : (
        ""
      )}
      {indicador === "2" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Código
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Apellido
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-5 text-nowrap nombres"
                >
                  Nombres
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col-1 text-nowrap docnro"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col-5 text-nowrap sexo"
                >
                  Sexo
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col-1 text-nowrap nacionalidad"
                >
                  Nacionalidad
                </th>
                <th
                  onClick={(e) => orden(e, "fechanac")}
                  className="col-5 text-nowrap fechanac"
                >
                  Fecha Nac.
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla.map((i) => (
                  <tr key={i[1]}>
                    <td className="align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.cod}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.curso}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.apellido}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.nombres}</p>
                    </td>
                    <td className="align-middle">
                      <p className="fw-bold text-center mb-0 text-nowrap ">
                        {i.docnro}
                      </p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.sexo}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.nacionalidad}
                      </p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.fechanac}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="8">
                  <div>
                    {tabla === [] || !tabla ? (
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
      ) : (
        ""
      )}

      {indicador === "3" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col text-nowrap id"
                >
                  Cod. Familia
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col text-nowrap curso"
                >
                  Responsable
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col text-nowrap apellido"
                >
                  Domicilio
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col text-nowrap nombres"
                >
                  Localidad
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col text-nowrap docnro"
                >
                  Telefono
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col text-nowrap sexo"
                >
                  Teléfono
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Email
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col text-nowrap docnro"
                >
                  IVA
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col text-nowrap sexo"
                >
                  CBU
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Documento
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.codfamilia}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.responsable}
                      </p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.domicilio}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.localidad}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.provincia}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold text-center mb-0 text-nowrap ">
                        {i.telefono}
                      </p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.email}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.iva}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.cbu}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.alumno}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.docnro}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="11">
                  <div>
                    {tabla === [] || !tabla ? (
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
      ) : (
        ""
      )}
      {indicador === "4" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col text-nowrap id"
                >
                  N° Boleta
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col text-nowrap curso"
                >
                  Arancel
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col text-nowrap apellido"
                >
                  Nivel
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col text-nowrap nombres"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col text-nowrap docnro"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col text-nowrap sexo"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Fecha 1er Vto.
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col text-nowrap docnro"
                >
                  Fecha 2do Vto.
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col text-nowrap sexo"
                >
                  Importe 1er Vto.
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Importe 2do Vto.
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  importe Vencido
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col text-nowrap sexo"
                >
                  Fecha Pago
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Cobrado
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col text-nowrap nacionalidad"
                >
                  Beca
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.idboleta}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.arancel}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.nivel}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.curso}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.alumno}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold text-center mb-0 text-nowrap ">
                        {i.docnro}
                      </p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.fecha1}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.fecha2}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.importe1}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.importe2}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.importe3}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.fhpago}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.cobrado}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.beca}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="14">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              {tabla.length !== 0 ? tabla[tabla.length - 1].total1 : ""}
              <tr>
                <td colSpan="8" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total1 : ""}
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total2 : ""}
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total3 : ""}
                </td>
                <td></td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].tcobrado : ""}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="14">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "5" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Fecha
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Forma de Pago
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Fecha Vto.
                </th>
                <th
                  onClick={(e) => orden(e, "docnro")}
                  className="col-1 text-nowrap docnro"
                >
                  Recibo
                </th>
                <th
                  onClick={(e) => orden(e, "sexo")}
                  className="col-1 text-nowrap sexo"
                >
                  Arancel
                </th>
                <th
                  onClick={(e) => orden(e, "nacionalidad")}
                  className="col-1 text-nowrap nacionalidad"
                >
                  Cobrado
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.fecha}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.alumno}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.formapago}</p>
                    </td>

                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.fhvto}</p>
                    </td>

                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.idcobranza}
                      </p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.impcuota}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.impcobrado}
                      </p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="5">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-right">
                  TOTALES
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].totala : ""}
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].totalc : ""}
                </td>
              </tr>
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="14">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "6" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Fecha
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Forma de Pago
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Importe Arancel
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Importe Cobrado
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.fecha}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.formapago}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.totimpcuota}
                      </p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.totimpcobrado}
                      </p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="5">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-right">
                  TOTALES
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].totala : ""}
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].totalc : ""}
                </td>
              </tr>
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "7" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  N°
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Arancel
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Nivel
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Importe
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Beca
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.orden}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.arancel}</p>
                    </td>

                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.nivel}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.curso}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.alumno}</p>
                    </td>
                    <td className="text-rigcenterht align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.docnro}</p>
                    </td>

                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.importe}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.beca}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="8">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total : ""}
                </td>
              </tr>
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "8" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  N°
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Nivel
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Fecha Desde
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Deuda
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Cobrado
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.id}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.nivel}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.alumno}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.docnro}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.curso}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.txfhdesde}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.deuda}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.cobrado}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.saldo}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="9">
                  <div>
                    {tabla.length === 0 || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td colSpan="6" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total : ""}
                </td>
              </tr> */}
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "11" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Fecha
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Concepto
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Detalle
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Usuario
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Fecha y Hora
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Importe
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.txfecha}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.concepto}</p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.comentarios}
                      </p>
                    </td>

                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.usuario}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.fhcarga}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.importe}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="6">
                  <div>
                    {tabla.length === 0 || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">{total}</td>
              </tr>
            </tbody>
          </table>
          <div id="tr-loader" className="d-none tr-loader">
            <div colSpan="">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "13" ? (
        <div style={{ height: "700px" }} className="table-responsive">
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Mes
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Total Liq.
                </th>
                <th
                  onClick={(e) => orden(e, "apellido")}
                  className="col-1 text-nowrap apellido"
                >
                  Recargo Mora
                </th>
                <th
                  onClick={(e) => orden(e, "nombres")}
                  className="col-1 text-nowrap nombres"
                >
                  Total Neto
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Cobranza
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Deuda
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Porc. Deuda
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-1 text-nowrap curso"
                >
                  Adelantos
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i, index) => (
                  <tr
                    key={i[1]}
                    style={
                      index === tabla.length - 1 ? { fontSize: "15px" } : {}
                    }
                    className={
                      index === tabla.length - 1
                        ? "bg-secondary text-white"
                        : ""
                    }
                  >
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.periodo}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.totalliq}</p>
                    </td>

                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.recargo}</p>
                    </td>

                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.totalneto}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.cobranza}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.deuda}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap">{i.porcdeuda}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.adelanto}</p>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan="8">
                  <div>
                    {tabla.length === 0 || !tabla ? (
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
            <div colSpan="">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {indicador === "14" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Arancel
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Importe Cobrado
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap">
                        {i.descripcion}
                      </p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.totimpcobrado}
                      </p>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan="2">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="" className="text-right">
                  TOTAL
                </td>
                <td className="text-right col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].totalc : ""}
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
      ) : (
        ""
      )}
      {indicador === "9" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  //onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => seleccionarTodos(e)}
                    id={"checkTodos9"}
                  ></input>
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  N°
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Alumno
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Documento
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Curso
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Email Responsable
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Deuda
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <input
                        type={"checkbox"}
                        className="fw-bold mb-0 text-nowrap "
                        id={`check${i.idalumno}`}
                      >
                        {i.marca}
                      </input>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.orden}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.alumno}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.docnro}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.curso}</p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.email}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.deuda}</p>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan="7">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr className="bg-secondary text-white">
                <td colSpan="6" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total : ""}
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
      ) : (
        ""
      )}
      {indicador === "10" ? (
        <div
          style={{ height: "700px" }}
          className={tabla.length === 0 ? "d-none" : "table-responsive"}
        >
          <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary">
            <thead className="py-5 header">
              <tr className="bg-light" style={{ cursor: "pointer" }}>
                <th
                  //onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  <input
                    type="checkbox"
                    onChange={(e) => seleccionarTodos(e)}
                    id="checkTodos10"
                  ></input>
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  N°
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Cod.Familia
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Responsable
                </th>
                <th
                  onClick={(e) => orden(e, "id")}
                  className="col-1 text-nowrap id"
                >
                  Email Responsable
                </th>
                <th
                  onClick={(e) => orden(e, "curso")}
                  className="col-5 text-nowrap curso"
                >
                  Deuda
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "13px" }}>
              {tabla &&
                tabla?.map((i) => (
                  <tr key={i[1]}>
                    <td className="text-center align-middle">
                      <input
                        type={"checkbox"}
                        className="fw-bold mb-0 text-nowrap"
                        id={`check${i.codfamilia}`}
                      >
                        {i.marca}
                      </input>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.orden}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.codfamilia}
                      </p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">
                        {i.responsable}
                      </p>
                    </td>
                    <td className="text-left align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.email}</p>
                    </td>
                    <td className="text-right align-middle">
                      <p className="fw-bold mb-0 text-nowrap ">{i.deuda}</p>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan="6">
                  <div>
                    {tabla === [] || !tabla ? (
                      <div className="footer text-center">
                        No se registra información
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
              <tr className="bg-secondary text-white">
                <td colSpan="5" className="text-right">
                  TOTAL
                </td>
                <td className="text-left col-xs-2">
                  {" "}
                  {tabla.length !== 0 ? tabla[tabla.length - 1].total : ""}
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
      ) : (
        ""
      )}
    </div>
  );
}
