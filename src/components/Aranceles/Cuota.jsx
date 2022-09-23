import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarIdConcepto,
  cargarIdCurso,
  cargarNivelSeleccionado,
} from "../../actions";
import parse from "html-react-parser";
import edit from "../../utils/edit.png";
import trash from "../../utils/delete.png";

export default function Cuota() {
  const { id, descripcion } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [comboCiclos, setComboCiclos] = useState([]);
  const [nivel, setNivel] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [conceptosVinculados, setConceptosVinculados] = useState([]);
  const [comboConcepto, setComboConcepto] = useState([]);
  const [comboConceptoCursos, setComboConceptoCursos] = useState([]);
  const [comboCursosVinculados, setComboCursosVinculados] = useState([]);
  const [cursosAlumnos, setCursosAlumnos] = useState([]);

  const idCurso = useSelector((state) => state.idCurso);
  const idConcepto = useSelector((state) => state.idConcepto);
  const nivelSeleccionado = useSelector((state) => state.nivelSeleccionado);

  let [input, setInput] = useState({
    idcuota: "",
    descripcion: "",
    idtipo: "",
    fecha1: "",
    fecha2: "",
    importe1: "",
    importe2: "",
    idmes: "",
    recargo: "",
    ciclo: "",
  });

  function cargarComboCiclos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  function cargarComboConceptos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/comboconcepto.php"
      )
      .then((response) => {
        setComboConcepto(response?.data);
      });
  }

  function cargarComboConceptoCursos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/comboconceptocursos.php?idcuota=" +
          id
      )
      .then((response) => {
        setComboConceptoCursos(response?.data);
      });
  }

  function cargarComboCursosVinculados() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/combocursosvinc.php?idcuota=" +
          id
      )
      .then((response) => {
        setComboCursosVinculados(response?.data);
      });
  }

  function cargarCursosAlumnos() {
    let idc = id;
    if (idCurso === 0 && idConcepto === 0) {
      idc = 0;
    }

    if (idConcepto === 0 || idConcepto === "0") {
      setCursosAlumnos([]);
    } else {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/cursosalumnos.php?idcuota=" +
            idc +
            "&idcurso=" +
            idCurso +
            "&idconcepto=" +
            idConcepto
        )
        .then((response) => {
          setCursosAlumnos(response?.data);
        });
    }
  }

  function traerNivelCuotas(ciclo) {
    if (nivelSeleccionado.length === 0) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traernivelcuotas.php?idcuota=" +
            id +
            "&ciclo=" +
            ciclo
        )
        .then((response) => {
          setNivel(response.data);
          response.data.map((n) => {
            if (n.marca === "1") {
              dispatch(cargarNivelSeleccionado([n.idnivel, true]));
            }
          });
        });
    }
  }

  function marcarDesmarcarCursos(nivel) {
    if (!document.getElementById(`check${nivel}`).checked) {
      dispatch(cargarNivelSeleccionado([nivel, false]));
    } else {
      dispatch(cargarNivelSeleccionado([nivel, true]));
    }
  }

  function traerCursosCuotas(ciclo) {
    let querycreate = "CREATE TEMPORARY TABLE t_datos (idnivel INT) ";
    let querylista = "INSERT INTO t_datos (idnivel)VALUES";

    let true1 = false;
    let true2 = false;
    let true3 = false;

    if (
      !document.getElementById(`check1`).checked &&
      !document.getElementById(`check2`).checked &&
      !document.getElementById(`check3`).checked
    ) {
      querylista = querylista + " (0)";
    }

    nivelSeleccionado.map((n) => {
      if (n === "1") {
        true1 = true;
      }
      if (n === "2") {
        true2 = true;
      }
      if (n === "3") {
        true3 = true;
      }
    });

    if (true1 && document.getElementById(`check1`).checked) {
      querylista = querylista + "(1),";
    }
    if (true2 && document.getElementById(`check2`).checked) {
      querylista = querylista + "(2),";
    }
    if (true3 && document.getElementById(`check3`).checked) {
      querylista = querylista + "(3),";
    }

    if (querylista[querylista.length - 1] === ",") {
      querylista = querylista.substring(0, querylista.length - 1);
    }
    console.log(querylista);
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traercursocuotas.php?idcuota=" +
          id +
          "&ciclo=" +
          ciclo +
          "&querycreate=" +
          querycreate +
          "&querylista=" +
          querylista
      )
      .then((response) => {
        console.log(response.data);
        setCursos(response.data);
      });
  }

  function traerConceptosVinculados() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traerconceptosvinc.php?idcuota=" +
          id
      )
      .then((response) => {
        setConceptosVinculados(response.data);
      });
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    cargarComboCiclos();
    cargarComboConceptos();
    traerConceptosVinculados();
    cargarComboConceptoCursos();
    cargarComboCursosVinculados();
    cargarCursosAlumnos();

    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traerdatoscuotas.php?idcuota=" +
            id
        )
        .then((response) => {
          setInput({
            idcuota: response.data[0].idcuota,
            descripcion: response.data[0].descripcion,
            idtipo: response.data[0].idtipo,
            fecha1: response.data[0].fecha1,
            fecha2: response.data[0].fecha2,
            importe1: response.data[0].importe1,
            importe2: response.data[0].importe2,
            idmes: response.data[0].idmes,
            recargo: response.data[0].recargo,
            ciclo: response.data[0].ciclo,
          });
          traerNivelCuotas(response.data[0].ciclo);
          traerCursosCuotas(response.data[0].ciclo);
        });
    }
  }, [dispatch, idConcepto, idCurso, nivelSeleccionado]);

  function editarArancel(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosbecas.php?oper=" +
            "A" +
            "&idbeca=" +
            0 +
            "&nombre=" +
            input.nombre +
            "&tipo=" +
            input.tipo +
            "&valor=" +
            input.valor
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al crear Beca!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/becas");
              }
            });
          }
          navigation("/becas");
        });
    } else {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosbecas.php?oper=" +
            "M" +
            "&idbeca=" +
            id +
            "&nombre=" +
            input.nombre +
            "&tipo=" +
            input.tipo +
            "&valor=" +
            input.valor
        )
        .then((response) => {
          console.log(response.data);
        });
      navigation("/becas");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">ARANCELES</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de los Aranceles
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Arancel {descripcion}
              <strong className="ml-3 text-secondary font-weight-normal">
                {input.nombre}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/aranceles");
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                }}
              >
                {" "}
                <img width="20px" src={arrowLeft} alt="arrow-left" />
                Listado
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">Gestionar la informacion del Arancel</p>
        </div>

        <nav>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="datos-tab"
                data-bs-toggle="tab"
                data-bs-target="#datos"
                type="button"
                role="tab"
                aria-controls="datos"
                aria-selected="true"
                style={{ outline: 0 }}
              >
                Datos Básicos
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="tablas-tab"
                data-bs-toggle="tab"
                data-bs-target="#tablas"
                type="button"
                role="tab"
                aria-controls="tablas"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Niveles
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="conceptos-tab"
                data-bs-toggle="tab"
                data-bs-target="#conceptos"
                type="button"
                role="tab"
                aria-controls="conceptos"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Conceptos
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="cursosAlumnos-tab"
                data-bs-toggle="tab"
                data-bs-target="#cursosAlumnos"
                type="button"
                role="tab"
                aria-controls="cursosAlumnos"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Cursos y Alumnos
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ fontSize: "13px" }} class="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="datos"
            role="tabpanel"
            aria-labelledby="datos-tab"
          >
            {/* DATOS BASICOS */}
            <div className="w-100 mt-3">
              <form
                name="f_abm_cuotas"
                id="id_abm_cuotas"
                className=""
                onSubmit={(e) => editarArancel(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombre"
                    className="col-sm-2 control-label text-label"
                  >
                    Descripción
                  </label>
                  <div className="col-sm-7 col-lg-5">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="nombre"
                      name={"nombre"}
                      defaultValue={input.descripcion}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.descripcion ? input.descripcion : "Ingrese Nombre"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="idtipo"
                    className="col-sm-2 control-label text-label "
                  >
                    Tipo
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control form-control-sm"
                      id="idtipo"
                      name={"idtipo"}
                      value={input.idtipo}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar tipo</option>
                      <option value="1">CUOTA</option>
                      <option value="5">CUOTA2</option>
                      <option value="2">MATRICULA</option>
                      <option value="3">DEUDA</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Fecha 1er Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="valor"
                      name={"valor"}
                      defaultValue={input.fecha1}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.fecha1 ? input.fecha1 : "Ingrese Fecha"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Importe 1er Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="valor"
                      name={"valor"}
                      defaultValue={input.importe1}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.importe1 ? input.importe1 : "Ingrese Fecha"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Fecha 2do Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="valor"
                      name={"valor"}
                      defaultValue={input.fecha2}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.fecha2 ? input.fecha2 : "Ingrese Fecha"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Importe 2do Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="valor"
                      name={"valor"}
                      defaultValue={input.importe2}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.importe2 ? input.importe2 : "Ingrese Fecha"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="mes"
                    className="col-sm-2 control-label text-label "
                  >
                    Mes
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control form-control-sm"
                      id="mes"
                      name={"mes"}
                      value={input.idmes}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar Mes</option>
                      <option value="1">ENERO</option>
                      <option value="2">FEBRERO</option>
                      <option value="3">MARZO</option>
                      <option value="4">ABRIL</option>
                      <option value="5">MAYO</option>
                      <option value="6">JUNIO</option>
                      <option value="7">JULIO</option>
                      <option value="8">AGOSTO</option>
                      <option value="9">SEPTIEMBRE</option>
                      <option value="10">OCTUBRE</option>
                      <option value="11">NOVIEMBRE</option>
                      <option value="12">DICIEMBRE</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Recargo Diario
                  </label>
                  <div class="input-group input-group-sm col-sm-4 col-lg-3">
                    <input
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="valor"
                      name={"valor"}
                      defaultValue={input.recargo}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.recargo ? input.recargo : "Ingrese Fecha"
                      }
                    />

                    <span
                      style={{ height: "31px" }}
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      %
                    </span>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="tipo"
                    className="col-sm-2 control-label text-label "
                  >
                    Ciclo
                  </label>
                  <div class="input-group col-sm-4 col-lg-3">
                    <select className="form-control form-control-sm">
                      {comboCiclos &&
                        comboCiclos?.map((ciclo) => {
                          if (ciclo[0] === `${new Date().getFullYear()}`) {
                            return (
                              <option selected key={ciclo[0]}>
                                {ciclo[0]}
                              </option>
                            );
                          }
                          return <option key={ciclo[0]}>{ciclo[0]}</option>;
                        })}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="tablas"
            role="tabpanel"
            aria-labelledby="tablas-tab"
          >
            <div className="my-2">
              {nivel &&
                nivel.map((n) => (
                  <div className="d-flex flex-row">
                    <input
                      onChange={(e) => {
                        marcarDesmarcarCursos(n.idnivel);
                      }}
                      defaultChecked={n.marca === "1" ? true : false}
                      className="mr-1"
                      id={`check${n.idnivel}`}
                      type="checkbox"
                    />
                    <div className="text-left">{n.descripcion}</div>
                  </div>
                ))}
            </div>

            <div className="table-responsive">
              <table className="w-50 table-condensed table-hover table-bordered text-center table border-top border-secondary">
                <thead className="">
                  <tr>
                    <th className="col-1"></th>
                    <th className="col-4 text-nowrap">Cursos</th>
                    <th className="col-4 text-nowrap">Nivel</th>
                    <th className="col-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cursos &&
                    cursos.map((n) => (
                      <tr>
                        <td>{n.pos}</td>
                        <td className="text-left">{n.nombre}</td>
                        <td className="text-left">{n.nivel}</td>
                        <td>
                          <input
                            defaultChecked={n.marca === "1" ? true : false}
                            className="mr-1"
                            type="checkbox"
                          />
                        </td>
                      </tr>
                    ))}
                  <td colSpan="4">
                    <div>
                      {cursos === [] || !cursos || cursos.length === 0 ? (
                        <div className="footer text-center">
                          No se registra información
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="conceptos"
            role="tabpanel"
            aria-labelledby="conceptos-tab"
          >
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label  m-0"
              >
                Concepto
              </label>
              <div className="col-sm-4 col-lg-3 p-0 m-0">
                <div>{parse(`${comboConcepto}`)}</div>
              </div>
            </div>
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="importe"
                className="col-sm-2 control-label text-label "
              >
                Importe
              </label>
              <input
                required
                type="number"
                className="form-control form-control-sm col-sm-4 col-lg-3 p-0 m-0"
              />
              <button className="align-self-start btn btn-primary rounded ml-3 btn-sm">
                Agregar
              </button>
            </div>

            <div className="table-responsive mt-4">
              <table className="w-50 table-condensed table-hover table-bordered text-center table border-top border-secondary">
                <thead className="py-5 header">
                  <tr className="bg-light" style={{ cursor: "pointer" }}>
                    <th className="col-4 text-nowrap">Concepto</th>
                    <th className="col-1 text-nowrap">Importe</th>
                    <th className="col-1 text-nowrap">Editar</th>
                    <th className="col-1 text-nowrap">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {conceptosVinculados &&
                    conceptosVinculados.map((c) => (
                      <tr>
                        <td className="text-left">{c.descripcion}</td>
                        <td className="text-right">{c.importe}</td>
                        <td>
                          <button className="p-0 btn">
                            <img width={18} alt="" src={edit} />
                          </button>
                        </td>
                        <td>
                          <button className="p-0 btn">
                            <img width={18} alt="" src={trash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-right">Total</td>
                    <td className="bg-info text-right">
                      {conceptosVinculados.length !== 0
                        ? conceptosVinculados[conceptosVinculados.length - 1]
                            .deuda
                        : ""}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="cursosAlumnos"
            role="tabpanel"
            aria-labelledby="cursosAlumnos-tab"
          >
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label  m-0"
              >
                Concepto
              </label>
              <div className="col-sm-5 col-lg-4 p-0 m-0">
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => {
                    dispatch(cargarIdConcepto(e.target.value));
                  }}
                >
                  <option value="0">Seleccionar </option>
                  {comboConceptoCursos &&
                    comboConceptoCursos?.map((concepto) => {
                      return (
                        <option value={concepto[0]} key={concepto[0]}>
                          {concepto[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label  m-0"
              >
                Curso
              </label>
              <div className="col-sm-4 col-lg-3 p-0 m-0">
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => {
                    dispatch(cargarIdCurso(e.target.value));
                  }}
                >
                  <option value="0">Todos </option>
                  {comboCursosVinculados &&
                    comboCursosVinculados?.map((curso) => {
                      return (
                        <option value={curso[0]} key={curso[0]}>
                          {curso[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div style={{ height: "700px" }} className="table-responsive mt-4">
              <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary overflow-auto">
                <thead className="py-5 header">
                  <tr className="bg-light" style={{ cursor: "pointer" }}>
                    <th className="col-1 text-nowrap">Orden</th>
                    <th className="col-1 text-nowrap">Curso</th>
                    <th className="col-2 text-nowrap">Alumno</th>
                    <th className="col-1 text-nowrap">Importe</th>
                    <th className="col-1 text-nowrap">Desm. Todo</th>
                  </tr>
                </thead>
                <tbody>
                  {cursosAlumnos &&
                    cursosAlumnos?.map((c) => (
                      <tr>
                        <td className="text-center">{c.orden}</td>
                        <td className="text-center">{c.curso}</td>
                        <td className="text-left">{c.nombre}</td>
                        <td className="text-right">
                          <input
                            className="text-right border-0 w-100"
                            type="number"
                            value={c.importe}
                          ></input>
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            defaultChecked={c.marca === 1 ? false : true}
                          ></input>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan="5">
                      <div>
                        {cursosAlumnos === [] ||
                        !cursosAlumnos ||
                        cursosAlumnos.length === 0 ? (
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
          </div>

          <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
            <button
              type="button"
              className="btn btn-secondary px-3 m-3 text-light shadow-sm"
              id="id_cancelar"
              onClick={() => {
                navigation("/aranceles");
                document
                  .querySelector(".navbar")
                  .classList.remove("active-nav");
                document
                  .querySelector(".contenedor")
                  .classList.remove("active-contenedor");
              }}
            >
              Descartar Cambios
            </button>
            <button
              type="submit"
              className="btn btn-primary px-3 m-3 text-light shadow-sm"
              id="id_grabar"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
