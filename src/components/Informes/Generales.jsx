import React, { useState } from "react";
import "../../style/styles.css";
import axios from "axios";
import { useEffect } from "react";
import lupa from "../../utils/lupa.png";
import excel from "../../utils/excel.png";
import Swal from "sweetalert2";
import TablaInformes from "./TablaInformes";

export default function Generales() {
  const [comboReportes, setComboReportes] = useState("");
  const [indicador, setIndicador] = useState("0");
  const year = new Date().getFullYear();
  let month = new Date().getMonth();
  let day = new Date().getDate();
  day = day < 10 ? `0${day}` : day;
  month = month + 1 < 10 ? `0${month + 1}` : month + 1;
  const today = `${year}-${month}-${day}`;

  const cicloNivel = ["2", "13"];
  const calendario = ["1", "4", "8", "14"];
  const calendarioYFormaDePago = ["5", "6"];
  const [concepto, setConcepto] = useState([]);
  const [tabla, setTabla] = useState([]);

  const [ciclo, setCiclo] = useState(year);
  const [nivel, setNivel] = useState("0");
  const [fechaDesde, setFechaDesde] = useState(`${year}-01-01`);
  const [fechaHasta, setFechaHasta] = useState(`${year}-12-31`);
  const [formaDePago, setFormaDePago] = useState(0);
  const [deuda, setDeuda] = useState(1000);
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [tipoArancel, setTipoArancel] = useState("0");
  const [opcion, setOpcion] = useState("0");
  const [tipoCaja, setTipoCaja] = useState(0);
  const [tipoMovimiento, setTipoMovimiento] = useState(-1);
  const [conceptoValor, setConceptoValor] = useState(0);

  function cargarComboReportes() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/comboreportes.php?idusuario=83&perfil=ADMIN. ARANCELES"
      )
      .then((response) => {
        setComboReportes(response.data);
      });
  }

  function actualizarCombos(e) {
    e.preventDefault();
    setIndicador(e.target.value);
  }

  function traerComboConceptos(e) {
    e.preventDefault();
    axios
      .get(
        `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/comboconceptoscaja.php?idconcepto=${e.target.value}`
      )
      .then((response) => {
        console.log(response.data);
        setConcepto(response.data);
      });
  }

  function traerInformeAlumnos(e) {
    e.preventDefault();

    document.querySelector(".tr-loader").classList.remove("d-none");

    setTimeout(() => {
      if (cicloNivel.includes(indicador)) {
        if (indicador === "2" && nivel === "0") {
          Swal.fire({
            title: `Se debe ingresar un Nivel`,
            icon: "warning",
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              return;
            }
          });
        } else {
          axios
            .get(
              `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&ciclo=${ciclo}&idnivel=${nivel}`
            )
            .then((response) => {
              setTabla(response.data);
            });
        }
      }

      if (calendario.includes(indicador)) {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}`
          )
          .then((response) => {
            setTabla(response.data ? response.data : []);
          });
      }

      if (calendarioYFormaDePago.includes(indicador)) {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}&fpago=${formaDePago}`
          )
          .then((response) => {
            setTabla(response.data ? response.data : []);
          });
      }

      if (indicador === "9") {
        let d = deuda === "" ? 0 : deuda;
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&deuda=${d}`
          )
          .then((response) => {
            setTabla(response.data);
          });
      }

      if (indicador === "10") {
        let d = deuda === "" ? 0 : deuda;
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&deuda=${d}`
          )
          .then((response) => {
            setTabla(response.data);
          });
      }

      if (indicador === "7") {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&ciclo=${ciclo}&idnivel=${nivel}&idtipo=${tipoArancel}&opcion=${opcion}`
          )
          .then((response) => {
            setTabla(response.data);
          });
      }

      if (indicador === "11") {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}&pago=${formaDePago}&idtipo=${tipoMovimiento}&idconcepto=${conceptoValor}&idtipocaja=${tipoCaja}`
          )
          .then((response) => {
            setTabla(response.data ? response.data : []);
          });
      }

      if (indicador === "3") {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/salida_reporte${indicador}.php?idusuario=83`
          )
          .then((response) => {
            setTabla(response.data);
          });
      }
      document.querySelector(".tr-loader").classList.add("d-none");
    }, 100);
  }

  function generarReporte(e) {
    e.preventDefault();
    document.querySelector(".tr-loader").classList.remove("d-none");

    if (cicloNivel.includes(indicador)) {
      if (indicador === "2" && nivel === "0") {
        Swal.fire({
          title: `Se debe ingresar un Nivel`,
          icon: "warning",
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            return;
          }
        });
      } else {
        axios
          .post(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&ciclo=${ciclo}&idnivel=${nivel}`
          )
          .then((response) => {
            document.querySelector(".tr-loader").classList.remove("d-none");
            window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
            document.querySelector(".tr-loader").classList.add("d-none");
          });
      }
    }

    if (calendario.includes(indicador)) {
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (calendarioYFormaDePago.includes(indicador)) {
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}&fpago=${formaDePago}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (indicador === "9") {
      let d = deuda === "" ? 0 : deuda;
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&deuda=${d}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (indicador === "10") {
      let d = deuda === "" ? 0 : deuda;
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&deuda=${d}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (indicador === "7") {
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&ciclo=${ciclo}&idnivel=${nivel}&idtipo=${tipoArancel}&opcion=${opcion}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (indicador === "11") {
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83&fdesde=${fechaDesde}&fhasta=${fechaHasta}&pago=${formaDePago}&idtipo=${tipoMovimiento}&idconcepto=${conceptoValor}&idtipocaja=${tipoCaja}`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }

    if (indicador === "3") {
      axios
        .get(
          `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/generar_reporte${indicador}.php?idusuario=83`
        )
        .then((response) => {
          document.querySelector(".tr-loader").classList.remove("d-none");
          window.location = `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/descargar.php?file=${response.data}`;
          document.querySelector(".tr-loader").classList.add("d-none");
        });
    }
  }

  function enviarMailResponsable(e) {
    e.preventDefault();
    let alumnos = "";
    let emails = "";
    let importes = "";
    let cuotas = "";

    if (indicador === "9") {
      tabla.map((i) => {
        if (document.getElementById(`check${i.idalumno}`).checked) {
          alumnos = alumnos + i.alumno + "|";
          emails = emails + i.email + "|";
          importes = importes + i.deuda + "|";
          cuotas = cuotas + "|";
        }
      });

      if (
        fechaPresentacion === "" ||
        alumnos.length === 0 ||
        importes.length === 0 ||
        cuotas.length === 0
      ) {
        if (fechaPresentacion === "") {
          Swal.fire({
            title: `Se debe seleccionar una Fecha de Presentación`,
            icon: "warning",
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              return;
            }
          });
        } else {
          Swal.fire({
            title: `Se debe seleccionar algún Alumno`,
            icon: "warning",
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              return;
            }
          });
        }
      } else {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/enviar_notificacion.php?fecha=${fechaPresentacion}&alumnos=${alumnos}&emails=${emails}&importes=${importes}&cuotas=${cuotas}`
          )
          .then((response) => {
            console.log(response.data);
          });
      }
    } else if (indicador === "10") {
      tabla.map((i) => {
        if (document.getElementById(`check${i.codfamilia}`).checked) {
          alumnos = alumnos + i.responsable + "|";
          emails = emails + i.email + "|";
          importes = importes + i.deuda + "|";
          cuotas = cuotas + " |";
        }
      });

      if (
        alumnos.length === 0 ||
        importes.length === 0 ||
        cuotas.length === 0
      ) {
        Swal.fire({
          title: `Se debe seleccionar una Familia`,
          icon: "warning",
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            return;
          }
        });
      } else {
        axios
          .get(
            `https://www.califcolegios.wnpower.host/donboscocastelarweb/app/informes/enviar_notificacion_flia.php?responsable=${alumnos}&emails=${emails}&importes=${importes}&cuotas=${cuotas}`
          )
          .then((response) => {
            console.log(response.data);
          });
      }
    }
  }

  useEffect(() => {
    document.querySelector(".tr-loader").classList.remove("d-none");
    cargarComboReportes();
    setConcepto([]);
    setTabla("");
    setCiclo(year);
    setNivel("0");
    setFechaDesde(
      indicador === "4" || indicador === "14"
        ? `${year}-10-01`
        : `${year}-01-01`
    );
    setFechaHasta(
      indicador === "4" || indicador === "14"
        ? `${year}-10-31`
        : `${year}-12-31`
    );
    setFechaDesde(
      indicador === "5" || indicador === "6" || indicador === "11"
        ? today
        : `${year}-01-01`
    );
    setFechaHasta(
      indicador === "5" || indicador === "6" || indicador === "11"
        ? today
        : `${year}-12-31`
    );
    setFormaDePago("0");
    setDeuda("1000");
    setFechaPresentacion("");
    setTipoArancel("0");
    setOpcion("0");
    setTipoCaja("0");
    setTipoMovimiento("-1");
    setConceptoValor("0");
    document.querySelector(".tr-loader").classList.add("d-none");
  }, [indicador]);

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Informes Generales</h4>
          <p className="text-secondary">
            Consultar y gestionar los Informes Generales.
          </p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-row">
            <select
              className="form-control form-control-sm col-5 mr-3"
              onChange={(e) => {
                actualizarCombos(e);
              }}
            >
              <option value="0">Seleccionar</option>
              {comboReportes &&
                comboReportes?.map((ciclo) => {
                  return (
                    <option key={ciclo[0]} value={ciclo[0]}>
                      {ciclo[1]}
                    </option>
                  );
                })}
            </select>
            <button
              className="align-self-start btn btn-primary btn-sm rounded ml-2"
              id="searchButton"
              onClick={(e) => traerInformeAlumnos(e)}
            >
              Consultar{" "}
              <img
                style={{ filter: "invert(100%)" }}
                width={"20px"}
                src={lupa}
                alt="lupa"
              />
            </button>
            <button
              className={
                indicador === "0"
                  ? "d-none align-self-start btn btn-primary btn-sm rounded ml-2"
                  : "align-self-start btn btn-sm rounded ml-2"
              }
              id="searchButton"
              onClick={(e) => generarReporte(e)}
            >
              <img width={"20px"} src={excel} alt="lupa" />
            </button>
          </div>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <div id="tr-loader" className="d-none tr-loader">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
      </div>
      <div>
        <div style={{ fontSize: "13px" }}>
          <div>
            {cicloNivel.includes(indicador) ? (
              <div className="form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Ciclo Lectivo
                  </label>
                  <select
                    onChange={(e) => setCiclo(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="2023">2023</option>
                    <option value="2022" selected>
                      2022
                    </option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                  </select>
                </div>
                <div className="d-flex flex-row">
                  <label className="col-sm-2 control-label text-label">
                    Nivel
                  </label>
                  <select
                    onChange={(e) => setNivel(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">Seleccionar</option>
                    <option value="1">NIVEL INICIAL</option>
                    <option value="2">NIVEL PRIMARIO</option>
                    <option value="3">NIVEL SECUNDARIO</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {calendario.includes(indicador) ? (
              <div className="form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-sm-2 control-label text-label">
                    Fecha Desde
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    onChange={(e) => setFechaDesde(e.target.value)}
                    Value={
                      indicador === "4" || indicador === "14"
                        ? `${year}-10-01`
                        : `${year}-01-01`
                    }
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-sm-2 control-label text-label">
                    Fecha Hasta
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    onChange={(e) => setFechaHasta(e.target.value)}
                    Value={
                      indicador === "4" || indicador === "14"
                        ? `${year}-10-31`
                        : `${year}-12-31`
                    }
                  ></input>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {calendarioYFormaDePago.includes(indicador) ? (
              <div className="form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Fecha Desde
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    onChange={(e) => setFechaDesde(e.target.value)}
                    Value={today}
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Fecha Hasta
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    onChange={(e) => setFechaHasta(e.target.value)}
                    Value={today}
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-sm-2 control-label text-label">
                    Forma de Pago
                  </label>
                  <select
                    onChange={(e) => setFormaDePago(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">TODAS</option>
                    <option value="10">AAAA</option>
                    <option value="4">CHEQUE</option>
                    <option value="7">CONVENIO</option>
                    <option value="9">DEBITO DIRECTO</option>
                    <option value="1">EFECTIVO</option>
                    <option value="2">PROVINCIA NET</option>
                    <option value="8">SALDO A FAVOR</option>
                    <option value="6">TARJETA CREDITO</option>
                    <option value="5">TARJETA DEBITO</option>
                    <option value="3">TRANSFERENCIA</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {indicador === "9" ? (
              <div className="d-flex flex-column form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Deuda Mayor o Igual a{" "}
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="number"
                    onChange={(e) => setDeuda(e.target.value)}
                    Value="1000"
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Fecha Presentación
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    onChange={(e) => setFechaPresentacion(e.target.value)}
                  ></input>
                </div>

                <button
                  onClick={(e) => enviarMailResponsable(e)}
                  className="btn btn-sm btn-danger col-4"
                >
                  Enviar Mail al Responsable
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {indicador === "10" ? (
              <div className="d-flex flex-column form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-3 control-label text-label">
                    Deuda Mayor o Igual a{" "}
                  </label>
                  <input
                    className="form-control form-control-sm col-1"
                    type="number"
                    onChange={(e) => setDeuda(e.target.value)}
                    Value="1000"
                  ></input>
                </div>
                <button
                  onClick={(e) => enviarMailResponsable(e)}
                  className="btn btn-sm btn-danger col-4"
                >
                  Enviar Mail al Responsable
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {indicador === "7" ? (
              <div className="d-flex flex-column form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Ciclo Lectivo
                  </label>
                  <select
                    className="form-control form-control-sm col-2"
                    onChange={(e) => setCiclo(e.target.value)}
                  >
                    <option value="2023">2023</option>
                    <option value="2022" selected>
                      2022
                    </option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                  </select>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Nivel
                  </label>
                  <select
                    onChange={(e) => setNivel(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">Seleccionar</option>
                    <option value="1">NIVEL INICIAL</option>
                    <option value="2">NIVEL PRIMARIO</option>
                    <option value="3">NIVEL SECUNDARIO</option>
                  </select>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Tipo Arancel
                  </label>
                  <select
                    onChange={(e) => setTipoArancel(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">Seleccionar</option>
                    <option value="1">CUOTA</option>
                    <option value="2">MATRICULA</option>
                    <option value="3">DEUDA</option>
                  </select>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label ">
                    Opción
                  </label>
                  <select
                    onChange={(e) => setOpcion(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">TODOS</option>
                    <option value="1">ACTIVOS</option>
                    <option value="2">INACTIVOS</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {indicador === "11" ? (
              <div className="d-flex flex-column form-group">
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Fecha Desde
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    Value={today}
                    onChange={(e) => setFechaDesde(e.target.value)}
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Fecha Hasta
                  </label>
                  <input
                    className="form-control form-control-sm col-2"
                    type="date"
                    Value={today}
                    onChange={(e) => setFechaHasta(e.target.value)}
                  ></input>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Tipo Caja
                  </label>
                  <select
                    onChange={(e) => setTipoCaja(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option value="0">Seleccionar</option>
                    <option value="1">CAJA</option>
                    <option value="2">BANCO CREDICOOP</option>
                    <option value="3">BANCO SANTANDER</option>
                    <option value="4">BANCO PROVINCIA</option>
                    <option value="5">INVERSIONES</option>
                  </select>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Tipo Movimiento
                  </label>
                  <select
                    className="form-control form-control-sm col-2"
                    onChange={(e) => {
                      setTipoMovimiento(e.target.value);
                      traerComboConceptos(e);
                    }}
                  >
                    <option value="-1">Seleccionar tipo</option>
                    <option value="9">EGRESOS</option>
                    <option value="8">INGRESOS</option>
                  </select>
                </div>
                <div className="d-flex flex-row form-group">
                  <label className="col-2 control-label text-label">
                    Concepto
                  </label>
                  <select
                    onChange={(e) => setConceptoValor(e.target.value)}
                    className="form-control form-control-sm col-2"
                  >
                    <option>Seleccionar Concepto</option>
                    {concepto &&
                      concepto?.map((c) => (
                        <option key={c[0]} value={c[0]}>
                          {c[1]}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={indicador === "0" ? "d-none" : ""}>
          <hr className={indicador === "3" ? "d-none" : ""} />
          <TablaInformes tabla={tabla} indicador={indicador} />
        </div>
      </div>
    </div>
  );
}
